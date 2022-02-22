# url

## Values

Values用于进行URL-encoded相关的操作, 其定义如下:

```go
type Values map[string][]string
```

编码可以使用Encode方法, 解码可以使用ParseQuery.
