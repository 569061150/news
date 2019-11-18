<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="false"
      :visible="dialogVisible"
      width="30%"
      :before-close="dialogVisibleClose"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="不超过20个字"></el-input>
          </el-form-item>


          <el-form-item label="应用图标" prop="name">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!--            -->
            <!--            <el-dialog :visible.sync="diav">-->
            <!--              <img width="100%" :src="dialogImageUrl" alt="">-->
            <!--            </el-dialog>-->

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

    export default {
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                dialogImageUrl: '',
                diav: false,
                stateType: true,
                message: '',
                ruleForm: {
                    name: ''
                },
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]

            };
        },
        computed: {
            rules() {
                return {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {max: 10000, message: '长度在 10 个字符以内', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
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

<style scoped lang="scss">
</style>

