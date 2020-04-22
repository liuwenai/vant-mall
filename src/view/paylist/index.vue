<template>
  <div>
    <van-nav-bar title="缴费记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-row>
      <van-col :span="24" v-for="(item,index) in rows" :key="index">
        <van-panel v-if="item != 0" class="box-card" :title="'第'+(index+1)+'次缴费'">
          <!-- <template slot="header">
            <div >第 {{index+1}} 次缴费</div>
          </template> -->
          <div class="content">
            <div>缴费日期:&nbsp;{{item.fdate}}</div>
            <div>到期日期:&nbsp;{{item.fenddate}}</div>
            <div>缴费金额:&nbsp;{{item.fje}}</div>
            <div>缴费方式:&nbsp;{{fhyztMap[item.fhyzt]}}</div>
            <div>缴费人:&nbsp;{{item.fjfr}}</div>
          </div>
        </van-panel>
      </van-col>
     
    </van-row>
     <div class="center" v-if="rows.length === 0">
        暂无缴费记录
     </div>
    
  </div>
</template>

<script>
import types from '../../mix/types'
import { Panel, NavBar, Toast, Col, Row } from "vant";
import { userpaylist, usersaveOrder } from "@/api/member";

export default {
  name: "paylist",
  components: {
    [Panel.name]: Panel,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row
  },
  mixins:[types],
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      Toast.loading({
        message: "加载缴费记录",
        forbidClick: true,
        loadingType: "spinner"
      });
      userpaylist()
        .then(response => {
          if (response.code == -100) {
            this.$notify({
              title: "提示",
              message: response.msg,
              type: "error"
            });
            return;
          }
          this.rows = response.rows;
          Toast.clear();
        })
        .catch(err => {
          Toast.clear();
        });
    },
    paySubmit() {
      this.$router.push({
        name: "paymentStatus",
        params: {
          status: "success"
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.van-panel__header {
  background-color:#1989fa;
  color: white
}
.box-card {
  padding-bottom: 5px;
  height: 180px;
}
.content {
  padding: 20px;
  font-size: 12px;
}
.center {
  position: absolute;
  top:50%;
  height: 100vh;
  width: 100%;
  text-align: center;
}
</style>