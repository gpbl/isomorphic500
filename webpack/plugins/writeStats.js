var fs = require('fs');
var path = require('path');

var filepath = path.join(__dirname, '../../server', 'webpack-stats.json');

module.exports = function (stats) {
  var json = stats.toJson();
  var mainChunk = json.assetsByChunkName.main;
  if (mainChunk instanceof Array) mainChunk = mainChunk[0];
  fs.writeFileSync(filepath, JSON.stringify({
    mainChunk: mainChunk,
    publicPath: this.options.output.publicPath
  }));
};