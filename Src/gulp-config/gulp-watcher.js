const gulp = require('gulp');

gulp.task('watcher', function () {  
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']);
})