const browserSync = require('browser-sync').create();
const gulp = require('gulp');

gulp.task('browserSync', function () {
  return browserSync.init({
    server: {
      baseDir: 'dist/'
    },
  })
});