import baseConfig from './config';

let config = {
    token_name: 'admin_jwt_token_name',
    login_url: '/admin/login.html',
    api: {
        user_info: '/api/admin/userInfo',
        logout: '/api/admin/logout',
        user: {
            list: '/api/admin/user',
            forbidden: function (user_id) {
                return '/api/admin/user/' + user_id + '/forbidden';
            },
            recover: function (user_id) {
                return '/api/admin/user/' + user_id + '/recover';
            },
            delete: function (user_id) {
                return '/api/admin/user/' + user_id;
            }
        },
        post: {
            list: '/api/admin/post',
            show: function (post_id) {
                return '/api/admin/user/' + post_id + '/show';
            },
            hide: function (post_id) {
                return '/api/admin/user/' + post_id + '/hide';
            },
            delete: function (post_id) {
                return '/api/admin/user/' + post_id;
            }
        }
    }
};

Object.assign(config, baseConfig);

export default config;
