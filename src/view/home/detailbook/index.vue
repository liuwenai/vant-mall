<template>
  <div class="goods">
    <van-image class="img" :src="'http://localhost:9090/static/'+book.url" />
    <!-- <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe> -->
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
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell title="评论" is-link to="comment" />
    </van-cell-group>-->

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
  Popup,
  Image as VanImage
} from "vant";
import { bookshow, addCart, mordersave } from "@/api/mall";
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
    [VanImage.name]: VanImage,
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
      skuData: {
        goods_id: "",
        quota: 1,
        quota_used: 0,
        start_sale_num: 1,
        goods_info: {
          title: "",
          picture:"",
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
      // goods: {
      //   thumb: [
      //     "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
      //     "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
      //   ]
      // },
      fid: ""
    };
  },
  created() {
    this.fid = this.$route.params.id;
  },
  mounted() {
    this.fid = this.$route.query.id;
    this.load();
  },
  methods: {
    load() {
      bookshow({ id: this.$route.query.id }).then(res => {
        const { row } = res;
        this.book = row;
        this.skuData.goods_info.picture = row.url;
        this.skuData.goods_id = row.id;
        this.skuData.sku.price = row.price;
        this.skuData.sku.stock_num = row.kcsl-row.gmsl;
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
      debugger;
      let cart = { id: data.goodsId, gmsl: data.selectedNum };
      mordersave({ bookDtos: cart }).then(res => {
        if (res.code === 100) {
          this.$router.push({ name: "ordercheck", query: { id: res.id } });
          debugger;
        } else {
          this.$toast("您还没有添加地址哦~请先添加地址");
        }
      });
    },
    onAddCartClicked(data) {
      addCart(data.goodsId, data.selectedNum).then(() => {
        debugger;
        this.cartInfo = this.cartInfo + data.selectedNum;
        this.$toast({
          message: "已添加至购物车",
          duration: 1500
        });
        this.showBase = false;
      });
      this.book.kcsl = this.book.kcsl - data.selectedNum;
      this.skuData.sku.stock_num = this.book.kcsl;
    },
    toHome() {
      this.$router.push({ name: "home" });
    },
    toServe() {
      this.$router.push({ name: "serve" });
    },
    sorry() {
      this.$toast({ message: "暂时没有线下门店哦~" });
    }
  }
};
</script>

<style lang="less">
img {
  width: 100%;
  height: 375px;
  display: block;
}
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
