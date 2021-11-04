import discovery from '@/views/discovery.vue'
import playlists from '@/views/playlists.vue'
import songs from '@/views/songs.vue'
import mvs from '@/views/mvs.vue'
import result from '@/views/result.vue'
import playlist from '@/views/playlist.vue'
import mv from '@/views/mv.vue'

export default [
    // 配置地址 和 组件的对应关系
    {
        // 发现音乐
        path: "/discovery",
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