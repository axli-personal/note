# 过渡

## 元素过渡

元素过渡是通过改变元素的`class`属性完成的, 它包含`enter`, `leave`等过程.

![5-1](https://axlis.oss-cn-hangzhou.aliyuncs.com/note/Vue3/Basic/5-1.svg)

```vue
<template>
  <div>
    <button @click="changeVisibility"> Change Visibility </button>
    <!-- 带名过渡组件 -->
    <transition name="fade">
      <p v-if="visible"> Here is a new feature! </p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    changeVisibility() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}
</style>
```

## 路由过渡

```vue
<template>
  <div>
    <!-- out-in: 表示旧组件先消失, 新组件在进来. -->
    <!-- appear: 表示在加载时过渡就会生效. -->
    <transition name="fade" mode="out-in" appear>
      <router-view />
    </transition>
  </div>
</template>
```

::: warning 提醒
使用元素路由时, 请确保`transition`标签内部只有一个元素(`wrapper`).

使用路由过渡时, 请确保路由的每个组件内部只有一个元素(`wrapper`).
:::