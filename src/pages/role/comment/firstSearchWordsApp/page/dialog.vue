<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape='true'
      :visible="dialogVisible"
      :before-close="dialogVisibleClose"
      width="20%"
    >

      <div v-if="type=='add' || type=='edit'">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="文案：" prop="name">
            <el-input v-model="ruleForm.name" maxlength="20" placeholder="不超过20个字符"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="type=='delete'">
        <div>确认删除该应用的推广？</div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClose(0)">取 消</el-button>
        <!--   新增和编辑提交按钮     -->
        <el-button v-if="type=='add'" type="primary" @click="submit('ruleForm')">保存</el-button>
        <el-button v-if="type=='delete'  || type=='edit'" type="primary" @click="submit">确认</el-button>
      </div>

    </el-dialog>

  </div>
</template>
<script>
    import {getTableData} from '../../../../../api/typeManagement.js';

    export default {
        props: ['dialogVisible', 'type', 'row', 'title', 'index'],
        data() {
            return {
                optionsName: [],
                formLabelWidth: '100',
                ruleForm: {
                    name: '',
                }
            };
        },
        computed: {
            rules() {
                return {
                    name: [
                        {required: true, message: '请选择应用名称', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            dialogVisibleClose(type) {
                this.$emit('dialogVisibleClose', type);
            },
            add() {
                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
                this.$notify({
                    title: '成功',
                    message: '增加成功',
                    type: 'success'
                });
            },
            edit() {
                // 编辑分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
                this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success'
                });
            },
            delete() {
                // 状态分接口成功后 关闭弹窗 刷新列表
                // if (this.stateType) {
                //     this.stateType = false
                //     this.message = '请先将应用从该分类移除，再进行停用操作！'
                // } else {
                //     this.dialogVisibleClose('stateBtn');
                // }
                let aa = 1
                if (aa) {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    });
                    this.dialogVisibleClose('deleteBtn');
                } else {
                    this.$notify.error({
                        title: '失败',
                        message: '删除失败'
                    });
                    this.dialogVisibleClose(0);
                }

            },
            submit(formName) {
                if (this.type == 'add' || this.type == 'edit') {
                    formName = 'ruleForm'
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            console.log(this.ruleForm)
                            if (this.type == 'add') {
                                this.add();
                            } else {
                                this.edit();
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
                    this.ruleForm.name = '';
                } else if (this.type == 'edit') {
                    console.log(this.row)
                    this.ruleForm.name = this.row.groupName
                } else if (this.type == 'delete') {
                    console.log(this.row)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

