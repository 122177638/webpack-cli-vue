const path = require("path");
// 合并插件
const merge = require('webpack-merge');
// 构建文件index输出插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 处理webpack提示信息输出
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 控制台错误提示处理
const notifier = require('node-notifier');
// 控制台颜色输出
const colors = require('colors');
// 配置参数
const config = require('./config');
// webpack构建方法
const utils = require('./utils')
// 公用配置文件
const BASE_CONFIG = require('./webpack.base.config');

module.exports = (env, argv) => {

  const DEVELOPMENT_CONFIG = {
    mode: "development",
    optimization: {
      nodeEnv: 'development', // 设置process.env.NODE_ENV
    },
    plugins: [
      // 输出index.html配置
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
        inject: true
      }),
      // 处理webpack提示信息输出
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `You application is running here ${colors.cyan('http://localhost:'+ (config.devServer.port || 8080))}`
          ],
          notes: [`Or use the network to run ${colors.cyan('http://'+utils.getIPAdress()+':'+(config.devServer.port || 8080))}`]
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
    devServer: Object.assign({
      open: true,
      historyApiFallback: true,
      hot: true,
      port: 8080,
      useLocalIp: true,
      clientLogLevel: 'warning',
      overlay: {
        warnings: true,
        errors: true
      },
      // 显示 webpack 构建进度
      progress: true,
      quiet: true,
    }, config.devServer, {
      host: '0.0.0.0' // 保持两种运行方法
    })
  };

  return merge(BASE_CONFIG(env, argv), DEVELOPMENT_CONFIG)
}