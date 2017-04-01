import baseConfig from './config';

let config = {
    token_name: 'admin_jwt_token_name',
    login_url: '/login.html',
    cdn: '//blog-api.cn/',
    img_url: function (path) {
        return this.cdn + path;
    },
    api: {
        domain: 'http://blog-api.cn',
        user_info: '/api/admin/userInfo',
        login: '/api/admin/login',
        logout: '/api/admin/logout',
        upload_pic: '/api/admin/common/upload_pic',
        post: {
            list: '/api/admin/post',
            show: function (id) {
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
        return this.api.domain + apiUri;
    },
    setToken (token) {
        window.localStorage.setItem(this.token_name, token);
    },
    getToken () {
        return window.localStorage.getItem(this.token_name)
    },
    delToken () {
        window.localStorage.removeItem(this.token_name);
    }
};

Object.assign(baseConfig, config);

export default config;
