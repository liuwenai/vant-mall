<template>
  <div>
    <van-nav-bar
      title="会员申请"
      left-text="返回"
      right-text="下载申请表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div>
      <van-cell-group>
        <van-field
          ref="name"
          v-model="form.fname"
          v-validate="'required'"
          name="fname"
          clearable
          label="姓名"
          placeholder="姓名"
          data-vv-as="姓名"
        />
        <van-field
          readonly
          clickable
          v-validate="'required'"
          v-model="form.fsex"
          name="fsex"
          label="性别"
          placeholder="选择性别"
          @click="showPicker = true"
          data-vv-as="性别"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnfsex"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <!-- <van-field v-model="fsex" required clearable label="性别" placeholder="性别" /> -->
        <van-field
          v-model="form.fmz"
          v-validate="'required'"
          name="fmz"
          clearable
          label="民族"
          placeholder="民族"
          data-vv-as="民族"
        />
        <van-field
          v-model="form.fcsny"
          v-validate="'required'"
          name="fcsny"
          clearable
          label="出生年月"
          @click="onOpen"
          placeholder="出生年月"
          data-vv-as="出生年月"
        />
        <van-popup v-model="showPickerdate" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :formatter="formatter"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showPickerdate = false"
            @confirm="onConfirmCsny"
          />
        </van-popup>

        <van-field
          v-model="form.fjg"
          v-validate="'required'"
          name="fjg"
          clearable
          label="籍贯"
          data-vv-as="籍贯"
          placeholder="籍贯"
        />
        <van-field
          v-model="form.fzzmm"
          v-validate="'required'"
          name="fzzmm"
          clearable
          label="政治面貌"
          data-vv-as="政治面貌"
          placeholder="政治面貌"
        />

        <van-field
          v-model="form.fzymc"
          v-validate="'required'"
          name="fzymc"
          clearable
          label="专业"
          placeholder="专业"
          data-vv-as="专业"
          @click="showPickerzy = true"
        />

        <van-popup v-model="showPickerzy" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnzy"
            value-key="fmc"
            @cancel="showPickerzy = false"
            @confirm="onConfirmzy"
          />
        </van-popup>
        <van-field
          v-model="form.fxlmc"
          name="fxlmc"
          v-validate="'required'"
          clearable
          data-vv-as="学历"
          label="学历"
          placeholder="学历"
          @click="showPickerxl = true"
        />

        <van-popup v-model="showPickerxl" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnxl"
            value-key="fmc"
            @cancel="showPickerxl = false"
            @confirm="onConfirmxl"
          />
        </van-popup>
        <van-field
          v-model="form.fdwmc"
          data-vv-as="所在单位"
          name="fdwmc"
          v-validate="'required'"
          clearable
          label="所在单位"
          placeholder="所在单位"
        />

        <van-popup v-model="showPickerdw" position="bottom">
          <van-picker
            show-toolbar
            :columns="columndw"
            value-key="fmc"
            @cancel="showPickerdw = false"
            @confirm="onConfirmdw"
          />
        </van-popup>
        <van-field v-model="form.fksmc" name="fksmc" clearable label="科室" placeholder="科室" />

        <van-popup v-model="showPickerks" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnks"
            value-key="fmc"
            @cancel="showPickerks = false"
            @confirm="onConfirmks"
          />
        </van-popup>

        <van-field
          v-model="form.fzcmc"
          v-validate="'required'"
          name="fzcmc"
          clearable
          data-vv-as="职称"
          label="职称"
          placeholder="职称"
          @click="showPickerzc = true"
        />

        <van-popup v-model="showPickerzc" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnzc"
            value-key="fmc"
            @cancel="showPickerzc = false"
            @confirm="onConfirmzc"
          />
        </van-popup>

        <van-field v-model="form.fzwmc" name="fzwmc" clearable label="职务" placeholder="职务" />
        <van-field
          v-model="form.fmobile"
          v-validate="'required|mobile'"
          name="fmobile"
          clearable
          label="手机号码"
          data-vv-as="手机号码"
          placeholder="手机号码"
        />
        <van-field
          v-model="form.femail"
          name="femail"
          clearable
          label="E-mail"
          placeholder="E-mail"
        />
        <van-field
          v-model="form.flxdz"
          v-validate="'required'"
          name="flxdz"
          clearable
          data-vv-as="联系地址"
          label="联系地址"
          placeholder="联系地址"
          type="textarea"
          rows="1"
          autosize
        />

        <van-field v-model="form.fyb" name="fyb" clearable label="邮编" placeholder="邮编" />

        <van-field
          v-model="form.mzhzw.fmc"
          name="mzhzw"
          v-validate="'required'"
          clearable
          label="总会任职"
          placeholder="总会任职"
          data-vv-as="总会任职"
          @click="showPickerzh = true"
        />

        <van-popup v-model="showPickerzh" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnzh"
            value-key="fmc"
            @cancel="showPickerzh = false"
            @confirm="onConfirmzh"
          />
        </van-popup>

        <van-field
          v-model="form.bdepartment.text"
          name="bdepartment"
          v-validate="'required'"
          clearable
          data-vv-as="分支机构"
          label="分支机构"
          placeholder="分支机构"
          @click="onDepartment"
        />
        <van-field
          v-model="form.mfhzwes[0].fmc"
          v-validate="'required'"
          name="mfhzwes"
          clearable
          label="分支机构职务"
          data-vv-as="分支机构职务"
          placeholder="分支机构职务"
          @click="showPickerfh = true"
        />

        <van-popup v-model="showPickerfh" position="bottom">
          <van-picker
            show-toolbar
            value-key="fmc"
            :columns="columnfh"
            @cancel="showPickerfh = false"
            @confirm="onConfirmfh"
          />
        </van-popup>
        <van-field
          v-model="form.fgrjj"
          name="fgrjj"
          v-validate="'required'"
          clearable
          label="个人简介"
          placeholder="个人简介"
          data-vv-as="个人简介"
          type="textarea"
          rows="6"
          autosize
        />
        <van-field v-if="form.id !== '' " v-model="fdjzt" disabled label="审核状态" />
        <van-uploader
          v-if="form.id !== '' "
          v-model="fileList"
          name="file"
          capture="camera"
          :max-count="1"
          :before-read="beforeRead"
          :after-read="afterRead"
          :upload-text="uploadertext"
        />
      </van-cell-group>
      <van-button size="large" type="info" @click="onSubmit">保存</van-button>
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
  Popup,
  NavBar,
  Button,
  Card,
  DatetimePicker,
  TreeSelect,
  Search,
  Dialog,
  Toast,
  Notify,
  Uploader
} from "vant";
import {
  userinfo,
  checksqb,
  savesqb,
  updatesqb,
  downloadsqb,
  downloadsqbimage,
  uploadsqb,
  mzwlist,
  mzclist,
  mxllist,
  mkslist,
  mlblist,
  mdwlist,
  department,
  usersave
} from "@/api/member";

