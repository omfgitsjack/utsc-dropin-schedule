(function () {
    "use strict";

    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    var ngAnnotate = require('gulp-ng-annotate');

    var baseFolderRoutes = 'public/app/**';

    var folders =
        [
            baseFolderRoutes+'/*.module.js',
            baseFolderRoutes+'/*.config.js',
            baseFolderRoutes+'/*.constant.js',
            baseFolderRoutes+'/*.controller.js',
            baseFolderRoutes+'/*.factory.js',
            baseFolderRoutes+'/*.provider.js'
        ];

    gulp.task('js', function () {
        gulp.src(folders)
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/app/'))
    });

    gulp.task('watch', ['js'], function () {
        gulp.watch('public/app/**/*.js', ['js'])
    });
})();