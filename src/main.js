import Vue from 'vue'
import VueDraggable from 'vue-draggable'
import App from './App.vue'
import router from './router'
import store from './store'
import { configureAxios } from './configureAxios'

import 'normalize.css/normalize.css'

Vue.use(VueDraggable)

configureAxios()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
