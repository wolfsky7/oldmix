const gulp = require('gulp')
const connect = require('gulp-connect')
const del = require('del')
const html = require('./gulp/html')

const tasks = {
  html: html,
  css: require('./gulp/css'),
  js: require('./gulp/js'),
  lib: require('./gulp/lib'),
  img: require('./gulp/img')
}

gulp.task('clean', (cb) => {
  del('./dist/*').then(() => {
    console.log('clean')
    cb()
  })
})

gulp.task('server', (cb) => {
  connect.server({
    root: './dist',
    livereload: true
  })

  cb()
})
gulp.task('reload', (cb) => {
  connect.reload()
  cb()
})

Object.keys(tasks).forEach(key => {
  gulp.task(key, tasks[key].handler(gulp))
})

gulp.task('watch', (cb) => {
  Object.keys(tasks).forEach(key => {
    gulp.watch(tasks[key].entry, gulp.series(key, 'html', 'reload'))
  })

  cb()
})

gulp.task('default', gulp.series('clean', gulp.parallel('css', 'img', 'js', 'lib'), 'html', 'server', 'watch'))
// gulp.task('default',gulp.series('clean'))
// exports.default = gulp.series('clean', 'img', 'css', 'lib', 'js', 'html')
