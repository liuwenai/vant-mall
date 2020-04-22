<template>
  <div>
    <van-nav-bar title="会员中心" :left-arrow="false" />

    <van-grid :column-num="2">
      <van-grid-item v-if="type ==='1'" icon="user-o" to="/usersqb" text="个人申请" />
      <van-grid-item v-if="type ==='2'" icon="friends-o" to="/dwsqb" text="单位申请" />
    </van-grid>
    <BaseFooter active="member" />
  </div>
</template>

<script>
import {
  removeLocalStorage,
  getLocalStorage
} from "@/core/utils/local-storage";

import BaseFooter from "@/components/base/basefooter";
import { Grid, GridItem, NavBar } from "vant";
export default {
  components: {
    [BaseFooter.name]: BaseFooter,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      type: "0"
    };
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const infoData = await getLocalStorage(
        "user_id",
        "Authorization",
        "nick_name",
        "background_image",
        "avatar",
        "type"
      );
      this.type = infoData.type
    }
  }
};
</script>