`go bug`

```
Collect some useful info, then visit github issues with these info.
```

`go get`

```
command: go get <url>/<author>/<package>/<main_version>
example: go get github.com/gofiber/fiber/v2

proxy support: get help from "https://goproxy.io"
```

`GOPATH`

```
GOPATH is a user variable in your computer.
It was set to be "user_home/go" by default.
```

`GO111MODULE`

```
GO111MODULE=<on/off/auto(default)>
meaning: It determine whether to use "go.mod".
```

`go clean`

```
go clean will remove current directory's exe files.
```

`go build`

```
go build [-o output] [build flags] [packages]

---build flags---
-v     print the package name compiled.
-x     print the command executed.
-race  check the race condition, very useful in concurrent app.
Note: when deploy the app or benchmark test, remove the '-race' flag.

---packages---
If the packages don't have the main, go will just compile for check without any output files.

-o output            Write the output files to specific location, not just compile for check.

-buildmode=<mode>    Specific the ouput type, even ouput to 'C' language.
```

`go mod tidy`

```
Command 'go mod tidy' will analysis the dependencies of your module.
Then add missing modules and remove unnecessary modules in go.mod.
Finally add missing items and remove unnecessary items in go.sum.

-v  print the modules removed by the command
```

