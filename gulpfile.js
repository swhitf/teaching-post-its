var gulp = require('gulp');
var connect = require('gulp-connect');
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require("tsify");
var watchify = require('watchify');

/**
 * Packs the application static resources.
 */
gulp.task('artifacts', function() {

    var res = gulp.src('res/**/*')
        .pipe(gulp.dest('dist'));

    return merge(res)
        .pipe(connect.reload());
});

gulp.task('js', function() {

    var cfg = {
        entries: [
            'src/main.ts'
        ],
        debug: true,
        cache: {},
        packageCache: {},
        plugin: [watchify, tsify]
    };

    var b = browserify(cfg);
    var flush = function() {
        b.bundle()
        .pipe(source('code.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    };
        
    b.on('error', function (error) { console.error(error.toString()); })
    b.on('update', flush);    
    flush();

});

/**
 * Watches for various file changes
 */
gulp.task('watch', function() {
    gulp.watch(['res/**/*'], function() {
        setTimeout(function() { gulp.start('make'); }, 200);
    });
});

/**
 * Serve the application.
 */
gulp.task('serve', ['make', 'watch'], function() {
    connect.server({
        port: 3000,
        root: 'dist',
        fallback: 'dist/index.html',
        livereload: true
    });
});

gulp.task('make', ['js', 'artifacts']);
gulp.task('default', ['serve']);