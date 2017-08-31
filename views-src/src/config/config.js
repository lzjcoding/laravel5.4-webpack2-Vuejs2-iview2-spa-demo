let config = {
    productionTip: false,
    debug: true,
    avatar_404: '/images/avatar_404.png',
    cdn: 'http://blog-api.cn/',
    api_domain: 'http://blog-api.cn',
    img_url: function (path) {
        return this.cdn + path;
    }
};

export default config;