<template>
  <div>
    <!--  新增banner  add / 编辑banner  edit   -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape='true'
      :visible="dialogVisible"
      v-if="dialogVisible"
      width="40%"
      :before-close="dialogVisibleClose"
    >

      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

          <el-form-item label="名称：" prop="name">
            <el-input v-model="ruleForm.name" maxlength="20" placeholder="不超过20个字符"></el-input>
          </el-form-item>

          <el-form-item class="appIcon" label="图片" prop="pic">
            <dialogFile
              ref="dialogFile1"
              v-model="ruleForm.pic"
              @getData="getAppIconData"
              :limit="1"
              :fileList="appIconFileList"
            ></dialogFile>
          </el-form-item>

          <el-form-item label="链接地址：" prop="links">
            <el-input v-model="ruleForm.links" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="上线时间：" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              placeholder="选择上线日期时间"
              :picker-options="pickerOptionsStart"
              value-format="yyyy-MM-dd HH:mm:ss"
              :editable="false"
              default-time="00:00:00">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="下线时间：" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              placeholder="选择下线日期时间"
              :picker-options="pickerOptionsEnd"
              value-format="yyyy-MM-dd HH:mm:ss"
              :editable="false"
              default-time="00:00:00">
            </el-date-picker>
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
    import {getTableData} from '../../../../../api/typeManagement.js';
    import {time_to_sec, MinutesTest, formatDate} from '@/utils/tools.js';
    //上线时间： 如果是当天  时分秒为 当前时间+ 5分钟
    //    下线时间： 如果是当天 时分秒为  当前时间+ 5分钟

    export default {
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        components: {
            'dialogFile': () => import('../../../../../components/comment/dialogFile')
        },
        data() {
            return {
                width: "220px",
                optionsName: [],
                formLabelWidth: '100',
                appIconFileList: [],  //  图标初始化
                ruleForm: {
                    name: '',
                    pic: [],
                    links: '',
                    startTime: formatDate(new Date().getTime() + 5 * 60 * 1000) || "",
                    endTime: ""
                },
                pickerOptionsStart: {
                    disabledDate: time => {
                        if (this.ruleForm.endTime) {
                            return time.getTime() > new Date(this.ruleForm.endTime).getTime() || time.getTime() < new Date().getTime() - 86400000
                        } else {
                            return time.getTime() < (new Date().getTime() - 86400000);
                        }
                    }
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        if (this.ruleForm.startTime) {
                            return time.getTime() < new Date(this.ruleForm.startTime).getTime() - 86400000
                        } else {
                            return time.getTime() <= (new Date().getTime() - 86400000);
                        }
                    }
                }
            };
        },
        computed: {
            rules() {
                return {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    pic: [
                        {required: true, message: '请上传图片', trigger: 'change'}
                    ],
                    links: [
                        {required: true, message: '请输入链接地址', trigger: 'blur'}
                    ],
                    startTime: [
                        {required: true, message: '选择上线日期时间', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                let now = new Date().getTime();
                                if (now > new Date(this.ruleForm.startTime).getTime()) {
                                    this.ruleForm.startTime = formatDate(now + 5 * 60 * 1000);
                                }
                                if (new Date(this.ruleForm.startTime).getTime() > new Date(this.ruleForm.endTime).getTime()) {
                                    callback(new Error('上线时间必须小于下线时间'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    endTime: [
                        {required: true, message: '选择下线日期时间', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                let now = new Date().getTime();
                                if (now > new Date(this.ruleForm.endTime).getTime()) {
                                    this.ruleForm.endTime = formatDate(now + 5 * 60 * 1000);
                                }
                                if (new Date(this.ruleForm.startTime).getTime() > new Date(this.ruleForm.endTime).getTime()) {
                                    callback(new Error('下线时间必须大于上线时间'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                }
            }
        },
        mounted() {
        },
        methods: {
            saveHandler(value) {
                if (this.ruleForm.startTime == "") {
                    var mydate = new Date().getTime() + 5 * 60 * 1000
                    console.log(formatDate(new Date().getTime() + 5 * 60 * 1000))
                    this.ruleForm.startTime = formatDate(mydate)
                }
            },
            getAppIconData(obj) {
                console.log("getAppIconData===")
                console.log(obj)
                this.ruleForm.pic = obj
                this.$refs["ruleForm"].validateField('pic');
            },
            dialogVisibleClose(type) {
                this.$emit('dialogVisibleClose', type);
            },
            add() {
                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
            },
            edit() {

                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
            },
            submit(formName) {
                if (this.type == 'add') {
                    console.log(this.ruleForm)
                    this.$refs[formName].validate((valid) => {
                        this.$refs[formName].validateField('pic');
                        if (valid) {
                            console.log(this.ruleForm)
                            if (this.type == 'add') {
                                this.add();
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else if (this.type == 'delete') {
                    this.delete();
                }
            }
        },
        watch: {
            index() {
                if (this.type == 'add') {
                    this.ruleForm = {
                        name: '',
                        pic: [],
                        links: '',
                        startTime: formatDate(new Date().getTime() + 5 * 60 * 1000) || "",
                        endTime: ""
                    }
                    this.appIconFileList = []
                } else if (this.type == 'edit') {
                    this.appIconFileList = [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }]
                }
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

