`iostream标准库`

```cpp
// 1.istream类
//	-cout对象:标准输入
// 2.ostream类
//	-cout对象:标准输出
//	-cerr对象:标准错误
//	-clog对象:一般消息
```

`std::getline`

```cpp
char end_character = '\n';
string sentence;
getline(cin, sentence); // default end_character is '\n'.
getline(cin, sentence, end_character);
// Note:    The end_charater is discarded.
// Warning: Be careful of the return value of the getline.
```

`ignore方法`

```cpp
// 1.忽略流中剩余数据.
```

`fstream标准库`

```cpp
// 1.fstream中定义了ofstream、ifstream和fstream.
```

`open方法`

```cpp
// 1.方法原型:
void open(const char *filename, ios::openmode mode);
// 2.不同的模式:
//	-ios::app       追加
//  -ios::ate       末尾
//  -ios::in        读取
//  -ios::out       写入
//  -ios::trunc     截断
```

`close方法`

```cpp
// 1.方法原型:
void close();
// 2.虽然程序结束后,会自动关闭所有的流和文件;但是流使用完后,程序员应该及时关闭.
```

`重定位函数`

```cpp
// 1.istream中seekg和ostream中seekp.
// 2.不同的查找方向:
//	-ios::beg
//	-ios::cur
//	-ios::end
```

##### Stream Status

```cpp
// The status management is provided by class 'basic_ios'.
iostate rdstate() const { return _M_streambuf_state; }
bool    good()    const { return this->rdstate() == 0; }
bool    fail()    const { return (this->rdstate() & (badbit | failbit)) != 0; }
bool    bad()     const { return (this->rdstate() & badbit) != 0; }
```

