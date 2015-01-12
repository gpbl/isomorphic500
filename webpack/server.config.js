// configuration for server-side rendering
// see https://github.com/webpack/react-webpack-server-side-example

var path = require('path');
var outputPath = path.join(__dirname, '../server');

module.exports = {
  name: 'server-side rendering',
  entry: './server/html.jsx',
  target: 'node',
  output: {
    path: outputPath,
    // the following file must be called from server-side rendering
    // to know the hashed filename for the main js script
    filename: 'html.generated.js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: '6to5-loader' },
      { test: /\.json$/, loader: 'json-loader' }, // used to load webpack-stats.json
      { test: /\.scss$/, loader: path.join(__dirname, "../server/helpers/style-collector") + '!css!sass' }
    ]
  }
}