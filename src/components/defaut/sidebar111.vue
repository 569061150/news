<template>
  <div class="sidebar">
    <div class="name">
      <!-- <i class="el-icon-s-home"></i>
      <span v-show="!isCollapse">长城汽车</span>-->
      <img class="sidebar-logo" :src="imgBase+'/icon/login/logo.png'" />
    </div>
    <el-row class="tac" v-if="!!currentNavItems[0]">
      <el-col :span="24">
        <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2F3943"
          router
          unique-opened
        >
          <el-submenu
            class="text-left"
            :index="i+''"
            v-for="(item, i) in currentNavItems[0].children"
            :key="i"
          >
            <template slot="title">
              <i :class="item.iconClass"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              class="itemSubs"
              v-for="(itemSubs, ii) in item.children"
              :index="itemSubs.path"
              :key="ii"
            >
              <img class="itemSubs-icon" :src="imgBase+'/icon/menu/'+itemSubs.name+'.png'" />
              <span>{{itemSubs.title}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import configRouter from "../../router/config.js";
import store from "../../store";
export default {
  name: "v-sidebar",
  props: ["isCollapse"],
  data() {
    return {
      openeds: ["0"]
    };
  },
  computed: mapState({
    imgBase: state => state.configInfo.imgBase,
    currentNavItems: state => state.user.aside_menu
  }),
  mounted() {

      console.log(this.currentNavItems)
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log("展开");
    },
    handleClose(key, keyPath) {
      console.log("关闭");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.name {
  background: #1C252E;
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  padding-bottom: 5px;
  padding-right:5px;
  .sidebar-logo {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
  }
}

.el-menu {
  border: 0;
}

.el-menu span {
  color: #fff !important;
}
.el-menu ul li span {
  opacity: 0.6;
}
.el-submenu {
  border-bottom: 1px solid #002343;
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
  background: #5e7486 !important;
  border-left: 3px solid #00a6d2;
  color: #fff;
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
  color: #abafb3 !important;
}
</style>
