<template>
  <div class="latest-songs">
    <div class="tab-bar">
      <span class="item" @click="tag=0" :class="{listactive:tag==0}">全部</span>
      <span class="item" @click="tag=7" :class="{listactive:tag==7}">华语</span>
      <span class="item" @click="tag=96" :class="{listactive:tag==96}">欧美</span>
      <span class="item" @click="tag=8" :class="{listactive:tag==8}">日本</span>
      <span class="item" @click="tag=16" :class="{listactive:tag==16}">韩国</span>
    </div>
    <!-- 底部的table -->
    <div class="songtable">
      <div class="songinfo">
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <div class="songdetail" v-for="(item,index) in lists" :key="'songdetial'+index">
        <div id="songimg">
          <span title="点击播放" @click="playMusic(item.id)">▶</span>
          <img :src="item.album.picUrl" alt />
        </div>
        <div id="songtitle">{{item.name}}</div>
        <div id="singername">{{item.album.artists['0'].name }}</div>
        <div id="songalbum">{{item.album.name}}</div>
        <div id="songduration">{{ item.duration}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
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
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id: id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        // 音频url传给父组件
        this.$parent.musicUrl = url;
      });
    },
    // 获取歌单
    getList() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        console.log("最新音乐");
        // 把数据存到lists
        this.lists = res.data.data;
        console.log(this.lists);
        // 处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          let duration = this.lists[i].duration;
          // 毫秒转换成分秒格式的思路
          // 假定 	350750 毫秒
          // 秒 350750/1000  350秒
          // 分 350 /60
          // 秒 350 % 60
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.lists[i].duration = `${min}:${sec}`;
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
  height: 550px;
}
.songtable,
.latest-songs {
  overflow: scroll;
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
  height: 25px;
  margin-left: 800px;
  margin-top: 10px;
}
.tab-bar span {
  margin: 5px;
  color: gray;
  cursor: pointer;
}
.songinfo {
  width: 1000px;
  height: 25px;
  margin: 0 auto;
  padding-left: 88px;
  line-height: 25px;
}
.songinfo span {
  display: inline-block;
  width: 200px;
  color: gray;
  text-align: right;
}

.songdetail {
  width: 1000px;
  height: 70px;
  margin: 0 auto;
  line-height: 80px;
  border-radius: 6px;
}
.songdetail:hover {
  background-color: rgb(226, 216, 216);
}
.songdetail div {
  display: inline-block;
  width: 200px;
  height: 100%;
  text-align: right;
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