### `package sort`

#### `type Interface`

```go
// Collection need to implement this to be sortable.
// Some basic slice had implement this, but need transformation.
// Such as 'IntSlice', 'StringSlice', 'Float64Slice'.
type Interface interface {
	Len() int
	Less(i, j int) bool
	Swap(i, j int)
}
```

#### `func Sort`

```go
// Sort use quickSort to sort data.
func Sort(data Interface) {
	n := data.Len()
	quickSort(data, 0, n, maxDepth(n))
}
```

#### `func Reverse`

```go
// It's hard to transform Interface to its orignal type.
// I suggest the return value should only used to sort.
// And you can see the change in data passed in.
// I suggest we shouldn't call Reverse recuresivly.
func Reverse(data Interface) Interface
```

