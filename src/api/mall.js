

/**
 * 会员接口
 */

import axios from "./axios";
const prefix = "";


// 显示用户聘书
export const booklist = () => {
  return axios.get(`${prefix}book/index`);
};
// 下载用户聘书
export const downloadcert = () => {
  return axios.get(`${prefix}userinfo/downloadcert`);
};


