<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.kwd }}</h2>
      <span class="sub-title">找到 {{ count }} 个结果</span>
    </div>
    <el-tabs class="content" v-model="activeIndex">
      <!-- 歌曲部分 -->
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <!-- 表头 -->
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <!-- 表体 -->
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in songList" :key="'songlist'+index">
              <!-- 歌曲序号 -->
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span id="songname" @dblclick="playMusic(item.id)" title="双击播放">{{item.name}}</span>
                    <!-- mv的图标 -->
                    <span
                      class="iconfont icon-mv"
                      v-if="item.mvid!=0"
                      title="点击播放MV"
                      @click="toMvlist(item.id)"
                    >📺</span>
                  </div>
                  <!-- 二级标题 -->
                  <span class="secondery" v-if="item.alias.length != 0">{{item.alias[0]}}</span>
                </div>
              </td>
              <!-- 歌手 -->
              <td>{{item.artists[0].name}}</td>
              <!-- 专辑 -->
              <td>{{item.album.name}}</td>
              <!-- 时长 -->
              <td>{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <!-- 歌单部分 -->
      <el-tab-pane label="歌单" name="lists" class="songlist">
        <div class="items">
          <div
            v-for="(item, index) in playLists"
            :key="'listorder'+index"
            class="item"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <!-- 播放量: -->
              <img :src="item.coverImgUrl" alt title="点击去往歌单详情" @click="toPlaylist(item.id)" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="listname">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <!-- mv部分 -->
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            v-for="(item, index) in mvs"
            :key="'mvorder'+index"
            class="item"
            @click="toMvlist(item.id)"
          >
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <!-- 播放次数 -->
              </div>
              <!-- 持续时间 -->
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
export default {
  data() {
    return {
      // 歌曲
      songList: [],
      // 歌单
      playLists: [],
      // mv
      mvs: [],
      // 数据总数
      count: 0,
      // tab切换时会改变的数据
      activeIndex: "songs",
      // 类型
      type: this.type,
    };
  },
  // 侦听activeIndex
  watch: {
    activeIndex(val) {
      console.log(val);
      switch (this.activeIndex) {
        case "songs":
          this.type = 1;
          this.limit = 10;
          break;
        case "lists":
          this.type = 1000;
          this.limit = 10;
          break;
        case "mv":
          this.type = 1004;
          this.limit = 10;
          break;
        default:
          break;
      }
      // 调接口
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.kwd,
          type: this.type,
          limit: this.limit,
        },
      }).then((res) => {
        // 歌曲
        if (this.type == 1) {
          // 保存展示到页面上的歌曲信息
          this.songList = res.data.result.songs;
          // 格式化歌曲时长
          for (let i = 0; i < this.songList.length; i++) {
            let min = parseInt(this.songList[i].duration / 1000 / 60);
            let sec = parseInt((this.songList[i].duration / 1000) % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            this.songList[i].duration = min + ":" + sec;
          }

          // 保存搜索结果总数
          this.count = res.data.result.songCount;
          console.log(this.songList);
        }
        // 歌单
        else if (this.type == 1000) {
          this.playLists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
          console.log(this.playLists);
        }
        // mv
        else {
          this.mvs = res.data.result.mvs;
          console.log(this.mvs);
          this.count = res.data.result.mvCount;
          // 处理数据
          for (let i = 0; i < this.mv.length; i++) {
            // 时间
            let min = parseInt(this.mv[i].duration / 1000 / 60);
            let sec = parseInt((this.mv[i].duration / 1000) % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            this.mv[i].duration = min + ":" + sec;
            // 播放次数
            if (this.mv[i].playCount > 100000) {
              this.mv[i].playCount =
                parseInt(this.mv[i].playCount / 10000) + "万";
            }
          }
        }
      });
    },
  },
  // 生命周期钩子函数
  created() {
    axios({
      url: "https://autumnfish.cn/search",
      method: "get",
      params: {
        keywords: this.$route.query.kwd,
        limit: 15,
      },
    }).then((res) => {
      // 保存展示到页面上的歌曲信息
      this.songList = res.data.result.songs;
      // 格式化歌曲时长
      for (let i = 0; i < this.songList.length; i++) {
        let min = parseInt(this.songList[i].duration / 1000 / 60);
        let sec = parseInt((this.songList[i].duration / 1000) % 60);
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        this.songList[i].duration = min + ":" + sec;
      }

      // 保存搜索结果总数
      this.count = res.data.result.songCount;
      console.log(this.songList);
    });
  },
  methods: {
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id: id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    },
    toPlaylist(id) {
      console.log(id);
      this.$router.push("/playlist?q=" + id);
    },
    toMvlist(id) {
      console.log(id);
      this.$router.push("/mv?q=" + id);
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
.result-container {
  height: 550px;
  padding: 5px 56px 0 120px;
}
.result-container,
.content {
  overflow: scroll;
}
.content .el-table {
  border-collapse: collapse;
}
.result-container::-webkit-scrollbar,
.content::-webkit-scrollbar {
  display: none;
}
.sub-title {
  font-size: 13px;
  color: gray;
}
.icon-mv {
  margin-left: 5px;
  cursor: pointer;
}
.secondery {
  font-size: 12px;
}
.el-table__row:hover {
  background-color: #e2d8d8;
}
.name-wrap #songname {
  cursor: pointer;
}

/* 歌单部分 */
.result-container .songlist {
  padding-left: 45px;
  text-align: center;
}

.items .item {
  float: left;
  width: 170px;
  height: 200px;
  margin-left: 5px;
  border-radius: 7px;
}
.items .item img {
  width: 90%;
  height: 90%;
  border-radius: 7px;
  margin: 0 auto;
}
.items .item .listname {
  font-size: 14px;
  color: gray;
}

/* mv部分 */
.mv .item {
  width: 180px;
  height: 170px;
  margin-right: 5px;
}
.mv .item img {
  width: 100%;
}
.mv .item .singer {
  font-size: 12px;
  color: gray;
}
.mv .item .name {
  height: 20px;
  overflow: hidden;
  font-size: 14px;
}
</style>