<template>
    <div>
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="array"
		      style="width: 100%">
            <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="">
                        <span>{{ props.row.create_time }}</span>
                      </el-form-item>
                      <el-form-item label="">
                        <span>{{ props.row.user }}</span>
                      </el-form-item>
                      <el-form-item label="">
                        <span>{{ props.row.action }}</span>
                      </el-form-item>
                      <br>
                      <el-form-item label="">
                          <!-- {{props.row.data}} -->
                        <p>内容：</p>
                        <div>
                            <span class="content" v-for="v in props.row.data" style="">{{v}}</span>
                            <!-- <p style="">出厂号码：{{v.code}}</p>
                            <p style="">部队编号：{{v.army_id}}</p>
                            <p style="">所属单位：{{v.unit}}</p>
                            <p style="">制造厂：{{v.factory}}</p>
                            <p style="">出厂日期：{{v.date}}</p> -->
                        </div>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="create_time"
		        label="操作时间"
		        width="300">
		      </el-table-column>
		      <el-table-column
		        prop="user"
		        label="用户名"
		        width="300">
		      </el-table-column>
		      <el-table-column
		        prop="action"
		        label="行为"
		        width="300">
		      </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import { getLog } from '@/api/getData'
    export default {
    	data(){
    		return {
                logData: {},
                da: {},
                array: []
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
        },
        computed: {

        },
    	methods: {
    		async initData(){
    			try{
                    const res = await getLog();

    				if (res.status == 1) {
                        this.logData = res.data;
                        this.logData.forEach(element => {
                            console.log(JSON.parse(element.data));
                            this.da = {
                                user: element.user,
                                action: element.action,
                                create_time: element.create_time,
                                data: JSON.parse(element.data)
                            }
                            this.array.push(this.da);
                            // element.data = JSON.parse(data);
                        });
                        console.log("333333", this.array);
                        // this.logData.forEach(element => {
                        //     console.log(element.data);
                        //     element.data = JSON.parse(element.data);
                        //     console.log(JSON.parse(element.data));
                        // });
                        // console.log(this.logData);
    				}else{
    					throw new Error(res)
    				}
    			}catch(err){
    				console.log('获取日志数据失败',err);
    			}
            },
            toObeject(data) {
                this.logData.forEach(element => {
                    element.data = JSON.parse(data);
                });
                console.log(this.logData);
            }
    	}
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .content {
        margin: 10px;
    }

</style>
