# Generic

> Generic will be introduced in go1.8 at 2022, Feb.

## Instantiation

Instantiation produces a non-generic function.

1> Substitute type arguments for type parameters.

2> Check that type arguments implement their constraints.

```go
func min[T constraints.Ordered](x, y T) T {
    if (x < y) {
        return x
    }
    return y
}

// It is evaluated as (min[int])(2, 3).
m := min[int](2, 3)

// So you can get the instantiation function.
fmin := min[float64]
```

A generic binary tree:

```go
type Tree[T interface{}] struct {
	left, right *Tree[T]
	data
}

func (t *Tree[T]) Loockup(x T) *Tree[T] {
	// implement me
}
```

## Type Constraints

The standard libaray will have a new member `constraints` and type constraints must be interfaces:

```go
package constraints

// New token in Go: '~'. It means the set of all type with specific underlying type.
type Ordered interface {
    Integer|Float|~string
}
```

## Constaints literals

This give a simple way to write your go code:

```go
[S interface{~[]E}, E interface{}]

// In type constraint postion, interface{E} may be written as E.
[S ~[]E, E interface{}]

// New token in Go 'any'. It is a alias of interface{}. Great!
[S ~[]E, E any]
```

## Type Inference

```go
func min[T constraints.Ordered](x, y T) T {
    if (x < y) {
        return x
    }
    return y
}

var a, b, m float64

// Calling min with type inference.
m := min(a, b)
```

