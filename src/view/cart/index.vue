<template>
  <div>
    <!-- <div class="avatar" v-if="!isLogin">
      <img :src="avatar" alt srcset />
      <p @click="login">去登录</p>
    </div>-->
    <!-- <div class="avatar">
      <img
        src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
      />
      <p>购物车空空如也</p>
      <van-button round size="normal" type="info" to="home">去逛逛</van-button>
    </div> -->
    <van-card
        v-for="book in books"
        :key="book.id"
        :title="book.title"
        desc="暂无描述"
        :num="book.kcsl"
        :price="book.price +'.00'"
        :thumb="book.picUrl"
      ></van-card>
    <div>
      <!-- <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>-->
      <!-- <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar> -->
    </div>
    <!-- <BaseFooter active="cart" /> -->
    <BaseFooter />
  </div>
</template>

<script>
import BaseFooter from '@/components/base/basefooter'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Toast,
  NavBar,
} from 'vant'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'

export default {
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [BaseFooter.name]: BaseFooter,
    [Button.name]: Button,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [CheckboxGroup.name]: CheckboxGroup,
  },

  data() {
    return {
      checked: true,
      sum: 0,
      checkedGoods: ['1', '2', '3'],
      goods: [
        {
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
        },
        {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
        },
        {
          id: '3',
          title: '美国伽力果',
          desc: '约680g/3个',
          price: 2680,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg',
        },
      ],
    }
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },

    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
        0
      )
    },
  },

  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },

    onSubmit() {
      this.$router.replace('address')
    },
    onClickRight() {
      this.$router.replace('detailcart')
    },
  },
}
</script>

<style lang="less">
.avatar {
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 258rpx;
  height: 258rpx;
  color: #a78845;
}
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
