import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '',
    name: 'Home',
    component: () => import( /* webpackChunkName:"home" */ '@/views/tabbar-view/view01/view01.vue')
    
  }]
})

export default router;