let routes = [
    {path: '/index', name: 'index', component: require('./views/front/index.vue')},
    {path: '/post/:id', name: 'post-show', component: require('./views/front/post-show.vue')},
    {path: '/', redirect: '/index'}
];

export default routes;