import router from '../../router/router'
import {generaMenu} from '@/utils/tools'

import axios from 'axios'

const user = {
  state: {
    aside_menu: JSON.parse(window.localStorage.getItem('aside_menu')),
    user_info: JSON.parse(window.localStorage.getItem('user_info'))
  },
  mutations: {
    // 登录成功后 ，赋值用户信息vuex { name,token，菜单}
    setUserInfo(state, data) {
      state.user_info = data.user_info;
      state.aside_menu = generaMenu(data.aside_menu);
      router.options.routes = state.aside_menu;
      router.addRoutes(state.aside_menu);
      console.log(state.aside_menu);
      console.log(router);
      router.push('/');
    },
    logOut(state) {
      state.user_info = {};
      state.aside_menu = [];
      localStorage.clear();
      router.push('/login');
    }
  },
  actions: {

    LogOut({commit, state}) {
      commit('logOut')
    }
  }

}

export default user
