# 模块管理与编译

## 依赖

```go
import (
    .    "strings"                     // 直接访问, 无需前缀.
    _    "example.com/my_mysql_driver" // 需要执行init方法
    fib  "github.com/gofiber/fiber/v2" // 别名
)
```

初始化顺序: 初始化全局变量, 执行init方法(根据依赖), 执行main方法.

## 大版本升级

新建一个分支, 模块名称变为`xxx/v2`; 新建一个仓库, 模块名称变为`xxx-next`.

## 条件编译

文件开头需要指明条件`//go:build a && b`, 编译时使用`-tags="a b"`.

::: tip 说明
`// +build`是旧的写法, 对布尔表达式支持的并不好.

> [两者区别(StackOverflow)](https://stackoverflow.com/questions/68360688/)
:::
