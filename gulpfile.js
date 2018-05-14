'use strict';

//Dependencies required
const gulp = require('gulp');
//HTML
const htmlclean = require('gulp-htmlclean');
//IMAGES
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const image = require('gulp-image');
//CSS & JS
const autoprefix = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
const sourceMap = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pump = require('pump');
// Sass
const sass = require('gulp-sass');
//MISC
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const del = require('del');

// html optimization
gulp.task('html', ['images'], function () {
    return gulp.src('./src/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

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

// check if js tasks has errors
gulp.task('checkScripts', function (cb) {
    pump([
            gulp.src('scripts/*.js'),
            uglify(),
            gulp.dest('dist/pump')
        ],
        cb
    );
});

// test in case of minification and name changing
// gulp.task('minifyScripts', function () {
//     return gulp.src('dist/scripts/app.js')
//         .pipe(sourceMap.init())
//             .pipe(uglify())
//             .pipe(rename('app.min.js'))
//         .pipe(sourceMap.write())
//         .pipe(gulp.dest('dist/scripts/'))
// })

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

//browserSync reload for CSS/Sass changes
gulp.task('browserSync', function () {
    return browserSync.init({
        server: {
            baseDir: 'dist/'
        },
    })
});

gulp.task('clean', function () {
    return del([
        'dist/images/*',
        'dist/scripts/*',
        'dist/stylesCSS/*',
        'dist/stylesSass/*',
        'dist/*.html'
    ]);
})

gulp.task('watchFiles', function () {
    gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
    gulp.watch('src/stylesSass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/*.html', ['html']);
})

// Gulp defaut tasks
gulp.task('default', ['html', 'images', 'scripts', 'stylesCSS', 'sass', 'browserSync'], function () {
    console.log("Default gulp task *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
    gulp.watch('src/stylesCSS/*.css', ['stylesCSS']);
    gulp.watch('src/stylesSass/**/*.scss', ['sass']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/*.html', ['html']);
});