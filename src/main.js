import Vue from 'vue'
import App from './App.vue'
import router from './router'
/* eslint-disable */

import FirebaseVue from './firebase'

import './utils/directives'

Vue.use(FirebaseVue)

//LIBS
import './assets/libs'

//STYLE
import './assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
