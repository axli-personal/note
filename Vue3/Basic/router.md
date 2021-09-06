#### Dive into the API

* `route-view`

  ```html
  <!-- You can use 'v-slot' or '#' get the Component and the route -->
  <!-- So you can add transition to your component -->
  
  <!-- Let look an simplified example in real project -->
  <div id="app">
    <router-view #="{ Component, route }">
      <transition :name="trans">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <!-- Then you could add some css based on the name 'trans', magic -->
  ```

* `beforeEach`

  ```typescript
  // You can add a guard globally to handle every navigation
  // to and from are object of RouteLocationNormalized
  // you can return false to cancel this navigation
  
  router.beforeEach((to, from) => {
    // you can check the navigation
    // you can change the name 'trans' above to bring another transition style
  })
  ```