# time

### `package time`

#### `type timer`

```go
// ----Structure and New----

// Timer is designed for one times event and C will only get one signal.
type Timer struct {
	C <-chan Time
	r runtimeTimer
}


// Create a runtimeTimer and give it to a specfic system goroutine to mamage.
func NewTimer(d Duration) *Timer
```

```go
// ----Method----

// Stop remove runtimeTimer from system goroutine and return whether stop before time out.
func (t *Timer) Stop() bool
```

