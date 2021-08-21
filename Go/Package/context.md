#### `type Context`

```go
// This is the interface exposed to user to control underlying struct.
// We create instances through public API below.
type Context interface {
    Done() <-chan struct{}
	Deadline() (deadline time.Time, ok bool)
	Err() error
	Value(key interface{}) interface{}
}
```

#### `type emptyCtx`

```go
type emptyCtx int

// Return false to indicate that there is no deadline.
func (*emptyCtx) Deadline() (deadline time.Time, ok bool) { return }

// Reading from nil channel will always block.
func (*emptyCtx) Done() <-chan struct{} { return nil }

func (*emptyCtx) Err() error { return nil }

func (*emptyCtx) Value(key interface{}) interface{} { return nil }
```

#### `func Background`

```go
// background is the address of an emptyCtx.
var background = new(emptyCtx)

func Background() Context { return background }

// Note: Create Context from nil will raise panic.
```

#### `type cancelCtx`

```go
type cancelCtx struct {
	Context // The address of underlying struct of parent.
	mu       sync.Mutex
	done     chan struct{}
	children map[canceler]struct{}
	err      error
}

// As you can see, cancelCtx implement two API itself.

func (c *cancelCtx) Done() <-chan struct{} {
	c.mu.Lock()
	if c.done == nil {
		c.done = make(chan struct{})
	}
	d := c.done
	c.mu.Unlock()
	return d
}

func (c *cancelCtx) Err() error {
	c.mu.Lock()
	err := c.err
	c.mu.Unlock()
	return err
}

// The address of cancelCtxKey is unique and different from any key in valueCtx.
var cancelCtxKey int

// This Implementation is just for search nearest cancelCtxKey.
func (c *cancelCtx) Value(key interface{}) interface{} {
	if key == &cancelCtxKey {
		return c
	}
	return c.Context.Value(key)
}

var closedchan = make(chan struct{})

// Opposite to propagateCancel below.
func (c *cancelCtx) cancel(removeFromParent bool, err error) {
	c.mu.Lock()
	if c.err != nil {
		c.mu.Unlock()
		return
	}
	c.err = err
	// If Done hasn't been called, reuse the closedchan.
	if c.done == nil {
		c.done = closedchan
	} else {
		close(c.done)
	}
    // Then cancel all the children Recursively.
	for child := range c.children {
		child.cancel(false, err)
	}
	c.children = nil
	c.mu.Unlock()

	if removeFromParent {
		removeChild(c.Context, c)
	}
}
```

#### `func WithCancel`

```go
func WithCancel(parent Context) (ctx Context, cancel CancelFunc) {
	c := cancelCtx{Context: parent}
	propagateCancel(parent, &c)
	return &c, func() { c.cancel(true, Canceled) }
}
```

#### `type timerCtx`

```go
// When you look at timerCtx, you will find it embeds a cancelCtx instead of Content.
type timerCtx struct {
	cancelCtx
	timer    *time.Timer
	deadline time.Time
}

// As you can see, cancelCtx implement one API itself.

func (c *timerCtx) Deadline() (deadline time.Time, ok bool) { return c.deadline, true }

// Extend a little above cancelCtx.
func (c *timerCtx) cancel(removeFromParent bool, err error) {
	c.cancelCtx.cancel(false, err)
	if removeFromParent {
        // Set the right parent c.
		removeChild(c.cancelCtx.Context, c)
	}
    // Stop the timer.
	c.mu.Lock()
	if c.timer != nil {
		c.timer.Stop()
		c.timer = nil
	}
	c.mu.Unlock()
}
```

#### `func WithDeadline`

```go
func WithDeadline(parent Context, d time.Time) (Context, CancelFunc) {
    // The parent was wraped once with later time.
	if cur, ok := parent.Deadline(); ok && cur.Before(d) {
		return WithCancel(parent)
	}
    // The parent was wraped once with earlier time.
	c := &timerCtx{
		cancelCtx: newCancelCtx(parent),
		deadline:  d,
	}
	propagateCancel(parent, c)
	dur := time.Until(d)
	if dur <= 0 {
		c.cancel(true, DeadlineExceeded)
		return c, func() { c.cancel(false, Canceled) }
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.err == nil {
		c.timer = time.AfterFunc(dur, func() {
			c.cancel(true, DeadlineExceeded)
		})
	}
	return c, func() { c.cancel(true, Canceled) }
}
```

#### `type valueCtx`

```go
// There is no public API to change val safely in multiple threads.
type valueCtx struct {
	Context
	key, val interface{}
}

// As you can see, cancelCtx implement one API itself.

func (c *valueCtx) Value(key interface{}) interface{} {
	if c.key == key {
		return c.val
	}
	return c.Context.Value(key)
}
```

#### `type WithValue`

```go
func WithValue(parent Context, key, val interface{}) Context {
	if key == nil {
		panic("nil key")
	}
	if !reflectlite.TypeOf(key).Comparable() {
		panic("key is not comparable")
	}
	return &valueCtx{parent, key, val}
}
```

#### `func propagateCancel`

```go
// The propagateCancel record child to nearstest cancelCtx's children field.
func propagateCancel(parent Context, child canceler) {
	done := parent.Done()
	if done == nil {
		return
	}

	select {
	case <-done:
		child.cancel(false, parent.Err())
		return
	default:
	}

	if p, ok := parentCancelCtx(parent); ok {
		p.mu.Lock()
		if p.err != nil {
			child.cancel(false, p.err)
		} else {
			if p.children == nil {
				p.children = make(map[canceler]struct{})
			}
			p.children[child] = struct{}{}
		}
		p.mu.Unlock()
	} else {
        // This was for internal testing and you don't need care about it.
		atomic.AddInt32(&goroutines, +1)
		go func() {
			select {
			case <-parent.Done():
				child.cancel(false, parent.Err())
			case <-child.Done():
			}
		}()
	}
}
```

