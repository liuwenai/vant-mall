<template>
  <div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-cell
        :label="item.fdate"
        is-link
        v-for="(item,index) in rows"
        :key="index"
        :title="' ' + item.ftitle"
        @click="onOpenDetail(item.furl)"
      />
    </van-list>
  </div>
</template>

<script>
import { PullRefresh, List, Cell, Card } from "vant";

import { newslist, newsdetail } from "../../api/member";

export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [List.name]: List,
    [Card.name]: Card
  },
  data() {
    return {
      newsdetail: newsdetail,
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
      const {bh} = this.$route.params
      let offset = this.rows.length;
      let params = {
        max: 10,
        offset,
        sort:{fdate: "desc"},
        criteria:{clb:{id:bh}}
      };
      newslist(params)
        .then(response => {
          this.rows = this.rows.concat(response.rows);
          // console.log(this.rows);
          this.total = response.total;
          this.loading = false;
          if (this.rows.length >= this.total) {
            this.finished = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onOpenDetail(url) {
      window.open(url, "_blank");
    },
    onLoad() {
       this.load()
    }
  }
};
</script>