---
sidebarDepth: 1
---

# PostgreSQL

## 事务

### 快照

快照结构:

* xmin: 最小的事务.
* xmax: 下一个分配的事务.
* xip_list: 当前活跃的事务列表.

查看当前快照:

```sql
BEGIN;                                            -- 1741
SELECT txid_current();                            -- 1741
BEGIN;                                            -- 1742
SELECT txid_current();                            -- 1742
BEGIN;                                            -- 1743
SELECT txid_current();                            -- 1743
UPDATE article SET title = '新标题' WHERE uid = 1; -- 1743
COMMIT;                                           -- 1743
SELECT txid_current_snapshot();                   -- 1741
-- 结果: 1741:1744:1742
```

## 锁

### 行锁

PG有4中行级锁:

* FOR UPDATE: 允许修改元组的任何字段, 甚至删除元组.
* FOR NO KEY UPDATE: 允许修改元组的非唯一性字段.
* FOR SHARE: 读取元组, 并不允许修改元组的任何字段.
* FOR KEY SHARE: 读取元组, 并允许修改元组的非唯一性字段.

行级锁冲突矩阵:

| Current Lock      | FOR UPDATE | FOR NO KEY UPDATE | FOR SHARE | FOR KEY SHARE |
| ----------------- | ---------- | ----------------- | --------- | ------------- |
| FOR UPDATE        | N          | N                 | N         | N             |
| FOR NO KEY UPDATE | N          | N                 | N         | Y             |
| FOR SHARE         | N          | N                 | Y         | Y             |
| FOR KEY SHARE     | N          | Y                 | Y         | Y             |

查看行级锁的状态:

```sql
CREATE EXTENSION pgrowlocks;         -- 为数据库创建插件.
SELECT * FROM pgrowlocks('article'); -- 查看article表行锁的状态.
```

### 咨询锁

咨询锁的加锁和解锁过程由程序控制. 当事务结束后, 咨询锁并不会被自动释放.

```sql
SELECT pg_advisory_lock(10);   -- 将数字10上锁.
SELECT pg_advisory_unlock(10); -- 将数字10解锁.
SELECT pg_advisory_unlock_all; -- 全部解锁.
```

> 咨询锁支持: 非阻塞(Try Lock), 排他锁(Exclusive Lock), 共享锁(Share Lock).

## 索引

常用索引:

* BTREE: 用于等值, 范围查找, 以及排序.
* GIN: 倒排索引, 用于关键词查找.
* Hash: 用于等值查询.

> PG在创建索引时支持, 组合索引, 唯一索引, 函数索引, 部分索引.

索引扫描方式:

* 索引扫描: 需要回表.
* 仅索引扫描: 索引覆盖, 无需回表.
* 位图扫描: 索引合并.

模式匹配索引优化:

* 使用`varchar_pattern_ops`和`text_pattern_ops`创建索引, 使用默认操作符创建索引无法对模式匹配进行优化.
* 使用`LIKE %keyword`和`^keyword`能够走索引.

数组索引:

使用**GIN**可以对数组中元素进行索引, PG提供了多种用于查询的操作符.

```sql
SELECT * FROM article WHERE keywords @@ ARRAY['database', 'golang']; -- 包含
```

全文检索:

使用`to_tsvector`构建索引对象, 使用`to_tsquery`构建查询条件.

```sql
SELECT to_tsvector('english', 'I want to find a job.');    -- 'find':4 'job':6 'want':2
SELECT to_tsvector('simple', 'I want to find a job.');     -- 'a':5 'find':4 'i':1 'job':6 'to':3 'want':2
SELECT to_tsquery('(go:* | java) & !frontend');            -- 包含go前缀或java, 并且不包含frontend.
SELECT to_tsvector('golang intern') @@ to_tsquery('go:*'); -- true
```

## 执行计划

使用EXPLAIN来获取执行计划, 常用的选项有**ANALYZE**和**BUFFERS**.

```sql
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM article WHERE title ~ 'keyword';
```

## 命令行工具

| command     | description                      |
| ----------- | -------------------------------- |
| `\l`        | list databases                   |
| `\c`        | connect (switch) to a database   |
| `\dt`       | list database tables             |
| `\di`       | list database indexs             |
| `\password` | change password for current user |

## 扩展

PG提供了很多扩展包, 通过安装`postgresql-contrib`获取它们.

```shell
dnf install postgresql-contrib
```

## Heap File

