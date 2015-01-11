// webpack config for the browser's entry
var fs = require('fs');
var path = require('path');

var assetsPath = path.join(__dirname, '../public/assets');
var publicPath = '/assets/';

// webpack configuration for the browsers
module.exports = {
  name: "browser",
  entry: "./browser/main.jsx",
  output: {
    path: shared.assetsPath,
    filename: "[hash].js",
    publicPath: shared.publicPath
  },
  module: {
    loaders: [
      { test: /\.js(x)$/, exclude: /node_modules/, loader: '6to5-loader' }
    ]
  },
  plugins: [
    function () {
      // output the webpack results so to require the main chunk 
      // in the server-side markup
      this.plugin('done', function (stats) {
        var json = stats.toJson();
        // output only relevant stats
        var str = JSON.stringify({
          mainChunk: json.assetsByChunkName.main,
          publicPath: this.options.output.publicPath
        });
        fs.writeFileSync(path.join(__dirname, '../server', 'webpack-stats.json'), str);
      });
    }
  ]
}