<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="任务名称" prop="filed1">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="保障日期" prop="filed2">
                            <el-date-picker
                            v-model="formData.dateTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>

                    <el-form-item>
                        <div class="radioBox" v-for="(value,index) in gzData" >
                        <input class="radio" :value="value.content" @change="changeSelect(index)"  type="checkbox" :id="index" />
                        <label  :for="index">保障类型：{{value.content}}</label>
                        <div class="expandBox" v-show="value.isCheck">
                            <div v-show="value.content === '飞行计划保障'">
                                <p class="subTitle">选择飞行计划：</p>
                                <div>
                                <div v-for="(plans,planIndex) in value.plan" @change="changePlanSelect(index,planIndex)" :value="plans.name">
                                    <input :value="value.name" class="radio" type="checkbox"  :id="planIndex"   />
                                        <label >计划名称：{{plans.name}}</label>
                                    </div>
                                </div>
                            </div>
                            <div v-show="value.content != '飞行计划保障'">
                                <p class="subTitle">选择飞机：</p>
                                <div>
                                <div v-for="(airplane,planeindex) in value.airplane" @change="changeAirplaneSelect(index,planeindex)" :value="airplane.name">
                                    <input :value="airplane.code"   class="radio" type="checkbox"   />
                                        <label>飞机编号：{{airplane.code}}</label>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="planTotalNumber" v-show="value.content === '飞行计划保障'">
                                总人数: {{totalNumber}}

                            </div> -->
                            <div v-show="value.content != '飞行计划保障'">
                                <p class="subTitle">人员类型选择：</p>
                                <div>
                                    <div class="rowBox" v-for="(p,personindex) in value.person" :value="p">
                                        <input v-model="p.isCheck" @change="changeCarSelect()"   class="radio" type="checkbox"   />
                                        <label >{{p.name}}</label>
                                        <div class="subMenu" v-show="p.isCheck">
                                            <div class="rowBox" v-for="(v,iss) in p.person" :value="v">
                                            <input v-model="v.isCheck" class="radio" type="checkbox"   />
                                                <label >{{v.user_name}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="subTitle">车辆类型选择：</p>
                            <div>
                                <div class="rowBox" v-for="(ve,vehicleindex) in value.car" :value="ve">
                                    <input v-model="ve.isCheck" @change="changeCarSelect()"   class="radio" type="checkbox"   />
                                        <label >{{ve.name}}</label>
                                        <div class="subMenu" v-show="ve.isCheck">
                                            <div class="rowBox" v-for="(v,iss) in ve.vehicle" :value="v">
                                            <input v-model="v.isCheck" class="radio" type="checkbox"   />
                                                <label >{{v.name}}</label>
                                            </div>
                                        </div>

                                </div>
                            </div>

                            <div v-show="value.content != '飞行计划保障'">
                                <p>输入进场时间：</p>
                                <input placeholder="进场时间" type="time" class="select" v-model="value.time">
                            </div>

                        </div>
                    </div>
                    </el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="bztask()">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>

    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import { getAirplane,
        getDevice,
        getAirtate,
        updateAirtate,
        getTaskstate,
        updateTaskstate,
        getDevicestate,
        updateDevicestate,
        getVehicle,
        getSubject,
        addPlan,
        getConfig,
        getAirplaneAmmo,
        getPlan,
        getAirplaneToPlan,
        getPersonnel,
        addEnsure,
        getEnsure } from '@/api/getData'
    export default {
    	data(){
    		return {
    			city: {},
                airPlaneData: {},
                vehicleData: {},
                subjectData: {},
                taskData: {},
                deviceStateData: {},
                stateModel: {
                    'wh': '完好',
                    'dx': '大修',
                    'dj': '定检',
                    'pg': '排故',
                    'sf': '试飞',
                    'dty': '待退役'
                },
                taskModel: {
                    'fxq': '飞行前',
                    'zccd': '再次出动准备',
                    'fxh': '飞行后',
                    'pg': '排故',
                    'sc': '试车'
                },
                deviceModel: {
                    'jc': '进场',
                    'dm': '待命',
                    'zy': '作业'
                },
                airname: '',
                aircount: '',
                taskname: '',
                taskcount: '',
                devicename: '',
                devicecount: '',
                showAlert: false,
                alertText: '',
                taskName: '',
                dateTime: '',
                fxSubject: [],
                qxSubject: [],
                bzType: [],
                formData: {
                    name:'',
                    dateTime: '',
                    airName: '',
                    airSubject: [],
                    sceneSubject: [],
                    upDownNumber: [],
                    flightTime: [],
                    approachTime: ''
                },
                air: [
                ],
                showContent: false,
                checked: false,
                subitem: {
                    isCheck: false
                },
                optionList: [],
                popupVisible: false,
                newData: [],
                showView: [],
                device: this.$util.getUrlKey('device'),
                type: this.$util.getUrlKey('type'),
                lastIndex: '',
                nowIndex: '',
                airplaneAmmoData: {},
                xdType: [],
                gzData:[],
                dayTime: '',
                planData: {},
                todayAir:{},
                personData: {},
                a:{},
                dataArray: {
                    type:[],
                    plan:[]
                },
                ensureData: {},
                carType: [],
                pMajorModel:[],
                personNumber: [],
                carNumber: [],
                totalNumber: 0,
		        rules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    sex: [
						{ required: true, message: '请输入性别', trigger: 'blur' },
					],
					detachment: [
						{ required: true, message: '请输入所属分队', trigger: 'blur' }
                    ],
                    type: [
						{ required: true, message: '请输入所属工种', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            var day2 = new Date();
            day2.setTime(day2.getTime());
            this.dayTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            this.initData();
    	},
    	methods: {
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							let result = await addEnsure(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
                                    name: '', //店铺名称
                                    sex: '', //性别
                                    detachment: '', // 分队
                                    type: '', // 工种
                                    phone: '', // 联系方式
                                    remark: '' // 备注
                                };
                                this.$router.push('/ensure');
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
            },
            async initData(){
                this.ensureData = await getEnsure();
                console.log("1111", this.ensureData);
                this.airPlaneData = await getAirplane();
                console.log(this.airPlaneData);
                this.vehicleData = await getVehicle();
                this.subjectData = await getSubject();
                const config = await getConfig()
                this.carType = config.data[0].carTypeModel.split(",");
                this.pMajorModel = config.data[0].pMajorModel.split(",");
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");
                this.bzType = config.data[0].ensureModel.split(",");
                this.bzType.forEach(element => {
                    this.gzData.push({
                        content: element,
                        isCheck: false
                    })
                });
                console.log("@#@#@#@#@2222", this.gzData);
                this.airplaneAmmoData = await getAirplaneAmmo();
                this.planData = await getPlan();
                this.todayAir = await getAirplaneToPlan();
                const planeData = []
                this.todayAir.data.forEach(element => {
                    element.isCheck = false;
                    planeData.push(Object.assign({},element));
                    // this.todayAir.data = Object.assign([],this.todayAir.data);
                });
                this.personData = await getPersonnel();
                this.gzData.forEach(element => {
                    // 飞机
                    let planeData = [];
                    this.airPlaneData.data.forEach(element => {
                        let n = 0;
                        this.todayAir.data.forEach(tair => {
                            if (element.code === tair.code ) {
                                n = 1 ;
                            }
                        });
                        if (n === 0) {
                            element.isCheck = false;
                            planeData.push(Object.assign({},element));
                        }
                    });
                    // 飞行计划
                    let planData = [];
                    this.planData.data.forEach(element => {
                        if (this.toTimeStamp(element.dateTime) >= this.toTimeStamp(this.dayTime)) {
                            element.isCheck = false;
                            planData.push(Object.assign({},element));
                        }
                    });
                    // 人员
                    let personData = [];
                    this.personData.data.forEach(element => {
                        element.isCheck = false;
                        personData.push(Object.assign({},element));
                    });

                    // 车辆
                    let vehicleData = [];
                    this.vehicleData.data.forEach(element => {
                        element.isCheck = false;
                        vehicleData.push(Object.assign({},element));
                    });
                    console.log("vehicleDatavehicleData", vehicleData);

                    let carT = [];
                    this.carType.forEach(e => {
                        let array = [];
                        vehicleData.forEach(element => {
                            if (element.model === e) {
                                array.push(element);
                            }
                        });
                        let data = {
                            isCheck: false,
                            name: e,
                            vehicle: array
                        };
                        carT.push(data);
                        // carT.push(Object.assign({},data));
                    });
                    console.log("catTcatTcatT",carT);

                    let personT = [];
                    this.pMajorModel.forEach(e => {
                        let array = [];
                        personData.forEach(element => {
                            if (element.major === e) {
                                array.push(element);
                            }
                        });
                        let data = {
                            isCheck: false,
                            name: e,
                            number: '',
                            person: array
                        };
                        personT.push(data);
                        // personT.push(Object.assign({},data));
                    });

                    console.log(personT);

                    element.airplane = planeData;
                    element.plan = planData;
                    element.person = personT;
                    element.car = carT;
                    element.total = 0;
                    element.time = 0;
                });
                console.log("gz!!!!gz", this.gzData);
            },
                 changeSelect(index) {
                this.nowIndex = index;
                this.gzData[index].isCheck = !this.gzData[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            changeCarSelect(i,index) {
                // console.log("checkcheckcheckcheckcheckcheck",this.gzData[i].car[index].isCheck)
                // this.nowIndex = index;
                // this.gzData[i].car[index].isCheck = !this.gzData[i].car[index].isCheck;
                // console.log("checkcheckcheck",this.gzData[i].car[index].isCheck)
                this.gzData = Object.assign([],this.gzData)
            },
            changePlanSelect(i,index) {
                this.totalNumber = 0;
                console.log(this.gzData[i].plan);
                this.gzData[i].plan[index].isCheck = !this.gzData[i].plan[index].isCheck;
                this.gzData[i].plan.forEach(element => {
                    if (element.isCheck && element.totalNumber) {
                        this.totalNumber += parseInt(element.totalNumber);
                    }
                });
                // this.gzData = Object.assign([],this.gzData)
            },
            changeAirplaneSelect(i,index) {
                console.log(i);
                this.gzData[i].airplane[index].isCheck = !this.gzData[i].airplane[index].isCheck;
                // this.gzData = Object.assign([],this.gzData)
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
            bztask() {
                console.log("!!@@@!!!!!", this.gzData);
                // this.gzData.filter( item => {
                //     console.log(item.airplane);
                // })
                const newData = [];
                this.gzData.forEach(element => {
                    let data = [];
                    console.log(element.airplane);
                    if (element.isCheck) {
                        const dd = [];
                        element.car.forEach(s => {
                            s.vehicle.forEach(ss => {
                                if (ss.isCheck) {
                                    dd.push(ss)
                                }
                            });
                        });
                        const pp = [];
                        element.person.forEach(s => {
                            s.person.forEach(ss => {
                                if (ss.isCheck) {
                                    pp.push(ss)
                                }
                            });
                        });
                        console.log("dddddddddd",pp);
                        const d = {
                            content: element.content,
                            airplane: element.airplane.filter ( item => {return item.isCheck}),
                            plan: element.plan.filter ( item => {return item.isCheck}),
                            person: pp,
                            car: dd,
                            total: element.total,
                            time: element.time
                        }
                        newData.push(d);
                    }
                });
                console.log("!!!!!!!", newData);
                newData.forEach(element => {
                    console.log("!!!!!!!%%%####",element);
                });
                const data = {
                    filed1: this.formData.name,
                    filed2: this.formData.dateTime,
                    filed3: newData
                }
                addEnsure(data);
                this.$message({
                    type: 'success',
                    message: '添加成功'
                });
                this.$router.push('ensure');
            },
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
    }
    .subMenu {
        margin-left: 20PX;
    }
    .expandBox {
        margin-left: 20PX;
    }

</style>
