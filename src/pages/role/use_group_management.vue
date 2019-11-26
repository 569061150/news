<template>
  <div class="container">

    <div class="pageBar page-type-management">
      <nav>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页banner" name="page0">
              <FirstBanner v-if="activeName == 'page0'"></FirstBanner>
            </el-tab-pane>
            <el-tab-pane label="首页推荐应用" name="page1">
              <FirstRecomApp v-if="activeName == 'page1'"></FirstRecomApp>
            </el-tab-pane>
            <el-tab-pane label="猜你喜欢应用" name="page2">
              <FirstLikeApp v-if="activeName == 'page2'"></FirstLikeApp>
            </el-tab-pane>
            <el-tab-pane label="热门搜索应用" name="page3">
              <FirstSearchApp v-if="activeName == 'page3'"></FirstSearchApp>
            </el-tab-pane>
            <el-tab-pane label="热门搜索文案" name="page4">
              <FirstSearchWordsApp v-if="activeName == 'page4'"></FirstSearchWordsApp>
            </el-tab-pane>
            <el-tab-pane label="联系我们" name="page5">
              <FirstContactUsApp v-if="activeName == 'page5'"></FirstContactUsApp>
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
            'FirstRecomApp': () => import('./comment/firstRecomApp/index'),
            'FirstLikeApp': () => import('./comment/firstLikeApp/index'),
            'FirstSearchApp': () => import('./comment/firstSearchApp/index'),
            'FirstSearchWordsApp': () => import('./comment/firstSearchWordsApp/index'),
            'FirstContactUsApp': () => import('./comment/firstContactUsApp/index'),
        },
        data() {
            return {
                activeName: sessionStorage.getItem("activeName") || 'page0'
            };
        },
        methods: {
            handleClick(tab, event) {
                this.activeName = "page" + tab.index
                sessionStorage.setItem("activeName", this.activeName)
            }
        },
        mounted() {
        },
        watch: {},
        computed: {}
    };
</script>

<style scoped lang="scss">
</style>
