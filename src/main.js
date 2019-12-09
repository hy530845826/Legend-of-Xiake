import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import 'bootstrap'

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

$(function () { alert(1) })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
