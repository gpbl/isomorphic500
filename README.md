# react-express-webpack-template

A starting template for building a single page web application using React and Express. 

### Features 

* React components are rendered server side on first load, then mounted on browser
* Development: webpack hot reload (for react components, using [react-hot-loader](https://github.com/gaearon/react-hot-loader)) and livereload (for CSS)
* Technologies: Gulp, SASS (with autoprefixer), nodemon

### Directory map

```bash
│
├── app
│   ├── client                # Contains JS code running on the client
│   │   └── main.jsx             # Entry point for the browser, mounts the root component on DOM ready
│   │
│   ├── components            # Contains all React components
│   │   ├── Root.jsx             # Root component, must mount the Page component 
│   │   ├── Page.jsx             # Page component (Header and Footer go here)
│   │   │
│   │   ├── Footer.jsx           # Example component creating a footer
│   │   └── Header.jsx           # Example component creating a header
│   │
│   ├── index.js              # Main app script 
│   │ 
│   ├── public                # Contains the public (static) files for the client. They will be cache-busted.
│   │   ├── css               # Here will be placed the compiled SASS styles
│   │   ├── images            # Here you can place the images   
│   │   └── js                # Empty in dev. In prod contains the scripts compiled with webpack
│   | 
│   ├── routes                # Express routes
│   │   └── index.js          # Route for the home page, which renders views/page.ejs 
│   │ 
│   ├── style                 # Contains the SASS files, compiled in public/css with grunt
│   │   └── main.scss         # Example of SASS file
│   │ 
│   └── views                 # Express views (with ejs)
│       ├── error.ejs         # View displaying server-side errors
│       └── page.ejs          # Page where the React root component is mounted server-side
│
├── server.js                 # Starts the server, and the webpack-dev-server on development
│
├── gulpfile.js               # Tasks for Gulp
├── webpack.config.build.js   # Webpack config for the build task
└── webpack.config.dev.js     # Webpack config to use the webpack dev server

```

### Setup

```bash
# Clone the repository
git clone https://github.com/gpbl/react-express-webpack-template.git

# Install dependencies
cd react-express-webpack-template
npm install

# Install SASS (if not available)
gem install sass
```

## Running a development server

The server runs with: 

```bash
node server
```

The command above runs a development server with hot module replacement enabled for React. To watch also your node.js scripts and your SASS styles, you use the `gulp` default task:

```bash
gulp
```

The default task watches for changes of the server (using `nodemon`) and of SASS files (using `gulp watch`).
It will also enable a livereload server to hot replace the freshly compiled CSS files (remember to install the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)).

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

