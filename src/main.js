import Vue from 'vue'
// import { use } from 'vue/types/umd'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import routes from '@/routes/index'

Vue.use(VueRouter)
Vue.use(ElementUI);

// 创建路由
let router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  // 路由挂载到Vue实例上
  router// router:router
}).$mount('#app')
