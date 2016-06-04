// var gulp = require('gulp');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');
//
// gulp.task('default', function () {
//   return browserify('./source/app.js')
//     .transform(babelify)
//     .bundle()
//     .pipe(source('snapterest.js'))
//     .pipe(gulp.dest('./build/'));
// });


const   gulp        = require('gulp'),
        gutil       = require('gulp-util'),
        react       = require('gulp-react'),
        clean       = require('gulp-clean'),
        sass        = require('gulp-sass'),
        sourcemaps  = require('gulp-sourcemaps'),
        rename      = require('gulp-rename'),
        plumber     = require('gulp-plumber'),
        webpack     = require('webpack-stream'),
        browserSync = require('browser-sync'),
        runSequence = require('run-sequence'),

        baseDir = 'app',
        dirs  = {
            html : baseDir,
            scss : baseDir + '/scss',
            css  : baseDir + '/css',
            js   : baseDir + '/js',
            jsx  : baseDir + '/jsx'
        },
        files = {
            html : dirs.html + '/**/*.html',
            scss : dirs.scss + '/*.scss',
            css  : dirs.css  + '/**/*.css',
            js   : dirs.js   + '/**/*.js',
            jsx  : dirs.jsx  + '/**/*.jsx'
        };

gulp
.task('style', () =>
    gulp.src(files.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dirs.css))
)


.task('jsClean', () =>
    gulp.src(files.js, {read: false})
    .pipe(clean())
)
.task('reactify', () =>
    gulp.src(files.jsx)
    .pipe(react())
    .pipe(gulp.dest(dirs.js))
)
.task('packJs', () =>
    gulp.src(dirs.js + '/app.js')
    .pipe(webpack(
		require('./webpack.config.js'),
		null,
		(err, stats) => {
			console.log(err, stats);
		}
    ))
    .pipe(gulp.dest(dirs.js))
)
.task('browserSync', ()=> {
	browserSync({
		server: {
			baseDir,
			routes: {
                "/node_modules": "node_modules"
			}
		},
        port: 3000,
        ui: {
            port: 3010
        }
	});
})
.task('watch', () => {
    gulp.watch(dirs.scss + '/**/*.scss', ['style']);
    gulp.watch(files.jsx, _=>{ runSequence('reactify', 'packJs'); });
    gulp.watch(dirs.js + '/main.js', ['packJs']);
	gulp.watch(files.html, browserSync.reload);
    gulp.watch(files.css, browserSync.reload);
	gulp.watch(dirs.js + '/bundle.js', browserSync.reload);
})

.task('default', (callback) => {
	runSequence('jsClean',['style', 'reactify'], 'packJs', ['browserSync', 'watch'], callback);
});
