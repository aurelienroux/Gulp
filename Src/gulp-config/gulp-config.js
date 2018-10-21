(function () {
  'use strict';

  module.exports = {
    'style': {
      'src': 'src/StylesSass/app.scss',
      'dest': 'dist/stylesSass/',
      'sass': {
        outputStyle: 'compressed'
      },
      'autoprefixer': {
        'grid': 'true',
        'versions': 'last 2 versions'
      }
    },
    'scripts': {
      'src': [
        'src/scripts/log.js',
        'src/scripts/alert.js'
      ],
      'fileName': 'app.js',
      'dest': 'dist/scripts/'
    },
    'clean': {
      'paths': [
        'dist/images/*',
        'dist/scripts/*',
        'dist/stylesCSS/*',
        'dist/stylesSass/*',
        'dist/*.html'
      ]
    }
  }
})();