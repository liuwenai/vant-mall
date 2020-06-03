<template>
  <div class="tab-cart">
    <div class="editor_head" v-show="goods">
    </div>
    <van-checkbox-group v-model="checkedGoods" @change="totalAdd" ref="checkboxGroup">
      <div v-for="(book, index) in goods" :key="index" class="card-goods__item">
        <van-checkbox :key="book.id" :name="book"></van-checkbox>
        <van-swipe-cell>
          <van-card
            :key="book.bookid"
            :title="book.title"
            :price="book.price + '.00'"
            :thumb="'http://localhost:9090/static/'+book.url"
          >
            <div slot="footer">
              <van-stepper v-model="book.gmsl" disabled/>
            </div>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              @click="deleteCart(book.id)"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>
    <is-empty v-if="!goods">您的购物车空空如也~</is-empty>
    <van-submit-bar
      style="bottom: 50px"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :buttonText="submitBarText"
      :loading="isSubmit"
      label="总计"
      @submit="cartSubmit"
    >
      <van-checkbox v-model="checkedAll" @change="checkAll">全选</van-checkbox>
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
  Stepper,
  SwipeCell
} from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import {
  cartlist,
  bookshow,
  cartupdate,
  itemorderdelete,
  mordersave,
  addresslist,
  usershow,
  userlist,
} from "@/api/mall";
import { getLocalStorage, setLocalStorage } from "@/core/utils/local-storage";
import _ from "lodash";
import dayjs from "dayjs";
const today = new Date();
const todayStr = dayjs(today).format("YYYY-MM-DD");
const timeStr = dayjs(today).format("YYYYMMDDHHMMss");
export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [SwipeCell.name]: SwipeCell,
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
      totalPrice: 0,
    };
  },
  computed: {
    submitBarText() {
      return this.isEditor ? "删除" : "结算";
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      cartlist().then(res => {
        const { rows } = res;
        this.length = res.total
        this.goods = rows;
      });
    },
    checkAll() {
      if (this.checkedAll == false) {
        this.$refs.checkboxGroup.toggleAll();
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
    cartSubmit() {
      let checkedGoods = this.checkedGoods;
      const carts = [];
      checkedGoods.forEach(item => {
        let cart = { id: item.id, gmsl: item.gmsl };
        carts.push(cart);
      });
      debugger;
      mordersave({ bookDtos: carts }).then(res => {
        if (res.code === 100) {
          this.$router.push({ name: "ordercheck", query: { id: res.id } });
        }
        if (res.code == -100) {
          this.$toast("您还没有添加地址哦~请先添加地址");
        }
      });
    },
    totalAdd(value) {
      let total = 0;
      if (value) {
        this.checkedGoods.forEach(item => {
          total += item.price * item.gmsl * 100;
        });
        this.totalPrice = total;
      }
    },
    deleteCart(o) {
      itemorderdelete({ id: o }).then(res => {
        this.$toast("删除成功");
        this.isEditor = false;
        this.goods = [];
        this.load();
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
  background-color: #f2f2f2;
}
.van-card {
    position: relative;
    box-sizing: border-box;
    padding: 8px 12px;
    font-size: 12px;
    background-color: #fafafa;
}
.card-goods__item {
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
}
.van-swipe-cell {
  width: 100%;
}
.cart_delete {
  background-color: #f2f2f2;
  line-height: 100px;
  padding: 0 10px;
  color: #fff;
  background-color: #db3d3c;
}
.delete-button {
  height: 100%;
}
</style>
