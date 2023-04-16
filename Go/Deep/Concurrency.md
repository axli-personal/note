# 并发

## Mutex

* 正常模式: 队头协程被唤醒后, 通过CompareAndSwap尝试获取锁.
* 饥饿模式: 队头协程长时间获取不到锁时, 直接将锁交给队头协程.
* 自旋: 新协程获取锁时, 如果满足一定条件, 可以短暂自旋, 通过CompareAndSwap尝试获取锁.

## RWMutex

* 在读多写少的常见下能提高锁的性能.
* 如果有写者正在等待锁, 那么新的读者将获取不到锁, 以防止写者无限等待.

## Cond

* Wait: 自动释放底层锁, 并等待条件触发; 当前协程被唤醒, 自动获取锁.
* Signal: 唤醒一个协程.
* Broadcast: 唤醒所有协程.

## WaitGroup

```go
func work(tasks ...string) {
	var group sync.WaitGroup // forbid copy
	group.Add(len(tasks))    // add the number of goroutines to wait

	for _, task := range tasks {
		go func(task string) {
			fmt.Println(task, "Start")
			group.Done()
		}(task)
	}

	group.Wait()
	fmt.Println("All tasks done!")
}
```
