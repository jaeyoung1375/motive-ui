const post = [
  {
    path: '/admin/post',
    name: 'PostList',
    component: () => import('../views/post/PostList.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/post/:postId',
    name: 'PostDetail',
    component: () => import('../views/menu/AdminMenuDetail.vue'),
  }

]

export default post;
