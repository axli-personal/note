#### `let`

```javascript
// 1.Not allow duplicate declare for a variable.
// 2.Support block scope.
```

#### `const`

```javascript
// 1.Support block scope
// 2.Need init value when declared.
// 3.Can't change the value, except inner of the array and object because of the address.
```

#### Separated assignment

```javascript
// 1.Official called destructing assignment, but I like call it separated assignment.
// 2.array separated assignment:
let [variableA, variableB] = array;
// 3.object separated assignment:
let {variableA, variableB} = object;
// 4.This was commonly used in functions parms.
```

#### `...`

```javascript
// The `...` was always palced in front of the variable.
function show(...args) {
    console.log(args)
}
bigCompany = ['Apple', 'IBM', 'Microsoft']
allCompany = [...bigCompany, 'Kaggle', 'LeetCode']
show(...bigCompany)
```

#### `Symbol()`

```javascript
// Get a unique variable.
console.log(Symbol() == Symbol())
console.log(Symbol('same') == Symbol('same'))
```

#### Promise

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
