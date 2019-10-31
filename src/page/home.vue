<template>
    <div>
        <head-top></head-top>
 <div class="block">
    <span class="demonstration">默认为 Date 对象</span>
    <div class="demonstration">值：{{ value1 }}</div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">使用 value-format</span>
    <div class="demonstration">值：{{ value2 }}</div>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">时间戳</span>
    <div class="demonstration">值：{{ value3 }}</div>
    <el-date-picker
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="timestamp">
    </el-date-picker>
  </div>
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
            getPlan} from '@/api/getData'
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
                sevenDate: [[],[],[]],
                planData:{},
                xData: [],
                yData: [],
                startTime: '',
                endTime: '',
        value1: '',
        value2: '',
        value3: ''
    		}
    	},
    	components: {
    		headTop,
    		tendency,
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
                this.planData.data.forEach(element => {
                    mapLists[element.airName] || (mapLists[element.airName] = []);
                    mapLists[element.airName].push(element);
                });
                const name = [];
                const number = [];
                 Object.keys(mapLists).forEach((key,value) => {
                     console.log(mapLists[key].length);
                    this.xData.push(key);
                    this.yData.push(mapLists[key].length);
                });
                console.log(this.xData);
                console.log(this.yData);
            },
            search() {
                console.log(this.startTime);
                console.log(this.endTime);
                if (!this.startTime || !this.endTime) {
                    this.$message({
                        message: '要记得选择日期',
                        type: 'warning'
                    });
                }
            }
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
            justify-content: space-between;
            margin: 0 31%;
        }
</style>
