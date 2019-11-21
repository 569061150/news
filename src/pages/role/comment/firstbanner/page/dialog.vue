<template>
  <div>
    <!--  增加分类 add / 编辑分类 edit  停用/启用 state   管理应用app  -->
    <el-dialog
      v-dialogDrag
      :title="title"
      :modal="true"
      :visible="dialogVisible"
      :before-close="dialogVisibleClose"
    >

      <div v-if="type=='add'">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

          <el-form-item label="应用分类：" prop="value">
            <el-select v-model="ruleForm.value" placeholder="请选择">
              <el-option
                v-for="item in row"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="应用名称：" prop="name">
            <el-select v-model="ruleForm.name" placeholder="请选择">
              <el-option
                v-for="item in row"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="排序：" prop="sort">
            <el-input style="width: 217px;" @input="handleChange" v-model="ruleForm.sort"
                      placeholder="请输入大于0的整数"></el-input>
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
        <el-button v-if="type=='delete'" type="primary" @click="submit">确认</el-button>
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
                    value: '',
                    name: '',
                    sort: ''
                }
            };
        },
        computed: {
            rules() {
                return {
                    value: [
                        {required: true, message: '请选择应用分类', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请选择应用名称', trigger: 'change'}
                    ],
                    sort: [
                        {required: true, message: '请填写排序', trigger: 'change'}
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            handleChange(value) {
                this.ruleForm.sort = this.ruleForm.sort.replace(/[^\d]/g, '');
            },
            dialogVisibleClose(type) {
                this.$emit('dialogVisibleClose', type);
            },
            add() {
                // 增加分接口成功后 关闭弹窗 刷新列表
                this.dialogVisibleClose('addBtn');
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
                if (this.type == 'add') {
                    this.$refs[formName].validate((valid) => {
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
                    this.ruleForm.name = '';
                    this.ruleForm.value = '';
                    this.ruleForm.sort = '';
                } else if (this.type == 'delete') {
                    console.log(this.row)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
</style>

