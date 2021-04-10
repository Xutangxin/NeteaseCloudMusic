<template>
  <div class="index">
    <!-- 左侧的导航栏 -->
    <div class="nav">
      <ul>
        <li>
          <!-- router-link实现点击去往不同的路由，实现页面切换效果 -->
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 右侧的页面 -->
    <div class="main">
      <!-- 使用路由来实现页面切换，不同的路由匹配不同的页面 -->
      <router-view></router-view>
    </div>

    <!-- 底部播放条 -->
    <div class="player">
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      musicUrl:
        "http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3",
    };
  },
};
</script>

<style scoped>
.index .main {
  float: left;
  width: 1195px;
  height: 550px;
  padding: 0;
  margin-left: 2px;
}
.index .nav {
  float: left;
  width: 150px;
  height: 550px;
  background-image: linear-gradient(to top, #ededed, white);
  background-color: #ededed;
}
.index .player {
  float: left;
  width: 1365px;
  text-align: center;
  background-color: #f1f3f4;
}
.index .player audio {
  width: 1340px;
  height: 40px;
  outline: none;
}
.index .nav li {
  list-style: none;
  text-decoration: none;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
a {
  display: block;
  text-decoration: none;
  width: 100%;
  height: 100%;
  color: black;
}

/* 点击高亮的效果 */
a.router-link-active {
  color: white;
  background-color: rgb(230, 218, 95);
}
.nav li a {
  font-size: 15px;
}
</style>