<template>
  <div class="player">
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl:
        "http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3",
    };
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
}
</style>
