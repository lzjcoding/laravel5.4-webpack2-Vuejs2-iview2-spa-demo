import baseConfig from './config';

let config = {
    login_url: '/login.html',
    api: {
        user_info: '/api/admin/userInfo',
        login: '/api/admin/login',
        logout: '/api/admin/logout',
        upload_pic: '/api/admin/common/upload_pic',
        post: {
            list: '/api/admin/post',
            create: '/api/admin/post',
            update: function (id) {
                return '/api/admin/post/' + id;
            },
            show: function (id) {
                return '/api/admin/post/' + id;
            },
            display: function (id) {
                return '/api/admin/post/' + id + '/show';
            },
            hide: function (id) {
                return '/api/admin/post/' + id + '/hide';
            },
            delete: function (id) {
                return '/api/admin/post/' + id;
            }
        }
    },
    getApi (apiUri) {
        return baseConfig.api_domain + apiUri;
    }
};

config = Object.assign(baseConfig, config);

export default config;
