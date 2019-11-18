<template>
  <div>

    <div class="ne-search">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="应用id：" prop="id">
          <el-input size="medium" v-model="formInline.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="应用名称：" prop="name">
          <el-input size="medium" v-model="formInline.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="应用分类：" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="item in typesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="states">
          <el-select v-model="formInline.states" placeholder="请选择">
            <el-option
              v-for="item in statesArr"
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
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-button :disabled="tableData.length == 0" @click="setTypeSubmit({},'add','添加新应用')" type="primary"><i
              class="el-icon-plus"></i> 添加应用
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
            width="230"
          >
            <template slot-scope="scope">
              <el-button @click="setTypeSubmit(scope.row,'edit','编辑应用信息')" type="text" size="small">编辑</el-button>
              <el-button @click="setTypeSubmit(scope.row,'update','更新版本')" type="text" size="small">更新版本</el-button>
              <el-button @click="upState(scope.row)" type="text" size="small">下架</el-button>
              <el-button @click="toRouer({to:'info',row:scope.row})" type="text" size="small">安装包</el-button>
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

    <el-dialog
      v-dialogDrag
      title="提示"
      :modal="false"
      :visible="stateFix"
      width="30%"
    >
      <div>确认{{stateinner}}该应用？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stateFix = false">取 消</el-button>
        <el-button type="primary" @click="stateSubmit">确认</el-button>
      </div>
    </el-dialog>

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
                stateFix: false,
                stateinner: '',
                index: 0,
                dialogVisible: false,
                type: '',
                title: '',
                row: {},
                typesArr: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '影音娱乐'
                    },
                    {
                        value: '2',
                        label: '地图导航'
                    }
                ],
                statesArr: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '上架'
                    },
                    {
                        value: '2',
                        label: '下架'
                    }
                ],
                formInline: {
                    name: '',
                    id: '',
                    type: '',
                    states: '',
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
            upState(row) {
                console.log(row)
                this.stateinner = row.id == 1 ? '上架' : '下架';
                this.stateFix = true
            },
            stateSubmit(row) {
                //  确认 上架/下架 接口
                this.stateFix = false
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
                this.getTableDataFn({
                    name: '',
                    id: '',
                    pageSize: 1,
                    pageNum: 10
                })
            },
            toRouer(type) {
                this.$emit('change-route', type);
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

