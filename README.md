# react-express-template

* Use of webpack with webpack hot reload
* Server-side rendered components


## Running a development server

```bash
node server
```

## Building

Run the `gulp build` task to create a build. This task does the following:

1. compile the client's js files with webpack. The entry point is [`app/client/main.jsx`](app/client/main.jsx)
2. copy the app sources applying some required substitutions (e.g. replace the public path of the webpack dev server with the build's public path)
3. replace the links to the public files adding a cache busting suffix
4. copy the node_modules dependencies for the production environment

```bash
# Create a build in the /build directory
gulp build

# Run the built server
PORT=8080;NODE_ENV=production node build/server
```

### Cache busting

The express server is configured to serve static files with a suffix to prevent the browser cache (cache busting). The client request `myimage-<hash>.png` and the server will answer with `myimage.png`.

