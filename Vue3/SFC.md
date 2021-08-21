### Why choose SFC(Single File Components)?

SFC make us organize code better and bring many conveniences for devloper.

As we can see, vue team spend a lot time improve the code expreience in SFC.

#### [Vue SFC Playground](https://sfc.vuejs.org)

* You can easily expreience single file component in vue.
* You can download a scaffolding project with vite containing what you have written.
* You can share the url with anyone and he will see what you have written.
* You can see the underlying code vue generate more clearly.

### Style Features

If you write css codes in `<style></style>` directly, then style collision will happen frequently.

Vue team provided two methods to handle this problem.

#### `<style scoped>`

##### How scoped style work?

This method uses hash function to generate a unique random string for each component.

Then use attribute selector to match with them as below.

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

After preprocess

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

##### How to let your scoped style to affect child components?

you just need to give the preprocesser some prompt by `:deep(xxx)` as below.

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

After preprocess

```vue
<style scoped>
.a[data-v-f3f3eg9] .b {
  /* ... */
}
</style>
```

Exception: content created by v-html will don't have the unique component attribute.

Attribute selector can't recognize them but parent deep still work.

##### How to let a small part of scoped style break the rule to work globally?

you just need to give the preprocesser some prompt by `:global(xxx)` as below.

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

If you have many scoped style break the rule, create another `<style>` will be better.

##### Be careful with descendant selectors in recursive components!

Child component may affect by its parent's descendant selectors.

#### `<style module>`

##### How module style work?

The css will be exposed as a object as below.

```vue
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

##### How to access it in Composition API

```js
useCssModule()
```

