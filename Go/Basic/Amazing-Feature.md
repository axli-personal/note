# Amazing Feature

## Type

### Definition

```go
// Temperature is a new type which differ from float64.
type temperature float64

// Temperature is not a new type which can be used to solve the type dependency problem.
type temperature = float64
```

### Boolean

```go
// true and false was the only two value for bool in go, this is reletive strict.
var condition bool = 1 // not allowed
var condition bool = bool(1) // not allowed


// '===' and '!===' was not provided in go, go forbid to compare string with other type.
var condition bool = 1 == "1" // not allowed


// because of the strict bool value in go, assign was never be confused with equal.
if 1 = 2 {
	fmt.Println("error")
}


// No value is equal to NaN include itself, so always false.
if math.NaN() == math.NaN() {
	fmt.Println("unreach")
} else {
	fmt.Println("unequal")
}
```

### Array

```go
// 1.Array in go is similar to array in C, both of which have fixed length.
// 2.We use [constNumber]storeType to repersent the type of array.
// 3.You can use keyword range to walk through the array.
// 4.Assigning to another vaiable is finish by value copy, not address copy.

// ---example--
array := [3]int{1, 2} // empty value was set to default value of int.
for index, item := range array { // enough to handle simple operation
    fmt.Println(index, item)
}
```

### Slice

#### Usage

```go
// 1.silce is a view to array and can control the array.
// 2.You can use append(youSilce, value) to add value.
// 3.You can use cap(youSilce) to get the capcity of you silce.
// 4.append enlarge the room of array when overflow and a silce to new larger array will return.
// 5.You can use [0:3:3] to define the cap to avoid append rewrite the rest of the array. 
```

#### Tips

  ```go
  // 1.You can use '...' in '[]' to let compiler to calculate the length of the init list.
  // 2.You can use '...' before type to hold mutiple args.
  // 3.You can use '...' after vaiable to let the silce become mutiple args.
  
  // ---example---
  array := [...]int{1, 2, 3}
  func sum(nums ...int) int {
  	value := 0
  	for _, item := range nums {
  		value += item
  	}
  	return value
  }
  fmt.Println(sum(array[:]...))
  ```

### Map

#### Usage

```go
// 1.You can use map[keyType]ValueType to represent the type of map, not like C++ and Java.
// 2.You can use youMap[key] to update or add a pair in map.
// 3.You can use delete(youMap, key) to delete a pair in map.
// 4.Go don't allow you to add duplicate pair in map, so the map[keyType]bool used as set.
// 5.When visit, no assign and the pair don't exist, you will got default value.
// 6.Solution to judge if exist, value, ok = youMap[key]
// 7.Not like array, map pass by address.
// 8.You can use make(type, roomSize) to allocate memory for map or synatx of { pair }.
```

#### Tips

```go
// 1.Declare a map without initialization, then it will be nil.
// 2.Visiting a entry in nil map will get default value and false.
// 3.Updating a entry in nil map will get panic(assignment to entry in nil map).
// 4.Deleting a entry in nil map will get nothing.

// Nil Map
var dictionary map[string]string
val, ok := dictionary["word"] // "", false
dictionary["word"] = "raise panic"

// Pointer Key
dict := map[*int]int{}
dict[nil] = 26
val, ok := dict[nil] // 26, true
```

### Fuction

#### Function Type

```go
// 1.Function can assign to variable, pass to parameter or returned by function.
// 2.Function can be a type, differ from parameter to return item.
type sayFunc func(string name) error
```

#### Anonymous Function

```go
// Append '()' at the end of Anonymous Function to call it immediately.
var sayHiFunc sayFunc = func(string name) {
    fmt.Println("Hi" + name)
}
  ```

##### Interface

* ###### Implicit implementation

  ```go
  // 1.Type doedn't need to specify the interface it implements because of powerful compiler.
  // 2.Familiar with some important interface provided by the standard library.
  // ---Common interface---
  type Writer interface // io
  type Reader interface // io
  ```

* ###### Detail

  ```go
  // 1.Variable whose type is interface can't call the exist method without delclaration.
  ```

### Perfect control

#### `switch`

```go
// 1.The value for switch can be number or string even mutiple value separated by ','.
// 2.When a case finish, the default action is break immediately.
// 3.Use 'fallthrough' to execute the next branch.

// ----example----
switch 1 {
case 1, 2:
    fmt.Println("one")
    fallthrough // Execute next branch
case 3:
    fmt.Println("two") // Can reach
case 4:
    fmt.Println("three") // Can't reach
default:
    fmt.Println("default")
}
```

#### `for`

```go
// 1.for is magic, it conbine the power of while and for in other languages.
// 2.for can followed by a condition or none(never stop).
// 3.you could use break to jump out in the block of for.
```

#### label

```go
// Warning: label is very dangerous and you should take care of it.

// Actually you can mark one line as a label for no conditional jump.

// Label used below must followed by a 'for' or 'switch' block.
// Label with 'break' mean jump out of a 'for' or 'switch' block.
// Label with 'continue' mean jump into a 'for' or 'switch' block.

// Warning: think twice when use 'goto'.
// Label with 'goto' mean jump to any label without any restriction.

out:
	for i := 0; i < 5; i++ {
		for j := 0; j < 5; j++ {
			if i == 3 && j == 3 {
				break out // Convenience of 'label'.
			}
			fmt.Println(i, j)
		}
	}
	fmt.Println("done")
	goto out // Bad usage of 'goto' without warn given by linter.
```

#### `short declaration`

```go
// 1.short declaration is not a small trick.
// 2.it bring us a more brief expression.
// 3.it enhance the power of variable management in block of 'if', 'for', 'switch'.

// ---example---
if ok := someConditionFunc(); ok {...}
for i := 0; i < 10; i++ {...}
switch choice := someSwitchFunc(); choice {...}
// Note: all variable will clean when block finish.
// Note: You can't use var declaration to replace it because var can't follow those keyword.
// Note: You can't use short declaration in package block.
```

### Assumption the type behind the `interface{}`

The `interface{}` was used quiet often in golang and you may want to know the underlying type.

Now you can guess as you like with correct result.

```go
var any interface{} = 3.14
if num, ok := any.(float64); ok {
	fmt.Printf("Oh! It is float64(%v)", num)
}
```

When you have many idea you can use a fantastic switch statement.

Note this grammer can be used only behind switch.

```go
var any interface{} = ""
switch any.(type) {
case int:
	fmt.Println("Oh! It is int")
case string:
	fmt.Println("Oh! It is string")
}
```

