<template>
  <el-container class="onlyel">
    <el-header height="auto">
      <Header @leftstateFn="showAside"></Header>
    </el-header>
    <el-container>
      <el-aside :class="{'is-active' : active }" style="width: 200px;">
        <sidebar :isCollapse="active" :meauAll="currentNavItems"></sidebar>
      </el-aside>
      <el-main>
        <div class="app-wrap">
          <div class="template-tabs">
            <el-tabs class="tabs" v-model="activeIndex" type="card" closable v-if="options.length"
                     @tab-click="tabClick"
                     @tab-remove="tabRemove"
            >
              <el-tab-pane size="mini" v-for="(item) in options" :key="item.id" :label="item.name"
                           :name="item.route">
              </el-tab-pane>

            </el-tabs>
            <el-button v-show="showBtn" size="mini" @click="handleTabsRemoveAll" class="extra">关闭全部菜单</el-button>
          </div>
          <div class="content-wrap">
            <router-view v-cloak></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import Sidebar from './sidebar';
    import Header from './header';

    export default {
        components: {Sidebar, Header},
        data() {
            return {
                showBtn: true,
                active: false,
                options: [],
                activeIndex: ''
            };
        },
        computed: mapState({
            isHideSearch: state => state.search.isHideSearch,
            currentNavItems: state => {
                if (state.user.aside_menu.length > 0) {
                    return state.user.aside_menu[0].children.filter(item => item.path !== '/welcome')
                } else {
                    return []
                }
            }
        }),
        methods: {
            showAside() {
                this.active = !this.active;
            },
            // tab切换时，动态的切换路由
            tabClick(tab) {
                this.$router.push({
                    path: tab.name,
                    query: {
                        // t: Date.now(),
                    }
                });
            },
            delete_tabs(route) {
                console.log(this.options)
                let index = 0
                this.options.forEach((item, index) => {
                    if (item.route === route) {
                        this.options.splice(index, 1);
                    }
                })
                localStorage.setItem('meunsTabs', JSON.stringify(this.options));
            },
            tabRemove(targetName) {
                console.log(targetName)
                //将改tab从options里移除
                this.delete_tabs(targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.options && this.options.length >= 1) {
                        this.activeIndex = this.options[this.options.length - 1].route;
                        this.$router.push({path: this.activeIndex});
                    } else {
                        this.$router.push({
                            path: '/welcome',
                            query: {
                                //t: Date.now(),
                            }
                        });
                    }
                }
            },
            handleTabsRemoveAll() {
                this.$router.push({
                    path: '/welcome'
                });
                this.showBtn = false
                this.options = [];
            },
            init() {
                this.options = [];
                this.showBtn = false
                localStorage.removeItem('meunsTabs');
            }
        },
        created() {
            if (this.$route.path == '/welcome') {
                this.init();
                this.activeIndex = '';
            } else {
                if (localStorage.getItem('meunsTabs')) {
                    console.log(JSON.parse(localStorage.getItem('meunsTabs')))
                    this.options = JSON.parse(localStorage.getItem('meunsTabs')) || [];
                    this.activeIndex = this.$route.path;
                } else {
                    this.options.push({
                        id: Date.now().toString(),
                        route: this.$route.path,
                        name: this.$route.meta.title
                    });
                    this.activeIndex = this.$route.path
                    localStorage.setItem('meunsTabs', JSON.stringify(this.options));
                }
            }
        },
        watch: {
            '$route'(to) {
                if (this.$route.path !== '/welcome') {
                    this.showBtn = true

                    // this.options = JSON.parse(localStorage.getItem('meunsTabs'));
                    // this.activeIndex = this.$route.path;
                    let flag = false
                    for (let option of this.options) {
                        if (option.name === to.meta.title) {
                            flag = true;
                            this.activeIndex = to.path
                            break;
                        }
                    }
                    //如果不存在，则新增tab页，再将新增的tab页设置为active显示在桌面前端
                    if (!flag) {
                        this.options.push({
                            id: Date.now().toString(),
                            route: to.path,
                            name: to.meta.title
                        });
                        this.activeIndex = to.path
                        localStorage.setItem('meunsTabs', JSON.stringify(this.options));
                    }
                    console.log(this.options)
                } else {
                    this.init();
                }
            }
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  [v-cloak] {
    display: none !important;
  }

  .app-wrap{
    height: 100%;
    overflow: hidden;
    .content-wrap{
      height: calc(100% - 40px);
      overflow-y:auto;
      position: relative;
    }
  }

  .loading_style {
    position: fixed !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }

  .el-aside {
    transition: width 0.5s;
    background-color: #EDEDED;
    -webkit-box-shadow: 1px 0px 2px 1px #d4d7d9;
    z-index: 2;
  }

  .el-aside.is-active {
    width: 64px !important;
    transition: width 0.5s;
  }

  .el-aside.is-active span {
    display: none;
  }

  .template-tabs {
    overflow: hidden;
    padding: 5px 7px 0;
  }

  .template-tabs .tabs {
    width: calc(100% - 120px);
    float: left;
  }

  .template-tabs {
    .extra {
      float: right;
      width: 110px;
    }
  }

  .el-button:focus, .el-button:hover {
    color: #d5716d;
    background-color: white;
    border-color: #d5716d;
  }

 .el-header {
    padding: 0;
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 50px;
    box-shadow: 0px 1px 0px 0px #d4d7d9;
    position: relative;
    z-index: 2;
  }

  .el-aside {
    background-color: "#fff";
    color: #fff;
    text-align: center;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    padding: 10px;
    height: 100%;
    overflow: hidden;
  }

  .onlyel {
    background-color: #F4F4F9;
  }

  .onlyel.el-container {
    position: absolute;
  }

  .el-container {
    margin-bottom: 0;
    height: 100%;
    width: 100%;
  }

  .el-message-box {
    vertical-align: top;
    margin-top: 10%;
  }

  .onlyel .el-tabs--border-card > .el-tabs__content {
    /*display: none;*/
  }

  .onlyel .el-tabs--border-card > .el-tabs__header,
  .onlyel .el-tabs--border-card {
    box-shadow: none;
    background: none;
  }

  .onlyel .el-tabs--border-card > .el-tabs__header {
    border: 0;
  }

  /*.onlyel .el-tabs--border-card {*/
  /*  border: 0;*/
  /*}*/

  /*.onlyel .el-tabs--border-card > .el-tabs__header {*/
  /*  background: none;*/
  /*  border-bottom: 0;*/
  /*}*/

  /*.onlyel .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {*/
  /*  border: 0 !important;*/
  /*  outline: none;*/
  /*}*/

  /*.onlyel .el-tabs__item {*/
  /*  height: auto;*/
  /*  line-height: 32px;*/
  /*}*/

  /*.onlyel .el-tabs__nav-next,*/
  /*.onlyel .el-tabs__nav-prev {*/
  /*  background: #fff;*/
  /*  line-height: 32px;*/
  /*}*/

  /*.onlyel .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {*/
  /*  color: #CA4E49;*/
  /*}*/

  /*.onlyel .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {*/
  /*  color: #CA4E49;*/
  /*  border: 0;*/
  /*}*/
</style>
