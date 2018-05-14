# Gulp

## Summary
basic gulp system to prepare production files from CSS, Sass and Javascript sources.

Create package with `$ npm init`

## Structure
all development files are located in /src folder.
Gulp regroups production files in /dist folder

## Tasks
a detail of every task

### html
concat and uglify all html files.
with BrowserSync

```javascript
gulp.task('html', ['images'], function () {
    return gulp.src('./src/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
```

### scripts
gather all scripts in jsSource variable. files order can be changed to assure dependencies.
create a sourceMap included in production file, concat all js files and uglify it.
ES6 support
browserSync is included to serve on port 3000
```javascript
//javascript optimization, source maps included
var jsSource = [
  'src/scripts/log.js',
  'src/scripts/alert.js'
];

gulp.task('scripts', function () {
    return gulp.src(jsSource)
        .pipe(sourceMap.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourceMap.write())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
```

### checkScripts
will provide an error log for uglify js scripts
```javascript
gulp.task('checkScripts', function (cb) {
    pump([
            gulp.src('scripts/*.js'),
            uglify(),
            gulp.dest('dist/pump')
        ],
        cb
    );
});
```

### minifyScripts
for creating distinct files as app.js and app.min.js for production purpose.
will source on an already concatened version of scripts file and create a minified version with a sourceMap included.
```javascript
// test in case of minification and name changing
gulp.task('minifyScripts', function(){
    return gulp.src('dist/scripts/app.js')
        .pipe(sourceMap.init())
            .pipe(uglify())
            .pipe(rename('app.min.js'))
        .pipe(sourceMap.write())
        .pipe(gulp.dest('dist/scripts/'))
})
```

### images
will optimize all images in /img folder.
will only run if changes are detected in folder
2 modules present: imagemin or gulp-image
```javascript
//image minification -- only changes if necessary
gulp.task('images', function () {
    var img_src = 'src/images/**/*';
    var img_dest = 'dist/images';
    return gulp.src(img_src)
        .pipe(changed(img_dest))
        //imagemin task
        //   .pipe(imagemin())
        //image task
        .pipe(image())
        .pipe(gulp.dest(img_dest));
});
```

### stylesCSS
will concat all CSS files in one.
add browsers prefix for last 2 versions and minify production file
CSS grid supported
browserSync is included to serve on port 3000
```javascript
// concat CSS styles, autoprefix and minification
gulp.task('stylesCSS', function () {
    return gulp.src(['src/stylesCSS/*.css'])
        .pipe(concat('stylesCSS.css'))
        .pipe(autoprefix({
            grid: true
        }, 'last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/stylesCSS'))
        //browserSync reload application
        .pipe(browserSync.reload({
            stream: true
        }))
})
```

### Sass
process all .scss files with a sourceMap. plumber task assure that task will never stop, even with syntax errors.
CSS grid supported
browserSync is included to serve on port 3000
```javascript
// compile Sass files
gulp.task('sass', function () {
    return gulp.src('src/stylesSass/app.scss')
        .pipe(sourceMap.init())
        .pipe(plumber())
        // .pipe(sass())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefix({
            grid: true
        }, 'last 2 versions'))
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
```javascript
//browserSync reload for CSS/Sass changes
gulp.task('browserSync', function () {
    return browserSync.init({
        server: {
            baseDir: 'dist/'
        },
    })
});
```

### clean
will delete all targeted files
```javascript
gulp.task('clean', function () {
    return del([
        'dist/images/*',
        'dist/scripts/*',
        'dist/stylesCSS/*',
        'dist/stylesSass/*',
        'dist/*.html'
    ]);
})
```

### watchFiles
simple watcher on styles and js files without live reload.
```javascript
gulp.task('watchFiles', function () {
    gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
    gulp.watch('src/stylesSass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/*.html', ['html']);
})
```

### default
will trigger selected previous tasks.
contains all watch tasks
```javascript
// Gulp defaut tasks
gulp.task('default', ['html', 'images', 'scripts', 'stylesCSS', 'sass', 'browserSync'], function () {
    console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
    gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
    gulp.watch('src/stylesSass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/*.html', ['html']);
});
```

## Packages list
[gulp-changed](https://www.npmjs.com/package/gulp-changed)
```
npm install gulp-changed --save-dev
```
[imagemin](https://www.npmjs.com/package/gulp-imagemin)
```
npm install gulp-imagemin --save-dev
```
[autoprefix](https://www.npmjs.com/package/gulp-autoprefixer)
```
npm i gulp-autoprefixer --save-dev
```
[concat](https://www.npmjs.com/package/gulp-concat)
```
npm install gulp-concat --save-dev
```
DEPRECATED [minifyCSS](https://www.npmjs.com/package/gulp-minify-css)
```
npm install gulp-minify-css --save-dev
```
[rename](https://www.npmjs.com/package/gulp-rename)
```
npm install gulp-rename --save-dev
```
[sourceMap](https://www.npmjs.com/package/gulp-sourcemaps)
```
npm install gulp-sourcemaps --save-dev
```
[uglify](https://www.npmjs.com/package/gulp-uglify)
```
npm install gulp-uglify --save-dev
```
[Sass](https://www.npmjs.com/package/gulp-sass)
```
npm install gulp-sass --save-dev
```
[browserSync](https://www.npmjs.com/package/browser-sync)
```
npm install browser-sync --save-dev
```
[plumber](https://www.npmjs.com/package/gulp-plumber)
```
npm install gulp-plumber --save-dev
```
[del](https://www.npmjs.com/package/del)
```
npm install del --save-dev
```
