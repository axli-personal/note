`create-vite`

```shell
# Use the starter(create-vite) to create an project.
# Below commands omits the prefix 'create-' for convenience.
$ npm init vite
$ yarn create vite

# Note: npm will not update the starter when create a project but yarn will.
# Note: you can use 'vite@latest' to update starter when create a project.
```

`vite`

```json
// Note: vite is a build tool as an develop dependency.

// Commands in script.
{
  "scripts": {
    "dev": "vite", // Start a server with HMR(Hot Module Replacement).
    "build": "vite build", // Build for production.
    "serve": "vite preview" // Start a server to preview what you have built.
  }
}

// Note: the 'vite preview' will doesn't work with empty directory 'dist'.
// Note: the server will handle post request and return 'index.html'.
```

