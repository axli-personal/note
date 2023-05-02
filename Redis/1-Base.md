# 基础

## 内存淘汰策略

Q: 如何保证redis中的数据都是热点数据?

* LRU: 基于时间戳.
* LFU: 基于计数器, 随时间衰减, 每次访问都有概率递增.

### 配置

* maxmemory-samples: 每次淘汰采样数.
* lfu-decay-time: 每次衰减时间间隔.
* lfu-log-factor: 访问增长曲线.
