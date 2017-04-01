let config = {
    productionTip: false,
    debug: true,
    avatar_404: '/images/avatar_404.png',
    cdn: '//localhost:8080/',
    img_url: function (path) {
        return this.cdn + path;
    }
};

export default config;