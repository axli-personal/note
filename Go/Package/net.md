### `Package net`

#### `Func Listen`

```go
// The network can be tcp, tcp4, tcp6, etc.
// tcp<x> mean only listen tcp<x> request.
// If the port is empty or '0', port will be chosen randomly.
func Listen(network, address string) (Listener, error)
```

