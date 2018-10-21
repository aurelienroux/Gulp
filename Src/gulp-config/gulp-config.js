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
    }
  }
})();