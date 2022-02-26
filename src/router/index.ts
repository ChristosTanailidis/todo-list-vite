import { User } from 'oidc-client'
import { createRouter, createWebHistory } from 'vue-router'
import authService from '../boot/auth'
import { useUserStore } from '../store/loggedUser'
import routes from './routes'

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createWebHistory()
})

Router.beforeEach((to, _from, next) => {
  if (to.path === '/login') {
    authService.handleLoginRedirect()
      .then(() => {
        next('/home')
      })
      .catch(error => {
        console.log('Login error', error)
        next('/')
      })
  } else if (to.path === '/logout') {
    authService.handleLogoutRedirect()
      .then(() => {
        useUserStore().removeUser()
        localStorage.clear()
        next('/')
      })
      .catch(error => {
        console.log('Logout error',error)
        next('/')
      })
  }
  else {
    authService.getProfile().then(res => {
      useUserStore().addUser(res as User)

      authService.getAccessToken()
        .then(token => {
          localStorage.setItem('token', token as string)
        })
    })
    .catch(err => console.log('Error', err))
    next ()
  }
})

export default Router