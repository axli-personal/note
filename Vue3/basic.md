#### Component

* `Ref` and `ref` 

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

* `defineComponent`

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
  

