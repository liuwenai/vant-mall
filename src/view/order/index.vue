<template>
  <div class="order_list">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <!-- <van-tabs v-model="activeIndex" :swipe-threshold="5" @click="handleTabClick">
    <van-tab v-for="(tabTitle, index) in tabTitles" :title="tabTitle" :key="index">-->
    <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="load">
      <van-panel
        v-for="(el, i) in orderList"
        :key="i"
        :title="'订单编号: ' + el.fddbh"
        :status="el.orderStatusText"
      >
        <van-cell title="订单地址">
          <div slot="label">
            <div>
              <span>{{ el.name }}</span>
              <span>{{ el.tel }}</span>
            </div>
            <div v-if="el.address != null">{{ el.address }}</div>
            <div v-else>
              {{ el.province +
              el.city +
              el.county +
              " " +
              el.addressDetail }}
            </div>
          </div>
        </van-cell>
        <van-card
          v-for="(goods, goodsI) in el.books"
          :key="goodsI"
          :title="goods.title"
          :num="goods.gmsl"
          :thumb="'http://localhost:9090/static/'+goods.url"
        ></van-card>
        <div class="total">合计: {{ el.fddje }} 元</div>

        <div slot="footer" class="footer_btn">
          <van-button size="small" v-if="el.fddzt === '0'" @click.stop="delCancle(el.id)">取消订单</van-button>
          <van-button size="small" v-if="el.fddzt === '0'" type="danger" @click.stop="toPay(el)">去支付</van-button>
          <van-button
            size="small"
            v-if="el.fddzt !== '0'"
            type="danger"
            @click.stop="sorry(el.id)"
          >退款</van-button>
          <van-button
            size="small"
            v-if="el.fddzt !== '0'"
            type="danger"
            @click.stop="sorry(el.id)"
          >确认收货</van-button>
          <van-button size="small" @click.stop="delOrder(el.id)">删除订单</van-button>
        </div>
      </van-panel>
    </van-list>
    <!-- </van-tab>
    </van-tabs>-->
  </div>
</template>

<script>
import { morderlist, morderdelect, morderupdate } from "@/api/mall";
import _ from "lodash";
import { Tab, Tabs, Panel, Card, List, Tag, Dialog, NavBar } from "vant";

export default {
  name: "order-list",

  props: {
    active: {
      type: [String, Number],
      default: 0
    }
  },
  mounted() {
    this.load();
  },
  data() {
    return {
      activeIndex: Number(this.active),
      tabTitles: ["我的订单"],
      orderList: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  methods: {
    load() {
      let that = this;
      morderlist().then(res => {
        that.orderList = res.rows;
      });
      this.finished = true;
    },
    delOrder(id) {
      let that = this;
      this.$dialog
        .confirm({ message: "确定要删除该订单吗?" })
        .then(() => {
          morderdelect({ id: id }).then(() => {
            this.load();
            this.$toast("已删除订单");
          });
        })
        .catch(() => {});
    },
    delCancle(id) {
      let that = this;
      this.$dialog
        .confirm({ message: "确定要取消该订单吗?" })
        .then(() => {
          morderdelect({ id: id }).then(() => {
            this.load();
            this.$toast("已取消订单");
          });
        })
        .catch(() => {});
    },
    toPay(data) {
      data.fddzt = "2";
      morderupdate(data).then(res => {
        this.$router.push({
          name: "pay",
          params: { fddbh: data.fddbh, fzje: data.fddje + data.fddyf }
        });
      });
    },
    onClickLeft() {
      this.$router.push({ name: "user" });
    },
    sorry(id) {
      this.$toast("暂无后续逻辑~");
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar
  }
};
</script>

<style lang="less" scoped>
.order_list {
  .van-panel {
    margin-top: 20px;
  }

  .van-card {
    background-color: #fff;
  }

  .total {
    text-align: right;
    padding: 10px;
  }

  .footer_btn {
    text-align: right;
    .van-button {
      margin-left: 10px;
    }
  }
}
</style>
