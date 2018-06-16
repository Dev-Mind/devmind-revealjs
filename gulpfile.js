'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
const convertToHtml = require('./convert-to-html');

gulp.task('convert', () =>
  gulp.src('src/**/*.adoc')
    .pipe(convertToHtml())
);

gulp.task('dependencies', () =>
  gulp.src('node_modules/reveal.js/{css,js,lib,plugin}/**/*.*')
    .pipe(gulp.dest('build/dist/node_modules/reveal.js'))
);

gulp.task('copy-html', () =>
  gulp.src('src/**/*.html')
    .pipe($.tap((file, cb) => {
      const newFile = file.contents.toString();
      const newContents = newFile.replace('</body>', '<script src="js/custom.js"></script>');
      file.contents = new Buffer(newContents);
      return file;
    }))
    .pipe(gulp.dest('build/dist'))
);

gulp.task('copy-images', () =>
  gulp.src('src/**/*.{svg,png,jpg}')
    .pipe(gulp.dest('build/dist'))
);

gulp.task('copy-css', () =>
  gulp.src('src/**/*.css')
    .pipe(gulp.dest('build/dist'))
);

gulp.task('copy-js', () =>
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('build/dist'))
);

gulp.task('serveAndWatch', () => {
  browserSync.init({
    server: {
      baseDir: "./build/dist/"
    },
    notify: false,
    port: 3000
  });

  gulp.watch('src/**/*', () => $.sequence('convert', 'copy-html', 'copy-css','copy-js', browserSync.reload));
});


gulp.task('clean', () => del('build', {dot: true}));


// Build production files, the default task
// Before a delivery we need to launch blog-firebase to update the pages on database
gulp.task('default', cb =>
  $.sequence(
    'clean',
    'convert',
    'dependencies',
    'copy-html',
    'copy-css',
    'copy-js',
    'copy-images',
    cb
  )
);

// Build dev files
gulp.task('serve', cb =>
  $.sequence(
    'default',
    'serveAndWatch',
    cb
  )
);
