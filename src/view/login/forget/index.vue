<template>
  <md-field-group class="foget_view">
    <md-field
      v-model="mobile"
      v-validate="'required|mobile'"
      data-vv-as="手机号"
      name="mobile"
      icon="phone-o"
      placeholder="手机号"
    />

    <md-field v-validate="'required'" name="code" v-model="code" icon="lock" placeholder="请输入短信验证码">
      <div slot="rightIcon" class="getCode red">
        <span v-if="counting" @click="getCode">获取验证码</span>
        <van-count-down ref="countDown" v-else :time="time" format="ss 秒后获取" @finish="onFinish" />
      </div>
    </md-field>

    <div class="foget_submit">
      <van-button size="large" type="danger" @click="submitCode">下一步</van-button>
    </div>
  </md-field-group>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import { Popup, Toast, CountDown, Notify } from "vant";
import { usercheck, usersave, sendCode } from "@/api/member";

export default {
  data() {
    return {
      counting: true,
      mobile: "",
      code: "",
      time: 60 * 1000
    };
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

    async submitCode() {
      try {
        await this.validate();
        this.$router.push({ name: "forgetReset",params:{username:this.mobile,code:this.code} });
      } catch (err) {
        console.log(err.message);
        // this.isLogining = false;
      }
    },
    async getCode() {
      try {
        this.counting = false;
        const vv = await this.$validator.validate("mobile", this.mobile);
        if (!vv) {
          const err = this.errors.first("mobile");
          Notify(err);
          throw new Error(err);
        }
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
    onFinish() {
      this.counting = true;
    }
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup,
    [CountDown.name]: CountDown,
    [Notify.name]: Notify
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/mixin/border";

div.foget_view {
  background-color: #fff;
  padding-top: 30px;
}

div.foget_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}

.getCode {
  .border(left);
  text-align: center;
}

.time_down {
  color: @red;
}
</style>
