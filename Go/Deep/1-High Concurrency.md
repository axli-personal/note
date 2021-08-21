### package sync

#### WaitGroup

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

#### RWMutex

```go
type RWMutex struct {
	// Unexported fields
}
```

RWMutex is special mutex mainly for a situation when read times exceed write times. The lock can be held by mutiple readers or a single writer. The zero value for a RWMutex is an unlocked mutex.

A RWMutex must not be copied after first use.

If a goroutine holds a RWMutex for reading and another goroutine might call Lock, no goroutine should expect to be able to acquire a read lock until the initial read lock is released. In particular, this prohibits recursive read locking. This is to ensure that the lock eventually becomes available. 

A blocked Lock call excludes new readers from acquiring the lock, so writer can have chance to gain the lock.

```go
value := 0
resource := sync.RWMutex{}
group := sync.WaitGroup{}
group.Add(1)
go func() {
	resource.RLock()
	fmt.Println(value)
	resource.RLock() // recursive read locking, normal
	fmt.Println(value)
	resource.RUnlock()
	resource.RUnlock()
	group.Done()
}()
```

```go
value := 0
resource := sync.RWMutex{}
group := sync.WaitGroup{}
group.Add(2)
go func() {
    resource.RLock()
    time.Sleep(time.Second * 2)
    fmt.Println(value)
    resource.RLock() // recursive read locking, deadlock
    fmt.Println(value)
    resource.RUnlock()
    resource.RUnlock()
    group.Done()
}()
go func() {
    time.Sleep(time.Second)
    resource.Lock()
    value++
    resource.Unlock()
    group.Done()
}()
group.Wait()
```

```go
func (rw *RWMutex) Lock()
```

Lock for writing. This will blocked util all other writers and reader finish their work.

```go
func (rw *RWMutex) RLock()
```

Lock for reading.

```go
func (rw *RWMutex) RUnlock()
```

```
func (rw *RWMutex) Unlock()
```

#### Chanel Comparison

Equal if they were created by the same call to `make` or if both have value `nil`.

