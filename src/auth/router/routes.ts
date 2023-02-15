export default [
  {
    path: '/login',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        name: 'Page Login',
        path: '',
        component: () => import('../pages/Login.vue'),
      },
    ],
  },
];
