'use strict';
var debug = require('debug')('app');
var less  = require('less');
var fs    = require('fs');

var renderLess = function (changedFileName) {
  fs.readFile('./style/main.less', function (err, data) {
    var dataString = data.toString();
    less.render(dataString, {
      paths: [__dirname + '/../style'],
      filename: 'main.less',
      sourceMap: {
        sourceMapFileInline: true
      }
    }, function (err, output) {
      if (err) {
        console.log(err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      fs.writeFileSync('../public/css/main.css', output.css, 'utf8');
      if (changedFileName) debug('Changed ' + changedFileName + ', main.css rendered.');
    });
  });
};

// Watch for css changes
fs.watch('./style', function (event, filename) {
  var ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'less') return;
  renderLess(filename);
});

// Render for the first run
renderLess();