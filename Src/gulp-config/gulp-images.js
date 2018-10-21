const changed = require('gulp-changed');
const config = require('./gulp-config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpeg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(imagemin(
      [
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPng(),
        imageminJpeg()
      ]
    ))
    .pipe(gulp.dest(config.images.dest));
});