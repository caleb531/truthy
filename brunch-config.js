// Brunch configuration
// See http://brunch.io for documentation.
'use strict';

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'scripts/main.js': ['app/scripts/**/*.pegjs', 'app/scripts/**/*.js', /^node_modules/]
      }
    },
    stylesheets: {
      joinTo: {
        'styles/main.css': ['app/styles/main.scss']
      }
    }
  },
  modules: {
    autoRequire: {
      'scripts/main.js': ['scripts/main']
    }
  },
  paths: {
    // Exclude test files from compilation
    watched: ['app']
  },
  plugins: {
    pegjs: {
      // Cache internal parser results to avoid exponential parsing time in some
      // edge cases (e.g. expressions with unclosed parens, a case which is
      // actually quite common since expressions are evaluated as the user types
      // within the app)
      cache: true,
      // Expose parser functions via module.exports, allowing the parser module
      // to be require'd by other modules
      format: 'commonjs'
    },
    postcss: {
      processors: [
        require('autoprefixer')({
          browsers: ['> 0.1%']
        })
      ]
    }
  }
};
