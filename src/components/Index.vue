<template>
  <div class="index">
    <div class="main">
      <!-- 使用路由来实现页面切换，不同的路由匹配不同的页面 -->
      <router-view @handleMusicUrl="handleMusicUrl"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: "",
    };
  },
  methods: {
    handleMusicUrl(val) {
      this.musicUrl = val;
      console.log(val);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.index .main {
  position: fixed;
  top: 40px;
  left: 130px;
  width: calc(100vw - 130px);
  height: calc(100vh - 90px);
  padding: 0;
}
</style>
