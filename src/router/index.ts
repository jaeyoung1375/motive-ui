import { createRouter, createWebHistory } from 'vue-router'

import view from './view.ts'

import menu from './menu.ts'
import code from './code.ts'

import { isSessionValid } from '~/utils/Login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...view, ...menu, ...code],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (!requiresAuth) {
    return next()
  }

  const valid = await isSessionValid()

  if (valid) {
    return next() // session is good, allow nav
  } else {
    console.log('not authorized')
    return next({ path: '/login', query: { redirect: to.fullPath } }) // redirect to login
  }
})

export default router
