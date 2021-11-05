<template>
  <div class="playlists">
    <!-- 顶部歌单 -->
    <div class="toplist">
      <!-- 左侧封面 -->
      <div class="cover">
        <img :src="topList.coverImgUrl" alt />
      </div>
      <!-- 右侧信息 -->
      <div class="info">
        <div id="logo">精品歌单</div>
        <div id="header">{{ topList.name }}</div>
        <div id="intro">{{ topList.description }}</div>
      </div>
    </div>
    <!-- tab栏 -->
    <div class="tabbar">
      <span
        class="tabbaritem"
        :class="{ active: tag == '全部' }"
        @click="tag = '全部'"
        >全部</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '欧美' }"
        @click="tag = '欧美'"
        >欧美</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '华语' }"
        @click="tag = '华语'"
        >华语</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '流行' }"
        @click="tag = '流行'"
        >流行</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '说唱' }"
        @click="tag = '说唱'"
        >说唱</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '摇滚' }"
        @click="tag = '摇滚'"
        >摇滚</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '民谣' }"
        @click="tag = '民谣'"
        >民谣</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '电子' }"
        @click="tag = '电子'"
        >电子</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '轻音乐' }"
        @click="tag = '轻音乐'"
        >轻音乐</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '影视原声' }"
        @click="tag = '影视原声'"
        >影视原声</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == 'ACG' }"
        @click="tag = 'ACG'"
        >ACG</span
      >
      <span
        class="tabbaritem"
        :class="{ active: tag == '怀旧' }"
        @click="tag = '怀旧'"
        >怀旧</span
      >
    </div>
    <!-- 歌曲列表 -->
    <div class="songlists">
      <div v-for="(item, index) in list" :key="'songlist-' + index">
        <img :src="item.coverImgUrl" alt />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 分页 -->
    <!-- 
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
    -->
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="10"
      ></el-pagination>
    </div>
  </div>
</template>

<script scoped>
import { getList, getSongList } from "@/api/playlists";
export default {
  data() {
    return {
      // 顶部歌单
      topList: [],
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单列表
      list: [],
      //音乐分类
      tag: "全部",
    };
  },
  //使用watch监听tag的变化实现数据动态刷新
  watch: {
    tag() {
      // 顶部歌单
      this.getList();
      // 歌单列表
      this.getSongList();
      this.page = 1;
    },
  },
  created() {
    // 顶部歌单
    this.getList();
    // 歌单列表
    this.getSongList();
  },
  methods: {
    // 获取顶部歌单
    getList() {
      getList({ limit: 1, cat: this.tag }).then((res) => {
        this.topList = res.data.playlists[0];
      });
    },
    // 获取歌单列表
    getSongList() {
      getSongList({
        limit: 10,
        cat: this.tag,
        offset: (this.page - 1) * 10,
      }).then((res) => {
        this.total = res.data.total;
        this.list = res.data.playlists;
      });
    },
    handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      // 重新请求列表
      this.getSongList();
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
.playlists {
  width: 100%;
  height: calc(100vh - 90px);
}
.playlists,
.songlists {
  overflow: scroll;
}
.playlists::-webkit-scrollbar,
.songlists::-webkit-scrollbar {
  display: none;
}

.playlists .toplist {
  display: flex;
  /* width: 70%; */
  /* min-width: 960px; */
  width: fit-content;
  height: 150px;
  margin: 5px auto;
  padding: 5px;
  background-image: linear-gradient(to right, #5e524d, rgb(185, 179, 179));
  border-radius: 10px;
  overflow: hidden;
}
.toplist .cover {
  width: 140px;
  height: 100%;
}
.toplist .cover img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.toplist .info {
  width: 780px;
  height: 100%;
  margin-left: 30px;
}
#logo {
  width: 80px;
  height: 22px;
  line-height: 22px;
  border-radius: 5px;
  margin-top: 5px;
  border: 1px solid #d8a15a;
  color: #d8a15a;
  text-align: center;
  line-height: 22px;
}
#header {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 5px 0 5px 0;
}
#intro {
  height: 80px;
  color: #cab6ac;
  font-size: 14px;
  overflow: hidden;
}
.songlists {
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  width: 100%;
  height: 440px;
  margin: 0 auto;
  padding: 20px;
}
.songlists div {
  width: 160px;
  /* width: calc(25% - 30px); */
  height: 185px;
  margin: 15px;
  border-radius: 7px;
}
.songlists div img {
  width: 100%;
  height: 160px;
  border-radius: 7px;
}
.songlists div span {
  display: block;
  height: 20px;
  font-size: 13px;
  font-family: erif;
  color: #5e524d;
  overflow: hidden;
}
.tabbar {
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 200px;
}
.tabbaritem {
  margin: 0 10px 0 0;
}
.tabbaritem:hover {
  cursor: pointer;
}
.active {
  color: red;
}
.page {
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 5px;
}
</style>
