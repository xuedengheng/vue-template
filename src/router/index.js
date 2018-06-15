import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('pages/hello-world/hello-world')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    }
  ]
})
