// webpack config for the browser's entry
var path = require('path');
var assetsPath = path.join(__dirname, '../public/assets');
var writeStats = require('./plugins/writeStats');
var productionEnv = require('./plugins/productionEnv');
var webpack = require('webpack');
var shared = require('./shared');

// webpack configuration for the browsers
module.exports = {
  name: 'client',
  entry: './client.js',
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    publicPath: shared.publicPath
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: '6to5-loader' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    productionEnv, 
    function() { this.plugin('done', writeStats) }
  ]
}