'use strict';

var debug = require('debug')('app');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.dev');
var livereload = require('livereload');
var fs = require('fs');
var less = require('less');

// Run the webpack dev server
var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'http://localhost:3000',
  noInfo: true,
  hot: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) console.log(err);
  else debug('Webpack server listening on port 3001');
});


var renderLess = function (changedFileName) {
  fs.readFile('./app/style/main.less', function (err, data) {
    var dataString = data.toString();
    less.render(dataString, {
      paths: [__dirname + '/app/style'],
      filename: 'main.less',
      sourceMap: {
        sourceMapFileInline: true
      }
    }, function (err, output) {
      if (err) {
        console.log(err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      fs.writeFileSync('./app/public/css/main.css', output.css, 'utf8');
      if (changedFileName) debug('Changed ' + changedFileName + ', main.css rendered.');
    });
  });
};

// Watch for css changes
fs.watch(__dirname + '/app/style', function (event, filename) {
  var ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'less') return;
  renderLess(filename);
});

// Render for the first run
renderLess();

// Watch public dir with livereload
var lr = livereload.createServer();
lr.watch(__dirname + '/app/public');