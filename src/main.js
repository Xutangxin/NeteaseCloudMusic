import Vue from 'vue'
// import { use } from 'vue/types/umd'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由
import VueRouter from 'vue-router'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// use路由
Vue.use(VueRouter)
Vue.use(ElementUI);

// 导入需要路由管理的组件
import discovery from '@/views/discovery.vue'
import playlists from '@/views/playlists.vue'
import songs from '@/views/songs.vue'
import mvs from '@/views/mvs.vue'
import result from '@/views/result.vue'
import playlist from '@/views/playlist.vue'
import mv from '@/views/mv.vue'

// 创建路由
let router = new VueRouter({
  routes: [
    // 配置地址 和 组件的对应关系
    {
      // 地址
      // 发现音乐
      path: "/discovery",
      // 组件
      component: discovery
    },
    {
      // 推荐歌单
      path: "/playlists",
      component: playlists
    },
    {
      // 最新音乐
      path: "/songs",
      component: songs
    },
    {
      // 最新MV
      path: "/mvs",
      component: mvs
    },
    {
      // 空地址
      path: "/",
      component: discovery
    },
    {
      // 搜索结果
      path: "/result",
      component: result
    },
    {
      //歌单详情
      path: "/playlist",
      component: playlist
    },
    {
      //mv详情
      path: "/mv",
      component: mv
    }


  ]
});

new Vue({
  render: h => h(App),
  // 路由挂载到Vue实例上
  router// router:router
}).$mount('#app')
