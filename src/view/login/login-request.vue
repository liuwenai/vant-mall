<template>
  <div>
    <md-field-group>
      <md-field
        v-model="username"
        icon="user-circle-o"
        placeholder="账号"
        right-icon="close"
        v-validate="'required'"
        name="user"
        data-vv-as="账号"
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
          <!-- <router-link to="/login/forget">忘记密码</router-link> -->
        </div>
      </div>

      <van-button size="large" type="danger" :loading="isLogining" @click="loginSubmit">登录</van-button>
    </md-field-group>

    <div class="register clearfix">
      <div class="float-l connect">
        <router-link to="/login/registerLogon">用户注册</router-link>
      </div>
      <div class="float-r">
          <router-link to="/login/forget/reset">忘记密码</router-link>
      </div>
    </div>

    <!-- <van-popup v-model="showKefu">
      <md-kefu mobile="15839334498" />
    </van-popup> -->
  </div>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import md_kefu from "@/components/md-kefu/";

// import { login, userinfo } from "@/api/member";
import { login }  from "@/api/mall";
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
      username: "",
      password: "",
      visiblePass: false,
      // showKefu: false,
      isLogining: false
    };
  },
  mounted() {
    // debugger;
    const {userzh,password} = this.$route.params
    this.username = userzh;
    this.password = password;
  },

  methods: {
    clearText() {
      this.username = "";
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
      const username = this.username;
      const password = this.password;
      const loginData = { username,password };
    // 注意这里要优化判断登录是否成功
      const { access_token, user } = await login(loginData);
        // debugger
      cookies.set("token", access_token);
      setLocalStorage({
        Authorization: access_token,
        nick_name: user.usermc,
        username: user.userzh,
        user_id: user.id,
        login:true,
        user: user
      });
      // 把用户信息放入全局变量
      // this.$eventBus["loginUser"] = {
      //   Authorization: access_token,
      //   user_id: id,
      //   nick_name: usermc,
      // };
      this.routerRedirect();
    },

    async loginSubmit() {
      this.isLogining = true;
      try {
        await this.validate();
        await this.login();
        // await this.getUserProfile();
        this.isLogining = false;
      } catch (err) {
        // console.log(err);
        this.isLogining = false;
      }
    },


    routerRedirect() {
      // const { query } = this.$route;
      // this.$router.replace({
      //   name: "home",
      //   query: query
      // });
      window.location = '#/user/';
    },

    // getLoginData() {
    //   const password = this.password;
    //   const username = this.getUserType(this.username);
    //   return {
    //     [username]: this.username,
    //     password,
    //     usertype: 0
    //   };
    // },

    getUserType(username) {
      // debugger
      return username;
      // const usernameType = mobileReg.test(username)
      //   ? 'mobile'
      //   : emailReg.test(username)
      //     ? 'email'
      //     : 'username';
      // return usernameType;
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
