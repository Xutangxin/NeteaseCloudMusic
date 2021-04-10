<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url" autoplay></video>
      </div>

      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：2014-11-04</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>

      <!-- 精彩评论 -->
      <div class="mv-comments">
        <h3>精彩评论({{this.total}})</h3>
        <div class="commentsinfo" v-for="(item,index) in comments" :key="'comment'+index">
          <div class="detial">
            <img :src="item.user.avatarUrl" alt />
            <div class="words">{{item.content}}</div>
          </div>
          <div class="time">{{item.time}}</div>
        </div>
      </div>

      <!-- 最新评论 -->

      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="10"
      ></el-pagination>
    </div>

    <!-- 相关推荐 -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMVs" :key="index" class="item">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <!-- <div class="num">{{ item.playCount }}</div> -->
              </div>
              <!-- <span class="time">{{ item.duration }}</span> -->
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      // mv地址
      url: "",
      //   相关mv
      simiMVs: {},
      //   mv信息
      mvInfo: "",
      //   歌手id
      singerid: "",
      //   歌手头像
      icon: "",
      //   评论
      comments: {},
      //   总评论数
      total: 0,
      //   当前页
      page: 1,
      //   每页的数量 在组件里定义page-size
      limit: 10,
      //   偏移
      offset: (this.page - 1) * this.limit,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: this.limit,
          offset: this.offset,
        },
      }).then((res) => {
        console.log("评论");
        this.comments = res.data.comments;
        this.total = res.data.total;
        console.log(this.comments);
      });
    },
  },
  created() {
    //   获取mv地址
    axios({
      url: "https://autumnfish.cn/mv/url",
      method: "get",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      this.url = res.data.data.url;
    });
    // 获取相关mv
    axios({
      url: "https://autumnfish.cn/simi/mv",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      console.log("相关mv");
      this.simiMVs = res.data.mvs;
      console.log(this.simiMVs);
    });
    // 获取mv信息
    axios({
      url: "https://autumnfish.cn/mv/detail",
      method: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      this.mvInfo = res.data.data;
      console.log("mv信息");
      console.log(this.mvInfo);
      //   获取歌手信息
      axios({
        url: "https://autumnfish.cn/artists",
        method: "get",
        params: {
          id: this.mvInfo.artists[0].id,
        },
      }).then((res) => {
        console.log("歌手信息");
        this.icon = res.data.artist.picUrl;
        console.log(res.data.artist);
      });
    });
    //获取评论数据
    axios({
      url: "https://autumnfish.cn/comment/mv",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: this.limit,
        offset: this.offset,
      },
    }).then((res) => {
      console.log("评论");
      this.comments = res.data.comments;
      this.total = res.data.total;
      console.log(this.comments);
      console.log(this.total);
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mv-container {
  height: 550px;
  padding: 15px;
}
.mv-container,
.mv-container .comment-wrap {
  overflow: scroll;
}
.mv-container::-webkit-scrollbar,
.mv-container .comment-wrap::-webkit-scrollbar,
.mv-recommend::-webkit-scrollbar,
.mv-wrap::-webkit-scrollbar {
  display: none;
}
.mv-wrap,
.mv-recommend {
  float: left;
}
.mv-wrap {
  width: 70%;
  height: 550px;
  overflow: scroll;
}
.mv-recommend {
  width: 30%;
  padding: 10px;
  overflow: scroll;
}
.mv-recommend .mvs .items {
  padding: 0;
  font-size: 14px;
  color: gray;
}
.mv-recommend .mvs .items .name {
  color: black;
}

.video-wrap video {
  width: 90%;
  margin-top: 5px;
}
.avatar-wrap img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  vertical-align: middle;
}
.singer-info .name {
  margin-left: 5px;
  font-size: 14px;
}
.singer-info .avatar-wrap {
  display: inline-block;
  margin: 5px 0;
}
.singer-info .avatar-wrap img {
  vertical-align: middle;
}
.mv-info .date,
.mv-info .number {
  color: gray;
  font-size: 14px;
  margin-right: 10px;
}
.mv-info .desc {
  margin-top: 10px;
  /* padding: 5px; */
}
.mv-info .title {
  margin: 5px 0;
}
.mv-wrap .mv-comments {
  margin-top: 210px;
}
.mv-wrap .commentsinfo {
  height: 110px;
  border: 1px solid gray;
}
.commentsinfo img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
.commentsinfo .time {
  margin-top: 5px;
}
.commentsinfo .detial {
  overflow: hidden;
}
.detial .words {
  margin-left: 10px;
}
.commentsinfo img,
.commentsinfo .words {
  float: left;
}
.commentsinfo .time {
  color: gray;
  font-size: 13px;
}
.mv-comments h3 {
  margin-bottom: 7px;
}
.items .item {
  width: 250px;
  height: 250px;
}
.items .item img {
  width: 100%;
}
</style>
