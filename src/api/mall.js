

/**
 * 
 */

import axios from "./axios";
const prefix = "";


// 登录接口
export const login = params => {
  return axios.post(`${prefix}login`, params);
};

// 用户信息接口
export const userlist = () => {
  return axios.get(`${prefix}user/index`);
};

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

//订单

export const itemordersave = params => {
  return axios.get(`${prefix}itemorder/save/`, params)
}

//地址

export const addresslist = () => {
  return axios.get(`${prefix}address/index`)
}

export const addressupdate = (params) => {
  return axios.post(`${prefix}address/update`, params)
}

export const addressdelete = (params) => {
  return axios.post(`${prefix}address/delete/${params.id}`)
}

export const addresssave = (params) => {
  return axios.post(`${prefix}address/save`, params)
}

export const addressshow = (params) => {
  return axios.get(`${prefix}address/show/${params.id}`)
}



