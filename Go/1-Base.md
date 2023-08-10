# 基础

## 结构体

### Struct pointer or struct receiver

```go
// 1.Struct pointer and struct are different type.
// 2.Struct pointer and struct implement different interface.
// 3.Struct pointer can change the field of receiver.
// 4.Keep the consistency of the receiver to provide convenience for users.
```

### Embedded field

```go
// 1.A field contains type but missed name will be embeded in outer struct.
// 2.Embedded field will have the same name as its type.
// 3.Inner type's function and field will be forwarded by outer struct.
// 4.Rewrite the forwarding function to avoid name conflicts.
```

### 结构体标签

结构体标签可以指定JSON编码.

```go
type Response struct {
	Id int64 `json:"id,string"` // JSON编码为string.
}
```

```go
// 1.Tag is a string usually written by compound literal.
// 2.Use space to separate each pair.
// 3.Tag can be captured by reflection mechanism.
```
