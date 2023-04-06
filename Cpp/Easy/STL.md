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

## priority_queue

1) 初始化

```c++
priority_queue<int> pq; // 默认是大顶堆.
priority_queue<int, vector<int>, greater<int>> pq; // 小顶堆.
```

2) 下沉和上浮

```c++
void sink(vector<int> pq, int pos) {
    while (pos * 2 + 1 < pq.size()) {
        int child = pos * 2 + 1; // 左子节点.
        if (child + 1 < pq.size() && pq[child] < pq[child + 1]) {
            child++; // 存在右子结点, 并且右子节点更大.
        }
        if (pq[pos] >= pq[child]) {
            break; // 比子结点都大, 不需要继续下沉.
        }
        swap(pq[pos], pq[child]);
        pos = child;
    }
}

void swim(vector<int> pq, int pos) {
    while (pos > 0) {
        int parent = (pos - 1) / 2; // 父节点.
        if (pq[pos] <= pq[parent]) {
            break; // 比父节点小, 不需要上浮.
        }
        swap(pq[pos], parent);
        pos = parent;
    }
}
```
