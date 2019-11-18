<template>
  <div class="addCs">

    <div class="mTop20">

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

        <el-row>
          <el-col :span="12">
            <el-row type="flex" justify="start">
              <el-button :disabled="tableData.length == 0" @click="dialogVisible = true" type="primary"><i
                class="el-icon-plus"></i> 上传新版本
              </el-button>
            </el-row>
          </el-col>
        </el-row>

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
                  <span class="lookInfo" slot="reference">查看</span>
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
      title="上传新版本"
      v-dialogDrag
      :modal="false"
      :visible="dialogVisible"
      width="37%"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item label="安装包" prop="documentsFile">
          <!--          <el-input v-model="ruleForm.documentsFile" placeholder=""></el-input>-->
          <el-upload
            class="upload"
            ref="upload"
            action="string"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="uploadFile"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple="multiple"
          >
            <el-button slot="trigger" size="small" type="primary" @click="delFile">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="包名" prop="documentsName">
          <el-input v-model="ruleForm.documentsName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="版本号" prop="version">
          <el-input v-model="ruleForm.version" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="更新说明" prop="description">
          <el-input v-model="ruleForm.description" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSave('ruleForm')">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
    import $ from 'jquery';
    import {mapState, mapGetters} from 'vuex';
    import {getTableData, exportExcelData} from '../../api/typeManagement.js';
    import {find_repeat} from '../../utils/tools.js';

    export default {
        data() {
            return {
                fileList: [],
                multiple: true,
                formData: "",

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
                },
                ruleForm: {
                    documentsFile: '',
                    documentsName: '',
                    version: '',
                    description: '',
                },
                rules: {
                    documentsFile: [
                        {required: true, message: '请上传安装包'},
                    ],
                    documentsName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    version: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                },
            };
        },
        mounted() {
            this.getTableDataFn({})
        },
        methods: {
            delFile() {
                this.fileList = [];
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
            },
            uploadFile(file) {
                this.formData.append("file", file.file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitUpload() {
                let formData = new FormData();
                formData.append("theme", this.theme);
                formData.append("file", this.fileList[0].raw);
                console.log(this.fileList[0])
                // axios({
                //     url: this.HOST + "/thematicfile/upload",
                //     method: "post",
                //     data: formData,
                //     headers: {
                //         "Content-Type": "multipart/form-data;charset=utf-8"
                //     }
                // })
                //     .then(res => {
                //         if (res.data.success) {
                //             // alert("导入成功!");
                //         } else {
                //             alert(res.data.message + "," + res.data.data);
                //         }
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     });
            },


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
            submitSave(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            setTypeSubmit(row, type) {
                this.csId = row.id
                this.download();
            }
        },
        computed: {
            // ...mapState({
            //     isTypeManagement: state => state.common.isTypeManagement
            // })
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

  .lookInfo {
    color: #00A6D2;
    cursor: pointer;
  }
</style>

