# 并发

## ReentrantLock

内部维护了**持有者计数**, 当前线程**可以多次加锁**, 但需要保证加锁次数和解锁次数相等.

> 解锁需要在 finally 中进行.

## TODO: 什么是轻量级锁?

## AQS

![AQS](https://img.axlis.cn/note/Java/AQS.png)

- 非公平: 不管阻塞队列是否为空都直接使用 CAS 尝试获取锁.

## ThreadLocal

![ThreadLocal](https://img.axlis.cn/note/Java/ThreadLocal.png)

- 线程隔离
- 参数传递

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

## Future

线程池中执行任务时, 使用`submit()`传入`Callable`对象, 会得到对应的`Future`.

```java
class ThreadTest {
    public static void main(String[] args) {
        var executor = new ThreadPoolExecutor(4, 8, 1, TimeUnit.SECONDS, new ArrayBlockingQueue<>(10));

        var future = executor.submit(() -> "Hello World");

        System.out.println("Do some computation");

        try {
            System.out.println(future.get());
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        executor.shutdown();
    }
}
```

## CompletableFuture

使用`CompletableFuture`执行链式的异步任务:

```java
class ThreadTest {
    public static void main(String[] args) {
        var executor = new ThreadPoolExecutor(4, 8, 1, TimeUnit.SECONDS, new ArrayBlockingQueue<>(10));

        var future = CompletableFuture.supplyAsync(
                () -> {
                    Integer num = 1;
                    System.out.println("[step 1] get num: " + num);
                    return num;
                },
                executor
        ).thenApply(
                (Integer num) -> {
                    Integer addNum = 1;
                    System.out.println("[step 2] add num: " + addNum);
                    return num + addNum;
                }
        );

        try {
            System.out.println("[result] num: " + future.get());
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        executor.shutdown();
    }
}
```
