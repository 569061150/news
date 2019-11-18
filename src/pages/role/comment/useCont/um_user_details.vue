<template>
  <div>
    <el-row>
      <el-dialog
        :class="[styleDialog.className]"
        :lock-scroll="false"
        :width="styleDialog.width"
        :title="inner.title"
        :visible="dialogVisible"
        :before-close="handleClose"
        :center="styleDialog.isCenter"
      >
        <el-form
          :label-width="styleDialog.labelWidth"
          :rules="rules"
          ref="groupForm"
          :model="groupForm"
        >
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="groupForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="groupForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item label="用户组：">
            <el-input
              class="pointer"
              v-model="userIdList"
              placeholder="请选择用户组"
              @click.native="openHandle('setUser')"
              suffix-icon="el-icon-arrow-right"
            ></el-input>
          </el-form-item>

          <el-form-item prop="email" label="邮箱：">
            <el-input v-model="groupForm.email"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input v-model="groupForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <!-- <el-form-item style="text-align: left;">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose('groupForm')">取 消</el-button>
          <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>

    <!--    获取用户弹窗    -->
    <UserChild ref="myChild"></UserChild>
  </div>
</template>

<script>
import { restArr } from "@/utils/tools";
import { userAdd, userUpdate } from "@/api/role";
import UserChild from "@/pages/role/comment/useCont/um_user_child";
import { mapState, mapMutations } from "vuex";

export default {
  name: "userDetails",
  props: ["levelRarams"],
  components: { UserChild },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      inner: {
        type: "",
        title: ""
      },
      updateParmas: {
        addGroupIdList: [],
        deleteGroupIdList: [],
        id: null
      },
      dialogVisible: false,
      groupForm: {
        userName: "",
        phone: "",
        email: "",
        password: ""
      },
      groupIdList: [],
      userIdList: "",
      rules: {
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
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
        userName: data.userName,
        phone: data.phone,
        email: data.email
      };
      this.updateParmas.id = data.id;
    },

    // 修改提交
    sysUpdateServer(params) {
      userUpdate(params).then(res => {
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
      this.$refs.myChild.getlistServerFns(true, {
        pageName: pageName,
        title: "选择用户组",
        type: this.inner.type
      });
    },

    // 关闭 弹窗  新建用户组
    handleClose() {
      this.$refs["groupForm"].resetFields();
      this.groupForm = {
        userName: "",
        phone: "",
        email: "",
        password: ""
      };
      this.userIdList = "";
      this.groupIdList = [];
      this.dialogVisible = false;
    },

    //  提交服务
    sysUserGroupAddServer(params) {
      userAdd(params).then(res => {
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
              userName: this.groupForm.userName,
              phone: this.groupForm.phone,
              email: this.groupForm.email,
              password: this.groupForm.password,
              groupIdList: this.groupIdList
            });
          } else if (this.inner.type == "update") {
            console.log("000");
            console.log({
              userName: this.groupForm.userName,
              phone: this.groupForm.phone,
              email: this.groupForm.email,
              password: this.groupForm.password,
              groupIdList: this.groupIdList,
              id: this.updateParmas.id,
              addGroupIdList: this.updateParmas.addGroupIdList,
              deleteGroupIdList: this.updateParmas.deleteGroupIdList
            });
            this.sysUpdateServer({
              userName: this.groupForm.userName,
              phone: this.groupForm.phone,
              email: this.groupForm.email,
              password: this.groupForm.password,
              groupIdList: this.groupIdList,
              id: this.updateParmas.id,
              addGroupIdList: this.updateParmas.addGroupIdList,
              deleteGroupIdList: this.updateParmas.deleteGroupIdList
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
