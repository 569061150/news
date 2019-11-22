<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :close-on-click-modal="false"
      :close-on-press-escape='true'
      :visible="dialogVisible"
      :before-close="dialogVisibleClose"
    >


      <div class="ne-search">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="应用名称：" prop="appName">
            <el-input size="medium" v-model="formInline.appName" placeholder=""></el-input>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button type="primary" size="medium" @click="submitForm()">查询</el-button>
            <el-button size="medium" @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="mTop20"></div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            width="100"
            type="index"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="分类ID"
          >
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="分类名称"
          >
          </el-table-column>
          <el-table-column
            prop="tenantId"
            sortable
            label="排序">
          </el-table-column>
          <el-table-column
            prop="groupDesc"
            sortable
            show-overflow-tooltip
            label="已上架应用">
          </el-table-column>
          <el-table-column
            prop="groupName"
            sortable
            label="已下架应用">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="setTypeSubmit(scope.row,'delete','提示')" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationConfig.pageIndex"
          :page-size="paginationConfig.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConfig.total">
        </el-pagination>
      </div>

      <div v-if="type=='delete'">
        <div>确认删除该应用的推广？</div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(0)">取 消</el-button>
        <!--   新增和编辑提交按钮     -->
        <el-button v-if="type=='add'" type="primary" @click="submit('formInline')">保存</el-button>
        <el-button v-if="type=='delete'" type="primary" @click="submit">确认</el-button>
      </div>

    </el-dialog>

  </div>
</template>
<script>
    import {getTableData} from '../../../../../api/typeManagement.js';

    export default {
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                optionsName: [],
                tableData: [],
                formLabelWidth: '100',
                formInline: {
                    appName: ''
                },
                paginationConfig: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.getTableDataFn({
                    pageSize: val,
                    pageNum: this.paginationConfig.pageIndex
                })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.getTableDataFn({
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: val
                })
            },
            getTableDataFn(params) {
                getTableData(params).then(res => {
                    if (res.data.code == 301000) {
                        this.tableData = res.data.data.list;
                        this.paginationConfig.total = res.data.data.total;
                        this.paginationConfig.pageIndex = res.data.data.pageNum;
                        this.paginationConfig.pageSize = res.data.data.pageSize;
                    }
                });
            },

            dialogVisibleClose(type) {
                this.$emit('dialogVisibleClose', type);
            },
            add() {
                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
            },
            delete() {
               alert("delete")
            },
            submit(formName) {
                if (this.type == 'add') {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            console.log(this.formInline)
                            if (this.type == 'add') {
                                this.add();
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else if (this.type == 'delete') {
                    this.delete();
                }
            }
        },
        watch: {
            index() {
                if (this.type == 'add') {
                    this.formInline.name = '';
                    this.formInline.value = '';
                    this.formInline.sort = '';
                } else if (this.type == 'delete') {
                    console.log(this.row)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

