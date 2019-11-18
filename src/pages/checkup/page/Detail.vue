<template>
  <div>

    <div class="ne-search">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="分类名称：" prop="name">
          <el-input size="medium" v-model="formInline.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="分类ID：" prop="id">
          <el-input size="medium" v-model="formInline.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm()">查询</el-button>
          <el-button size="medium" @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mTop20">
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-button :disabled="tableData.length == 0" @click="setTypeSubmit({},'add','添加分类')" type="primary"><i
              class="el-icon-plus"></i> 增加分类
            </el-button>
            <el-button :disabled="tableData.length == 0" @click="toRouer({to:'info',tableData:tableData})"><i
              class="el-icon-sort"></i> 调整排序
            </el-button>
          </el-row>
        </el-col>
      </el-row>
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
            width="200"
          >
            <template slot-scope="scope">
              <el-button @click="setTypeSubmit(scope.row,'edit','编辑分类')" type="text" size="small">编辑</el-button>
              <el-button @click="setTypeSubmit(scope.row,'state','提示')" type="text" size="small">
                {{scope.row.groupCode=='admin' ? '停用':'启用'}}
              </el-button>
              <el-button @click="goLink(scope.row)" type="text" size="small">管理应用</el-button>
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
    </div>

    <Dialog :dialogVisible="dialogVisible" :type="type" :row="row" :title="title" :index="index"
            @dialogVisibleClose="dialogVisibleClose"></Dialog>

  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {getTableData} from '../../../api/typeManagement.js';

  export default {
    props: [],
    components: {
      'Dialog': () => import('./dialog')
    },
    data() {
      return {
        index: 0,
        dialogVisible: false,
        type: '',
        title: '',
        row: {},
        formInline: {
          name: '',
          id: ''
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
        id: this.formInline.id,
        name: this.formInline.name,
        pageSize: this.paginationConfig.pageSize,
        pageNum: this.paginationConfig.pageIndex
      })
    },
    methods: {
      goLink(to) {
        console.log(to.groupName);
        this.$router.push({
          name: '/systemLogs/logs',
          params: {id: to.groupName}
        });
      },
      setTypeSubmit(row, type, title) {
        this.index++
        this.title = title
        this.type = type
        this.row = row;
        this.dialogVisible = true
      },
      dialogVisibleClose(type) {
        this.dialogVisible = false
        if (type == 'addBtn' || type == 'editBtn') {
          this.getTableDataFn({
            name: '',
            id: '',
            pageSize: 1,
            pageNum: 10
          })
        }
      },
      toRouer(type) {
        this.$emit('change-route', type);
        this.$store.commit('setIsTypeManagement');
      },
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
          id: this.formInline.id,
          name: this.formInline.name,
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
          id: this.formInline.id,
          name: this.formInline.name,
          pageSize: this.paginationConfig.pageSize,
          pageNum: this.paginationConfig.pageIndex
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      ...mapState({
        isTypeManagement: state => state.common.isTypeManagement
      })
    },
    watch: {
      isTypeManagement() {
        this.formInline = {
          name: '',
          id: ''
        }
        this.getTableDataFn({
          name: '',
          id: '',
          pageSize: this.paginationConfig.pageSize,
          pageNum: this.paginationConfig.pageIndex
        })
      }
    }
  };
</script>

<style scoped lang="scss">
</style>

