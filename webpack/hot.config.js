// configuration for webpack with webpack-dev-server HMR

var client = require('./client.config');
var webpack = require('webpack');
var writeStats = require('./plugins/writeStats');
var notifyStats = require('./plugins/notifyStats');
var shared = require('./shared');

var serverUrl = 'http://localhost:3001';

// start using the webpack's client config
var hot = client;

hot.name = 'hot';

// add webpack-dev-server to entry files
hot.entry = [
  'webpack-dev-server/client?' + serverUrl,
  'webpack/hot/only-dev-server',
  client.entry
]

hot.module.loaders = shared.loaders.concat([
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['6to5-loader', 'react-hot'] },
  { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded' }
]);


// enable hot module replacement
hot.plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NewWatchingPlugin(),
  function() { this.plugin('done', notifyStats) },
  function() { this.plugin('done', writeStats) }
];

// enable source maps
hot.devtool = 'eval';

// export also server url for later use
hot.serverUrl = serverUrl;

module.exports = hot;