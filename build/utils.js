const path = require('path');
const config = require('./config')
const os = require('os');


/**
 * @description: 拼接二级资源目录地址
 * @return: path.join()
 */
exports.assetsPath = (url) => {
  return path.posix.join(config.assetsPath, url)
}

/**
 * @description:获取本机IP地址 
 * @return: IP地址
 */
exports.getIPAdress = () => {
  var interfaces = os.networkInterfaces();
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