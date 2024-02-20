# 开发日志

## 修正买票的座位锁定逻辑

### 如何判断两个座位之间是否冲突?

这和区间是否冲突是一个问题, 刷过LeetCode的Interval类型题目的对这个问题应该很熟悉.

结论: A的起点在B的终点之前, 且A的终点在B的起点之后.

### 锁定座位逻辑修正

根据上面的结论将锁定座位的逻辑进行的修正:

这是修正前的代码:

```java
var update = Wrappers.lambdaUpdate(SeatEntity.class)
        .set(SeatEntity::getStatus, SeatStatus.Locked.getCode())
        .eq(SeatEntity::getId, seatEntity.getId());

seatMapper.update(update);
```

这是修正后的代码:

```java
for (int i = 0; i < stopEntityList.size(); i++) {
    for (int j = i + 1; j < stopEntityList.size(); j++) {
        // ! 当前始发站在购买的终点站之前 & 当前的终点站在购买的起始站之后
        if (i < destIndex && j > fromIndex) {
            var update = Wrappers.lambdaUpdate(SeatEntity.class)
                    .set(SeatEntity::getStatus, SeatStatus.Locked.getCode())
                    .eq(SeatEntity::getFromStationId, stopEntityList.get(i).getStationId())
                    .eq(SeatEntity::getDestStationId, stopEntityList.get(j).getStationId())
                    .eq(SeatEntity::getCarriageNumber, seatEntity.getCarriageNumber())
                    .eq(SeatEntity::getSeatNumber, seatEntity.getSeatNumber());

            seatMapper.update(update);
        }
    }
}
```

> 更新时一定要把范围限定清楚, 不要漏掉了条件, 比如: 同一个车厢、座位号.

### 车站排序

在对列车途经的车站进行排序时, 采用了服务端排序的方式:

```java
stopEntityList.sort((a, b) -> {
    if (a.getDepartureTime() == null) return 1;
    if (b.getDepartureTime() == null) return -1;

    return a.getDepartureTime().compareTo(b.getDepartureTime());
});
```

数据量小, 在服务端处理更加灵活, 比如: 可以处理`null`的情况.

::: tip 思路
如果`StopEntity`表中有用于排序的字段, 排序就更容易.
:::

### 发现的问题

其他的相关流程也需要进行修改, 比如: 取消订单、退款.

::: tip 提醒
需要将相同的逻辑进行抽象, 以便于维护.
:::

在测试购票的时候发现购票接口的性能非常的差, 猜测可能是更新的`SQL`没有走合适的索引.

在购票后需要清楚一部分记录余票量的缓存, 由于更新和查询的角度不同, 导致会有大量的缓存需要更新.

现有的缓存一致性逻辑:

```java
var query = Wrappers.lambdaQuery(StopEntity.class)
        .eq(StopEntity::getOperationId, seatEntity.getOperationId())
        .eq(StopEntity::getStationId, seatEntity.getFromStationId());

var stopEntity = stopMapper.selectOne(query);

ticketCache.removeSeatCountResultList(
        stopEntity.getDepartureTime(),
        seatEntity.getFromStationId(),
        seatEntity.getDestStationId()
);
```

::: warning 问题
座位锁定逻辑更改后, 需要更新的`key`不止这一个, 甚至可能出现出发时间跨天的特殊情况!
:::

## 限流

通过初步调研, 我们使用了`guava`中的限流实现.

::: warning 提醒
guava中`RateLimiter`的实现并不稳定, 带有`@Beta`注解.
:::

```java
// 限流的参数.
private final RateLimiter listTicketRateLimiter = RateLimiter.create(5);

// 拒绝的策略.
if (!listTicketRateLimiter.tryAcquire()) {
    log.warn(
            "list ticket reject by rate limiter, date = {}, fromStationId = {}, destStationId = {}",
            date, fromStationId, destStationId
    );
    throw new RuntimeException("too many request");
}
```

最终通过[性能测试](./Test-Report.md#限流场景下性能测试)发现效果非常好, 满足了业务需求.

## 冗余

```sql
CREATE TABLE train_stops
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    operation_id   INT       NOT NULL,
    station_id     INT       NOT NULL,
    arrival_time   TIMESTAMP NULL, -- 到站时间
    departure_time TIMESTAMP NULL, -- 离站时间
    -- 省略外键和索引
);

CREATE TABLE train_seats
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    operation_id    INT         NOT NULL,
    type            INT         NOT NULL,
    carriage_number VARCHAR(20) NOT NULL,
    seat_number     VARCHAR(20) NOT NULL,
    departure_time  TIMESTAMP   NOT NULL, -- 反范式设计(冗余), 便于查询.
    from_station_id INT         NOT NULL,
    dest_station_id INT         NOT NULL,
    status          INT         NOT NULL,
    -- 省略外键和索引
);
```

对于`departure_time`本来是存储在`train_stops`表中的, 但是在进行座位统计时需要这部分数据:

```sql
select train_seats.operation_id,
       train_seats.type AS seat_type,
       COUNT(*)         AS seat_count
from train_seats
            JOIN train_stops
                ON train_seats.operation_id = train_stops.operation_id
where train_seats.from_station_id = #{fromStationId}
    AND train_seats.dest_station_id = #{destStationId}
    AND train_seats.status = #{seatStatus}
    AND train_stops.station_id = #{fromStationId}
    AND TO_DAYS(train_stops.departure_time) = TO_DAYS(#{date})
group by train_seats.operation_id, train_seats.type
order by train_seats.operation_id, train_seats.type
```

在进行一般的`JOIN`查询时, 往往需要返回两张表的数据; 但在统计座位的场景下, `train_stops`只起到过滤数据的作用.

并且`departure_time`本身的更新频率并不高, 所以对`departure_time`进行了冗余的设计, 统计座位则不需要`JOIN`:

```sql
select train_seats.operation_id,
       train_seats.type AS seat_type,
       COUNT(*)         AS seat_count
from train_seats
where train_seats.from_station_id = #{fromStationId}
    AND train_seats.dest_station_id = #{destStationId}
    AND train_seats.status = #{seatStatus}
    AND TO_DAYS(train_seats.departure_time) = TO_DAYS(#{date})
group by train_seats.operation_id, train_seats.type
order by train_seats.operation_id, train_seats.type
```

经过[性能测试](./Test-Report.md#冗余)`QPS`和`RT`均有明显的改善.
