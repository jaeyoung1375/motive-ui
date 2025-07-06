const view = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },

  {
    path: '/admin/mber',
    name: 'Member',
    component: () => import('../views/member/Member.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/admin/mber/detail',
    name: 'MemberDetail',
    component: () => import('../views/member/MemberDetail.vue'),
    meta: { requiresAuth: true },
  },
]

export default view
