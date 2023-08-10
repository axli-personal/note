# IO

## 阻塞式IO

## 非阻塞式IO

### Buffer

```java
// 将limit设置为capacity, 准备将数据写入缓冲区.
public Buffer clear() {
    position = 0;
    limit = capacity;
    mark = -1;
    return this;
}

// 将limit设置为position, 准备从缓冲区中读取数据.
public Buffer flip() {
    limit = position;
    position = 0;
    mark = -1;
    return this;
}
```

### Reactor

单线程模型, 由一个线程处理连接建立、IO读写、业务逻辑, 这种方案吞吐量低、延时大.

多线程模型, 由单独的Handler线程处理业务逻辑.

主从多线程模型, 由单独的Acceptor线程(主)处理连接建立, 由单独的IO线程(从)处理连接建立, 这种方案吞吐量大、延时低.

当IO压力大时可以调整IO线程池的参数, 当Handler线程压力大时可以调整Handler线程池的参数.

一般Acceptor线程不会有太大压力, 因为建立连接一般都很快, 不需要使用多线程.
