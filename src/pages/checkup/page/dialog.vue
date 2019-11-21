<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :visible="dialogVisible"
      width="30%"
      :before-close="dialogVisibleClose"
    >
      <div v-if="type=='add' || type=='edit'">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item v-if="type=='add'" label="分类名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称，10字以内"></el-input>
          </el-form-item>
          <el-form-item v-if="type=='edit'" label="分类名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称，10字以内"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="type=='state'">
        <div v-if="stateType">确认{{stateText}}该分类？</div>
        <div v-if="!stateType">{{message}}</div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="stateType" @click="dialogVisibleClose(0)">取 消</el-button>
        <!--   新增和编辑提交按钮     -->
        <el-button v-if="type=='add' || type=='edit'" type="primary" @click="submit('ruleForm')">保存</el-button>
        <el-button v-if="type=='state'" type="primary" @click="submit">确认</el-button>
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
                stateType: true,
                message: '',
                stateText: '启用',
                ruleForm: {
                    name: ''
                }
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
            state() {
                // 状态分接口成功后 关闭弹窗 刷新列表
                //
                if (this.stateType) {
                    this.stateType = false
                    this.message = '请先将应用从该分类移除，再进行停用操作！'
                } else {
                    this.dialogVisibleClose('stateBtn');
                }
            },
            submit(formName) {
                if (this.type == 'add' || this.type == 'edit') {
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
                } else if (this.type == 'state') {
                    this.state();
                }
            }
        },
        watch: {
            index() {
                if (this.type == 'add') {
                    this.ruleForm.name = '';
                } else if (this.type == 'edit') {
                    console.log(this.row)
                    this.ruleForm.name = this.row.groupName;
                } else if (this.type == 'state') {
                    this.stateType = true
                    this.message = ''
                    console.log(this.row)
                    this.stateText = this.row.groupCode == 'admin' ? '启用' : '停用';
                }
                console.log(this.index)
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

