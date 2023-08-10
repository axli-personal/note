# 引擎

## Append Only

## Delta Storage

## Fill Factor

PG默认的页面大小为8KB, 并且数据操作永远都是Append操作.

* Delete: 将历史数据标记为无效.
* Update: 将历史数据标记为无效, 然后向页面添加新数据.

PG在建表时可以指定Fill Factor: `with (fillfactor = 100)`.

当更新已满页面中数据时, 需要将数据写入空闲页面.

一个合适的Fill Factor可以提高Update的性能.

## 事务

PG的默认隔离级: **读已提交**.

* xmin: 创建该记录的事务ID.
* xmax: 删除该记录的事务ID.

## Vacuum

* Concurrent Vacuum: 移除每一页中的Dead Tuples, 其他事务可读.
* Full Vacuum: 移除每一页中的Dead Tuples, 并进行碎片整理, 其他事务不可访问.

PG会自动进行数据清理, 这是一个非常耗费性能的过程.

清理过程:

* 获取表的`ShareUpdateExclusiveLock`.
* 获取表的所有Dead Tuples.
* 移除对指向Dead Tuples的索引.
* 移除每一页中的元组, 并进行碎片整理.