const gulp = require('gulp');
const sasslint = require('gulp-sass-lint');
const config = require('./gulp-config');

gulp.task('sasslint', function() {
  return gulp.src(config.styles.files)
    .pipe(sasslint({
      configfile: '../../.sass-lint.yml'
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
})