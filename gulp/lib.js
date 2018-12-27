const imgEntry = ['./src/scripts/libs/*.js', './src/static/libs/*.css']

module.exports = {
  handler: gulp => {
    return () => {
      return gulp.src(imgEntry, {base: './src'})
        .pipe(gulp.dest('./dist/'))
    }
  },
  entry: imgEntry
}
