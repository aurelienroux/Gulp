const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('./gulp-config');
const htmlclean = require('gulp-htmlclean');

gulp.task('html', ['images'], function () {
  return gulp.src(config.html.src)
    .pipe(htmlclean())
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
});