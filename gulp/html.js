const compressHtm = require('gulp-htmlmin')
const entry = ['./src/pages/*.html', './src/pages/*/*.html', './src/pages/*/*/*.html']

module.exports = {
  handler: gulp => {
    return () => {
      return gulp.src(entry,{base:'./src'})
        .pipe(compressHtm({
          removeComments: true, // 清除HTML注释
          collapseWhitespace: true, // 压缩HTML
          //collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
          //removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
          removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
          removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
          minifyJS: true, // 压缩页面JS
          minifyCSS: true // 压缩页面CSS
        }))
        .pipe(gulp.dest('dist'))
    }
  },
entry}
