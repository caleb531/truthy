import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import peggy from 'rollup-plugin-peggy';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

export default {
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
