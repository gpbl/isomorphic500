var gulp = require('gulp');
gulp.task('build', ['clean', 'sass', 'webpack', 'copy', 'cachebust']);
