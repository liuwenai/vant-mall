<template>
  <div class="container">
    <van-nav-bar title="编辑地址" left-arrow @click-left="$router.go(-1)" />
    <van-address-edit
      style="background-color: #fff;"
      :areaList="areaList"
      :address-info="AddressInfo"
      show-area
      show-set-default
      show-delete
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { AddressEdit, NavBar } from 'vant'
import areaList from '../address/area'
import {
  addresslist,
  addressupdate,
  addresssave,
  addressdelete,
  addressshow,
} from '@/api/mall'
import { getLocalStorage } from '@/core/utils/local-storage'
import { removeLocalStorage } from '@/core/utils/local-storage'
import types from "../../mix/types";
import area from '../address/area'

export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar,
  },
  mixins: [types],
  data() {
    return {
      areaList,
      addressId: 0,
      AddressInfo: {},
      default:"",
    }
  },
  created() {
    this.addressId = this.$route.query.addressId
    this.address = this.$route.query.address
    if (this.addressId !== -1 && this.addressId !== 0) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      addressshow({ id: this.addressId }).then((res) => {
        this.AddressInfo = res.row
        this.AddressInfo.isDefault = res.row.default
        debugger
        // this.AddressInfo.areaCode = area.county_list.keys(res.row.county)
        for(let i in area.county_list){
          if(area.county_list[i] === res.row.county){
            this.AddressInfo.areaCode = i
          }
        }
      })
    },
    onSave(content) {
      const infoData = getLocalStorage('user_id')
      const bdefault = content.isDefault
      if (content.id != null) {
        content.default = bdefault
        addressupdate(content).then((res) => {
          this.$toast('保存成功')
          this.$router.go(-1)
        })
      } else {
        content.user = { id: infoData.user_id }
        content.default = bdefault
        addresssave(content).then((res) => {
          this.$toast('保存成功')
          this.$router.go(-1)
        })
      }

    },
    onDelete(content) {
      addressdelete({ id: content.id }).then((res) => {
          this.$toast('删除成功')
          this.$router.go(-1)
        })
    },
  },
}
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
