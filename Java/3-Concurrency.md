# 并发

## ReentrantLock

内部维护了**持有者计数**, 当前线程**可以多次加锁**, 但需要保证加锁次数和解锁次数相等.

> 解锁需要在finally中进行.

## TODO: 什么是轻量级锁?

## AQS

![AQS](https://img.axlis.cn/note/Java/AQS.png)

* 非公平: 不管阻塞队列是否为空都直接使用CAS尝试获取锁.

## ThreadLocal

![ThreadLocal](https://img.axlis.cn/note/Java/ThreadLocal.png)

* 线程隔离
* 参数传递

```java
public class ThreadLocalTest {
    // 每个线程都有独立的SimpleDateFormat.
    private static final ThreadLocal<DateFormat> format = ThreadLocal.withInitial(() -> {
        return new SimpleDateFormat("yyyy-MM-dd");
    });

    public static void main(String[] args) {
        ThreadPoolExecutor pool = new ThreadPoolExecutor(4, 8, 1, TimeUnit.SECONDS, new ArrayBlockingQueue<>(100));

        for (int i = 0; i < 100; i++) {
            pool.execute(() -> {
                try {
                    Date date = format.get().parse("2023-01-01");
                    System.out.println(date);
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            });
        }

        pool.shutdown();
    }
}
```
