<template>
  <div class="news-list">
    <!-- 头部nav -->
    <van-nav-bar
      title="协会动态"
      left-text="返回"
      right-text="刷新"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="initList()"
    />

    <!-- 新闻列表 -->
    <ul>
      <li v-for="item of newsList" :key="item.id" @click="jumpToNewsDetail(item.id)">
        <div class="news-item">
          <img :src="item.img_url" alt="img" />
          <div class="content">
            <p class="content-title">{{item.title}}</p>
            <p class="content-info">
              <span class="content-time">{{item.add_time | fmtTime}}</span>
              <span class="content-click">{{item.click}} 人看过</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 局部导入组件
import { NavBar } from "vant";
import { getNewsList } from "@/api/member";
export default {
  components: {
    [NavBar.name]: NavBar
  },
  mounted() {
    // 获取新闻列表
    this.initList();
  },
  data() {
    return {
      newsList: []
    };
  },
  // filters: {
  //   // 时间过滤器
  //   fmtTime: (time) => {
  //     let addTime = new Date(time)
  //     let y = addTime.getFullYear()
  //     let m = addTime.getMonth() + 1
  //     let d = addTime.getDate()
  //     // 过滤器中需要return
  //     return `${y}-${m}-${d}`
  //   }
  // },
  methods: {
    // 获取新闻列表
    initList() {
      getNewsList()
        .then(res => {
          // console.log(res)
          this.newsList = res.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到详情页面
    jumpToNewsDetail(newsid) {
      this.$router.push({ name: "newsdetail", params: { id: newsid } });
    }
  }
};
</script>

<style lang="less" scoped>
.news-list {
  ul {
    li {
      padding: 5px;
      border-bottom: 1px solid #eee;
    }
  }
  .news-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 100px;
      height: 70px;
      margin-right: 10px;
      flex: 1;
    }
    .content {
      box-sizing: border-box;
      width: 250px;
      height: 70px;
      padding: 5px;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-title {
        font-size: 14px;
        // font-weight: bold;
      }
      .content-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #26a2ff;
        font-size: 12px;
        // margin-top: 15px;
      }
    }
  }
}
</style>