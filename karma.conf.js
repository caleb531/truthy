/* eslint-env node */

'use strict';

module.exports = function (config) {
  config.set({
    basePath: 'public',
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    files: ['scripts/modules.js', 'scripts/test.js'],
    reporters: ['coverage'],
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-chrome-launcher'
    ],
    preprocessors: {
      '**/*.js': ['sourcemap', 'coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: '../coverage/'
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
