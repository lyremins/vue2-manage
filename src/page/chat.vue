<template>
    <div>
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="logData"
		      style="width: 100%">
            <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="发送时间">
                        <span>{{ props.row.createtime }}</span>
                      </el-form-item>
                        <el-form-item label="发送人">
                        <span>{{ props.row.fromuid }}</span>
                      </el-form-item>
                        <el-form-item label="接受人">
                        <span>{{ props.row.touid }}</span>
                      </el-form-item>
                        <el-form-item label="聊天方式">
                        <span>{{ props.row.chatType ? '单聊' : '群聊' }}</span>
                      </el-form-item>
                      <el-form-item label="聊天内容">
                        <span v-if="props.row.content">{{ props.row.content }}</span>
                        <img v-else :src="'img/'+props.row.image_path" alt="">
                      </el-form-item>
                      <br>
                      <el-form-item label="">
                          <!-- {{props.row.data}} -->

                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="createtime"
		        label="发送时间"
		        width="300">
		      </el-table-column>
		      <el-table-column
		        prop="fromuid"
		        label="发送人"
		        width="300">
		      </el-table-column>
            <el-table-column
		        prop="touid"
		        label="接受人"
		        width="300">
		      </el-table-column>
		      <el-table-column
		        prop="content"
		        label="内容"
		        width="300">
		      </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import { getChat } from '@/api/getData'
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
                    const res = await getChat();

    				if (res.status == 1) {
                        this.logData = res.data;

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
    				console.log('获取聊天记录失败',err);
    			}
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
