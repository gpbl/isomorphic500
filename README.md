# isomorphic500

Isomorphic app.

To start the app run:

```bash
npm start
```

then open [localhost:3000](http://localhost:3000).


### Build

To run the built version:

```bash
npm run build   # build for production
npm run prod    # run production version
```

then open [localhost:8080](http://localhost:8080).


## Application structure

## Static files

Static files, like images, are loaded and hashed with Webpack, to avoid client-side cache.

On development, they are served using the [Webpack Dev Server](https://github.com/webpack/webpack-dev-server), so they can work with the hot module replacement.

In the production version, they are placed in a `public/assets` directory, then served and cached by Express’ `static` directive.


## Development

### Webpack

I use [Webpack](http://webpack.github.io) as modules bundler and assets loader. The entry file for the client-side app is [src/client.js](src/client.js).

There're two webpack config: [dev.config.js](./webpack/dev.config.js) is for the development and [prod.config.js](./webpack/prod.config.js) for production.

[Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) are active when running the development environment: they will reload the app without refreshing the page in the browser! To enable this feature, I use the [Webpack Dev Server](https://github.com/webpack/webpack-dev-server).

The CSS styles, written with Sass, are explicitly required from the React components. In the development version, they are injected in the document as inline `<style>`s, so they will hot-reload when I save them. When building for production, webpack will bundle them into a single CSS file.

Webpack will also take care of other static files (e.g. images from the CSS), renaming them with an hash to skip the browser's cache.

### ES6

I use [Babel](https://babeljs.io/) to write the app in ES6. On the server, Babel transpiles the sources to ES5 using `require('babeljs/register')`. On the client, Webpack pre-compile them with the [babel-loader](https://github.com/babel/babel-loader).

On Sublime Text, I installed [babel-sublime](https://github.com/babel/babel-sublime) to enjoy a full support of the modern Babel syntax!

### Linting

I use [eslint](http://eslint.org) with [babel-eslint](https://github.com/babel/babel-eslint) and the [react plugin](https://github.com/yannickcr/eslint-plugin-react) – you can see the config in [.eslintrc](.eslintrc). I configured Sublime Text with [SublimeLinter](https://github.com/roadhump/SublimeLinter-eslint) for linting while writing the code. It's really a great thing!

For the code style, I'm experimenting with [jscs](http://jscs.info) using [a config](.jscsrc) inspired by Airbnb. There's even [a package](https://packagecontrol.io/packages/SublimeLinter-jscs) for Sublime.

You can use this command to run both linters from the command line:

```bash
npm run linter
```

> Note: eslint may throw some warnings since JSX-support is not yet 100% ready.

### Testing

I'm still a beginner with unit testing a Flux/React app – so my tests may be flawed (please send some suggestions).

After trying unsucessfully to use Facebook’s [jest](https://facebook.github.io/jest) (mainly because of [this issue](https://github.com/facebook/jest/issues/185)), I went with [mocha](http://mochajs.org), using [chai](http://chaijs.com) as assertion library.

To run the tests, use this command:

```
npm test
```

There's also the test coverage with [isparta](https://github.com/douglasduteil/isparta) (based on [istanbul](https://github.com/gotwarlost/istanbul)):

```bash
npm run coverage
```

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable it by setting the `DEBUG` environment variable before running the server:

```bash
# enable logging for isomorphic500 and Fluxible
DEBUG=isomorphic500,isomorphic500:*,Fluxible node index

# disable logging
DEBUG= node index
```

## Caveats

- The latests version of `sass-loader` have some [troubles](https://github.com/jtangelder/sass-loader/issues/71), so i stick with `sass-loader@0.4.0` until they are fixed.
