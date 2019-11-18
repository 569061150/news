<template>
  <div class="container">
    <div class="info_inner">
      account.vue
    </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {getChannelNames} from '../../api/channel.js';
    import {getTableData} from '../../api/typeManagement.js';

    export default {
        name: 'login',
        components: {},
        data() {
            return {};
        },
        mounted() {
        },
        methods: {},
        watch: {},
        computed: {}
    };
</script>

<style scoped lang="scss">
</style>
