<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="计划名称" prop="filed1">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
                    <el-form-item label="计划日期" prop="filed1">
                            <el-date-picker
                            v-model="formData.dateTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
                    <el-form-item label="进场时间" prop="filed1">
                        <el-time-select
                        v-model="formData.approachTime"
                        :picker-options="{
                            start: '00:30',
                            step: '00:15',
                            end: '23:30'
                        }"
                        placeholder="选择进场时间">
                        </el-time-select>
					</el-form-item>
                    <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                    <div class="radioBox" v-for="(value,index) in airPlaneData.data" >
                        <el-form-item>
                        <el-checkbox @change="changeSelect(index,value.code)"  v-model="air[index]" >出厂号码：{{value.code}} </el-checkbox>
                        <!-- <input class="radio" :value="value" @change="changeSelect(index,value.code)"  v-model="air[index]" type="checkbox" :id="index" />
                        <label :for="index">出厂号码：{{value.code}}</label> -->
                        <div v-show="value.isCheck">
                            <p>选择飞行科目：</p>
                            <div class="deviceBox">
                            <el-select v-model="formData.airSubject[index]">
                            <el-option
                                v-for="v in fxSubject"
                                :value="v"
                                :key="v"
                                :label="v"></el-option>
                            </el-select>
                                <!-- <select class="select"  v-model="formData.airSubject[index]">
                                    <option v-for="v in fxSubject" :value="v">{{v}}</option>
                                </select> -->
                            </div>
                            <p>选择气象科目：</p>
                            <div class="deviceBox">
                                <el-select v-model="formData.sceneSubject[index]">
                                <el-option
                                    v-for="v in qxSubject"
                                    :value="v"
                                    :key="v"
                                    :label="v"></el-option>
                                </el-select>
                            </div>
                            <p>设置起落次数：</p>
                            <el-input v-model="formData.upDownNumber[index]" placeholder="起落次数" class="select" type="number"></el-input>
                            <p>输入飞行任务时间：</p>
                            <el-input v-model="formData.flightTime[index]" placeholder="飞行任务时间" class="selectTime" type="number"></el-input>
                            <!-- <mt-field placeholder="飞行任务时间" type="time" v-model="formData.flightTime[index]"></mt-field> -->
                            <p>携弹类型：</p>
                            <div class="xd">
                                <div v-for="v in value.xd" >
                                    <input class="radio" :value="v" v-model="v.isCheck"  type="checkbox" :id="index" />
                                    <label :for="index">携弹名称：{{v.air_code}}_{{v.ammo_code}}</label>
                                    <input class="xdInput" v-model="v.number">
                                    <!-- <el-input v-model="v.number"></el-input> -->
                                    <!-- <el-input v-model="v.number" type="text"></el-input> -->
                                </div>
                                <!-- <select class="select" v-model="xdType[index]">
                                    <option v-if="value.code === v.air_code" v-for="v in airplaneAmmoData.data" :value="v">{{v.air_code}}_{{v.ammo_code}}</option>
                                </select> -->
                            </div>
                        </div>
                        </el-form-item>
                    </div>
                    <el-form-item label="总人数">
                        <el-input v-model="formData.totalNumber" type="number"></el-input>
                    </el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submit()">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import { addEnsure,
    getAirplane,
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
        getPersonnel,
        getPlan,
        getPlanById,
        updatePlan,
        deletePlan } from '@/api/getData'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					name: '', //计划名称
                    dateTime: '', // 计划日期
                    approachTime: '', // 进场时间
                    filed4: '', // 工种
                    filed5: '', // 联系方式
                    filed6: '', // 备注

		        },
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
                },
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
                formData: {
                    name:'',
                    dateTime: this.$util.getUrlKey('dateTime') || '',
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
                plan_id: this.$util.getUrlKey('plan_id'),
                lastIndex: '',
                nowIndex: '',
                airplaneAmmoData: {},
                xdType: [],
                personnelData: {},
                mapLists: {},
                reckon: 0,
                planData: {},
                airLength: 0
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            this.initData();
        },
        watch: {
            "plan_id": function (value) {
                console.log(value);
                this.initData();
            },
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
            async edit() {
                if (this.plan_id) {
                    this.planData = await getPlanById(this.plan_id);
                    console.log("plan", this.planData);
                    this.formData.approachTime = this.planData.approachTime;
                    this.formData.dateTime = this.planData.dateTime;
                    this.formData.name = this.planData.name;
                    this.formData.totalNumber = this.planData.totalNumber;
                    // this.air = [true,null,true];
                    console.log("!!!!",this.formData.airSubject);
                    this.planData.airData.forEach(element => {
                        this.airPlaneData.data.forEach((value,index) => {
                            if (element.airName === value.code) {
                                console.log(value.code);
                                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
                                this.air[index] = true;
                                this.formData.airSubject[index] = element.airSubject;
                                this.formData.sceneSubject[index] = element.sceneSubject;
                                this.formData.upDownNumber[index] = element.upDownNumber;
                                this.formData.flightTime[index] = element.flightTime;
                                console.log('*****************',this.airPlaneData.data[index].xd);
                                console.log('********',element.xd);
                                // this.airPlaneData.data[index].xd.forEach(ss => {
                                //     if (ss.airplaneAmmo_id === element.)
                                // });
                                return ;
                            }
                        });
                            // this.air.push(false);
                    });
                    console.log("2222222", this.airPlaneData);
                }
            },
            async initData(){
                console.log(this.formData);
                this.personnelData = await getPersonnel();
                this.personnelData.data.forEach(element => {
                    if (element.bindAir && element.duty && element.duty === '是') {
                        this.mapLists[element.bindAir] || (this.mapLists[element.bindAir] = []);
                        this.mapLists[element.bindAir].push(element);
                    }
                });
                this.airPlaneData = await getAirplane();
                this.airplaneAmmoData = await getAirplaneAmmo();
                this.airPlaneData.data.forEach(e => {
                    e.isCheck = false;

                    let xd = [];
                    this.airplaneAmmoData.data.forEach(element => {
                        if (element.air_code === e.code) {
                            let data = {
                                isCheck: false,
                                airplaneAmmo_id: element.airplaneAmmo_id,
                                air_code: element.air_code,
                                ammo_code: element.ammo_code,
                                zsm: element.zsm,
                                number: ''
                            };
                            xd.push(data);
                        }
                    });
                    e.xd = xd

                });
                console.log("airplaneairplane", this.airPlaneData);
                this.vehicleData = await getVehicle();
                this.subjectData = await getSubject();
                const config = await getConfig()
                this.fxSubject = config.data[0].subjectModel.split(",");
                this.qxSubject = config.data[0].sceneModel.split(",");

                this.edit();
            },
            changeSelect(index,code) {
                // console.log(code);
                let number = 0;
                let arrayNumber = [];
                arrayNumber = this.air;
                arrayNumber = Object.assign([],this.air);
                    // if (element === true) {
                    //     this.airLength ++;
                    //     console.log("222222", this.airLength);
                    // } else if (element === false) {
                    //     this.airLength --;
                    // }
                this.airLength = 0;
                arrayNumber.forEach((element,index) => {
                    console.log(arrayNumber);
                    console.log('循环',index);
                    if (arrayNumber[index] === true) {
                        console.log('增加' );
                        this.airLength ++;
                    }
                    if (element && this.mapLists.hasOwnProperty(this.airPlaneData.data[index].code)) {
                        number +=this.mapLists[this.airPlaneData.data[index].code].length;
                    }
                    // console.log(this.mapLists.hasOwnProperty(this.airPlaneData.data[index].code));
                    // console.log("!!!!", this.mapLists[this.airPlaneData.data[index].code].length);
                    // if (this.mapLists[this.airPlaneData.data[index]] !== undefined) {
                    //     if (element) {
                    //         number +=this.mapLists[this.airPlaneData.data[index].code].length;
                    //     }
                    // }
                });
                console.log(number);
                this.reckon = number;

                // if (!this.lastIndex) {
                //     this.lastIndex = index;
                // } else {
                //     this.formData.airSubject[index] = this.formData.airSubject[this.lastIndex];
                //     this.formData.airSubject = Object.assign([],this.formData.airSubject);
                // }
                // console.log("上一条索引",this.lastIndex);
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
                console.log(this.airPlaneData.data);
            },
            showList(index) {
                this.newData[index].isShow = !this.newData[index].isShow;
                this.newData = Object.assign([],this.newData)
            },
            submit() {
                this.newData = [];
                this.air.forEach((element,index) => {
                    console.log(element);
                    console.log(index);
                    if (element) {
                        const data = {
                            airName: this.airPlaneData.data[index].code,
                            airSubject: this.formData.airSubject[index],
                            sceneSubject: this.formData.sceneSubject[index],
                            upDownNumber: this.formData.upDownNumber[index],
                            flightTime: this.formData.flightTime[index],
                            xd: this.airPlaneData.data[index].xd.filter ( item => {return item.isCheck})
                            // isShow: false
                        }
                        this.newData.push(data);
                    }
                });
                const data = {
                    plan_id: this.plan_id,
                    name: this.formData.name,
                    dateTime: this.formData.dateTime,
                    totalNumber: this.formData.totalNumber,
                    approachTime: this.formData.approachTime,
                    airData: this.newData
                }
                if (this.plan_id) {
                    updatePlan(data);
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    });
                    this.$router.push('plan');
                } else {
                    addPlan(data);
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.$router.push('plan');
                }
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
    .xdInput {
        border: 1px solid #e8e8e8;
        margin-left: 20px;
        text-align: center;
    }
</style>
