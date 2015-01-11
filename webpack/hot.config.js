// configuration for webpack with webpack-dev-server HMR
var browser = require('./browser.config');
var webpack = require('webpack');
var notify = require('./notify');

var serverUrl = 'http://localhost:3001';

// start using the webpack's browser config
var hot = browser;

hot.name = 'hot';

// add webpack-dev-server to entry files
hot.entry = [
  'webpack-dev-server/client?' + serverUrl,
  'webpack/hot/only-dev-server',
  browser.entry
]

// enable hot module replacement
hot.plugins.push(new webpack.HotModuleReplacementPlugin());

// notify for errors or warnings
hot.plugins.push(
  function (compiler) {
    this.plugin('done', notify);
  }
);

// use full server url
hot.output.publicPath = serverUrl + hot.output.publicPath;

hot.module.loaders = [{
  test: /\.js(x)$/,
  exclude: /node_modules/,
  loaders: ['6to5-loader', 'react-hot']
}]

// enable source maps
hot.devtool = 'eval';

// export also server url for later use
hot.serverUrl = serverUrl;

module.exports = hot;