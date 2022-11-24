import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ko'

Vue.use(ElementUI, { locale })

// 全局请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 全局超时时间
axios.defaults.timeout = 10000

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