![1](https://img.axlis.cn/note/DB/1.png)

索引只需要记录`(Block Number, Record Pointer Number)`.

```c
typedef struct PageHeaderData
{
  PageXLogRecPtr pd_lsn;              // LSN
  uint16         pd_checksum;         // Checksum
  uint16         pd_flags;            // Flags
  LocationIndex  pd_lower;            // offset to start of free space
  LocationIndex  pd_upper;            // offset to end of free space
  LocationIndex  pd_special;          // offset to start of special space
  uint16         pd_pagesize_version; // Version
  TransactionId  pd_prune_xid;        // oldest prunable XID, or zero if none
  ItemIdData     pd_linp[FLEXIBLE_ARRAY_MEMBER]; /* line pointer array [行指针数组]*/
} PageHeaderData;
```

#### Control the service

```bash
# pg_ctl is more powerful to control the service.
systemctl <signal> postgresql.service
```

#### Super user

The super user's name is 'postgres'.

The super user doesn't have a password for security.

```bash
# init connect.
su postgres -c 'psql'
```

#### Manage user and database

```sql
SELECT * FROM pg_user;
SELECT * FROM pg_database;

CREATE USER <name> PASSWORD <pwd>;
DROP   USER <name>;

CREATE DATABASE <name>;
DROP   DATABASE <name>;
```

#### Connection and Authentication Config

```plaintext
# File: <root>/pg_hba.conf

# HBA:       host-based authentication.
# TYPE:      local(local unix domain socket), host(tcp).
# DATABASE:  all, sameuser, <name>(specify).
# USER:      all, <name>(specify).
# ADDRESS:   all, <start_ip>/<mask_length>.
# METHOD:    trust, md5, peer(local system user with the same name).

# Note: scram-sha-256 method will fail sometimes.
# Note: all IPv4 address is '0.0.0.0/0'.
# Note: if the server doesn't have any response, modify the listen config in 'postgresql.conf'.
```

#### Default value

* Default value is `NULL` without setting.
* Default value can be evaluated when the row was inserted.

#### Generated Columns

* Generated column depend on other colum to evaluate its value.
* Dependency relation exist all the time, even after `UPDATE`.
* Dependency relation cannot be broken by specifying a value.

```sql
CREATE TABLE scores (
  math   int,
  art    int,
  final  int GENERATED ALWAYS AS (math * 0.6  + art * 0.4) STORED
);
```

#### Constraint

You should create a primary key in all the tables.

Although postgresql allow create table without it.

![1](https://mintul.liaoxiang.site/Database/1.png)

Some common constraints.

![2](https://mintul.liaoxiang.site/Database/2.png)

Now you can add it to your columns or tables.

Named constraints will bring much convenience for you.

#### ALTER TABLE

```sql
-- change the column type.
ALTER TABLE tb ALTER COLUMN column_name TYPE another_type;
alter table article alter column title type varchar(30);
-- drop one column.
ALTER TABLE tb DROP COLUMN column_name;
alter table article drop column content;
-- Add one column.
ALTER TABLE tb ADD COLUMN column_name some_type;
alter table article add column uid int;
-- Add constraint.
ALTER TABLE tb ADD CONSTRAINT constraint_name primary key(uid);
alter table article add constraint uid_unique primary key(uid);
```

#### Calling function

```sql
SELECT fun('data')               -- Position
SELECT fun(parameter => 'data')  -- Named
```

#### UNION, INTERSECT, EXPECT

```sql
-- Append the result of queryB to queryA.
queryA UNION [ALL] queryB
-- Return all rows that are both in the result of queryA and queryB.
queryA INTERSECT [ALL] queryB
-- Teturn result in queryA but not in queryB.
queryA EXCEPT [ALL] queryB
```

* Compatible: the query result must have the same column number and compatiable data type.
* ALL: the duplicated row in the result was removed by default and you can use keyword 'ALL' to preserve them.

#### LIMIT and OFFSET

* LIMIT: retrieve rows with a max number limit.
* OFFSET: skip some rows before count the limit above.

When the result is unorderd, the result processed by `LIMIT` and `OFFSET` was still unorderd.
The rows skiped will still calculated by the server.

#### VALUE

```sql
-- It generate a table without having to create a table.
SELECT * FROM (VALUES (1, 'one'), (2, 'two'), (3, 'three')) AS t (num, letter);
```

##### serial

* auto increasing int.
* It is not a true type but just a notation for convenience.
* It is implemented using sequences.
* When rollback happen, there will exist gap in serial column.

#### Config

```plaintext
# File: postgresql.conf

# Default config for some functions, such as 'to_tsvector' and 'to_tsquery'.
# pg_catalog.simple is a general config.
default_text_search_config = 'pg_catalog.simple'

# Note: There are Some languages unimplemented.
```

## 正则表达式

PostgreSQL使用`~`来进行正则匹配.

```sql
select 'database' ~ '^data'; -- true
```

> 注意: 正则表达式写在`~`的右边.

## 参考资料

* 博客: https://blog.csdn.net/dazuiba008/article/details/130727912
* 博客: https://blog.csdn.net/qq_34448345/article/details/127439692