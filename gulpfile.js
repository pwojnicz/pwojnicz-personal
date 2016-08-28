// ----------------------------------------------------------------------------
// 1. CONFIG
// ----------------------------------------------------------------------------

// set app paths
var path_base = './'
var paths = {
  src: {
    css: path_base + 'src/sass/',
    js: path_base + 'src/js/',
    img: path_base + 'assets/img/',
    pug: path_base + 'src/pug/'
  },

  dest: {
    css: path_base + 'assets/css/',
    js: path_base + 'assets/js/',
    img: path_base + 'assets/img/',
    pug: path_base
  }
};

// require gulp + plugins magic
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var browserSync = require('browser-sync').create();


// ----------------------------------------------------------------------------
// 2. DEFAULT TASKS
// ----------------------------------------------------------------------------

// browserSync static server
gulp.task('sync', function() {
  browserSync.init({
    open: false, server: { baseDir: path_base }
  });
});

// compile main Sass file
gulp.task('styles', function() {
  gulp.src(paths.src.css + 'main.+(sass|scss)')
    .pipe(plugins.sass({ outputStyle: 'compressed' })
    .on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename({ suffix:'.min' }))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});

// minify and concat js files
gulp.task('scripts', function(){
  return gulp.src(paths.src.js + '**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.dest.js));
});

// compile templates to HTML
gulp.task('templates', function buildHTML() {
  return gulp.src(['!' + paths.src.pug + '_mixin.pug', paths.src.pug + '**/*.pug'])
  .pipe(plugins.plumber())
  .pipe(plugins.pug({ pretty: true }))
  .pipe(gulp.dest(paths.dest.pug))
});

// watch task
gulp.task('watch', function() {
  gulp.watch(paths.src.css + '**/*.+(scss|sass|css)', ['styles']);
  gulp.watch(paths.src.pug + '**/*.pug', ['templates']);
  gulp.watch(paths.src.js + '**/*.js', ['scripts'])
    .on('change', browserSync.reload);
  gulp.watch(path_base + '**/*.+(html|php)')
    .on('change', browserSync.reload);
});

// just default task
gulp.task('default', ['sync', 'styles', 'scripts', 'watch']);


// ----------------------------------------------------------------------------
// 3. MORE TASKS
// ----------------------------------------------------------------------------

// minify images
gulp.task('images', function(){
  return gulp.src(paths.src.img + '**/*.+(png|jpg|gif|svg)')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.dest.img))
});
