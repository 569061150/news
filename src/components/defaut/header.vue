<template>
  <section class="choose header-section clearfix">
    <div class="name">
      <!-- <i class="el-icon-s-home"></i>
      <span v-show="!isCollapse">长城汽车</span>-->
      <img @click="goHome" class="sidebar-logo" :src="imgBase+'/icon/login/logo.png'"/>
    </div>

    <div class="fr sd1">
      <div>
        <img class="_beantech-head-img" :src="imgBase+'/icon/login/head.png'"/>
        <span>{{name}}</span>
        <span style="margin: 0 15px;">超级管理员</span>
        <span @click="dialogVisible=true">退出</span>
      </div>
    </div>

    <el-dialog
      v-dialogDrag
      title="提示"
      :modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>是否退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {exit} from '@/api/userLogin';

    export default {
        components: {},
        data() {
            return {
                dialogVisible: false
            };
        },
        mounted() {
        },
        methods: {
            logOut() {
                exit().then(res => {
                    if (res.data.code == 301000) {
                        this.$store.dispatch('LogOut');
                    } else {
                        this.$message({
                            dialogDrag,
                            showClose: true,
                            message: res.data.message,
                            duration: 2000,
                            type: 'error'
                        });
                    }
                });
            },
            goHome() {
                this.$router.push({
                    path: '/welcome',
                    query: {
                        t: Date.now()
                    }
                });
            }
        },
        computed: mapState({
            name: state => state.user.user_info.name,
            imgBase: state => state.configInfo.imgBase
        })
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .name {
    width: 170px;
    font-size: 18px;
    padding: 5px 15px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    .sidebar-logo {
      cursor: pointer;
      display: block;
    }
  }

  .header-section {
    padding-top: 0px;
    background: #F6F6F6;
  }

  .sd1 {
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    margin: 0 20px;

    .title {
      font-size: 22px;
      font-weight: bold;
      line-height: 60px;
      color: #666;
    }

    ._beantech-head-img {
      display: inline-block;
      width: 25px;
      vertical-align: middle;
    }
  }

  .el-icon-s-unfold {
    margin-right: 3px;
  }

  .el-icon-s-unfold {
    margin-left: 3px;
  }

  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 22px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
</style>
