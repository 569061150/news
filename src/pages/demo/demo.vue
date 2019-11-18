<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="info_inner">-->
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <el-row type="flex" justify="start">-->
<!--            <el-button @click="showDialogForm">添加内容</el-button>-->
<!--            <el-button type="primary">主要按钮</el-button>-->
<!--            <el-button type="success">成功按钮</el-button>-->
<!--            <el-button type="info">信息按钮</el-button>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-row type="flex" justify="end">-->
<!--            <el-button type="warning">警告按钮</el-button>-->
<!--            <el-button type="danger">危险按钮</el-button>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-table :data="tableData" :row-key="getRowKeys" border max-height="600">-->
<!--          <el-table-column align="center" :reserve-selection="true" type="selection" width="55"></el-table-column>-->
<!--          <el-table-column-->
<!--            v-for="(column,index) in tableHeader"-->
<!--            :key="index"-->
<!--            :prop="column.prop"-->
<!--            :label="column.label"-->
<!--            :width="column.width"-->
<!--            :min-width="column.minWidth?column.minWidth:null"-->
<!--          ></el-table-column>-->
<!--          <el-table-column label="操作" width="100">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
<!--              <el-button type="text" size="small">编辑</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-row>-->

<!--      <el-row style="padding-bottom:20px">-->
<!--        <Pagination-->
<!--          :paginationConfig="paginationConfig"-->
<!--          @listenPaginationChange="listenPaginationChange"-->
<!--        ></Pagination>-->
<!--      </el-row>-->

