<template>
  <el-row class="container">
    <!-- <el-header>
      长城汽车
    </el-header>-->
    <el-col class="bg-box" :span="15">
      <img class="bg" :src="imgBase+'/icon/login/bg.jpg'"/>
      <img class="login" :src="imgBase+'/icon/login/logo.png'"/>
    </el-col>
    <el-col class="form-container" :span="9">
      <div class="form-box">
        <el-form
          :model="forgetForm"
          :rules="rules"
          ref="forgetForm"
          label-width="100px"
          class="demo-forgetForm"
        >
          <el-form-item>
            <h1 class="title-container">修改密码</h1>
          </el-form-item>

          <el-form-item label="用户名：" prop="userName">
            <el-input placeholder="请输入用户名" v-model="forgetForm.userName"></el-input>
          </el-form-item>

          <el-form-item label="原始密码：" prop="oldPassword">
            <el-input placeholder="请输入原始密码" type="password" v-model="forgetForm.oldPassword"></el-input>
          </el-form-item>

          <el-form-item label="新密码：" prop="newPassword">
            <el-input placeholder="请输入新密码" type="password" v-model="forgetForm.newPassword"></el-input>
          </el-form-item>

          <el-form-item class="form-item-box" label="重复密码：" prop="repeatPassword">
            <el-input placeholder="请输入重复密码" type="password" v-model="forgetForm.repeatPassword"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width: 100%;" type="primary" @click="submitForm('forgetForm')">保 存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Footer></Footer>
    </el-col>
  </el-row>
</template>

<script>
    import Footer from "@/components/defaut/footer";
    import {mapState} from "vuex";
    import {changePassword} from "@/api/userLogin";

    export default {
        components: {
            Footer
        },
        computed: {
            ...mapState({
                imgBase: state => state.configInfo.imgBase
            })
        },
        data() {
            let validatePassold = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入原始密码"));
                } else if (value.length < 6 || value.length > 20) {
                  //  callback(new Error("长度应大于6小于20"));
                    callback();
                } else {
                    callback();
                }
            };
            let validatePassnews = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入新密码"));
                } else if (value.length < 6 || value.length > 20) {
                    callback(new Error("长度应大于6小于20"));
                } else {
                    callback();
                }
            };
            let validatePassrepeat = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入重复密码"));
                } else if (value !== this.forgetForm.newPassword) {
                    callback(new Error("2次密码不一致，请重新输入！"));
                } else {
                    callback();
                }
            };

            return {
                showAlert: false,
                forgetForm: {
                    userName: "",
                    oldPassword: "",
                    newPassword: "",
                    repeatPassword: ""
                },
                rules: {
                    userName: [{required: true, message: "请输入账户", trigger: "blur"}],
                    oldPassword: [
                        {required: true, validator: validatePassold, trigger: "blur"}
                    ],
                    newPassword: [
                        {required: true, validator: validatePassnews, trigger: "blur"}
                    ],
                    repeatPassword: [
                        {required: true, validator: validatePassrepeat, trigger: "blur"}
                    ]
                }
            };
        },
        mounted() {
            console.log("this===");
        },
        methods: {
            closeTip() {
                this.showAlert = false;
            },
            changePassword(params) {
                console.log(params);
                params = JSON.parse(JSON.stringify(params))
                delete params.repeatPassword
                changePassword(params).then(res => {
                    if (res.data.code == 301000) {
                        this.$message({
                            message: "恭喜您，修改成功！",
                            type: "success",
                            duration: 1000,
                            onClose: () => {
                                this.$router.push({path: "/login"});
                            }
                        });
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 2000
                        });
                    }
                }).catch(err => {
                    // this.$message({
                    //     message: err.message,
                    //     type: "error",
                    //     duration: 2000
                    // });
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.changePassword(this[formName]);
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>


<style lang="scss" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .bg-box {
      position: relative;

      .bg {
        width: 100%;
      }

      .login {
        position: absolute;
        top: 4%;
        left: 6%;
        width: 18%;
      }
    }

    .form-container {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .title-container {
        text-align: center;
        letter-spacing: 2px;
        font-size: 26px;
        margin-bottom: 25px;
      }

      .form-box {
        position: absolute;
        width: 65%;
        margin: 0 auto;
        left: 50%;
        top: 45%;
        transform: translateX(-50%) translateY(-50%);
      }

      .form-item-box {
        margin-bottom: 50px;
      }

      .login-links {
        a {
          text-decoration: none;
          color: #333333;
          display: inline-block;
          line-height: 19px;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
