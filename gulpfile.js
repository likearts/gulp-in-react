const 
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'), 
    minifycss = require('gulp-minify-css'), 
    uglify = require('gulp-uglify'), 
    useref = require('gulp-useref'),
    path = require('path'),
    { readDirDeep, readDirDeepSync } = require('read-dir-deep');

var html = {
  source: 'src',
  sub: 'react/sub-project/build',
  target: 'dist',
  subTarget: 'dist/sub'
}

var css = {
  source: 'src/css',
  sub: 'react/sub-project/build/static/css',
  target: 'dist/css',
  subTarget: 'dist/sub/static/css'
};

var js = {
  source: 'src/js',
  sub: 'react/sub-project/build/static/js',
  target: 'dist/js',
  subTarget: 'dist/sub/static/js'
};

var sub = {
  root: 'sub',
  source: 'react/sub-project/build/**',
  target: 'dist/sub'
};

gulp.task('html', function() {
  gulp.src([
    html.source + '/*.html'
  ])
  .pipe(useref({noAssets: true}))
  .pipe(gulp.dest(html.target));
});

gulp.task('css', function() {
  gulp.src([
    css.source + '/*.css'
  ])
  .pipe(minifycss())
  .pipe(concat('all.min.css'))
  .pipe(gulp.dest(css.target));
});

gulp.task('js', function() {
  gulp.src([
    js.source + '/*.js'
  ])
  .pipe(uglify({mangle:true}).on('error', gutil.log))
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest(js.target));
});

gulp.task('sub', function() {
  gulp.src([
    sub.source + '/*.*',
  ])
  .pipe(gulp.dest(sub.target));
});

gulp.task('default', ['html', 'css', 'js', 'sub']);

gulp.task('watch', function() {
  gulp.watch(html.source + '/*.html', ['html']);
  gulp.watch(css.source + '/*.css', ['css']);
  gulp.watch(js.source + '/*.js', ['js']);
  gulp.watch(html.sub + '/*.html', ['subHtml']);
  gulp.watch(css.sub + '/*.css', ['subCss']);
  gulp.watch(js.sub + '/*.js', ['subJs']);
});
