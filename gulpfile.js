'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
requireDir('./Src/gulp-config');

gulp.task('default', ['html', 'images', 'scripts', 'styles', 'sasslint', 'browserSync'], function () {
  console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  gulp.watch('src/styles/**/*.scss', ['styles', 'sasslint']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
});