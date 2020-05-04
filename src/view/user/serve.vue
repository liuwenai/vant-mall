<template>
  <div>
    <van-nav-bar title="客服" left-arrow @click-left="onClickLeft" />
      <van-cell-group>
        <van-cell title="项目名称" value="h5-bookmall" />
        <van-cell title="项目地址" value="Github"  url="https://github.com/liuwenai/vant-mall"/>
        <van-cell title="联系电话" value="18339185736" />
        <van-cell title="联系QQ" value="3459813188" />
        <van-cell title="当前版本" value="V1.0" />
        <van-cell title="开源协议" value="MIT" />
      </van-cell-group>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup, NavBar } from 'vant';

export default {
  data() {
    return {
      showKefu: false
    };
  },

  components: {
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell, 
    [CellGroup.name]: CellGroup    
  },
  methods:{
    onClickLeft() {
      window.history.go(-1)
    }
  }
};
</script>
<style scoped lang="less">
  .van-popup {
    width: 80%;
    padding: 20px;
    box-sizing: border-box;

  }
</style>