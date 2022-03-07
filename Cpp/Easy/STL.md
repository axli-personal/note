# 标准库

## string

### substr

在脚本语言中都存在切片这个概念, 而在C++中可以通过`substr`方法实现相应功能.

不过`substr`会进行拷贝, 所以在某些场合仅适用于获取长度较小的子串.

| parameter | meaning                          |
| --------- | -------------------------------- |
| start     | the index of the first character |
| len       | the length of the substring      |

```c++
str.substr(start, len);
```

## array

1）初始化

```cpp
array<int, amount> arr;
// 注:amount的大小一定是在编译时能够计算的,并且是固定的.
```

2）接口

```cpp
arr.empty();     // 返回是否为空.
arr.size();      // 返回元素数量.
arr[position]++; // 返回下标处元素的引用,不检查数组是否越界!
```

## vector

1）初始化

```cpp
vector<int> vec;
vector<int> vec(amount);
vector<int> vec(amount, value);
// 注:数值类型和指针类型都默认初始化为0,自定义类型使用默认构造函数初始化.
```

2）接口

```cpp
vec.empty(); // 返回是否为空.
vec.size();  // 返回元素数量.
vec.push_back(value);    // 尾部插入元素,返回空.
vec.insert(iter, value); // 任意位置插值.
```

