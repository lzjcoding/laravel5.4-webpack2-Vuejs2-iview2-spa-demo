import Vue from 'vue';
import vueResource from 'vue-resource';
import iView from 'iview';
import LoginForm from './components/login-form.vue';
import 'iview/dist/styles/iview.css';

Vue.use(vueResource);
Vue.use(iView);

window.onload = function () {
	new Vue({
		el: '#app',
		components: {
			'login-form': LoginForm
		}
	});
}