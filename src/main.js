import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)
// 导入全局初始化样式
import './assets/css/style.css'
// 引入api全局调用
import api from "./api"
// 引入路由
import VueRouter from 'vue-router'

// 使用路由
Vue.use(VueRouter)

// 把api加到vue的原型属性上
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app")
