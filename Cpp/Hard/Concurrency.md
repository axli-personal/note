# 并发

## 为什么使用并发?

### 借助并发来实现分离

通过并发来对不同的功能进行分离, 特别是这些功能中操作需要同时进行.

即便没有使用多线程, 我们也需要手写一个**调度框架**或频繁进行**跨边界操作**.

### 借助并发来提升性能

计算机的算力提升来源于**单核性能**和**核心数量**, 所有并发可以充分利用计算机的算力.

* Task Parallelism: 将任务分成不同部分, 并交由不同线程处理.
* Data parallelism: 将数据分成不同部分, 并交由不同线程处理.

## 线程管理

C++会自动启动一个线程来运行`main()`, 任何线程会在在入口函数返回后被销毁.

C++中使用`thread`类来管理线程, 每个运行的线程都由唯一对应的`thread`对象管理.

### 启动线程

启动线程最终都需要构造一个`thread`对象, 其构造函数接受任何**可调用**(callable)的东西.

```cpp
#include <thread>

void hello() {
    cout << "Hello Concurrent World" << endl;
}

int main() {
    thread worker(hello); // 传递入口函数.
    worker.join();        // 等待worker线程结束.
}
```

上面例子中, 如果不等待worker线程结束那么程序肯定会由于worker对象的析构而**异常退出**.

```cpp
thread::~thread() {
    if (joinable()) terminate(); // 析构函数无法处理此情形.
}
```

