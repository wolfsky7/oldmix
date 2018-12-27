var DefinePlugin = require('webpack/lib/DefinePlugin')
var rename = require('gulp-rename')
var md5 = require('easy-gulp-md5-plus')
const html = require('./html')
const webpack = require('webpack-stream')
const named = require('vinyl-named')

const webpackConfig = {
  mode: process.env.NODE_ENV,
  // devtool: 'source-map',
  externals: {
    'jquery': 'window.jQuery'
  },
  // output: {
  //   filename: '[name].js' // Template based on keys in entry above
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions']
                }
              }]
            ]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [new DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }

  // You can set this to JSON.stringify('development') for your
  // development target to force NODE_ENV to development mode
  // no matter what
  })]
}

const entry = ['./src/scripts/pages/*.js']

module.exports = {
  entry,
  handler: gulp => {
    return () => {
      return gulp.src(entry, {base: './src'})
        .pipe(named())
        .pipe(webpack({config: webpackConfig}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(md5(10, html.entry))
        .pipe(gulp.dest('dist/scripts/pages'))
    }
  }
}
