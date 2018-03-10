import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import library_mp from '@/components/library/library master page.vue'
import login from '@/components/library/login.vue'
import genres from '@/components/library/genres.vue'



import reader_mp from '@/components/reader/reader master page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: library_mp,
      children:[
        {
          path: 'login',
          name:'login',
          component: login
        },
        {
          path: 'genres',
          name:'genres',
          component: genres
        },
      ]
    },
    {
      path: '/reader',
      component: reader_mp
    }
  ]
})
