// configuration for server-side rendering
// see https://github.com/webpack/react-webpack-server-side-example

var shared = require('./_shared.config');

module.exports = {
  name: 'server-side rendering',
  entry: './server/markup.jsx',
  target: 'node',
  output: {
    path: shared.assetsPath,
    filename: '../../server/markup.generated.js',
    publicPath: shared.publicPath,
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: shared.commonLoaders.concat([])
  }
}