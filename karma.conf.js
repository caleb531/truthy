/* eslint-env node */

module.exports = function (config) {
  config.set({
    basePath: 'public',
    browsers: ['ChromeHeadlessCustom'],
    files: [
      'styles/index.css',
      'scripts/mithril.min.js',
      'scripts/underscore-min.js',
      'scripts/fastclick.js',
      'scripts/test.js'
    ],
    proxies: {
      '/base/icons/': '/icons/'
    },
    reporters: ['dots'].concat(process.env.COVERAGE ? ['coverage'] : []),
    frameworks: ['mocha', 'chai-dom', 'sinon-chai'],
    middleware: ['static'],
    preprocessors: {
      '**/*.js': ['sourcemap'],
      'scripts/test.js': process.env.COVERAGE ? ['coverage'] : []
    },
    coverageReporter: {
      type: 'json',
      dir: '../coverage/',
      subdir: '.',
      file: 'coverage-unmapped.json'
    },
    static: {
      path: 'public'
    },
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
  });
};
