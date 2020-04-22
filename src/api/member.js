
/**
 * 会员接口
 */

import axios from "./axios";
const prefix = "";

const AddressList='wx/address/list'; //收货地址列表
export function addressList(query) {
  return request({
    url: AddressList,
    method: 'get',
    params: query
  })
}

// 登录接口
export const login = params => {
  return axios.post(`${prefix}login`, params);
};

// 用户信息绑定
export const userbind = params => {
  return axios.post(`${prefix}register/bind`, params);
};
// 用户是否存在
export const usercheck = (name, mobile) => {
  return axios.get(`${prefix}register/check?name=${name}&mobile=${mobile}`);
};

// 注册用户送注册码
export const registerCode = mobile => {
  return axios.post(`${prefix}register/registerCode/${mobile}`);
};

// 忘记密码或绑定用户时候
export const sendCode = mobile => {
  return axios.post(`${prefix}register/sendCode/${mobile}`);
};

// 重置密码
export const resetPwd = params => {
  return axios.post(`${prefix}register/resetPwd`, params);
};

/**
 * 用户注册
 * params 对应参数
 * {
 * name:姓名,
 * mobile:手机号,
 * code:验证码,
 * password:密码,
 * }
 */
export const usersave = params => {
  return axios.post(`${prefix}register/save`, params);
};

// 文件下载
export const fileAction = (controller, action = "download") => {
  return axios.defaults.baseURL + `/${prefix}${controller}/${action}`;
};

// 用户注册申请表检查
export const checksqb = () => {
  return axios.get(`${prefix}userinfo/checksqb`);
};

// 用户注册申请表保存
export const savesqb = params => {
  return axios.post(`${prefix}userinfo/savesqb`, params);
};
// 用户申请表更新
export const updatesqb = params => {
  return axios.post(`${prefix}userinfo/updatesqb`, params);
};
// 用户申请表下载
export const downloadsqb = () => {
  return axios.get(`${prefix}userinfo/downloadsqb`);
};

// 用户申请表图片下载
export const downloadsqbimage = () => {
  return axios.get(`${prefix}userinfo/downloadsqbimage`);
};

// 用户申请表上传
export const uploadsqb = params => {
  return axios.post(`${prefix}userinfo/uploadsqb`, params);
};

// 用户申请表提交
export const submitsqb = id => {
  return axios.post(`${prefix}userinfo/submitsqb/${id}`);
};

// 用户申请表上传
export const uploadsqbpic = params => {
  return axios.post(`${prefix}userinfo/uploadsqbpic`, params);
};

// 用户申请表删除
export const deletesqb = (fjid,id) => {
  return axios.post(`${prefix}userinfo/deletesqb/${fjid}/${id}`);
};

// 用户申请表个人图片删除
export const deletesqbpic = (fjid,id) => {
  return axios.post(`${prefix}userinfo/deletesqbpic/${fjid}/${id}`);
};
// 用户申请表删除
export const deletedwsqb = (fjid,id) => {
  return axios.post(`${prefix}userinfo/deletedwsqb/${fjid}/${id}`);
};

// 显示用户聘书
export const usercert = () => {
  return axios.get(`${prefix}userinfo/showcert`);
};
// 下载用户聘书
export const downloadcert = () => {
  return axios.get(`${prefix}userinfo/downloadcert`);
};

// 单位申请表注册前检查
export const checkdwsqb = () => {
  return axios.get(`${prefix}userinfo/checkdwsqb`);
};

// 单位注册申请表保存
export const savedwsqb = params => {
  return axios.post(`${prefix}userinfo/savedwsqb`, params);
};

// 单位申请表更新
export const updatedwsqb = params => {
  return axios.post(`${prefix}userinfo/updatedwsqb`, params);
};

// 单位申请表下载
export const downloaddwsqb = () => {
  return axios.get(`${prefix}userinfo/downloaddwsqb`);
};

// 单位申请表图片下载
export const downloaddwsqbimage = () => {
  return axios.get(`${prefix}userinfo/downloaddwsqbimage`);
};

// 单位申请表上传
export const uploaddwsqb = params => {
  return axios.post(`${prefix}userinfo/uploaddwsqb`, params);
};

//二级机构数据
export const department = (pid = "root", rootMc = "部门字典", key = "text") => {
  return axios.get(
    `${prefix}department/alltree?pid=${pid}&rootMc=${rootMc}&key=${key}`
  );
};

// 资讯列表
export const newslist = params => {
  return axios.post(`${prefix}register/listnews`, params);
};
// 资讯列表
export const newsdetail = id => {
  return axios.get(`${prefix}register/shownews/${id}`);
};

// 用户信息接口
export const userinfo = () => {
  return axios.get(`${prefix}userinfo`);
};

// 用户缴费历史
export const userpaylist = (params ={offset:0,max:20} ) => {
  return axios.post(`${prefix}userinfo/paylist`,params);
};

// 显示订单信息
export const userorder = id => {
  return axios.get(`${prefix}userinfo/order?id=${id}`);
};

/**
 * 保存订单
 * params ={fdesc:'订单描述',fje:100}
 */
export const usersaveOrder = params => {
  return axios.post(`${prefix}userinfo/saveOrder`, params);
};

// 订单列表
export const userlistOrder = () => {
  return axios.get(`${prefix}userinfo/listOrder`);
};

// 获取新闻列表
export const getNewsList = () => axios.get("/getnewslist");

// 获取新闻详情
export const getNewsDetail = id => axios.get(`/getnew/${id}`);

// --------------- 以下是字典相关接口 -------------
// 职称接口
export const mzclist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mzc/list`, params);
};
// 职务接口
export const mzwlist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mzw/list`, params);
};
// 类别接口
export const mlblist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mlb/list`, params);
};
// 单位接口
export const mdwlist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mdw/list`, params);
};
// 学历接口
export const mxllist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mxl/list`, params);
};
// 科室接口
export const mkslist = (params = { max: 40, criteria: {} }) => {
  return axios.post(`${prefix}mks/list`, params);
};

// 首页图片轮播图
export const cimagelist = (params = { offset:0, max: 5, criteria: {} }) => {
  return axios.post(`${prefix}cimage/list`, params);
};

// 报名列表接口
export const bmlist = (params = { offset:0, max: 5, criteria: {} }) => {
  return axios.post(`${prefix}h5/bmlist`, params);
};

// 报名细节
export const bmshow = id => {
  return axios.get(`${prefix}h5/bmshow/${id}`);
};
// 报名细节
export const bmsave = params => {
  return axios.post(`${prefix}h5/bmsave`,params);
};


