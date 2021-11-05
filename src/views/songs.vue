<template>
  <div class="latest-songs">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ listactive: tag == 0 }"
        >全部</span
      >
      <span class="item" @click="tag = 7" :class="{ listactive: tag == 7 }"
        >华语</span
      >
      <span class="item" @click="tag = 96" :class="{ listactive: tag == 96 }"
        >欧美</span
      >
      <span class="item" @click="tag = 8" :class="{ listactive: tag == 8 }"
        >日本</span
      >
      <span class="item" @click="tag = 16" :class="{ listactive: tag == 16 }"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <div class="songtable">
      <div class="songdetail">
        <div id="songimg"></div>
        <div id="songtitle">音乐标题</div>
        <div id="singername">歌手</div>
        <div id="songalbum">专辑</div>
        <div id="songduration">时长</div>
      </div>
      <div
        class="songdetail"
        v-for="(item, index) in lists"
        :key="'songdetial' + index"
      >
        <div id="songimg">
          <span title="点击播放" @click="playMusic(item.id)">▶</span>
          <img :src="item.album.picUrl" alt />
        </div>
        <div id="songtitle">{{ item.name }}</div>
        <div id="singername">{{ item.artist }}</div>
        <div id="songalbum">{{ item.album.name }}</div>
        <div id="songduration">{{ item.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入axios
import { getList } from "@/api/songs";
import { getMusicUrl } from "@/api/discovery";

export default {
  data() {
    return {
      // 歌单列表
      lists: [],
      // 分类
      tag: 0,
    };
  },
  created() {
    this.getList();
  },
  watch: {
    //切换分类的时候重新请求
    tag() {
      this.getList();
    },
  },
  methods: {
    // 播放音乐
    playMusic(id) {
      getMusicUrl(id).then((res) => {
        let url = res.data.data[0].url;
        // 音频url传给父组件
        this.$parent.musicUrl = url;
      });
    },
    // 获取歌单
    getList() {
      getList({
        type: this.tag,
      }).then((res) => {
        // 把数据存到lists
        this.lists = res.data.data.slice(0, 50);
        // 处理时长 毫秒转为分和秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          let duration = this.lists[i].duration;
          let min = parseInt(duration / 1000 / 60);
          let sec = parseInt((duration / 1000) % 60);
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          this.lists[i].duration = `${min}:${sec}`;
          this.lists[i].artist = this.lists[i].album.artists[0].name;
        }
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
.latest-songs {
  width: 100%;
  height: calc(100vh - 90px);
  /* border: 1px solid gray; */
}
.songtable,
.latest-songs {
  overflow: scroll;
}
.songtable {
  /* border: 1px solid gray; */
  padding: 20px 40px;
}
.latest-songs::-webkit-scrollbar,
.songtable::-webkit-scrollbar {
  display: none;
}
.latest-songs {
  font-size: 14px;
}
.listactive {
  color: red;
}
.tab-bar {
  width: 300px;
  height: 50px;
  line-height: 50px;
  margin-left: 800px;
  font-size: 15px;
}
.tab-bar span {
  margin: 5px 15px;
  color: gray;
  cursor: pointer;
}
.songinfo {
  width: 90%;
  height: 25px;
  margin: 0 auto;
  padding-left: 88px;
  line-height: 25px;
  border: 1px solid gray;
}
.songinfo span {
  display: inline-block;
  width: 200px;
  color: gray;
  text-align: right;
}

.songdetail {
  display: flex;
  justify-content: center;
  width: 90%;
  height: 70px;
  margin: 0 auto;
  line-height: 80px;
  border-radius: 10px;
}
.songdetail:hover {
  background-color: rgb(226, 216, 216);
}
.songdetail div {
  width: 20%;
  text-align: center;
  color: gray;
  overflow: hidden;
}
#songimg {
  position: relative;
  margin: 0;
  padding: 0;
  display: inline-block;
  width: 89px;
  height: 100%;
  text-align: center;
  line-height: 70px;
}
#songimg img {
  width: 65px;
  height: 65px;
  vertical-align: middle;
  border-radius: 5px;
}
#songimg span {
  width: 16px;
  height: 16px;
  position: absolute;
  font-size: 18px;
  color: white;
  top: 0px;
  left: 36px;
  cursor: pointer;
}
.tab-bar span:hover {
  color: red;
}
</style>
