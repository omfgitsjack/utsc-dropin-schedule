(function () {
    "use strict";

    // NPM Dependencies
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
    var minimist = require('minimist');
    var gulpif = require('gulp-if');
    var argv = require('yargs').argv;

    // Command line arguments
    var taskConstants = {
        "prod": argv.prod,
        "dev": argv.dev
    };

    var lessRoutes = 'public/css/jp-styling/main.less';

    gulp.task('build', ['js', 'less', 'vendorjs']);

    gulp.task('js', function () {
        gulp.src(paths.js)
            .pipe(gulpif(taskConstants.dev, sourcemaps.init()))
            .pipe(concat('app.js'))
            .pipe(bytediff.start())
            .pipe(ngAnnotate())
            .pipe(gulpif(taskConstants.prod, uglify()))
            .pipe(bytediff.stop())
            .pipe(gulpif(taskConstants.dev, sourcemaps.write()))
            .pipe(gulp.dest(paths.build.folder))
    });

    gulp.task('less', function() {
        gulp.src(paths.less)
            .pipe(bytediff.start())
            .pipe(less()).on('error', gutil.log)
            .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
            .pipe(gulpif(taskConstants.prod, minifyCss()))
            .pipe(bytediff.stop())
            .pipe(concat(paths.build.files.css))
            .pipe(gulp.dest(paths.build.folder))
    });

    gulp.task('vendorjs', function() {
        gulp.src(paths.vendorjs)
            .pipe(concat(paths.build.files.vendorjs))
            .pipe(bytediff.start())
            .pipe(gulpif(taskConstants.prod, uglify()))
            .pipe(bytediff.stop())
            .pipe(gulp.dest(paths.build.folder));
    });

    // WATCHERS
    gulp.task('watch', [], function() {
        gulp.watch('public/app/**/*.js', ['js']);
        gulp.watch('public/css/**/*.less', ['less']);
        gulp.watch('gulp.config.json', ['vendorjs']);
    });

})();