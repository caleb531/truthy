const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const terser = require('gulp-terser');
const noop = require('gulp-noop');
const rollup = require('rollup');
const rollupAppConfig = require('./rollup.config.app.js');
const rollupTestConfig = require('./rollup.config.test.js');
const connect = require('gulp-connect');

gulp.task('assets:core', () => {
  return gulp.src([
      'app/assets/**/*'
    ])
    .pipe(gulp.dest('public'));
});
gulp.task('assets:server', () => {
  return gulp.src([
      'app/server/**/*'
    ])
    .pipe(gulp.dest('public/server'));
});
gulp.task('assets:js', () => {
  return gulp.src([
      'node_modules/mithril/mithril.min.js',
      'node_modules/underscore/underscore-min.js'
    ])
    .pipe(gulp.dest('public/scripts'));
});
gulp.task('assets', gulp.parallel(
  'assets:core',
  'assets:server',
  'assets:js'
));
gulp.task('assets:watch', () => {
  return gulp.watch('app/assets/**/*', gulp.series('assets:core'));
});

gulp.task('sass', () => {
  return gulp.src('app/styles/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'));
});
gulp.task('sass:watch', () => {
  return gulp.watch('app/styles/**/*.scss', gulp.series('sass'));
});

gulp.task('rollup:app', () => {
  return rollup.rollup(rollupAppConfig).then((bundle) => {
    return bundle.write(rollupAppConfig.output);
  });
});
gulp.task('rollup:test', () => {
  return rollup.rollup(rollupTestConfig).then((bundle) => {
    return bundle.write(rollupTestConfig.output);
  });
});
gulp.task('rollup:watch', () => {
  return gulp.watch(
    ['app/scripts/**/*.js', 'app/scripts/**/*.pegjs', 'test/**/*.js'],
    gulp.series('rollup')
  );
});
gulp.task('rollup', gulp.parallel(
  'rollup:app',
  'rollup:test'
));

gulp.task('uglify', () => {
  return gulp.src([
      'node_modules/fastclick/lib/fastclick.js'
    ])
    .pipe(process.env.NODE_ENV === 'production' ? terser() : noop())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('build', gulp.series(
  gulp.parallel(
    'assets',
    'uglify',
    'sass',
    'rollup'
  )
));
gulp.task('watch', gulp.parallel(
  'assets:watch',
  'sass:watch',
  'rollup:watch'
));
gulp.task('build:watch', gulp.series(
  'build',
  'watch'
));

gulp.task('connect', () => {
  connect.server({
    root: 'public'
  });
});
gulp.task('serve', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'connect'
  )
));
