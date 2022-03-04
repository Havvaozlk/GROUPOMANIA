//import Vue from 'vue'
//import VueRouter from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView'
import PostView from '../views/PostView'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/post',
    name: 'post',
    component: PostView

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
