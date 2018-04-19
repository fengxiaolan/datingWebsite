import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Show from '@/pages/Show'
import Search from '@/pages/Search'
import Story from '@/pages/Story'
import Activity from '@/pages/Activity'
import Citytalk from '@/pages/Citytalk'

//const Login =  r => require.ensure([],() => r(require('@/pages/Login.vue')),'login')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
      beforeEnter: (to, from, next) => {
        // if(from.name == null){
        //   next({
        //     path: '/'
        //   })
        // }else{
        //   next();
        // }
        next()
      },
      children: [
        {
          path: '/',
          name: 'showPage',
          component: Show
        },
        {
          path: 'search',
          name: 'searchPage',
          component: Search
        },
        {
          path: 'story',
          name: 'storyPage',
          component: Story
        },
        {
          path: 'activity',
          name: 'activityPage',
          component: Activity
        },
        {
          path: 'citytalk',
          name: 'citytalkPage',
          component: Citytalk
        }
      ]
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
