const path = require('path')

module.exports = {
  // 构建输出资源路径
  outputPath: path.resolve(__dirname, '../dist'),
  // 构建输出的文件目录
  assetsPath: './static',
  // minicssplugin路径
  minicssPublicPath: '../../',
  // devServer 配置
  devServer: {
    open: true
  }
}