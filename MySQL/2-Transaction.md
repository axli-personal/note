# 事务

## 特性

* Atomicity
* Consistency
* Isolation
* Durability

## 隔离级别

<u>Read uncommitted</u> and <u>Read committed</u> may get update data from other transanction.

<u>Repeatable reads</u> keep the data at the begaining of current transaction.

Flaw: the range-select will contain new data.

<u>Serializable</u> fix the flaw above and it is most reliable.

## 并发控制

Multiversion bring less waiting time. But it will fail when there is colision.

So you may need to retry mutiple times to finish a transaction.

Lock-based increase waiting time. But it will success in most case.

## Read View

![1](https://img.axlis.cn/note/MySQL/1.png)

* 小于最小未提交事务ID: 可见.
* 大于全局事务ID: 不可见.
* 处于两者之间: 在未提交事务列表中查找(二分), 找到不可见, 未找到可见.
* 如果不可见, 就沿着undo log继续查找.
