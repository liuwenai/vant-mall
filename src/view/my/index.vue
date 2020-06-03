<template>
  <div>
    <van-nav-bar title="账户与安全" left-arrow @click-left="onClickLeft" />
    <div style="width: 100%;margin-top: 10px;">
      <van-cell-group>
        <van-field label="账号" readonly :value="username" />
        <van-field label="用户名" readonly :value="usermc" />
        <van-field label="绑定电话" readonly :value="fmobile" />
        <van-field label="密码" readonly :value="password" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Cell, NavBar, Button, Popup } from 'vant'
import { removeLocalStorage, getLocalStorage } from '@/core/utils/local-storage'
import { userlist, usershow } from '@/api/mall'

export default {
  name: 'payment',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
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
      password: '',
    }
  },
  mounted() {
    this.addshowPop = true
    this.load()
  },
  methods: {
    async load() {
      const infoData = await getLocalStorage('user_id')
      usershow({ id: infoData.user_id }).then((res) => {
        const { row } = res
        this.username = row.userzh
        this.usermc = row.usermc
        this.fmobile = row.phone
        this.password = row.password
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
