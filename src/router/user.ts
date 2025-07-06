const user = [
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('~views/user/Login.vue'),
    meta: { requiresAuth: false },
  },


]

export default user;
