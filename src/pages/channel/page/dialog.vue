<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="false"
      :visible="dialogVisible"
      width="40%"
      :before-close="dialogVisibleClose"
    >
      <div>
        <el-form :model="ruleForm" :rules="ruleValidate" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="应用名称" prop="appName">
            <el-input v-model="ruleForm.appName" placeholder="不超过20个字"></el-input>
          </el-form-item>

          <el-form-item class="appIcon" label="应用图标" prop="appIcon">
            <el-upload
              v-model="ruleForm.appIcon"
              class="avatar-uploader"
              action="string"
              :auto-upload="false"
              :show-file-list="false"
              :disabled="loading"
              :on-change="handleChange"
            >
              <div v-if="imageUrl" class="avatar" :loading="loading">
                <img :src="imageUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="应用截图" prop="screenshot">
            <el-upload
              action="string"
              list-type="picture-card"
              :on-remove="handleRemove"

              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <div class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </div>
              </div>
            </el-upload>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(0)">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="FixdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>
<script>
    import {getTableData} from '../../../api/typeManagement.js';
    import {subjectUpload} from '../../../api/upload.js';

    export default {
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                loading: false,
                stateType: true,
                message: '',
                ruleForm: {
                    appName: '',
                    appIcon: '',
                    screenshot: '',
                },
                fileList: [],
                imageUrl: '',
                //
                dialogImageUrl: '',
                FixdialogVisible: false,
                disabled: false
            };
        },
        computed: {
            ruleValidate() {
                return {
                    appName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {max: 20, message: '长度在 20 个字符以内', trigger: 'blur'}
                    ],
                    appIcon: [
                        {required: true, message: '请上传图标', trigger: "change"},
                    ],
                    screenshot: [
                        {required: true, message: '请上传图标', trigger: "change"},
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            //  应用图标
            handleChange(file) {
                console.log(file)
                //  this.loading = true
                const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png';
                const isLt2M = file.raw.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    return
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return
                }
                this.submitUpload(file)
            },
            submitUpload(file) {
                this.loading = true
                let formData = new FormData();
                formData.append("file", file.raw);
                subjectUpload('http://backend-api-8081-xd-tsp-dev.xd-dev.nxengine.com/v1.0/subjectDown/subjectUpload', formData).then(res => {
                    this.loading = false
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.ruleForm.appIcon = res.data.data.url
                }).catch((err) => {
                    this.loading = false
                    this.documentsFileName = ""
                    this.ruleForm.documentsFile = ""
                })
            },


            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.FixdialogVisible = true;
            },


            dialogVisibleClose(type) {
                this.$emit('dialogVisibleClose', type);
            },
            add() {
                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
            },
            edit() {
                // 编辑分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('editBtn');
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm)
                        if (this.type == 'add') {
                            this.add();
                        } else if (this.type == 'edit') {
                            this.edit();
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        watch: {
            index() {
                if (this.type == 'add') {
                    this.ruleForm.name = '';
                } else if (this.type == 'edit') {
                    this.ruleForm.name = this.row.groupName;
                }
            }
        }
    };
</script>

<style lang="scss">
  .appIcon {
    .avatar-uploader {
      line-height: initial;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      line-height: initial;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 18px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .avatar {
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-right: 15px;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>

