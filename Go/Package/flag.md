### `package flag`

#### `func Bool`

```go
// Define a bool flag return a pointer to the variable prased in the future.
// Don't dereference before parsing.
func Bool(name string, value bool, usage string) *bool
```

#### `func Int`

```go
// Define a int flag return a pointer to the variable prased in the future.
// Don't dereference before parsing.
func Int(name string, value int, usage string) *int
```

#### `func String`

```go
// Define a string flag return a pointer to the variable prased in the future.
// Don't dereference before parsing.
func String(name string, value string, usage string) *string
```

#### `func Parse`

```go
// Parse the flag defined before from command args.
func Parse()
```

