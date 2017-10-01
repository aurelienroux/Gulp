var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('imagemin', function(){
  var img_src = 'src/images/**/*';
  var img_dest = 'build/images';
  gulp.src(img_src)
  .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});

gulp.task('styles', function() {
  gulp.src(['src/styles/*.css'])
  .pipe(concat('styles.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('build/styles'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

gulp.task('default', ['imagemin', 'browserSync', 'styles'], function(){
  gulp.watch('src/styles/*.css', ['styles']);
});
