`compiler`

```
help: Just input tsc, and you will see help info.
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
    // Define a function.
    greet(): void;
}
```

`module`

```typescript
// CommonJS syntax
module.exports = {
 pi: 3.14
};
const maths = require("maths");
```

