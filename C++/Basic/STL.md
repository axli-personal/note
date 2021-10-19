# STL

#### `array`

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

#### `vector`

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

