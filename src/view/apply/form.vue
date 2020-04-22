<template>
  <div>
    <van-cell-group>
      <van-field v-model="form.fname" label="姓名" />
      <van-field v-model="form.fmobile" type="tel" label="手机号" />
      <van-field v-model="form.fzsf" label="住宿否" />
      <van-field
        v-model="form.fnote"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, Card, Field, CellGroup } from "vant";

import { bmlist } from "../../api/member";

export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Card.name]: Card
  },
  data() {
    return {
        form:{
          fname: '',
          fmobile: '',
          fzsf: false,
          fnote: ''
        }
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
        sort: { fdate: "desc" },
        criteria: {}
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
        .finally(() => {});
    },
    onOpenDetail(item) {
      this.$router.push({ path: `/applydetail/${item.id}` });
    },
    onLoad() {
      this.load();
    }
  }
};
</script>