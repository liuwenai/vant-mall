<template>
  <md-field-group class="foget_view">
    <md-field
      name="password"
      ref="password"
      v-model="password"
      icon="lock"
      :is-error="isErrow"
      data-vv-as="密码"
      v-validate="'required|min:6|max:18'"
      placeholder="请输入新密码"
    />

    <md-field
      name="password2"
      v-model="password2"
      type="password"
      icon="lock"
      v-validate="'required|confirmed:password'"
      data-vv-as="密码"
      :is-error="isErrow"
      placeholder="请再次输入密码"
    />
    <div class="red" v-show="isErrow">两次密码输入不一致</div>

    <div class="foget_submit">
      <van-button size="large" type="danger" @click="submitCode">重置</van-button>
    </div>
  </md-field-group>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import { resetPwd } from "@/api/member";
import { Notify } from "vant";

export default {
  components: {
    [Notify.name]: Notify
  },
  data() {
    return {
      isErrow: false,
      password: "",
      password2: ""
    };
  },

  methods: {
    async submitCode() {
      try {
        const vv = await this.$validator.validate();
        if (!vv) {
          const msg = this.errors.items[0].msg;
          Notify(msg);
          throw new Error(msg);
        }
        const params = this.$route.params
        params['password'] = this.password
        params['password2'] = this.password2
        debugger
        resetPwd(params).then(response => {
          const { code, msg } = response;
          Notify(msg);
          if (code === 100) {
            this.$router.push("/login");
          }
        });
      } catch (err) {}
    }
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup
  }
};
</script>

<style lang="less" scoped>
div.foget_view {
  background-color: #fff;
  padding-top: 30px;
}

div.foget_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}
</style>
