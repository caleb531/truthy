import path from 'path';
import glob from 'glob';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import peggy from 'rollup-plugin-peggy';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';

// Watch additional files outside of the module graph (e.g. SCSS or static
// assets); see <https://github.com/rollup/rollup/issues/3414>
function watcher(globs) {
  return {
    buildStart() {
      for (const item of globs) {
        glob.sync(path.resolve(__dirname, item)).forEach((filename) => {
          this.addWatchFile(filename);
        });
      }
    }
  };
}

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
    exports: 'auto'
  },
  plugins: [
    watcher(['src/styles/*.*', 'public/**/*.*']),
    copy({
      targets: [
        { src: 'public/*', dest: 'dist/' }
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
    process.env.NODE_ENV === 'production' ? terser() : null,
    process.env.SERVE_APP ? serve({
      contentBase: 'dist',
      port: 8080
    }) : null
  ]
};
