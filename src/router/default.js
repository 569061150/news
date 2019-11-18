export default {
  routes: [
    {
      path: '/login',
      name: 'login',
      title: '登陆',
      component: () => import('@/components/login/login')
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      title: '修改密码',
      component: () => import('@/components/forgetPassword/forgetPassword')
    },
    {
      path: '/404',
      name: '404',
      title: '404',
      component: () => import('@/components/defaut/404')
    },
    {
      path: '*',
      beforeEnter(to, from, next) {
        if (localStorage.getItem("user_info")) {
          next({path: from.path})
        } else {
          next({path: '/login'})
        }
      }
    }
  ]
}
