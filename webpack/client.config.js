// webpack config for the browser's entry
var path = require('path');
var assetsPath = path.join(__dirname, '../public/assets');
var publicPath = '/assets/';
var writeStats = require('./plugins/writeStats');
var productionEnv = require('./plugins/productionEnv');

// webpack configuration for the browsers
module.exports = {
  name: "client",
  entry: "./client/main.jsx",
  output: {
    path: assetsPath,
    filename: "[hash].js",
    publicPath: publicPath
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: '6to5-loader' },
      { test: /\.scss$/, loader: 'style!css!sass' }
    ]
  },
  plugins: [
    productionEnv, 
    function() { this.plugin('done', writeStats) }
  ]
}