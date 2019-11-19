<template>
    <div>
        <head-top></head-top>
        <div class="selectBox">
            <span class="seText">选择飞机类型：</span>
                <el-select v-model="selectAirplaneType">
                    <el-option
                    v-for="(v,index) in airType"
                    :value="v"
                    :key="index"
                    :label="v"></el-option>
                </el-select>
            <div class="selectType" v-show="selectAirplaneType">
                <span class="seText">选择飞机编号：</span>
                <el-select v-model="selectAirplane">
                    <el-option
                    v-for="(v,index) in airPlaneData.data"
                    :value="v.code"
                    :key="index"
                    :label="v.code"></el-option>
                </el-select>
            </div>
            <el-button @click="search()">查询</el-button>
            <el-button @click="searchAll()">查询全部</el-button>
            <el-button type="primary"  @click="add()">添加关联</el-button>
        </div>
            <el-table
            :data="airPlaneDeviceData"
            style="width: 100%">
            <el-table-column
                label="飞机_保障车辆"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.air_code+"_"+scope.row.car_code}}
                </template>
            </el-table-column>
            <el-table-column
                prop="airplane_type"
                label="飞机类型"
                width="200">
            </el-table-column>
            <el-table-column
                prop="car_code"
                label="车辆类型"
                width="200">
            </el-table-column>
            <el-table-column
                prop="lc"
                label="行驶历程">
            </el-table-column>
            <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        <el-dialog title="添加关联信息" :visible.sync="dialogFormVisible">
        <el-row>
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                    <div class="radioBox" v-for="(value,index) in airPlaneData.data">
                    <el-checkbox @change="changeSelect(index,value.isCheck)" v-model="air[index]" >飞机编号：{{value.code}} </el-checkbox>
                        <div class="showDevice" v-show="value.isCheck">
                            <div v-for="(v,i) in value.device">
                                <input @change="changeDevice(i,v.isCheck)" class="radio" type="checkbox" :id="i"  />
                                <label :for="i">车辆编号：{{v.model}}</label>
                            </div>
                        </div>
                    </div>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submit()">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {
        addAirplaneDevice,
        getAirplane,
        getDevice,
        getAirplaneCar,
        getConfig,
        getVehicle,
        addAirplaneCar,
        deleteAirplaneCar
    } from '@/api/getData';

    export default {
        data() {
            return {
                formData: {
                    model: '',
                    code: '',
                    type: '',
                    army_id: '',
                    airHour: '',
                    yairHour: '',
                    airUpOrDown: '',
                    yairUpOrDown: '',
                    image_path: '',
                    factory: '',
                    stageUpOrDown: '',
                    engine_1: '',
                    engine_2: '',
                    state: '',
                    task: '',
                    stageUpOrDownTime: '',
                    repairNumber:'',
                    repairFactory:'',
                    unit: ''
                },
                showAlert: false,
                alertText: '',
                stateModel: [],
                taskModel: [],
                organizData: {},
                showOrganiz: false,
                airPlaneData: {},
                deviceData: {},
                checked: false,
                subitem: {
                    isCheck: false
                },
                air: [],
                newData: [],
                device: [],
                airplaneIndex: '',
                selectAirplaneType: '',
                airType:[],
                airPlaneDeviceData:[],
                selectAirplane: '',
                dialogFormVisible: false,
                oldPlaneData: {},
                ssData: []
            }
        },

        mounted() {
            this.init();
        },

        components: {
            headTop
        },

        computed: {

        },
        watch: {
            selectAirplane(v) {
                if (v) {
                    console.log(this.ssData);
                    this.airPlaneDeviceData = this.ssData.filter(
                        item => item.air_code === this.selectAirplane
                    )
                }
            }
        },

        methods: {
            closeTip() {
                this.showAlert = false;
            },
            async init() {
                this.airPlaneDeviceData = await getAirplaneCar();
                this.airPlaneData = await getAirplane();
                this.deviceData = await getVehicle();

                this.airPlaneDeviceData = this.airPlaneDeviceData.data;
                this.oldPlaneData = this.airPlaneDeviceData;

                const config = await getConfig()
                this.airType = config.data[0].airTypeModel.split(",");

                this.airPlaneData.data.forEach(elements => {
                    elements.isCheck = false;
                    let data = [];
                    this.deviceData.data.forEach(element => {
                        element.isCheck = false;
                        data.push(Object.assign({},element));
                    });
                    elements.device = Object.assign([],data);
                });
                console.log(this.airPlaneData);
            },
            changeSelect(index,type) {
                console.log(this.airPlaneData);
                this.airplaneIndex = index;
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
            },
            changeDevice(index,type) {
                console.log(this.airPlaneData.data[this.airplaneIndex].device[0].isCheck);
                console.log(this.airPlaneData.data[this.airplaneIndex].device[1].isCheck);
                this.airPlaneData.data[this.airplaneIndex].device[index].isCheck = !this.airPlaneData.data[this.airplaneIndex].device[index].isCheck;
                // this.airPlaneDeviceData.data = Object.assign([],this.airPlaneDeviceData.data);
                console.log(this.airPlaneData.data);
            },
            search() {
                console.log(this.oldPlaneData);
                this.airPlaneDeviceData = this.oldPlaneData.filter(
                    item => item.model === this.selectAirplaneType
                )
                this.ssData = this.airPlaneDeviceData;
            },
            searchAll() {
                this.airPlaneDeviceData = this.oldPlaneData;
            },
            add() {
                this.dialogFormVisible = true;
            },
            submit() {
                this.newData = [];
                let data = [];
                this.airPlaneData.data.forEach((elements,index) => {
                    if (elements.isCheck) {
                        elements.device.forEach(element => {
                            if (element.isCheck) {
                                let l = {
                                    air_code: elements.code,
                                    car_code:  element.model,
                                    airplane_type:  elements.model,
                                    car_type:  element.model,
                                    lc:  element.mileage,
                                    model: elements.model
                                }
                                data.push(l)
                            }
                        });
                        this.newData.push(data);
                    }
                });
                console.log(this.newData);
                this.newData.forEach(elements => {
                    elements.forEach(element => {
                        addAirplaneCar(element);
                    });
                });
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    });
                    this.dialogFormVisible = false;
                    this.init();
            },
            async handleDelete(index,row) {
                try{
                    const res = await deleteAirplaneCar(row.airplaneCar_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.airPlaneDeviceData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除失败')
                }
            },
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';
.content {
        margin-left: 20px;
    }
    .selectBox {
        text-align: center;
        margin: 20px;
    }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table .cell {
        text-align-last: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
    .showDevice {
        margin-left: 20px;
    }
</style>