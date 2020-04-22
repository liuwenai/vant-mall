  
<template>
  <div class="news-detail">
    <!-- 头部nav -->
    <van-nav-bar
      title="协会动态"
      left-text="返回"
      right-text="刷新"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="initPage()"
    />
    <div class="news-box">
      <div>
        <h1 class="news-title">{{newsDetail.title}}</h1>
        <p class="news-info">
          <span>{{newsDetail.add_time | fmtTime}}</span>
          <span>{{newsDetail.click}}次浏览</span>
          <span>分类：经济民生</span>
        </p>
      </div>
      <div class="news-content" v-html="newsDetail.content"></div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from "@/components/comment";
import { getNewsDetail } from "@/api/member";
import { NavBar, Toast } from "vant";

export default {
  components: {
    comment,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      id: this.$route.params.id,
      newsDetail: {}
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      getNewsDetail(this.id)
        .then(res => {
          console.log(res);
          this.newsDetail = res.data.message[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
.news-content p {
  text-indent: 2em;
  line-height: 1.5;
}
.news-content p b {
  font-size: 14px;
  font-weight: bold;
}
.news-detail {
  .news-box {
    padding: 0 8px;
  }
  .news-title {
    padding: 10px 0 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .news-info {
    padding: 10px;
    font-size: 12px;
    color: #26a2ff;
    display: flex;
    justify-content: space-around;
  }
  .news-content {
    font-size: 12px;
  }
}
</style>