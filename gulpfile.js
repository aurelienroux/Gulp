'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
requireDir('./Src/gulp-config');

gulp.task('default', ['html', 'images', 'scripts', 'sass', 'browserSync'], function () {
  console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
  gulp.watch('src/stylesSass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
});