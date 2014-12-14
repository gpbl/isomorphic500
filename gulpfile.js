"use strict";

var gulp         = require('gulp'),
    gutil        = require("gulp-util"),
    filter       = require('gulp-filter'),
    replace      = require('gulp-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint       = require('gulp-jshint'),
    react        = require('gulp-react'),
    cachebust    = new require('gulp-cachebust')(),
    fs           = require('fs-extra'),
    webpack      = require("webpack"),
    webpackBuild = require('./webpack.config'),
    webpackDev   = require('./webpack.config.dev'),
    notifier     = require('node-notifier');

var paths = {
    build:    'build/',
    public:   'public/',
    server:   ['package.json', 'app.js', '*.jsx', 'cachebuster.js', 'components/**/*.jsx']
};

var pkg = require('./package.json');

function notifyError(err) {
  if (!err) { return; }
  gutil.log(err.message);
  gutil.beep();
  notifier.notify({
    title: 'Building ' + pkg.name,
    message: err.message
  });
}

// Build for production
gulp.task('build', ['clean', 'webpack', 'copy', 'bust'], function () {
  notifier.notify({
    icon: null,
    contentImage: __dirname + '/public/images/favicon.png',
    title: pkg.name,
    sound: 'Glass',
    message: 'Build: done.',
    open: 'file://' + __dirname + '/' + paths.build
  });
  gutil.log('[build] Run `./scripts/prod` to test the built app.');
});

// Clean build directory
gulp.task('clean', function (callback) {
  fs.remove(paths.build, callback);
});

// create chunks and uglify with webpack
gulp.task('webpack', ['clean'], function (callback) {
  webpack(webpackBuild, function (err, stats) {
    if (err) return notifyError(err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true
    }));
    callback();
  });
});

// Copy the app
gulp.task('copy', ['copy:server', 'copy:public']);

// copy server files
gulp.task('copy:server', ['clean'], function() {
  return gulp.src(paths.server, { base: '.' })
    .pipe(gulp.dest(paths.build));
});

// copy public
gulp.task('copy:public', ['clean'],  function() {
  var src = [paths.public + '**/*', '!**/*.map'];

  return gulp.src(src, { base: '.' })
    .pipe(gulp.dest(paths.build));
});


// cache busters
var bustSrc = 
gulp.task('bust', ['bust:collect', 'bust:replace']);

// collect resources for cache busting
gulp.task('bust:collect', ['webpack', 'copy'], function () {
  var src = [].concat(paths.public + '**/*');
  return gulp.src(src, { cwd: paths.build, base: paths.build + paths.public })
    .pipe(cachebust.resources());
});

// replace collected resources
gulp.task('bust:replace', ['bust:collect'], function () {
  gutil.log("[bust:replace]", 'Busting ' + Object.keys(cachebust.mappings).length + ' asset(s)...');
  return gulp.src(paths.server, { cwd: paths.build, base: paths.build })
    .pipe(cachebust.references())
    .pipe(gulp.dest(paths.build));
});

