import Vue from 'vue';
import vueResource from 'vue-resource';
import iView from 'iview';
import LoginForm from './components/login-form.vue';
import 'iview/dist/styles/iview.css';
import config from '../src/config/admin-config';

Vue.use(vueResource);
Vue.use(iView);
window.config = config;
Vue.config.productionTip = config.productionTip;
// 开启debug模式
Vue.config.debug = config.debug;

window.onload = function () {
	new Vue({
		el: '#app',
		components: {
			'login-form': LoginForm
		}
	});
}