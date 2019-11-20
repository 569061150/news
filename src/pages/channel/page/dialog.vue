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
            <dialogFile
              ref="dialogFile1"
              v-model="ruleForm.appIcon"
              @getData="getAppIconData"
              :limit="1"
              :fileList="appIconFileList"
            ></dialogFile>
          </el-form-item>

          <el-form-item class="appIcon" label="应用截图" prop="screenshot">
            <dialogFile
              ref="dialogFile2"
              v-model="ruleForm.screenshot"
              @getData="getScreenshotData"
              :limit="5"
              :fileList="screenshotFileList"
            ></dialogFile>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(0)">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
    import {getTableData} from '../../../api/typeManagement.js';
    import {subjectUpload} from '../../../api/upload.js';

    export default {
        components: {
            'dialogFile': () => import('./dialogFile')
        },
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                appIconFileList: [],  //  图标初始化
                screenshotFileList: [],    //  应用截图
                ruleForm: {
                    appName: '',
                    appIcon: [],
                    screenshot: [],
                },
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
        created() {
            this.appIconFileList = [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
            //  图标初始化
            this.screenshotFileList = [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        },
        methods: {
            getAppIconData(obj) {
                console.log("getAppIconData===")
                console.log(obj)
                this.ruleForm.appIcon = obj
                this.$refs["ruleForm"].validateField('appIcon');
            },
            getScreenshotData(obj) {
                console.log("getScreenshotData===")
                console.log(obj)
                this.ruleForm.screenshot = obj
                this.$refs["ruleForm"].validateField('screenshot');
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
                console.log(this.ruleForm)
                this.$refs[formName].validateField('appIcon');
                this.$refs[formName].validateField('screenshot');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm)
                        this.$refs.dialogFile1.emptyUpload();
                        this.$refs.dialogFile2.emptyUpload();
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
            dialogVisible() {

            },
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
    .el-form-item__error {
      top: 97%;
    }

    .avatar-uploader {
      line-height: initial;

      .el-upload--picture-card, .el-upload-list--picture-card .el-upload-list__item {
        width: 60px;
        height: 60px;
        display: inline-block;
      }

      .el-upload-list--picture-card .el-upload-list__item-actions span + span {
        margin-left: 5px;
      }
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      width: 60px;
      height: 60px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      line-height: initial;
      box-sizing: border-box;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon, .el-upload--picture-card i {
      font-size: 18px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .avatar {
      width: 100%;
      height: 100%;
      display: inline-block;
      position: relative;

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

