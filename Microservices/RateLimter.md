# 限流器

本章节通过[Resilience4j](https://github.com/resilience4j/resilience4j)框架,
对限流器([RateLimiter](https://resilience4j.readme.io/docs/ratelimiter))的技术进行一些分析.

## 核心概念

每个周期内, 允许放行N次请求.

## 实现方式

* `SemaphoreBasedRateLimiter`: 基于信号量实现, 初始化后启动一个线程按照周期去释放信号量.
* `AtomicRateLimiter`: 计算未来什么时间点能够获取到足够的`Permits`, 基于`CAS`修改状态提前预留好权限, 线程等待指定时间后执行.

## 分布式限流

* 定期从配置中心拉取最新的单机限流配置.
* 先进行单机限流判断, 本地触发限流之后需要进行统一的分布式限流.
* 分布式限流时, 可以进行预分配(一次性多请求一些`Permits`), 减少网络调用的次数.

> 参考: [硬核课堂Logic的文章](https://hardcore.feishu.cn/docs/doccnvQAX7MWAZA4PRlxXoBPPyf)
