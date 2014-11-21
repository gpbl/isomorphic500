// Webpack configuration to use with the build task.

var webpack = require('webpack');

module.exports = {

  // Create also a "lib" chunk with common libraries, e.g. react.
  entry: {
    lib: ['react'],
    main: './app/client/main'
  },

  output: {
    path: '/app/public/js',
    publicPath: '/js/',
    filename: 'main.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production") // This has effect on the react lib size
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['jsx']
    }]
  },

  externals: {
    // Showdown is not is node_modules,
    // so we tell Webpack to resolve it to a global
    // 'showdown': 'window.Showdown'
  }
};