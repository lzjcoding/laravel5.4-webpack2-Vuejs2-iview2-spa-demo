import baseConfig from './config';

let config = {
  api: {
    domain: 'http://blog-api.cn',
    post: {
      list: '/api/blog/post',
      show: function (id) {
        return '/api/blog/post/' + id
      }
    }
  },
  getApi (apiUri) {
    return this.api.domain + apiUri;
  }
};

Object.assign(config, baseConfig);

export default config;