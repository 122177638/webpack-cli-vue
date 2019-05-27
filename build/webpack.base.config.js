const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const package = require('../package.json');
const config = require('./config');
const utils = require('./utils')


module.exports = (env, argv) => {
  // 是否为开发环境
  const IS_NODE_PROD = argv.mode === "production";
  // BASE_CONFIG 公用配置
  const BASE_CONFIG = {
    entry: {
      app: "./src/main.js"
    },
    output: {
      filename: IS_NODE_PROD ? utils.assetsPath("js/[name].[chunkhash:8].js") : utils.assetsPath("js/[name].js"),
      chunkFilename: IS_NODE_PROD ? utils.assetsPath("js/[name].[chunkhash:8].js") : utils.assetsPath("js/[id].js"),
      path: config.outputPath
    },
    optimization: {
      // 提取runtimeChunk
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          // 提取vendor长效缓存
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: utils.assetsPath("js/vendors.[contenthash:8].js"),
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [{
          test: /\.js(x)?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [{
              loader: IS_NODE_PROD ? MiniCssExtractPlugin.loader + '?publicPath=' + config.minicssPublicPath : "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require('autoprefixer')(package.postcss.plugins.autoprefixer), // 自动添加浏览器前缀
                  require('cssnano')(), // 合并相同css
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
              loader: "url-loader",
              options: {
                limit: 50000, //表示低于50000字节（50K）的图片会以 base64编码
                outputPath: utils.assetsPath("img"), // 输出的路径
                name: IS_NODE_PROD ? "[name].[hash:8].[ext]" : "[name].[ext]", // 输出的文件名
              }
            },
            { // 图片压缩(保真) https://www.npmjs.com/package/image-webpack-loader#libpng-issues
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              }
            },
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: "file-loader",
            options: {
              outputPath: utils.assetsPath("fonts"), // 输出的路径
              name: IS_NODE_PROD ? "[name].[hash:8].[ext]" : "[name].[ext]" // 输出的文件名
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, '../src')
      }
    }
  }

  return BASE_CONFIG;
}