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

## 限流场景下性能测试

首先性能瓶颈主要出现在数据库, 所以这次的测试的后端采用了无缓冲的方案, 但是加上了限流.

因为数据库的性能是有瓶颈的, 所以我们需要在`RT`和`QPS`之间找到一个平衡点.



| 场景                         | QPS | RT   |
| ---------------------------- | --- | ---- |
| 100个用户, 无限流            | 6+  | 10s+ |
| 100个用户, 最大6个请求每秒   | 6   | 10s+ |
| 100个用户, 最大5.5个请求每秒 | 5.5 | 5s+  |
| 100个用户, 最大5个请求每秒   | 5   | 3s-  |

为了获取更加详细的数据, 进行了少量的自定义(Locust):

```py
success_qps = defaultdict(int)
fail_qps = defaultdict(int)
success_rt = defaultdict(float)
fail_rt = defaultdict(float)

@events.init.add_listener
def on_locust_init(environment, **kw):
    @environment.web_ui.app.route("/qps/success")
    def get_success_qps():
        return success_qps

    @environment.web_ui.app.route("/qps/fail")
    def get_fail_qps():
        return fail_qps

    @environment.web_ui.app.route("/rt/success")
    def get_success_rt():
        result = {}
        # ! 计算每个区间的值
        for index in success_rt:
            result[index] = success_rt[index] / success_qps[index]
        # ! 计算平均值
        result[-1] = sum(result.values()) / len(result)

        return result

    @environment.web_ui.app.route("/rt/fail")
    def get_fail_rt():
        result = {}
        # ! 计算每个区间的值
        for index in fail_rt:
            result[index] = fail_rt[index] / fail_qps[index]
        # ! 计算平均值
        result[-1] = sum(result.values()) / len(result)

        return result
```

根据请求的返回情况更新数据:

```py

init_time = time.time()
calculate_unit = 2  # * 统计的秒数

def search_ticket(self):
    request_start_time = time.time()
    response = self.client.get(url, params=params, name=url)
    response_time = time.time() - request_start_time

    calculate_index = int((request_start_time - init_time) / calculate_unit)

    if response.ok:
        success_qps[calculate_index] += 1
        success_rt[calculate_index] += response_time
    else:
        fail_qps[calculate_index] += 1
        fail_rt[calculate_index] += response_time
```

最后在每秒5个请求限流的情况下, 的得到的RT数据:

```json
{
  // 平均
  "-1": 1.6400804509124836,
  // 部分测试样本
  "153": 1.1868972778320312,
  "154": 1.311516523361206,
  "155": 2.1221213579177856,
  "156": 1.3401478290557862,
  "157": 1.677703857421875,
  "158": 2.71749951839447,
  "159": 2.461339020729065,
}
```

对于QPS完全是达到了限流的上限; 由于限流采用了快速拒绝的策略, 失败的RT=2ms, 非常的低.

以上的压测结果完全达到了业务的要求, 不会出现RT过长的情况, 影响用户体验, 同时也保留的大部分的吞吐量.
