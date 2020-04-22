<template>
  <div>
    <md-field-group>
      <md-field
        v-model="account"
        icon="user-circle-o"
        placeholder="手机号"
        right-icon="close"
        v-validate="'required|mobile'"
        name="user"
        data-vv-as="手机号"
        @right-click="clearText"
      />

      <md-field
        v-model="password"
        icon="lock"
        placeholder="密码"
        :type="visiblePass ? 'text' : 'password'"
        :right-icon="visiblePass ? 'eye-o' : 'closed-eye'"
        v-validate="'required'"
        data-vv-as="密码"
        name="password"
        @right-click="visiblePass = !visiblePass"
      />

      <div class="clearfix">
        <div class="float-r">
          <router-link to="/login/forget">忘记密码</router-link>
        </div>
      </div>

      <van-button size="large" type="danger" :loading="isLogining" @click="loginSubmit">登录</van-button>
    </md-field-group>

    <div class="register clearfix">
      <div class="float-l connect">
        <router-link to="/login/registerLogon">用户注册</router-link>
      </div>
      <div class="float-r">
        <router-link to="/login/registerGetCode">用户认证</router-link>
      </div>
    </div>

    <van-popup v-model="showKefu">
      <md-kefu mobile="15839334498" />
    </van-popup>
  </div>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import md_kefu from "@/components/md-kefu/";

import { login, userinfo } from "@/api/member";
import { setLocalStorage } from "@/core/utils/local-storage";
import { emailReg, mobileReg } from "@/core/regexp";
import cookies from "@/core/utils/cookies";
import { Popup, Toast } from "vant";

export default {
  name: "login-request",
  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup,
    [md_kefu.name]: md_kefu,
    [Popup.name]: Popup
  },
  data() {
    return {
      type: "1", // 会员类型 0:个人会员，1：单位会员
      account: "",
      password: "",
      visiblePass: false,
      showKefu: false,
      isLogining: false
    };
  },
  mounted() {
    // debugger;
    const {mobile,password} = this.$route.params
    this.account = mobile;
    this.password = password;
  },

  methods: {
    clearText() {
      this.account = "";
    },

    async validate() {
      const result = await this.$validator.validate();
      if (!result) {
        const errMsg = this.errors.items[0].msg;
        Toast(errMsg);
        throw new Error(`表单验证: ${errMsg}`);
      }
    },

    async login() {
      const loginData = this.getLoginData();
      // 注意这里要优化判断登录是否成功
      const { access_token, username, name, type } = await login(loginData);
      cookies.set("token", access_token);
      setLocalStorage({
        Authorization: access_token,
        user_id: username,
        nick_name: name,
        type
      });
      this.type = type;
      // 把用户信息放入全局变量
      this.$eventBus["loginUser"] = {
        Authorization: access_token,
        user_id: username,
        nick_name: name
      };
    },

    async loginSubmit() {
      this.isLogining = true;
      try {
        await this.validate();
        await this.login();
        await this.getUserProfile();
        this.isLogining = false;
      } catch (err) {
        // console.log(err);
        this.isLogining = false;
      }
    },

    // 根据 type 分取是个人信息还是单位信息
    async getUserProfile() {
      const { code, data } = await userinfo();
      // debugger;
      // 设置额外的信息
      if (code === 100) {
        // window.localStorage.setItem("id", data.id);
        setLocalStorage({
          id: data.id
        });
      } else {
        this.$router.push({ name: "member" });
        return;
      }

      this.routerRedirect();
    },

    routerRedirect() {
      const { query } = this.$route;
      this.$router.replace({
        name: query.redirect || "home",
        query: query
      });
    },

    getLoginData() {
      const password = this.password;
      const account = this.getUserType(this.account);
      return {
        [account]: this.account,
        password,
        usertype: 0
      };
    },

    getUserType(account) {
      return "username";
      // const accountType = mobileReg.test(account)
      //   ? 'mobile'
      //   : emailReg.test(account)
      //     ? 'email'
      //     : 'username';
      // return accountType;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin/var";
@import "../../assets/less/mixin/border";
.register {
  padding-top: 40px;
  color: #999;
  a {
    color: #999;
  }
  > div {
    width: 50%;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .connect {
    .border(right);
    text-align: right;
  }
}
</style>
