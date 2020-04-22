<template>
  <div class="order-goods">
    <van-nav-bar title="会员缴费" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-card
      :num="step"
      tag="会员"
      :price="fje"
      desc="一年费用"
      title="会员费"
    >
    <div slot="thumb">
      <img src="../../assets/images/logo.png" style="width:80px;">
    </div>
      <div slot="footer">
        <van-stepper
          v-model="step"
          async-change
          max="5"
          @change="onChange"
        />
      </div>
    </van-card>
    <van-cell-group>
      <van-cell title="姓名" :value="name"></van-cell>
      <van-cell title="手机号" :value="mobile"></van-cell>
      <van-cell title="机构" :value="jg"></van-cell>
      <van-cell title="职务" :value="zw"></van-cell>
      <van-cell title="优惠">
        <span class="red">0</span>
      </van-cell>
      <van-field v-model="fnote" placeholder="请输入备注" label="备注">
        <template slot="icon">3/50</template>
      </van-field>
    </van-cell-group>
    <van-submit-bar :price="100 * fje" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { Card, Field, SubmitBar, Dialog, NavBar, Toast, Stepper } from "vant";
import { userinfo, usersaveOrder } from "@/api/member";

export default {
  name: "order",
  components: {
    [Card.name]: Card,
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    [Dialog.name]: Dialog,
    [Stepper.name]: Stepper,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      jg: "",
      zw: "",
      name: "",
      mobile: "",
      fnote: "",
      fje: 100,
      step: 1
    };
  },
  mounted() {
    this.loadUser();
  },

  methods: {
    loadUser() {
      Toast.loading({
        message: "加载用户...",
        forbidClick: true,
        loadingType: "spinner"
      });
      userinfo()
        .then(response => {
          if (response.code === 100) {
            this.jg = response.data.bdepartment.fmc;
            this.zw = response.data.mzhzw.fmc;
            this.name = response.data.fname;
            this.mobile = response.data.fmobile;
            Toast.clear();
          }
        })
        .catch(err => {
          Toast.clear();
        });
    },
    // 提交订单前，需要调用接口保存订单，保存成功后，跳转到下一页
    onSubmit() {
      Dialog.confirm({
        title: "提示",
        message: "确认提交订单?"
      })
        .then(() => {
          Toast.loading({
            message: "处理订单...",
            forbidClick: true,
            loadingType: "spinner"
          });
          const params = { fje: this.fje, fdesc: `${this.name}的会员费` };
          usersaveOrder(params)
            .then(response => {
              if (response.code === 100) {
                this.$router.push({
                  name: "pay",
                  params: { ...response.data }
                });
              }
              Toast.clear();
            })
            .catch(err => {
              Toast.clear();
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(v){
      this.fje = v * 100
    }
  }
};
</script>
<style lang="less" scoped>
.order-goods {
  background-color: #fff;
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100vw;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  background: #fff;
  input {
    width: 70vw;
    height: 50px;
    border-radius: 5px 0 0 5px;
    outline: 0;
    border: 0;
    padding-left: 10px;
  }
}
</style>
