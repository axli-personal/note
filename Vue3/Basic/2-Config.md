#### How to config a vue application

* `globalProperties`

  ```typescript
  // You could use app.config.globalProperties to add some global used object.
  // Let us look an eample simplfiy a real project.
  app.config.globalProperties.$handle = {
    checkHTTP(url: string) {
      if (url && url.startsWith('http')) {
        return url;
      } else {
        // your logic
        return url;
      }
    };
  };
  // First use $handle not handle to identify the global with the local.
  // Then use object as the value, it contain many useful methods.
  // So you can use it by $handle.checkHTTP(someURL) in the <template> part.
  
  // Not only you could use it to handle something
  // But also it can deliver some info or config to some plugins
  ```
  
* `plugin`

  ```typescript
  // In an vue project you may use a lot of plugins
  // First we try to understand how it work
  // what will happen after the app.use()?
  // Generally you will send a object to the use function
  // Then the install function in it will call to add more feature to your app
  
  // As an user of that plugin, how to use it elegantly?
  // Basically import the obj of the plugin, then send it and your option to the use()
  // ---example---
  import ElementPlus from "element-plus";
  app.use(ElementPlus, { size: 'small', zIndex: 3000 });
  
  // we could find the interface declare in the plugin to config it better, such as:
  interface InstallOptions {
      size: ComponentSize;
      zIndex: number;
      locale?: any;
      i18n?: (...args: any[]) => string;
  }
  ```

