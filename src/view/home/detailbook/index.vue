<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group class="item_cell_group">
      <van-cell class="item_info">
        <div class="goods-title">{{ book.title }}</div>
        <div class="goods-price">¥{{ numberFormatter(book.price) }}</div>
      </van-cell>

      <van-cell class="goods-express">
        <van-col span="10">运费：{{ book.express }}元</van-col>
        <van-col span="14">剩余：{{ book.kcsl }}本</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="toHome">
        <!-- <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>-->
      </van-cell>
      <!-- <van-cell title="线下门店" icon="location-o" is-link @click="sorry" /> -->
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="评论" is-link to="comment" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="toServe">客服</van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="toCart" :info="cartInfo > 0 ? cartInfo : ''">购物车</van-goods-action-icon>
      <van-goods-action-button type="warning" @click="skuClick">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="skuClick">立即购买</van-goods-action-button>
    </van-goods-action>

    <van-sku
      v-model="showBase"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
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
  Popup
} from "vant";
import { bookshow, itemordersave, bookupdate } from "@/api/mall";
import format from "number-format.js";
import { getLocalStorage } from "@/core/utils/local-storage";

export default {
  components: {
    [Tag.name]: Tag,
    [Sku.name]: Sku,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      cartInfo: 0,
      showBase: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      customSkuValidator: () => "请选择xxx",
      skuData: {
        goods_id: "",
        quota: 3,
        quota_used: 0,
        start_sale_num: 1,
        goods_info: {
          title: "",
          picture:
            "https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg",
          price: 1
        },
        sku: {
          price: "",
          stock_num: "",
          none_sku: false,
          hide_stock: false,
          collection_id: 2261,
          tree: [],
          list: []
        }
      },
      book: {},
      goods: {
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
        ]
      },
      fid: ""
    };
  },
  created() {
    this.fid = this.$route.params.id;
  },
  mounted() {
    this.fid = this.$route.params.id;
    this.load();
  },
  methods: {
    load() {
      // booklist().then((response) => {
      //   const { code, rows, msg } = response
      //   for (let i = 0; i < rows.length; i++) {
      //     if (rows[i].id === fid) {
      //       this.book = rows[i]
      //     }
      //     this.skuData.goods_id = this.book.id
      //     this.skuData.sku.price = this.book.price
      //     this.skuData.sku.stock_num = this.book.kcsl
      //   }
      // })
      let that = this;
      bookshow({ id: this.fid }).then(res => {
        const { row } = res;
        that.book = row;
        this.skuData.goods_id = row.id;
        this.skuData.sku.price = row.price;
        this.skuData.sku.stock_num = row.kcsl;
      });
    },
    numberFormatter(value) {
      return format("#,##0.00", value);
    },
    skuClick() {
      this.showBase = true;
    },
    toCart() {
      this.$router.push("cart");
    },
    onBuyClicked(data) {
      let that = this;
      let params = {
        goodsId: data.goodsId,
        number: data.selectedNum
      };
      // cartFastAdd(params).then(res => {
      //   let cartId = res.data.data;
      //   setLocalStorage({ CartId: cartId });
      //   that.showBase = false;
      //   this.$router.push('/order/checkout');
      // });
    },
    onAddCartClicked(data) {
      let that = this;
      const infoData = getLocalStorage("user_id");
      let params = {
        user: { id: infoData.user_id },
        goodsId: data.goodsId,
        number: data.selectedNum
      };
      debugger;

      itemordersave(params).then(() => {
        this.cartInfo = this.cartInfo + data.selectedNum;
        this.$toast({
          message: "已添加至购物车",
          duration: 1500
        });
        that.showBase = false;
      });
      that.book.kcsl = that.book.kcsl - data.selectedNum;
      debugger;
      bookupdate(that.book).then(res => {
        that.load();
      });
      // this.$router.push({ name: 'cart', params: { id: data.id } })
    },
    toHome() {
      this.$router.push({ name: "home" });
    },
    toServe() {
      this.$router.push({ name: "serve" });
    }
  }
};
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
.item-title {
  line-height: 1.4;
}

.item_cell_group {
  margin-bottom: 15px;
}

.item_desc {
  background-color: #fff;
  /deep/ p {
    padding: 0 10px;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
  }
}

.item_desc_title {
  @include one-border;
  padding: 10px 0;
  text-align: center;
}
</style>
