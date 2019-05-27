const path = require("path");
// 合并插件
const merge = require("webpack-merge");
// 构建文件index输出插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除原文件插件
const CleanWebpackPlugin = require("clean-webpack-plugin");
// css分离插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// copy插件
const CopyPlugin = require("copy-webpack-plugin");
// serviceWorker插件
const WorkboxPlugin = require("workbox-webpack-plugin");
// 配置参数
const config = require("./config")
// webpack构建方法
const utils = require("./utils")
//  公用配置文件
const BASE_CONFIG = require("./webpack.base.config");

module.exports = (env, argv) => {

  const PRODUCTION_CONFIG = {
    mode: "production",
    optimization: {
      nodeEnv: "production", // 设置process.env.NODE_ENV
    },
    plugins: [
      // 清除构建文件
      new CleanWebpackPlugin(),
      // 拷贝public静态文件
      new CopyPlugin([{
        from: "./public",
        to: "./"
      }]),
      // 输出index.html配置
      new HtmlWebpackPlugin({
        title: "webpack-app", // title(只有在使用默认模板时有效)
        filename: "index.html", // 模板名字
        template: "./public/index.html", // 模板路径(title无效)
        templateParameters: true, // 允许覆盖模板中使用的参数
        inject: true, // script插入位置
        favicon: "./public/favicon.ico", // 图标icon
        // chunks: ["index.js"], // script标签引入列表
        // excludeChunks: ["test.js"], // script标签不引入列表
        chunksSortMode: "auto", // script排序方式
        hash: false, // 给文件添加hash
        showErrors: false, // 错误详细信息
        cache: true, // 默认是true的，表示内容变化的时候生成一个新的文件。
        minify: { // 将html-minifier的选项作为对象来缩小输出
          removeAttributeQuotes: true, // 是否移除属性的引号
          removeComments: true, // 是否清理html的注释
          collapseWhitespace: true, // 是否清理html的空格、换行符
          minifyCSS: false, // 是否压缩html内的样式
          minifyJS: false, // 是否压缩js内的样式
          removeEmptyElements: false, // 是否清理内容为空的元素
          caseSensitive: false, // 是否区分大小写的方式处理自定义标签内的属性。
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeScriptTypeAttributes: true, // 是否去除script标签中的type属性
          removeStyleLinkTypeAttributes: true, // 是否去掉style和link标签的type属性。
        },
        xhtml: true, // 如果true将link标记渲染为自闭（兼容XHTML）
        // 插入meta标签
        meta: {
          Author: "Anles"
        },
      }),
      new MiniCssExtractPlugin({
        // 分离css
        filename: utils.assetsPath("css/[name].[contenthash:8].css"),
        chunkFilename: utils.assetsPath("css/[name].[contenthash:8].css"),
      }),
      // 添加serviceworker
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ],
    stats: {
      children: false // 关闭错误提示信息
    }
    // Entrypoint undefined = index.html https://github.com/jantimon/html-webpack-plugin/issues/895
  };
  // 合并输出
  return merge(BASE_CONFIG(env, argv), PRODUCTION_CONFIG)
}