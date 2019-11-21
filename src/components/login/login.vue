<template>
  <el-row class="container">
    <!-- <el-header>
      长城汽车
    </el-header>-->
    <el-col class="bg-box" :span="15">
      <img class="bg" :src="imgBase+'/icon/login/loginBg.png'"/>
    </el-col>

    <div class="loginCenter">
      <img class="mLog" :src="imgBase+'/icon/login/log.png'"/>
      <img class="logintit" :src="imgBase+'/icon/login/logintit.png'"/>
      <el-col class="form-container">
        <div class="form-box">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-loginForm">
            <h1 class="title-container">欢迎登录车机应用管理平台</h1>

            <el-form-item class="form-item-box" prop="userName">
              <el-input
                class="_beantech-input-box"
                placeholder="请输入账户"
                v-model="loginForm.userName"
                prefix-icon="el-icon-user"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-box" prop="password">
              <el-input
                class="_beantech-input-box"
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item-box" prop="sliderValue">
              <SliderVerificationCode textColor='#000000' background='#e8e8e8' v-model="loginForm.sliderValue"
                                      @change="handleChangeSlider"/>
            </el-form-item>
            <el-form-item class="form-item-box">
              <el-button style="width: 100%;margin: 25px 0;" type="primary" @click="submitForm('loginForm')">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <Footer></Footer>
    </div>


  </el-row>
</template>

