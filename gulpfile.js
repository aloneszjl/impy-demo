const gulp = require('gulp');
const del = require('del');
const prettyData = require('gulp-pretty-data');
const autoprefixer = require('gulp-autoprefixer');

const destDir = './build';
const sourceDir = './dist';

function cleanDist(done) {
  del([destDir]).then(() => done());
}

gulp.task('clean', cleanDist);

gulp.task('cssfixer', ['clean'], () =>
  gulp
    .src(`${sourceDir}/**/*.wxss`)
    .pipe(
      autoprefixer({
        browsers: ['last 11 iOS versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest(sourceDir))
);

gulp.task('minify', ['cssfixer'], () => {
  gulp
    .src(`${sourceDir}/**/*.{wxml,json,wxss,svg,js}`)
    .pipe(
      prettyData({
        type: 'minify',
        preserveComments: true,
        extensions: {
          wxss: 'css',
          wxml: 'xml',
          svg: 'xml'
        }
      })
    )
    .pipe(gulp.dest(destDir));
});

gulp.task('default', ['minify']);
