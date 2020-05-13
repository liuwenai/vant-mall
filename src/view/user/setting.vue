<template>
  <div>
      <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
      <div style="width: 100%;margin-top: 10px;">
        <van-cell title="用户名" :value="username" />
        <van-cell title="我的收货地址" is-link to="address" />
        <van-cell title="账户与安全" is-link to="my" />
        <!-- <van-cell title="通用" is-link to="common" /> -->
      </div>
      <div style="display:flex;justify-content: center;">
        <van-button style="margin: 30px auto;" type="info" @click="loginOut">退出登录</van-button>
      </div>
  </div>
</template>

<script>
import {
  CellGroup,
  Cell,
  NavBar,
  Button,
  Popup
} from "vant";
import {
  removeLocalStorage,
  getLocalStorage
} from "@/core/utils/local-storage";
export default {
  name: "payment",
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data() {
    return {
      addshowPop: false,
      username: ""
    };
  },
  mounted() {
    this.addshowPop = true;
    this.load()
  },
  methods: {
    async load() {
      const infoData = await getLocalStorage(
        "user_id",
        "Authorization",
        "nick_name",
        "background_image",
        "avatar",
      );
      this.username = infoData.nick_name;
    },
    onClickLeft() {
      window.history.go(-1);
    },
    loginOut() {
      removeLocalStorage(
        "Authorization",
        "id",
        "user_id",
        "avatar",
        "background_image",
        "nick_name"
      );
      this.$router.push({ name: "login" });
    },
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
}
</style>