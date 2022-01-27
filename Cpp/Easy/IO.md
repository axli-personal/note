# Input & Output

## Copy And Assign

The stream can't be copied or assigned to another stream, so we usually pass it by reference.

## Stream Status

```cpp
// The status management is provided by class 'basic_ios'.
iostate rdstate() const { return _M_streambuf_state; }
bool    good()    const { return this->rdstate() == 0; }
bool    fail()    const { return (this->rdstate() & (badbit | failbit)) != 0; }
bool    bad()     const { return (this->rdstate() & badbit) != 0; }
```

If `badbit` was set, the stream has been crashed and you shouldn't use it anymore.

If read the end of file, `eofbit` and `failbit` was both set.

## `iostream`

```cpp
// std::istream
//	 std::cin: standard input

// std::ostream
//	 std::cout: standard output
//	 std::cerr: standard error output
```

## `std::getline`

```cpp
// Get one line from istream.
// The delimiter(default: '\n') is discarded.
std::getline(istream, str, delimiter);
```

## `fstream`

```cpp
// std::ifstream(extend std::istream)

// std::ofstream(extend std::ostream)
```

## `open`

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

## `close`

Although the destructor will call `close` for you, but you should remember to close it when you don't need to use it anymore.

## `sstream`

```cpp
// std::istringstream(extend std::istream)
auto iss = std::istringstream();
iss.str(bind_str);

// std::ostringstream(extend std::ostream)
auto oss = std::ostringstream();
auto get_str = iss.str();
```

## `seek`

```cpp
// 1.istream中seekg和ostream中seekp.
// 2.不同的查找方向:
//	-ios::beg
//	-ios::cur
//	-ios::end
```

