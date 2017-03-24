import Vue from "vue";
import vueResource from 'vue-resource';
import VueRouter from "vue-router";
import App from "./views/admin/app.vue";
import Routers from "./admin-router";
import iView from "iview";
import config from './config/admin-config';
import "iview/dist/styles/iview.css";

Vue.use(vueResource);
Vue.use(VueRouter);
Vue.use(iView);
window.config = config;

// vue-reource 公共设置
Vue.http.interceptors.push(function (request, next) {
    request.headers.set('Authorization', window.localStorage.getItem(config.token_name));

    next(function (response) {

        if (response.headers.map.Authorization !== undefined) {
            window.localStorage.setItem(config.token_name, response.headers.map.Authorization[0]);
        }

        // 全局错误处理
        if (response.status === 401 && response.body.code !== 4010) {
            window.location.href = config.login_url;
        } else if (response.status === 422) {
            var errorObj = response.body.data;
            for (var field in errorObj) {
                for (var key in errorObj[field]) {
                    this.$Notice.error({title: errorObj[field][key]})
                }
            }
        } else if (response.status !== 200) {
            this.$Message.error(response.data.msg);
        }
    });
});

// 开启debug模式
Vue.config.debug = true;

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
    history: false
});

router.map(Routers);

router.beforeEach(() => {
    window.scrollTo(0, 0);
});

router.afterEach(() => {

});

router.redirect({
    '/': '/index'
})

router.start(App, '#app');