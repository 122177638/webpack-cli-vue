import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import './common/css/base.css'
import './common/css/mixin.css'
import './common/css/font-awesome.min.css'
import html5Icon from "./assets/images/html5.jpg"

import {
  getName
} from "./common/js/utils.js"

console.log('当前环境' + process.env.NODE_ENV)

let fragment = document.createDocumentFragment();

// css处理
const div = document.createElement('div');
div.className = "box";
div.innerHTML = "css处理";
fragment.appendChild(div)


// 图片处理
const img = document.createElement('img');
img.className = "box";
img.alt = "图片处理";
// 使用网络图片无问题
// img.src = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg";
// 使用本地图片，不安装loader会报错-----(安装file-loader、url-loader)
img.src = html5Icon;
fragment.appendChild(img)

// 背景图片
const div01 = document.createElement('div');
div01.className = "box-bg";
div01.innerHTML = "背景图片处理";
fragment.appendChild(div01)

// 字体图标
const div02 = document.createElement('i');
div02.className = "fa fa-html5 fa-5x";
div02.style.color = "red";
fragment.appendChild(div02)

// import引入方法调用
const div03 = document.createElement('i');
div03.className = "test-Hot";
div03.innerHTML = getName();
fragment.appendChild(div03)

// 动态导入
// import( /* webpackChunkName:"utils" */ './common/js/utils.js').then((res) => {
//   const div03 = document.createElement('i');
//   div03.className = "test-Hot";
//   div03.innerHTML = res.getName();
//   document.body.appendChild(div03)
// })


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


// 模块热替换
if (module.hot) {
  module.hot.accept('./common/js/utils.js', function () {
    console.log('utils文件改变了，我要更新getName方法')
    document.querySelector('.test-Hot').innerHTML = getName();
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 等待vue实例化挂载之后，添加节点
document.querySelector('#app').appendChild(fragment)