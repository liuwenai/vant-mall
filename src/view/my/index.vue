<template>
  <div>
      <van-nav-bar title="账户与安全" left-arrow @click-left="onClickLeft" />
      <div style="width: 100%;margin-top: 10px;">
        <van-cell title="账号" :value="username" />
        <van-cell title="用户名" :value="usermc" />
        <van-cell title="绑定电话" :value="fmobile" />
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
      username: userinfo().userzh,
      usermc: userinfo().userzh,
      fmobile: userinfo().phone
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