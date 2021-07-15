`import`

```go
// 1.three advance import method.
import (
    .    "strings" // expose all, call without string.xxx.
    _    "example.com/my_mysql_driver" // just call the package's init function
    fib  "github.com/gofiber/fiber/v2" // change another name
)
// 2.when the function and type's name start with uppercase letter, it will be public.
// 3.init is a special function in go.
// 4.Go will init the the global variable, call init and call main.
// 5.The package have heavy dependency will be init later then others.
```

`Version`

```
// major: change api     incompatible
minor: add features   compatible
patch: fix bug        compatible

---reference---
url: 'https://semver.org'
```

`Major version update`

```
---official---
1.Create a new branch
2.Change the module name, so all of your import statement need change.
module github.com/gofiber/fiber       old
module github.com/gofiber/fiber/v2    new

---personal---
1.Create a new repository with name like fiber-next.
2.2.Change the module name, so all of your import statement need change.
module github.com/gofiber/fiber       old
module github.com/gofiber/fiber-next  new
```

`One module per repository`

```
You can maintenance multiple module in a repository, but it is relatively complicated.
```

`package name`

```
Keep the package name the same as its parent directory name.
```

