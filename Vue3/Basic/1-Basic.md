## Component and Reactivity

Reactivity introduce

Reactivity is a thing that allows us to **adjust to changes in a declarative manner**.

Just like what excel's SUM function do.

### `Ref` and `ref` 

```typescript
interface Ref<T> {
  value: T;
}

// Takes an inner value and returns a reactive and mutable ref object.
// The ref object has a single property .value that points to the inner value.
// Need to import from 'vue'.
function ref<T>(value: T): Ref<T>;

// You may want to have a Ref<T> that listen to yourself, but no by infered automatically.
const num = ref<string | number>('10');
```

### `computed`

```typescript
// What: Declare a attriable that computed by another.

// Return a reactive and readonly ref object according to the getter.
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>;
// Return a reactive and writeable ref object according to the get and set.
// Note that the get and set should a pair of inverse function.
function computed<T>(options: { get: () => T; set: (value: T) => void }): Ref<T>;

// ---exemple---
const count = ref(1);
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1; // Inverse function to the get.
  }
});
```

### `watch`

```typescript
// What: Declare a adjust function to watch and response to a attriable's change.

const count = ref(0);
watch(count, (newCount, oldCount) => {
  count.value = (newCount.value + oldCount.value) / 2;
})
```

### `defineComponent`

```typescript
// A function to define a Component.
// Recommand to use the setup function to define the data and function together.
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const num      = ref<number>(1);
    const record   = ref<number>(1);
    // Use a variable to define a function.
    const increase = () => {
      num.value    += 100;
      record.value += 1;
      console.log(record.value);
    };
    // We need to return the data and function we need to use outside.
    // So I didn't return the record.
    return { num, increase };
  }
});
```

### `provide and inject`

```typescript
// Why: it gives us a solution to solve the complex property problem in big project.
//      the relationship between provider and injecter become weak.

setup() { // parent setup
  const user = ref('john');
  provide('user', user);
}

setup() { // child setup
  // Warning:  don't change inject value directly, because the damage of vue data flow.
  // Solution: if you want to change it, inject a method to change it.
  const user = inject('user', 'default');
}
```

## Router

### `Array<RouteRecordRaw>`

```typescript
// Array<RouteRecordRaw> to config the routes.

// There is three type record allowed in Array<RouteRecordRaw>.
type RouteRecordRaw = RouteRecordSingleView | RouteRecordMultipleViews | RouteRecordRedirect;

// Here introduce two type.
const routes: Array<RouteRecordRaw> = [
    { // RouteRecordSingleView
        path: "/content",
        name: "Content",
        component: Content
    },
    { // RouteRecordSingleView
        path: "/home",
        name: "Home",
        component: Home,
        alias: ["/", "index"]
    },
    { // RouteRecordRedirect
        path: "/jump",
        name: "Jump",
        redirect: "/home"
    }
];

// Matching syntax
// ------------------P1------P2------P3----
// path: '/precise/:param<(Regexp)><?/+/*>'
// ------------------P1------P2------P3----

// P1 Part: Make it as a param.
// P2 Part: If the Regexp not match the url, router will find next route.
//          You may need to double '\' in script.
// P3 Part: ?(option),+(one or more),*(zero or more).

// examples: '/users/:userId(\\d+)?'

// helpful test tool: paths.esm.dev(website)
```

### `createRouter`

```typescript
// We need to create a router to use in the App.

// You can pass a string to createWebHistory as the base url of the application.
export default createRouter({
  history: createWebHistory(),
  routes: routes,
});
```

### `useRoute` and `useRouter`

```typescript
// In defineComponent's setup function, you can use useRoute and useRouter.
// useRoute  equals to '$route'  in template part.
// useRouter equals to '$router' in template part.
```

