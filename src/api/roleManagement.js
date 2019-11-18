import request from '../utils/request'
import store from '../store'
import axios from 'axios'

//获取数据列表
export function getTableData(params) {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/queryPage',
    method: 'post',
    data: params
  })
}
//获取权限模块
export function getRoleRightList() {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/getAllModuleList',
    method: 'post',
    data: {}
  })
}


//添加数据
export function addData(params) {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/add',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}
//编辑数据
export function getDataById(id) {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/findAssociate/' + id,
    method: 'post',
    data: {
      id: id
    }
  })
}

//编辑数据
export function editData(params) {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/update',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//删除数据
export function deleteData(params) {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/batchDelete',
    method: 'post',
    data: {
      ids: params
    },
    headers: {
      "userId": "1"
    }
  })
}
