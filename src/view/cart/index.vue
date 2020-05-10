<template>
  <div class="tab-cart">
    <div class="editor_head" v-show="goods.length">
      <van-icon :name="isEditor ? 'success' : 'editor'" />
      <span @click="isEditor = !isEditor">
        {{
        isEditor ? '完成' : '编辑'
        }}
      </span>
    </div>
    <van-checkbox-group v-model="book" ref="checkboxGroup">
      <div v-for="(book, index) in goods" :key="index" class="card-goods__item">
        <van-checkbox :key="book.id" :name="book.id" v-model="book.checked"></van-checkbox>
        <van-card
          :key="book.id"
          :title="book.title"
          :price="book.price + '.00'"
          :thumb="book.picUrl"
        >
          <div slot="footer">
            <van-stepper v-model="book.num" async-change max="3" @change="onChange" />
          </div>
        </van-card>
        <div class="cart_delete" v-if="isEditor" @click="deleteCart(i)">删除</div>
      </div>
    </van-checkbox-group>
    <is-empty v-if="!goods.length"></is-empty>
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
import { itemorderlist, bookshow, itemorderupdate} from "@/api/mall";
import { getLocalStorage } from "@/core/utils/local-storage";

export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [BaseFooter.name]: BaseFooter,
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
      isEditor: false,
      checked: true,
      sum: 0,
      checkedGoods: ["1", "2", "3"],
      goods: [],
      num: "",
      book: []
    };
  },

  mounted() {
    this.load();
  },
  methods: {
    load() {
      const infoData = getLocalStorage("user_id");
      itemorderlist().then(res => {
        const { rows } = res;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].user.id === parseInt(infoData.user_id)) {
            bookshow({ id: rows[i].goodsId }).then(response => {
              const good = response.row;
              this.goods.push({
                id: rows[i].id,
                num: rows[i].number,
                title: good.title,
                price: good.price
              });
            });
          }
        }
      });
    },
    onChange(value){
debugger
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
