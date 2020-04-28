

/**
 * 会员接口
 */

import axios from "./axios";
const prefix = "";


// 显示用户聘书
export const booklist = () => {
  return axios.get(`${prefix}book/index`);
};

// 显示用户聘书
export const bookshow = id => {
  return axios.get(`${prefix}book/index/${id}`);
};


