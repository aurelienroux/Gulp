const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const config = require('./gulp-config');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourceMap = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  return gulp.src(config.scripts.src)
    .pipe(plumber())
    .pipe(sourceMap.init())
    .pipe(babel())
    .pipe(concat(config.scripts.fileName))
    .pipe(uglify())
    .pipe(sourceMap.write())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})