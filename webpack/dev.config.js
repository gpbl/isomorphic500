// configuration for webpack with webpack-dev-server hot module replacement

var webpack = require('webpack');
var writeStats = require('./plugins/write-stats');
var notifyStats = require('./plugins/notify-stats');
var shared = require('./shared');

module.exports = {
  name: 'client-dev',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    shared.entry,
  ],
  output: shared.output,
  module: {
    loaders: shared.loaders.concat([
      // enable react-hot-loader and 6to5 loader
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['6to5-loader', 'react-hot'] },
      
      // on dev, use inline styles for hot reload
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded' }
    ])
  },
  // compile for dev plugins
  plugins: [
    // remove momentjs locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    
    // enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),

    // set NODE_ENV
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('development') }
    }),

    // notify for errors during compile
    function() { this.plugin('done', notifyStats) },

    // write stats to the server directory
    function() { this.plugin('done', writeStats) }
  ],
  devtool: 'eval'
}

