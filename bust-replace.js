'use strict';

var path = require('path');
var fs = require('fs');
// var gutil = require('gulp-util');
var through = require('through2');


var plugin = function(options) {
  return through.obj(function(file, enc, cb) {

    console.log(file.contents.toJSON())
    //   if (file.isNull()) {
    //   this.push(file);
    //   return cb();
    // }

    // if (file.isStream()) {
    //   this.emit('error', new gutil.PluginError('gulp-rev-replace', 'Streaming not supported'));
    //   return cb();
    // }

    // // Collect renames from reved files.
    // if (file.revOrigPath) {
    //   renames[fmtPath(file.revOrigBase, file.revOrigPath)] = fmtPath(file.base, file.path);
    // }

    // if (options.replaceInExtensions.indexOf(path.extname(file.path)) > -1) {
    //   // Cache file to perform replacements in it later.
    //   cache.push(file);
    // } else {
    //   this.push(file);
    // }

    cb();
  }, function(cb) {
    // // Once we have a full list of renames, search/replace in the cached
    // // files and push them through.
    // var file;
    // var contents;
    // for (var i = 0, ii = cache.length; i !== ii; i++) {
    //   file = cache[i];
    //   contents = file.contents.toString();
    //   for (var rename in renames) {
    //     if (renames.hasOwnProperty(rename)) {
    //       contents = contents.split(rename).join(renames[rename]);
    //     }
    //   }
    //   file.contents = new Buffer(contents);
    //   this.push(file);
    // }

    cb();
  });
};

module.exports = plugin;