<template>
  <div>
    <van-nav-bar
      title="单位申请"
      left-text="返回"
      right-text="下载申请表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div>
      <van-cell-group>
        <van-field
          required
          v-model="form.fdwmc"
          name="fdwmc"
          v-validate="'required'"
          clearable
          label="单位名称"
          placeholder="单位名称"
          data-vv-as="单位名称"
        />
        <van-field
          required
          v-model="form.fzcdz"
          name="fzcdz"
          v-validate="'required'"
          clearable
          label="注册地址"
          placeholder="注册地址"
          data-vv-as="注册地址"
        />
        <van-field
          v-model="form.flxdh"
          name="flxdh"
          clearable
          label="联系电话"
          placeholder="联系电话"
          data-vv-as="联系电话"
        />
        <van-field
          v-model="form.ffax"
          name="ffax"
          clearable
          label="传真"
          placeholder="传真"
          data-vv-as="传真"
        />
        <van-field
          v-model="form.fclsj"
          name="fclsj"
          clearable
          label="成立时间"
          placeholder="成立时间"
          @click="onOpen"
          data-vv-as="成立时间"
        />
        <van-popup v-model="showPickerdate" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :formatter="formatter"
            :min-date="minDate"
            @cancel="showPickerdate = false"
            @confirm="onConfirmClsj"
          />
        </van-popup>
        <van-field
          required
          v-model="form.ffrdb"
          v-validate="'required'"
          name="ffrdb"
          clearable
          label="法人代表"
          placeholder="法人代表"
          data-vv-as="法人代表"
        />
        <van-field
          required
          v-model="form.fsex"
          v-validate="'required'"
          name="fsex"
          readonly
          clickable
          label="性别"
          :value="value"
          placeholder="选择性别"
          @click="showPicker = true"
          data-vv-as="性别"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="form.fmz"
          name="fmz"
          clearable
          label="民族"
          placeholder="民族"
          data-vv-as="民族"
        />
        <van-field
          v-model="form.fzzmm"
          name="fzzmm"
          clearable
          label="政治面貌"
          placeholder="政治面貌"
          data-vv-as="政治面貌"
        />
        <van-field
          v-model="form.fzw"
          name="fzw"
          clearable
          label="职务"
          placeholder="职务"
          data-vv-as="职务"
        />
        <van-field
          required
          v-model="form.fsfz"
          v-validate="'required'"
          name="fsfz"
          clearable
          label="身份证号码"
          placeholder="身份证号码"
          data-vv-as="身份证号码"
        />
        <van-field
          v-model="form.femail"
          v-validate="'email'"
          name="femail"
          clearable
          label="邮箱地址"
          placeholder="邮箱地址"
          data-vv-as="邮箱地址"
        />
        <van-field
          required
          v-model="form.fmobile"
          v-validate="'required|mobile'"
          name="fmobile"
          clearable
          label="手机号码"
          placeholder="手机号码"
          data-vv-as="手机号码"
        />
        <van-field
          v-model="form.flxdz"
          name="flxdz"
          clearable
          label="联系地址"
          placeholder="联系地址"
          data-vv-as="联系地址"
        />
        <van-field
          v-model="form.fyb"
          name="fyb"
          clearable
          label="邮编"
          placeholder="邮编"
          data-vv-as="邮编"
        />
        <!-- <van-field v-model="fsqrz" name="fsqrz" clearable label="申请分支机构" placeholder="申请分支机构" /> -->
        <van-field
          required
          disabled
          v-model="form.bdepartment.text"
          name="bdepartment"
          v-validate="'required'"
          clearable
          label="分支机构"
          placeholder="分支机构"
          data-vv-as="分支机构"
        >
          <van-button
            slot="button"
            :disabled="isSh"
            size="small"
            @click="onDepartment"
            type="primary"
          >选择</van-button>
        </van-field>
        <van-field
          required
          disabled
          v-model="form.mzw.fmc"
          name="mzw"
          clearable
          label="申请任职"
          placeholder="申请任职"
          data-vv-as="申请任职"
        >
          <van-button
            slot="button"
            :disabled="isSh"
            size="small"
            @click="showPickerzw = true"
            type="primary"
          >选择</van-button>
        </van-field>

        <van-popup v-model="showPickerzw" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnzw"
            value-key="fmc"
            @cancel="showPickerzw = false"
            @confirm="onConfirmzw"
          />
        </van-popup>
        <van-field
          required
          v-model="form.flxr"
          v-validate="'required'"
          name="flxr"
          clearable
          label="联系人"
          data-vv-as="联系人"
          placeholder="联系人"
        />
        <van-field
          required
          v-model="form.flxrdh"
          v-validate="'required|mobile'"
          name="flxrdh"
          clearable
          label="联系人手机"
          placeholder="请输入手机号"
          data-vv-as="手机号"
        />
        <van-field
          required
          v-model="form.flxremail"
          v-validate="'required|email'"
          name="flxremail"
          clearable
          label="联系人邮箱"
          placeholder="联系人邮箱"
          data-vv-as="联系人邮箱"
        />
        <van-field
          v-model="form.fdwjj"
          name="fdwjj"
          v-validate="'required'"
          clearable
          label="单位简介"
          placeholder="单位简介"
          data-vv-as="单位简介"
          type="textarea"
          rows="6"
          autosize
        />
        <van-field v-if="form.id !== '' " v-model="fdjztmc" disabled label="审核状态" />
        <van-uploader
          v-if="form.id !== '' "
          :deletable="!isSh"
          v-model="fileList"
          name="file"
          capture="camera"
          :max-count="1"
          :before-read="beforeRead"
          :after-read="afterRead"
          :upload-text="uploadertext"
          :before-delete="beforeDelete"
          @delete="doDeleteFj"
        />
      </van-cell-group>
      <van-button size="large" type="info" @click="onSubmit">提交</van-button>
      <!-- 机构选择窗口 -->
      <van-popup v-model="showdepartment" position="bottom">
        <van-tree-select
          :max="max"
          ref="helpTree"
          height="100vw"
          :items="items"
          :active-id.sync="activeIds"
          :main-active-index.sync="activeIndex"
          @click-item="onItemClick"
        ></van-tree-select>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  Field,
  Picker,
  CellGroup,
  Cell,
  Radio,
  RadioGroup,
  NavBar,
  Button,
  Card,
  DatetimePicker,
  TreeSelect,
  Toast,
  Notify,
  Dialog,
  Uploader,
  Popup
} from "vant";
import cookies from "@/core/utils/cookies";
import {
  removeLocalStorage,
  getLocalStorage
} from "@/core/utils/local-storage";
const fdjztMap = { "0": "缺申请表", "1": "待审核", "2": "退回", "9": "已审核" };
import {
  mzwlist,
  department,
  savedwsqb,
  checkdwsqb,
  updatedwsqb,
  downloaddwsqb,
  uploaddwsqb,
  deletedwsqb,
  downloaddwsqbimage,
  fileAction
} from "@/api/member";
export default {
  name: "dwsqb",
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [RadioGroup.name]: RadioGroup,
    [NavBar.name]: NavBar,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Card.name]: Card,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Notify.name]: Notify,
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      uploadertext: "单位审批表",
      fileList: [],
      url: savedwsqb,
      fdjztmc: "",
      items: [],
      max: 1,
      showdepartment: false,
      activeIds: [1, 2],
      activeIndex: 0,
      filterText: "",
      selectCell: [], //选中的数据
      form: {
        id: "",
        fdwmc: "",
        fzcdz: "",
        flxdh: "",
        ffax: "",
        fclsj: "",
        ffrdb: "",
        fsex: "",
        fmz: "",
        fzzmm: "",
        fzw: "",
        fsfz: "",
        femail: "",
        fmobile: "",
        flxdz: "",
        fyb: "",
        bdepartment: { id: "", fmc: "" },
        mzw: { fmc: "" },
        flxr: "",
        flxrdh: "",
        flxremail: "",
        fdwjj: ""
      },
      isSubmit: false,
      payWay: "ali",
      value: "",
      columnzw: [],
      showPicker: false,
      showPickerzw: false,
      showPickerdate: false,
      columns: ["女", "男"],
      currentDate: new Date(),
      minDate: new Date(1930, 1, 1)
    };
  },
  computed: {
    // 是否审核
    isSh() {
      return this.form.fdjzt === "9";
    }
  },
  mounted() {
    // let that = this;
    //在模板编译完成后执行
    // this.$eventBus.$on("bdepartment", this.setDepartment);
    this.getUserInfo();
    this.loaddepartment();
    this.loadzw();
    this.check();
  },
  methods: {
    async getUserInfo() {
      const infoData = await getLocalStorage(
        "user_id",
        "Authorization",
        "nick_name",
        "background_image",
        "avatar"
      );
      this.form.fmobile = infoData.user_id;
      this.form.flxrdh = infoData.user_id;
      this.form.fdwmc = infoData.nick_name;
    },
    // 检查申请表是否已经存在，存在就加载数据，允许用户修改
    check() {
      Toast.loading("数据加载中...");
      checkdwsqb()
        .then(response => {
          const { code, msg, data = {}, images = {} } = response;
          if (code === 100) {
            this.form = data;
            // 分支机构数据重新调整
            const bdepartment = data.bdepartment;
            bdepartment["text"] = bdepartment.fmc;
            // 性别调整
            data.fsex = data.fsex === "1" ? "男" : "女";
            this.url = updatedwsqb;
            this.fdjztmc = fdjztMap[data.fdjzt];
            Toast.clear();
            this.loadImage();
          } else {
            this.url = savedwsqb;
          }
        })
        .finally(() => {
          Toast.clear();
        });
    },
    loadImage() {
      Toast.loading({ message: "图片加载中...", duration: 0 });
      this.uploadertext = "下载中...";
      downloaddwsqbimage()
        .then(response => {
          const { code, msg, images = {} } = response;
          if (code === 100) {
            this.fileList = images;
          } else {
            this.uploadertext = "上传申请表...";
          }
          Toast.clear();
        })
        .finally(() => {
          Toast.clear();
        });
    },
    async loaddepartment() {
      const response = await department();
      this.items = response.children;
    },
    // 加载学历数据
    async loadzw() {
      const response = await mzwlist({ criteria: { flb: "DW" } });
      this.columnzw = response.rows;
    },
    onConfirmzw(value) {
      this.form.mzw = value;
      // this.fzhbh = value.id;
      this.showPickerzw = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.form.fsex = value;
      this.showPicker = false;
    },
    onConfirmClsj(value) {
      let todayUTC = new Date(
        Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())
      );
      this.form.fclsj = todayUTC.toISOString().substring(0, 7);
      this.showPickerdate = false;
    },
    onOpen() {
      this.showPickerdate = true;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    onDepartment() {
      this.showdepartment = true;
    },
    onItemClick(data) {
      this.form.bdepartment = data;
      this.showdepartment = false;
    },
    async validate() {
      const result = await this.$validator.validate();
      if (!result) {
        const errMsg = this.errors.items[0].msg;
        Toast(errMsg);
        throw new Error(`表单验证: ${errMsg}`);
      }
    },
    async onSubmit() {
      // debugger;
      try {
        await this.validate();
        Dialog.confirm({
          title: "提示",
          message: "确认提交?"
        })
          .then(() => {
            let params = this.form;
            if (params.fsex === "男") {
              params.fsex = "1";
            } else {
              params.fsex = "0";
            }
            this.url(params).then(response => {
              console.log("userdwsqb:", params);
              let message = "提交成功";
              if (response.code === 100) {
                message = response.msg;
              }
            });
            Notify({ type: "success", message: "数据保存成功！" });
            this.$router.go("-1");
          })
          .catch(() => {});
      } catch (err) {
        console.log(err.message);
        // this.isLogining = false;
      }
    },

    beforeRead(file) {
      // debugger;
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        Toast("文件不能大于 10M");
        return false;
      }

      return true;
    },
    afterRead(file) {
      // 此时将文件上传至服务器
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("id", this.form.id);
      Toast.loading({ duration: 0, message: "图片上传中..." });
      uploaddwsqb(formData)
        .then(response => {
          const { code, msg, data } = response;
          if (code === 100) {
            Notify("附件上传成功！");
            this.fdjztmc = fdjztMap["1"];
            this.fileList = [{ id: data.id, url: data.url }];
          }else {
              Notify(msg);
          }
        })
        .finally(() => {
          Toast.clear();
        });
      // console.log(file);
    },
    // 删除附件
    beforeDelete(file) {
      if (this.form.fdjzt === "9") {
        Notify("单据已经审核，不能删除！");
        return false;
      }
      return true;
    },
    doDeleteFj(file) {
      // debugger;
      Toast.loading({ duration: 0, message: "图片删除..." });
      deletedwsqb(file.id, this.form.id)
        .then(response => {
          const { code, msg } = response;
          if (code === 100) {
            Notify("附件删除成功！");
            this.fdjztmc = fdjztMap["0"];
          } else {
            Notify(msg);
          }
        })
        .finally(() => {
          Toast.clear();
        });
    },
    // 下载申请单
    onClickRight() {
      const url = fileAction("userinfo", "downloaddwsqb");
      const token = cookies.get("token");
      //  debugger
      window.open(`${url}?token=${token}`, "_blank");
      // downloaddwsqb().then(response => {
      //   const url = window.URL.createObjectURL(new Blob([response]));
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.setAttribute("download", "单位申请表.docx"); //or any other extension
      //   document.body.appendChild(link);
      //   link.click();
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.payment_group {
  margin-bottom: 10px;
}
.time_down {
  background-color: #fffeec;
  padding: 10px 15px;
}
.pay_submit {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.pay_way_group img {
  vertical-align: middle;
}
.pay_way_title {
  padding: 15px;
  background-color: #fff;
}
</style>