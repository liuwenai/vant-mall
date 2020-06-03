<template>
  <div class="item_search">
    <form action="/search" @submit="disabledSubmit">
      <van-search
        placeholder="请输入商品名称"
        shape="round"
        v-model="keyword"
        @search="enterSearch"
        autofocus
      />
    </form>
    <!-- <div class="item_search_content">
      <div class="item_search_text clearfix">
        <div class="float-l">历史搜索</div>
        <div class="float-r" @click="clearHistory">
          <van-icon name="lajitong" style="font-size: 12px;margin-right: 3px" />清空历史记录
        </div>
      </div>
      <div class="item_search_history">
        <van-tag plain v-for="(his, i) in wordHistory" :key="i" @click="clickSearch(his)">{{his}}</van-tag>
      </div>
    </div>-->

    <div class="container" v-for="(book, index) in list" :key="index" @click="itemClick(book)">
      <div class="item1">
        <img class="img" :src="'http://localhost:9090/static/'+book.url" />
      </div>
      <div class="item2">
        <div>书名：{{ book.title }}</div>
        <div>作者：{{ book.author.name}}</div>
        <div>价格：{{ book.price }}</div>
      </div>
    </div>

    <is-empty v-if="isEmpty">抱歉,没有找到符合条件商品</is-empty>
  </div>
</template>

<script>
import { Card, Search, Tag, List } from "vant";
import { booklist } from "@/api/mall";
import IsEmpty from "@/components/is-empty/";

export default {
  data() {
    return {
      keyword: "",
      focusStatus: true,
      wordHistory: [],
      list: [],
      page: 1,
      limit: 10,
      pages: 0,
      loading: false,
      finished: false,
      isEmpty: false
    };
  },
  methods: {
    enterSearch() {
      this.reset();
      this.searchGoods();
    },
    reset() {
      this.list = [];
    },
    disabledSubmit() {
      return false;
    },
    searchGoods() {
      booklist().then(res => {
        const { rows } = res;
        rows.forEach(items => {
          if (items.title === this.keyword) {
            this.list.push(items);
            this.isEmpty = false;
          }
        });
        if (this.list == 0) {
          this.isEmpty = true;
        }
      });
    },
    itemClick(book) {
      this.$router.push({ name: 'detailbook', query: { id: book.id } })
    }
  },
  components: {
    [Search.name]: Search,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [List.name]: List,
    [IsEmpty.name]: IsEmpty
  }
};
</script>


<style lang="less">
.item_search {
  background-color: #fff;
}
.container {
  height: 100px;
  width: 95%;
  display: flex;
  flex-direction: row;
  border: 10px;
  margin: 10px;
  border-bottom-color: blue;
  background-color: #ffffff;
}
.item1 {
  flex: 1;
  margin: 10px;
}
.item2 {
  flex: 2;
  margin: 10px;
}
.img {
  height: 80px;
}
.item_search_content {
  padding: 15px 10px 0;
}
.item_search_text {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.item_search_history > span {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
