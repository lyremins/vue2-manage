import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');

/**
 * 获取机务人员信息
 */

export const getPersonnel = () => fetch('/wcbz/getPersonnel');

/**
 * 获取机务人员详细信息
 */

export const getPersonnelById = person_id => fetch('/wcbz/getPersonnel/' + person_id);

/**
 * 获取机务人员数量
 */

export const getPersonnelCount = () => fetch('/wcbz/getPersonnelCount');

/**
 * 添加机务人员信息
 */

export const addPersonnel = (data) => fetch('/wcbz/addPersonnel',data,'POST');

/**
 * 更新人员信息
 */

export const updatePersonnel = data => fetch('/wcbz/updatePersonnel', data, 'POST');

/**
 * 删除人员
 */

export const deletePersonnel = person_id => fetch('/wcbz/deletePersonnel/' + person_id, {}, 'DELETE');

/**
 * 获取飞机数据详细信息
 */

export const getAirplaneById = airplane_id => fetch('/wcbz/getAirplane/' + airplane_id);

/**
 * 获取飞机数据信息
 */

export const getAirplane = () => fetch('/wcbz/getAirplane');

/**
 * 获取飞机数据数量
 */

export const getAirplaneCount = () => fetch('/wcbz/getAirplaneCount');

/**
 * 添加飞机数据信息
 */

export const addAirplane = (data) => fetch('/wcbz/addAirplane',data,'POST');

/**
 * 更新飞机信息
 */

export const updateAirplane = data => fetch('/wcbz/updateAirplane', data, 'POST');

/**
 * 删除飞机
 */

export const deleteAirplane = airplane_id => fetch('/wcbz/deleteAirplane/' + airplane_id, {}, 'DELETE');

/**
 * 获取装备数据详细信息
 */

export const getEquipById = equip_id => fetch('/wcbz/getEquip/' + equip_id);

/**
 * 获取装备数据信息
 */

export const getEquip = () => fetch('/wcbz/getEquip');

/**
 * 获取装备数据数量
 */

export const getEquipCount = () => fetch('/wcbz/getEquipCount');

/**
 * 添加装备数据信息
 */

export const addEquip = (data) => fetch('/wcbz/addEquip',data,'POST');

/**
 * 更新装备信息
 */

export const updateEquip = data => fetch('/wcbz/updateEquip', data, 'POST');

/**
 * 删除装备
 */

export const deleteEquip = equip_id => fetch('/wcbz/deleteEquip/' + equip_id, {}, 'DELETE');

/**
 * 获取保障数据详细信息
 */

export const getEnsureById = ensure_id => fetch('/wcbz/getEnsure/' + ensure_id);

/**
 * 获取保障数据信息
 */

export const getEnsure = () => fetch('/wcbz/getEnsure');

/**
 * 获取保障数据数量
 */

export const getEnsureCount = () => fetch('/wcbz/getEnsureCount');

/**
 * 添加保障数据信息
 */

export const addEnsure = (data) => fetch('/wcbz/addEnsure',data,'POST');

/**
 * 更新保障信息
 */

export const updateEnsure = data => fetch('/wcbz/updateEnsure', data, 'POST');

/**
 * 删除保障
 */

export const deleteEnsure = ensure_id => fetch('/wcbz/deleteEnsure/' + ensure_id, {}, 'DELETE');

/**
 * 获取器件数据详细信息
 */

export const getDeviceById = device_id => fetch('/wcbz/getDevice/' + device_id);

/**
 * 获取器件数据信息
 */

export const getDevice = () => fetch('/wcbz/getDevice');

/**
 * 获取器件数据数量
 */

export const getDeviceCount = () => fetch('/wcbz/getDeviceCount');

/**
 * 添加器件数据信息
 */

export const addDevice = (data) => fetch('/wcbz/addDevice',data,'POST');

/**
 * 更新器件信息
 */

export const updateDevice = data => fetch('/wcbz/updateDevice', data, 'POST');

/**
 * 删除器件
 */

export const deleteDevice = device_id => fetch('/wcbz/deleteDevice/' + device_id, {}, 'DELETE');

/**
 * 获取车辆数据详细信息
 */

export const getVehicleById = vehicle_id => fetch('/wcbz/getVehicle/' + vehicle_id);

/**
 * 获取车辆数据信息
 */

export const getVehicle = () => fetch('/wcbz/getVehicle');

/**
 * 获取车辆数据数量
 */

export const getVehicleCount = () => fetch('/wcbz/getVehicleCount');

/**
 * 添加车辆数据信息
 */

export const addVehicle = (data) => fetch('/wcbz/addVehicle',data,'POST');

/**
 * 更新车辆信息
 */

export const updateVehicle = data => fetch('/wcbz/updateVehicle', data, 'POST');

/**
 * 删除车辆
 */

export const deleteVehicle = vehicle_id => fetch('/wcbz/deleteVehicle/' + vehicle_id, {}, 'DELETE');

