# 线程

## 线程创建

* 实现`Runnable`.
* 实现`Callable`: 返回值, 可抛异常.

## 线程状态

* NEW: 对象创建.
* RUNNABLE: READY/RUNNING.
* BLOCKED: 获取锁.
* WAITING: 无限等待.
* TIMED_WAITING: 限时等待.
* TERMINATED: 终止.

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

* 核心线程数: 每秒任务数(80%分位点) * 任务平均耗时.
* 阻塞队列长度: 核心线程每秒处理的任务数 * 最大等待时间.
* 非核心线程数: (每秒任务数(95%分位点) - 阻塞队列长度) * 任务平均耗时.

### 任务处理流程

![1](https://oos.axlis.cn/note/Java/1.png)
