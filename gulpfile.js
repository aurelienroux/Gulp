'use strict';

//Dependencies required
const gulp = require('gulp');
const requireDir = require('require-dir');
requireDir('./Src/gulp-config');

const browserSync = require('browser-sync').create();

//browserSync reload for CSS/Sass changes
gulp.task('browserSync', function () {
  return browserSync.init({
    server: {
      baseDir: 'dist/'
    },
  })
});

// Gulp defaut tasks
gulp.task('default', ['html', 'images', 'scripts', 'sass', 'browserSync'], function () {
  console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
  gulp.watch('src/stylesSass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
});