export default [
  {
    path: '/main',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/IndexPage.vue'),
        meta: { requireLogin: true },
      },
    ],
  },
];
