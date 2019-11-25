<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-row type="flex" justify="start">
          <el-button :disabled="tableData.length == 0" @click="setTypeSubmit({},'add','新增文案')" type="primary"><i
            class="el-icon-plus"></i> 添加
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
        @sort-change="changeSort"
        style="width: 100%">
        <el-table-column
          label="排序"
          prop="createdAt"
          :sortable="true"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="文案"
          :sortable="true"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="setTypeSubmit(scope.row,'edit','编辑')" type="text" size="small">编辑</el-button>
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

    <Dialog :dialogVisible="dialogVisible" :type="type" :row="row" :title="title" :index="index" @dialogVisibleClose="dialogVisibleClose"></Dialog>

  </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {getTableData, getChannelNames} from '../../../../../api/typeManagement.js';

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
                    appName: '',
                    appId: '',
                },
                tableData: [],
                paginationConfig: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        created() {
        },
        mounted() {
            this.getTableDataFn({
                appName: this.formInline.appName,
                appId: this.formInline.appId,
                pageSize: this.paginationConfig.pageSize,
                pageNum: this.paginationConfig.pageIndex
            });
        },
        methods: {
            changeSort (val) {
                console.log(val) // column: {…} order: "ascending" prop: "date"
                // 根据当前排序重新获取后台数据,一般后台会需要一个排序的参数
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
                if (type == 'addBtn' || type == 'deleteBtn') {
                    this.getTableDataFn({
                        appName: this.formInline.appName,
                        appId: this.formInline.appId,
                        pageSize: 10,
                        pageNum: 1
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
                    appName: this.formInline.appName,
                    appId: this.formInline.appId,
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
                    appName: '',
                    appId:'',
                }
                this.getTableDataFn({
                    appName: '',
                    appId:'',
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: this.paginationConfig.pageIndex
                })
            }
        }
    };
</script>

<style scoped lang="scss">
</style>


