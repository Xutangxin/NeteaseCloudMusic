<template>
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
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.nav {
  position: fixed;
  top: 40px;
  width: 130px;
  height: calc(100vh - 90px);
  background-image: linear-gradient(to top, #ededed, white);
  background-color: #ededed;
  border-top-right-radius: 30px; /* 右上角 */
  border-bottom-right-radius: 30px; /* 右下角 */
  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.1);
}

.nav li {
  list-style: none;
  text-decoration: none;
  text-align: center;
  height: 50px;
  margin-top: 30px;
  line-height: 50px;
}

a {
  display: block;
  text-decoration: none;
  width: 100%;
  height: 100%;
  color: black;
  border-radius: 10px;
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
