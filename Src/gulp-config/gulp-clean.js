const config = require('./gulp-config');
const del = require('del');
const gulp = require('gulp');

gulp.task('clean', function () {
  return del(config.clean.paths);
})