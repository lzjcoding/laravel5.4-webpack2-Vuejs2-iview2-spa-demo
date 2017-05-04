import baseConfig from './config';

let config = {
  api: {
    post: {
      list: '/api/blog/post',
      show: function (id) {
        return '/api/blog/post/' + id
      }
    }
  },
  getApi (apiUri) {
      return baseConfig.api_domain + apiUri;
  }
};

Object.assign(config, baseConfig);

export default config;