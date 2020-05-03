<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ book.title }}</div>
        <div class="goods-price">¥{{ numberFormatter(book.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ book.express }}元</van-col>
        <van-col span="14">剩余：{{ book.kcsl }}本</van-col>
      </van-cell>
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group> -->

    <van-cell-group class="goods-cell-group">
      <van-cell title="评论" is-link to="comment" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="addCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>

    <van-sku
      v-model="showBase"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
      :quota="skuData.quota"
      :quota-used="skuData.quota_used"
      :start-sale-num="skuData.start_sale_num"
      :close-on-click-overlay="closeOnClickOverlay"
      :properties="skuData.properties"
      disable-stepper-input
      reset-stepper-on-hide
      safe-area-inset-bottom
      reset-selected-sku-on-hide
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
} from 'vant'
import { booklist } from '@/api/mall'
import format from 'number-format.js'

export default {
  components: {
    [Tag.name]: Tag,
    [Sku.name]: Sku,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
  },

  data() {
    return {
      showBase: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      customSkuValidator: () => '请选择xxx',
      skuData: {
        goods_id: '',
        quota: 3,
        quota_used: 0,
        start_sale_num: 1,
        goods_info: {
          title: '',
          picture:
            'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg',
          price: 1,
        },
        sku: {
          price: '',
          stock_num: '',
          none_sku: false,
          hide_stock: false,
          collection_id: 2261,
          tree: [],
          list: [],
          messages: [],
        },
      },
      initialSku: {
        s1: '30349',
        s2: '1193',
        selectedNum: 3,
        selectedProp: {
          123: [1222],
          133: [1244],
          124: [1225, 1226],
        },
      },
      book: {},
      goods: {
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg',
        ],
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      const fid = this.$route.params.id
      booklist().then((response) => {
        const { code, books, msg } = response
        for(let i = 0;i < books.length;i++){
          if(books[i].id === fid){
            this.book = books[i]
          }
          this.skuData.goods_id = this.book.id
          this.skuData.sku.price = this.book.price
          this.skuData.sku.stock_num = this.book.kcsl
        }
      })
    },
    numberFormatter(value) {
      return format('#,##0.00', value)
    },
    addCart() {
      this.showBase = true
    },
    onClickCart() {
      this.$router.push('cart')
    },
    onBuyClicked() {},
    onAddCartClicked() {},
    sorry() {
      Toast('暂无后续逻辑~')
    },
  },
}
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
