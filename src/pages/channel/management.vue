<template>
  <!--  page = ' 应用管理',-->
  <div class="pageBar page-type-management">
    <Detail ref="detail" v-show="tab === 'detail'" @change-route="changeRoute"></Detail>
    <Info ref="info" v-if="tab === 'info'" :row="row" @change-route="changeRoute"></Info>
  </div>
</template>

<script>
  export default {
    components: {
      'Detail': () => import('./page/Detail'),
      'Info': () => import('./page/Info')
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
        this.row = obj.row;
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
