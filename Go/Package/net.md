### `package net`

#### `func Listen`

```go
// The network can be tcp, tcp4, tcp6, etc.
// tcp<x> mean only listen tcp<x> request.
// If the port is empty or '0', port will be chosen randomly.
func Listen(network, address string) (Listener, error)
```

#### `type ResponseWriter`

```go
// Change the Header first, then call WriteHeader after.
type ResponseWriter interface {
    
    // Return the Header of the response.
    Header() Header
    
    // Write to the Body of the response.
    // If content-type is unknow, then write determine the content-type automatically.
    Write([]byte) (int, error)
    
    // Return the specific code.
    WriteHeader(statusCode int)
}
```

