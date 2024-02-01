# Spring

## 事务

### 编程式事务

#### PlatformTransactionManager

```java
package org.springframework.transaction;

// 偏底层的API, 编写事务代码可以使用TransactionTemplate、@Transaction注解.
public interface PlatformTransactionManager extends TransactionManager {
	// 给定事务的定义(传播行为、隔离等级、超时时间等), 事务管理器会创建新的事务/复用已有事务, 并返回事务的状态.
	TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;

    // 提交/回滚事务.
	void commit(TransactionStatus status) throws TransactionException;
	void rollback(TransactionStatus status) throws TransactionException;
}
```

#### TransactionTemplate

通过`execute`和`executeWithoutResult`简化最后的`commit`和`rollback`的过程.

::: tip 提示
当传入函数抛出异常/调用了`setRollbackOnly`, 事务就会被回滚.
:::

### 声明式事务

声明式事务是基于AOP的, 也会遇到一些事务失效的问题:

1. 类内调用, 绕过了动态代理: 使用编程式事务/将方法封装到单独的类里.

::: tip 提示
一些常见的事务失效场景, IDEA会给出提醒.
:::
