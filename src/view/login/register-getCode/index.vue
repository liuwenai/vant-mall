<template>
  <md-field-group class="register_view">
    <div>用户信息验证</div>
    <md-field
      v-validate="'required'"
      data-vv-as="姓名"
      v-model="name"
      name="name"
      icon="user-o"
      cleaable
      placeholder="姓名"
    />
    <md-field
      v-model="mobile"
      v-validate="'required|mobile'"
      data-vv-as="手机号"
      name="mobile"
      icon="phone-o"
      placeholder="手机号"
    />

    <div class="register_submit">
      <van-button size="large" type="danger" @click="submitCode">下一步</van-button>
    </div>

    <div class="register_footer">
      已有账号?
      <router-link to="/login" class="red">登录</router-link>
    </div>
  </md-field-group>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import { Popup, Toast } from "vant";
import { usercheck } from "@/api/member";

export default {
  data() {
    return {
      name: "",
      mobile: ""
    };
  },
  mounted() {
    const { name, mobile } = this.$route.params;
    if (name !== undefined && name !== "") {
      this.name = name;
    }
    if (mobile !== undefined && mobile !== "") {
      this.mobile = mobile;
    }
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
      // 验证
      try {
        await this.validate();
        await this.check();
        this.$router.push({
          name: "registerSubmit",
          params: { name: this.name, mobile: this.mobile }
        });
        // this.isLogining = false;
      } catch (err) {
        console.log(err.message);
        // this.isLogining = false;
      }
    },
    async check() {
      const name = this.name;
      const mobile = this.mobile;
      const { code, msg } = await usercheck(name, mobile);
      if (code === -100) {
        Toast(msg);
        throw new Error(`用户验证: ${msg}`);
      }
    }
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/mixin/var";

div.register_view {
  background-color: #fff;
  padding-top: 30px;
}

div.register_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}

.register_footer {
  text-align: right;
  color: @font-color-gray;
}
</style>
