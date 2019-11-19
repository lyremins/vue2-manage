<template>
    <div>
        <head-top></head-top>
        <div class="selectBox">
            <span class="seText">选择飞机：</span>
                <el-select v-model="selectAirplane">
                    <el-option
                    v-for="(v,index) in airPlaneData.data"
                    :value="v.code"
                    :key="index"
                    :label="v.code"></el-option>
                </el-select>
            <el-button @click="search()">查询</el-button>
            <el-button @click="searchAll()">查询全部</el-button>
            <el-button type="primary"  @click="add()">添加关联</el-button>
        </div>
            <el-table
            :data="ammoData"
            style="width: 100%">
            <el-table-column
                label="飞机_弹药编号"
                width="380">
                <template slot-scope="scope">
                    {{scope.row.air_code+"_"+scope.row.ammo_code}}
                </template>
            </el-table-column>
            <el-table-column
                prop="zsm"
                label="总寿命"
                width="380">
            </el-table-column>
            <el-table-column
                prop="sm"
                label="余寿">
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
                        <el-form-item>
                        <el-checkbox @change="changeSelect(index,value.isCheck)" v-model="air[index]" >飞机编号：{{value.code}} </el-checkbox>
                        <div class="showDevice" v-show="value.isCheck">
                            <div class="content" v-for="(v,i) in value.device">
                                <input :value="v" @change="changeDevice(i,v.isCheck)" class="radio" type="checkbox" :id="i"  />
                                <label :for="i">弹药编号：{{v.filed1}}</label>
                            </div>
                        </div>
                        </el-form-item>
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
        addAirplaneAmmo,
        getAirplane,
        getAirplaneAmmo,
        getAmmo,
        deleteAirplaneAmmo } from '@/api/getData'
    export default {
    	data(){
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
                manage: false,
                ammoData: {},
                oldPlaneData: {},
                dialogFormVisible: false
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            this.init();
    	},
    	methods: {
            submit() {
                this.newData = [];
                let data = [];
                this.airPlaneData.data.forEach((elements,index) => {
                    if (elements.isCheck) {
                        elements.device.forEach(element => {
                            if (element.isCheck) {
                                let l = {
                                    air_code: elements.code,
                                    ammo_code:  element.filed1,
                                    zsm:  element.filed6,
                                    ys:  element.filed6,
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
                        addAirplaneAmmo(element);
                    });
                });
                this.$message({
                    type: 'success',
                    message: '添加成功'
                });
                this.dialogFormVisible = false;
                this.init();
            },
            async init() {
                this.airPlaneData = await getAirplane();
                this.deviceData = await getAmmo();
                this.airPlaneData.data.forEach(elements => {
                    elements.isCheck = false;
                    let data = [];
                    this.deviceData.data.forEach(element => {
                        element.isCheck = false;
                        data.push(Object.assign({},element));
                    });
                    elements.device = data;
                });
                this.ammoData = await getAirplaneAmmo();
                this.ammoData = this.ammoData.data;
                this.oldPlaneData = this.ammoData;
                console.log(this.airPlaneData.data);
            },
            changeSelect(index,type) {
                console.log(index)
                this.airplaneIndex = index;
                this.airPlaneData.data[index].isCheck = !this.airPlaneData.data[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data)
            },
            changeDevice(index,type) {
                console.log("5555", this.airPlaneData.data);
                this.airPlaneData.data[this.airplaneIndex].device[index].isCheck = !this.airPlaneData.data[this.airplaneIndex].device[index].isCheck;
                this.airPlaneData.data = Object.assign([],this.airPlaneData.data);
                // console.log("6666", this.airPlaneData.data);
            },
            search() {
                console.log(this.oldPlaneData);
                this.ammoData = this.oldPlaneData.filter(
                    item => item.air_code === this.selectAirplane
                )
                console.log(this.ammoData);

            },
            searchAll() {
                this.ammoData = this.oldPlaneData;
            },
            add() {
                this.dialogFormVisible = true;
            },
            async handleDelete(index,row) {
                try{
                    const res = await deleteAirplaneAmmo(row.airplaneAmmo_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.ammoData.splice(index, 1);
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
</style>
