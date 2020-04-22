<template>
  <div>
      <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />
      <div style="width: 100%;margin-top: 10px;">
        <van-cell title="用户名" :value="username" />
        <van-cell title="关于" is-link to="common" />
        <van-cell title="隐私" is-link to="common" />
        <van-cell title="通用" is-link to="common" />
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
import { userinfo } from "@/api/member";
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
      username: userinfo().username
    };
  },
  mounted() {
    this.addshowPop = true;
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    loginOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
}
</style>