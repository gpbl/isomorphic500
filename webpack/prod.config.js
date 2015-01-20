// webpack config for the browser's entry (build)

var webpack = require('webpack');
var writeStats = require('./plugins/write-stats');
var shared = require('./shared');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'client-prod',
  entry: shared.entry,
  output: shared.output,
  module: {
    loaders: shared.loaders.concat([
      // use 6to5 loader to compile es6 scripts
      { test: /\.jsx?$/, exclude: /node_modules/, loader: '6to5-loader' },
      
      // compile scss files
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css!autoprefixer?browsers=last 2 version!sass") }
    ])
  },
  // compile for production plugins
  plugins: [
    // extract compiled scss to css
    new ExtractTextPlugin("[name]-[chunkhash].css"),
    
    // ignore moment.js locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // set NODE_ENV
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),

    // write stats to the server directory
    function() { this.plugin('done', writeStats) }
  ]
}