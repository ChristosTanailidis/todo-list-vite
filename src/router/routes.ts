const routes = [

  {
    path: '/',
    component: () => import('../views/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'completed',
        component: () => import('../views/CompletedLists.vue')
      },
      {
        path: 'yourLists',
        component: () => import('../views/YourLists.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue')
  }

]

export default routes
