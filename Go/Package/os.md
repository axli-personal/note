## MkdirTemp

```go
dir, err := os.MkdirTemp(os.TempDir(), "application-*")
```

`os.TempDir` will return system temp directory (`/tmp` in Linux).

The last `*` will be replace by random generated string.
