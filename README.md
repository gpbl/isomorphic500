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

I use webpack as module bundler and assets loader. The entry file for the client-side app is [app/client.js](app/client.js).


### ES6

I adopted [Babel](https://babeljs.io/) to write the app in ES6. On the server, Babel transpiles the app to ES5 using `require('babeljs/register')`. On the client, the sources are pre-compiled with Webpack using the [babel-loader](https://github.com/babel/babel-loader).

During development with Sublime Text, I use [babel-sublime](https://github.com/babel/babel-sublime) to enjoy a full support of the Babel syntax!

### Linting

I use [eslint](http://eslint.org) with [this config](.eslintrc). I configured Sublime Text with [SublimeLinter](https://github.com/roadhump/SublimeLinter-eslint) to have a live linting while writing the code.

Also, you can run:

```bash
npm run linter
```

to lint from the command line.

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable by setting an environment variable before running the server.o

```bash
DEBUG=isomorphic500,isomorphic500:*,Fluxible node . # enable logging for isomorphic500 and Fluxible
DEBUG= node .                         # disable logging
```
