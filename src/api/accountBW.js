import request from '../utils/request'
import store from '../store'
import axios from 'axios'

//获取渠道列表
export function getTableData(params) {
  return request({
    url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/queryPage',
    method: 'post',
    data: params
  })
}

//获取渠道名列表
export function getChannelNames(params) {
  return request({
    url:  process.env.AUTH + '/auth/ChannelMgr/channelNames/get',
    method: 'post',
    data: {}
  })
}

//添加数据
export function addData(params) {
  return request({
    url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/add',
    method: 'post',
    data: params
  })
}

//编辑数据
export function editData(params) {
  return request({
    url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/edit',
    method: 'post',
    data: params
  })
}

//删除数据
export function deleteData(params) {
  return request({
    url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/batchDelete',
    method: 'post',
    data: {
      ids: params
    }
  })
}

//删除批量修改数据
export function exchangeListData(params) {
  return request({
    url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/batchEdit',
    method: 'post',
    data: params
  })
}
//导出数据
export function exportExcelData(params) {
    return request({
      responseType: 'blob',
      url: process.env.AUTH + '/auth/customer/accountBlackAndWhiteList/download',
      method: 'post',
      data: params
    })
}
