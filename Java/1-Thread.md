# 线程

## 线程创建

* 实现`Runnable`.
* 实现`Callable`: 返回值, 可抛异常.

## 线程池

### 参数

```java
public ThreadPoolExecutor(
    int corePoolSize,
    int maximumPoolSize,
    long keepAliveTime,
    TimeUnit unit,
    BlockingQueue<Runnable> workQueue,
    ThreadFactory threadFactory,
    RejectedExecutionHandler handler
)
```

## 任务处理流程

![1](https://oos.axlis.cn/note/Java/1.png)