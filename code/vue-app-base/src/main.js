import Vue from '../node_modules/vue/dist/vue.js'
import App from './App.vue'

import './style.less'
import './assets/logo.png'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
