<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
			<header class="section_title">数据统计</header>
			<!-- <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 飞行计划：</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 进场飞机：</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 进场车辆：</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 总飞行计划：</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 总进场飞机：</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 总进场车辆：</div></el-col>
            </el-row> -->
		</section>
         <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="x"
      :label="xName"
      width="180">
    </el-table-column>
    <el-table-column
      prop="y"
      :label="yName"
      width="180">
    </el-table-column>
    <el-table-column
      prop="upDownNumber"
      label="">
    </el-table-column>
  </el-table>
            <!-- <table class="dataViewTable"><tbody>
                <tr class="dataViewTr">
                <table v-for="(value,index) in xData">
                    <tr class="dataViewTr">
                       <td class="dataViewTd">{{value}}</td>
                         <td class="dataViewTd">{{yData[index]}}</td>
                    </tr>
                </table>
                </tr>
            </tbody></table> -->


    <div class="dateSelect">
  <div class="block">
    <!-- <div class="demonstration">值：{{ value2 }}</div> -->
    <span>开始时间：</span>
    <el-date-picker
      v-model="startTime"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
    <div class="block">
    <!-- <div class="demonstration">值：{{ value2 }}</div> -->
    <span>结束时间：</span>
    <el-date-picker
      v-model="endTime"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-button @click="search">查询</el-button>
    <el-select v-model="value">
        <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"></el-option>
    </el-select>
  </div>
          </div>
		<tendency :xData='xData' :yData='yData' @clickCharts="toDay" ></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
    import {userCount,
            orderCount,
            getUserCount,
            getOrderCount,
            adminDayCount,
            adminCount,
            getPlan,
            getEnsure,
            getAirplaneState} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
                sevenDate: [],
                planData:{},
                xData: [],
                yData: [],
                startTime: '',
                endTime: '',
                getEnsure: {},
                value: '',
                options: [{
                    value: '1',
                    label: '飞行计划/保障次数'
                }, {
                    value: '2',
                    label: '飞机飞行场次'
                }, {
                    value: '3',
                    label: '飞机状态统计'
                }],
                mapLists: {},
                airPlaneArray: [],
                airplaneState: {},
                tableData: [],
                xName: '',
                yName: ''
    		}
    	},
    	components: {
    		headTop,
    		tendency,
        },
        watch: {
            "value": function (value) {
                this.value = value;
                this.search(value)
            },
        },
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = 15;
    				this.orderCount = 8;
                    this.adminCount = 11;
                    this.allUserCount = 3;
                    this.allOrderCount = 25;
                    this.allAdminCount = 7;
    			}).catch(err => {
    				console.log(err)
                })
                this.getPlan();
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
                    console.log(item);
    				apiArr[0].push([5,7,9])
    				apiArr[1].push([5,7,9])
                    apiArr[2].push([5,7,9])
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
            },
            async getPlan() {
                const mapLists = {};
                this.planData = await getPlan();
                this.ensureData = await getEnsure();
                // const name = ['总飞机数','总保障任务数'];
                // const number = [this.planData.data.length,this.ensureData.data.length];
                console.log(name);
                console.log(number);
                this.xData = name;
                this.yData = number;
            },
            async search(value) {
                console.log(value);
                console.log(this.startTime);
                console.log(this.endTime);
                if (!this.startTime || !this.endTime) {
                    this.$message({
                        message: '要记得选择日期',
                        type: 'warning'
                    });
                }
                if (this.value === '1') {
                    this.xData = [];
                     this.yData = [];
                    console.log('222');
                    let search_data_plan  = 0;
                    let search_data_ensure = 0;
                    this.planData.data.forEach(element => {
                        if (this.toTimeStamp(element.dateTime) >= this.toTimeStamp(this.startTime) && this.toTimeStamp(element.dateTime) <= this.toTimeStamp(this.endTime)) {
                            search_data_plan +=1;
                        }
                    });
                    this.ensureData.data.forEach(element => {
                        if (this.toTimeStamp(element.filed2) >= this.toTimeStamp(this.startTime) && this.toTimeStamp(element.filed2) <= this.toTimeStamp(this.endTime)) {
                            search_data_ensure +=1;
                        }
                    });
                    this.yData = [search_data_plan,search_data_ensure];
                    console.log(this.xData);
                } else if (this.value === '2') {
                    this.xData = [];
                     this.yData = [];
                    this.planData.data.forEach(element => {
                        if (this.toTimeStamp(element.dateTime) >= this.toTimeStamp(this.startTime) && this.toTimeStamp(element.dateTime) <= this.toTimeStamp(this.endTime)) {
                            console.log(element);
                            element.airData.forEach(e => {
                                e.time = element.dateTime;
                                this.airPlaneArray.push(e);
                            });
                        }
                    });
                    console.log("22222222222", this.airPlaneArray);
                    // this.airPlaneArray.forEach(element => {
                    //     this.mapLists[element.airName] || (this.mapLists[element.airName] = []);
                    //     this.mapLists[element.airName].push(element);
                    // });
                    this.airPlaneArray.forEach(element => {
                        this.mapLists[element.time] || (this.mapLists[element.time] = []);
                        this.mapLists[element.time].push(element);
                    });
                    console.log(this.mapLists);
                    this.tableData = [];
                    Object.keys(this.mapLists).forEach((key,value) => {
                        this.xData.push(key);
                        this.yData.push(this.mapLists[key].length);
                        this.xName = '日期';
                        this.yName = '场次';
                        this.tableData.push({
                            x: key,
                            y: this.mapLists[key].length
                        })

                    });
                    console.log(data);
                } else if (this.value === '3') {
                     this.xData = [];
                     this.yData = [];
                    this.airplaneState = await getAirplaneState();
                    console.log(this.airplaneState);
                    this.airplaneState.data.forEach(element => {
                        console.log(element);
                        if (this.toTimeStamp(element.create_time) >= this.toTimeStamp(this.startTime) && this.toTimeStamp(element.create_time) <= this.toTimeStamp(this.endTime)) {
                            this.mapLists[element.airData.state] || (this.mapLists[element.airData.state] = []);
                            this.mapLists[element.airData.state].push(element);
                        }
                    });
                    console.log(this.mapLists);
                    Object.keys(this.mapLists).forEach((key,value) => {
                        this.xData.push(key);
                        this.yData.push(this.mapLists[key].length);
                    });
                }
            },
            toDay(values) {
                this.tableData = [];
                const dayArray = [];
                this.mapLists[values].forEach(element => {
                    dayArray[element.airName] || (dayArray[element.airName]= []);
                    dayArray[element.airName].push(element);
                });
                this.xData = [];
                this.yData = [];
                this.xName = '飞机编号';
                this.yName = '起落次数';
                Object.keys(dayArray).forEach((key,value) => {
                    this.xData.push(key);
                    this.yData.push(dayArray[key][0].upDownNumber);
                        this.tableData.push({
                            x: key,
                            y: dayArray[key][0].upDownNumber
                        })
                });
            },
            toTimeStamp(time) {
                time = time.replace(/-/g, '/') // 把所有-转化成/
                let timestamp = new Date(time).getTime()
                return timestamp
            },
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
        .block {
            width: 50%;
        }
	}
    .wan{
        .sc(16px, #333)
    }
        .dateSelect {
            display: flex;
            .block {
                margin: 0 20px;
            }
        }
</style>
