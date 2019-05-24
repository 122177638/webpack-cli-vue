const PRODUCTION_CONFIG = require('./build/webpack.prod.config');
const DEVELOPMENT_CONFIG = require('./build/webpack.dev.config');

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