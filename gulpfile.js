var gulp = require('gulp');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var react = require('gulp-react');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var gutil = require("gulp-util");
var webpack = require('webpack');

var paths = {
  	scripts: ['src/**/*.js'],
  	less: ['src/**/*.less']
};


gulp.task('less', function () {
  	return gulp.src(paths.less)
      	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(callback) {

    // run webpack
    webpack({
        watch: true,
        errorDetails: true,
        entry: {
            gameview : './src/index.js'
        },
        output: {
            path: './dist/',
            filename: "[name].bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /\.less$/, loader: "style!less" },
                { test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] }
            ]
        }
    }, function(err, stats) {
        console.error(err);
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
  	gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.less, ['less']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'less']);

gulp.task('deploy', ['scripts', 'less']);