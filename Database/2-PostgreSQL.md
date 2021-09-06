#### Control the service

```bash
systemctl <signal> postgresql.service
```

#### Super user

The super user's name is 'postgres'.

The super user doesn't have a password for security.

```bash
sudo -u postgress <command>
```

#### psql internal commands

* `\d`: show relations in the database
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

##### char(n)

* 1) Fixed-length string.

##### varchar(n)

* 1) Variable-length string.

##### text

* 1) variable-length string

##### date

* 1) year + month + day

#### money

* 1) There will be two fractional digits.
* 2) It accepts various input format.
* 3) Its ouput format is seted by variable `lc_monetary`.