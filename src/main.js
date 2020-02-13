import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import 'bootstrap'

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}
var leftls = 0;
$(function () {
  alert('引用jQuery'),
    $('#role').click(function () {
      leftls += 100;
      (this).style.left = leftls + 'px';
    })
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
