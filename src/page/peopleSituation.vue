<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>
            <div class="box" v-for="(value,index) in airplaneSituation.data">
                <p class="title">{{titleMap[index]}}</p>
                <div class="air" v-for="v in value">
                    <p>飞机编号：{{v.name}}</p>
                    <div class="people" v-for="vv in v.bind">
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                        <p>{{vv.user_name}}</p>
                    </div>
                    <!-- <p class="task">飞机名称：{{v.model}}</p>
                    <p class="task">进场状态：{{v.enter}}</p>
                    <p class="task">任务状态：{{v.taskState}}</p>
                    <p class="task">最后操作时间：{{v.create_time}}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getAirplane,getDevice,getVehicle,getPlan,getPersonSituation } from '@/api/getData'
    export default {
        data(){
            return {
                airData: {},
                tableData: [],
                vehicleData: {},
                planData: {},
                airplaneSituation: {},
                titleMap: {
                    plan: '参与飞行计划的人员',
                    ensure: '参与保障计划的人员',
                    normal: '无任务的人员',
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
                    this.airplaneSituation = await getPersonSituation();
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
            display: flex;
            align-items: center;
            text-align: center;
            position: relative;
            margin: 10PX;
        }
        .car {
            text-align: center;
            position: relative;
            margin: 40PX;
        }
        .people {
            margin: 10px;
        }
    }

</style>


