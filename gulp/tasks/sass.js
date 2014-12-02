'use strict';

var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-ruby-sass');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../utils/handleErrors');
var config       = require('../config').sass;

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.dest));
});