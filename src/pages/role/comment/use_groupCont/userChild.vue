<template>
  <!--  新建窗口 -- 子窗口    -->
  <div>
    <el-dialog
      :class="[styleDialog.className]"
      :lock-scroll="false"
      :width="styleDialog.width"
      :title="pageInfo.title"
      :visible.sync="dialogVisibleFlag"
      :before-close="handleClose"
      :center="styleDialog.isCenter"
    >
      <el-row v-if="pageInfo.pageName == 'setUser'">
        <el-input placeholder="请输入内容" v-model="userName" class="input-with-select">
          <el-button @click="getlistServerFns(false,pageInfo)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>

      <el-form :label-width="styleDialog.labelWidth">
        <el-row>
          <el-table
            :row-key="getRowKey"
            class="selected_all"
            ref="multipleTableBS"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="styleTable.stripe"
            :border="styleTable.border"
            :max-height="styleTable.maxHeight"
          >
            <el-table-column type="selection" :reserve-selection="true" align="center" width="90"></el-table-column>

            <el-table-column
              v-if="pageInfo.pageName == 'setUser'"
              align="center"
              prop="userName"
              label="用户名称"
            ></el-table-column>
            <el-table-column
              v-if="pageInfo.pageName == 'setRole'"
              align="center"
              prop="roleName"
              label="角色名称"
            ></el-table-column>
          </el-table>
        </el-row>

        <el-row style="padding-top:20px">
          <Pagination
            :paginationConfig="paginationConfig"
            @listenPaginationChange="listenPaginationChange"
          ></Pagination>
        </el-row>

        <!-- <el-form-item style="text-align: center;">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="groupFormSubmit">确 定</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="groupFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { restArr, unique } from "@/utils/tools";
import {
  addListUser,
  addListRole,
  sysUserServer,
  sysRoleServer
} from "@/api/role";
import { mapState, mapMutations } from "vuex";

