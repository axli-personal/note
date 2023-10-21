# 扩展性

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

## 多个分片键

当应用程序需要以不同的方式访问数据, 很可能会出现多个分片键, 这意味着数据将被存储多分, 出现冗余.

::: tip 提示
为了应对不同的访问模式而将数据存储多份, **并不要求每一份都是全量数据**, 保证大多数够用即可.
:::

来看一个简单的例子:

用户: users(<u>id</u>, name)\
文章: articles(<u>id</u>, user_id, title, content)\
评论: comments(<u>id</u>, user_id, article_id, title, content)

对于comments表, 我们既需要查找指定用户的评论, 也需要查找指定文章的评论, 导致我们需要两个分片键.\
可以按user_id构建分片存储全量数据, 然后按照article_id构建分片存储部分数据(不需要content).

## 参考资料

* [PostgreSQL Partitioning Documentation](https://www.postgresql.org/docs/current/ddl-partitioning.html)
* [PostgreSQL Partitioning Tutorial](https://www.youtube.com/watch?v=oJj-pltxBUM)
* [超详细的mysql分库分表方案](https://blog.csdn.net/agonie201218/article/details/110823552)
* [MySQL的分区/分库/分表总结](https://zhuanlan.zhihu.com/p/342814592)
* [MySQL：互联网公司常用分库分表方案汇总！](https://zhuanlan.zhihu.com/p/137368446)
