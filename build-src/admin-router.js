const routers = {
    '/index': {
        name: 'index',
        component (resolve) {
            require(['./views/admin/index.vue'], resolve);
        }
    },
    '/post': {
        name: 'post-index',
        component (resolve) {
            require(['./views/admin/post/index.vue'], resolve);
        }
    },
    '/post/create': {
        name: 'post-create',
        component (resolve) {
            require(['./views/admin/post/form.vue'], resolve);
        }
    },
    '/post/edit/:id': {
        name: 'post-edit',
        component (resolve) {
            require(['./views/admin/post/form.vue'], resolve);
        }
    },
    '/user': {
        name: 'user-index',
        component (resolve) {
            require(['./views/admin/user/index.vue'], resolve);
        }
    },
    '/user/create': {
        name: 'user-create',
        component (resolve) {
            require(['./views/admin/user/form.vue'], resolve);
        }
    },
    '/user/edit/:id': {
        name: 'user-edit',
        component (resolve) {
            require(['./views/admin/user/form.vue'], resolve);
        }
    }
};
export default routers;