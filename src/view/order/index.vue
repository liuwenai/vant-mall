<template>
  <div class="container">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="no-order">
          <div class="c">
            <img
              src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
            />
            <p>还没有任何订单呢</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待评价"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Tab, Tabs, NavBar } from "vant";
import areaList from "../address/area";
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>