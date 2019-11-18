import request from '../utils/request'
import store from '../store'
import axios from 'axios'

//获取渠道列表
export function getTableData(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/app/getAll',
    method: 'post',
    data: params
  })
}

//获取渠道名列表
export function getChannelNames(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/app/get',
    method: 'post',
    data: {}
  })
}

//添加渠道
export function addData(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/app/add',
    method: 'post',
    data: params
  })
}

//编辑渠道    去掉
export function editData(params) {
  return request({
    url: process.env.AUTH + '/auth/ChannelMgr/edit',
    method: 'post',
    data: params
  })
}

//删除渠道
export function deleteData(params) {
  return request({
    url: process.env.AUTH + '/auth/ChannelMgr/batchDelete',
    method: 'post',
    data: {
      ids: params
    }
  })
}
