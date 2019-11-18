<template>
  <div>
    <el-dialog
      :class="[styleDialog.className]"
      :lock-scroll="false"
      :width="styleDialog.width"
      title="选中用户组"
      :visible.sync="dialogVisibleFlag"
      :before-close="handleClose"
      :center="styleDialog.isCenter"
    >
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

            <el-table-column align="center" prop="groupName" label="用户组名"></el-table-column>
            <el-table-column align="center" prop="groupCode" label="用户组编码"></el-table-column>
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
import { getAllqueryPage, getQueryPageSelectByUser } from "@/api/role";
import { mapState, mapMutations } from "vuex";

export default {
  name: "um_user_child",
  components: { Pagination },
  data() {
    return {
      dialogVisibleFlag: false,
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
  mounted() {},
  computed: {
    ...mapState({
      styleDialog: state => state.commonStyle.dialog,
      styleTable: state => state.commonStyle.table
    })
  },
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

    //  新增用户-- 查询用户列表
    userServer(params) {
      getAllqueryPage(params).then(res => {
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

    // 切换页码获取页码 （pageNum，pageSize）
    listenPaginationChange(pagination) {
      if (this.pageInfo.type == "add") {
        this.userServer({
          pageSize: pagination.pageSize,
          pageNum: pagination.pageNum
        });
      } else if (this.pageInfo.type == "update") {
        this.sysUserServer({
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          id: this.$parent.updateParmas.id
        });
      }
    },

    //  修改 =>  查询用户列表
    sysUserServer(params) {
      getQueryPageSelectByUser(params)
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

      if (this.pageInfo.type == "add") {
        this.userServer({
          pageSize: this.paginationConfig.pageSize,
          pageNum: this.paginationConfig.pageNum
        });
      } else if (this.pageInfo.type == "update") {
        console.log("pageInfo===");
        console.log(pageInfo);
        this.sysUserServer({
          pageNum: this.paginationConfig.pageNum,
          pageSize: this.paginationConfig.pageSize,
          id: this.$parent.updateParmas.id
        });
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
        this.$parent.userIdList = restArr(
          this.multipleSelection,
          "groupName"
        ).join("，");
        this.$parent.groupIdList = restArr(this.multipleSelection, "id");
      } else if (this.pageInfo.type == "update") {
        console.log("this.dataTo===");
        console.log(this.dataTo);
        console.log("删除数据");
        console.log(unique(this.dataTo.setTodel));
        console.log("新增数据");
        console.log(unique(this.dataTo.setToAdd));

        this.$parent.updateParmas.deleteGroupIdList = unique(
          this.dataTo.setTodel
        );
        this.$parent.updateParmas.addGroupIdList = unique(this.dataTo.setToAdd);
        this.$parent.userIdList = restArr(
          this.multipleSelection,
          "groupName"
        ).join("，");
      }

      this.handleClose();
    }
  }
};
</script>
<style lang="scss" scoped>
/*.selected_all .el-checkbox::after{content: "全选";}*/
</style>
