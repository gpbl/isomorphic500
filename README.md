# react-express-webpack-template

A starting template for building a single page web application using [react.js](http://www.reactjs.org) and [express](http://www.expressjs.com). Includes a small demo app.

### Features 

* React components are rendered server-side, then mounted on the browser.
* Server and client share the same routes.
* Hot reload for React components and livereload for CSS.
* Includes: [react-router](https://github.com/rackt/react-router), [react-hot-loader](https://github.com/gaearon/react-hot-loader), [gulp](http://www.gulpjs.com), [SASS](http://sass-lang.com) and a cache buster.

### Live reload awesomeness

![Hot loader](https://cloud.githubusercontent.com/assets/120693/5174592/ddba6aca-7432-11e4-81bb-db1a62e8c9f3.gif)


## App structure

```bash
.
├── server.js           # Runs the express server, with webpack on dev
│
├── app
│   │ 
│   ├── index.js        # Main script, runs the express app
│   │ 
│   ├── client          # Contains code running on the client
│   │   └── main.jsx    # Entry point for the browser: mounts the <App /> component on document.body.
│   │ 
│   ├── views           # Container for ejs views, used by express
│   │   └── page.ejs    # The main view, where the react components are rendered.
│   │ 
│   ├── routes
│   │   ├── index.js               # Renders a route server side (similar to client/main.jsx)
│   │   ├── react-routes.jsx       # Defines the react-router for both server and client
│   │   ├── cachebuster.js         # Used by express for serving cache-busted URLs
│   │   └── helpers                # Container for route helpers
│   │       └── document-title.js  # for example, this is used to get the <title> of the HTML document
│   │ 
│   ├── components      # React's components container
│   │   ├── App.jsx     # The App component where the routes are mounted
│   │   ├── Index.jsx   # The "index" route (as example)
│   │   └── Place.jsx   # The "place" route (as example)
│   │ 
│   ├── public          # Container for the static files. Cache-busted on build.
│   │   ├── css
│   │   ├── data
│   │   ├── images
│   │   └── js
│   │ 
│   └── style           # Container for .scss files
│       └── main.scss
│    
├── gulpfile.js         # Gulp script
│
├── webpack.config.build.js # Config for webpack for the build task
└── webpack.config.dev.js   # Config for webpack while development

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


* Examples consuming a REST API
* Examples for i18n
* `gulp lint` and `gulp dist` tasks

## Credits

The example app is borrowed from [react-router](https://github.com/rackt/react-router).
