<template>
  <!-- 推荐歌单 -->
  <div class="recommend">
    <h4>推荐歌单</h4>
    <div class="reco" v-for="(item, index) in list" :key="index">
      <img :src="item.picUrl" alt />
      <span>{{ item.name }}</span>
    </div>

    <!-- 最新音乐 -->
    <h4 id="title">最新音乐</h4>
    <div class="latest" v-for="(item, index) in songs" :key="'latest-' + index">
      <div class="img">
        <!-- 封面 -->
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <!-- 歌名和歌手名 -->
        <div>{{ item.name }}</div>
        <div id="singername">{{ item.song.artists[0].name }}</div>
        <!-- 点击调用playMusic播放 -->
        <div id="play" @click="playMusic(item.id)" title="点击播放">▶</div>
      </div>
    </div>

    <!-- 推荐MV -->
    <h4 id="mvs">推荐MV</h4>
    <div class="mv" v-for="(item, index) in mvs" :key="'mv' + index">
      <a href="javascript:;">
        <span id="playmv">▶</span>
        <img :src="item.picUrl" alt />
      </a>
      <p id="mvname">{{ item.name }}</p>
      <p id="artistname">{{ item.artistName }}</p>
    </div>
  </div>
</template>

<script>
import {
  getRecommendedLists,
  getNewestMusic,
  getMvs,
  getMusicUrl,
} from "@/api/discovery";
export default {
  name: "discovery",
  data() {
    return {
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: [],
    };
  },
  created() {
    this.getRecommendedLists();
    this.getNewestMusic();
    this.getMvs();
  },
  methods: {
    // 推荐歌单
    getRecommendedLists() {
      getRecommendedLists().then((res) => {
        this.list = res.data.result;
      });
    },
    //最新音乐
    getNewestMusic() {
      getNewestMusic().then((res) => {
        this.songs = res.data.result;
      });
    },
    //最新mv
    getMvs() {
      getMvs().then((res) => {
        this.mvs = res.data.result;
      });
    },
    // 播放的方法
    playMusic(id) {
      getMusicUrl(id).then((res) => {
        let url = res.data.data.url;
        // 把播放地址传给父组件
        this.$parent.musicUrl = url;
      });
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
.recommend {
  width: 100%;
  height: calc(100vh - 90px);
  padding: 10px 40px 0 40px;
  overflow: scroll;
  /* border: 1px solid gray; */
}
.recommend::-webkit-scrollbar {
  display: none;
}
.recommend h4 {
  margin: 8px 0 5px 7px;
}
.recommend .reco {
  float: left;
  width: 150px;
  height: 165px;
  margin: 5px 0 8px 8px;
  text-align: center;
  overflow: hidden;
}
.recommend .reco img {
  width: 140px;
  height: 140px;
}
.recommend .reco span {
  font-size: 12px;
  text-align: left;
}
.latest {
  float: left;
  width: 500px;
  height: 130px;
  margin: 5px 50px 5px 5px;
}
.latest:hover {
  background-color: #f5f4f6;
}
.latest > div {
  float: left;
}
.latest .img {
  width: 130px;
  height: 130px;
}
.latest .img img {
  width: 100%;
  height: 100%px;
}
.latest .info {
  width: 40%;
  margin: 10px;
  font-size: 14px;
}
.latest .info #singername {
  margin-top: 20px;
  color: gray;
}
.latest .info #play {
  width: 40px;
  height: 30px;
  margin-top: 10px;
  font-size: 20px;
  text-align: left;
  line-height: 30px;
}
.latest .info #play:hover {
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
}
#title {
  margin-top: 190px;
}
.recommend .mv {
  float: left;
  width: 250px;
  height: 200px;
  margin-right: 20px;
  border-radius: 5px;
}
.mv img {
  width: 100%;
  height: 140px;
}
.mv a {
  position: relative;
  width: 100%;
  height: 140px;
}
.recommend .mv:last-child {
  margin-right: 0;
}
#mvs {
  margin: 575px 0 12px 0;
}
#playmv {
  position: absolute;
  top: 60px;
  left: 115px;
  font-size: 20px;
  color: white;
}
#mvname {
  height: 30px;
  padding: 3px;
  overflow: hidden;
  line-height: 30px;
  font-size: 15px;
}
#artistname {
  height: 30px;
  padding: 3px;
  overflow: hidden;
  font-size: 14px;
  color: gray;
}
</style>
