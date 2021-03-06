import Vue from 'vue'

import 'normalize.css/normalize.css' // 初始化 css
import vuetify from '@/plugins/vuetify' // path to vuetify export

import ElementUI from 'element-ui' // elementUI 组件库
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局 css
import '@/styles/style.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
import '@/icons' // 引入 icon 图标
import '@/permission' // permission control

import http from '@/api/http' // 引入 http 请求模块
Vue.prototype.http = http // 挂载到实例

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small',});
Vue.config.productionTip = false

new Vue({
  vuetify,
  el: '#app',
  router,
  store,
  render: h => h(App)
})
