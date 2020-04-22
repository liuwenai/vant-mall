<template>
  <div>
      <van-nav-bar
      fixed
      title
      left-text="返回"
      right-text
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-list class="apply-list" v-model="loading" :finished="finished" @load="onLoad">
      <van-cell
        :label="item.fdate"
        is-link
        v-for="(item,index) in rows"
        :key="index"
        :title="' ' + item.ftitle"
        @click="onOpenDetail(item)"
      />
    </van-list>
  </div>
</template>

<script>
import { PullRefresh, List, Cell, Card, NavBar } from "vant";

import { bmlist } from "../../api/member";

export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [List.name]: List,
    [NavBar.name]: NavBar,
    [Card.name]: Card
  },
  data() {
    return {
      newsdetail: [],
      rows: [],
      loading: false,
      finished: false,
      total: 0,
      offset: 0
    };
  },
  mounted() {
    // this.load();
  },
  methods: {
    //数据加载
    load() {
      let offset = this.rows.length;
      let params = {
        max: 10,
        offset,
        sort:{fdate: "desc"},
        criteria:{}
      };
      bmlist(params)
        .then(response => {
          this.rows = this.rows.concat(response.rows);
          // console.log(this.rows);
          this.total = response.total;
          this.loading = false;
          if (this.rows.length >= this.total) {
            this.finished = true;
          }
        })
        .finally(() => {

        });
    },
    onOpenDetail(item) {
      this.$router.push({path:`/applydetail/${item.id}`})
    },
    onLoad() {
       this.load()
    }
  }
};
</script>

<style scoped>
.apply-list{
  margin-top: 46px;
}
</style>