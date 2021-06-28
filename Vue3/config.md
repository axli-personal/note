### How to config a vue  application

* `globalProperties`

  ```typescript
  // You could use app.config.globalProperties to add some global used object.
  // Let us look an eample simplfiy a real project.
  app.config.globalProperties.$handle = {
    checkHTTP(url: string) {
      if (url && url.startsWith('http')) {
        return url
      } else {
        // your logic
        return url
      }
    }
  }
  // First use $handle not handle to identify the global with the local.
  // Then use object as the value, it contain many useful methods.
  // So you can use it by $handle.checkHTTP(someURL) in the <template> part.
  ```