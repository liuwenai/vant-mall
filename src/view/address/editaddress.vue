<template>
  <div class="container">
    <van-nav-bar title="编辑地址" left-arrow @click-left="$router.go(-1)" />
    <van-address-edit
      style="background-color: #fff;"
      :areaList="areaList"
      :addressInfo="addressInfo"
      show-set-default
      show-delete
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { AddressEdit, NavBar } from "vant";
import areaList from "../address/area";
import { removeLocalStorage } from "@/core/utils/local-storage";
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      areaList,
      addressId: 0,
      addressInfo: {}
    };
  },
  created() {
    this.addressId = this.$route.query.addressId;
    if (this.addressId !== -1 && this.addressId !== 0) {
      this.init();
    }
  },
  methods: {
    init() {
      addressDetail({id: this.addressId}).then(res => {
        this.addressInfo = res.data.data;
      });
    },
    onSave(content) {
      addressSave(content).then(res => {
        this.$toast('成功');
        this.$router.go(-1);
      });
    },
    onDelete(content) {
      addressDelete({ id: content.id });
      removeLocalStorage('AddressId')
      this.$router.go(-1);
    },
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