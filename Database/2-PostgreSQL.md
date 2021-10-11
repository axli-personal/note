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

#### psql internal commands

* `\d`:  show relations in the database
* `\df`: show functions in the database
* `\do`: show operators in the database
* `\password`: change password for current user

#### Default value

* 1) Default value is `NULL` without setting.
* 2) Default value can be evaluated when the row was inserted.

#### Generated Columns

* 1) Generated column depend on other colum to evaluate its value.
* 2) Dependency relation exist all the time, even after `UPDATE`.
* 3) Dependency relation cannot be broken by specifying a value.

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

#### Common data type

##### int

* 1) Signed four-byte intger

##### serial

* 1) auto increasing int.
* 2) It is not a true type but just a notation for convenience.
* 3) It is implemented using sequences.
* 4) When rollback happen, there will exist gap in serial column.

##### real

* 1) Single precision float point.
* 2) It will store an approximate value, which is inexact.
* 3) Special value: 'Infinity', '-Infinity', 'NaN'.

##### numeric(all, right)

* 1) Numeric will be stored without leading or trailing zeroes.
* 2) Parameter `all`: the number of all digits.
* 3) Parameter `right`: the number of fractional digits.
* 4) Calculation on numeric values are very slow.

#### About Character

```plaintext
char(n):    fixed length
varchar(n): variable-length, n is the max length.

Note: when PG use unicode, any complex character will be stored in one character!
```

##### text

* 1) variable-length string

##### date

* 1) year + month + day

#### money

* 1) There will be two fractional digits.
* 2) It accepts various input format.
* 3) Its ouput format is seted by variable `lc_monetary`.

### Full Text Search

#### `tsvector`

```sql
-- tsvector doesn't perform word normalization, but to_tsvector do. 
SELECT 'a fat cat sat on a mat and ate a fat rat'::tsvector;
SELECT to_tsvector('simple', 'a fat cat sat on a mat and ate a fat rat');
```

#### `tsquery`

```sql
-- You can use some symbols to enhance the power of query.
-- Symbols: '!', '&', '|', '<->', '*'. 
SELECT 'fat & (rat | cat)'::tsquery;
SELECT 'super:*'::tsquery; -- sufix search for 'super'.
```

#### Config

```plaintext
# File: postgresql.conf

# Default config for some functions, such as 'to_tsvector' and 'to_tsquery'.
# pg_catalog.simple is a general config.
default_text_search_config = 'pg_catalog.simple'

# Note: There are Some languages unimplemented.
```

