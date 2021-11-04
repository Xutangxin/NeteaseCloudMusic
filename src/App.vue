<template>
  <div>
    <Top></Top>
    <Nav></Nav>
    <index></index>
    <PlayBar></PlayBar>
  </div>
</template>

<script>
import Top from "@/components/Top";
import PlayBar from "@/components/PlayBar";
import Nav from "@/components/Nav";

import index from "@/views/index";

export default {
  components: {
    index,
    Top,
    PlayBar,
    Nav,
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
