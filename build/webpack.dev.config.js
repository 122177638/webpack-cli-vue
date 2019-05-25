const path = require("path");
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var notifier = require('node-notifier');
const utils = require('./webpack.utils')
const BASE_CONFIG = require('./webpack.base.config');


// 获取本机ip地址
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
module.exports = (env, argv) => {

  const DEVELOPMENT_CONFIG = {
    mode: "development",
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: './public/js/vendors.[contenthash:8].js',
            chunks: 'all'
          }
        }
      },
      nodeEnv: 'development', // 设置process.env.NODE_ENV
    },
    plugins: [
      // 配置打完完成输出配置
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
        inject: true
      }),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:****`, 'You application is running here http://192.168.1.1:8080'],
          notes: ['Some additionnal notes to be displayed unpon successful compilation']
        },
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          notifier.notify({
            title: "Webpack error",
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: ICON
          });
        }
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist/'),
      open: true,
      historyApiFallback: true,
      hot: true,
      port: 8080,
      host: "0.0.0.0",
      useLocalIp: true,
      clientLogLevel: 'warning',
      overlay: {
        warnings: true,
        errors: true
      },
      // 显示 webpack 构建进度
      progress: true,
      quiet: true
    }
  };

  return merge(BASE_CONFIG(env, argv), DEVELOPMENT_CONFIG)
}