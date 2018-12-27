const less = require('gulp-less')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cleanCSS = require('gulp-clean-css');
var cssnano = require('cssnano')
var rename=require('gulp-rename')
var md5 = require('easy-gulp-md5-plus');
// var rev=require('gulp-rev')
var base64=require('gulp-base64')
const entry = ['./src/static/*.less']

const html=require('./html')

module.exports = {
  handler: gulp => {
    return () => {
      return gulp.src(entry,{base:'./src'})
        .pipe(less({
        }))
        .pipe(cleanCSS())
        .pipe(base64({
          baseDir: './src/static/',
          extensions: ['svg', 'png', /\.jpg#datauri$/i],
          // exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
          maxImageSize: 8*1024, // bytes
          debug: true
      }))
        .pipe(postcss([
          autoprefixer({browsers: ['last 1 version']}),
          cssnano()
        ]))
        .pipe(concat('/static/index.css'))
        .pipe(rename({ suffix: '.min' }))   //rename
        .pipe(md5(10,html.entry))
        .pipe(gulp.dest('dist'))
    }
  },
entry}
