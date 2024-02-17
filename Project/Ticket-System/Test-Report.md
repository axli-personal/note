# 测试报告

## 查询座位余量接口性能测试

### 测试数据量

| 表               | 数据量                                                                        |
| ---------------- | ----------------------------------------------------------------------------- |
| train_operations | 100个车次, 共**100**个`Entity`                                                |
| train_stops      | 6个途径站点, 共**600**个`Entity`                                              |
| train_seats      | 100个车次, 15个`起始站-终点站`组合, 每个车次1000个座位, 共**150万**个`Entity` |

### 测试结果

|     | 方案                       | 测试报告                                                                           |
| --- | -------------------------- | ---------------------------------------------------------------------------------- |
| 1   | 没有缓存, 查询全部走数据库 | [Test-Report-1](https://dl.axlis.cn/note/Project/Ticket-System/Test-Report-1.html) |
| 2   | Redis缓存, 无过期时间      | [Test-Report-2](https://dl.axlis.cn/note/Project/Ticket-System/Test-Report-2.html) |

在没有缓存的方案下, 当用户数量达到100时, 出现过一次**获取连接超时**的异常:

```log
java.sql.SQLTransientConnectionException: HikariPool-1 - Connection is not available, request timed out after 30004ms.
```

### 结果分析

#### 方案一

当数据库无负载时, 查询所使用的`SQL`平均耗时为**1400ms**.

```sql
<select id="countByType">
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
</select>
```

> 推测: 查询座位余量的接口在数据层面还有优化空间.

| 场景      | 性能              |
| --------- | ----------------- |
| 10个用户  | QPS=3, RT(95)=4s  |
| 100个用户 | QPS=4, RT(95)=28s |

这个表现非常不理想.

> 推测: 通过分页是否能够减轻数据库的压力, 但在分页之后**缓存的难度**也会变大.

另外如果改成在应用层做`JOIN`, 性能会不会受到影响, 缓存又应该怎么做.

#### 方案二

| 场景      | 性能                   |
| --------- | ---------------------- |
| 10个用户  | QPS=950, RT(95)=13ms   |
| 100个用户 | QPS=1000, RT(95)=120ms |

首先使用缓存后性能出现了明显的提升, 但在预热阶段出现了RT的抖动, 需要更加复杂的测试来观察**缓存失效的影响**.
