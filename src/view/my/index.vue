<template>
	<div class="store_header">
		<div class="store_avatar">
			<img src="../../assets/images/avatar_default.png" alt="头像" width="55" height="55">
		</div>
		<div class="store_name">用户登录</div>
	</div>
</template>

<script>
import {
  List,
  CellGroup,
  Cell,
  Radio,
  RadioGroup,
  NavBar,
  Card,
  Loading
} from "vant";
import { userinfo } from "@/api/member";
import { join } from "path";

export default {
  name: "payment",
  components: {
    [List.name]: List,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [NavBar.name]: NavBar,
    [Card.name]: Card
  },
  data() {
    return {
      name: "",
      sex: "",
      csny: "",
      mobile: "",
      fzr: "",
      zhzw: "",
      fhzw: [],
      rjmc: "",
      zymc: "",
      xlmc: "",
      zcmc: "",
      dwmc: "",
      ksmc: "",
      yx: "",
      lxdz: "",
      isSubmit: false,
      payWay: "ali",
      loading: false,
      error: ""
    };
  },
  mounted() {
    this.loadUser();
  },

  methods: {
    loadUser() {
      // debugger;
      userinfo().then(response => {
        if (response.code === 100) {
          this.name = response.data.fname;
          let fsex = response.data.fsex;
          if (fsex === "0") {
            this.sex = "女";
          } else {
            this.sex = "男";
          }
          this.csny = response.data.fcsny;
          this.mobile = response.data.fmobile;
          let ffzr = response.data.ffzr;
          if (ffzr === false) {
            this.fzr = "否";
          } else {
            this.fzr = "是";
          }
          this.zhzw = response.data.mzhzw.fmc;
          this.fhzw = response.data.mfhzwes
            .map(item => {
              return item.fmc;
            })
            .join(",");
          this.rjmc = response.data.bdepartment.fmc;
          this.zymc = response.data.fzymc;
          this.xlmc = response.data.fxlmc;
          this.zcmc = response.data.fzcmc;
          this.dwmc = response.data.fdwmc;
          this.ksmc = response.data.fksmc;
          this.yx = response.data.femail;
          this.lxdz = response.data.flxdz;
        }
      });
      this.loading = false;
    },
    paySubmit() {
      this.$router.push({
        name: "paymentStatus",
        params: {
          status: "success"
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },

    onClickRight() {
      this.$router.replace("usersqb");
    }
  }
};
</script>

<style lang="less" scoped>
.store_header {
  text-align: center;
  padding: 30px 0;
  .store_avatar img {
    border-radius: 50%;
  }
  .store_name {
    padding-top: 5px;
    font-size: 16px;
  }
}
</style>