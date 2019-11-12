<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line1'));
            this.initData();
        },
        props: ['xData', 'yData'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color: colors,
                    title: {
                        text: '走势图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['新注册用户', '新增飞机', '新增管理员']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                    dataView : {readOnly: true},
                restore : {show: true},
                saveAsImage : {show: true},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xData
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '',
                          min: 0,
                          max: 500,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: '',
                          min: 0,
                          max: 500,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            name:'数量',
                            type:'line',
                            data:this.yData,
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    10,15,11,18
                                ]
                            },
                        },
                        // {
                        //     name:'新增飞机',
                        //     type:'line',
                        //     data:this.sevenDate[1],
                        //     yAxisIndex: 1,
                        //     markPoint: {
                        //         data: [
                        //             {type: 'max', name: '最大值'},
                        //             {type: 'min', name: '最小值'}
                        //         ]
                        //     },
                        // },
                        // {
                        //     name:'新增管理员',
                        //     type:'line',
                        //     data:this.sevenDate[2],
                        //     yAxisIndex: 1,
                        //     markPoint: {
                        //         data: [
                        //             {type: 'max', name: '最大值'},
                        //             {type: 'min', name: '最小值'}
                        //         ]
                        //     },
                        // }
                    ]
              };
            this.myChart.setOption(option);
            this.myChart.on('click', (param) => {
                console.log(param.name);//这里根据param填写你的跳转逻辑
                this.$emit('clickCharts',param.name);

            })
            }
        },
        watch: {
            xData: function (){
                this.initData()
            },
            yData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
