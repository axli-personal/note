#### tsconfig.json

* `files`

  Meaning: Add file one by one through a list.

  **Note: It has a higher level than  the exclude.!**

* `include`、`exclude`

  Meaning: Add file in group through wildcard.

  `*`         string without '/'

  `**/`     Any subdirectory

  ```json
  ---example---
  "include": [
    "src/**/*.ts",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules"
  ]
  ```

* `types`

  Meaning: Add type one by one through a list.

