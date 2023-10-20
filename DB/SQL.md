# SQL

SQL是一个工程师的基本功, 在面试的时候也时常会遇到SQL问题.

## [每件商品的最新订单](https://leetcode.cn/problems/the-most-recent-orders-for-each-product/)

Customers(<u>customer_id</u>, name)\
Orders(<u>order_id</u>, order_date, customer_id, product_id)\
Products(<u>product_id</u>, product_name, price)

问题: 找到每件商品的最新订单(可能有多个)?

```sql
SELECT product_name, Orders.product_id, order_id, order_date
FROM Orders
JOIN (
    SELECT product_id, MAX(order_date) AS max_date
    FROM Orders GROUP BY product_id
) AS Statistic
JOIN Products
WHERE Orders.product_id = Statistic.product_id
AND Orders.order_date = Statistic.max_date
AND Orders.product_id = Products.product_id
ORDER BY product_name, product_id, order_id;
```

先使用子查询统计一下每件商品最大的订单日期, 然后在JOIN订单, 并只保留最新的订单.

## [最近三笔订单](https://leetcode.cn/problems/the-most-recent-three-orders/)

Customers(<u>customer_id</u>, name)\
Orders(<u>order_id</u>, order_date, customer_id, cost)\

问题: 找到每个用户的最近三笔订单. 如果用户的订单少于3笔, 则返回他的全部订单.

```sql
SELECT
    c.name AS customer_name,
    c.customer_id,
    o.order_id,
    o.order_date
FROM Customers AS c
JOIN (
    SELECT
        customer_id,
        order_id,
        order_date,
        row_number() OVER (
            PARTITION BY customer_id ORDER BY order_date DESC
        ) AS row_num
    FROM Orders
) AS o
ON c.customer_id = o.customer_id
WHERE row_num <= 3
ORDER BY customer_name, customer_id, order_date DESC;
```

使用row_number确定每个客户订单的顺序, 在外面JOIN后筛选出行号小于等于3的数据.

::: tip 相关知识
row_number, rank, dense_rank都可以对数据进行排名:

* row_number: (1, 2, 3)、(4, 5)
* rank: (1, 1, 1)、(4, 4)
* dense_rank: (1, 1, 1)、(2, 2)

语法: `function() OVER (PARTITION BY <...> ORDER BY <...> )`.
:::

## [每天的最大交易](https://leetcode.cn/problems/maximum-transaction-each-day/)

Transactions(<u>transaction_id</u>, day, amount)

问题: 找出每天交易金额amount最大的交易ID. 如果一天中有多个这样的交易, 返回所有交易的ID.

```sql
SELECT transaction_id
FROM (
    SELECT 
        transaction_id,
        rank() OVER (PARTITION BY day ORDER BY amount DESC) AS rnk
    FROM Transactions
) AS t
WHERE t.rnk = 1
ORDER BY transaction_id;
```

## 参考资料

> [大数据SQL讲解(B站)](https://www.bilibili.com/video/BV1je4y1b7YU)\
> [MySQL排名函数(CSDN)](https://blog.csdn.net/weixin_42272869/article/details/116372776)
