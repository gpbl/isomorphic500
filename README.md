# isomorphic-react-template

A starting template for building a single page web application using [react.js](http://www.reactjs.org) and [express](http://www.expressjs.com). Includes a small demo app.

### Features 

* React components are rendered server-side, then mounted on the browser.
* Server and client share the same routes, thanks to [react-router](https://github.com/rackt/react-router).
* Hot reload for React components with [react-hot-loader](https://github.com/gaearon/react-hot-loader).

### Live reload awesomeness

![Hot Loader](https://cloud.githubusercontent.com/assets/120693/5181393/404b734c-7496-11e4-8b1a-4e0654e0780b.gif)

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
├── server-dev.js  # Runs the express server, the webpack dev server, livereload, and watches for .scss changes
|
├── scripts
│   ├── dev        # Useful scripts to run the development server
│   └── prod       # ...or to test the production server
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
├── gulpfile.js         # Contains the gulp tasks for the build
│
├── webpack.build.js    # Config for webpack for the build task
└── webpack.dev.js      # Config for webpack while development

```

## Development 

You should be able to develop the app just by writing the React components in the [components](app/components) directory, and (mostly) forget about the server side.

Routes are a key part of the app: read the [react-router](https://github.com/rackt/react-router) documentation to understand how the routes handlers work. You change the routes in [routes/react-routes.jsx](app/routes/react-routes.jsx).

The main component, which is mounted client-side and rendered server side, is [App.jsx](app/components/App.jsx). For the server-side rendering, you can pass the initial props to the routes handler via [routes/index.js](app/routes/index.js) – which works together with [views/page.ejs](app/views/page.ejs). The main `<App />` component is also mounted client-side via [client/main.jsx](app/client/main.jsx), which is the entry point for the browser.

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
2. copies the app sources and apply some required substitutions
3. enables a cache busting
4. copies the npm dependencies

```bash
# Create a build in the /build directory
gulp build

# Test the production server on localhost:8080
PORT=8080 ./scripts/prod
```

## Credits

The example app is inspired by the [react-router](https://github.com/rackt/react-router) examples.
