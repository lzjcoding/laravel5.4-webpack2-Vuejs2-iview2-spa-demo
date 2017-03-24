import config from '../config/front-config';

(function () {
    let commonFilter = {
        install (Vue) {
            Vue.filter('avatar', function (value) {
                if (value) {
                    return config.img_url(value);
                }

                return config.avatar_404;
            });

            Vue.filter('cdn', function (value) {
                if (value) {
                    return config.img_url(value);
                }

                return false;
            });
        }
    };

    if (typeof exports == "object") {
        module.exports = commonFilter;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return commonFilter });
    } else if (window.Vue) {
        window.VueTouch = commonFilter;
        Vue.use(commonFilter);
    }
})()
