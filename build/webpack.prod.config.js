const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const BASE_CONFIG = require('./webpack.base.config');

module.exports = (env, argv) => {
  
  const PRODUCTION_CONFIG = {
    mode: "production",
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
      nodeEnv: 'production', // 设置process.env.NODE_ENV
    },
    plugins: [
      // 清除打包文件
      new CleanWebpackPlugin(),
      new CopyPlugin([{
        from: './public',
        to: './'
      }]),
      // 配置打完完成输出配置
      new HtmlWebpackPlugin({
        title: "webpack-app", // title(只有在使用默认模板时有效)
        filename: "index.html", // 模板名字
        template: "./public/index.html", // 模板路径(title无效)
        templateParameters: true, // 允许覆盖模板中使用的参数
        inject: 'head', // script插入位置
        favicon: "./public/favicon.ico", // 图标icon
        // chunks: ["index.js"], // script标签引入列表
        // excludeChunks: ["test.js"], // script标签不引入列表
        chunksSortMode: "auto", // script排序方式
        hash: false, // 给文件添加hash
        cache: true, // 默认是true的，表示内容变化的时候生成一个新的文件。
        minify: { // 将html-minifier的选项作为对象来缩小输出
          removeAttributeQuotes: false, // 是否移除属性的引号
          removeComments: false, // 是否清理html的注释
          collapseWhitespace: false, // 是否清理html的空格、换行符
          minifyCSS: false, // 是否压缩html内的样式
          minifyJS: false, // 是否压缩js内的样式
          removeEmptyElements: false, // 是否清理内容为空的元素
          caseSensitive: false, // 是否区分大小写的方式处理自定义标签内的属性。
          removeScriptTypeAttributes: false, // 是否去除script标签中的type属性
          removeStyleLinkTypeAttributes: false, // 是否去掉style和link标签的type属性。
        },
        xhtml: true, // 如果true将link标记渲染为自闭（兼容XHTML）
        // 插入meta标签
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
        },
      }),
      new MiniCssExtractPlugin({
        // 分离css
        filename: "./public/css/[name].[contenthash:8].css",
        chunkFilename: "./public/css/[name].[contenthash:8].css",
      })
    ]
  };

  return merge(BASE_CONFIG(env, argv), PRODUCTION_CONFIG)
}