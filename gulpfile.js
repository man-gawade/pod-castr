var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer');

/**
 * Launch the Server
*/
gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    // Using a localhost address with a port
    proxy: "http://localhost/pod-castr/"
  });
  gulp.watch(['scss/**/*.scss'], function(){
    setTimeout(function () {
        gulp.start('sass');
    }, 300);
  });
  gulp.watch('js/**/*.js', function(){
    setTimeout(function () {
        gulp.start('reload');
    }, 300);
  });
});

/**
 * @task sass
 * Compile files from scss
*/
gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

/**
 * @task reload
 * Refresh the page after clearing cache
*/
gulp.task('reload', function () {
  browserSync.reload();
});

/**
 * Default task, running just `gulp` will
 * compile Sass files, launch Browsersync & watch files.
*/
gulp.task('default', ['browser-sync']);