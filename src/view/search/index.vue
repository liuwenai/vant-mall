<template>
  <div>
    <!-- <van-nav-bar title="个人中心" :left-arrow="false" /> -->

    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <BaseFooter active="search" />
  </div>
</template>

<script>
import BaseFooter from "@/components/base/basefooter";
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Tabbar,
  TabbarItem,
  Search,
  NavBar
} from "vant";

export default {
  components: {
    [BaseFooter.name]: BaseFooter,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Search.name]: Search,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>