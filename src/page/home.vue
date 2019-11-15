<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
			<header class="section_title">{{show_title}}</header>
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
        <div v-show="ff !== 'f3' && ff !== 'f4'">
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
        </div>
    <div v-show="ff === 'f3'">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
        prop="x1"
        label="飞行计划名称"
        width="180">

        </el-table-column>
        <el-table-column
        prop="x2"
        label="飞机编号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="x3"
        label="弹药型号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="x4"
        label="发射次数"
        width="180">
        </el-table-column>
        <el-table-column
        prop="x5"
        label="发射数量"
        width="180">
        </el-table-column>
          </el-table>
    </div>
        <div v-show="ff === 'f4'">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
        prop="x1"
        label="飞行计划名称"
        width="180">

        </el-table-column>
        <el-table-column
        prop="x2"
        label="飞机编号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="x4"
        label="次数"
        width="180">
        </el-table-column>
          </el-table>
    </div>
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
    <div v-show="value === '4'" class="dxStyle">
        <span>弹药型号：</span>
        <el-select v-model="dyType">
            <el-option
            v-for="(item,index) in dyoptions"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
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
                dyoptions: [{
                    value: '1',
                    label: '训练弹A'
                }, {
                    value: '2',
                    label: '训练弹B'
                }, {
                    value: '3',
                    label: '训练弹C'
                }, {
                    value: '4',
                    label: '训练弹D'
                }],
                options: [{
                    value: '1',
                    label: '飞行计划/保障次数'
                }, {
                    value: '2',
                    label: '飞机飞行场次'
                }, {
                    value: '3',
                    label: '飞机状态统计'
                }, {
                    value: '4',
                    label: '弹药数据统计'
                }, {
                    value: '5',
                    label: '有寿器件余寿统计'
                }],
                dyType: [{
                    value: ''
                }],
                mapLists: {},
                airPlaneArray: [],
                airplaneState: {},
                tableData: [],
                xName: '',
                yName: '',
                dyType:'',
                ff: 'f1',
                show_title: '',
                subValue: ''
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
            "dyType": function (value) {
                console.log(value);
                if (value === '1') {
                    this.yData = [5,15];
                } else if (value === '2') {
                    this.yData = [10,6];
                } else if (value === '3') {
                    this.yData = [4,30];
                }

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
                this.xData = [];
                this.yData = [];
                this.tableData = [];
                console.log(value);
                console.log(this.startTime);
                console.log(this.endTime);
                if (!this.startTime || !this.endTime) {
                    this.$message({
                        message: '要记得选择日期',
                        type: 'warning'
                    });
                }
                if (this.startTime < '2019-11-01' && this.endTime >= '2019-11-15'){
                    return ;
                }
                if (this.value === '1') {
                    this.show_title = '飞行计划/保障次数统计';
                     this.xData = ['完成场次(飞行计划)','完成场次(保障任务)','起落次数(飞行计划)','起落次数(保障任务)'];
                     this.yData = [20,40,15,22];
                        this.xName = '类型';
                        this.yName = '数量';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                } else if (this.value === '2') {
                    this.show_title = '飞机飞行场次';
                     this.xData = ['A001', 'A002', 'A003', 'A004'];
                     this.yData = [13,4,9,22];
                        this.xName = '飞机编号';
                        this.yName = '数量';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                } else if (this.value === '3') {
                    this.show_title = '飞行状态统计';
                     this.xData = ['完好','大修','定检','排故'];
                     this.yData = [18,16,5,7];
                        this.xName = '类型';
                        this.yName = '数量';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                } else if (this.value === '4') {
                    this.show_title = '弹药使用情况数据统计';
                     this.xData = ['发射次数','发射数量(发/枚)'];
                     this.yData = [20,40];
                        this.xName = '类型';
                        this.yName = '数量';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                } else if (this.value === '5') {
                    this.show_title = '有寿器件余寿统计';
                     this.xData = ['有寿器件A','有寿器件B','有寿器件C','有寿器件D','有寿器件E'];
                     this.yData = [12,40,16,42,5];
                        this.xName = '有寿器件名称';
                        this.yName = '余寿';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                }
            },
            toDay(values) {
                this.tableData = [];
                console.log(values);

                // 弹药统计
                if (this.value === '4') {
                    if (values === '发射数量(发/枚)') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,7,4,9,6];
                        this.xName = '类型';
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    } else if (values === '发射次数') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xName = '类型';
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    }

                        if (values.indexOf('1号')) {
                            this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [4,3,7,1];
                            this.ff = 'f3';
                        } else if  (values.indexOf('2号')) {
                            this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [6,8,3,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('3号')) {
                            this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [2,8,1,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('4号')) {
                            this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [6,8,1,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('5号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [7,8,1,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('6号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.ff = 'f3';
                            this.ff === 'f3';
                        } else if  (values.indexOf('7号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [6,3,1,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('8号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [3,8,1,12];
                            this.ff = 'f3';
                        } else if  (values.indexOf('9号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [6,8,1,7];
                            this.ff === 'f3';
                        } else if  (values.indexOf('10号')) {
                        this.xData = ['训练弹A','训练弹B','训练弹C','训练弹D'];
                            this.yData = [16,8,1,12];
                            this.ff = 'f3';
                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x3: '训练弹A',
                            x4: '5',
                            x5: '30'
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                        }
                 // ------------------
                else if (this.value === '1') {
                    // '起落次数(飞行计划)','起落次数(保障任务)'
                    if (values === '完成场次(飞行计划)') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,12,4,5,4,6,8,41,6];
                        this.xName = '类型';
                        this.yName = '单日飞行计划(场次)'
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    } else if (values === '完成场次(保障任务)') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [1,7,2,3,4,0,7,2,10,6];
                        this.xName = '类型';
                        this.yName = '单日飞行计划(场次)'
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    } else if (values === '起落次数(飞行计划)') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [1,3,4,5,4,5,7,4,9,6];
                        this.xName = '类型';
                        this.yName = '单日飞行计划(场次)'
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    } else if (values === '起落次数(保障任务)') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [2,3,4,7,4,3,7,1,6];
                        this.xName = '类型';
                        this.yName = '单日飞行计划(场次)'
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    }
                    if (this.subValue === '完成场次(飞行计划)') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '完成场次(保障任务)') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '起落次数(飞行计划)') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '起落次数(保障任务)') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    }
                } else if (this.value === '2') {
                    this.yName = '日期';
                    this.xName = '飞机编号';
                    if (values === 'A001') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,7,4,9,6];
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });
                        return ;
                    } else if (values === 'A002') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === 'A003') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === 'A004') {
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    }
                } else if (this.value === '3') {
                    this.yName = '日期';
                    this.xName = '数量';
                    if (values === '完好') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,7,4,9,6];
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });

                        return ;
                    } else if (values === '大修') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === '定检') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === '排故') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月2号','11月3号','11月4号','11月5号','11月6号','11月7号','11月8号','11月9号','11月10号'];
                        this.yData = [4,7,4,13,4,3,9,19,8,1];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    }
                    if (this.subValue === '完好') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '定检') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '排故') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '大修') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    }
                } else if (this.value === '5') {
                    this.yName = '消耗';
                    this.xName = '日期';
                    if (values === '有寿器件A') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月6号','11月7号','11月9号','11月10号'];
                        this.yData = [1,2,1,3,6];
                        this.xData.forEach((element,index) => {
                            this.tableData.push({
                                x: element,
                                y: this.yData[index]
                            })
                        });

                        return ;
                    } else if (values === '有寿器件B') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月6号','11月7号','11月9号','11月10号'];
                        this.yData = [4,2,1,3,6];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === '有寿器件C') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月6号','11月7号','11月9号','11月10号'];
                        this.yData = [6,2,1,7,6];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    } else if (values === '有寿器件D') {
                        this.subValue = values;
                        this.xData = ['11月1号','11月6号','11月7号','11月9号','11月10号'];
                        this.yData = [9,2,3,1,5];
                        this.xData.forEach((element,index) => {
                        this.tableData.push({
                            x: element,
                            y: this.yData[index]
                        })
                        });
                        return ;
                    }
                    if (this.subValue === '有寿器件A') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '有寿器件B') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '有寿器件C') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    } else if (this.subValue === '有寿器件D') {
                        this.ff = 'f4';
                        if (values.indexOf('1号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [4,3,7,1];

                        } else if  (values.indexOf('2号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,3,12];

                        } else if  (values.indexOf('3号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [2,8,1,12];

                        } else if  (values.indexOf('4号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,12];

                        } else if  (values.indexOf('5号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [7,8,1,12];

                        } else if  (values.indexOf('6号')) {
                            this.xData = ['A001','A002','A003','A004'];

                        } else if  (values.indexOf('7号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,3,1,12];

                        } else if  (values.indexOf('8号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [3,8,1,12];

                        } else if  (values.indexOf('9号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [6,8,1,7];

                        } else if  (values.indexOf('10号')) {
                            this.xData = ['A001','A002','A003','A004'];
                            this.yData = [16,8,1,12];

                        }
                        this.tableData.push({
                            x1: '飞行计划20191101',
                            x2: 'A001',
                            x4: '5',
                        },{
                            x1: '飞行计划20191103',
                            x2: 'A002',
                            x3: '训练弹B',
                            x4: '3',
                            x5: '12'
                        },{
                            x1: '飞行计划20191102',
                            x2: 'A001',
                            x3: '训练弹C',
                            x4: '3',
                            x5: '8'
                        },{
                            x1: '飞行计划20191104',
                            x2: 'A001',
                            x3: '训练弹D',
                            x4: '8',
                            x5: '15'
                        })
                    }
                }
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
		// padding: 20px;
		// margin-bottom: 40px;
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
        .dxStyle {
            text-align: center;
            margin: 20PX;
        }
</style>
