<template>
  <div class="container">
    <van-nav-bar title="地址管理" left-arrow @click-left="$router.go(-1)" />
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
//接口问题，登录显示问题
import { Toast } from "vant";
import { AddressEdit, NavBar, AddressList } from "vant";
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [AddressList.name]: AddressList,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      chosenAddressId: '1',
      addressList: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ],
      searchResult: []
    };
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    async getAddress() {
      if (addressList.length > 0) {
        this.isAddressList = true;
      } else {
        this.isAddressList = false;
      }
    },
    onAdd() {
      this.$router.push({ name: "editaddress", query: { addressId: -1 } });
    },
    onEdit(item, index) {
      this.$router.push({ name: "editaddress", query: { addressId: item.id } });
    }
  },
  onClickLeft() {
    this.$router.go(-1);
  }
};
</script>

<style>
page {
  height: 100%;
  width: 100%;
  background: #f4f4f4;
}

.container {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.address-list {
  padding-left: 31.25rpx;
  background: #fff
    url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png)
    0 0 repeat-x;
  background-size: auto 10.5rpx;
  margin-bottom: 90rpx;
}

.address-list .item {
  height: 156.55rpx;
  align-items: center;
  display: flex;
  border-bottom: 1rpx solid #dcd9d9;
}

.address-list .l {
  width: 125rpx;
  height: 80rpx;
  overflow: hidden;
}

.address-list .name {
  width: 125rpx;
  height: 43rpx;
  font-size: 29rpx;
  margin-bottom: 5.2rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.address-list .default {
  width: 62.5rpx;
  height: 33rpx;
  line-height: 28rpx;
  text-align: center;
  font-size: 20rpx;
  color: #a78845;
  border: 1rpx solid #a78845;
  visibility: visible;
}

.address-list .c {
  flex: 1;
  height: auto;
  overflow: hidden;
}

.address-list .mobile {
  height: 29rpx;
  font-size: 29rpx;
  line-height: 29rpx;
  overflow: hidden;
  margin-bottom: 6.25rpx;
}

.address-list .address {
  height: 37rpx;
  font-size: 25rpx;
  line-height: 37rpx;
  overflow: hidden;
}

.address-list .r {
  width: 52rpx;
  height: auto;
  overflow: hidden;
  margin-right: 16.5rpx;
}

.address-list .del {
  display: block;
  width: 52rpx;
  height: 52rpx;
}

.add-address {
  background: #3d93e4;
  text-align: center;
  width: 100%;
  height: 99rpx;
  line-height: 99rpx;
  position: fixed;
  border-radius: 0;
  border: none;
  color: #fff;
  font-size: 29rpx;
  bottom: 0;
  left: 0;
}

.empty-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-view .icon {
  height: 248rpx;
  width: 258rpx;
  margin-bottom: 10rpx;
}

.empty-view .text {
  width: auto;
  font-size: 28rpx;
  line-height: 35rpx;
  color: #999;
}
.empty-div {
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 100rpx;
  height: 100rpx;
  color: #a78845;
}
</style>