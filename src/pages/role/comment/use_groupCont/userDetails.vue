<template>
  <div>
    <el-row>
      <el-dialog
        :class="[styleDialog.className]"
        :lock-scroll="false"
        :width="styleDialog.width"
        :title="inner.title"
        :visible="levelRarams"
        :before-close="handleClose"
        :center="styleDialog.isCenter"
      >
        <el-form
          :label-width="styleDialog.labelWidth"
          :rules="rules"
          ref="groupForm"
          :model="groupForm"
        >
          <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="groupForm.groupName" placeholder="请输入用户组名称"></el-input>
          </el-form-item>

          <el-form-item label="用户组编码" prop="groupCode">
            <el-input v-model="groupForm.groupCode" placeholder="请输入用户组编码"></el-input>
          </el-form-item>

          <el-form-item label="用户组描述">
            <el-input type="textarea" v-model="groupForm.groupDesc" placeholder="请输入用户组描述"></el-input>
          </el-form-item>

          <el-form-item label="添加用户">
            <el-input :disabled="true" class="pointer" v-model="userRoleText.userIdList" placeholder="请选择用户"
                      @click.native="openHandle('setUser')"
                      suffix-icon="el-icon-arrow-right"
            ></el-input>
          </el-form-item>

          <el-form-item label="添加角色">
            <el-input :disabled="true" class="pointer" v-model="userRoleText.roleIdList" placeholder="请选择角色"
                      @click.native="openHandle('setRole')"
                      suffix-icon="el-icon-arrow-right"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item style="text-align: left;">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose('groupForm')">取 消</el-button>
          <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>

    <!--    获取用户弹窗    -->
    <UserChild ref="myChild" :levelRarams="dialogVisible"></UserChild>
  </div>
</template>

<script>
import { restArr } from "@/utils/tools";
import { sysUserGroupAdd, sysUpdateSubmit } from "@/api/role";
import UserChild from "@/pages/role/comment/use_groupCont/userChild";
import { mapState, mapMutations } from "vuex";

export default {
  name: "userDetails",
  props: ["levelRarams"],
  components: { UserChild },
  data() {
    return {
      inner: {
        type: "",
        title: ""
      },
      updateParmas: {
        addRoleIdList: [],
        addUserIdList: [],
        deleteRoleIdList: [],
        deleteUserIdList: [],
        id: null
      },
      stateType: "useGroup",
      dialogVisible: false,
      groupForm: {
        groupName: "",
        groupCode: "",
        groupDesc: ""
      },
      addData: {
        userIdList: [],
        roleIdList: []
      },
      userRoleText: {
        userIdList: "",
        roleIdList: ""
      },
      rules: {
        groupName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        groupCode: [{ required: true, message: "用户组编码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      styleDialog: state => state.commonStyle.dialog,
      styleTable: state => state.commonStyle.table
    })
  },
  methods: {
    updateOpen(data) {
      console.log("data==");
      console.log(data);

      this.groupForm = {
        groupName: data.groupName,
        groupCode: data.groupCode,
        groupDesc: data.groupDesc
      };
      this.updateParmas.id = data.id;
    },

    // 修改提交
    sysUpdateServer(params) {
      sysUpdateSubmit(params).then(res => {
        if (res.data.code == 301000) {
          this.handleClose();

          this.$parent.getlistServer({
            pageSize: 10,
            pageNum: 1
          });
          this.$parent.paginationConfig.pageNum = 1;
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

    openHandle(pageName) {
      if (pageName == "setUser") {
        this.$refs.myChild.getlistServerFns(true, {
          pageName: pageName,
          title: "添加用户",
          type: this.inner.type
        });
      } else if (pageName == "setRole") {
        this.$refs.myChild.getlistServerFns(true, {
          pageName: pageName,
          title: "添加角色",
          type: this.inner.type
        });
      }
    },

    // 关闭 弹窗  新建用户组
    handleClose() {
      this.$refs["groupForm"].resetFields();
      this.groupForm = {
        groupName: "",
        groupCode: "",
        groupDesc: ""
      };
      this.userRoleText.userIdList = "";
      this.userRoleText.roleIdList = "";
      this.groupForm.groupDesc = "";

      this.$parent.dialogVisible = false;
    },

    //  提交服务
    sysUserGroupAddServer(params) {
      sysUserGroupAdd(params).then(res => {
        if (res.data.code == 301000) {
          this.handleClose();

          this.$parent.getlistServer({
            pageSize: 10,
            pageNum: 1
          });
          this.$parent.paginationConfig.pageNum = 1;
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            duration: 1500,
            type: "error"
          });
        }
      });
    },

    //  提交
    groupFormSubmit() {
      this.$refs["groupForm"].validate(valid => {
        if (valid) {
          if (this.inner.type == "add") {
            this.sysUserGroupAddServer({
              groupName: this.groupForm.groupName,
              groupCode: this.groupForm.groupCode,
              groupDesc: this.groupForm.groupDesc,
              userIdList: this.addData.userIdList,
              roleIdList: this.addData.roleIdList
            });
          } else if (this.inner.type == "update") {
            console.log("000");
            console.log({
              groupName: this.groupForm.groupName,
              groupCode: this.groupForm.groupCode,
              groupDesc: this.groupForm.groupDesc,
              addRoleIdList: this.updateParmas.addRoleIdList,
              addUserIdList: this.updateParmas.addUserIdList,
              deleteRoleIdList: this.updateParmas.deleteRoleIdList,
              deleteUserIdList: this.updateParmas.deleteUserIdList,
              id: this.updateParmas.id
            });
            this.sysUpdateServer({
              groupName: this.groupForm.groupName,
              groupCode: this.groupForm.groupCode,
              groupDesc: this.groupForm.groupDesc,
              addRoleIdList: this.updateParmas.addRoleIdList,
              addUserIdList: this.updateParmas.addUserIdList,
              deleteRoleIdList: this.updateParmas.deleteRoleIdList,
              deleteUserIdList: this.updateParmas.deleteUserIdList,
              id: this.updateParmas.id
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
  .pointer.el-input--suffix .el-input__inner {
    cursor: pointer !important;
    background: #fff;
  }
</style>

