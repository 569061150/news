import Vue from 'vue'
import App from './App.vue'
import '../static/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '../static/common.scss'
import elementUI from 'element-ui'
import router from './router/router'
import store from './store'
import SliderVerificationCode from 'slider-verification-code';
import 'slider-verification-code/lib/slider-verification-code.css';
import animate from 'animate.css';

// 列表排序
// import VueDND from 'awe-dnd'
// Vue.use(VueDND)

// 弹窗拖拽
import dialog from './utils/dialog'

Vue.use(elementUI);
Vue.use(SliderVerificationCode);

// 登录状态判断
if (localStorage.getItem('aside_menu')) {
  const data = {
    user_info: JSON.parse(window.localStorage.getItem('user_info')),
    aside_menu: JSON.parse(window.localStorage.getItem('aside_menu'))
  };
  store.commit('setUserInfo', data)
}

router.beforeEach((to, from, next) => {
  store.commit('clearToken'); // 取消请求

  // let _path = to.path == '/login' || to.path == '/forgetPassword' || to.path == '/welcome'
  let _path = to.path == '/login' || to.path == '/'
  if (localStorage.getItem('user_info') && localStorage.getItem('aside_menu')) {
    if (_path) {
      next({path: '/welcome'})
    } else {
      next()
    }
  } else {
    if (to.path !== '/') {
      if (_path) {
        next();
      } else {
        console.log(to.path)
        next({path: '/login'})
      }
    } else {
      next({path: '/login'})
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
