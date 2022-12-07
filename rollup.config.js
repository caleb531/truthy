import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import watchGlobs from 'rollup-plugin-watch-globs';
import peggy from 'rollup-plugin-peggy';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'dist/scripts/index.js',
    sourcemap: true,
    format: 'iife',
    exports: 'auto'
  },
  plugins: [
    watchGlobs(['src/styles/*.*', 'public/**/*.*']),
    copy({
      targets: [
        { src: 'public/*', dest: 'dist/' }
      ]
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    scss({
      sourceMap: true,
      output: 'dist/styles/index.css',
      outputStyle: 'compressed'
    }),
    commonjs(),
    json(),
    peggy({ cache: true }),
    process.env.NODE_ENV === 'production' ? terser() : null,
    process.env.SERVE_APP ? serve({
      contentBase: 'dist',
      port: 8080
    }) : null
  ]
};
