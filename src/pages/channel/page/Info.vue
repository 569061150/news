<template>
  <div class="addCs">

    <div class="mTop20">
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-button type="primary" @click="toRouer({to:'detail',state:'off'})"><i class="el-icon-back"></i> 返回应用列表
            </el-button>
            <!--<el-button :disabled="saveDisabled" type="primary" @click="toRouer({to:'detail',state:'yes'})"><i-->
            <!--class="el-icon-sort"></i> 返回应用列表-->
            <!--</el-button>-->
          </el-row>
        </el-col>
      </el-row>
      <div class="mTop20"></div>

      <div class="ne-search">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="版本号：" prop="version">
            <el-input size="medium" v-model="formInline.version" placeholder=""></el-input>
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
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  title="更新说明"
                  width="250"
                >
                  <p>1.【动态】发现页升级为动态页面，来这里了解你关注歌手的新歌，还有你关注的歌手、达人的最新动态 ？</p>
                  <p>2.【搜索】热搜改版，查找最新热门内容更实时更丰富</p>
                  <p>3.优化了自定义皮肤下的显示效果</p>
                  <span slot="reference">查看</span>
                </el-popover>
              </template>
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
              width="180"
            >
              <template slot-scope="scope">
                <el-button @click="setTypeSubmit(scope.row,'download')" type="text" size="small">下载</el-button>
                <el-button @click="setTypeSubmit(scope.row,'del')" type="text" size="small">删除</el-button>
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
    </div>

    <el-dialog
      title="提示"
      v-dialogDrag
      :modal="false"
      :visible="dialogVisible"
      width="30%"
    >
      <span>删除后无法恢复，确认删除该安装包？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="del">确 定</el-button>
    </span>
    </el-dialog>

  </div>
</template>
<script>
    import $ from 'jquery';
    import {mapState, mapGetters} from 'vuex';
    import {getTableData, exportExcelData} from '../../../api/typeManagement.js';
    import {find_repeat} from '../../../utils/tools.js';

    export default {
        props: ['row'],
        data() {
            return {
                dialogVisible: false,
                csId: '',
                formInline: {
                    version: '',
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
            this.getTableDataFn({})
        },
        methods: {
            toRouer(obj) {
                this.$message.closeAll();
                this.$emit('change-route', obj);
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
                    console.log(res)
                    if (res.data.code == 301000) {
                        this.tableData = res.data.data.list;
                        this.paginationConfig.total = res.data.data.total;
                        this.paginationConfig.pageIndex = res.data.data.pageNum;
                        this.paginationConfig.pageSize = res.data.data.pageSize;
                    }
                });
            },
            submitForm() {
                console.log(this.row);
                this.getTableDataFn({
                    id: this.formInline.id,
                    name: this.formInline.name,
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: this.paginationConfig.pageIndex
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            download() {
                console.log('下载方法')
                console.log('删除方法' + this.csId)

                exportExcelData({id: this.csId}).then(msg => {
                    let url = window.URL.createObjectURL(msg.data); //表示一个指定的file对象或Blob对象
                    let a = document.createElement('a');
                    document.body.appendChild(a);
                    if (!msg.headers['content-disposition']) {
                        this.$message.error('下载失败');
                        return;
                    }
                    let fileName = msg.headers['content-disposition']
                        .split(';')[1]
                        .split('=')[1]; //filename名称截取
                    a.href = url;
                    a.download = decodeURIComponent(fileName); //命名下载名称
                    //  a.download = '检测历史数据_' + new Date().getTime() + '.xlsx'; //命名下载名称
                    a.click(); //点击触发下载
                    window.URL.revokeObjectURL(url); //下载完成进行释放
                    this.$message.error('导出失败');
                }).catch((err) => {
                    console.log(err)
                })
            },
            del() {
                console.log('删除方法' + this.csId)
                this.dialogVisible = false
            },
            setTypeSubmit(row, type) {
                this.csId = row.id
                if (type == 'download') {
                    this.download();
                } else if (type == 'del') {
                    this.dialogVisible = true
                }

            }
        },
        computed: {
            ...mapState({
                isTypeManagement: state => state.common.isTypeManagement
            })
        },
        watch: {}
    };
</script>

<style scoped lang="scss">
  cell-edit-input .el-input, .el-input__inner {
    width: 100px;
  }

  .cell-icon {
    cursor: pointer;
    color: #fff;
  }

  .err {
    border: #CA4E49 1px solid;
  }
</style>

