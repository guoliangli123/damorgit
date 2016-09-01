// 载入外挂
var gulp = require('gulp'),  
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');


// gulp.task('sass', function () {
//  return gulp.src('./src/styles/*.scss')
//    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//    .pipe(gulp.dest('./dist/styles'));
// });

gulp.task('sass', function () {
 return gulp.src('./src/styles/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
   .pipe(gulp.dest('./dist/styles'))
    .pipe(livereload());
});

// 脚本
gulp.task('scripts', function() {  
  return gulp.src('./src/scripts/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});

// 图片
gulp.task('images', function() {  
  return gulp.src('./src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(livereload());
});

// 清理
// gulp.task('clean', function() {  
//   return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
//     .pipe(clean());
// });

// 预设任务
gulp.task('default',function() {  
    gulp.start('sass', 'scripts', 'images');
});

// 看手
gulp.task('watch', function() {

  livereload.listen();

  // 看守所有.scss档
  gulp.watch('./src/styles/*.scss', ['sass']);

  // 看守所有.js档
  gulp.watch('./src/scripts/*.js', ['scripts']);

  // 看守所有图片档
  gulp.watch('./src/images/*', ['images']);
  
  // // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['./dist/**/*.*','./*.html']).on('change', function(file) {
    livereload.changed(file.path);
    //livereload.reload({file:'user.html'});
  });


});