<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: area == '全部' }" @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '内地' }" @click="area = '内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '港台' }" @click="area = '港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '欧美' }" @click="area = '欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '日本' }" @click="area = '日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '韩国' }" @click="area = '韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: type == '全部' }" @click="type = '全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '官方版' }" @click="type = '官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '原声' }" @click="type = '原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '现场版' }" @click="type = '现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '网易出品' }" @click="type = '网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: order == '上升最快' }" @click="order = '上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最热' }" @click="order = '最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最新' }" @click="order = '最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item,index) in list" :key="'mv'+index">
          <img :src="item.cover" alt />
          <p id="mvname">{{item.name}}</p>
          <p id="singername">{{item.artistName}}</p>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
export default {
  data() {
    return {
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      // 总mv条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv
      list: [],
    };
  },
  created() {
    this.getList();
  },
  // 使用watch监听筛选条件（地区/类型/排序）的变化
  watch: {
    area() {
      this.page = 1;
      this.getList();
    },
    type() {
      this.page = 1;

      this.getList();
    },
    order() {
      this.page = 1;

      this.getList();
    },
  },
  methods: {
    // 获取mv
    getList() {
      axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        this.list = res.data.data;
        // 接口问题 如果有count就赋值，没有就不赋值
        if (res.data.count) {
          this.total = res.data.count;
        }
        console.log(this.list);
      });
    },
    // 页码改变时的回调函数
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.tabs-wrap .tab {
  display: inline-block;
  list-style: none;
  width: 90px;
  height: 20px;
  color: gray;
  margin-right: 5px;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid lightgray;
}
.tabs-wrap .tab:hover {
  color: red;
}
.filter-wrap span,
.filter-wrap ul {
  display: inline-block;
}
.filter-wrap {
  padding-left: 120px;
  font-size: 13px;
}
.section-type,
.type-type,
.order-type {
  margin: 8px;
  margin-right: 30px;
}
.mvs {
  margin-top: 20px;
}
.mvs .items {
  height: 390px;
  padding: 0 0 0 120px;
  margin: 10px 0 auto;
}
.mvs .items .item {
  float: left;
  width: 190px;
  height: 160px;
  margin-right: 15px;
  margin-bottom: 20px;
  border-radius: 7px;
}
.mvs .items .item img {
  width: 100%;
  height: 110px;
  border-radius: 7px;
}
.item #mvname {
  height: 20px;
  font-size: 13px;
  line-height: 20px;
  overflow: hidden;
}
.item #singername {
  font-size: 12px;
  color: gray;
  margin: 5px 0 0 3px;
}
</style>