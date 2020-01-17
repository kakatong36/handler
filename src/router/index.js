import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve),
      children: [
        {
          path: '/scrollList',
          name: 'scrollList',
          component: resolve => require(['@/components/scroll/list'], resolve),
        },
        {
          path: '/dragList',
          name: 'dragList',
          component: resolve => require(['@/components/drag/list'], resolve),
        }
      ]
    }
  ]
})
