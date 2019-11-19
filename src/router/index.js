import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const addPersonnel = r => require.ensure([], () => r(require('@/page/addPersonnel')), 'addPersonnel');
const personnel = r => require.ensure([], () => r(require('@/page/personnel')), 'personnel');
const addAirplane = r => require.ensure([], () => r(require('@/page/addAirplane')), 'addAirplane');
const airplane = r => require.ensure([], () => r(require('@/page/airplane')), 'airplane');
const addEquip = r => require.ensure([], () => r(require('@/page/addEquip')), 'addEquip');
const equip = r => require.ensure([], () => r(require('@/page/equip')), 'equip');
const addEnsure = r => require.ensure([], () => r(require('@/page/addEnsure')), 'addEnsure');
const ensure = r => require.ensure([], () => r(require('@/page/ensure')), 'ensure');
const addDevice = r => require.ensure([], () => r(require('@/page/addDevice')), 'addDevice');
const device = r => require.ensure([], () => r(require('@/page/device')), 'device');
const vehicle = r => require.ensure([], () => r(require('@/page/vehicle')), 'vehicle');
const addVehicle = r => require.ensure([], () => r(require('@/page/addVehicle')), 'addVehicle');
const subject = r => require.ensure([], () => r(require('@/page/subject')), 'subject');
const addSubject = r => require.ensure([], () => r(require('@/page/addSubject')), 'addSubject');
const situation = r => require.ensure([], () => r(require('@/page/situation')), 'situation');
const addAmmo = r => require.ensure([], () => r(require('@/page/addAmmo')), 'addAmmo');
const ammo = r => require.ensure([], () => r(require('@/page/ammo')), 'ammo');
const addPlan= r => require.ensure([], () => r(require('@/page/addPlan')), 'addPlan');
const plan = r => require.ensure([], () => r(require('@/page/plan')), 'plan');
const config = r => require.ensure([], () => r(require('@/page/config')), 'config');
const chat = r => require.ensure([], () => r(require('@/page/chat')), 'chat');
const airplaneDevice = r => require.ensure([], () => r(require('@/page/airplaneDevice')), 'airplaneDevice');
const airplaneCar = r => require.ensure([], () => r(require('@/page/airplaneCar')), 'airplaneCar');
const airplaneAmmo = r => require.ensure([], () => r(require('@/page/airplaneAmmo')), 'airplaneAmmo');
const showAirplaneDevice = r => require.ensure([], () => r(require('@/page/showAirplaneDevice')), 'showAirplaneDevice');
const showAirplaneAmmo = r => require.ensure([], () => r(require('@/page/showAirplaneAmmo')), 'showAirplaneAmmo');
const showAirplaneCar = r => require.ensure([], () => r(require('@/page/showAirplaneCar')), 'showAirplaneCar');
const airplaneSituation = r => require.ensure([], () => r(require('@/page/airplaneSituation')), 'airplaneSituation');
const carSituation = r => require.ensure([], () => r(require('@/page/carSituation')), 'carSituation');
const peopleSituation = r => require.ensure([], () => r(require('@/page/peopleSituation')), 'peopleSituation');
const deviceSituation = r => require.ensure([], () => r(require('@/page/deviceSituation')), 'deviceSituation');
const ammoSituation = r => require.ensure([], () => r(require('@/page/ammoSituation')), 'ammoSituation');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/userList',
			component: userList,
			meta: ['基础数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['基础数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['基础数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['基础数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['基础数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['数据分析', '历史回放'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},{
			path: '/addPersonnel',
			component: addPersonnel,
			meta: ['添加数据', '添加机务人员'],
		},{
			path: '/personnel',
			component: personnel,
			meta: ['基础基础数据管理', '机务人员管理'],
		},{
			path: '/addAirplane',
			component: addAirplane,
			meta: ['添加数据', '添加飞机数据'],
		},{
			path: '/airplane',
			component: airplane,
			meta: ['基础基础数据管理', '飞机管理'],
		},{
			path: '/equip',
			component: equip,
			meta: ['基础基础数据管理', '装备基础数据管理'],
		},{
			path: '/addEquip',
			component: addEquip,
			meta: ['添加数据', '添加装备数据'],
		},{
			path: '/ensure',
			component: ensure,
			meta: ['基础基础数据管理', '保障基础数据管理'],
		},{
			path: '/addEnsure',
			component: addEnsure,
			meta: ['添加数据', '添加保障数据'],
		},{
			path: '/device',
			component: device,
			meta: ['基础基础数据管理', '有寿器件管理'],
		},{
			path: '/addDevice',
			component: addDevice,
			meta: ['添加数据', '添加器件数据'],
		},{
			path: '/vehicle',
			component: vehicle,
			meta: ['基础基础数据管理', '车辆管理'],
		},{
			path: '/addVehicle',
			component: addVehicle,
			meta: ['添加数据', '添加车辆数据'],
		},{
			path: '/subject',
			component: subject,
			meta: ['基础基础数据管理', '条目基础数据管理'],
		},{
			path: '/addSubject',
			component: addSubject,
			meta: ['添加数据', '添加条目数据'],
		},{
			path: '/situation',
			component: situation,
			meta: ['基础数据管理', '态势数据'],
		},{
			path: '/analys',
			component: home,
			meta: ['统计分析'],
		},{
			path: '/ammo',
			component: ammo,
			meta: ['基础基础数据管理', '弹药管理'],
		},{
			path: '/addAmmo',
			component: addAmmo,
			meta: ['基础数据管理', '添加弹药数据'],
		},{
			path: '/plan',
			component: plan,
			meta: ['基础基础数据管理', '飞行计划'],
		},{
			path: '/addPlan',
			component: addPlan,
			meta: ['基础数据管理', '添加飞行计划'],
		},{
			path: '/config',
			component: config,
			meta: ['基础数据管理', '状态管理'],
		},{
			path: '/chat',
			component: chat,
			meta: ['基础数据管理', '聊天管理'],
		},{
			path: '/airplaneDevice',
			component: airplaneDevice,
			meta: ['基础数据管理', '飞机-有寿器件关联'],
		},{
			path: '/airplaneAmmo',
			component: airplaneAmmo,
			meta: ['基础数据管理', '飞机-弹药关联'],
		},{
			path: '/airplaneCar',
			component: airplaneCar,
			meta: ['基础数据管理', '飞机-保障车辆关联'],
		},{
			path: '/showAirplaneDevice',
			component: showAirplaneDevice,
			meta: ['基础数据管理', '飞机-有寿器件关联查看'],
		},{
			path: '/showAirplaneAmmo',
			component: showAirplaneAmmo,
			meta: ['基础数据管理', '飞机-弹药关联查看'],
		},{
			path: '/showAirplaneCar',
			component: showAirplaneCar,
			meta: ['基础数据管理', '飞机-保障车辆关联'],
		},{
			path: '/airplaneSituation',
			component: airplaneSituation,
			meta: ['综合态势', '飞机态势'],
		},{
			path: '/carSituation',
			component: carSituation,
			meta: ['综合态势', '车辆态势'],
		},{
			path: '/peopleSituation',
			component: peopleSituation,
			meta: ['综合态势', '人员态势'],
		},{
			path: '/deviceSituation',
			component: deviceSituation,
			meta: ['综合态势', '有寿器件态势'],
		},{
			path: '/ammoSituation',
			component: ammoSituation,
			meta: ['综合态势', '弹药态势'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
