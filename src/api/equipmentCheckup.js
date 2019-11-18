import request from '../utils/request'
import store from '../store'
import axios from 'axios'

//获取数据列表
export function getTableData(params) {
  return request({
    url: process.env.AUTH + '/auth/deviceAuthRecord/queryPage',
    method: 'post',
    data: params
  })
}
