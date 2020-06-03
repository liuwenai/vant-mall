<template>
  <div class="tabber-user">
    <div class="avatar" v-if="isLogin == false">
      <img :src="avatar_default" alt srcset />
      <p @click="login">去登录</p>
    </div>
    <div class="avatar" v-else>
      <van-icon name="set" class="user_set" />
      <div class="user_avatar">
        <img :src="avatar" alt="头像" width="55" height="55" />
      </div>
      <div>{{nick_name}}</div>
    </div>
    <!-- <router-link to="/login">登录</router-link>
    <router-link to="/logon">免费注册</router-link>-->

    <van-cell-group class="user-group">
      <van-cell icon="records" title="我的订单" to="/order" is-link />
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />待付款
        </van-col>
        <van-col span="6">
          <van-icon name="records" />待发货
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />待收货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />已完成
        </van-col>
      </van-row>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="gift-o" title="收货地址" @click="toAddress" is-link />
      <van-cell icon="service-o" title="我的客服" to="/serve" is-link />
      <van-cell icon="setting-o" title="设置" to="/setting" is-link />
    </van-cell-group>

    <BaseFooter active="user" />
  </div>
</template>


<script>
import BaseFooter from "@/components/base/basefooter";
import { Tabbar, TabbarItem, NavBar, Icon } from "vant";
import avatar_default from "../../assets/images/avatar_default.png";
import bg_default from "../../assets/images/user_head_bg.png";
import {
  removeLocalStorage,
  getLocalStorage
} from "@/core/utils/local-storage";
import { Row, Col, Cell, CellGroup } from "vant";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [BaseFooter.name]: BaseFooter,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  data() {
    return {
      avatar_default: avatar_default,
      isLogin: false,
      background_image: "",
      nick_name: "",
      avatar: "",
      infoData: []
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    loginOut() {
      removeLocalStorage(
        "Authorization",
        "user_id",
        "avatar",
        "background_image",
        "nick_name"
      );
      this.$router.push({ name: "login" });
    },
    async getUserInfo() {
      this.infoData = await getLocalStorage(
        "Authorization",
        "nick_name",
        "user_id",
        "background_image",
        "avatar",
      );
      debugger;
      if (this.infoData.Authorization != null) {
        this.isLogin = true;
        this.nick_name = this.infoData.nick_name || "昵称";
        this.avatar = this.infoData.avatar || avatar_default;
        this.background_image = this.infoData.background_image || bg_default;
      }else{
        this.isLogin = false
      }
    },
    login() {
      this.$router.push({ name: "login" });
    },
    toAddress() {
      this.$router.push({
        name: "address",
        params: { id: this.infoData.user_id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.avatar {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: rgb(240, 72, 72);
  padding: 10% 0 10% 0;
  box-sizing: border-box;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  p {
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
  }
}
.tabbar-user {
  > div {
    margin-bottom: 10px;
  }
  &__quit {
    border: 0;
    border-radius: 0;
  }
}
.user {
  &-poster {
    width: 100%;
    height: 100%;
    display: block;
  }
  &-group {
    margin-bottom: 0.3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.van-cell {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  align-items: center;
  .van-cell__left-icon {
    font-size: 16px;
    line-height: 24px;
    margin-right: 5px;
  }
  .van-cell__right-icon {
    color: #999;
    font-size: 12px;
    line-height: 35px;
    margin-left: 5px;
  }
}
.usename {
  font-weight: 700;
  font-size: 18px !important;
}
.setting {
  color: #eee;
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 10px;
}
.numlist {
  position: relative;
  width: 20%;
}
.numlist .num {
  position: absolute;
  right: 15px;
  top: -8px;
  color: #fff;
  background: #e0322b;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-radius: 50%;
}
</style>