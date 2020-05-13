<template>
  <div>
    <van-nav-bar title="付款" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="time_down payment_group">
      <span class="red">
        <van-count-down format="HH:mm:ss:SS" :time="time" @finish="onFinish">
          <template v-slot="timeData">
            <span class="item">剩余付款时间:{{timeData.minutes}}分{{timeData.seconds}}秒</span>
          </template>
        </van-count-down>
      </span>
    </div>

    <van-cell-group class="payment_group">
      <van-cell title="订单编号" :value="fddbh" />
      <van-cell title="实付金额">
        <span class="red">{{fzje}}</span>
      </van-cell>
    </van-cell-group>
    <!-- <van-card
      num="1"
        tag="会员"
      price="100.00"
      desc="一年费用"
      title="会员费"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    />-->
    <div class="pay_way_group">
      <div class="pay_way_title">选择支付方式</div>
      <van-radio-group v-model="payWay">
        <van-cell-group>
          <van-cell>
            <van-radio label="ali" name="ali">
              <img src="../../assets/images/ali_pay.png" alt="支付宝" width="82" height="29" />
            </van-radio>
          </van-cell>

          <van-cell>
            <van-radio label="wx" name="wx">
              <img src="../../assets/images/wx_pay.png" alt="微信支付" width="113" height="23" />
            </van-radio>
          </van-cell>

          <van-cell>
            <van-radio label="up" name="up">
              <img src="../../assets/images/up_pay.png" alt="信用卡支付" width="113" height="23" />
            </van-radio>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <van-button
      class="pay_submit"
      @click="paySubmit"
      :loading="isSubmit"
      type="primary"
      bottomAction
    >去支付</van-button>
  </div>
</template>

<script>
import {
  CellGroup,
  Cell,
  Radio,
  RadioGroup,
  NavBar,
  Button,
  Card,
  Toast,
  Notify,
  CountDown
} from "vant";

export default {
  name: "payment",
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Card.name]: Card,
    [CountDown.name]: CountDown
  },
  data() {
    return {
      time: 1 * 60 * 60 * 1000,
      counting: true,
      isSubmit: false,
      payWay: "ali",
      fddbh:[],
      fzje: 0,
      html: ""
    };
  },
  // mounted() {
  //   const { bh, je } = this.$route.params;
  //   this.bh = bh;
  //   this.je = je;
  //   // this.loadAli();
  // },
  computed: {
    sfje() {
      return this.je;
    }
  },
  mounted(){
    const { fddbh, fzje } = this.$route.params;
    this.fddbh = fddbh
    this.fzje = fzje
    // debugger
    // this.load()
  },
  methods: {
    // 
    paySubmit() {
      Notify("支付通道暂未开通！");
      return;
    },
    loadUp() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    onFinish() {
      this.counting = false;
    }
  }
};
</script>

<style lang="less" scoped>
.payment_group {
  margin-bottom: 10px;
}
.time_down {
  background-color: #fffeec;
  padding: 10px 15px;
}
.pay_submit {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.pay_way_group img {
  vertical-align: middle;
}
.pay_way_title {
  padding: 15px;
  background-color: #fff;
}
</style>