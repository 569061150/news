<template>
  <div>
    <div class="ne-search">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="应用ID：" prop="id">
          <el-input size="medium" v-model="formInline.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="应用名称：" prop="name">
          <el-input size="medium" v-model="formInline.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="应用分类：" prop="value">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" size="medium" @click="submitForm()">查询</el-button>
          <el-button size="medium" @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mTop20">
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-button :disabled="tableData.length == 0" @click="setTypeSubmit(options,'add','增加推广')" type="primary"><i
              class="el-icon-plus"></i> 增加推广
            </el-button>
            <el-button :disabled="tableData.length == 0" @click="toRouer({to:'info',tableData:tableData})"><i class="el-icon-sort"></i> 调整排序
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
    </div>

    <Dialog :dialogVisible="dialogVisible" :type="type" :row="row" :title="title" :index="index"
            @dialogVisibleClose="dialogVisibleClose"></Dialog>

  </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {getTableData, getChannelNames} from '../../../api/typeManagement.js';

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
                    id: '',
                    name: '',
                    value: ''
                },
                options: [],
                tableData: [],
                paginationConfig: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        created() {
            this.getListType();
        },
        mounted() {
            this.getTableDataFn({
                id: this.formInline.id,
                name: this.formInline.name,
                value: this.formInline.value,
                pageSize: this.paginationConfig.pageSize,
                pageNum: this.paginationConfig.pageIndex
            });
        },
        methods: {
            getListType() {
                getChannelNames().then(res => {
                    if (res.data.code == 301000) {
                        let channelNamesOptions = [];
                        res.data.data.list.forEach(ele => {
                            channelNamesOptions.push({
                                value: ele,
                                label: ele
                            });
                        });
                        this.options = channelNamesOptions
                    }
                })
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
                        id: this.formInline.id,
                        name: this.formInline.name,
                        value: this.formInline.value,
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
                    id: this.formInline.id,
                    name: this.formInline.name,
                    value: this.formInline.value,
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
                    id: '',
                    name: '',
                    value: '',
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: this.paginationConfig.pageIndex
                })
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

