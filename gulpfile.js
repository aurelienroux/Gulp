//Dependencies required
var gulp = require('gulp');
//IMAGES
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
//CSS
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
//LIVERELOAD
var browserSync = require('browser-sync').create();


//javascript optimization
gulp.task('scripts', function(){
  gulp.src(['src/scripts/*.js'])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/scripts/'));
})

//image minification -- only changes if necessary
gulp.task('imagemin', function(){
  var img_src = 'src/images/**/*';
  var img_dest = 'build/images';
  gulp.src(img_src)
  .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});

// concat CSS styles, autoprefix and minification
gulp.task('styles', function() {
  gulp.src(['src/styles/*.css'])
  .pipe(concat('styles.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('build/styles'))
  //browserSync reload application
  .pipe(browserSync.reload({
    stream: true
  }))
})

//broswerSync reload for CSS changes
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

// Gulp defaut tasks
gulp.task('default', ['imagemin', 'browserSync', 'styles', 'scripts'], function(){
  gulp.watch('src/styles/*.css', ['styles']);
});
