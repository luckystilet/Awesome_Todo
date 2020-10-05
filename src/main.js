import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'normalize.css'
import './scss/index.scss'
const app = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
store.$app = app

