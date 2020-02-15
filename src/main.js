import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import 'bootstrap'

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

$(function () {
  alert('引用jQuery')
  const configs = ['layer', 'laydate', 'laypage', 'laytpl', 'layedit',
    'form', 'upload', 'tree', 'table', 'element', 'util',
    'flow', 'carousel', 'rate', 'transfer']
  layui.config({ base: 'static/layui_exts/transfer' }).use(configs, () =>
    new Vue({ el: '#app', router, components: { App }, template: '<App/>' })
  )
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
