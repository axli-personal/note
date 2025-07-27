# 本地缓存

## Java中如何构建本地缓存?

目前比较常见用的有两个库: `Guava`和`Caffeine`.

* [Guava](https://github.com/google/guava/wiki/CachesExplained): Google开源的Java核心库
* [Caffeine](https://github.com/ben-manes/caffeine): 高性能本地缓存库

## 本地缓存应该被应用在哪些场景?

* 更新频率低, 数据量小, 查询量大: 比如配置信息.
* 热点数据的查询: 降低Redis集群中热点数据的查询量.

## 热点探测

> [得物热点探测技术架构设计与实践](https://segmentfault.com/a/1190000043452655)\
> [京东毫秒级热key探测框架设计与实践](https://tianyalei.blog.csdn.net/article/details/106896210)\
> [京东零售 HotKey项目](https://gitee.com/jd-platform-opensource/hotkey)

通过统计key的访问频率, 发现热点之后立刻推送到到客户端.

热key的计算规则和统计节点(server)信息通过etcd维护.

上报和推送是通过Netty的长链接实现的, client根据一定的频率(500ms)推送访问的Key, server发现热Key后立刻推送给client.

Q: 为什么热key不本地计算?

A: 因为业务机器非常多, 负载均衡后流量就非常小了; 通过hash算法做负载均衡, 本地做热key计算才比较合适.

---

Q: 热点上报的频率?

A: 上报过快, 本地聚合效果比较差, server统计压力大; 上报过慢, 可能热点计算出来时已经没有价值了.

---

Q: 为什么是Server直接推送, 而不是通过etcd维护热key, 客户端监听etcd.

A: Netty长连接推送链路短, 耗时小. server机器多, 方便做水平扩容.

## 注意事项

* 入口流量(HTPP、RPC)的负载均衡策略, 热点数据的查询是否由同一台机器负载.
