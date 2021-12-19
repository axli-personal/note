## Path

`<root>/public/file` can be reached by `/file`.

`<root>/src/any` can be reached by `/src/any`.

> Note: `@` can't be use in vite and use `/src/any` to replace it.

## Public

The files in it will be copied to the root of output directory directly.

When you refer a resource by `/public/file`, you will see you **actully refer a file in asset directory** of the dist.

If you care about the IDE prompt and you develop tool is **webstorm**, marked the public directory as resource root.

You should only refer to a file in public directory in html file or `<template>` in vue.

## Index

`index.html` was place in the root directory of the project.
