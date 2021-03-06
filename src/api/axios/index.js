import axios from 'axios'
import cookies from '@/core/utils/cookies'
import { Toast } from 'vant'
import { removeLocalStorage } from '@/core/utils/local-storage';

// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg)
  throw err
}
function errorLog (error) {
  Toast(error.message)
}

// baseURL: process.env.VUE_APP_API,

export const baseURL = 'http://182.92.224.77:7090' 
// export const baseURL = 'http://192.168.0.103:7090' 
// 创建一个 axios 实例
// const service = axios.create({
//   baseURL,
//  timeout: 50000 // 请求超时时间
// })
axios.defaults.timeout = 1200000
// 开发模式
axios.defaults.baseURL = 'http://localhost:9090'
// axios.defaults.baseURL = 'http://192.168.0.103:7090' 
// axios.defaults.baseURL = 'http://192.168.8.110:7090'

// 打包模式
// axios.defaults.baseURL = 'http://182.92.224.77:7090' 

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token
    // config.headers.common['Authorization'] = `Bearer ${token}`
    // config.headers.common['Host'] = 'localhost:52700'
    config.headers.common['Authorization'] = `Bearer ${token}`

    // config.headers.common['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIm5iZiI6MTU1MzYwMzE0OSwiaXAiOiIxMjcuMC4wLjEiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sIm5hbWUiOiLnrqHnkIblkZgiLCJpc3MiOiJzZWN1cml0eSIsImV4cCI6MTU4NTEzOTE0OSwiaWF0IjoxNTUzNjAzMTQ5fQ.0MSbD769P1q3AXBwAR4vE4kN0tv-pwgSIyIzFL8HUOM'

    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 100:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case -100:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case 401:
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: 401 ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          if(error.response.data.message && error.response.data.message === "User Not Found"){
            error.message = '用户不存在！'
          }else if(error.response.data.message && error.response.data.message === "Credentials Do Not Match"){
            error.message = '密码错误！'
          }else{
            error.message = '未授权，请登录'
            cookies.remove('token')
            removeLocalStorage('Authorization','user_id')
            // window.location.href = "/login";
          }
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default axios
