## TestMain

TestMain runs in the main goroutine and can do whatever setup and teardown is necessary around a call to `m.Run`.

```go
func TestMain(m *testing.M) {
    // setup
    code := m.Run()
    // teardown
	os.Exit(code)
}
```
