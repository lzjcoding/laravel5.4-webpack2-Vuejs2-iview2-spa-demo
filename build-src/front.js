import Vue from "vue";
import vueResource from 'vue-resource';
import VueRouter from "vue-router";
import App from "./views/front/app.vue";
import routes from "./front-router";
import config from './config/front-config';
import commonFilter from './filters/common-filter';
import MuseUi from "muse-ui";
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题

Vue.use(vueResource);
Vue.use(VueRouter);
Vue.use(MuseUi);
Vue.use(commonFilter);
Vue.use(iview);

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
            this.$Message.error('未登录或登录超时，请登录在操作');
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
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return false;
    }
});

new Vue({
    el: '#app',  //vue实例的根元素
    router,    //在vue实例中,引入定义的路由
    render: h => h(App)    //渲染App组件
});