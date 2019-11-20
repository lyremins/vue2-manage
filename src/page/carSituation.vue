<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>
            <div class="box" v-for="(value,index) in airplaneSituation.data">
                <p class="title">{{titleMap[index]}}</p>
                <div class="air" v-for="v in value">
                    <i class="fa fa-car" aria-hidden="true"></i>
                    <span class="state" :class="{'wh': v.state === '完好',
                                        'fault': v.state === '定检' ||
                                        v.state === '大修' ||
                                        v.state === '排故',
                                        'try': v.state === '试飞' ||
                                        v.state === '待退役'}">
                    {{v.state}}</span>
                    <p class="task">车辆名称：{{v.name}}</p>
                    <p class="task">进场状态：{{v.enter}}</p>
                    <p class="task">任务状态：{{v.taskState}}</p>
                    <p class="task">最后操作时间：{{v.create_time}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getAirplane,getDevice,getVehicle,getPlan,getCarSituation } from '@/api/getData'
    export default {
        data(){
            return {
                airData: {},
                tableData: [],
                vehicleData: {},
                planData: {},
                airplaneSituation: {},
                titleMap: {
                    notask: '无任务车辆',
                    other: '其他保障任务车辆',
                    plan: '飞行计划保障车辆',
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
                    this.airplaneSituation = await getCarSituation();
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


