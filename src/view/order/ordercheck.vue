<template>
  <div class="order">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell v-if="checkedAddress" isLink @click="goAddressList()" title="收货地址">
        <div slot="label">
          <div>
            <span>{{ checkedAddress.name }}</span>
            <span>{{ checkedAddress.tel }}</span>
          </div>
          <div>{{ checkedAddress.addressDetail }}</div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-card
      v-for="item in checkedGoodsList"
      :key="item.id"
      :title="item.title"
      :num="item.gmsl"
      :price="item.price +'.00'"
      :thumb="item.picUrl"
    ></van-card>

    <van-cell-group>
      <van-cell title="订单编号">
        <span>{{ fddbh }}</span>
      </van-cell>
      <van-cell title="商品金额">
        <span class="red">{{goodsTotalPrice }}元</span>
      </van-cell>
      <van-cell title="邮费">
        <span class="red">{{ freightPrice }}元</span>
      </van-cell>
      <!-- <van-field v-model="message" placeholder="请输入备注" label="订单备注">
        <template slot="icon">{{message.length}}/50</template>
      </van-field>-->
    </van-cell-group>

    <van-submit-bar
      :price="orderTotalPrice*100"
      label="总计："
      buttonText="提交订单"
      :disabled="isDisabled"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Card, Tag, ard, Field, SubmitBar, Toast, NavBar } from "vant";
import { CouponCell, CouponList, Popup } from "vant";
import {
  itemorderlist,
  mordersave,
  itemordershow,
  morderlist,
  morderupdate
} from "@/api/mall";
import { getLocalStorage, setLocalStorage } from "@/core/utils/local-storage";
import dayjs from "dayjs";

export default {
  data() {
    return {
      checkedGoodsList: [],
      checkedAddress: {},
      goodsTotalPrice: 0, //商品总价
      freightPrice: 0, //快递费
      orderTotalPrice: 0, //订单总价
      message: "",
      isDisabled: false,
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      checkedGoods: [],
      fddbh: "",
      id :""
    };
  },
  mounted() {
    // this.id = this.$route.query.id;
    // debugger;
    this.load();
  },

  methods: {
    goAddressList() {
      this.$router.push({
        path: "address"
      });
    },
    load() {
      // const id = this.$router.query.id;
      debugger;
      morderlist().then(res => {
        const { rows } = res;
        rows.forEach(items => {
          if (items.id == this.$route.query.id) {
            // const { books } = items.books;
            // items.books.forEach(item => {
            //   this.checkedGoodsList.push(item.book);
            // });
            this.id = items.id
            this.checkedGoodsList = items.books;
            this.goodsTotalPrice = items.fddje;
            this.fddbh = items.fddbh;
            this.freightPrice = items.fddyf;
            this.orderTotalPrice = items.fddje + items.fddyf;
            this.checkedAddress.name = items.name;
            this.checkedAddress.tel = items.tel;
            this.checkedAddress.addressDetail = items.address;
          }
        });
      });
    },
    onSubmit() {
      debugger;
      const data = {
        id: this.id,
        books: this.checkedGoodsList,
        fddje: this.goodsTotalPrice,
        fddbh: this.fddbh,
        fddyf: this.freightPrice,
        name: this.checkedAddress.name,
        tel: this.checkedAddress.tel,
        address: this.checkedAddress.addressDetail,
        fddzt: '2'
      };
      debugger;
      morderupdate(data).then(res => {
        this.$router.push({
          name: "pay",
          params: { fddbh: data.fddbh, fzje: data.fddje + data.fddyf }
        });
      });
    }
  },

  components: {
    [Toast.name]: Toast,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [Field.name]: Field,
    [Tag.name]: Tag,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [NavBar.name]: NavBar,
    [Popup.name]: Popup
  }
};
</script>


<style lang="less">
.order-coupon {
  margin-top: 10px;
}

.van-cart {
  margin: 10px;
  background-color: white;
}
</style>