# Profiling

## 协程

使用工具进行分析:

```sh
go tool pprof -http=:8000 http://localhost:9000/debug/pprof/goroutine
```

对比分析:

```sh
wget -O goroutine.base http://localhost:9000/debug/pprof/goroutine
go tool pprof -http=:8000 -base goroutine.base http://localhost:9000/debug/pprof/goroutine
```

图形界面:

* 在Graph中选中节点, 然后点击Graph即可看到只包含选中节点的视图.
* 在Graph中选中节点, 然后点击Source即可看到只包含选中节点的代码.
* 子节点为`chanrecv`表示对应协程正在读取channel, 并处于阻塞状态.
* 子节点为`selectgo`表示对应协程正在执行select, 并处于阻塞状态.

> 如果无法显示项目代码, 可以尝试在项目根目录执行命令.

## Heap

使用工具进行分析:

```sh
go tool pprof -http=:8000 http://localhost:9000/debug/pprof/heap
```

对比分析:

```sh
wget -O heap.base http://localhost:9000/debug/pprof/heap
go tool pprof -http=:8000 -base heap.base http://localhost:9000/debug/pprof/heap
```

参考资料:

[Finding Memory Leaks in Go Programs](https://www.youtube.com/watch?v=ydWFpcoYraU)

## CPU

```sh
go tool pprof -http=:8000 http://localhost:9000/debug/pprof/profile?seconds=30
```

## Trace

```sh
wget -O trace.out http://localhost:9000/debug/pprof/trace?seconds=30
go tool trace -http=:8000 trace.out
```

## 实战

ConsumerGroup的内存泄漏:

![1](https://img.axlis.cn/note/Go/1.png)
