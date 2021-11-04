<template>
  <div class="index">
    <div class="main">
      <!-- 使用路由来实现页面切换，不同的路由匹配不同的页面 -->
      <router-view></router-view>
    </div>
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
.index .main {
  position: fixed;
  top: 40px;
  left: 150px;
  width: calc(100vw - 150px);
  height: calc(100vh - 90px);
  padding: 0;
  /* margin-left: 2px; */
}
</style>
