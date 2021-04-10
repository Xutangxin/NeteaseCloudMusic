<template>
  <div>
    <top></top>
    <index></index>
  </div>
</template>

<script>
import top from "./components/top";
import index from "./components/index";

export default {
  components: {
    top,
    index,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>