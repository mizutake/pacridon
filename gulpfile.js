const gulp = require('gulp');
const express = require('gulp-express');
const webpack = require('webpack-stream');

gulp.task('webpack', function(){
  return gulp.src('frontend/index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('public/'))
});

gulp.task('sever', function() {
  express.run(['src/index.js']);

  gulp.watch(['frontend/**/*.js'], ['webpack']);
  gulp.watch(['src/**/*.js'], [express.run]);
})