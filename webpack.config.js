const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name].css')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    index: 'index',
    about: 'about'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].js?[hash:8]'
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },  
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/test'),
      path.resolve('src/scss'),
      path.resolve('src/images'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader", "postcss-loader"])
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use:[
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name:'[name].[ext]?[hash:8]'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    }
                }
            }
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([
      { from: __dirname + '/src/assets', to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      title: 'Webpack 前端自動化開發',
      filename: 'index.html',
      template: 'html/template.html',
      viewport: 'width=device-width, initial-scale=1.0',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'about 前端自動化開發',
      filename: 'about.html',
      template: 'html/template.html',
      viewport: 'width=device-width, initial-scale=1.0',
      chunks: ['about']
    })
  ]
}