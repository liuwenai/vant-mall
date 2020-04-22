<template>
  <div class="payment_status">
    <div class="status_top">
      <van-icon :name="statusIcon" :class="statusClass" />
      <div>{{statusText}}</div>
    </div>

    <div class="status_text">
      <van-count-down :time="time" format="ss秒" @finish="onFinish" />后返回到登录页, 您也可以
      <router-link :to="{name:'login',params:this.$route.params}"  class="red">点此登录</router-link>
    </div>
  </div>
</template>

<script>
import { CountDown } from "vant";

export default {
  name: "payment-status",

  props: {
    status: String
  },
  components: {
    [CountDown.name]: CountDown
  },
  data() {
    return {
      isSuccess: true,
      time: 3 * 1000
    };
  },

  computed: {
    statusText() {
      return this.isSuccess ? "注册成功" : "注册失败";
    },
    statusIcon() {
      return this.isSuccess ? "checked" : "fail";
    },
    statusClass() {
      return this.isSuccess ? "success_icon" : "fail_icon";
    }
  },
  methods: {
    activated() {
      this.isSuccess = this.status === "success";
    },
    onFinish() {
      this.$router.push({name:"login",params:this.$route.params});
    }
  }
};
</script>


<style lang="less" scopd>
@import "../../../assets/less/mixin/var";

.payment_status {
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
}

.status_top {
  margin-bottom: 15px;
  i {
    margin-bottom: 5px;
  }
  > div {
    font-size: 18px;
  }
}

.status_text {
  color: @font-color-gray;
  margin-bottom: 50px;
}

.status_icon {
  font-size: 80px;
}

i.success_icon {
  .status_icon();
  color: #06bf04;
}

i.fail_icon {
  .status_icon();
  color: #f44;
}
</style>
