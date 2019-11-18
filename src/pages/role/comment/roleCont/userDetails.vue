<template>
  <div>
    <el-row>
      <el-dialog
        :class="[styleDialog.className]"
        :lock-scroll="false"
        :width="styleDialog.width"
        title="新建用户组"
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

          <el-form-item label="用户组描述" prop="groupDesc">
            <el-input type="textarea" v-model="groupForm.groupDesc" placeholder="请输入用户组描述"></el-input>
          </el-form-item>

          <el-form-item label="添加用户">
            <el-input :disabled="false" v-model="userRoleText.roleIdList" placeholder="请选择用户">
              <el-button slot="append" @click.prevent="openHandle">添加</el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="添加角色">
            <el-input :disabled="false" v-model="userRoleText.userIdList" placeholder="请选择角色">
              <el-button slot="append" @click.prevent="true">添加</el-button>
            </el-input>
          </el-form-item>

          <!-- <el-form-item style="text-align: left;">
            <el-button @click="groupResetForm('groupForm')">取 消</el-button>
            <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="groupResetForm('groupForm')">取 消</el-button>
          <el-button type="primary" @click="groupFormSubmit('groupForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>

    <!--    获取用户弹窗    -->
    <UserChild ref="myChild" :levelRarams="dialogVisible" @dialogVisibleFn="dialogVisibleFn"></UserChild>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { restArr } from "@/utils/tools";
import { addListRole } from "@/api/role";
import UserChild from "@/pages/role/comment/use_groupCont/userChild";

export default {
  name: "userDetails",
  props: ["levelRarams"],
  components: { UserChild },
  data() {
    return {
      title: "",
      stateType: "useGroup",
      dialogVisible: false,
      groupForm: {
        groupName: "",
        groupCode: "",
        groupDesc: ""
      },
      userRoleText: {
        roleIdList: "",
        userIdList: ""
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
    openHandle() {
      this.$refs.myChild.getlistServerFns(true);
    },

    dialogVisibleFn() {
      this.dialogVisible = false;
    },

    // 关闭 弹窗  新建用户组
    handleClose() {
      this.$emit("dialogVisibleFn");
    },

    //   取消
    groupResetForm(formName) {
      this.$refs[formName].resetFields();
      this.handleClose();
    },

    //  提交
    groupFormSubmit() {
      console.log(this.groupForm);
      this.$refs["groupForm"].validate(valid => {
        if (valid) {
          // this.groupForm.roleIdList = [1,2,3]
          // this.groupForm.userIdList = [1,2,3]
          //this.groupFormsubmit(this.groupForm);

          console.log("新建用户组  ---  提交");
          console.log(valid);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/*.selected_all .el-checkbox::after{content: "全选";}*/
</style>
