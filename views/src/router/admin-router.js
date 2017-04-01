import Hello from '@/components/Hello'

let routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/post',
    name: 'post-index',
    component (resolve) {
      require(['@/views/admin/post/index.vue'], resolve);
    }
  },
  {
    path: '/post/create',
    name: 'post-create',
    component (resolve) {
      require(['@/views/admin/post/form.vue'], resolve);
    }
  },
];

export default routes;
