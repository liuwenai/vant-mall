<template>
  <div class="tab-cart">
    <div class="editor_head" v-show="goods.length">
      <!-- <van-icon :name="isEditor ? 'success' : 'editor'" />
      <span @click="isEditor = !isEditor">
        {{
        isEditor ? '完成' : '编辑'
        }}
      </span>-->
    </div>
    <van-checkbox-group v-model="checkedGoods" ref="checkboxGroup">
      <div v-for="(book, index) in goods" :key="index" class="card-goods__item">
        <van-checkbox :key="book.id" :name="book.id" v-model="book.checked"></van-checkbox>
        <van-swipe-cell>
          <van-card
            :key="book.bookid"
            :title="book.title"
            :price="book.price + '.00'"
            :thumb="book.picUrl"
          >
            <div slot="footer">
              <van-stepper
                v-model="book.num"
                @change="stepperEvent(book,arguments)"
                async-change
                max="3"
              />
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
  userlist
} from "@/api/mall";
import { getLocalStorage, setLocalStorage } from "@/core/utils/local-storage";
import _ from "lodash";

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
      num: "",
      book: [],
      infoData: [],
      address: {}
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
    stepperEvent(book, arg) {
      debugger;
      let number = arg[0];
      cartupdate({
        num: number,
        book: { id: book.bookid },
        id: book.id
      });
    },
    load() {
      // this.infoData = getLocalStorage("user_id");
      cartlist().then(res => {
        const { rows } = res;
        rows.forEach(item => {
          debugger;
          this.goods.push({
            id: item.id,
            bookid: item.book.id,
            num: item.num,
            title: item.book.title,
            price: item.book.price
          });
          this.allGoods = this.getAllList();
          this.checkedGoods = this.getCheckedList(this.goods);
        });
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
    cartSubmit(data) {
      debugger;
      let checkedGoods = this.checkedGoods;
      let that = this;
      const user_id = this.infoData.user_id;
      debugger;
    },
    deleteCart(o) {
      debugger;
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
  background-color: #fff;
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
