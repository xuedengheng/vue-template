// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.components.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'utils/env-clear'
import 'common/stylus/index.styl'

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
