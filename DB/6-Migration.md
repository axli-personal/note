# 迁移

## 为什么迁移数据是很困难的?

* 数据量大
* 停机时间短
* 代码改动量大

## 双写模式

* 写旧表 -> 双写
* 读旧表 -> 读新表
* 双写 -> 写新表
* 迁移完成, 删除旧表.

## 参考资料

* [Online Migrations At Scale](https://stripe.com/blog/online-migrations)
* [使用工具进行迁移](https://www.youtube.com/watch?v=xz4j5tU0ZRU)