<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="box">
            <div class="air" v-for="v in airData.data">
                <i class="fa fa-plane" aria-hidden="true"></i>
                <span class="state" :class="{'wh': v.state === '完好',
                                    'fault': v.state === '定检' ||
                                    v.state === '大修' ||
                                    v.state === '排故',
                                    'try': v.state === '试飞' ||
                                    v.state === '待退役'}">
                {{v.state}}</span>
                <p class="task">飞机名称：{{v.model}}</p>
                <p class="task">飞机编号：{{v.code}}</p>
                <p class="task">任务状态：{{v.task}}</p>
                <p class="task">最后操作时间：{{v.create_time}}</p>
            </div>
        </div>
        <div class="box">
        <div class="car" v-for="(value,index) in vehicleData.data">
            <i class="fa fa-car" aria-hidden="true"></i>
            <span class="state wh">{{value.state}}</span>
            <p class="task">{{value.name}}</p>
        </div>
        </div>
        <!-- <div class="table_container">
             <el-table
		      :data="planData"
		      style="width: 100%">
		      <el-table-column
		        prop="name"
		        label="计划名称"
		        width="180">
		      </el-table-column>
            <el-table-column
                prop="airName"
                label="飞机名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="airSubject"
                label="科目名称"
                width="180">
              </el-table-column>
            <el-table-column
                prop="sceneSubject"
                label="气象科目"
                width="180">
              </el-table-column>
              </el-table>
            </div> -->
        <div class="table_container">
             <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="filed1"
		        label="有寿机器名称"
		        width="180">
		      </el-table-column>
            <el-table-column
                prop="filed4"
                label="修理次数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="filed5"
                label="总寿命"
                width="180">
              </el-table-column>
            <el-table-column
                prop="filed6"
                label="总起落"
                width="180">
              </el-table-column>
              </el-table>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getAirplane,getDevice,getVehicle,getPlan } from '@/api/getData'
    export default {
        data(){
            return {
                airData: {},
                tableData: [],
                vehicleData: {},
                planData: {}
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    this.airData = await getAirplane();
                    this.vehicleData = await getVehicle()
                    this.getDevice();
                    this.getPlan();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getDevice(){
                try{
                    const res = await getDevice({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                device_id: item.device_id,
                                filed1: item.filed1,
                    			filed2: item.filed2,
						        filed3: item.filed3,
						        filed4: item.filed4,
                                filed5: item.filed5,
                                filed6: item.filed6
                    		}
                    		this.tableData.push(tableItem)
                        })
                    }else{
                    	throw new Error(res.message)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getPlan(){
                try{
                    console.log('2222');
                    const res = await getPlan({offset: this.offset, limit: this.limit});
                    console.log(res);
                    if (res.status == 1) {
                    	this.planData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                name: item.name,
                    			airName: item.airName,
						        subjectName: item.subjectName,
						        vehicleName: item.vehicleName
                    		}
                    		this.planData.push(tableItem)
                        })
                    }else{
                    	throw new Error(res.message)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        margin: 0 15%;
        padding: 20px;
    }
    .fa {
        font-size: 60px;
        color: #3d94e2;
    }
    .box {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        .state {
            font-size: 12px;
            position: absolute;
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            top: -10%;
        }
        .wh {
            background-color: green;
        }
        .fault{
            background-color: red;
        }
        .try {
            background-color: grey;
        }
        .task {
            font-size: 12px;
            margin: 10px 0;
        }
        .air {
            text-align: center;
            position: relative;
            margin: 10PX;
        }
        .car {
            text-align: center;
            position: relative;
            margin: 40PX;
        }
    }

</style>


