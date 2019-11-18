import request from '../utils/request'
import store from '../store'

//获取数据列表
export const getTableData = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/queryPage',
    method: 'post',
    data: params
  })
}

// 删除数据列表
export const deleteRoleDates = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/batchDelete',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

// 创建 -- 添加用户 =>  查询用户列表
export const addListUser = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/queryPage',
    method: 'post',
    data: params
  })
}

// 创建 -- 添加角色 =>  查询用户列表
export const addListRole = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserRole/queryPage',
    method: 'post',
    data: params
  })
}

// 创建 -- 系统用户组 =>  提交
export const sysUserGroupAdd = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/add',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//  修改 -- 添加用户 =>  查询用户列表
export const sysUserServer = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/queryPageSelectByGroup',
    method: 'post',
    data: params,
  })
}

//  修改 -- 添加角色 =>  查询用户列表
export const sysRoleServer = (params) => {
  return request({
    url: process.env.SYSUSER + 'sysuser/sysUserRole/queryPageSelectByGroup',
    method: 'post',
    data: params,
  })
}

// 修改 -- 系统用户组 =>  提交
export const sysUpdateSubmit = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/update',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//   用户管理 -- 查询
export const queryPageAssociateGroupNames = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/queryPageAssociateGroupNames',
    method: 'post',
    data: params
  })
}

//   用户管理 -- 删除
export const userbatchDelete = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/batchDelete',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//   重置密码 -- 提交
export const resetPassword = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/resetPassword',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//   获取用户组 -- 提交
export const getAllqueryPage = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/queryPage',
    method: 'post',
    data: params
  })
}

//   新增用户 -- 提交
export const userAdd = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/add',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//  修改用户 -- 提交
export const userUpdate = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUser/update',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}

//  修改用户 -- 获取用户组
export const getQueryPageSelectByUser = (params) => {
  return request({
    url: process.env.SYSUSER + '/sysuser/sysUserGroup/queryPageSelectByUser',
    method: 'post',
    data: params,
    headers: {
      "userId": "1"
    }
  })
}


