# isomorphic-react-template

A starting template for building an isomorphic single page web application using [react.js](http://www.reactjs.org) on [express](http://www.expressjs.com). Includes a small demo app. For some background, start with [Isomorphic Flux](https://speakerdeck.com/mridgway/isomorphic-flux).

### Features 

* React components are rendered server-side and mounted on the browser.
* Server and client share the same routes, thanks to [react-router](https://github.com/rackt/react-router).
* Hot reload for React components with [react-hot-loader](https://github.com/gaearon/react-hot-loader) and [webpack](http://webpack.github.io). See [video](http://vimeo.com/100010922).

### Setup

```bash
# Clone the repository
git clone https://github.com/gpbl/isomorphic-react-template.git

# Install dependencies
cd isomorphic-react-template
npm install

# Run the development server
./scripts/dev
```

## App structure

```bash
.
├── server.js      # Runs the express server
├── client.jsx     # Entry point for the browser: mounts the <App /> component on document.body.
│
├── views           # Container for ejs views, used by express
│   └── page.ejs    # The main view, where the react components are rendered.
│ 
├── routes
│   ├── index.js               # Renders a route server side (similar to client/main.jsx)
│   ├── routes.jsx             # Defines the react-router handlers for both server and client
│   └── cachebuster.js         # Used by express for serving cache-busted URLs
│ 
├── components      # React's components container
│   ├── App.jsx     # The App component where the routes are mounted
│   ├── Index.jsx   # The "index" route (as example)
│   └── Place.jsx   # The "place" route (as example)
│ 
├── public          # Container for the static files. Cache-busted on build.
├── style           # Container for .scss files
│   └── main.scss
│
├── scripts
│   ├── dev        # Useful scripts to run the development server
│   └── prod       # ...or to test the production server
│
├── dev-tools.js   # Runs the webpack dev server, livereload, and watches for .scss changes
├── gulpfile.js    # Contains the gulp tasks for the build
│
├── webpack.config.js    			 # Webpack config for the build task
└── webpack.config.dev.js      # Webpack config for development

```

## Development 

You should be able to develop the app just by writing the React components in the [components](app/components) directory, and (mostly) forget about the server side.

Routes are a key part of the app: read the [react-router](https://github.com/rackt/react-router) documentation to understand how the routes handlers work. You change the routes in [routes/react-routes.jsx](app/routes/react-routes.jsx).

The main component is [App.jsx](app/components/App.jsx). For the server-side rendering, you can pass the initial props to the routes handler to [routes/index.js](app/routes/index.js) – which works together with [views/page.ejs](app/views/page.ejs). The `<App />` component is mounted with [client/main.jsx](app/client/main.jsx), which is the entry point for the browser.

If you have some questions feel free to open an issue in the project, since this template is still under development. :)

### Running the development server

The default development server runs on [localhost:3000](http://localhost:3000) and the webpack dev server on localhost:3001. 

```bash
./scripts/dev
```

The development server includes: 
* a webpack dev server with hot modules replacement for react components
* a livereload server watching the public files (install the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)).

## Building

The build task:

1. compiles the client's js files with webpack
2. copies the app sources
3. cache buster the public files
4. copies the npm dependencies

```bash
# Create a build in the /build directory
gulp build

# Test the production server on localhost:8080
PORT=8080 ./scripts/prod
```

## Credits

The example app is inspired by the [react-router](https://github.com/rackt/react-router) examples.
