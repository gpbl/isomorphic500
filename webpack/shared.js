// shared webpack config
var path = require('path');
var assetsPath = path.join(__dirname, '../public/assets');

module.exports = {
  entry: './client.js',
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    publicPath: '/assets/'
  },
  loaders: [
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.svg$/, loader: "url-loader?limit=100000&mimetype=image/svg+xml" }
  ]
}