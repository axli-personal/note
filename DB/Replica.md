# 副本

## 主从同步

![Replica](https://dl.axlis.cn/note/DB/Replica.png)

::: tip 提醒
单向同步时, 建议将从库设置为只读.
:::

![Replica-Detail](https://dl.axlis.cn/note/DB/Replica-Detail.png)

## 主从架构

1. 一主一从
2. 一主多从
3. 链式复制: 从节点需要记录更新.
4. 双向复制: 互为主从关系.

## 数据一致性

1. 异步复制: 主库提交事务后, 立即将结果返回给客户端.
2. 半同步复制: 主库提交事务后, 等待**至少一个**从库将日志写入Relay Log, 然后将结果返回给客户端.
3. 全同步复制: 主库提交事务后, 等待**所有**从库将日志写入Relay Log, 然后将结果返回给客户端.

## 参考资料

1. https://blog.csdn.net/weixin_43184819/article/details/84000936
