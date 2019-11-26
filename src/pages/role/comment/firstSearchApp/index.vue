<template>
  <!--  page = '  应用推广',-->
  <div>
    <Detail ref="detail" v-show="tab === 'detail'" @change-route="changeRoute"></Detail>
    <Info ref="info" v-if="tab === 'info'" :tableData="tableData" @change-route="changeRoute"
          @updata-server="updataServer"></Info>
  </div>
</template>

<script>
    import {getTableData} from '../../../../api/typeManagement.js';

    export default {
        components: {
            'Detail': () => import('./page/Detail'),
            'Info': () => import('../../../../components/comment/Info')
        },
        data() {
            return {
                tab: 'detail'
            };
        },
        mounted() {
        },
        methods: {
            changeRoute(obj) {
                this.tab = obj.to;
                this.tableData = obj.tableData;
            },
            updataServer(obj) {
                console.log("更新排序后")
                console.log(obj)
              //  this.$store.commit('setIsTypeManagement');
                getTableData({}).then(res => {
                    console.log(res)
                    if (res.data.code == 301000) {
                        alert("排序成功！")
                        this.tab = "detail"
                        this.$store.commit('setIsTypeManagement');
                    }
                });

            }
        }
    };
</script>

<style scoped lang="scss">
</style>


