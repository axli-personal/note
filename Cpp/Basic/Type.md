# 类型

## 进制

```cpp
const NUM = 0b10; // 二进制表示法(2)
const NUM = 010;  // 八进制表示法(8)
const NUM = 0x10; // 十六进制表示法(16)
```

## Bit Field

如果你想使用整形变量并且它至始至终都**只会存储一些较小的数据**, 那么你可以使用位域来减小内存消耗.

```cpp
struct BoxProps
{
    unsigned char  opaque   : 1;
    unsigned char  color    : 3;
    unsigned char           : 4; // 填满一个字节.
};
```

## 常量表达式

常量表达式是指在**编译器就可以确定并不在改变**的值, 使用`constexpr`能让编译器替你完成检查.

```cpp
constexpr double FACTOR = 0.5;
```

## 类型别名

### 两种写法

```cpp
// 1. 旧的声明式定义.
typedef double distance;

// 2. C++11新标准可以采用using定义.
using distance = double;
```

### 指针类型别名

```cpp
// 1. 定义指针类型别名和定义指针变量相似.
typedef char *cstring;

// 2. 定义了一个常量指针, 不要试图替换成原类型来理解定义!
const cstring str = 0;
```

