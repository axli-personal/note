> Note: this is the simplest config for small project without using typesctipt.

`eslint-plugin-vue`

```json
// package.json
{
  "devDependencies": {
    "eslint": "~7.32.0",
    "eslint-plugin-vue": "~7.16.0" // Provided the parser and basic rules.
  }
}

// .eslintrc.json
{
    "env": {
        "browser": true, // Provided browser enviroment.
        "es6": true // Provided full es6 feature.
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "parser": "vue-eslint-parser", // Use vue parser.
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "vue" // Omit the prefix 'eslint-plugin-' for convenience.
    ],
    "rules": {
    }
}
```

