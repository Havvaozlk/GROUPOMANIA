import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView'
import PostView from '../views/PostView'
import ProfileView from '../views/ProfileView'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path:'/post',
    name: 'post',
    component: PostView

  },
  {
    path:'/profile',
    name: 'profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
