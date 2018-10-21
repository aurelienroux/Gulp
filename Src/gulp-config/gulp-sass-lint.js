const gulp = require('gulp');
const sasslint = require('gulp-sass-lint');
const config = require('./gulp-config');

gulp.task('sasslint', function() {
  return gulp.src(config.styles.src)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
})