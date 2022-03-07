# C Part Of C++

## 逗号表达式

逗号表达式的运算优先级极其低, 主要用于顺序求值.

```c++
void solve() {
	// 输出结果并返回.
	return cout << res << endl, void();
}
```

## 位运算

与(AND), 或(OR), 异或(**Exclusive OR**, 简称EOR).

## 获取源码信息

使用以下宏, 请确保编译器支持.

```c++
printf("%d\n", __LINE__);
printf("%s\n", __FUNCTION__);
printf("%s\n", __FILE__);
```

`g++编译器`

```
1.-w:忽略所有警告.
2.-o:指定输出文件位置.
3.-std=<standard>:指定C++标准.
```

`前置声明`

```c++
//1.前置声明(forward declaration):在定义类之前先将类的名称告诉编译器.
```

`成员`

```c++
//1.mutable:表示该值的更改对类的属性不会产生影响,所以可以在const函数中修改该值.
```

`成员函数`

```c++
//1.所有的成员函数都必须在类内声明.
//2.类内定义成员函数都会被自动视为inline函数.
//3.类外定义inline成员函数都需要放在头文件中.
//4.类外定义非inline成员函数都需要放到源文件中.
//5.在成员函数后加上const函数可以表明该函数不会影响该类的属性,同时也可以被const的引用调用.
```

`构造函数`

```c++
//1.默认构造函数(default constructor):没有任何参数,或者为每个参数指定了默认值.
//2.使用无参构造函数:
	MyClass object; // 正确
	MyClass object(); // 错误
//	-因为C++需要兼容C,导致使用括号时会被理解为一个函数.
//3.使用单一参数的构造函数:
	MyClass object( str ); // 正确
	MyClass object = str; // 正确
//	-直接使用'='运算符可以调用单一构造函数,而不会调用赋值函数.
//4.初始化列表:
	MyClass( string str) : _my_str(str) {}
//	-初始化列表可以用于简单的对成员变量初始化.
//5.构造函数与const的关系:
//	-构造函数不能声明为const.
//	-但可以向类中const对象写入值.
//	-当构造函数执行完毕后,对象才获得了const属性.
//6.C++11标准新增:
	Class_Name() = default;
//	-要求编译器生成默认构造函数.
//7.准则:
//	-构造函数尽量不要去覆盖类内的初始值.
```

`析构函数`

```c++
//1.析构函数需要在最前面加上'~',并且不允许有任何参数,也就不可能重载.
```

`memberwise`

```c++
//1.默认成员逐一初始化(default memberwise initialization):通过成员赋值来创建新对象.
//2.默认成员逐一复制(default memberwise copy):通过成员赋值来赋值旧对象.
//2.当成员含有指针时,需要自己写initialization和copy函数以防止内存管理错误.
//3.当定义copy函数时,检查两个对象是否相同是个好习惯.
```

`this`

```c++
//1.this是一个指针,它指向调用它的对象.
//2.内部实现:
	object.method( str ); // 原始
	method( &object, str ); // 转换
```

`友谊`

```c++
//1.在类中加入含friend的声明.
//2.全局函数:
	friend void fun();
//3.成员函数:
	friend void myclass::fun();
//4.类:
	friend class myclass;
```

`构造数据类型操作运算符`

```c++
//1.基本数据类型操作运算符是不可改变的.
//2.操作运算符是不可滥用的,所表达的意义要与操作运算符含义一致.
//3.通过创建一个operator+、operator-等,来告诉编译器如何运算.
//4.成员函数需传入一个参数.
//5.全局函数需传入两个参数.
```

`vector`

```c++
//1.元素连续存储,所以可以通过迭代器和常规指针来访问元素.
//2.vector元素的指针可以传给数组元素的指针.
//3.动态扩充时会根据内部算法多扩充一点.
//4.操作复杂度:
//	-随机访问:常数O(1).
//	-在末尾插入或移除元素:均摊常数O(1).
//	-插入或移除元素:与到vector结尾的距离成线性O(n).
```

`寻找最大值和最小值`

```c++
//1.头文件:<algorithm>
//2.函数:max_element和min_element.
//3.用法:
//	-max_element(begin, end)和min_element(begin, end).
//	-begin和end是地址或迭代器.
//	-范围为[begin,end).
//	-返回值类型是地址.
```

`stringstream`

```c++
//1.来源:
#include <sstream>
//2.说明:                                   
/*
可以通过该类来使string更加灵活.
*/
```

`new关键字`

```c
// 1.new可以为内置数据类型申请内存,也可以为堆内存分配内存.
```

## `const`

```c++
// 星号左边const表示所指之物是常量, 星号右边const表示指针本身是常量.
const char* const s;

// 迭代器中, const_iteator表示所指之物是常量.
const vector<int>::const_iterator iter = vec.begin();

// 函数返回值和参数都可以声明为const.
const string status(const int code);

// 成员函数声明为const, 支撑了'pass by reference-to-const'这一传递对象的方式.
// 可以使用mutable修饰属性表示更改不会对类的常量性做出改变, 实现'logical constness'.
class Teacher {
public:
    bool show_info(const bool detail) const;
private:
	std::string name;
    mutable char buf;
};

// 使用const成员函数实现non-const成员函数.
const_cast<bool&>(static_cast<const Teacher&>(*this).show_info());
```

## `const_cast`

```c++
// const_cast可以将引用和指针的const限制移除; 如果底层元素也被const修饰, 那么这么做是未定义的.
int element = 0;
const int* ptr = &element;
int* new_ptr = const_cast<int*>(ptr);
```

#### new 与 delete

##### 分配内存和释放内存写法一一对应.

```c++
// 1.分配与删除一个对象
auto value = new int;
delete value;
// 2.分配与删除一个数组
auto array = new int[length];
delete [] array;
```

##### new创建数组时默认初始化

```c++
auto array = new int[length]();
```