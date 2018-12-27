const mini=require('gulp-imagemin')
const imgEntry=['./src/static/imgs/*.jpg','./src/static/imgs/*.png','./src/static/imgs/*.gif'];

module.exports={
    handler:gulp=>{
        return ()=>{
            return gulp.src(imgEntry,{base:'./src'})
            .pipe(mini({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(gulp.dest('./dist/'))
        }
    },
    entry:imgEntry
}