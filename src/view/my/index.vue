<template>
  <div>
    <van-nav-bar title="账户与安全" left-arrow @click-left="onClickLeft" />
    <div style="width: 100%;margin-top: 10px;">
      <van-cell title="账号" :value="username" />
      <van-cell title="用户名" :value="usermc" />
      <van-cell title="绑定电话" :value="fmobile" />
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell, NavBar, Button, Popup } from 'vant'
import { removeLocalStorage, getLocalStorage } from '@/core/utils/local-storage'
import { userlist } from '@/api/mall'

export default {
  name: 'payment',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data() {
    return {
      addshowPop: false,
      username: '',
      usermc: '',
      fmobile: '',
    }
  },
  mounted() {
    this.addshowPop = true
    this.load()
  },
  methods: {
    async load() {
      const infoData = await getLocalStorage(
        'user_id',
        'Authorization',
        'nick_name',
        'background_image',
        'avatar'
      )
      userlist().then((res) => {
        const { rows } = res
        debugger
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].id == infoData.user_id) {
            this.username = rows[i].userzh
            this.usermc = rows[i].usermc
            this.fmobile = rows[i].phone
          }
        }
      })
    },
    onClickLeft() {
      window.history.go(-1)
    },
    loginOut() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
}
</style>
