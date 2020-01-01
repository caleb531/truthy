const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const terser = require('rollup-plugin-terser').terser;
const pegjs = require('rollup-plugin-pegjs');
const baseConfig = require('./rollup.config.base.js');

module.exports = Object.assign({}, baseConfig, {
  input: 'app/scripts/index.js',
  output: Object.assign({}, baseConfig.output, {
    file: 'public/scripts/index.js'
  }),
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    pegjs({ cache: true }),
    process.env.NODE_ENV === 'production' ? terser() : null
  ]
});
