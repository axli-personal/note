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
