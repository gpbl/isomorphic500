# isomorphic500

[Isomorphic500](https://isomorphic500.herokuapp.com) is a small isomorphic ([universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)) web application featuring photos from [500px](http://500px.com).

It is built on [express](http://expressjs.com) using [React](https://facebook.github.io/react) and [Flux](https://facebook.github.io/flux) with [yahoo/fluxible](http://fluxible.io). It is developed with [webpack](http://webpack.github.io) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) and written with [babeljs](http://babeljs.io) with the help of [eslint](http://eslint.org). It supports multiple languages using [react-intl](http://formatjs.io/react/).

<a href="https://isomorphic500.herokuapp.com"><img src="https://cloud.githubusercontent.com/assets/120693/7737327/95f3de1c-ff4a-11e4-86fb-e9d3cabcdedb.png" width="700"></a>

[![Build Status](https://travis-ci.org/gpbl/isomorphic500.svg?branch=master)](https://travis-ci.org/gpbl/isomorphic500) <img src="https://david-dm.org/gpbl/isomorphic500.svg">

The intent of this project is to solidify my experience with these technologies and perhaps to inspire other developers in their journey with React and Flux. It works also as example of a javascript development environment with all the cool recent stuff :-)

- see the demo on [isomorphic500.herokuapp.com](https://isomorphic500.herokuapp.com) (with source maps!)
- clone this repo and run the server to confirm it is actually working
- edit a react component or a css style, and see the updated app as you save your changes!
- read on for some technical details

**Get help**
Join the [gitter chat](https://gitter.im/gpbl/isomorphic500?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) or the [#isomorphic500](https://reactiflux.slack.com/archives/isomorphic500) on [reactiflux](http://www.reactiflux.com) :-)

**Clone this repo**

> **Note** This app has been tested on node 0.12.x

```
git clone https://github.com/gpbl/isomorphic500.git
cd isomorphic500
npm install
```

**Start the app**

```bash
npm run dev
```

and open [localhost:3000](http://localhost:3000).

You can also try the built app:

```bash
npm run build   # First, build for production
npm run prod    # then, run the production version
```

then open [localhost:8080](http://localhost:8080).

> If you are starting the server on Windows, please read https://github.com/gpbl/isomorphic500/issues/58


## Table of Contents

* [Application structure](#application-structure)
  * [The fluxible app](#the-fluxible-app)
  * [Async data](#async-data)
  * [Router](#router)
  * [Stores](#stores)
    * [Resource stores](#resource-stores)
    * [List stores](#list-stores)
    * [The HtmlHeadStore](#the-htmlheadstore)
* [Internationalization (i18n)](#internationalization-i18n)
  * [How the user’s locale is detected](#how-the-user’s-locale-is-detected)
  * [Setting up react-intl](#setting-up-react-intl)
  * [Internationalization, the flux way](#internationalization-the-flux-way)
  * [Sending the locale to the API](#sending-the-locale-to-the-api)
* [Development](#development)
  * [nodemon](#nodemon)
  * [Webpack](#webpack)
  * [Babeljs](#babeljs)
  * [.editorconfig](#editorconfig)
  * [Linting](#linting)
  * [Debugging](#debugging)

## Application structure

```bash
.
├── index.js            # Starts the express server and the webpack dev server
├── config              # Contains the configuration for dev and prod environments
├── nodemon.json        # Configure nodemon to watch some files
├── src
│   ├── Application.js  # The react component root of the application
│   ├── client.js       # Entry point for the client
│   ├── config.js       # Config loader (load the config files from /config)
│   ├── fluxibleApp.js  # The fluxible app
│   ├── routes.js       # Routes used by fluxible-router
│   ├── server.js       # Start the express server and render the routes server-side
│   │
│   ├── actions         # Fluxible actions
│   ├── components      # React components
│   │   ├── ...
│   │   └── Html.js     # Used to render the <html> document server-side
│   ├── constants       # Constants
│   ├── intl            # Contains the messages for i18n
│   ├── pages           # Contains react components to render the page for each route
│   ├── server          # Server-side only code
│   │   ├── ga.js              # Google Analytics script
│   │   ├── intl-polyfill.js   # Patch node to support `Intl` and locale-data
│   │   ├── render.js          # Middleware to render server-side the fluxible app
│   │   └── setLocale.js       # Middleware to detect and set the request's locale
│   ├── services        # Fetchr services
│   ├── stores          # Fluxible stores
│   ├── style           # Contains the Sass files
│   └── utils         
│       ├── APIUtils.js            # Wrapper to superagent for communicating with 500px API
│       ├── CookieUtils.js         # Utility to write/read cookies 
│       ├── IntlComponents.js      # Exports wrapped react-intl components
│       ├── IntlUtils.js           # Utilities to load `Intl` and locale-data
│       ├── connectToIntlStore.js  # Connects react-intl components with the IntlStore
│       ├── getIntlMessage.js      # Get react-intl messages
│       └── trackPageView.js       # Track a page view with google analitics
├── static              
│   ├── assets         # Static files
│   └── dist           # Output files for webpack on production
└── webpack
    ├── dev.config.js  # Webpack config for development
    ├── prod.config.js # Webpack config for building the production files
    └── server.js      # Used to starts the webpack dev server

```

### The fluxible app

The [src/fluxibleApp](src/fluxibleApp) file is the core of the Fluxible application:

- it configures Fluxible with [Application.js](src/Application.js) as the root component.
- it registers the stores so they can work on the same React context
- it adds the [fetchr plugin]((https://github.com/yahoo/fluxible-plugin-fetchr)), to share the same API requests both client and server-side
- it makes possible to dehydrate the stores [on the server](src/server/render.js) and rehydrate them [on the client](src/client.js)

### Async data

I used [Fetchr](https://github.com/yahoo/fetchr) and [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).
[Fetchr services](src/services) run only on server and send [superagent](http://visionmedia.github.com/superagent) requests to 500px.

### Router

This app uses [fluxible-router](https://github.com/yahoo/fluxible-router) for routing. Fluxible-router works pretty well in fluxible applications since it follows the flux paradigm. The [Application component](src/Application.js) uses the `@handleHistory` decorator to bind the router to the app.

### Stores

Instead of directly listening to stores, components use fluxible's `@connectToStores` decorator: a store state is passed to components as prop. See for example the [PhotoPage](src/pages/PhotoPage.js) or the [FeaturedPage](src/pages/FeaturedPage.js).

`connectToStore` can also "consume" store data without actually listening to any store. This is the case of [NavBar](src/components/NavBar.js) or [LocaleSwitcher](src/components/LocaleSwitcher.js).

#### Resource stores

While REST APIs usually return collections as arrays, a resource store keeps items as big object – like the [PhotoStore](src/stores/PhotoStore.js). This simplifies the progressive resource updates that may happen during the app’s life.

#### List stores

A list store keeps references to a resource store, as the [FeaturedStore](src/stores/FeaturedStore.js) holds the ids of the photos in [PhotoStore](src/stores/PhotoStore.js).

#### The HtmlHeadStore

The [HtmlHeadStore](src/stores/HtmlHeadStore.js) is a special store used to set the `<head>` meta-tags in the `Html` component, during server-side rendering. It is also listened by the `Application` component to change the browser's `document.title`.

This store listens to route actions and set its content according to the current route. It also get data from other stores (e.g. the photo's title from the `PhotoStore`), or the localized messages from the `IntlStore`.

## Internationalization (i18n)

To give an example on how to implement i18n in a React application, isomorphic500 supports English, [Italian](https://www.youtube.com/watch?v=9JhuOicPFZY), Portuguese and French.

This app adopts [React Intl](http://formatjs.io/react/), which is a solid library for this purpose.

### How the user’s locale is detected

The app sniffs the browser's `accept-language` request header. The [locale](https://github.com/jed/locale) npm module has a nice express middleware for that. Locales are restricted to those set in the app's [config](../config).

The user may want to override the detected locale: the [LocaleSwitcher](src/components/LocaleSwitcher.js) component set a cookie when the user chooses a language. Also, we enable the `?hl` parameter in the query string to override it. Server-side, cookie and query string are detected by the [setLocale](src/server/setLocale.js) middleware.

### Setting up react-intl

React-intl requires some boilerplate to work properly. Difficulties here arise mainly for two reasons:

1. React Intl relies on the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) *global* API, not always available on node.js or some browsers (e.g. Safari). Luckly there's an [Intl polyfill](https://www.npmjs.com/package/intl): on the server we can just "require" it – however on the browser we want to download it *only* when `Intl` is not supported.

2. For each language, we need to load a set of *locale data* (used by `Intl` to format numbers and dates) and the translated strings, called *messages* (used by `react-intl`). While on node.js we can load them in memory, on the client they need to be downloaded first – and we want to download only the relevant data for the current locale.

**On the server** the solution is easy: as said, the server [loads a polyfill](src/server/intl-polyfill) including both `Intl` and the locale data. For supporting the browser, we can instead rely on our technology stack, i.e. flux and webpack.

**On the client**, we have to load the `Intl` polyfill and its locale data *before* rendering the app, i.e. in [client.js](src/client.js).

For this purpose, I used webpack's `require.ensure()` to split `Intl` and localized data in multiple chunks. Only after they have been downloaded, the app can be mounted. See the `loadIntlPolyfill()` and `loadLocaleData()` functions in [IntlUtils](src/utils/IntlUtils.js): they return a promise that is resolved when the webpack chunks are downloaded and `require`d.

They are used in [client.js](client.js) before mounting the app.

> **Important**: since `react-intl` assumes `Intl` is already in the global scope, we can't import the fluxible app (which imports react-intl in some of its components) *before* polyfilling `Intl`. That's why you see in [client.js](src/client.js) `require("./app")` inside the in the `renderApp()` function, and not as `import` on the top of the file.

### Internationalization, the flux way

Lets talk about the data that `react-intl` needs to deliver translated content. Translated messages are saved in the [intl](src/intl) directory and shared between client and server using the [IntlStore](stores/IntlStore).

This store listens to a `LOAD_INTL_SERVER` action dispatched by [IntlActionCreator](src/actions/IntlActionCreators.js). We execute this action **only server side** before rendering the `Html` component together with the usual `navigateAction`. This allows to dehydrate/rehydrate the store content.

React-intl components need to have access to the `IntlStore`. Plus, since I'm using ES6 classes, I can't adopt the react-intl `Mixin` in my components. To solve this, I wrap the `Formatted*` components and make them available from [IntlComponents](src/utils/IntlComponents.js).

### Sending the locale to the API

While this is not required by the 500px API, we can send the current locale to the API so it can deliver localized content. This is made very easy by the Fetchr services, since they expose the `req` object: see for example the [photo service](src/services/photo.js).

## Development

Run the development version with

```
npm run dev
```

### nodemon

This task runs the server with [nodemon](https://github.com/remy/nodemon). Nodemon will restart the server when some of the files specified in [its config](nodemon.json) change.

### Webpack

Webpack is used as commonjs module bundler, css builder (using sass-loader) and assets loader (images and svg files).

The [development config](./webpack/dev.config.js) enables source maps, the [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/). It loads CSS styles with `<style>`, to enable styles live reload). This config is used by the [webpack-dev-server](webpack/server.js), serving the files bundled by Webpack.

> This config uses the [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)
> plugin. To get notified on errors while compiling the code, on Mac you must `brew install terminal-notifier`.

The [production config](./webpack/prod.config.js) builds the client-side production bundle from `npm run build`.

Both configs set a `process.env.BROWSER` global variable, useful to require CSS from the components, e.g:

```js
// MyComponent
if (process.env.BROWSER) {
  require('../style/MyComponent.scss');
}
```

On production, files bundled by webpack are hashed. Javascript and CSS file names are saved in a `static/dists/stats.json` which is read by the [Html](src/components/Html.js) component.

### Babeljs

This app is written in Javascript-[Babel](https://babeljs.io/). Babel config is in [.babelrc](.babelrc) (it only enables class properties). On Sublime Text, I installed [babel-sublime](https://github.com/babel/babel-sublime) to have full support of the Babel syntax!

### .editorconfig

The [.editorconfig](.editorconfig) file can be used with your IDE/editor to mantain a consistent coding style. See [editorconfig.org](http://editorconfig.org) for more info. (thanks to @lohek)

### Linting

I use [eslint](http://eslint.org) with [babel-eslint](https://github.com/babel/babel-eslint) and the [react plugin](https://github.com/yannickcr/eslint-plugin-react). I also configured Sublime Text with [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint).

I use the rules from my own [eslint-config-gpbl](https://github.com/gpbl/eslint-config-gpbl) shared configs.

```bash
npm run lint
```

I use [SublimeLinter-scss-lint](https://github.com/attenzione/SublimeLinter-scss-lint) for linting the Sass files ([.scss-lint.yml](.scss-lint.yml)) (only with Sublime Text).

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable the logging from Node by setting the `DEBUG` environment variable before running the server:

```bash
# enable logging for isomorphic500 and Fluxible
DEBUG=isomorphic500,Fluxible node index

# disable logging
DEBUG= node index
```

From the **browser**, you can enable/disable them by sending this command in the JavaScript console:

```js
debug.enable('isomorphic500')
debug.disable()
// then, refresh!
```
