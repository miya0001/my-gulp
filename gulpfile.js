const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const csso = require('gulp-csso');

gulp.task('js', gulp.series(() => {
	return gulp.src(["src/*.js"])
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
}));

gulp.task('sass', gulp.series(() => {
	return gulp.src('./src/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src'));
}));

gulp.task('css', gulp.series(gulp.parallel('sass'), () => {
	return gulp.src(["src/*.css"])
		.pipe(concat('style.min.css'))
		.pipe(minifyCSS())
		.pipe(csso())
		.pipe(gulp.dest('./css'));
}));

gulp.task('default', gulp.series(gulp.parallel('js', 'css')));
