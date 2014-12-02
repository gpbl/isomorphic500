'use strict';
var gulp = require('gulp');
var fs   = require('fs-extra');
var dir  = require('../config').clean;

gulp.task('clean', function (callback) {
  fs.remove(dir, callback);
});