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
          border
          stripe
          :data="tableData"
          style="width: 100%; text-align: center;">
          <el-table-column
            label="序号"
            type="index"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="groupCode"
            label="分类ID"
         >
          </el-table-column>
          <el-table-column
            prop="id"
            label="排序"
          >
            <template slot-scope="scope">
              <input class="elPut" ref="active" :class="['active' + scope.$index]"
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
    import {getTableData} from '../../api/typeManagement.js';
    import {find_repeat} from '../../utils/tools.js';

    export default {
        props: ['tableData'],
        data() {
            return {
                saveDisabled: false,
                //  tableData: [],
            };
        },
        mounted() {
            // this.getTableDataFn({})
        },
        methods: {
            handleEdit(index, row) {
                if (row.id != '') {
                    // console.log(this.tableData[index].id)
                    this.tableData[index].id = this.tableData[index].id.replace(/[^1-9]/g, '');
                    this.tableData.forEach((item, iii) => {
                        if (!$('.active' + iii).hasClass('nulls')) {
                            $('.active' + iii).removeClass('err nulls');
                        }
                    });
                    console.log(this.tableData[index].id)
                    find_repeat('id', this.tableData, (index, data) => {
                        console.log(index)
                        $('.active' + index).addClass('err');
                    });
                } else {
                    $('.active' + index).removeClass('err nulls');
                }
            },
            handleSave(index, row) {
                this.tableData.forEach((item, ii) => {
                    if (item.id == '') {
                        $('.active' + ii).addClass('err nulls');
                    } else if ($('.active' + ii).hasClass('nulls')) {
                        $('.active' + ii).removeClass('err nulls');
                    }
                });
                this.tableData.forEach((item, iii) => {
                    if (!$('.active' + iii).hasClass('nulls')) {
                        $('.active' + iii).removeClass('err nulls');
                    }
                });
                find_repeat('id', this.tableData, (index, data) => {
                    $('.active' + index).addClass('err');
                });
                if ($('.elPut.err').length > 0) {
                    this.$message.closeAll();
                    this.saveDisabled = true
                    this.$message({
                        type: 'error',
                        message: '错了哦，排序不能为空且不能重复！',
                        duration: 2000
                    });
                } else {
                    this.saveDisabled = false
                }
            },
            toRouer(obj) {
                //  拿到修改后的数据后，请求 成功后返回主页
                if (obj.state == 'yes') {
                    // console.log(this.tableData)
                    //  alert('ok')

                    this.$emit('updata-server', this.tableData);

                } else {
                    this.$emit('change-route', obj);
                }
            },
            getTableDataFn(params) {
                getTableData(params).then(res => {
                    console.log(res)
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
        watch: {
            isTypeManagement() {
                this.getTableDataFn({
                    name: '',
                    id: '',
                    pageSize: this.paginationConfig.pageSize,
                    pageNum: this.paginationConfig.pageIndex
                })
            }
        }
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

