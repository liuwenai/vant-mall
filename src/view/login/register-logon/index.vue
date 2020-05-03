<template>
  <md-field-group class="register_submit">
    <div>用户注册</div>
    
    <md-field
      required
      v-model="fzh"
      v-validate="'required|fzh'"
      data-vv-as="手机号"
      name="fzh"
      icon="manager"
      placeholder="账号"
    />
    <md-field
      required
      v-validate="'required'"
      :data-vv-as="fmc"
      v-model="name"
      name="name"
      icon="user-o"
      placeholder="用户名"
    />
    <md-field
      required
      ref="mobile"
      v-model="mobile"
      v-validate="'required|mobile'"
      data-vv-as="手机号"
      name="mobile"
      icon="phone-o"
      placeholder="手机号"
    />

    <md-field
      v-model="smscode"
      name="smscode"
      data-vv-as="请输入验证码"
      v-validate="'required|min:4'"
      icon="certificate"
      placeholder="请输入验证码"
    >
      <div slot="rightIcon" class="getCode red">
        <!-- <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template> -->
        <span v-if="counting" @click="getCode">获取验证码</span>
        <van-count-down v-else ref="countDown" :time="time" format="ss 秒后获取" @finish="onFinish" />
      </div>
    </md-field>
    <md-field
      v-model="password"
      icon="lock"
      placeholder="密码"
      :type="visiblePass ? 'text' : 'password'"
      :right-icon="visiblePass ? 'eye-o' : 'closed-eye'"
      v-validate="'required|min:6'"
      data-vv-as="密码"
      name="password"
      @right-click="visiblePass = !visiblePass"
    />
    <!-- <md-field
      v-model="repeatPassword"
      icon="lock"
      placeholder="请再次确认密码"
      :type="visiblePass ? 'text' : 'password'"
      :right-icon="visiblePass ? 'eye-o' : 'closed-eye'"
      v-validate="{is:password}"
      data-vv-as="确认密码"
      name="confirmpassword"
      @right-click="visiblePass = !visiblePass"
    /> -->

    <div class="register_submit_btn">
      <van-button type="danger" size="large" @click="registerSubmit">确定</van-button>
    </div>
  </md-field-group>
</template>

<script>
import field from "@/components/field/";
import fieldGroup from "@/components/field-group/";
import {
  Row,
  Col,
  Popup,
  Toast,
  CountDown,
  Notify,
  RadioGroup,
  Radio,
  Cell,
  CellGroup
} from "vant";
import { usersave } from "@/api/mall";

export default {
  components: {
    [field.name]: field,
    [CountDown.name]: CountDown,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [fieldGroup.name]: fieldGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      visiblePass: false,
      fzh: "",
      fmc: "用户名",
      name: "",
      mobile: "",
      counting: true,
      smscode: "",
      password: "",
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

    async registerSubmit() {
      // 验证
      try {
        await this.validate();
        // await this.bind();
        let params = {
          userzh: this.fzh,
          usermc: this.name,
          phone: this.mobile,
          password: this.password
        };
        usersave(params).then(response => {
          const { code, msg, data = {} } = response;
          if (code === 100) {
            this.$router.push({
              name: "registerStatus",
              params: {
                status: "success",
                phone: this.mobile,
                password: this.password
              }
            }); // this.isLogining = false;
            return;
          } else if (code === -100) {
            Toast(msg);
            if (Object.keys(data).length > 0) {
              this.$router.push({
                name: "registerGetCode",
                params: data
              });
            }
          }
        });
      } catch (err) {
        console.log(err);
        // this.isLogining = false;
      }
    },
    // async check() {
    //   const name = this.name;
    //   const mobile = this.mobile;
    //   const { code, msg, data = {} } = await usercheck(name, mobile);
    //   if (code === -100) {
    //     // debugger;
    //     Toast(msg);
    //     throw new Error(`用户验证: ${msg}`);
    //   }
    // }
    async getCode() {
      this.counting = false;
      try {
        const vv = await this.$validator.validate("mobile", this.mobile);
        if (!vv) {
          this.counting = true;
          // this.$refs.mobile.focus()
          this.$refs.countDown.reset();
          const msg = this.errors.items[0].msg;
          Notify(msg);
          throw new Error(msg);
        }
        registerCode(this.mobile).then(response => {
          const { code, msg } = response;
          if (code === 100) {
            Notify("验证码发送成功，注意查收！");
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    onFinish() {
      this.counting = true;
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/mixin/var";
@import "../../../assets/less/mixin/border";

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
