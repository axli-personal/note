# 集群

## 哈希

哈希函数: **CRC16(key) % 2^14**

可以使用第一个大括号内的字符串计算哈希: user:{key}:profile, user:{key}:account.

当需要操作多个key时, 要保证所有的key都在一个分片上.
