<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-button
            size="medium"
            type="primary"
            @click="addPlan()">添加飞行计划</el-button>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
            <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="计划名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                        <el-form-item label="计划日期">
                        <span>{{ props.row.dateTime }}</span>
                      </el-form-item>
                        <el-form-item label="计划详情">
                        <div class="ensureList" v-for="(v,index) in props.row.airData">
                        <span>飞机名称：{{v.airName}}</span>
                        <span>飞行科目：{{v.airSubject}}</span>
                        <span>起落次数：{{v.upDownNumber}}</span>
                        <span>飞行任务时间：{{v.flightTime}}</span>
                        <div v-show="vv.isCheck" v-for="vv in v.xd">
                            <span>飞机弹药编号：{{vv.air_code}}_{{vv.ammo_code}}</span>
                            <span>携弹数量：{{vv.number}}</span>
                        </div>
                        </div>
                      </el-form-item>
                    </el-form>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="name"
		        label="计划名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="dateTime"
		        label="计划日期"
		        width="250">
		      </el-table-column>
              <el-table-column
                prop="approachTime"
                label="进场时间"
                width="250">
              </el-table-column>
            <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                     <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
		    </el-table>
		    <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改保障信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="飞机名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="飞机号" label-width="100px">
                        <el-input v-model="selectTable.dateTime"></el-input>
                    </el-form-item>
                    <el-form-item label="飞行名称" label-width="100px">
                        <el-input v-model="selectTable.airName"></el-input>
                    </el-form-item>
                    <el-form-item label="科目日期" label-width="100px">
                        <el-input v-model="selectTable.airSubject"></el-input>
                    </el-form-item>
                    <el-form-item label="气象科目" label-width="100px">
                        <el-input v-model="selectTable.sceneSubject"></el-input>
                    </el-form-item>
                    <el-form-item label="飞行科目" label-width="100px">
                        <el-input v-model="selectTable.airSubject"></el-input>
                    </el-form-item>
                                        <el-form-item label="起落次数" label-width="100px">
                        <el-input v-model="selectTable.upDownNumber"></el-input>
                    </el-form-item>
                                        <el-form-item label="飞行时间" label-width="100px">
                        <el-input v-model="selectTable.flightTime"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePerson">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getPlan,getPlanById,updatePlan,deletePlan } from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false
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
                    this.getPlan();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getPlan()
            },
            async getPlan(){
                try{
                    const res = await getPlan({offset: this.offset, limit: this.limit});
                    console.log(res);
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                Plan_id: item.plan_id,
                                name: item.name,
                    			dateTime: item.dateTime,
						        airName: item.airName,
						        approachTime: item.approachTime,
						        airSubject: item.airSubject,
                                sceneSubject: item.sceneSubject,
                                upDownNumber: item.upDownNumber,
                                flightTime: item.flightTime,
                                airData: item.airData
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
            handleEdit(index,row) {
                this.$router.push('/addPlan?plan_id='+row.Plan_id);
            	// this.getSelectItemData(row, 'edit')
                // this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                console.log(row);
                const Plan = await getPlanById(row.Plan_id);
                console.log(Plan);
                this.selectTable = {...row, ...{
                    name: Plan.name,
                    dateTime: Plan.dateTime,
                    airName: Plan.airName,
                    approachTime: Plan.approachTime,
                    airSubject: Plan.airSubject,
                    sceneSubject: Plan.sceneSubject,
                    upDownNumber: Plan.upDownNumber,
                    flightTime: Plan.flightTime}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                    const postData = {...this.selectTable};
                    console.log(postData);
                    const res = await updatePlan(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getPlan();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新信息失败', err);
                }
            },
            async handleDelete(index,row) {
                try{
                    console.log(row.Plan_id);
                    const res = await deletePlan(row.Plan_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除失败')
                }
            },
            addPlan() {
                this.$router.push('/addPlan');
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .el-button--medium {
        margin: 30PX;
        margin-bottom: 0PX;
    }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table .cell {
        text-align-last: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
     .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .el-form--inline .el-form-item__label {
        float: left;
    }
</style>


