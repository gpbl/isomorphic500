// configuration for webpack with webpack-dev-server HMR

var browser = require('./browser.config');
var webpack = require('webpack');
var writeStats = require('./plugins/writeStats');
var notifyStats = require('./plugins/notifyStats');

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
hot.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  function() { this.plugin('done', notifyStats) },
  function() { this.plugin('done', writeStats) }
];

// use full server url
hot.output.publicPath = serverUrl + hot.output.publicPath;

hot.module.loaders = [
  { test: /\.js(x)$/, exclude: /node_modules/, loaders: ['6to5-loader', 'react-hot'] },
  { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' }
];

// enable source maps
hot.devtool = 'eval';

// export also server url for later use
hot.serverUrl = serverUrl;

module.exports = hot;