<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-button
            size="medium"
            type="primary"
            @click="addEnsure()">添加保障任务</el-button>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="保障名称">
                        <span>{{ props.row.filed1 }}</span>
                      </el-form-item>
                        <el-form-item label="保障日期">
                        <span>{{ props.row.filed2 }}</span>
                      </el-form-item>
                    <el-form-item label="保障详情">
                        <div class="ensureList" v-for="(v,index) in props.row.filed3">
                                <span>保障类型：{{v.content}}</span>
                                <h4 v-show="v.plan">飞行计划：</h4>
                                <span v-show="v.plan" v-for="vv in v.plan">
                                    计划名称：{{vv.name}}
                                    <div v-if="vv.name">
                                        计划人员：{{vv.air}}
                                        <!-- {{getToPerson(vv.plan_id)}} -->
                                    </div>
                                </span>
                                <h4 v-show="v.car">保障车辆：</h4>
                                <span v-show="v.car" v-for="vv in v.car">
                                    {{vv.name}}
                                </span>
                                <h4 v-show="v.airplane">保障飞机：</h4>
                                <span v-show="v.airplane" v-for="vv in v.airplane">
                                    {{vv.code}}
                                </span>
                                <h4 v-show="v.person">保障人员：</h4>
                                <span v-show="v.person" v-for="vv in v.person">
                                    {{vv.user_name}}
                                </span>
                        </div>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="filed1"
		        label="飞机名称"
		        width="380">
		      </el-table-column>
		      <el-table-column
		        prop="filed2"
		        label="保障日期"
		        width="380">
		      </el-table-column>
            <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
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
                        <el-input v-model="selectTable.filed1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="飞机号" label-width="100px">
                        <el-input v-model="selectTable.filed2"></el-input>
                    </el-form-item>
                    <el-form-item label="飞行科目" label-width="100px">
                        <el-input v-model="selectTable.filed3"></el-input>
                    </el-form-item>
                    <el-form-item label="科目日期" label-width="100px">
                        <el-input v-model="selectTable.filed4"></el-input>
                    </el-form-item>
                    <el-form-item label="科目日期" label-width="100px">
                        <el-input v-model="selectTable.filed5"></el-input>
                    </el-form-item>
                    <el-form-item label="备份飞机号" label-width="100px">
                        <el-input v-model="selectTable.filed6"></el-input>
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
    import { getEnsure,getEnsureCount,getEnsureById,updateEnsure,deleteEnsure,getPersonSituationToPlan } from '@/api/getData'
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
                    const countData = await getEnsureCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getEnsure();
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
                this.getEnsure()
            },
            async getEnsure(){
                try{
                    const res = await getEnsure({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                            item.filed3.forEach(element => {
                                if (element.content === '飞行计划保障' && element.plan.length) {
                                    element.plan.forEach(async e1 => {
                                        const planArray = await getPersonSituationToPlan({
                                            plan_id:e1.plan_id
                                        });
                                        const newA = planArray.data.map(v => v.bind);
                                        const newB = [].concat.apply([], newA);
                                        const newC = newB.map(v => v.user_name);
                                        e1.air = newC.join(",");
                                    });
                                }
                            });
                    		const tableItem = {
                                ensure_id: item.ensure_id,
                                filed1: item.filed1,
                    			filed2: item.filed2,
						        filed3: item.filed3,
						        filed4: item.filed4,
                                filed5: item.filed5,
                                filed6: item.filed6
                            }
                            console.log(tableItem);
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
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                console.log(row);
                const ensure = await getEnsureById(row.ensure_id);
                console.log(ensure);
                this.selectTable = {...row, ...{
                    filed1: ensure.filed1,
                    filed2: ensure.filed2,
                    filed3: ensure.filed3,
                    filed4: ensure.filed4,
                    filed5: ensure.filed5}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateEnsure(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getEnsure();
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
                    console.log(row.ensure_id);
                    const res = await deleteEnsure(row.ensure_id);
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
            addEnsure() {
                this.$router.push('/addEnsure');
            },
            // async getToPerson(plan_id) {
            //     console.log(plan_id);
            //     const planArray = await getPersonSituationToPlan({
            //         plan_id:plan_id
            //     });
            //     console.log(planArray);
            //     const newA = planArray.data.map(v => v.bind);
            //     const newB = [].concat.apply([], newA);
            //     const newC = newB.map(v => v.user_name);

            //     console.log(newC.join(","));
            //     return newC.join(",");
            // }
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
    .el-table .cell {
        text-align-last: center;
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
    .ensureList {
        margin-bottom: 20PX;
    }
</style>


