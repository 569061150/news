<template>
  <!--  page = '  应用推广',-->
  <div class="pageBar page-type-management" style="width: 500px;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item class="appIcon" label="微信二维码" prop="pic">
        <dialogFile
          ref="dialogFile1"
          v-model="ruleForm.pic"
          @getData="getAppIconData"
          :limit="1"
          :fileList="appIconFileList"
        ></dialogFile>
      </el-form-item>

      <el-form-item label="微信号：" prop="wechats">
        <el-input v-model="ruleForm.wechats" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="电话：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder=""></el-input>
      </el-form-item>

      <el-form-item>
        <el-button  style="margin-top: 20px;width:180px;" type="primary" @click="submit('ruleForm')">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    import {getTableData} from '../../../../api/typeManagement.js';

    export default {
        components: {
            'dialogFile': () => import('../../../../components/comment/dialogFile')
        },
        data() {
            return {
                appIconFileList: [],  //  图标初始化
                ruleForm: {
                    pic: [],
                    wechats: '',
                    phone: ''
                },
                rules: {
                    pic: [
                        {required: true, message: '请上传图片', trigger: 'change'}
                    ],
                    wechats: [
                        {required: true, message: '请输入微信号', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'}
                    ],
                }
            };
        },
        created() {
            this.appIconFileList = [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        },
        methods: {
            getAppIconData(obj) {
                console.log("getAppIconData===")
                console.log(obj)
                this.ruleForm.pic = obj
                this.$refs["ruleForm"].validateField('pic');
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    this.$refs[formName].validateField('pic');
                    if (valid) {
                        console.log(this.ruleForm)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">
</style>


