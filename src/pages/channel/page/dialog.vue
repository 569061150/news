<template>
  <div class="manDialog">
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :append-to-body="true"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape='true'
      width="40%"
      :before-close="dialogVisibleClose"
    >
      <div>
        <el-form :model="ruleForm" :rules="ruleValidate" ref="ruleForm" label-width="120px" size="small"
                 class="demo-ruleForm">
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

          <el-form-item class="appIcon" label="应用截图" prop="screenshots">
            <dialogFile
              ref="dialogFile2"
              v-model="ruleForm.screenshots"
              @getData="getScreenshotData"
              :limit="5"
              :fileList="screenshotFileList"
            ></dialogFile>
          </el-form-item>

          <el-form-item label="一句话描述" prop="description">
            <el-input v-model="ruleForm.description" maxlength="20" placeholder="不超过20个字"></el-input>
          </el-form-item>

          <el-form-item label="应用介绍" prop="introduction">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" v-model="ruleForm.introduction"
                      maxlength="500" placeholder="不超过500个字"></el-input>
          </el-form-item>

          <el-form-item label="应用分类" prop="appType">
            <el-select v-model="ruleForm.appType" placeholder="请选择">
              <el-option
                v-for="item in typesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="官方认证" prop="attestation">
            <template>
              <el-radio v-model="ruleForm.attestation" label="1">备选项</el-radio>
              <el-radio v-model="ruleForm.attestation" label="2">备选项</el-radio>
            </template>
          </el-form-item>

          <el-form-item label="开发者" prop="developers">
            <el-input v-model="ruleForm.developers" maxlength="50" placeholder="不超过50个字"></el-input>
          </el-form-item>

          <el-form-item v-if="type !== 'edit'" label="包名" prop="packageName">
            <el-input v-model="ruleForm.packageName"></el-input>
          </el-form-item>

          <el-form-item v-if="type !== 'edit'" label="版本号" prop="version">
            <el-input v-model="ruleForm.version" placeholder=""></el-input>
          </el-form-item>


          <el-form-item v-if="type == 'update'" label="版本更新说明" prop="updateVersionDes">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" v-model="ruleForm.updateVersionDes"
                      maxlength="500" placeholder="不超过500个字"></el-input>
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
            'dialogFile': () => import('../../../components/comment/dialogFile')
        },
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                typesArr: [
                    {
                        value: '1',
                        label: '影音娱乐'
                    },
                    {
                        value: '2',
                        label: '酷狗音乐'
                    }
                ],
                appIconFileList: [],  //  图标初始化
                screenshotFileList: [],    //  应用截图
                ruleForm: {
                    // appName: '',
                    // appIcon: [],
                    // screenshots: [],
                    // description: '',
                    // introduction: '',
                    // appType: '',
                    // attestation: '',
                    // developers: '',
                    // packageName: '',
                    // version: '',
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
                    screenshots: [
                        {required: true, message: '请上传应用截图', trigger: "change"},
                    ],
                    introduction: [
                        {required: true, message: '请输入应用介绍', trigger: "blur"},
                    ],
                    appType: [
                        {required: true, message: '请选择应用分类', trigger: "change"},
                    ],
                    attestation: [
                        {required: true, message: '请选择官方认证', trigger: 'change'}
                    ],
                    developers: [
                        {required: true, message: '请输入开发者', trigger: 'blur'}
                    ],
                    packageName: [
                        {required: true, message: '请输入包名', trigger: 'blur'}
                    ],
                    version: [
                        {required: true, message: '请输入包名', trigger: 'blur'},
                    ],
                    updateVersionDes: [
                        {required: true, message: '版本更新说明', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {

        },
        created() {
            // this.appIconFileList = [{
            //     name: 'food.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }]
            // //  图标初始化
            // this.screenshotFileList = [{
            //     name: 'food.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }, {
            //     name: 'food2.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            // }]
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
                this.ruleForm.screenshots = obj
                this.$refs["ruleForm"].validateField('screenshots');
            },
            dialogVisibleClose(type) {
                this.clearInfo();
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
            clearInfo() {
                // 初始化
                this.$refs.dialogFile1.emptyUpload();
                this.$refs.dialogFile2.emptyUpload();
                this.$refs["ruleForm"].resetFields();
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    this.$refs[formName].validateField('appIcon');
                    this.$refs[formName].validateField('screenshot');
                    if (valid) {
                        console.log(this.ruleForm)
                        return
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
                alert(this.type)
                if (this.type == 'add') {

                    this.ruleForm.name = '';
                    this.ruleForm = {
                        appName: '',
                        appIcon: [],
                        screenshots: [],
                        description: '',
                        introduction: '',
                        appType: '',
                        attestation: '',
                        developers: '',
                        packageName: '',
                        version: '',
                    }
                } else if (this.type == 'edit') {
                    this.ruleForm.name = this.row.groupName;
                    this.appIconFileList = [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }]
                    this.screenshotFileList = [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }, {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }]

                    this.ruleForm = {
                        appName: 'updateVersionDes',
                        appIcon: [{
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }],
                        screenshots: [{
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }],
                        description: 'description',
                        introduction: 'introduction',
                        appType: '1',
                        attestation: '1',
                        developers: 'developers',
                    }
                } else if (this.type == 'update') {
                    this.ruleForm.name = this.row.groupName;
                    this.appIconFileList = [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }]
                    this.screenshotFileList = [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }, {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }]

                    this.ruleForm = {
                        appName: 'updateVersionDes',
                        appIcon: [{
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }],
                        screenshots: [{
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }, {
                            name: 'food.jpeg',
                            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        }],
                        description: 'description',
                        introduction: 'introduction',
                        appType: '1',
                        attestation: '1',
                        developers: 'developers',
                        packageName: 'packageName',
                        version: 'version',
                        updateVersionDes: 'updateVersionDes',
                    }
                }
            }
        }
    };
</script>

<style lang="scss">

</style>

