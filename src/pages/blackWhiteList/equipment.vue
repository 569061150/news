<template>
  <!--  page = '  应用推广',-->
  <div class="pageBar page-type-management">
    <Detail ref="detail" v-show="tab === 'detail'" @change-route="changeRoute"></Detail>
    <Info ref="info" v-if="tab === 'info'" :tableData="tableData" @change-route="changeRoute"></Info>
  </div>
</template>

<script>
  export default {
    components: {
      'Detail': () => import('./page/Detail'),
      'Info': () => import('../../components/comment/Info')
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
      }
    }
  };
</script>

<style scoped lang="scss">
</style>


