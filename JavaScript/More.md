## `let`

```javascript
// 1.Not allow duplicate declare for a variable.
// 2.Support block scope.
```

## `const`

```javascript
// 1.Support block scope
// 2.Need init value when declared.
// 3.Can't change the value, except inner of the array and object because of the address.
```

## Separated Assignment

```javascript
// 1.Official called destructing assignment, but I like call it separated assignment.
// 2.array separated assignment:
let [variableA, variableB] = array;
// 3.object separated assignment:
let {variableA, variableB} = object;
// 4.This was commonly used in functions parms.
```

## `...`

```javascript
// The `...` was always palced in front of the variable.
function show(...args) {
    console.log(args)
}
bigCompany = ['Apple', 'IBM', 'Microsoft']
allCompany = [...bigCompany, 'Kaggle', 'LeetCode']
show(...bigCompany)
```

## `Symbol()`

```javascript
// Get a unique variable.
console.log(Symbol() == Symbol())
console.log(Symbol('same') == Symbol('same'))
```

## Promise

```javascript
const start = new Promise((resolve, reject) => {
    resolve("done")     // Status: fulfilled    Result: what you pass in
    reject("fail")      // Status: rejected     Result: what you pass in
    throw Error('fail') // Status: rejected     Result: what you throw out
    return 'anything'   // Status: pending      Result: undefined
})

// The result is a different promise form start.
const result = start.then(function(value) {
    return value;       // Status: fulfilled    Result: what you pass in
    throw Error('fail') // Status: rejected     Result: what you pass in
}, function(reason) {
    return reason;      // Status: fulfilled    Result: what you pass in
    throw Error('fail') // Status: rejected     Result: what you pass in
})
```

## `async`和`await`

```javascript
// ECMAScript 2017
async function getUser() {
  try {
    // 从第一个await语句开始异步执行.
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    // 使用try与catch语法捕获异常.
    console.error(error);
  }
}
```

## Dynamic Import

It give you a way to load the file that **you really need at the correct time**, even don't load it at all.

If you use bundler to build your project, the source file loaded dynamicly will be never combine together.

```javascript
import("./book.js").then(({default: Book, buy}) => {
    let book = new Book("Learn JavaScript");
    buy(book);
})
```

When you config your router in vue, you may write fllowings:

```js
const routes = [
  {
    path: "/path",
    component: () => import("/src/views/Component.vue")
  }
]
```

You can check the type of componet parameter.

```ts
declare type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;
declare type Lazy<T> = () => Promise<T>;
```

