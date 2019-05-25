const PRODUCTION_CONFIG = require('./build/webpack.prod.config');
const DEVELOPMENT_CONFIG = require('./build/webpack.dev.config');
/**
 * 默认webpack.config.js
 * 可在scripts指定webpack运行文件
 * build指定为 './build/webpack.prod.config.js'
 * serve指定为 './build/webpack.dev.config.js'
 */
module.exports = (env, argv) => {
  // 开发环境
  if (argv.mode === 'development') {
    return DEVELOPMENT_CONFIG(env, argv)
  }
  // 生产环境
  if (argv.mode === 'production') {
    return PRODUCTION_CONFIG(env, argv)
  }
}