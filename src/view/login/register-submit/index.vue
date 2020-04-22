<template>
  <md-field-group class="register_submit">
    <md-field
      v-model="smscode"
      name="smscode"
      v-validate="'required|min:4'"
      data-vv-as="请输入验证码"
      icon="certificate"
      placeholder="请输入验证码"
    >
      <div slot="rightIcon" class="getCode red">
        <span v-if="counting" @click="getCode">获取验证码</span>
        <van-count-down ref="countDown" v-else :time="time" format="ss 秒后获取" @finish="onFinish" />
      </div>
    </md-field>
    <md-field
      v-model="password"
      name="password"
      v-validate="'required|min:6'"
      data-vv-as="请输入密码"
      icon="lock"
      placeholder="请输入密码"
    />
    <md-field
      name="repeatPassword"
      v-validate="{is:password}"
      data-vv-as="请再次确认密码"
      v-model="repeatPassword"
      icon="lock"
      placeholder="请再次确认密码"
    />

    <div class="register_submit_btn">
      <van-button type="danger" size="large" @click="registerSubmit">确定</van-button>
    </div>
  </md-field-group>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import { sendCode, userbind } from "@/api/member";
import { Popup, Toast, CountDown, Notify } from "vant";

export default {
  components: {
    [field.name]: field,
    [CountDown.name]: CountDown,
    [fieldGroup.name]: fieldGroup,
    [Notify.name]: Notify
  },
  data() {
    return {
      counting: true,
      smscode: "",
      password: "",
      repeatPassword: "",
      time: 60 * 1000,
      name: "",
      mobile: ""
    };
  },
  mounted() {
    // debugger;
    let params = this.$route.params;
    const name = this.$route.params.name;
    const fmobile = this.$route.params.mobile;
    this.mobile = fmobile;
    // this.setHeight();
  },
  methods: {
    async validate() {
      const result = await this.$validator.validate();
      if (!result) {
        const errMsg = this.errors.items[0].msg;
        Toast(errMsg);
        throw new Error(`表单验证: ${errMsg}`);
      }
    },
    async registerSubmit() {
      // 验证
      try {
        await this.validate();
        await this.bind();
        this.$router.push({
          name: "registerStatus",
          params: { status: "success",mobile:this.mobile,password:this.password }
        }); // this.isLogining = false;
      } catch (err) {
        console.log(err.message);
        // this.isLogining = false;
      }
    },

    async getCode() {
      try {
        this.counting = false;
        // const vv = await this.$validator.validate(
        //   "mobile",
        //   this.$route.params.mobile
        // );
        // if (!vv) {
        //   const err = this.errors.first("mobile");
        //   Notify(err);
        //   throw new Error(err);
        // }
        sendCode(this.mobile).then(response => {
          const { code, msg } = response;
          if (code === 100) {
            Notify("验证码发送成功，注意查收！");
          } else {
            Notify(msg);
            this.$refs.countDown.reset();
          }
        });
      } catch (err) {
        // debugger;
        this.counting = true;
      }
    },
    async bind() {
      const { name, mobile } = this.$route.params;
      const smscode = this.smscode;
      const password = this.password;
      const params = { name, mobile, code: smscode, password };
      const { code, msg } = await userbind(params);
      if (code === -100) {
        Toast(msg);
        throw new Error(`用户验证: ${msg}`);
      }
    },
    // countdownend() {
    //   this.counting = false;
    // },
    onFinish() {
      this.counting = true;
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../../assets/less/mixin/border";

.register_submit {
  padding-top: 40px;
  background-color: #fff;
}

.register_submit_btn {
  padding-top: 30px;
}

.getCode {
  .border(left);
  text-align: center;
}

.time_down {
  color: @red;
}
</style>
