(function () {
  'use strict';

  module.exports = {
    'styles': {
      'src': 'src/styles/app.scss',
      'dest': 'dist/styles/',
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
        'dist/styles/*',
        'dist/*.html'
      ]
    },
    'images': {
      'src': 'src/images/**/*',
      'dest': 'dist/images'
    },
    'html': {
      'src': './src/*.html',
      'dest': './dist/'
    }
  }
})();