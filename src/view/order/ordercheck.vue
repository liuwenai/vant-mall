<template>
  <div class="order">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell v-if="checkedAddress" isLink @click="show = true" title="收货地址">
        <div slot="label">
          <div>
            <span>{{ checkedAddress.name }}</span>
            <span>{{ checkedAddress.tel }}</span>
          </div>
          <div>{{ checkedAddress.address }}</div>
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

    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '50%', overflow:scoll }"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @click-item="onSelect"
        @add="onAdd"
      />
    </van-popup>
  </div>
</template>

<script>
import { Card, Tag, ard, Field, SubmitBar, Toast, NavBar } from "vant";
import { CouponCell, CouponList, Popup, AddressList } from "vant";
import {
  itemorderlist,
  mordersave,
  itemordershow,
  morderlist,
  morderupdate,
  addresslist
} from "@/api/mall";
import { getLocalStorage, setLocalStorage } from "@/core/utils/local-storage";
import dayjs from "dayjs";

export default {
  data() {
    return {
      show: false,
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
      id: "",
      chosenAddressId: -1,
      addressList: [],
      infoData: []
    };
  },
  mounted() {
    // this.id = this.$route.query.id;
    // debugger;
    this.load();
    this.loadd();
  },

  methods: {
    load() {
      // const id = this.$router.query.id;
      morderlist().then(res => {
        const { rows } = res;
        rows.forEach(items => {
          if (items.id == this.$route.query.id) {
            // const { books } = items.books;
            // items.books.forEach(item => {
            //   this.checkedGoodsList.push(item.book);
            // });
            this.id = items.id;
            this.checkedGoodsList = items.books;
            this.goodsTotalPrice = items.fddje;
            this.fddbh = items.fddbh;
            this.freightPrice = items.fddyf;
            this.orderTotalPrice = items.fddje + items.fddyf;
            this.checkedAddress.name = items.name;
            this.checkedAddress.tel = items.tel;
            this.checkedAddress.address =
              items.province +
              items.city +
              items.county +
              " " +
              items.addressDetail;
          }
        });
      });
    },
    async loadd() {
      this.infoData = await getLocalStorage(
        "Authorization",
        "nick_name",
        "user_id",
        "background_image",
        "avatar",
        "login"
      );
      addresslist().then(res => {
        const { rows } = res;
        for (var i = 0; i < rows.length; i++) {
          var item = rows[i];
          if (item.user.id == this.infoData.user_id) {
            this.addressList.push({
              id: item.id,
              name: item.name,
              tel: item.tel,
              address:
                item.province +
                item.city +
                item.county +
                " " +
                item.addressDetail,
              isDefault: item.default
            });
            if (item.default === true) {
              this.chosenAddressId = item.id;
            } else {
              this.chosenAddressId = rows[0].id;
            }
          }
        }
      });
    },
    onSelect(item, index) {
      this.show = false;
      this.checkedAddress = item;
    },
    onAdd() {
      this.show = false;
      this.$router.push({ name: "editaddress", query: { addressId: -1 } });
      debugger;
    },
    onSubmit() {
      const data = {
        id: this.id,
        books: this.checkedGoodsList,
        fddje: this.goodsTotalPrice,
        fddbh: this.fddbh,
        fddyf: this.freightPrice,
        name: this.checkedAddress.name,
        tel: this.checkedAddress.tel,
        address: this.checkedAddress.address,
        fddzt: "2"
      };
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
    [Popup.name]: Popup,
    [AddressList.name]: AddressList
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