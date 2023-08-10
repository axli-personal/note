# Partition

## 为什么要分表?

* 查询性能降低
* 维护成本变高: PG的Vacuum扫描资源消耗增大.

## 怎么分表?

* Based On Access Patern
* Range Partitioning
* List Partitioning
* Hash Partitioning

```sql
create table customers
(
    id   int,
    name varchar(30),
    age  int
) partition by range(age);

create table cust_young partition of customers for values from (MINVALUE) to 25;

select tableoid::regclass, * from customers;
```

## 参考资料

* [PostgreSQL Partitioning Documentation](https://www.postgresql.org/docs/current/ddl-partitioning.html)
* [PostgreSQL Partitioning Tutorial](https://www.youtube.com/watch?v=oJj-pltxBUM)
* [超详细的mysql分库分表方案](https://blog.csdn.net/agonie201218/article/details/110823552)
* [MySQL的分区/分库/分表总结](https://zhuanlan.zhihu.com/p/342814592)
* [MySQL：互联网公司常用分库分表方案汇总！](https://zhuanlan.zhihu.com/p/137368446)
