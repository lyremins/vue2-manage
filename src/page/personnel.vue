<template>
    <div class="fillcontain">
        <head-top></head-top>
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                    <el-button
            size="medium"
            type="primary"
            @click="addPersonnel()">添加人员</el-button>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="姓名">
                        <span>{{ props.row.user_name }}</span>
                      </el-form-item>
                       <el-form-item label="性别">
                        <span>{{ props.row.sex }}</span>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                     <el-form-item label="分队">
                        <span>{{ props.row.detachment }}</span>
                      </el-form-item>
                      <el-form-item label="工种">
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <el-form-item label="组织架构">
                        <span>{{ props.row.organiz }}</span>
                      </el-form-item>
                        <el-form-item label="籍贯">
                        <span>{{ props.row.native }}</span>
                      </el-form-item>
                        <el-form-item label="单位">
                        <span>{{ props.row.company }}</span>
                      </el-form-item>
                        <el-form-item label="职务">
                        <span>{{ props.row.post }}</span>
                      </el-form-item>
                        <el-form-item label="专业">
                        <span>{{ props.row.major }}</span>
                      </el-form-item>
                     <el-form-item label="等级">
                        <span>{{ props.row.grade }}</span>
                      </el-form-item>
                                           <el-form-item label="绑定飞机">
                        <span>{{ props.row.bindAir }}</span>
                      </el-form-item>
                                           <el-form-item label="入伍时间">
                        <span>{{ props.row.enlist }}</span>
                      </el-form-item>
                                           <el-form-item label="毕业院校">
                        <span>{{ props.row.school }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="user_name"
		        label="姓名"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="sex"
		        label="性别"
		        width="80">
		      </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式"
                width="140">
              </el-table-column>
            <el-table-column
                prop="detachment"
                label="分队"
                width="180">
              </el-table-column>
               <el-table-column
                prop="type"
                label="工种"
                width="180">
              </el-table-column>
              <!--<el-table-column
                prop="remark"
                label="备注"
                width="180">
              </el-table-column>
              <el-table-column
                prop="organiz"
                label="组织架构"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="native"
                label="籍贯"
                width="180">
              </el-table-column>
              <el-table-column
                prop="company"
                label="单位"
                width="180">
              </el-table-column>
              <el-table-column
                prop="row"
                label="排"
                width="180">
              </el-table-column>
              <el-table-column
                prop="post"
                label="职务"
                width="180">
              </el-table-column> -->
              <!-- <el-table-column
                prop="major"
                label="专业"
                width="180">
              </el-table-column>
              <el-table-column
                prop="grade"
                label="等级"
                width="180">
              </el-table-column>
              <el-table-column
                prop="bindAir"
                label="绑定飞机"
                width="180">
              </el-table-column>
              <el-table-column
                prop="enlist"
                label="入伍时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="school"
                label="毕业院校"
                width="180">
              </el-table-column>
              <el-table-column
                prop="greatTask"
                label="执行重大任务"
                width="180">
              </el-table-column> -->
            <el-table-column label="操作" width="200">
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
		    <!-- <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div> -->
            <el-dialog title="修改人员信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="selectTable.user_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-input v-model="selectTable.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="分队" label-width="100px">
                        <el-input v-model="selectTable.detachment"></el-input>
                    </el-form-item>
                    <el-form-item label="工种" label-width="100px">
                        <el-select v-model="selectTable.type">
                                <el-option
                                v-for="(item,index) in gz"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="备注" label-width="100px">
						<el-input v-model="selectTable.remark"></el-input>
					</el-form-item>
					<el-form-item label="组织架构" label-width="100px">
						<el-input v-model="selectTable.organiz"></el-input>
					</el-form-item>
					<el-form-item label="籍贯" label-width="100px">
						<el-input v-model="selectTable.native"></el-input>
					</el-form-item>
					<el-form-item label="单位" label-width="100px">
						<el-input v-model="selectTable.company"></el-input>
					</el-form-item>
					<el-form-item label="排" label-width="100px">
						<el-input v-model="selectTable.row"></el-input>
					</el-form-item>
					<el-form-item label="职务" label-width="100px">
                        <el-select v-model="selectTable.post">
                                <el-option
                                v-for="(item,index) in zw"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="专业" label-width="100px">
                        <el-select v-model="selectTable.major">
                                <el-option
                                v-for="(item,index) in zy"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="等级" label-width="100px">
						<el-input v-model="selectTable.grade"></el-input>
					</el-form-item>
					<el-form-item label="绑定飞机" label-width="100px">
                            <el-select v-model="selectTable.bindAir">
                                <el-option
                                v-for="(item,index) in air"
                                :key="index"
                                :label="item.code"
                                :value="item.code"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="入伍时间" label-width="100px">
                        <el-date-picker
                            v-model="selectTable.enlist"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
					<el-form-item label="毕业院校" label-width="100px">
						<el-input v-model="selectTable.school"></el-input>
					</el-form-item>
					<el-form-item label="执行重大任务" label-width="100px">
						<el-input v-model="selectTable.greatTask"></el-input>
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
    import { getPersonnel,getPersonnelCount,getPersonnelById,updatePersonnel,deletePersonnel,addPersonnel,getAirplane,getConfig } from '@/api/getData'
    import UploadExcelComponent from '../components/index.vue'
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
                dialogFormVisible: false,
                air: {},
                gz: {},
                zw: {},
                zy: {}
            }
        },
    	components: {
            headTop,
            UploadExcelComponent
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getPersonnelCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getPersonnel();
                    const airplane = await getAirplane();
                    this.air = airplane.data;
                    const config = await getConfig();
                    this.gz = config.data[0].pTypeModel.split(",");
                    this.zw = config.data[0].pPostModel.split(",");
                    this.zy = config.data[0].pMajorModel.split(",");
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
                this.getPersonnel()
            },
            async getPersonnel(){
                try{
                    const res = await getPersonnel({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                person_id: item.person_id,
                    			user_name: item.user_name,
						        sex: item.sex,
						        phone: item.phone,
                                type: item.type,
                                detachment: item.detachment,
                                remark: item.remark,
                                organiz: item.organiz,
                                native: item.native,
                                company: item.company,
                                row: item.row,
                                post: item.post,
                                major: item.major,
                                grade: item.grade,
                                bindAir: item.bindAir,
                                enlist: item.enlist,
                                school: item.school,
                                greatTask: item.greatTask,
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
                const personnel = await getPersonnelById(row.person_id);
                console.log(personnel);
                this.selectTable = {...row, ...{
                    user_name: personnel.user_name,
                    sex: personnel.sex,
                    phone: personnel.phone,
                    type: personnel.type,
                    detachment: personnel.detachment,
                    remark: personnel.remark,
                    organiz: personnel.organiz,
                    native: personnel.native,
                    company: personnel.company,
                    row: personnel.row,
                    post: personnel.post,
                    major: personnel.major,
                    grade: personnel.grade,
                    bindAir: personnel.bindAir,
                    enlist: personnel.enlist,
                    school: personnel.school,
                    greatTask: personnel.greatTask,}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updatePersonnel(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getPersonnel();
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
                    console.log(row);
                    const res = await deletePersonnel(row.person_id);
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
            addPersonnel() {
                this.$router.push('/addPersonnel');
            },
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1
                if (isLt1M) {
                    return true
                }
                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            async handleSuccess({ results, header }) {
                this.tableData = results;
                console.log(this.tableData);
                for (const iterator of this.tableData) {
                    console.log(iterator);
                    let result = await addPersonnel(iterator);
                    if (result.status == 1) {
						this.$message({
					        type: 'success',
					        message: '添加成功'
					    });
                        this.$router.push('/airplane');
						} else{
                            this.$message({
                                type: 'error',
                                message: result.message
                        });
					}
                }
                this.tableHeader = header
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
    .el-table--enable-row-transition .el-table__body td {
        text-align: center;
    }
</style>


