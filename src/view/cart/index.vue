<template>
  <div class="tab-cart">
    <div class="editor_head" v-show="goods.length">
      <van-icon :name="isEditor ? 'success' : 'editor'" />
      <span @click="isEditor = !isEditor">{{ isEditor ? '完成' : '编辑' }}</span>
    </div>
    <van-checkbox-group v-model="checkedGoods" ref="checkboxGroup">
      <div v-for="(book, index) in goods" :key="index" class="card-goods__item">
        <van-checkbox :key="book.id" :name="book.id" v-model="book.checked"></van-checkbox>
        <van-card
          :key="book.id"
          :title="book.title"
          :price="book.price + '.00'"
          :thumb="book.picUrl"
        >
          <div slot="footer">
            <van-stepper v-model="book.num" async-change max="3" />
          </div>
        </van-card>
        <div class="cart_delete" v-if="isEditor" @click="deleteCart(book.id)">删除</div>
      </div>
    </van-checkbox-group>
    <is-empty v-if="!goods.length">您的购物车空空如也~</is-empty>
    <van-submit-bar
      style="bottom: 50px"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :buttonText="submitBarText"
      :loading="isSubmit"
      label="总计"
      @submit="cartSubmit"
    >
      <van-checkbox v-model="checkedAll" @click="setCheckAll" style="padding: 0 10px;">全选</van-checkbox>
    </van-submit-bar>
    <BaseFooter />
  </div>
</template>

<script>
import BaseFooter from "@/components/base/basefooter";
import isEmpty from "@/components/is-empty/";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Toast,
  NavBar,
  Stepper
} from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import {
  itemorderlist,
  bookshow,
  itemorderupdate,
  itemorderdelete
} from "@/api/mall";
import { getLocalStorage, setLocalStorage} from "@/core/utils/local-storage";
import _ from 'lodash';

export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [BaseFooter.name]: BaseFooter,
    [isEmpty.name]: isEmpty,
    [Button.name]: Button,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [CheckboxGroup.name]: CheckboxGroup
  },

  data() {
    return {
      checkedAll: false,
      isSubmit: false,
      isEditor: false,
      // checked: true,
      checkedGoods: [],
      allGoods: [],
      goods: [],
      num: "",
      book: [],
      infoData: []
    };
  },
  computed: {
    submitBarText() {
      return this.isEditor ? "删除" : "结算";
    },
    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total +
          (this.checkedGoods.indexOf(item.id) !== -1
            ? item.price * item.num * 100
            : 0),
        0
      );
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let that = this;
      that.infoData = getLocalStorage("user_id");
      debugger
      itemorderlist().then(res => {
        const { rows } = res;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].user.id === parseInt(that.infoData.user_id)) {
            bookshow({ id: rows[i].goodsId }).then(response => {
              const good = response.row;
              this.goods.push({
                id: rows[i].id,
                num: rows[i].number,
                title: good.title,
                price: good.price
              });        
              this.allGoods = this.getAllList();
              this.checkedGoods = this.getCheckedList(this.goods);
            });
          }
        }
      });
    },
    getAllList() {
      let result = [];
      _.each(this.goods, v => {
        result.push(v.id);
      });
      return result;
    },
    getCheckedList(goods) {
      let result = [];
      _.each(goods, v => {
        if (v.checked) {
          result.push(v.id);
        }
      });
      return result;
    },
    setCheckAll(val) {
      if (this.checkedGoods.length === this.allGoods.length) {
        this.checkedGoods = [];
      } else {
        this.checkedGoods = this.allGoods;
      }
    },
    cartSubmit(){
      debugger
      let checkedGoods = this.checkedGoods;
      // this.isSubmit = true;
      // setLocalStorage({addresses:{id: 0}, CartId: 0, CouponId: 0});
      this.$router.push({ name: 'ordercheck' })
    },
    deleteCart(o) {
      itemorderdelete({ id: o }).then(res => {
        debugger;
        this.$toast("删除成功");
        this.isEditor = false;
        this.goods = [];
        this.load()
      });
    }
  }
};
</script>

<style lang="less">
.tab-cart {
  padding-bottom: 50px;
  box-sizing: border-box;
}
.editor_head {
  text-align: right;
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
}
.card-goods__item {
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  .van_card {
    width: 250px;
  }
}
.cart_delete {
  background-color: #f2f2f2;
  line-height: 100px;
  padding: 0 10px;
  color: #fff;
  background-color: #db3d3c;
}
</style>
