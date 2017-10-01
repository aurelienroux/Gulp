'use strict';

//Dependencies required
var gulp = require('gulp');
//IMAGES
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
//CSS & JS
var autoprefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var sourceMap = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
//MISC
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

//javascript optimization
var jsSource = [
  'src/scripts/log.js',
  'src/scripts/alert.js'
];

gulp.task('scripts', function(){
  gulp.src(jsSource)
  .pipe(sourceMap.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
  .pipe(sourceMap.write())
  .pipe(gulp.dest('build/scripts/'))
  .pipe(browserSync.reload({
    stream: true
  }))
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
  .pipe(plumber())
  .pipe(concat('styles.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('build/styles'))
  //browserSync reload application
  .pipe(browserSync.reload({
    stream: true
  }))
})

//browserSync reload for CSS changes
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

// Gulp defaut tasks
gulp.task('default', ['imagemin', 'browserSync', 'styles', 'scripts'], function(){
  gulp.watch(['src/styles/*.css', 'src/scripts/*.js'], ['styles', 'scripts']);
});
