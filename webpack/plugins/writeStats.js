var fs = require('fs');
var path = require('path');

var filepath = path.join(__dirname, '../../server', 'webpack-stats.json');

module.exports = function (stats) {
  var json = stats.toJson();
  var mainChunks = json.assetsByChunkName.main;
  if (!(mainChunks instanceof Array)) mainChunks = [mainChunks];
  fs.writeFileSync(filepath, JSON.stringify({
    mainChunks: mainChunks,
    publicPath: this.options.output.publicPath
  }));
};