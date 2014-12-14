var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Entry point for static analyzer:
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    './client.jsx'
  ],

  output: {
    // Where to put build results when doing production builds:
    // (Server doesn't write to the disk, but this is required.)
    path: __dirname,

    // Filename to use in HTML
    filename: 'main.js',

    // Path to use in HTML
    publicPath: 'http://localhost:3001/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    new ExtractTextPlugin("[name].css"),
  ],

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      // Pass *.jsx files through jsx-loader transform
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'jsx']
      },
      // Pass stylus files through loaders to generate required css files.
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') }
    ]
  },
  // devtool: "#inline-source-map",
  externals: { }
};