'use strict';
var gulp = require('gulp');
var config = require('../config').copy;

gulp.task('copy', function() {
  return gulp.src(config.src, { base: '.' })
    .pipe(gulp.dest(config.dest));
});
