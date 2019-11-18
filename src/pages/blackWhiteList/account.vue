<template>
  <div class="container">
    <div class="info_inner">

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>


    </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {
        getTableData,
        getChannelNames,
    } from '../../api/accountBW.js';

    export default {
        name: 'login',
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                }
            };
        },
        mounted() {
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        },
        watch: {},
    };
</script>

<style scoped lang="scss">
</style>
