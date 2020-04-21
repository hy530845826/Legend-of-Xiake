import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import './assets/bootstrap/js/bootstrap.min.js'

// // 路由跳转
// Vue.prototype.$goRoute = function (index) {
//   this.$router.push(index)
// }

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  switch (index) {
    case 'NewGame':
      this.$router.push('/Game');
      break;
    case 'LoadGame':
      this.$router.push({ name: "Game", params: { load: true } });
      break;
  }
}

$(function () {
  window.console.log('引用jQuery')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
