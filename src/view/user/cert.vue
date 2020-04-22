<template>
  <div>
    <van-nav-bar title="个人聘书" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <van-image width="100%" height="100%" :src="image">
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <div v-if="success" class="center">如要下载，请长按图片</div>
  </div>
</template>
<script>
import { Image, Toast, NavBar } from "vant";
import { usercert } from "@/api/member";
import { baseURL } from "@/api/axios";

export default {
  components: {
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data() {
    return {
      baseURL,
      image: "",
      success: false
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      Toast.loading({
        message: "图片加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      usercert()
        .then(response => {
          const { code, url } = response;
          if (code === 100 && url !== "") {
            this.image = url;
            this.success = true;
            Toast.clear();
          } else {
            this.success = false;
            Toast("图片加载失败！");
          }
        })
        .finally(() => {
          // Toast.clear();
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.center {
  text-align: center;
}
</style>