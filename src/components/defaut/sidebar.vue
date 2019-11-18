<template>
  <div class="sidebar">
    <el-row class="tac" v-if="!!meauAll">
      <el-col :span="24">
        <el-menu
          ref="refName"
          :collapse="isCollapse"
          :default-active="$route.path"
          :default-openeds="openeds"
          class="el-menu-vertical-demo text-left"
          @open="handleOpen"
          @close="handleClose"
          background-color="#EDEDED"
          router
          unique-opened
          @select="handleSelect"

        >
          <div :index="i+''" v-for="(item, i) in meauAll" :key="i">
            <el-menu-item v-if="item.children.length == 1" :index="item.children[0].path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.children[0].title}}</span>
            </el-menu-item>


            <el-submenu v-else :index="item.path">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item
                class="itemSubs"
                v-for="(itemSubs, ii) in item.children"
                :index="itemSubs.path"
                :key="ii"
              >
<!--                <img class="itemSubs-icon" :src="imgBase+'/icon/menu/'+itemSubs.name+'.png'"/>-->
                <i class="el-icon-location"></i>
                <span>{{itemSubs.title}}</span>
              </el-menu-item>
            </el-submenu>
            <!--            <submenu v-else>-->
            <!--              <template slot="title">-->
            <!--                <i :class="item.iconClass"></i>-->
            <!--                <span>{{item.title}}</span>-->
            <!--              </template>-->
            <!--              <el-menu-item-->
            <!--                class="itemSubs"-->
            <!--                v-for="(itemSubs, ii) in item.children"-->
            <!--                :index="itemSubs.path"-->
            <!--                :key="ii"-->
            <!--              >-->
            <!--                <img class="itemSubs-icon" :src="imgBase+'/icon/menu/'+itemSubs.name+'.png'"/>-->
            <!--                <span>{{itemSubs.title}}</span>-->
            <!--              </el-menu-item>-->
            <!--            </submenu>-->
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import configRouter from '../../router/config.js';
    import store from '../../store';

    export default {
        name: 'v-sidebar',
        props: ['isCollapse', 'meauAll'],
        data() {
            return {
                openeds: []
            };
        },
        computed: mapState({
            imgBase: state => state.configInfo.imgBase
        }),
        mounted() {
            console.log(this.meauAll)
        },
        created() {
        },
        methods: {
            getPath() {
                if (this.$route.path == '/welcome') {
                    this.openeds = ['']
                }
            },
            handleOpen(key, keyPath) {
                console.log('展开');
            },
            handleClose(key, keyPath) {
                console.log('关闭');
            },
            handleSelect(key, keyPath) {
                this.$router.push({
                    path: key,
                    query: {
                        t: Date.now(),
                    },
                });
            }
        },
        watch: {
            '$route': 'getPath'
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-menu {
    border: 0;
  }

  .el-menu ul li span {
    opacity: 0.6;
  }

  .el-submenu {
    border-bottom: 1px solid none;
  }

  .el-menu ul li.el-menu-item {
    img {
      opacity: 0.6;
      width: 15px;
      display: inline-block;
      margin-right: 10px;
    }
  }

  .el-menu ul li.el-menu-item.is-active {
    background: #ccc !important;
    border-left: 0;
    color: #474747;
    padding-left: 37px !important;
    img {
      opacity: 1;
    }
  }

  .el-menu ul li.el-menu-item.is-active span {
    opacity: 1;
  }

  .el-submenu:last-child {
    border-bottom: 0;
  }

  .text-left {
    text-align: left;
  }

  .itemSubs:hover {
    background: none;
  }
</style>
