<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>
            <div class="box" v-for="(value,index) in airplaneSituation.data">
                <p class="title">{{titleMap[index]}}</p>
                <el-table
                        :data="airplaneSituation.data[index]"
                        style="width: 100%">
                        <el-table-column
                            label="名称"
                            width="180">
                    <template slot-scope="scope">
                        {{scope.row.air_code+"_"+scope.row.device_code}}
                    </template>
                        </el-table-column>
                        <el-table-column
                            prop="zsm"
                            label="总寿命"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="sm"
                            label="余寿"
                            width="300">
                        </el-table-column>
                        </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getAirplane,getDevice,getVehicle,getPlan,getAirplaneToDevice } from '@/api/getData'
    export default {
        data(){
            return {
                airData: {},
                tableData: [],
                vehicleData: {},
                planData: {},
                airplaneSituation: {},
                titleMap: {
                    plan: '飞行计划类',
                    ensure: '保障任务类',
                    normal: '无任务类',
                }
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
                    this.airplaneSituation = await getAirplaneToDevice();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            }
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
        // display: flex;
        // justify-content: space-between;
        // flex-direction: row;
        // flex-wrap: wrap;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        .title {
            // text-align: center;
        }
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
            display: inline-block;
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


