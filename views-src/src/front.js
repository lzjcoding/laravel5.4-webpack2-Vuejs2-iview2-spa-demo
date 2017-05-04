import Vue from "vue";
import vueResource from 'vue-resource';
import VueRouter from "vue-router";
import iview from 'iview';
import App from "./views/front/App.vue";
import routes from "../src/router/front-router";
import 'iview/dist/styles/iview.css';
import config from '../src/config/front-config';

Vue.use(vueResource);
Vue.use(VueRouter);
Vue.use(iview);
window.config = config;
Vue.config.productionTip = config.productionTip;
// 开启debug模式
Vue.config.debug = config.debug;

// vue-reource 公共设置
Vue.http.interceptors.push(function (request, next) {
    this.$Loading.start();

    next(function (response) {
        // 全局错误处理
        if (response.status !== 200) {
          this.$Loading.error();
          this.$Message.error(response.data.msg);
        } else {
          this.$Loading.finish();
        }
    });
});

// 路由配置
let router = new VueRouter({
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      return false
    }
});
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  next();
});
router.afterEach((to, from, next) => {
  iview.LoadingBar.finish();
});

new Vue({
    el: '#app',  //vue实例的根元素
    router,    //在vue实例中,引入定义的路由
    render: h => h(App)    //渲染App组件
});
