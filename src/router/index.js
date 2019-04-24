import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from '@/components/Dashboard'
// import Signup from '@/components/Signup'
import Index from '@/components/Index'
import Login from '@/components/Login'
import PostDetail from '@/components/PostDetail'
import Register from '@/components/Register'
import Post from '@/components/Post'
import Ckeditor from '@ckeditor/ckeditor5-vue'
import VueSession from 'vue-session'

Vue.use(Router)
Vue.use(Ckeditor)
Vue.use(VueSession)

export default new Router({
  routes: [
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard
    // },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: Signup
    // },
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/postdetail/:id',
      name: 'postdetail',
      component: PostDetail
    }
  ]
})
