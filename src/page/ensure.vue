<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                              <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="飞机名称">
                        <span>{{ props.row.filed1 }}</span>
                      </el-form-item>
                                            <el-form-item label="飞机号">
                        <span>{{ props.row.filed2 }}</span>
                      </el-form-item>
                                            <el-form-item label="飞行科目">
                        <span>{{ props.row.filed3 }}</span>
                      </el-form-item>
                                            <el-form-item label="科目日期">
                        <span>{{ props.row.filed4 }}</span>
                      </el-form-item>
                                            <el-form-item label="备份飞机号">
                        <span>{{ props.row.filed5 }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="filed1"
		        label="飞机名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="filed2"
		        label="飞机号"
		        width="80">
		      </el-table-column>
              <el-table-column
                prop="filed3"
                label="飞行科目"
                width="180">
              </el-table-column>
            <el-table-column
                prop="filed4"
                label="科目日期"
                width="120">
              </el-table-column>
              <el-table-column
                prop="filed5"
                label="备份飞机号"
                width="180">
              </el-table-column>
            <el-table-column label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addEnsure()">添加保障任务</el-button>
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
    import { getEnsure,getEnsureCount,getEnsureById,updateEnsure,deleteEnsure } from '@/api/getData'
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
                    		const tableItem = {
                                ensure_id: item.ensure_id,
                                filed1: item.filed1,
                    			filed2: item.filed2,
						        filed3: item.filed3,
						        filed4: item.filed4,
                                filed5: item.filed5,
                                filed6: item.filed6
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
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
     .el-table th.is-leaf {
        text-align: center;
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


