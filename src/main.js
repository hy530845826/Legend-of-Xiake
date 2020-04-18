import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import './assets/bootstrap/js/bootstrap.min.js'

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  window.console.log(index)
  this.$router.push(index)
}

$(function () {
  window.console.log('引用jQuery')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
