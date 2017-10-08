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
var rename = require('gulp-rename');
var sourceMap = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
// Sass
var sass = require('gulp-sass');
//MISC
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

//javascript optimization, source maps included
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
  .pipe(gulp.dest('dist/scripts/'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

// test in case of minification and name changing
// gulp.task('minifyScripts', function(){
//   gulp.src('dist/scripts/app.js')
//   .pipe(sourceMap.init())
//     .pipe(uglify())
//     .pipe(rename('app.min.js'))
//   .pipe(sourceMap.write())
//   .pipe(gulp.dest('dist/scripts/'))
// })

//image minification -- only changes if necessary
gulp.task('imagemin', function(){
  var img_src = 'src/images/**/*';
  var img_dest = 'dist/images';
  gulp.src(img_src)
  .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});

// concat CSS styles, autoprefix and minification
gulp.task('stylesCSS', function() {
  gulp.src(['src/stylesCSS/*.css'])
  .pipe(plumber())
  .pipe(concat('stylesCSS.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/stylesCSS'))
  //browserSync reload application
  .pipe(browserSync.reload({
    stream: true
  }))
})

// compile Sass files
gulp.task('sass', function(){
  gulp.src('src/stylesSass/app.scss')
  .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(sass())
  .pipe(sourceMap.write())
  .pipe(gulp.dest('dist/stylesSass/'))
  //browserSync reload application
  .pipe(browserSync.reload({
    stream: true
  }))
})

//browserSync reload for CSS/Sass changes
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

// Gulp defaut tasks
gulp.task('default', ['imagemin', 'stylesCSS', 'sass', 'scripts', 'browserSync'], function(){
  gulp.watch(
    ['src/stylesCSS/*.css', 'src/stylesSass/**/*.scss', 'src/scripts/*.js'],
    ['stylesCSS', 'sass', 'scripts']
  );
});
