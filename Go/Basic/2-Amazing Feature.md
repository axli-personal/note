#### Mutiple type

##### Define

* ###### Two methods

  ```go
  type temperature float64
  type temperature = float64
  ```

##### Simple

* ###### bool

  ```go
  // 1.true and false was the only two value for bool in go, this is reletive strict.
  var condition bool = 1 // not allowed
  var condition bool = bool(1) // not allowed
  
  // 2.'===' and '!===' was not provided in go, go forbid to compare string with other type.
  1 == "1" // not allowed
  `
  // 3.because of the strict bool value in go, assign was never be confused with equal.
  if 1 = 2 {...} // miss a '=' will raise a error.
  ```

* ###### array

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

##### Silce

* ###### usage

  ```go
  // 1.silce is a view to array and can control the array.
  // 2.You can use append(youSilce, value) to add value.
  // 3.You can use cap(youSilce) to get the capcity of you silce.
  // 4.append enlarge the room of array when overflow and a silce to new larger array will return.
  // 5.You can use [0:3:3] to define the cap to avoid append rewrite the rest of the array. 
  ```

* ###### `...`

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

##### map

* ###### usage

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

* ###### nil map

  ```go
  // 1.Declare a map without initialization, then it will be nil.
  // 2.Visiting a entry in nil map will get default value and false.
  // 3.Updating a entry in nil map will get panic(assignment to entry in nil map).
  // 4.Deleting a entry in nil map will get nothing.
  
  // ---example---
  var dictionary map[string]string
  meaning, ok := dictionary["goroutine"]
  delete(dictionary, "panic")
  fmt.Println(meaning, ok)
  dictionary["goroutine"] = "Look at the doc of google" // Oh no
  ```

##### fuction

* ###### function type

  ```go
  // 1.Function can assign to variable, pass to parameter or returned by function.
  // 2.Function can be a type, differ from parameter to return item.
  type sayFunc func(string name) error
  ```

* ###### function literal

  ```go
  // 1.function literal don't has name.
  var sayHiFunc sayFunc = func(string name) {
      fmt.Println("Hi" + name + "!")
  }
  // 2.Append '()' at the end of function literal to call it.
  ```

##### Struct

* ###### Struct pointer or struct receiver

  ```go
  // 1.Struct pointer and struct are different type.
  // 2.Struct pointer and struct implement different interface.
  // 3.Struct pointer can change the field of receiver.
  // 4.Keep the consistency of the receiver to provide convenience for users.
  ```

* ###### Embedded field

  ```go
  // 1.A field contains type but missed name will be embeded in outer struct.
  // 2.Embedded field will have the same name as its type.
  // 3.Inner type's function and field will be forwarded by outer struct.
  // 4.Rewrite the forwarding function to avoid name conflicts.
  ```

* ###### Fancy Tag

  ```go
  // 1.Tag is a string usually written by compound literal.
  // 2.Use space to separate each pair.
  // 3.Tag can be captured by reflection mechanism.
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

#### Perfect control

`switch`

```go
// 1.switch value can be number or string which bring us convinence.
// 2.go don't need keyword break in switch because it stop when a branch finish by deault.
// 3.go provided fallthrough keyword to jump to next branch, just one.
// 4.go allowed you to set mutiple value to a branch, separate by ','.

// ---example---
switch 1 {
case 1, 2:
    fmt.Println("one")
    fallthrough // jump to next branch
case 3:
    fmt.Println("two") // can reach
case 4:
    fmt.Println("three") // can't reach
default:
    fmt.Println("default")
}
```

`for`

```go
// 1.for is magic, it conbine the power of while and for in other languages.
// 2.for can followed by a condition or none(never stop).
// 3.you could use break to jump out in the block of for.
```

`short declaration`

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

