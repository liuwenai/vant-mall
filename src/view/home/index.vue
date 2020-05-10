<template>
  <div class="tab-home">
    <div class="tal_class_searchBox">
      <van-search shape="round" placeholder="点击前往搜索" @click="onSearch" />
      <div class="tal_class_searchMask"></div>
    </div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(banner, index) in shopInfos.banner" :key="index">
        <img :src="banner.url" style="height:230px" />
      </van-swipe-item>
    </van-swipe>

    <div
      class="container"
      v-for="(book, index) in books"
      :key="index"
      @click="onDetailbook(book)"
    >
      <div class="item1">
        <img class="img" :src="book.id + '.png'" />
      </div>
      <div class="item2">
        <div>书名：{{ book.title }}</div>
        <div>作者：{{ book.author.name}}</div>
        <div>价格：{{ book.price }}</div>
      </div>
    </div>

    <!-- <van-card
        v-for="book in books"
        :key="book.id"
        :title="book.title"
        desc="暂无描述"
        :num="book.kcsl"
        :price="book.price +'.00'"
        :thumb="book.picUrl"
      ></van-card> -->

    <BaseFooter />
  </div>
</template>

<script>
import BaseFooter from '@/components/base/basefooter'
import {
  List,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Search,
  Panel,
  CouponCell,
  CouponList,
  Toast,
  Card,
  Grid,
  GridItem,
  Row,
  Col,
  Tag,
} from 'vant'
import { getLocalStorage } from '@/core/utils/local-storage'
import scrollFixed from '@/mixin/scroll-fixed'
import _ from 'lodash'

import { booklist } from '@/api/mall'

export default {
  components: {
    [BaseFooter.name]: BaseFooter,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Search.name]: Search,
    [Panel.name]: Panel,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tag.name]: Tag,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  mixins: [scrollFixed],

  data() {
    return {
      books: [],
      shopInfos: [],
      isLoading: false,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      booklist().then((response) => {
        const { code, rows, msg } = response
        this.books = rows
      })
    },
    onDetailbook(data) {
      debugger
      this.$router.push({ name: 'detailbook', params: { id: data.id } })
    },
    onSearch() {
      this.$router.push('search')
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  height: 100px;
  width: 95%;
  display: flex;
  flex-direction: row;
  border: 10px;
  margin: 10px;
  border-bottom-color: blue;
  background-color: #ffffff;
}
.item1 {
  flex: 1;
  margin-left: 10px;
}
.item2 {
  flex: 2;
}
.img {
  height: 80px;
}
.tabbar-home {
  > div {
    margin-bottom: 10px;
  }
  &__quit {
    border: 0;
    border-radius: 0;
  }
}

.tal_class_searchBox {
  position: relative;
}

.interval_bot {
  margin-bottom: 10px;
}
.van-panel {
  margin-top: 20px;
}
.goods-channel {
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding-top: 10px;
}

.goods-channel .item {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

.goods-channel img {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
}

.goods-channel span {
  display: block;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #333;
}
.van-coupon-cell--selected {
  color: #323233;
}
.van-coupon-list {
  height: 100%;
  position: relative;
  background-color: #f8f8f8;
}
.van-coupon-list__field {
  padding: 7px 15px;
}
.van-coupon-list__exchange {
  height: 32px;
  line-height: 30px;
}
.van-coupon-list__list {
  overflow-y: auto;
  padding: 15px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
.van-coupon-list__close {
  left: 0;
  bottom: 0;
  position: absolute;
  font-weight: 500;
}
.van-coupon-list__empty {
  padding-top: 100px;
  text-align: center;
}
.van-coupon-list__empty p {
  color: #969799;
  margin: 15px 0;
  font-size: 14px;
  line-height: 20px;
}
.van-coupon-list__empty img {
  width: 80px;
  height: 84px;
}
.van-coupon-item {
  overflow: hidden;
  border-radius: 4px;
  margin: 0 15px 15px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.van-coupon-item:active {
  background-color: #e8e8e8;
}
.van-coupon-item__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100px;
  padding: 24px 0 0 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid red;
}
.van-coupon-item h2,
.van-coupon-item p {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-coupon-item h2 {
  height: 34px;
  font-weight: 500;
  line-height: 34px;
}
.van-coupon-item p {
  font-size: 12px;
  line-height: 16px;
  color: #969799;
}
.van-coupon-item__head {
  min-width: 90px;
}
.van-coupon-item__head h2 {
  color: #f44;
  font-size: 24px;
}
.van-coupon-item__head h2 span {
  font-size: 50%;
}
.van-coupon-item__body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  border-radius: 0 4px 4px 0;
}
.van-coupon-item__body h2 {
  font-size: 16px;
}
.van-coupon-item__corner {
  top: 16px;
  right: 15px;
  position: absolute;
}
.van-coupon-item__corner .van-icon {
  border-color: #f44;
  background-color: #f44;
}
.van-coupon-item__reason {
  padding: 7px 15px;
  border-top: 1px dashed #ebedf0;
  background-color: #fafafa;
}
.van-coupon-item--disabled:active {
  background-color: #fff;
}
.van-coupon-item--disabled .van-coupon-item__content {
  height: 90px;
}
.van-coupon-item--disabled h2,
.van-coupon-item--disabled p,
.van-coupon-item--disabled span {
  color: #969799;
}
</style>
