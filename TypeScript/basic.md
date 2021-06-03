`compiler`

```
help: Just input tsc, and you will see help info.
```

`function`

```typescript
"use strict" // Open the strict mode in javascript.
function optionalGreet(firstName: string, lastName: string, middleName?: string) {
    if (middleName) {
        console.log(`${firstName} ${middleName} ${lastName}`);
    } else {
        console.log(`${firstName} ${lastName}`);
    }
}

function mutiGreet(...nameList: string[]) {
    console.log(nameList.join(" "));
}

optionalGreet("Anders", "Hejlsberg");
optionalGreet("Linus", "Torvalds", "Benedict");
mutiGreet("Linus", "Torvalds", "Benedict");
```

`class`

```typescript
class Person {
    name: string;
    age:  number;
    constructor(name: string, age: number = 18) {
        this.name = name;
        this.age  = age;
    }
    greet() {
        console.log(`${this.name}[${this.age}]`);
    }
}

var jack = new Person("jack");
var john = new Person("john", 25);
jack.greet();
john.greet();
```

`interface`

```typescript
interface Person {
    name: string;
    // '?' mean the attribute can be undefined.
    age?: number;
}

// If you want to extend muti interface, use ',' as seperator.
interface SuperPerson extend Person {
    power: string;
}

// Interface can use as a function type.
interface numAddFunc {
    (x: number, y: number): number;
}

let numAdd: numAddFunc = function(firstNum, secondNum) {
    return firstNum + secondNum;
}
```

`module`

```typescript
// export declaration.
const imprecisePI = 3.14;
export { imprecisePI as PI };

// re-export declaration, simply use keyword 'from'.
export { precisePI } from  "./Math";
export * from  "./Math";
```

