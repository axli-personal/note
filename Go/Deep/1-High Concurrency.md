#### sync.WaitGroup

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

