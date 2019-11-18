import request from '../utils/request'
import store from '../store'

// 登陆
export const login = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sys/login',
    method: 'post',
    data: params
  })
}

// 登出
export const exit = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sys/signout',
    method: 'post',
    data: params
  })
}

// 修改密码
export const changePassword = (params) => {
  return request({
    url: process.env.AUTH + '/sysuser/sysUser/changePassword',
    method: 'post',
    data: params
  })
}