<script>
    import Footer from "@/components/defaut/footer";
    import {login} from "@/api/userLogin";
    import {mapState, mapMutations} from "vuex";

    export default {
        components: {
            Footer
        },
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
                console.log(value.length);
            };

            return {
                loginForm: {
                    userName: "admin",
                    password: "admin",
                    sliderValue: false
                },
                rules: {
                    userName: [{required: true, message: "请输入账户", trigger: "blur"}],
                    password: [{required: true, validator: validatePass, trigger: "blur"}],
                    sliderValue: [
                        {
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error("请拖动 滑块"));
                                }
                                callback();
                            },
                        },
                    ],
                }
            };
        },
        mounted() {
        },
        computed: {
            ...mapState({
                imgBase: state => state.configInfo.imgBase
            })
        },
        methods: {
            handleChangeSlider(value) {
                console.log(value)
                this.$refs.loginForm.validateField('sliderValue');
            },
            login() {

                // let res = {
                //     "code": 301000,
                //     "message": "success",
                //     "data": {
                //         "sysUser": {
                //             "id": 1,
                //             "createdAt": "2019-06-25 23:56:00",
                //             "createdBy": 1,
                //             "modifiedAt": "2019-09-25 09:32:33",
                //             "modifiedBy": 1,
                //             "tenantId": 1,
                //             "deletedAt": null,
                //             "appId": "1",
                //             "userName": "admin",
                //             "userNo": "admin",
                //             "birthday": "2019-06-25",
                //             "city": "上海",
                //             "email": "123@qq.com",
                //             "password": "21232f297a57a5a743894a0e4a801fc3",
                //             "phone": "17612341234",
                //             "sex": 0
                //         },
                //         "privilegeList": [
                //             {
                //                 "id": 17,
                //                 "privilegeName": "渠道管理-模块读",
                //                 "privilegeCode": "channel_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 7,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/渠道管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/channel",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 18,
                //                 "privilegeName": "渠道管理-模块写",
                //                 "privilegeCode": "channel_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 7,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/渠道管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/channel",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 19,
                //                 "privilegeName": "渠道管理-查看",
                //                 "privilegeCode": "channel_mgr_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 8,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/渠道管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/management",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 20,
                //                 "privilegeName": "渠道管理-新增",
                //                 "privilegeCode": "channel_mgr_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 8,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/渠道管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/management",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 21,
                //                 "privilegeName": "渠道管理-修改",
                //                 "privilegeCode": "channel_mgr_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 8,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/渠道管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/management",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 22,
                //                 "privilegeName": "渠道管理-删除",
                //                 "privilegeCode": "channel_mgr_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 8,
                //                 "resourceName": "渠道管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/渠道管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/management",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 23,
                //                 "privilegeName": "报表中心-模块读",
                //                 "privilegeCode": "report_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 9,
                //                 "resourceName": "报表中心",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/报表中心",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/reportForms",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 24,
                //                 "privilegeName": "报表中心-模块写",
                //                 "privilegeCode": "report_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 9,
                //                 "resourceName": "报表中心",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/报表中心",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/reportForms",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 25,
                //                 "privilegeName": "报表管理-查看",
                //                 "privilegeCode": "report_mgr_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 10,
                //                 "resourceName": "报表管理",
                //                 "resourceType": 0,
                //                 "parentId": 9,
                //                 "resourceHierarchy": "/报表中心/报表管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/reportForms/management",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 26,
                //                 "privilegeName": "报表管理-新增",
                //                 "privilegeCode": "report_mgr_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 10,
                //                 "resourceName": "报表管理",
                //                 "resourceType": 0,
                //                 "parentId": 9,
                //                 "resourceHierarchy": "/报表中心/报表管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/reportForms/management",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 27,
                //                 "privilegeName": "报表管理-修改",
                //                 "privilegeCode": "report_mgr_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 10,
                //                 "resourceName": "报表管理",
                //                 "resourceType": 0,
                //                 "parentId": 9,
                //                 "resourceHierarchy": "/报表中心/报表管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/reportForms/management",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 28,
                //                 "privilegeName": "报表管理-删除",
                //                 "privilegeCode": "report_mgr_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 10,
                //                 "resourceName": "报表管理",
                //                 "resourceType": 0,
                //                 "parentId": 9,
                //                 "resourceHierarchy": "/报表中心/报表管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/reportForms/management",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 1,
                //                 "privilegeName": "鉴权管理-模块读",
                //                 "privilegeCode": "auth_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 1,
                //                 "resourceName": "鉴权管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/鉴权管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/checkup",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 2,
                //                 "privilegeName": "鉴权管理-模块写",
                //                 "privilegeCode": "auth_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 1,
                //                 "resourceName": "鉴权管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/鉴权管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/checkup",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 3,
                //                 "privilegeName": "设备鉴权-查看",
                //                 "privilegeCode": "auth_device_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 2,
                //                 "resourceName": "设备鉴权",
                //                 "resourceType": 0,
                //                 "parentId": 1,
                //                 "resourceHierarchy": "/鉴权管理/设备鉴权",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/checkup/equipment",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 4,
                //                 "privilegeName": "设备鉴权-统计",
                //                 "privilegeCode": "auth_device_export",
                //                 "privilegeDesc": null,
                //                 "resourceId": 2,
                //                 "resourceName": "设备鉴权",
                //                 "resourceType": 0,
                //                 "parentId": 1,
                //                 "resourceHierarchy": "/鉴权管理/设备鉴权",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/checkup/equipment",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 5,
                //                 "privilegeName": "用户鉴权-查看",
                //                 "privilegeCode": "auth_account_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 3,
                //                 "resourceName": "账号鉴权",
                //                 "resourceType": 0,
                //                 "parentId": 1,
                //                 "resourceHierarchy": "/鉴权管理/账号鉴权",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/checkup/account",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 6,
                //                 "privilegeName": "用户鉴权-统计",
                //                 "privilegeCode": "auth_account_export",
                //                 "privilegeDesc": null,
                //                 "resourceId": 3,
                //                 "resourceName": "账号鉴权",
                //                 "resourceType": 0,
                //                 "parentId": 1,
                //                 "resourceHierarchy": "/鉴权管理/账号鉴权",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/checkup/account",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 35,
                //                 "privilegeName": "角色权限-模块读",
                //                 "privilegeCode": "sysuserrole_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 20,
                //                 "resourceName": "角色权限",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/角色权限",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/role",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 36,
                //                 "privilegeName": "角色权限-模块写",
                //                 "privilegeCode": "sysuserrole_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 20,
                //                 "resourceName": "角色权限",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/角色权限",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/role",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 37,
                //                 "privilegeName": "用户组管理-查看",
                //                 "privilegeCode": "sys_group_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 21,
                //                 "resourceName": "用户组管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户组管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_group_management",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 38,
                //                 "privilegeName": "用户组管理-新增",
                //                 "privilegeCode": "sys_group_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 21,
                //                 "resourceName": "用户组管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户组管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_group_management",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 39,
                //                 "privilegeName": "用户组管理-修改",
                //                 "privilegeCode": "sys_group_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 21,
                //                 "resourceName": "用户组管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户组管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_group_management",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 40,
                //                 "privilegeName": "用户组管理-删除",
                //                 "privilegeCode": "sys_group_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 21,
                //                 "resourceName": "用户组管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户组管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_group_management",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 41,
                //                 "privilegeName": "角色权限管理-查看",
                //                 "privilegeCode": "sys_role_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 22,
                //                 "resourceName": "角色权限管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/角色权限管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/role_management",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 42,
                //                 "privilegeName": "角色权限管理-新增",
                //                 "privilegeCode": "sys_role_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 22,
                //                 "resourceName": "角色权限管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/角色权限管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/role_management",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 43,
                //                 "privilegeName": "角色权限管理-修改",
                //                 "privilegeCode": "sys_role_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 22,
                //                 "resourceName": "角色权限管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/角色权限管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/role_management",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 44,
                //                 "privilegeName": "角色权限管理-删除",
                //                 "privilegeCode": "sys_role_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 22,
                //                 "resourceName": "角色权限管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/角色权限管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/role_management",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 45,
                //                 "privilegeName": "用户管理-查看",
                //                 "privilegeCode": "sys_user_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 23,
                //                 "resourceName": "用户管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_management",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 46,
                //                 "privilegeName": "用户管理-新增",
                //                 "privilegeCode": "sys_user_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 23,
                //                 "resourceName": "用户管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_management",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 47,
                //                 "privilegeName": "用户管理-修改",
                //                 "privilegeCode": "sys_user_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 23,
                //                 "resourceName": "用户管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_management",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 48,
                //                 "privilegeName": "用户管理-删除",
                //                 "privilegeCode": "sys_user_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 23,
                //                 "resourceName": "用户管理",
                //                 "resourceType": 0,
                //                 "parentId": 20,
                //                 "resourceHierarchy": "/角色权限/用户管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/role/use_management",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 7,
                //                 "privilegeName": "黑白名单管理-模块读",
                //                 "privilegeCode": "blackwhitelist_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 4,
                //                 "resourceName": "黑白名单管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/黑白名单管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/blackWhiteList",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 8,
                //                 "privilegeName": "黑白名单管理-模块写",
                //                 "privilegeCode": "blackwhitelist_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 4,
                //                 "resourceName": "黑白名单管理",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/黑白名单管理",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/blackWhiteList",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 9,
                //                 "privilegeName": "设备黑白名单-查看",
                //                 "privilegeCode": "blacklist_device_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 5,
                //                 "resourceName": "设备黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/设备黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/equipment",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 10,
                //                 "privilegeName": "设备黑白名单-新增",
                //                 "privilegeCode": "blacklist_device_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 5,
                //                 "resourceName": "设备黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/设备黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/equipment",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 11,
                //                 "privilegeName": "设备黑白名单-修改",
                //                 "privilegeCode": "blacklist_device_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 5,
                //                 "resourceName": "设备黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/设备黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/equipment",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 12,
                //                 "privilegeName": "设备黑白名单-删除",
                //                 "privilegeCode": "blacklist_device_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 5,
                //                 "resourceName": "设备黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/设备黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/equipment",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 13,
                //                 "privilegeName": "账号黑白名单-查看",
                //                 "privilegeCode": "blacklist_account_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 6,
                //                 "resourceName": "账号黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/账号黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/account",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 14,
                //                 "privilegeName": "账号黑白名单-新增",
                //                 "privilegeCode": "blacklist_account_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 6,
                //                 "resourceName": "账号黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/账号黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/account",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 15,
                //                 "privilegeName": "账号黑白名单-修改",
                //                 "privilegeCode": "blacklist_account_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 6,
                //                 "resourceName": "账号黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/账号黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/account",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 16,
                //                 "privilegeName": "账号黑白名单-删除",
                //                 "privilegeCode": "blacklist_account_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 6,
                //                 "resourceName": "账号黑白名单",
                //                 "resourceType": 0,
                //                 "parentId": 4,
                //                 "resourceHierarchy": "/黑白名单管理/账号黑白名单",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/blackWhiteList/account",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 29,
                //                 "privilegeName": "系统日志-模块读",
                //                 "privilegeCode": "syslogs_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 11,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/系统日志",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/systemLogs",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 30,
                //                 "privilegeName": "系统日志-模块写",
                //                 "privilegeCode": "syslogs_write",
                //                 "privilegeDesc": null,
                //                 "resourceId": 11,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": null,
                //                 "resourceHierarchy": "/系统日志",
                //                 "resourceLevel": 1,
                //                 "resourceUrl": "/systemLogs",
                //                 "actionId": 2,
                //                 "actionName": "写操作(标识module写权限)",
                //                 "actionUrl": "/write"
                //             },
                //             {
                //                 "id": 31,
                //                 "privilegeName": "系统日志-查看",
                //                 "privilegeCode": "syslog_mgr_view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 12,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": 11,
                //                 "resourceHierarchy": "/系统日志/系统日志",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/systemLogs/logs",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 32,
                //                 "privilegeName": "系统日志-新增",
                //                 "privilegeCode": "syslog_mgr_insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 12,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": 11,
                //                 "resourceHierarchy": "/系统日志/系统日志",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/systemLogs/logs",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 33,
                //                 "privilegeName": "系统日志-修改",
                //                 "privilegeCode": "syslog_mgr_update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 12,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": 11,
                //                 "resourceHierarchy": "/系统日志/系统日志",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/systemLogs/logs",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 34,
                //                 "privilegeName": "系统日志-删除",
                //                 "privilegeCode": "syslog_mgr_delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 12,
                //                 "resourceName": "系统日志",
                //                 "resourceType": 0,
                //                 "parentId": 11,
                //                 "resourceHierarchy": "/系统日志/系统日志",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/systemLogs/logs",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 65,
                //                 "privilegeName": "App管理-查看",
                //                 "privilegeCode": "AppManagement-view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 13,
                //                 "resourceName": "APP管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/APP管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appManagement",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 66,
                //                 "privilegeName": "App管理-新增",
                //                 "privilegeCode": "AppManagement-insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 13,
                //                 "resourceName": "APP管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/APP管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appManagement",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 67,
                //                 "privilegeName": "App管理-修改",
                //                 "privilegeCode": "AppManagement-update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 13,
                //                 "resourceName": "APP管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/APP管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appManagement",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 68,
                //                 "privilegeName": "App管理-删除",
                //                 "privilegeCode": "AppManagement-delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 13,
                //                 "resourceName": "APP管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/APP管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appManagement",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             },
                //             {
                //                 "id": 69,
                //                 "privilegeName": "AppKey管理-查看",
                //                 "privilegeCode": "AppKeyManagement-view",
                //                 "privilegeDesc": null,
                //                 "resourceId": 14,
                //                 "resourceName": "AppKey管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/AppKey管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appKeyManagement",
                //                 "actionId": 1,
                //                 "actionName": "读操作(标识module读权限)",
                //                 "actionUrl": "/read"
                //             },
                //             {
                //                 "id": 70,
                //                 "privilegeName": "AppKey管理-新增",
                //                 "privilegeCode": "AppKeyManagement-insert",
                //                 "privilegeDesc": null,
                //                 "resourceId": 14,
                //                 "resourceName": "AppKey管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/AppKey管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appKeyManagement",
                //                 "actionId": 3,
                //                 "actionName": "新增",
                //                 "actionUrl": "/insert"
                //             },
                //             {
                //                 "id": 71,
                //                 "privilegeName": "AppKey管理-修改",
                //                 "privilegeCode": "AppKeyManagement-update",
                //                 "privilegeDesc": null,
                //                 "resourceId": 14,
                //                 "resourceName": "AppKey管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/AppKey管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appKeyManagement",
                //                 "actionId": 4,
                //                 "actionName": "修改",
                //                 "actionUrl": "/update"
                //             },
                //             {
                //                 "id": 72,
                //                 "privilegeName": "AppKey管理-删除",
                //                 "privilegeCode": "AppKeyManagement-delete",
                //                 "privilegeDesc": null,
                //                 "resourceId": 14,
                //                 "resourceName": "AppKey管理",
                //                 "resourceType": 0,
                //                 "parentId": 7,
                //                 "resourceHierarchy": "/渠道管理/AppKey管理",
                //                 "resourceLevel": 2,
                //                 "resourceUrl": "/channel/appKeyManagement",
                //                 "actionId": 5,
                //                 "actionName": "删除",
                //                 "actionUrl": "/delete"
                //             }
                //         ],
                //         "menuList": [
                //             {
                //                 "resourceId": 1,
                //                 "path": "/checkup",
                //                 "title": "鉴权管理",
                //                 "children": [
                //                     {
                //                         "resourceId": 3,
                //                         "path": "/checkup/account",
                //                         "title": "账号鉴权",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             }
                //                         ],
                //                         "parentId": 1,
                //                         "resourceHierarchy": "/鉴权管理/账号鉴权",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 2,
                //                         "path": "/checkup/equipment",
                //                         "title": "设备鉴权",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             }
                //                         ],
                //                         "parentId": 1,
                //                         "resourceHierarchy": "/鉴权管理/设备鉴权",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/鉴权管理",
                //                 "resourceLevel": 1
                //             },
                //             {
                //                 "resourceId": 4,
                //                 "path": "/blackWhiteList",
                //                 "title": "黑白名单管理",
                //                 "children": [
                //                     {
                //                         "resourceId": 5,
                //                         "path": "/blackWhiteList/equipment",
                //                         "title": "设备黑白名单",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 4,
                //                         "resourceHierarchy": "/黑白名单管理/设备黑白名单",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 6,
                //                         "path": "/blackWhiteList/account",
                //                         "title": "账号黑白名单",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             }
                //                         ],
                //                         "parentId": 4,
                //                         "resourceHierarchy": "/黑白名单管理/账号黑白名单",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/黑白名单管理",
                //                 "resourceLevel": 1
                //             },
                //             {
                //                 "resourceId": 7,
                //                 "path": "/channel",
                //                 "title": "渠道管理",
                //                 "children": [
                //                     {
                //                         "resourceId": 13,
                //                         "path": "/channel/appManagement",
                //                         "title": "APP管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 7,
                //                         "resourceHierarchy": "/渠道管理/APP管理",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 8,
                //                         "path": "/channel/management",
                //                         "title": "渠道管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 7,
                //                         "resourceHierarchy": "/渠道管理/渠道管理",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 14,
                //                         "path": "/channel/appKeyManagement",
                //                         "title": "AppKey管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 7,
                //                         "resourceHierarchy": "/渠道管理/AppKey管理",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/渠道管理",
                //                 "resourceLevel": 1
                //             },
                //             {
                //                 "resourceId": 9,
                //                 "path": "/reportForms",
                //                 "title": "报表中心",
                //                 "children": [
                //                     {
                //                         "resourceId": 10,
                //                         "path": "/reportForms/management",
                //                         "title": "报表管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 9,
                //                         "resourceHierarchy": "/报表中心/报表管理",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/报表中心",
                //                 "resourceLevel": 1
                //             },
                //             {
                //                 "resourceId": 11,
                //                 "path": "/systemLogs",
                //                 "title": "系统日志",
                //                 "children": [
                //                     {
                //                         "resourceId": 12,
                //                         "path": "/systemLogs/logs",
                //                         "title": "系统日志",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 11,
                //                         "resourceHierarchy": "/系统日志/系统日志",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/系统日志",
                //                 "resourceLevel": 1
                //             },
                //             {
                //                 "resourceId": 20,
                //                 "path": "/role",
                //                 "title": "角色权限",
                //                 "children": [
                //                     {
                //                         "resourceId": 21,
                //                         "path": "/role/use_group_management",
                //                         "title": "用户组管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 20,
                //                         "resourceHierarchy": "/角色权限/用户组管理",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 23,
                //                         "path": "/role/use_management",
                //                         "title": "用户管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 20,
                //                         "resourceHierarchy": "/角色权限/用户管理",
                //                         "resourceLevel": 2
                //                     },
                //                     {
                //                         "resourceId": 22,
                //                         "path": "/role/role_management",
                //                         "title": "角色权限管理",
                //                         "children": null,
                //                         "actions": [
                //                             {
                //                                 "actionName": "读操作(标识module读权限)",
                //                                 "actionUrl": "/read"
                //                             },
                //                             {
                //                                 "actionName": "删除",
                //                                 "actionUrl": "/delete"
                //                             },
                //                             {
                //                                 "actionName": "新增",
                //                                 "actionUrl": "/insert"
                //                             },
                //                             {
                //                                 "actionName": "修改",
                //                                 "actionUrl": "/update"
                //                             }
                //                         ],
                //                         "parentId": 20,
                //                         "resourceHierarchy": "/角色权限/角色权限管理",
                //                         "resourceLevel": 2
                //                     }
                //                 ],
                //                 "actions": [
                //                     {
                //                         "actionName": "读操作(标识module读权限)",
                //                         "actionUrl": "/read"
                //                     },
                //                     {
                //                         "actionName": "写操作(标识module写权限)",
                //                         "actionUrl": "/write"
                //                     }
                //                 ],
                //                 "parentId": null,
                //                 "resourceHierarchy": "/角色权限",
                //                 "resourceLevel": 1
                //             }
                //         ]
                //     }
                // }
                //
                // const user_data = {
                //     user_info: {
                //         name: res.data.sysUser.userName,
                //         token: res.data.token
                //     },
                //     aside_menu: res.data.menuList
                // };
                // localStorage.setItem(
                //     "aside_menu",
                //     JSON.stringify(user_data.aside_menu)
                // );
                // localStorage.setItem(
                //     "user_info",
                //     JSON.stringify(user_data.user_info)
                // );
                // this.$store.commit("setUserInfo", user_data);
                login(this.loginForm).then(res => {
                    console.log(res)
                    if (res.data.code == 301000) {
                        const user_data = {
                            user_info: {
                                name: res.data.data.sysUser.userName,
                                token: res.data.data.token
                            },
                            aside_menu: res.data.data.menuList
                        };
                        localStorage.setItem(
                            "aside_menu",
                            JSON.stringify(user_data.aside_menu)
                        );
                        localStorage.setItem(
                            "user_info",
                            JSON.stringify(user_data.user_info)
                        );
                        this.$store.commit("setUserInfo", user_data);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            duration: 2000,
                            type: "error"
                        });
                    }
                });
            },
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.login();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .loginCenter {
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      position: relative;
      z-index: 2;

      .mLog {
        width: 134px;
        margin-top: 15px;
      }

      .logintit {
        position: absolute;
        top: 50%;
        left: 0%;
        width: 50%;
        transform: translateY(-50%);
      }

    }


    .bg-box {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;

      .bg {
        width: 100%;
        height: 100%;
      }


    }

    .form-container {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .title-container {
        text-align: center;
        letter-spacing: 2px;
        font-size: 18px;
        margin: 40px 0;
        color: #222628;
      }

      .form-box {
        position: absolute;
        width: 388px;
        margin: 0 auto;
        right: 0%;
        border-radius: 5px;
        top: 50%;
        transform: translateY(-50%);
        background: #fff;
        box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
      }

      .form-item-box {
        margin: 0 auto 25px;
        width: 308px;
      }

      .login-links {
        a {
          text-decoration: none;
          color: #333333;
          display: inline-block;
          line-height: 19px;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
