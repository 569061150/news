<template>
  <div class="container">
    <div class="info_inner">
      <nav>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页banner" name="page1">
                <FirstBanner></FirstBanner>
            </el-tab-pane>
            <el-tab-pane label="首页推荐应用" name="page2">
              首页推荐应用
            </el-tab-pane>
            <el-tab-pane label="猜你喜欢应用" name="page3">
              猜你喜欢应用
            </el-tab-pane>
            <el-tab-pane label="热门搜索应用" name="page4">
              热门搜索应用
            </el-tab-pane>
            <el-tab-pane label="热门搜索文案" name="page5">
              热门搜索文案
            </el-tab-pane>
            <el-tab-pane label="联系我们" name="page6">
              联系我们
            </el-tab-pane>
          </el-tabs>
        </template>
      </nav>
    </div>
  </div>
</template>

<script>


    export default {
        name: 'login',
        components: {
            'FirstBanner': () => import('./comment/firstbanner/index'),
        },
        data() {
            return {
                activeName: 'page1'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab)
                console.log(this.activeName)
            }
        },
        watch: {},
        computed: {}
    };
</script>

<style scoped lang="scss">
  .info_inner {
    nav {
      margin: 20px 10px;
    }
  }

</style>
