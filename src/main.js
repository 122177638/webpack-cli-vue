import './common/css/base.css'
import './common/css/mixin.css'
import './common/css/font-awesome.min.css'
import html5Icon from "./assets/images/html5.jpg"
const utils = import( /* webpackChunkName:"utils" */ './common/js/utils.js')

console.log('当前环境' + process.env.NODE_ENV)
document.write('Hello webpack!')

// css处理
const div = document.createElement('div');
div.className = "box";
div.innerHTML = "css处理";
document.body.appendChild(div)

// 图片处理
const img = document.createElement('img');
img.className = "box";
img.alt = "图片处理";
// 使用网络图片无问题
// img.src = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg";
// 使用本地图片，不安装loader会报错-----(安装file-loader、url-loader)
img.src = html5Icon;
document.body.appendChild(img)

// 背景图片
const div01 = document.createElement('div');
div01.className = "box-bg";
div01.innerHTML = "背景图片处理";
document.body.appendChild(div01)

// 字体图标
const div02 = document.createElement('i');
div02.className = "fa fa-html5 fa-5x";
div02.style.color = "red";
document.body.appendChild(div02)

// 动态导入
utils.then((result) => {
  console.log(result.getName())
})

var array = [1, 2, 3, 4, 5, 6];
array.includes(function (item) {
  return item > 2;
});

class Anles {
  constructor() {
    console.log(this)
  }
}
Anles.time = 132;

Array.from(new Set([1, 2, 4, 3]))

new Promise((resolve, reject) => {
  console.log(resolve)
  console.log(reject)
})