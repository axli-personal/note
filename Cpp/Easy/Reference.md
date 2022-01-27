# 引用

## 左值与右值

* 左值: 可以在**赋值表达式左边**使用, 如具名变量.
* 右值: 只能在**赋值表达式右边**使用, 如临时变量.

## 右值引用

在C++11以前, 右值不能传递给左值引用, 除非有`const`修饰.

在C++11以后, 右值可以传递给右值引用(不接收左值).

```cpp
int&& num = 100; // Rvalue Reference.
```

## 右值传递

当参数定义为右值引用时, 我们就可以**随意修改**传入对象, 因为我们知道它一定是**临时性**的.

```cpp
void process_copy(vector<int> const& vals) {
    vector<int> copied_vals(vals);
    // Process copied values.
}

void process_copy(vector<int> && vals) {
    // Process values without any concern.
}
```

当构造函数的参数定义为右值引用时, 我们甚至可以直接将传入对象'**掏空**'.

```cpp
class Integers {
private:
    static const int capacity = 100000;

    int *data;
public:
    Integers() :
        data(new int[capacity]) {}

    ~Integers() {
        delete[] data;
    }

    Integers(const Integers &other) :
        data(new int[capacity]) {
        copy(other.data, other.data + capacity, data);
    }

    Integers(Integers &&other) :
        data(other.data) {
        other.data = nullptr;
    }
};
```

正如你所看到的, 对象好像在进行一种类似移动的操作, 上面的构造函数也被称为**移动构造函数**.

对于某些对象, 提供拷贝构造没有意义, 但是提供移动构造却十分有意义, 例如`unique_ptr`.

## 右值转型

对于那些你已经不继续使用的左值, 可以把他们转为右值来使用.

可以使用`std::move()`, 或直接使用`static_cast<T&&>()`.

右值引用在参数传递过程中的确会进行移动构造, 但在函数内部它还是**解释为左值**.
