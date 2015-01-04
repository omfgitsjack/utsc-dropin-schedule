(function () {
    "use strict";

    var gulp = require('gulp');
    // All paths to files are defined in gulp.config.json
    var paths = require('./gulp.config.json');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var ngAnnotate = require('gulp-ng-annotate');
    var less = require('gulp-less');
    var gutil = require('gulp-util');
    var autoprefixer = require('gulp-autoprefixer');
    var minifyCss = require('gulp-minify-css');
    var bytediff = require('gulp-bytediff');

    var baseFolderRoutes = 'public/app/**';
    var lessRoutes = 'public/css/jp-styling/main.less';

    var folders =
        [
            baseFolderRoutes+'/*.module.js',
            baseFolderRoutes+'/*.config.js',
            baseFolderRoutes+'/*.constant.js',
            baseFolderRoutes+'/*.controller.js',
            baseFolderRoutes+'/*.factory.js',
            baseFolderRoutes+'/*.directive.js',
            baseFolderRoutes+'/*.provider.js'
        ];

    gulp.task('prod', ['js-prod', 'less-prod', 'vendorjs-prod']);

    gulp.task('js-prod', function () {
        gulp.src(folders)
            .pipe(concat('app.js'))
            .pipe(bytediff.start())
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(bytediff.stop())
            .pipe(gulp.dest('./public/build/'))
    });

    gulp.task('less-prod', function() {
        gulp.src(lessRoutes)
            .pipe(bytediff.start())
            .pipe(less()).on('error', gutil.log)
            .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
            .pipe(minifyCss())
            .pipe(bytediff.stop())
            .pipe(gulp.dest('./public/build/'))
    });

    gulp.task('vendorjs-prod', function() {
        gulp.src(paths.vendorjs)
            .pipe(concat('vendor.min.js'))
            .pipe(bytediff.start())
            .pipe(uglify())
            .pipe(bytediff.stop())
            .pipe(gulp.dest('./public/build'));
    });

    gulp.task('js', function () {
        gulp.src(folders)
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            //.pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/build/'))
    });

    gulp.task('less', function() {
        gulp.src(lessRoutes)
            .pipe(sourcemaps.init())
            .pipe(less()).on('error', gutil.log)
            .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/build/'))
    });

    gulp.task('vendorjs', function() {
        gulp.src(paths.vendorjs)
            .pipe(concat('vendor.min.js'))
            .pipe(bytediff.start())
            //.pipe(uglify())
            .pipe(bytediff.stop())
            .pipe(gulp.dest('./public/build'));
    });


    // WATCHERS
    gulp.task('watch', ['watch-js', 'watch-less'], function() {
    });

    gulp.task('watch-js', ['js'], function () {
        gulp.watch('public/app/**/*.js', ['js']);
    });

    gulp.task('watch-less', ['less'], function () {
        gulp.watch('public/css/**/*.less', ['less']);
    });
})();