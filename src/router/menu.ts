const menu = [
  {
    path: '/admin/menu',
    name: 'AdminMenu',
    component: () => import('../views/menu/AdminMenu.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/menu/:menuId',
    name: 'AdminMenuDetail',
    component: () => import('../views/menu/AdminMenuDetail.vue'),
  }
]

export default menu
