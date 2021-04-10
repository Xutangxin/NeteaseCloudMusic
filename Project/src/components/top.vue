<template>
  <div class="top">
    <input type="search" v-model="inputValue" @keydown.enter="toSearch" placeholder="按下回车搜索" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.inputValue == "") {
        // alert("请输入内容");
        this.$message.warning("请输入内容");
        return;
      } else {
        // 路由传参 去往搜索结果页面
        this.$router.push("/result?kwd=" + this.inputValue);
      }
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  height: 28px;
  align-items: center;
  background-image: linear-gradient(to right, white, #ededed);
}

input {
  width: 154px;
  height: 22px;
  margin-left: 1150px;
  padding: 0 5px 0 5px;
  border-radius: 12px;
  border: 1px solid gray;
  outline: none;
  color: gray;
  font-size: 12px;
}
</style>