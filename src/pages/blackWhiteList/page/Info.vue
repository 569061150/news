<template>
  <div class="addCs">

    <div class="mTop20">
      <el-row>
        <el-col :span="12">
          <el-row type="flex" justify="start">
            <el-button @click="toRouer({to:'detail',state:'off'})"><i class="el-icon-back"></i> 取消</el-button>
            <el-button :disabled="saveDisabled" type="primary" @click="toRouer({to:'detail',state:'yes'})"><i
              class="el-icon-sort"></i> 保存排序
            </el-button>
          </el-row>
        </el-col>
      </el-row>
      <div class="mTop20"></div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="groupCode"
            label="分类ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="id"
            label="排序"
          >
            <template slot-scope="scope">
              <input class="elPut" :class="['active' + scope.$index]"
                     v-model="scope.row.id"
                     type="text"
                     @input="handleEdit(scope.$index,scope.row)"
                     @blur="handleSave(scope.$index,scope.row)"
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  </div>
</template>
<script>
    import $ from 'jquery';
    import {mapState, mapGetters} from 'vuex';
    import {getTableData} from '../../../api/typeManagement.js';
    import {find_repeat} from '../../../utils/tools.js';

    export default {
        data() {
            return {
                saveDisabled: false,
                tableData: []
            };
        },
        mounted() {
            this.getTableDataFn({})
        },
        methods: {
          handleEdit(index, row) {
            if (row.id != '') {
              this.tableData[index].id = this.tableData[index].id.replace(/[^1-9]/g, '');
            }
          },
          handleSave(index, row) {
            this.$message.closeAll();
            if (row.id == '') {
              this.$message({
                type: 'error',
                message: '错了哦，排序不能为空！',
                duration: 2000
              });
              $('.active' + index).focus();
              this.saveDisabled = true
            } else {
              this.saveDisabled = false
              find_repeat('id', this.tableData, (index, data) => {
                this.saveDisabled = true
              });
              if (this.saveDisabled) {
                this.$message({
                  type: 'error',
                  message: '错了哦，排序不能重复！',
                  duration: 2000
                });
              }
            }
          },
            toRouer(obj) {

                this.$message.closeAll();
                //  拿到修改后的数据后，请求 成功后返回主页
                if (obj.state == 'yes') {
                    console.log(this.tableData)
                    alert('ok')
                    this.$store.commit('setIsTypeManagement');

                } else {
                    this.$emit('change-route', obj);
                }
            },
            getTableDataFn(params) {
                getTableData(params).then(res => {
                    if (res.data.code == 301000) {
                        this.tableData = res.data.data.list;
                    }
                });
            }
        },
        computed: {
            ...mapState({
                isTypeManagement: state => state.common.isTypeManagement
            })
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
</style>

