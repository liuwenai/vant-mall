  
<template>
  <div class="news-detail">
    <!-- 头部nav -->
    <van-nav-bar
      fixed
      title
      left-text="返回"
      right-text
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="load()"
    />
    <div class="news-box">
      <van-panel :title="detail.ftitle" :desc="detail.fstart">
        <div class="panel-content">&nbsp;&nbsp;{{detail.fdesc}}</div>
      </van-panel>
    </div>

    <van-divider>我要报名</van-divider>

    <van-cell-group>
      <van-field
        required
        v-validate="'required'"
        data-vv-as="姓名"
        name="fname"
        v-model="form.fname"
        label="姓名"
      />
      <van-field
        required
        v-validate="'required|mobile'"
        data-vv-as="手机号"
        name="fmobile"
        v-model="form.fmobile"
        type="tel"
        label="手机号"
      />
      <!-- <van-field v-model="form.fzsf" label="住宿否" /> -->
      <van-cell title="住宿否" value="内容">
        <van-checkbox v-model="form.fzsf"></van-checkbox>
      </van-cell>

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
    <van-button type="primary" @click="onSave" size="large">提交</van-button>
  </div>
</template>

<script>
import comment from "@/components/comment";
import { bmshow, bmsave } from "@/api/member";
import {
  NavBar,
  CellGroup,
  Cell,
  Field,
  Panel,
  Checkbox,
  Divider,
  Button,
  Toast,
  Notify,
  Dialog
} from "vant";

export default {
  components: {
    comment,
    [Panel.name]: Panel,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Notify.name]: Notify,
    [Dialog.Component.name]: Dialog.Component,
    [Toast.name]: Toast
  },
  data() {
    return {
      id: this.$route.params.id,
      detail: {},
      form: {
        fname: "",
        fmobile: "",
        fzsf: false,
        fnote: ""
      }
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      bmshow(this.id)
        .then(res => {
          this.detail = res;
        })
        .finally(() => {});
    },

    async validate() {
      const result = await this.$validator.validate();
      if (!result) {
        const errMsg = this.errors.items[0].msg;
        Toast(errMsg);
        throw new Error(`表单验证: ${errMsg}`);
      }
    },
    // 单据保存
    async onSave() {
      // debugger;
      try {
        await this.validate();
        Dialog.confirm({
          title: "提示",
          message: "确认要报名吗？"
        })
          .then(() => {
            let params = this.form;
            bmsave({id:this.id,...params}).then(response => {
              // console.log("usersqb:", params);
              const { code, msg } = response;
              let message = msg || "提交成功";
              if (code === 100) {
                Toast.success(message)
              } else {
                Toast.fail(message)
              }
            });
          })
          .catch(() => {});
      } catch (err) {
        // console.log(err.message);
        // this.isLogining = false;
      }
    }
  }
};
</script>

<style lang="less">
.news-box {
  margin-top: 46px;
}
.panel-content {
  font-size: 13px;
}
</style>