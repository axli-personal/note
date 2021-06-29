`let`

```typescript
// 1.Not allow duplicate declare for a variable.
// 2.Support block scope[🎉].
```

`const`

```typescript
// 1.Support block scope
// 2.Need init value when declared.
// 3.Can't change the value, except inner of the array and object because of the address.
```

`separated assignment`

```typescript
// 1.Official called destructing assignment, but I like call it separated assignment.
// 2.array separated assignment:
let [variableA, variableB] = array;
// 3.object separated assignment:
let {variableA, variableB} = object;
// 4.This was commonly used in functions parms.
```

