import axios from 'axios'
import { showFailToast } from 'vant';
import router from "../router"



axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
      config.headers.Authorization = token
  }
  return config
})

// 响应拦截
axios.interceptors.response.use(res => {
  if (res.data.status >= 400 && res.data.status < 500) {  // 程序性错误
    router.push('/login')
    return Promise.reject(res.data)
  } else if (res.status !== 200) { // 程序错误
    showFailToast('服务端异常');
  } else {
    if (res.data.code !== '8000') { // 逻辑性错误
      showFailToast(res.data.msg);
      return Promise.reject(res)
      // return res.data
    }
    return res.data
  }
})

export default axios