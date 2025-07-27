# 熔断器

本章节通过[Resilience4j](https://github.com/resilience4j/resilience4j)框架,
对熔断器([Circuitbreaker](https://resilience4j.readme.io/docs/circuitbreaker))的技术进行一些分析.

## 熔断器状态

* 3种正常状态: CLOSED, OPEN, HALF_OPEN
* 3种特殊状态: METRICS_ONLY, DISABLED, FORCED_OPEN

> 3种特殊状态, 一般是给手动操作预留的(配置中心/本地接口).

## 数据采集和存储方式

* 基于数量(Count-Based): 统计最近N次执行的情况.
* 基于时间(Time-Based): 统计最近N秒执行的情况.

实现方式: 大小为N的环形数组, 数据过期后反向更新统计结果(`Subtract-on-Evict`).

统计结果已经提前进行了聚合统计, 所以每次获取统计结果的时间复杂度为`O(1)`.

## 触发熔断

状态转换: CLOSED -> OPEN

转换条件: 窗口内的统计的`失败率/慢调用率`大于设置的阈值, 并且窗口内的样本量大于设置的最低值.

> 默认情况下, 所有的Exception都会被算做失败, 当然也可以自定义哪些Exeption需要被算做失败.\
> Exception也可以被忽略, 这样他们既不会被统计为失败也不会统计为成功.

## 定期探测

状态转换: OPEN -> HALF_OPEN -> OPEN/CLOSED

转换条件: 熔断的时间已经超过了配置的探测间隔.

探测时会放行固定数量的请求, 后续的请求会被拒绝.

当探测的请求都结束之后, 根据统计情况流转到OPEN/CLOSE状态.

## 并发性能

熔断器的状态通过原子变量实现.

```java
private final AtomicReference<CircuitBreakerState> stateReference;
```

熔断器的滑动窗口并发有两种实现:

* 基于`ReentrantLock`的同步实现, 默认的并发方式.
* 基于链表和CAS的无锁实现, 牺牲一定的内存空间, 换取并发性能.

```java
public enum SlidingWindowSynchronizationStrategy {
    /**
     * Lock-free algorithm based on CAS of immutable objects.
     */
    LOCK_FREE,

    /**
     * Blocking algorithm using locks.
     */
    SYNCHRONIZED
}
```

## 多机器统一熔断

`Resilience4j`将滑动窗口的所有数据都维护到了内存中, 并不具备多机器统一熔断的能力.

解决分布式统一熔断的问题有两种方式:

* 请求通过一个网关, 在网关层统一进行统计, 并熔断.
* 滑动窗口统计结果维护到Redis中, 或使用单独的服务进行统计.
