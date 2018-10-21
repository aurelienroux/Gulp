const autoprefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const config = require('./gulp-config');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourceMap = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src(config.style.src)
    .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(sass(config.style.sass))
    .pipe(autoprefix({
      grid: config.style.grid
    }, config.style.versions))
    .pipe(sourceMap.write())
    .pipe(gulp.dest(config.style.dest))
    //browserSync reload application
    .pipe(browserSync.reload({
      stream: true
    }))
})