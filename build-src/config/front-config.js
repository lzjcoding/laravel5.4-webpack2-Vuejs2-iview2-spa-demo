import baseConfig from './config';

let config = {
    api_domain: 'http://blog-api.cn',
    token_name: 'front_jwt_token_name',
    api: {
        post: {
            list: this.api_domain + '/api/blog/post',
            show: function (post_id) {
                return this.api_domain + '/api/blog/post/' + post_id
            }
        }
    }
};

Object.assign(config, baseConfig);

export default config;