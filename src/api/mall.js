

/**
 * 会员接口
 */

import axios from "./axios";
const prefix = "";


//登录
export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 书籍
export const booklist = () => {
  return axios.get(`${prefix}book/index`);
};

export const bookshow = id => {
  return axios.get(`${prefix}book/index/${id}`);
};

//用户
export const usershow = () => {
  return axios.get(`${prefix}user/show/${params.id}`);
};

export const userupdate = params => {
  return axios.put(`${prefix}user/update`, params)
}


export const usersave = params => {
  return axios.get(`${prefix}user/save/`, params)
}



// // 登录接口
// export const login = params => {
//   return axios.post(`${prefix}login`, params);
// };