export default {
  name: "UserChild",
  components: { Pagination },
  data() {
    return {
      pageInfo: {
        title: "3213",
        pageName: "",
        type: ""
      },
      dialogVisibleFlag: false,
      userName: "",
      paginationConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [10, 20, 50, 100]
      },
      tableData: [],
      multipleSelection: [],
      dataTo: {
        getToAdd: [], //  未勾选   可以新增总数
        getTodel: [], //  已勾选   可以删除总数
        setToAdd: [], //  新增总数
        setTodel: [], //  删除总数
        allselected: [] // 勾选总数
      }
    };
  },
  created() {},
  computed: {
    ...mapState({
      styleDialog: state => state.commonStyle.dialog,
      styleTable: state => state.commonStyle.table
    })
  },
  mounted() {},
  methods: {
    // 列表选择,val选中的表格行数据
    handleSelectionChange(val) {
      this.multipleSelection = val;

      if (this.pageInfo.type == "update") {
        this.dataTo.allselected = [];
        this.dataTo.setToAdd = [];
        this.dataTo.setTodel = [];
        this.dataTo.allselected = unique(restArr(this.multipleSelection, "id"));

        for (var jj = 0; jj < this.dataTo.getTodel.length; jj++) {
          if (this.dataTo.allselected.indexOf(this.dataTo.getTodel[jj]) == -1) {
            this.dataTo.setTodel.push(this.dataTo.getTodel[jj]);
          }
        }

        for (var i = 0; i < this.dataTo.getToAdd.length; i++) {
          if (this.dataTo.allselected.indexOf(this.dataTo.getToAdd[i]) > -1) {
            this.dataTo.setToAdd.push(this.dataTo.getToAdd[i]);
          }
        }
      }
    },
    getRowKey(val) {
      return val.id;
    },

    // 切换页码获取页码 （pageNum，pageSize）
    listenPaginationChange(pagination) {
      if (this.pageInfo.type == "add") {
        if (this.pageInfo.pageName == "setUser") {
          //  获取用户
          this.userServer({
            userName: this.userName,
            pageSize: pagination.pageSize,
            pageNum: pagination.pageNum
          });
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          this.roteServer({
            pageSize: pagination.pageSize,
            pageNum: pagination.pageNum
          });
        }
      } else if (this.pageInfo.type == "update") {
        if (this.pageInfo.pageName == "setUser") {
          //  获取用户
          this.sysUserServer({
            pageNum: pagination.pageNum,
            pageSize: pagination.pageSize,
            groupId: this.$parent.updateParmas.id,
            userName: this.userName
          });
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          this.roteServer({
            pageSize: pagination.pageSize,
            pageNum: pagination.pageNum
          });
        }
      }
    },

    userServer(params) {
      addListUser(params).then(res => {
        if (res.data.code == 301000) {
          this.paginationConfig.total = res.data.data.total;
          this.tableData = res.data.data.list;
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

    roteServer(params) {
      addListRole(params).then(res => {
        if (res.data.code == 301000) {
          this.paginationConfig.total = res.data.data.total;
          this.tableData = res.data.data.list;
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

    //  修改 -- 添加用户 =>  查询用户列表
    sysUserServer(params) {
      sysUserServer(params)
        .then(res => {
          if (res.data.code == 301000) {
            this.paginationConfig.total = res.data.data.total;
            this.tableData = res.data.data.list;
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              duration: 1500,
              type: "error"
            });
          }
        })
        .then(() => {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].associated == 1) {
              //  1.  判断是否在已勾选总数中存在  不存在就push
              //  2.  每次拿到已勾选数据后分别存入 总数 并 勾选

              if (this.dataTo.getTodel.indexOf(this.tableData[i].id) == -1) {
                this.$refs.multipleTableBS.toggleRowSelection(
                  this.tableData[i],
                  true
                );
                this.dataTo.getTodel.push(this.tableData[i].id);
              }
            } else {
              //  1.  判断是否在未勾选总数中存在  不存在就push

              if (this.dataTo.allselected.indexOf(this.tableData[i].id) == -1) {
                this.dataTo.getToAdd.push(this.tableData[i].id);
              }
            }
          }

          this.dataTo.getTodel = unique(this.dataTo.getTodel); // 去重
          this.dataTo.getToAdd = unique(this.dataTo.getToAdd); // 去重
        });
    },

    //  修改 -- 添加角色 =>  查询用户列表
    sysRoleServer(params) {
      sysRoleServer(params)
        .then(res => {
          if (res.data.code == 301000) {
            this.paginationConfig.total = res.data.data.total;
            this.tableData = res.data.data.list;
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              duration: 1500,
              type: "error"
            });
          }
        })
        .then(() => {
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].associated == 1) {
              //  1.  判断是否在已勾选总数中存在  不存在就push
              //  2.  每次拿到已勾选数据后分别存入 总数 并 勾选

              if (this.dataTo.getTodel.indexOf(this.tableData[i].id) == -1) {
                this.$refs.multipleTableBS.toggleRowSelection(
                  this.tableData[i],
                  true
                );
                this.dataTo.getTodel.push(this.tableData[i].id);
              }
            } else {
              //  1.  判断是否在未勾选总数中存在  不存在就push

              if (this.dataTo.allselected.indexOf(this.tableData[i].id) == -1) {
                this.dataTo.getToAdd.push(this.tableData[i].id);
              }
            }
          }

          this.dataTo.getTodel = unique(this.dataTo.getTodel); // 去重
          this.dataTo.getToAdd = unique(this.dataTo.getToAdd); // 去重
        });
    },

    // -- 查询用户列表
    getlistServerFns(flag, pageInfo) {
      if (flag) {
        this.dialogVisibleFlag = true;
        this.pageInfo = pageInfo;
        this.userName = "";
      }

      let params = {};

      // 新建添加
      if (this.pageInfo.type == "add") {
        if (this.pageInfo.pageName == "setUser") {
          //  获取用户
          params = {
            userName: this.userName,
            pageSize: this.paginationConfig.pageSize,
            pageNum: this.paginationConfig.pageNum
          };
          this.userServer(params);
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          params = {
            pageSize: this.paginationConfig.pageSize,
            pageNum: this.paginationConfig.pageNum
          };
          this.roteServer(params);
        }
      } else if (this.pageInfo.type == "update") {
        if (this.pageInfo.pageName == "setUser") {
          //  获取用户
          params = {
            pageNum: this.paginationConfig.pageNum,
            pageSize: this.paginationConfig.pageSize,
            groupId: this.$parent.updateParmas.id,
            userName: this.userName
          };

          this.sysUserServer(params);
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          params = {
            pageSize: this.paginationConfig.pageSize,
            pageNum: this.paginationConfig.pageNum,
            id: this.$parent.updateParmas.id
          };
          this.sysRoleServer(params);
        }
      }
    },

    // 关闭 弹窗  新建用户组
    handleClose() {
      this.dialogVisibleFlag = false;
      this.$refs.multipleTableBS.clearSelection();
      setTimeout(() => {
        this.multipleSelection = [];
        this.paginationConfig = {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pageSizes: [10, 20, 50, 100]
        };
        this.dataTo = {
          getToAdd: [], //  未勾选   可以新增总数
          getTodel: [], //  已勾选   可以删除总数
          setToAdd: [], //  新增总数
          setTodel: [], //  删除总数
          allselected: [] // 勾选总数
        };
      }, 500);
    },

    //   提交
    groupFormSubmit() {
      if (this.pageInfo.type == "add") {
        if (this.pageInfo.pageName == "setUser") {
          //  获取用户
          this.$parent.userRoleText.userIdList = restArr(
            this.multipleSelection,
            "userName"
          ).join("，");
          this.$parent.addData.userIdList = restArr(
            this.multipleSelection,
            "id"
          );
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          this.$parent.userRoleText.roleIdList = restArr(
            this.multipleSelection,
            "roleName"
          ).join("，");
          this.$parent.addData.roleIdList = restArr(
            this.multipleSelection,
            "id"
          );
        }
      } else if (this.pageInfo.type == "update") {
        console.log("this.dataTo===");
        console.log(this.dataTo);
        console.log("删除数据");
        console.log(unique(this.dataTo.setTodel));
        console.log("新增数据");
        console.log(unique(this.dataTo.setToAdd));

        if (this.pageInfo.pageName == "setUser") {
          //  获取用户

          this.$parent.updateParmas.deleteUserIdList = unique(
            this.dataTo.setTodel
          );
          this.$parent.updateParmas.addUserIdList = unique(
            this.dataTo.setToAdd
          );
          this.$parent.userRoleText.userIdList = restArr(
            this.multipleSelection,
            "userName"
          ).join("，");
        } else if (this.pageInfo.pageName == "setRole") {
          //  获取角色
          console.log(this.multipleSelection);
          this.$parent.updateParmas.deleteRoleIdList = unique(
            this.dataTo.setTodel
          );
          this.$parent.updateParmas.addRoleIdList = unique(
            this.dataTo.setToAdd
          );
          this.$parent.userRoleText.roleIdList = restArr(
            this.multipleSelection,
            "roleName"
          ).join("，");
        }
      }

      this.handleClose();
    }
  }
};
</script>
<style lang="scss" scoped>
/*.selected_all .el-checkbox::after{content: "全选";}*/
</style>
