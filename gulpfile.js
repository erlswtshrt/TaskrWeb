var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

var path = {
	//internal
	App: './www'
};

gulp.task('build', ['jsx'], function() {
		return gulp.src('./react_components/js/Master.js')
			.pipe(browserify())
			.pipe(gulp.dest(path.App))
});

gulp.task('clean', function() {
	return gulp.src(['./react_components/js/*', './react_components/js/**/*.jsx'])
		.pipe(rimraf());
});

gulp.task('dev', ['build'], function() {
	var app = require('./app.js');
});

gulp.task('jsx', function() {
	return gulp.src(['./react_components/jsx/**/*.jsx', './react_components/jsx/*.jsx'])
		.pipe(react())
		.pipe(rename(function(path) {
			path.extname = ".js";
		}))
		.pipe(gulp.dest('./react_components/js'))
});