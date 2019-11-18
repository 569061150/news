import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import configInfo from './modules/configInfo'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    configInfo,
    common
  }
})

export default store