/**
 * 获取科目数据详细信息
 */

export const getSubjectById = vehicle_id => fetch('/wcbz/getSubject/' + vehicle_id);

/**
 * 获取科目数据信息
 */

export const getSubject = () => fetch('/wcbz/getSubject');

/**
 * 获取科目数据数量
 */

export const getSubjectCount = () => fetch('/wcbz/getSubjectCount');

/**
 * 添加科目数据信息
 */

export const addSubject = (data) => fetch('/wcbz/addSubject',data,'POST');

/**
 * 更新科目信息
 */

export const updateSubject = data => fetch('/wcbz/updateSubject', data, 'POST');

/**
 * 删除科目
 */

export const deleteSubject = vehicle_id => fetch('/wcbz/deleteSubject/' + vehicle_id, {}, 'DELETE');

/**
 * 获取飞行计划
 */

export const getPlan = () => fetch('/wcbz/getPlan');

/**
 * 获取弹药数据详细信息
 */

export const getAmmoById = ensure_id => fetch('/wcbz/getAmmo/' + ensure_id);

/**
 * 获取弹药数据信息
 */

export const getAmmo = () => fetch('/wcbz/getAmmo');

/**
 * 获取弹药数据数量
 */

export const getAmmoCount = () => fetch('/wcbz/getAmmoCount');

/**
 * 添加弹药数据信息
 */

export const addAmmo = (data) => fetch('/wcbz/addAmmo',data,'POST');

/**
 * 更新弹药信息
 */

export const updateAmmo = data => fetch('/wcbz/updateAmmo', data, 'POST');

/**
 * 删除弹药
 */

export const deleteAmmo = ensure_id => fetch('/wcbz/deleteAmmo/' + ensure_id, {}, 'DELETE');

/**
 * 添加飞行任务
 */

export const addPlan = (data) => fetch('/wcbz/addPlan',data,'POST');

/**
 * 更新飞行计划
 */

export const updatePlan= data => fetch('/wcbz/updatePlan', data, 'POST');

/**
 * 获取科目数据详细信息
 */

export const getPlanById = Plan_id => fetch('/wcbz/getPlanbyID/' + Plan_id);

/**
 * 获取配置项
 */

export const getConfig = () => fetch('/wcbz/getConfig');

/**
 * 获取配置项
 */

export const getChat = () => fetch('/wcbz/getChatDetail');

/**
 * 更新配置信息
 */

export const updateConfig = data => fetch('/wcbz/updateConfig', data, 'POST');

/**
 * 获取日志信息
 */

export const getLog = () => fetch('/wcbz/getLog');


/**
 * 获取上报流水信息
 */
export const getAirplaneState = () => fetch('/wcbz/getAirplaneState');

/**
 * 获取组织架构
 */

export const getOrganiz = () => fetch('/wcbz/getOrganiz');

export const getAirplaneAmmo = () => fetch('/wcbz/getAirplaneAmmo');

export const getAirplaneToPlan = () => fetch('/wcbz/getAirplaneToPlan');

/**
 * 删除飞行计划
 */

export const deletePlan = plan_id => fetch('/wcbz/deletePlan/' + plan_id, {}, 'DELETE');

/**
 * 添加飞机-弹药数据信息
 */

export const addAirplaneAmmo = (data) => fetch('/wcbz/addAirplaneAmmo',data,'POST');

/**
 * 获取飞机-有售器件数据信息
 */

export const getAirplaneDevice = () => fetch('/wcbz/getAirplaneDevice');

/**
 * 添加飞机-有售器件数据信息
 */

export const addAirplaneDevice = (data) => fetch('/wcbz/addAirplaneDevice',data,'POST');

/**
 * 获取飞机-车辆数据信息
 */

export const getAirplaneCar = () => fetch('/wcbz/getAirplaneCar');

/**
 * 添加飞机-车辆数据信息
 */

export const addAirplaneCar = (data) => fetch('/wcbz/addAirplaneCar',data,'POST');

/**
 * 删除飞机-有寿器件
 */

export const deleteAirplaneDevice = plan_id => fetch('/wcbz/deleteAirplaneDevice/' + plan_id, {}, 'DELETE');

/**
 * 删除飞机-弹药
 */

export const deleteAirplaneAmmo = plan_id => fetch('/wcbz/deleteAirplaneAmmo/' + plan_id, {}, 'DELETE');

/**
 * 删除飞机-车辆
 */

export const deleteAirplaneCar = plan_id => fetch('/wcbz/deleteAirplaneCar/' + plan_id, {}, 'DELETE');

export const getAirplaneSituation = () => fetch('/wcbz/getAirplaneSituation');
export const getCarSituation = () => fetch('/wcbz/getCarSituation');
export const getPersonSituation = () => fetch('/wcbz/getPersonSituation');
export const getAirplaneToDevice = () => fetch('/wcbz/getAirplaneToDevice');
export const getAmmoToDevice = () => fetch('/wcbz/getAmmoToDevice');

