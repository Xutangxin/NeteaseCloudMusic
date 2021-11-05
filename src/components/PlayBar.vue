<template>
  <div class="player">
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
</template>

<script>
export default {
  props: {
    musicUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.player audio {
  position: fixed;
  bottom: 0;
  display: block;
  width: 100%;
  height: 50px;
  opacity: 0.6;
}
</style>
