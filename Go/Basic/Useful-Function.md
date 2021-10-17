`fmt`

```go
// fmt.Print() will print a list of value separated by ','.
// fmt.Println() will add a new line, don't need to write the '\n'.
// fmt.Printf() work the same as C and you could use '%v' as a general format.
```

`math`

```go
// calculate the absolute value of float64 and return float64.
func Abs(x float64) float64
```

`build-in`

```go
// Build-in function is a set of function that don't need to import any package.
// return the length of a array, silce or map.
func len(v Type) int
// Return the number that had been copied successly.
func copy(dst, src []Type) int
// Allocates and initializes for silce and map.
func make(t Type, size ...IntegerType) Type
// Delete a pair in map.
func delete(m map[Type]Type1, key Type)
// Get the capcity of a silce.
func cap(v Type) int
```

`ioutil`

```go
// useful read function
func ReadDir(dirname string) ([]fs.FileInfo, error)
func ReadFile(filename string) ([]byte, error)

// ---example---
fileBuffer, _ := ioutil.ReadFile("filename")
fmt.Println(string(fileBuffer))
fileInfos, _ := ioutil.ReadDir("dirname")
for i := 0; i < len(fileInfos); i++ {
    fmt.Println(fileInfos[i].Name())
    fmt.Println(fileInfos[i].Size())
    fmt.Println(fileInfos[i].Mode())
    fmt.Println(fileInfos[i].IsDir())
    fmt.Println(fileInfos[i].ModTime())
}
```

`strings`

```go
// returns a new string consisting of count copies of the string s.
func Repeat(s string, count int) string
```

