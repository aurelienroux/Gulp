# Gulp

## Summary
basic gulp system to prepare production files from CSS, Sass and Javascript sources
create package with ```$ npm init```

## structure
all development files are located in /src folder.
Gulp regroups production files in /dist folder

## tasks
a detail of every task

### scripts
gather all scripts in jsSource variable. files order can be changed to assure dependencies.
create a sourceMap included in production file, concat all js files and uglify it.
browserSync is included to serve on port 3000
```
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
```

### minifyScripts
for creating distinct files as app.js and app.min.js for production purpose.
will source on an already concatened version of scripts file and create a minified version with a sourceMap included.
```
// test in case of minification and name changing
gulp.task('minifyScripts', function(){
  gulp.src('dist/scripts/app.js')
  .pipe(sourceMap.init())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
  .pipe(sourceMap.write())
  .pipe(gulp.dest('dist/scripts/'))
})
```

### imagemin
will optimize all images in /img folder.
will only run if changes are detected in folder
```
//image minification -- only changes if necessary
gulp.task('imagemin', function(){
  var img_src = 'src/images/**/*';
  var img_dest = 'dist/images';
  gulp.src(img_src)
  .pipe(changed(img_dest))
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});
```

### stylesCSS
will concat all CSS files in one.
add browsers prefix for last 2 versions and minify production file
browserSync is included to serve on port 3000
```
// concat CSS styles, autoprefix and minification
gulp.task('stylesCSS', function() {
  gulp.src(['src/stylesCSS/*.css'])
  .pipe(concat('stylesCSS.css'))
  .pipe(autoprefix('last 2 versions'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/stylesCSS'))
  //browserSync reload application
  .pipe(browserSync.reload({
    stream: true
  }))
})
```

### Sass
process all .scss files with a sourceMap. plumber task assure that task will never stop, even with syntax errors. browserSync is included to serve on port 3000
```
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
```

### browserSync
config to serve /dist folder on port 3000 in browser.
```
//browserSync reload for CSS/Sass changes
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});
```

### clean
will delete all targeted files
```
gulp.task('clean', function() {
  del(['dist/images/*', 'dist/scripts/*', 'dist/stylesCSS/*', 'dist/stylesSass/*']);
})
```

### watchFiles
simple watcher on styles and js files without live reload.
```
gulp.task('watchFiles', function() {
  gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
  gulp.watch('src/stylesSass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
})
```

### default
will trigger selected previous tasks.
contains all watch tasks
```
// Gulp defaut tasks
gulp.task('default', ['imagemin', 'scripts', 'stylesCSS', 'sass', 'browserSync'], function(){
  console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
  gulp.watch('src/stylesSass/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});
```

## packages list
[gulp-changed](https://www.npmjs.com/package/gulp-changed)
```
npm install gulp-changed
```
imagemin
autoprefix
concat
minifyCSS
rename
sourceMap
uglify
Sass
browserSync
plumber
del
