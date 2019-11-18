import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import * as util from './util';

import 'element-ui/lib/theme-chalk/index.css'
import './style/css/font-awesome.min.css'
// import './element-variables.scss'

Vue.config.productionTip = false;
Vue.prototype.$util = util;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
