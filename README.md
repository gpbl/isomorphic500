isomorphic-react-template reloaded

opinionated!

## Application structure

## Static files

Client-side scripts (i.e. those loading the app on the browser), CSS files and assets (e.g. images) are always compiled, parsed and hashed (to avoid client-side caching) with Webpack.

On development, they are served using the [Webpack Dev Server](https://github.com/webpack/webpack-dev-server), so they can work with the hot module replacement.

In the production version, they are placed in a `public/assets` directory, then served and cached by Express’ `static` directive.


## Development

### ES6

I adopted [Babel](https://babeljs.io/) to write the app in ES6. On the server, Babel transpiles the app to ES5 using `require('babeljs/register')`. On the client, the sources are pre-compiled with Webpack using the [babel-loader](https://github.com/babel/babel-loader).

During development with Sublime Text, I use [babel-sublime](https://github.com/babel/babel-sublime) to enjoy a full support of the Babel syntax!

### Linting

I use [eslint](http://eslint.org) to lint my scripts, using the [this config](.eslintrc). I configured Sublime Text with [SublimeLinter](https://github.com/roadhump/SublimeLinter-eslint) to have a live linting on development.

Also, you can run:

```bash
npm run linter
```

to lint from the command line.

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable by setting an environment variable before running the server.o

```bash
DEBUG=iso500,iso500:*,Fluxible node . # enable logging for iso500 and Fluxible
DEBUG= node .                         # disable logging
```
