# react-express-webpack-template

A ready-to-use template for start building a single page web application using [react.js](http://www.reactjs.org) and [express](http://www.expressjs.com). Includes a small demo app.

### Features 

* React components are rendered server-side, then mounted on the browser.
* Server and client share the same routes.
* Hot reload for React components in development, livereload for CSS.
* Works great as REST client of your API.
* Includes: [react-router](https://github.com/rackt/react-router), [react-hot-loader](https://github.com/gaearon/react-hot-loader), [gulp](http://www.gulpjs.com), [SASS](http://sass-lang.com) and a cache buster.

### App structure

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

## Running the development server

```bash
# Run the dev server on localhost:3000
# Webpack dev server is on localhost:3001
node server

# Or, with nodemon and watch scss
gulp
```

The gulp tasks enable a livereload server: remember to install the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).

## Building

The build task:

1. compiles the client's js files with webpack
2. copies the app sources and apply some required substitutions
3. enables a cache busting
4. copies the npm dependencies

```bash
# Create a build in the /build directory
gulp build

# Run the built server on localhost:8080
PORT=8080;NODE_ENV=production node build/server
```

## To do

* Linting (needs to find a gulp plugin working with [jsxhint](https://github.com/STRML/JSXHint))
* Tests examples
* i18n support examples
* gulp dist