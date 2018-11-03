import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const HelloWorld = () => import('pages/hello-world/hello-world')
const OtherPages = () => import('pages/other-pages/other-pages')
const Home = () => import('pages/home/home')

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'hello-world',
          component: HelloWorld,
          meta: {
            title: 'one'
          },
          children: [
            {
              path: 'other-pages',
              component: OtherPages,
              meta: {
                title: 'two'
              }
            }
          ]
        },
        {
          path: 'other-pages',
          component: OtherPages,
          meta: {
            title: 'tab-two'
          }
        }
      ]
    }
  ]
})

// todo
const DEFAULT_TITLE = '栗子'
const DEFAULT_ROUTE = '/hello-world'
// const OAUTH_ROUTE = '/' // 授权页面

route.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  if (to.path === '/') {
    const token = storage.get('token', '')
    if (token) {
      next({path: DEFAULT_ROUTE, replace: true})
    } else {
      // next({path: OAUTH_ROUTE, replace: true})
    }
  }
  next()
})

export default route