export default {
  name: "usersqb",
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Card.name]: Card,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect,
    [Notify.name]: Notify,
    [Uploader.name]: Uploader
  },
  data() {
    return {
      uploadertext: "单位审批表",
      url: savesqb,
      fdjzt: "",
      max: 1,
      fileList: [],
      showdepartment: false,
      activeIds: [1, 2],
      activeIndex: 0,
      filterText: "",
      selectCell: [], //选中的数据
      items: [],
      form: {
        id: "",
        fname: "",
        fsex: "",
        fmz: "",
        fjg: "",
        fzzmm: "",
        fcsny: "",
        fmobile: "",
        mzhzw: { id: "", fmc: "会员" },
        mfhzwes: [{ id: "", fmc: "" }],
        bdepartment: { id: "", text: "" },
        fzymc: "",
        fxlbh: "",
        fxlmc: "",
        fzcmc: "",
        fdwmc: "",
        fksmc: "",
        fzcmc: "",
        fzwmc: "",
        fyb: "",
        femail: "",
        flxdz: "",
        fgrjj: ""
      },
      value: "",
      showPicker: false,
      showPickerzh: false,
      showPickerxl: false,
      showPickerzc: false,
      showPickerks: false,
      showPickerzy: false,
      showPickerdw: false,
      showPickerfh: false,
      showPickerdate: false,
      columnfsex: ["女", "男"],
      columnzh: [],
      columnfh: [],
      columnzy: [],
      columnxl: [],
      columnzc: [],
      columndw: [],
      columnks: [],
      currentDate: new Date(1960, 1, 1),
      minDate: new Date(1930, 1, 1),
      maxDate: new Date(2009, 1, 1)
    };
  },
  watch: {},
  mounted() {
    this.check();
    // let that = this;
    //在模板编译完成后执行
    // this.$eventBus.$on("bdepartment", this.setDepartment);
    this.loaddepartment();
    this.loadxl();
    this.loadzy();
    // this.loadzh();
    this.loadzc();
    this.loadks();
    this.loaddw();
    this.loadzh();
    this.loadfh();
  },
  methods: {
    // 检查申请表是否已经存在，存在就加载数据，允许用户修改
    check() {
      Toast.loading({ message: "数据加载中...", duration: 0 });
      userinfo()
        .then(response => {
          const { code, msg, data = {}, images = {} } = response;
          if (code === 100) {
            this.form = data;
            //分支机构数据重新调整
            const bdepartment = data.bdepartment;
            bdepartment["text"] = bdepartment.fmc;
            // 性别调整
            data.fsex = data.fsex === "1" ? "男" : "女";
            debugger
            this.url = updatesqb;
            this.fdjzt = { "1": "待审核", "2": "退回", "9": "已审核" }[
              data.fdjzt
            ];
            Toast.clear();
            this.loadImage();
          } else {
            this.url = savesqb;
          }
        })
        .finally(() => {
          Toast.clear();
        });
    },
    loadImage() {
      Toast.loading({ message: "图片加载中...", duration: 0 });
      this.uploadertext = "下载中...";
      downloadsqbimage()
        .then(response => {
          const { code, msg, images = {} } = response;
          if (code === 100) {
            this.fileList = images.imgList;
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
    async loadxl() {
      const response = await mxllist();
      this.columnxl = response.rows;
    },
    async loadzh() {
      const response = await mzwlist({ criteria: { flb: "ZH" } });
      this.columnzh = response.rows;
    },
    async loadfh() {
      const response = await await mzwlist({ criteria: { flb: "FH" } });
      this.columnfh = response.rows;
    },
    async loadzy() {
      const response = await mlblist();
      this.columnzy = response.rows;
    },
    async loadzc() {
      // debugger;
      const response = await mzclist();
      this.columnzc = response.rows;
    },
    async loadks() {
      const response = await mkslist();
      this.columnks = response.rows;
    },
    async loaddw() {
      const response = await mdwlist();
      this.columndw = response.rows;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.form.fsex = value;
      this.showPicker = false;
    },
    onConfirmzy(value, index) {
      this.form.fzymc = value.fmc;
      // this.fzybh = value.id;
      this.showPickerzy = false;
    },
    onConfirmzh(value) {
      // debugger
      this.form.mzhzw = value;
      // this.fzybh = value.id;
      this.showPickerzh = false;
    },
    onConfirmfh(value) {
      this.form.mfhzwes = [value];
      // this.fzybh = value.id;
      this.showPickerfh = false;
    },
    // 学历选中
    onConfirmxl(value, index) {
      this.form.fxlmc = value.fmc;
      // this.fxlbh = value.id;
      this.showPickerxl = false;
    },
    onConfirmzc(value, index) {
      this.form.fzcmc = value.fmc;
      // this.fzhbh = value.id;
      this.showPickerzc = false;
    },
    onConfirmks(value, index) {
      this.form.fksmc = value.fmc;
      // this.fksbh = value.id;
      this.showPickerks = false;
    },
    onConfirmdw(value, index) {
      this.form.fdwmc = value.fmc;
      // this.fdwbh = value.id;
      this.showPickerdw = false;
    },
    onConfirmCsny(value) {
      let todayUTC = new Date(
        Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())
      );
      this.form.fcsny = todayUTC.toISOString().substring(0, 7);
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
            debugger
            this.url(params).then(response => {
              console.log("usersqb:", params);
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
    onDepartment() {
      // this.$router.push({ name: "department" });
      this.showdepartment = true;
    },
    onItemClick(data) {
      this.form.bdepartment = data;
      this.showdepartment = false;
    },
    // 下载申请单
    onClickRight() {
      downloadsqb().then(response => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "个人申请表.docx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    beforeRead(file) {
      // debugger;
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        Toast("文件不能大于 3M");
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
      uploadsqb(formData)
        .then(response => {
          const { code, msg } = response;
          if (code === 100) {
            Notify("附件上传成功！");
          }
        })
        .finally(() => {
          Toast.clear();
        });
      console.log(file);
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
.bottom_btn {
  padding: 10px 15px 0 15px;
}
</style>