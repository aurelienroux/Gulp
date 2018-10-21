const autoprefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const config = require('./gulp-config');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourceMap = require('gulp-sourcemaps');

gulp.task('styles', function () {
  return gulp.src(config.styles.src)
    .pipe(sourceMap.init())
    .pipe(plumber())
    .pipe(sass(config.styles.sass))
    .pipe(autoprefix({
      grid: config.styles.grid
    }, config.styles.versions))
    .pipe(sourceMap.write())
    .pipe(gulp.dest(config.styles.dest))
    //browserSync reload application
    .pipe(browserSync.reload({
      stream: true
    }))
})