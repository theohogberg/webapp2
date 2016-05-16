var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var runsequence = require('run-sequence');

gulp.task('babel', function () {
	return gulp.src('public/src/*')
	.pipe(babel())
	.pipe(gulp.dest('public/dist'));
});

gulp.task('webpack', function() {
	return gulp.src('public/dist/app-frontend.js')
	.pipe(webpack({
		output: {
			filename: 'app-frontend.bundle.js'
		}	
	}))
	.pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function(){
	watch('public/src/**/*.jsx', function(){
		runsequence('babel', 'webpack');
	});    
});

gulp.task('default', function(){
	runsequence('babel', 'webpack');
});