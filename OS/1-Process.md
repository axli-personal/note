# 进程

## 原语

原语(primitive)是一种具有原子性的函数. 它一旦执行, 中途就无法停止.

原语防止了系统混乱的产生. 进程创建, 进程撤销, 进程阻塞, 进程唤醒都由原语实现.

## Windows进程管理

| API              | meaning                          |
| ---------------- | -------------------------------- |
| CreateProcess    | creates a new process            |
| ExitProcess      | ends the calling process         |
| TerminateProcess | terminates the specified process |

TerminateProcess结束进程时比较暴力, 不会通知相关的其他进程, 例如: Windows任务管理器结束任务.

我们也可以通过其他封装API来创建进程, 例如: `system`, `WinExec`, `ShellExecute`.

## Linux进程管理

| API         | meaning                               |
| ----------- | ------------------------------------- |
| fork        | creates a new process by clone itself |
| exec family | creates a new process                 |

fork在父进程中会返回PID(失败返回-1), 而在子进程中会返回0.

在进程克隆完成后, 父子进程均从fork函数的下条语句开始执行.