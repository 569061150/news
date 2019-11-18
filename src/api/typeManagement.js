import request from '../utils/request'
import store from '../store'
import axios from 'axios'

//获取数据列表
export const getTableData = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/queryPage',
    method: 'post',
    data: params
  })
}

//获取渠道名列表
export function getChannelNames(params) {
  return request({
    url: process.env.AUTH + '/auth/akmgChannelMgr/channel/getChannelNames',
    method: 'post',
    data: {}
  })
}


// 导出数据
export function exportExcelData(params) {
  return request({
    responseType: 'blob',
    url: process.env.AUTH + '/auth/akmgChannelMgr/channel/export',
    method: 'post',
    data: params
  })
}
