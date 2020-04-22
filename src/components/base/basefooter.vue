<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <!-- <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item> -->
      <!-- <van-tabbar-item replace to="/member" icon="friends-o">会员</van-tabbar-item> -->
      <van-tabbar-item replace to="/cart" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="manager-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "BaseFooter",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>