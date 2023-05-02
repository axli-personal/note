# Context

## 超时控制

```go
type User struct {
	Id   int
	Name string
}

func fetchUser(ctx context.Context, id int) (User, error) {
	ctx, cancel := context.WithTimeout(ctx, 100*time.Millisecond)
	defer cancel()

	resultChannel := make(chan User)

	go func() {
		time.Sleep(500 * time.Millisecond)
		resultChannel <- User{
			Id:   id,
			Name: "jack",
		}
	}()

	select {
	case <-ctx.Done():
		return User{}, errors.New("fetch user timeout")
	case user := <-resultChannel:
		return user, nil
	}
}
```