import request from '../utils/request'
import store from '../store'
import axios from 'axios'

// 获取渠道列表
export function getTableData(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/appKey/getAll',
    method: 'post',
    data: params
  })
}

// 获取渠道名列表
export function getChannelNames(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/appKey/get',
    method: 'post',
    data: {}
  })
}

// 添加渠道
export function addData(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/appKey/add',
    method: 'post',
    data: params
  })
}
