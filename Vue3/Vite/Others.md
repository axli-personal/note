## Warnings

When building vue application, you maybe get warnings below from vite.

### Warnings When Minifying CSS

I get a warning that `"@charset" must be the first rule in the file` when:

```js
// file:    main.js

import "./css/global.css";
import "element-plus/theme-chalk/index.css";
```

The first statement in element-plus's css file is `@charset "UTF-8";`, so you should change the `import` order correctly.