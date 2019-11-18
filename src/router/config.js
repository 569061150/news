export default [
  {
    "resourceId": 1,
    "path": "/checkup",
    "title": "鉴权管理",
    "children": [{
      "resourceId": 2,
      "path": "/checkup/equipment",
      "title": "设备鉴权",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {"actionName": "统计", "actionUrl": "/export"}],
      "parentId": 1,
      "resourceHierarchy": "/鉴权管理/设备鉴权",
      "resourceLevel": 2
    }, {
      "resourceId": 3,
      "path": "/checkup/account",
      "title": "账号鉴权",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {"actionName": "统计", "actionUrl": "/export"}],
      "parentId": 1,
      "resourceHierarchy": "/鉴权管理/账号鉴权",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/鉴权管理",
    "resourceLevel": 1
  }, {
    "resourceId": 4,
    "path": "/blackWhiteList",
    "title": "黑白名单管理",
    "children": [{
      "resourceId": 6,
      "path": "/blackWhiteList/account",
      "title": "账号黑白名单",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 4,
      "resourceHierarchy": "/黑白名单管理/账号黑白名单",
      "resourceLevel": 2
    }, {
      "resourceId": 5,
      "path": "/blackWhiteList/equipment",
      "title": "设备黑白名单",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 4,
      "resourceHierarchy": "/黑白名单管理/设备黑白名单",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/黑白名单管理",
    "resourceLevel": 1
  }, {
    "resourceId": 7,
    "path": "/channel",
    "title": "渠道管理",
    "children": [{
      "resourceId": 8,
      "path": "/channel/management",
      "title": "渠道管理",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 7,
      "resourceHierarchy": "/渠道管理/渠道管理",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/渠道管理",
    "resourceLevel": 1
  }, {
    "resourceId": 9,
    "path": "/reportForms",
    "title": "报表中心",
    "children": [{
      "resourceId": 10,
      "path": "/reportForms/management",
      "title": "报表管理",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 9,
      "resourceHierarchy": "/报表中心/报表管理",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/报表中心",
    "resourceLevel": 1
  }, {
    "resourceId": 11,
    "path": "/systemLogs",
    "title": "系统日志",
    "children": [{
      "resourceId": 12,
      "path": "/systemLogs/logs",
      "title": "系统日志",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 11,
      "resourceHierarchy": "/系统日志/系统日志",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/系统日志",
    "resourceLevel": 1
  }, {
    "resourceId": 20,
    "path": "/role",
    "title": "角色权限",
    "children": [{
      "resourceId": 21,
      "path": "/role/use_group_management",
      "title": "用户组管理",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 20,
      "resourceHierarchy": "/角色权限/用户组管理",
      "resourceLevel": 2
    }, {
      "resourceId": 23,
      "path": "/role/use_management",
      "title": "用户管理",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 20,
      "resourceHierarchy": "/角色权限/用户管理",
      "resourceLevel": 2
    }, {
      "resourceId": 22,
      "path": "/role/role_management",
      "title": "角色权限管理",
      "actions": [{"actionName": "查看", "actionUrl": "/view"}, {
        "actionName": "删除",
        "actionUrl": "/delete"
      }, {"actionName": "新增", "actionUrl": "/insert"}, {"actionName": "修改", "actionUrl": "/update"}],
      "parentId": 20,
      "resourceHierarchy": "/角色权限/角色权限管理",
      "resourceLevel": 2
    }],
    "actions": [{"actionName": "查看", "actionUrl": "/view"}],
    "resourceHierarchy": "/角色权限",
    "resourceLevel": 1
  }
]
