var gulp = require('gulp');
var minify = require('gulp-minify');
var strip = require('gulp-strip-comments');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');


gulp.task('copy-leaflet-images', function () {
    gulp.src('node_modules/leaflet/dist/images/*')
        .pipe(gulp.dest('static/dist/images'))
});


gulp.task('copy-fonts', function () {
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('static/fonts'))
});


gulp.task('compress-css', function () {
    gulp.src([
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/leaflet/dist/leaflet.css',
            'node_modules/leaflet-geonames/L.Control.Geonames.css',
            'node_modules/leaflet-zoombox/L.Control.ZoomBox.css',
            'node_modules/leaflet-basemaps/L.Control.Basemaps.css',
            'static/src/d3-ui.css',
            'static/src/core.css',
            'static/src/main.css'
        ])
        .pipe(cleanCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('static/dist'))
});


gulp.task('compress-js', function () {
    gulp.src([
        'static/src/utils.js',
        'static/src/d3-ui.js',
        'static/src/main.js'
    ])
        .pipe(concat('core.js'))
        .pipe(minify())
        .pipe(gulp.dest('build'))
});


gulp.task('concat-js', ['compress-js'], function () {
    gulp.src([
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/leaflet-omnivore/leaflet-omnivore.min.js',
        'node_modules/leaflet-geonames/L.Control.Geonames.min.js',
        'node_modules/leaflet-zoombox/L.Control.ZoomBox.min.js',
        'node_modules/leaflet-basemaps/L.Control.Basemaps-min.js',
        'node_modules/d3/d3.min.js',
        'node_modules/lodash/lodash.min.js',
        'build/core-min.js'
    ])
        .pipe(strip())
        .pipe(concat('all.min.js'))

        .pipe(gulp.dest('static/dist'))
});


gulp.task('build', ['copy-leaflet-images', 'copy-fonts', 'concat-js', 'compress-css'], function () {});


gulp.task('watch', function () {
    gulp.watch('static/src/*.css', ['compress-css']);
    gulp.watch('static/src/*.js', ['concat-js']);
});


gulp.task('default', ['build', 'watch']);


