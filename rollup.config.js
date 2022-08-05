const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const terser = require('rollup-plugin-terser').terser;
const peggy = require('rollup-plugin-peggy');
const copy = require('rollup-plugin-copy');
const scss = require('rollup-plugin-scss');

module.exports = {
  input: 'app/scripts/index.js',
  output: {
    file: 'public/scripts/index.js'
  },
  plugins: [
    copy({
      targets: [
        { src: 'app/assets/*', dest: 'public/' }
      ]
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    scss(),
    commonjs(),
    json(),
    peggy({ cache: true }),
    process.env.NODE_ENV === 'production' ? terser() : null
  ]
};
