# 基础

## 字符串拼接

* `s1 + s2`
* `s1.concat(s2)`
* StringBuilder: 非线程安全.
* StringBuffer: 线程安全, `append`方法被`synchronized`修饰.

> Java中String是不可变对象, 每次拼接都会产生新的String对象, 使用StringBuilder可以减少String对象的分配.

## 输入输出流

* 阻塞: 字节流, 字符流, 缓冲流.
* 非阻塞: 选择器, 通道(FileChannel, SocketChannel), 缓冲区.
* 异步: AsynchronousChannel, CompletionHandler.

## 集合类

* List: ArrayList, LinkedList.
* Set: HashSet, TreeSet.
* Map: HashMap, TreeMap.
* Queue.

```java
for (var entry : map.entrySet()) {
    var key = entry.getKey();
    var value = entry.getValue();
}
```

## 编译运行过程

* 编译生成字节码
* 类加载
* 解释执行
