const common = {
  state: {
    isTypeManagement: 0,
    cancelTokenArr: [] // 取消请求token数组
  },
  mutations: {
    setIsTypeManagement(state) {
      state.isTypeManagement++
    },
    pushToken(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken({cancelTokenArr}) {
      cancelTokenArr.forEach(item => {
        item('路由跳转取消请求')
      });
      cancelTokenArr = []
    }
  },

  actions: {}

}

export default common
