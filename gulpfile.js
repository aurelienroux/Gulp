var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function(){
  var img_src = 'src/images/**/*';
  var img_dest = 'build/images';

  gulp.src(img_src)
  // .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});
