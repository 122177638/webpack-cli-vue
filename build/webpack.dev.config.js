const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const BASE_CONFIG = require('./webpack.base.config');

module.exports = (env, argv) => {

  const DEVELOPMENT_CONFIG = {
    mode: "development",
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
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
      new webpack.HotModuleReplacementPlugin(),
      // 配置打完完成输出配置
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
        inject: true
      }),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here http://localhost:****'],
          notes: ['Some additionnal notes to be displayed unpon successful compilation']
        }
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist/'),
      open: true,
      historyApiFallback: true,
      hot: true,
      clientLogLevel: 'warning',
      inline: true,
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