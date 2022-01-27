# 嵌套类

## 相互关系

嵌套类是一个**独立**的类, 外部类不能对嵌套类进行越权**访问**.

外部类限定了嵌套类对外**可见性**, 并向嵌套类提供了自己的**作用域**.

## 限定可见性

```cpp
class Outer {
public:
    class PublicInner {};  // Can used by the user through Outer::PublicInner.
private:
    class PrivateInner {}; // Can't used by any user.
};
```

## 提供作用域

嵌套类能访问外部类**静态成员**(嵌套类是一个独立的类), 并且无视访问权限; 这本质上是向外层作用域查找命名.

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
