//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin') //html显示
const isDev = process.env.NODE_ENV === 'development' //判断环境
const config = require('./public/config')[isDev ? 'dev' : 'build'] //判断环境配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次清空dist
const Copywebpackplugin = require('copy-webpack-plugin') //复制资源
const webpack = require('webpack') //公共变量
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
const path = require('path')

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'none',
  entry: {
    index: './src/js/index.js',
    login: './src/js/login.js'
  },
  // entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.[hash:8].js',
    publicPath: '/' //通常事cdn地址
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')()]
              }
            }
          },
          'less-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            outputPath: 'assets',
            name: '[name]_[hash:8].[ext]',
            esModule: false
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: '3000',
    hot: true,
    quiet: false,
    inline: true,
    stats: 'errors-only',
    overlay: false, //启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
    clientLogLevel: 'silent',
    compress: true //是否启用gzip
  },
  plugins: [
    //数组 放着所有的webpack插件
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'index.html', //打包后的文件名
    //   config: config.template,
    //   minify: {
    //     removeAttributeQuotes: false, //是否删除属性的双引号
    //     collapseWhitespace: false //是否折叠空白
    //   }
    //   // hash: true //是否加上hash，默认是 false
    // }),

    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html', //打包后的文件名
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/html/login.html',
      filename: 'login.html', //打包后的文件名
      chunks: ['login']
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    }),
    new webpack.ProvidePlugin({
      // React: 'react',
      // Component: ['react', 'Component'],
      // Vue: ['vue/dist/vue.esm.js', 'default'],
      // $: 'jquery',
      _map: ['lodash']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath
    }),
    new OptimizeCssPlugin(), //压缩css
    new webpack.HotModuleReplacementPlugin()

    //   new Copywebpackplugin(
    //     [
    //       {
    //         from: 'src/js/*.js',
    //         to: path.resolve(__dirname, 'dist', 'js'),
    //         flatten: true
    //       },
    //       {
    //         from: 'src/css/*.less',
    //         to: path.resolve(__dirname, 'dist', 'css'),
    //         flatten: true
    //       }
    //     ],
    //     { ignore: ['index.js'] }
    //   )
  ]
}
