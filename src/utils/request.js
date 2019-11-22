import axios from 'axios'
import store from '../store'
import {
  Message,
  Loading
} from 'element-ui'

let loading

// 使用Element loading-start 方法
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'none',
    fullscreen: true
  })
}

// 使用Element loading-close 方法
function endLoading() {
  loading.close()
}

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 10000 // request timeout
});

// 请求数据拦截器
service.interceptors.request.use(config => {
  startLoading();
  config.cancelToken = new axios.CancelToken((cancel) => {
    store.commit('pushToken', {cancelToken: cancel})
  });
  let token = !!window.localStorage.getItem('user_info') ? JSON.parse(window.localStorage.getItem('user_info')).token : ''
  if (token) {
    config.headers['token'] = token;
  }
  return config
}, error => {
  endLoading();
  return Promise.reject(error)
})

//接收响应拦截器
service.interceptors.response.use(response => {
  endLoading(); // 响应成功关闭loading
  switch (response.data.code) {
    case 8004:
      store.commit('logOut');
      break;
  }
  if (response.data.code == 307000) {
    Message({
      showClose: true,
      message: response.data.message,
      duration: 2000,
      type: 'error'
    });
  } else if (response.data.code == 308004) {
    store.dispatch('LogOut');
    Message({
      showClose: true,
      message: '请求超时，请重新登录！',
      duration: 2000,
      type: 'error'
    });
  }
  return response
}, error => {
  if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
    Message({
      showClose: true,
      message: '请求超时，请稍后再试！',
      duration: 2000,
      type: 'error'
    });
  }
  //Message.closeAll()
  endLoading()
  return Promise.reject(error)
})

export default service
