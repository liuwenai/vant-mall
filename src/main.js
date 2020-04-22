import Vue from 'vue';
import App from './App';
import {
  Icon,
  Cell,
  CellGroup,
  loading,
  Button,
  Toast,
  Lazyload
} from 'vant';
import {
  router
} from './router/router';
import '@/assets/less/mixin/common.less';
// import global_ from './view/config';

import VeeValidate, {
  Validator
} from 'vee-validate';
import zhCN from 'vee-validate/dist/locale/zh_CN';
import api from './api/member.js';
Validator.localize('zh-CN', zhCN);
Vue.use(VeeValidate, {
  locale: 'zh-CN'
});
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Lazyload)
Vue.prototype.$api = api
Vue.prototype.$eventBus = new Vue()
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
// 手机号码验证
Validator.extend("mobile", {
  getMessage: () => `请输入正确的手机号码`,
  validate: value =>
    value.length === 11 &&
    /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(
      value
    )
});
// Validator.extend("email", {
//   getMessage: () => `邮箱格式错误`,
//   validate: value =>
//     /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(
//       value
//     )
// });