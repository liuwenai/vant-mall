

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

export const bookshow = (params) => {
  return axios.get(`${prefix}book/show/${params.id}`)
}

export const bookupdate = (params) => {
  return axios.post(`${prefix}book/update`, params)
}

//用户
export const usershow = params => {
  return axios.get(`${prefix}user/show/${params.id}`);
};

export const userupdate = params => {
  return axios.post(`${prefix}user/update`, params)
}


export const userdelete = params => {
  return axios.post(`${prefix}user/delete/${params.id}`)
}

export const usersave = params => {
  return axios.post(`${prefix}user/save`, params)
}

//订单

export const mordersave = (params) => {
  return axios.post(`${prefix}morder/save`, params)
}

export const cartlist = () => {
  return axios.get(`${prefix}cart/index`)
}

export const cartupdate = (params) => {
  return axios.post(`${prefix}cart/update`, params)
}

export const itemorderdelete = (params) => {
  return axios.post(`${prefix}cart/delete/${params.id}`)
}

export const addCart = (bookid,booksl) => {
  return axios.post(`${prefix}cart/addCart/${bookid}/${booksl}`)
}

export const morderlist = () => {
  return axios.get(`${prefix}morder/index`);
};

export const itemordershow = (params) => {
  return axios.get(`${prefix}itemorder/show/${params.id}`)
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



