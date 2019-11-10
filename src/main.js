import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'

import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

import 'element-ui/lib/theme-chalk/index.css'
import './style/css/font-awesome.min.css'

Vue.config.productionTip = false;
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
