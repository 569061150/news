拖拽：
https://www.npmjs.com/package/awe-dnd
"sortablejs": "^1.10.1",

Request URL: http://10.42.7.162:8080/auth/akmgChannelMgr/channel/getChannelNames
{"code":301000,"message":"success","data":{"list":["长城后视镜","仙豆智能TSP","eueueu","HU05","hulog","ew","ew1","erer","eww","weather","config-center","third-system-service","hufront-api","front-api","backend-api","srm-api","call-center","srm-operation-api","srm-app","srm-weixin","srm-dealer-app","srm-device","srm-operation","长城后视镜ab","长城后视镜TESTabc","长城后视镜TESTabcd","长城后视镜TESTabcde","长城后视镜TESTaa","供应者TESTAB","长城后视镜a","长城后视镜AAA","123","呼叫中心前台","呼叫中心后台"]}}

Request URL: http://10.42.1.233:8080/sysuser/sysUserGroup/queryPage
{"code":301000,"message":"success","data":{"pageNum":1,"pageSize":10,"total":27,"pages":3,"list":[{"id":1,"createdAt":"2019-06-26 02:16:00","createdBy":1,"modifiedAt":"2019-09-26 05:05:36","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"管理员组","groupCode":"admin","groupDesc":"管理员组，拥有所有权限"},{"id":2,"createdAt":"2019-06-28 21:27:45","createdBy":1,"modifiedAt":"2019-11-08 23:31:13","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"开发组1","groupCode":"dev12","groupDesc":"开发组1"},{"id":7,"createdAt":"2019-07-16 03:21:06","createdBy":1,"modifiedAt":"2019-07-16 03:21:06","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"2","groupCode":"2","groupDesc":""},{"id":8,"createdAt":"2019-07-16 03:21:18","createdBy":1,"modifiedAt":"2019-07-16 03:21:18","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"21","groupCode":"21","groupDesc":""},{"id":9,"createdAt":"2019-07-16 03:22:05","createdBy":1,"modifiedAt":"2019-07-16 03:22:05","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"211","groupCode":"211","groupDesc":""},{"id":13,"createdAt":"2019-07-16 03:24:51","createdBy":1,"modifiedAt":"2019-07-16 03:24:51","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"1323","groupCode":"321","groupDesc":"321313"},{"id":14,"createdAt":"2019-07-16 03:26:39","createdBy":1,"modifiedAt":"2019-07-16 03:26:39","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"gg","groupCode":"gg","groupDesc":"333"},{"id":15,"createdAt":"2019-07-16 03:27:07","createdBy":1,"modifiedAt":"2019-07-16 03:27:07","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"aaa","groupCode":"aaa","groupDesc":"aaa"},{"id":16,"createdAt":"2019-07-16 03:27:11","createdBy":1,"modifiedAt":"2019-07-16 03:27:11","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"342","groupCode":"13213","groupDesc":"123213"},{"id":25,"createdAt":"2019-07-16 05:25:50","createdBy":1,"modifiedAt":"2019-07-16 05:25:50","modifiedBy":1,"tenantId":1,"deletedAt":null,"groupName":"ccc","groupCode":"ccc","groupDesc":"ccc"}]}}


//  输入中：判断是否
//   1。 为空 = 添加“err nulls”，
//   2。 不为空 = 输入规则1-9，先去除所有不为空的状态“err nulls”,因为为空本身需要状态提示不能去掉
//   3。 筛选所有重复的索引出来，并且添加状态“err nulls”
// 失去焦点：遍历所有
//   1。 为空 = 添加“err nulls”，
//   2。 不为空 = 先移除所有的状态 “err nulls”，在把重复的状态加回来
