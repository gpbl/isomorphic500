var fs = require('fs');
var path = require('path');

var filepath = path.join(__dirname, '../../server', 'webpack-stats.json');

module.exports = function (stats) {
  var json = stats.toJson();
  fs.writeFileSync(filepath, JSON.stringify({
    mainChunk: json.assetsByChunkName.main,
    publicPath: this.options.output.publicPath
  }));
};