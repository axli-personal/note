# Nested Class

##### 独立性

内部类是一个独立的类，外部类不能越权访问内部类中的成员。

##### 用户访问

```cpp
class Outer {
public:
    class PublicInner {};  // Can used by the user through Outer::PublicInner.
private:
    class PrivateInner {}; // Can't used by any user.
};
```

##### 向外访问

内部类只能访问外部类中不依赖对象存在的部分，并且可以无视访问权限。

```cpp
class Outer {
private:
    static string name;
public:
    class Inner {
    public:
        Inner() { cout << "My outer class is " << name << endl; }
    };
};

string Outer::name = "Fun";
```

##### 外部定义

```cpp
class Outer {
public:
    class Inner;
};

class Outer::Inner {
public:
    int field;
};
```
