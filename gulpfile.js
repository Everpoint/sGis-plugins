const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['build'], () => {
});

gulp.task('build', () => {
    return gulp.src(['./source/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/'));
});
