<template>
  <div>
    <Top></Top>
    <Nav></Nav>
    <Index></Index>
    <PlayBar :musicUrl="musicUrl"></PlayBar>
  </div>
</template>

<script>
import Top from "@/components/Top";
import PlayBar from "@/components/PlayBar";
import Nav from "@/components/Nav";
import Index from "@/components/Index";

export default {
  components: {
    Index,
    Top,
    PlayBar,
    Nav,
  },
  data() {
    return {
      musicUrl: "",
    };
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