<!--      <DialogForm-->
<!--        @listenDialogFormSubmit="listenDialogFormSubmit"-->
<!--        :dialogFormConfig="dialogFormConfig"-->
<!--      ></DialogForm>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Pagination from "../../components/data/pagination";-->
<!--import DialogForm from "../../components/data/dialogForm";-->
<!--import { mapState, mapMutations } from "vuex";-->
<!--export default {-->
<!--  name: "equipment",-->
<!--  components: { Pagination, DialogForm },-->
<!--  data() {-->
<!--    return {-->
<!--      getRowKeys(row) {-->
<!--        return row.id;-->
<!--      },-->
<!--      dialogFormConfig: {},-->
<!--      paginationConfig: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        total: 200,-->
<!--        pageSizes: [10, 20, 50, 100]-->
<!--      },-->
<!--      tableHeader: [-->
<!--        {-->
<!--          prop: "date",-->
<!--          label: "日期",-->
<!--          width: "150"-->
<!--        },-->
<!--        {-->
<!--          prop: "name",-->
<!--          label: "姓名",-->
<!--          width: "120"-->
<!--        },-->
<!--        {-->
<!--          prop: "province",-->
<!--          label: "省份",-->
<!--          width: "120"-->
<!--        },-->
<!--        {-->
<!--          prop: "city",-->
<!--          label: "市区"-->
<!--        },-->
<!--        {-->
<!--          prop: "address",-->
<!--          label: "地址",-->
<!--          minWidth: "200"-->
<!--        },-->
<!--        {-->
<!--          prop: "zip",-->
<!--          label: "邮编",-->
<!--          width: "120"-->
<!--        }-->
<!--      ],-->
<!--      tableData: []-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    console.log("this.$router===");-->
<!--    console.log(this.$router.title);-->

<!--    window.publicMethods.configSearchFormModal({-->
<!--      formItems: [-->
<!--        {-->
<!--          _type: "dataPicker",-->
<!--          keyName: "dataVal",-->
<!--          label: "时间"-->
<!--        },-->
<!--        {-->
<!--          _type: "input",-->
<!--          keyName: "checkPass",-->
<!--          label: "设备标识密码",-->
<!--          rule: {-->
<!--            required: true,-->
<!--            validator: (rule, value, callback) => {-->
<!--              if (value === "") {-->
<!--                callback(new Error("请输入密码"));-->
<!--              } else {-->
<!--                callback();-->
<!--              }-->
<!--            },-->
<!--            trigger: "blur"-->
<!--          }-->
<!--        },-->
<!--        {-->
<!--          _type: "input",-->
<!--          keyName: "vinVal",-->
<!--          label: "Vin",-->
<!--          rule: { required: true, message: "请输入17位Vin号", trigger: "blur" }-->
<!--        },-->
<!--        {-->
<!--          _type: "select",-->
<!--          keyName: "channelVal",-->
<!--          label: "渠道名称",-->
<!--          options: [-->
<!--            {-->
<!--              value: "1",-->
<!--              label: "黄金糕"-->
<!--            },-->
<!--            {-->
<!--              value: "2",-->
<!--              label: "双皮奶"-->
<!--            },-->
<!--            {-->
<!--              value: "3",-->
<!--              label: "蚵仔煎"-->
<!--            },-->
<!--            {-->
<!--              value: "4",-->
<!--              label: "龙须面"-->
<!--            },-->
<!--            {-->
<!--              value: "5",-->
<!--              label: "北京烤鸭"-->
<!--            }-->
<!--          ]-->
<!--        },-->
<!--        {-->
<!--          _type: "radio",-->
<!--          label: "鉴权状态",-->
<!--          keyName: "equipmentState",-->
<!--          options: [-->
<!--            {-->
<!--              value: "1",-->
<!--              label: "鉴权成功"-->
<!--            },-->
<!--            {-->
<!--              value: "2",-->
<!--              label: "鉴权失败"-->
<!--            }-->
<!--          ]-->
<!--        }-->
<!--      ]-->
<!--    });-->
<!--    var arr = [];-->
<!--    for (let i = 0; i < 15; i++) {-->
<!--      arr.push({-->
<!--        date: "2016-05-02",-->
<!--        name: "王小虎",-->
<!--        province: "上海",-->
<!--        city: "普陀区",-->
<!--        address: "上海市普陀区金沙江路 1518 弄",-->
<!--        zip: 200333-->
<!--      });-->
<!--    }-->
<!--    this.tableData = arr;-->
<!--    this.configDialogForm();-->
<!--  },-->
<!--  methods: {-->
<!--    listenDialogFormSubmit(dialogForm) {-->
<!--      console.log(dialogForm);-->
<!--    },-->
<!--    listenPaginationChange(pagination) {-->
<!--      console.log("listenPaginationChange");-->
<!--      console.log(pagination);-->
<!--    },-->
<!--    showDialogForm() {-->
<!--      this.dialogFormConfig.isVisible = true;-->
<!--    },-->
<!--    configDialogForm() {-->
<!--      this.dialogFormConfig = {-->
<!--        title: "test",-->
<!--        submitText: "提交",-->
<!--        isVisible: false,-->
<!--        dialogForm: {-->
<!--          _formType: "add",-->
<!--          dataVal: "",-->
<!--          checkPass: "",-->
<!--          vinVal: "",-->
<!--          channelVal: "",-->
<!--          equipmentState: "",-->
<!--          switchVal: false,-->
<!--          checkboxVal: [],-->
<!--          textareaVal: ""-->
<!--        },-->
<!--        dialogFormItems: [-->
<!--          {-->
<!--            _type: "input",-->
<!--            keyName: "checkPass",-->
<!--            label: "设备标识密码",-->
<!--            rule: {-->
<!--              required: true,-->
<!--              validator: (rule, value, callback) => {-->
<!--                if (value === "") {-->
<!--                  callback(new Error("请输入密码"));-->
<!--                } else {-->
<!--                  callback();-->
<!--                }-->
<!--              },-->
<!--              trigger: "blur"-->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            _type: "input",-->
<!--            keyName: "vinVal",-->
<!--            label: "Vin",-->
<!--            rule: {-->
<!--              required: true,-->
<!--              message: "请输入17位Vin号",-->
<!--              trigger: "blur"-->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            _type: "select",-->
<!--            keyName: "channelVal",-->
<!--            label: "渠道名称",-->
<!--            options: [-->
<!--              {-->
<!--                value: "1",-->
<!--                label: "黄金糕"-->
<!--              },-->
<!--              {-->
<!--                value: "2",-->
<!--                label: "双皮奶"-->
<!--              },-->
<!--              {-->
<!--                value: "3",-->
<!--                label: "蚵仔煎"-->
<!--              },-->
<!--              {-->
<!--                value: "4",-->
<!--                label: "龙须面"-->
<!--              },-->
<!--              {-->
<!--                value: "5",-->
<!--                label: "北京烤鸭"-->
<!--              }-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            _type: "radio",-->
<!--            label: "鉴权状态",-->
<!--            keyName: "equipmentState",-->
<!--            options: [-->
<!--              {-->
<!--                value: "1",-->
<!--                label: "鉴权成功"-->
<!--              },-->
<!--              {-->
<!--                value: "2",-->
<!--                label: "鉴权失败"-->
<!--              }-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            _type: "switch",-->
<!--            label: "选择是否",-->
<!--            keyName: "switchVal"-->
<!--          },-->
<!--          {-->
<!--            _type: "checkbox",-->
<!--            label: "选择国家",-->
<!--            keyName: "checkboxVal",-->
<!--            options: [-->
<!--              {-->
<!--                label: "美国"-->
<!--              },-->
<!--              {-->
<!--                label: "英国"-->
<!--              },-->
<!--              {-->
<!--                label: "日本"-->
<!--              },-->
<!--              {-->
<!--                label: "韩国"-->
<!--              }-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            _type: "textarea",-->
<!--            label: "富文本输入",-->
<!--            keyName: "textareaVal"-->
<!--          }-->
<!--        ]-->
<!--      };-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    isSearchSubmit(val) {-->
<!--      console.log("isSearchSubmit-equipment");-->
<!--      console.log(this.formSearch);-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState({-->
<!--      isSearchSubmit: state => state.search.isSearchSubmit,-->
<!--      formSearch: state => state.search.formData-->
<!--    })-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
<!--</style>-->


