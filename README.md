# react-express-webpack-template

A starting template for building a single page web application using React and Express. 

**Features** 

* React components are rendered server side on first load [1]
* Support of webpack hot reload (see [react-hot-loader](https://github.com/gaearon/react-hot-loader)) 
* Use Gulp as task runner

This architecture is intended as starting point for creating a web app, using a specific stack of technologies. Although I  tried to organize it as much generic as possibile, there are some compromises required to adopt this hybrid react server/client architecture. Feel free to contribute and give suggestions :-)

[1] This means 

## Directory map

```bash
│
├── app
│   ├── client                # Contains JS code running on the client
│   │   └── main.jsx             # Entry point for the browser, mounts the root component on DOM ready
│   │
│   ├── components            # Contains all React components
│   │   ├── Footer.jsx           # Example component creating a footer
│   │   ├── Header.jsx           # Example component creating a header
│   │   ├── Page.jsx             # Root component 
│   │   └── PageContent.jsx      # Content of the page (Header and Footer go here)
│   │
│   ├── index.js              # Main app script 
│   │ 
│   ├── public                # Contains the public (static) files for the client. They will be cache-busted.
│   │   ├── css
│   │   ├── images
│   │   └── js
│   | 
│   ├── routes                # Express routes
│   │   └── index.js             # Route for the home page, which renders page.ejs 
│   │ 
│   └── views                 # Express views
│       ├── error.ejs            # View displaying server-side errors
│       └── page.ejs             # Page where the React root component is mounted server-side
│
├── server.js                 # Starts the server, and the webpack-dev-server on development
│
├── gulpfile.js               # Tasks for Gulp
├── webpack.config.build.js   # Webpack config for the build task
└── webpack.config.dev.js     # Webpack config to use the webpack dev server

```

## Running a development server

```bash
node server
```




## Building

Run the `gulp build` task to create a build. This task does the following:

1. compile the client's js files with webpack. The entry point is [`app/client/main.jsx`](app/client/main.jsx)
2. copy the app sources and apply some required substitutions (e.g. replace the public path of the webpack dev server with the build's public path)
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

