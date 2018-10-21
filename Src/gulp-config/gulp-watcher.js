const gulp = require('gulp');

gulp.task('watcher', function () {
  console.log('watcher');
  
  gulp.watch('src/stylesSass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
})