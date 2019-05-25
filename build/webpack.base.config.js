const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const package = require('../package.json');

module.exports = (env, argv) => {
  // 是否为开发环境
  const IS_NODE_PROD = argv.mode === "production";
  // BASE_CONFIG 公用配置
  const BASE_CONFIG = {
    entry: {
      app: "./src/main.js"
    },
    output: {
      filename: IS_NODE_PROD ? "./public/js/[name].[chunkhash:8].js" : "./public/js/[name].js",
      chunkFilename: IS_NODE_PROD ? "./public/js/[name].[chunkhash:8].js" : "./public/js/[id].js",
      path: path.resolve(__dirname, "../dist")
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [{
              loader: IS_NODE_PROD ? MiniCssExtractPlugin.loader + '?publicPath=../../' : "style-loader"
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
                limit: 1, //表示低于50000字节（50K）的图片会以 base64编码
                outputPath: "./public/img", // 输出的路径
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
              outputPath: "./public/fonts", // 输出的路径
              name: IS_NODE_PROD ? "[name].[hash:8].[ext]" : "[name].[ext]" // 输出的文件名
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, '../src')
      }
    }
  }

  return BASE_CONFIG;
}