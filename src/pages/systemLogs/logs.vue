<template>
  <div>
    <div class="ne-search">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="应用商店版本号：" prop="appVersion">
          <el-input size="medium" v-model="formInline.appVersion" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="用户id：" prop="userId">
          <el-input size="medium" v-model="formInline.userId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：" prop="userName">
          <el-input size="medium" v-model="formInline.userName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="类型：" prop="userType">
          <el-select v-model="formInline.userType" placeholder="请选择">
            <el-option
              v-for="item in typesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button size="medium" type="primary" @click="submitForm()">查询</el-button>
          <el-button size="medium" @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mTop20">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="应用ID"
          >
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="应用名称"
          >
          </el-table-column>

          <el-table-column
            prop="tenantId"
            label="应用版本号">
          </el-table-column>

          <el-table-column
            prop="groupDesc"
            label="用户id">
          </el-table-column>

          <el-table-column
            prop="groupName"
            label="用户昵称">
          </el-table-column>

          <el-table-column
            prop="address"
            label="评分">
          </el-table-column>

          <el-table-column
            prop="address"
            label="评价内容">
          </el-table-column>

          <el-table-column
            prop="address"
            label="提交时间">
          </el-table-column>

          <el-table-column
            prop="address"
            label="更新时间">
          </el-table-column>

          <el-table-column
            prop="address"
            label="品牌/车系/车型">
          </el-table-column>

          <el-table-column
            prop="address"
            label="车辆VIN码">
          </el-table-column>

          <el-table-column
            prop="address"
            label="车机品牌">
          </el-table-column>

          <el-table-column
            prop="address"
            label="车机编号">
          </el-table-column>

          <el-table-column
            prop="address"
            label="车机系统版本">
          </el-table-column>

          <el-table-column
            prop="address"
            label="应用商店版本">
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
    </div>

  </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {getTableData} from '../../api/typeManagement.js';

    export default {
        props: [],
        data() {
            return {
                typesArr: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '意见反馈'
                    },
                    {
                        value: '2',
                        label: '遇到问题'
                    }
                ],
                formInline: {
                    appId: '',
                    appName: '',
                    version: '',
                    userId: '',
                    userName: '',
                },
                tableData: [],
                paginationConfig: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        mounted() {
            this.getTableDataFn({
                appId: this.formInline.appId,
                appName: this.formInline.appName,
                version: this.formInline.version,
                userId: this.formInline.userId,
                userName: this.formInline.userName,
                pageSize: this.paginationConfig.pageSize,
                pageNum: this.paginationConfig.pageIndex
            })
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
                    appId: this.formInline.appId,
                    appName: this.formInline.appName,
                    version: this.formInline.version,
                    userId: this.formInline.userId,
                    userName: this.formInline.userName,
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
            submitForm() {
                console.log('submit!');
                this.getTableDataFn({
                    appId: this.formInline.appId,
                    appName: this.formInline.appName,
                    version: this.formInline.version,
                    userId: this.formInline.userId,
                    userName: this.formInline.userName,
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: this.paginationConfig.pageIndex
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            // ...mapState({
            //     isTypeManagement: state => state.common.isTypeManagement
            // })
        },
        watch: {
        }
    };
</script>

<style scoped lang="scss">
</style>

