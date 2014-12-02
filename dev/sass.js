'use strict';

var debug = require('debug')('app');
var sass  = require('sass');
var fs    = require('fs');

var renderSass = function(filename) {
  sass.renderFile({
    file: __dirname + '../style/main.scss',
    outFile: __dirname + '../public/css/main.css',
    sourceMap: true,
    success: function (css) { if (filename) debug('Changed '+ filename); },
    error: function (error) { console.log(error); }
  });
};

// Watch for scss changes
fs.watch(__dirname + '/style', function (event, filename) {
  var ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'scss') return;
  renderSass(filename);
});

// Render for the first run
renderSass();