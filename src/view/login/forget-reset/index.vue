<template>
  <md-field-group class="foget_view">
    <div>重置密码</div>

    <md-field
      v-model="username"
      icon="user-circle-o"
      placeholder="账号"
      right-icon="close"
      v-validate="'required|fzh'"
      name="username"
      data-vv-as="账号"
    />
    <md-field
      name="password"
      ref="password"
      :type="visiblePass ? 'text' : 'password'"
      :right-icon="visiblePass ? 'eye-o' : 'closed-eye'"
      v-model="password"
      icon="lock"
      :is-error="isErrow"
      data-vv-as="密码"
      v-validate="'required|min:6|max:18'"
      placeholder="请输入新密码"
      @right-click="visiblePass = !visiblePass"
    />

    <md-field
      name="password2"
      v-model="password2"
      icon="lock"
      :type="visiblePass1 ? 'text' : 'password'"
      :right-icon="visiblePass1 ? 'eye-o' : 'closed-eye'"
      v-validate="'required|confirmed:password'"
      data-vv-as="密码"
      :is-error="isErrow"
      placeholder="请再次输入密码"
      @right-click="visiblePass1 = !visiblePass1"
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
import { userupdate, userlist } from "@/api/mall";
import { Notify, Toast } from "vant";

export default {
  components: {
    [Notify.name]: Notify,
    [Toast.name]: Toast
  },
  data() {
    return {
      visiblePass: false,
      visiblePass1: false,
      username: "",
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
        const username = this.username;
        const password = this.password;
        // const params = {username,password}
        userlist().then(res => {
          const { rows } = res;
          rows.forEach(items => {
            let row = rows.find(item => item.userzh === username);
            if (row) {
              items.password = password;
              userupdate(items).then(response => {
                const { code, msg } = response;
                if (code === 100) {
                  this.$router.push("/login");
                }
              });
            } else {
              this.$toast("用户不存在,请输入正确的账号");
            }

            // debugger
            // if (items.userzh === username) {
            //   items.password = password;
            //   // const params = { username, password }
            //   userupdate(items).then(response => {
            //     const { code, msg } = response;
            //     Notify(msg);
            //     if (code === 100) {
            //       this.$router.push("/login");
            //     }
            //   });
            // } else {
            //   this.$toast("用户不存在,请输入正确的账号");
            // }
          });
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

.store_name {
  position: relative;
  background-color: #fff;
  text-align: center;
  padding: 60px 0;
  padding-top: 5px;
  font-size: 16px;
}
</style>
