<template>
    <div class="fillcontain">
        <head-top></head-top>
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                            <el-button
            size="medium"
            type="primary"
            @click="addDevice()">添加车辆</el-button>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                 <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="机器名称">
                        <span>{{ props.row.filed1 }}</span>
                      </el-form-item>
<el-form-item label="车辆型号">
                        <span>{{ props.row.model }}</span>
                      </el-form-item>

                      <el-form-item label="出厂号码">
                        <span>{{ props.row.code }}</span>
                      </el-form-item>

                      <el-form-item label="车辆名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>

                      <el-form-item label="状态">
                        <span>{{ props.row.state }}</span>
                      </el-form-item>

                      <el-form-item label="单位">
                        <span>{{ props.row.organiz }}</span>
                      </el-form-item>

                      <el-form-item label="服务机型">
                        <span>{{ props.row.service }}</span>
                      </el-form-item>

                      <el-form-item label="部队编号">
                        <span>{{ props.row.armyId }}</span>
                      </el-form-item>

                      <el-form-item label="生产厂">
                        <span>{{ props.row.product }}</span>
                      </el-form-item>

                      <el-form-item label="生产时间">
                        <span>{{ props.row.productTime }}</span>
                      </el-form-item>

                      <el-form-item label="总寿命">
                        <span>{{ props.row.life }}</span>
                      </el-form-item>

                      <el-form-item label="阶段行驶里程">
                        <span>{{ props.row.stageCourse }}</span>
                      </el-form-item>

                      <el-form-item label="大修次数">
                        <span>{{ props.row.repairNumber }}</span>
                      </el-form-item>

                      <el-form-item label="车辆任务状态">
                        <span>{{ props.row.taskState }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="name"
		        label="车辆名称"
		        width="100">
		      </el-table-column>
		      <el-table-column
		        prop="model"
		        label="型号"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="code"
		        label="出厂号码"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="state"
		        label="状态"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="organiz"
		        label="单位"
		        width="80">
		      </el-table-column>
               <el-table-column
		        prop="service"
		        label="服务机型"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="armyId"
		        label="部队编号"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="product"
		        label="生产厂"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="productTime"
		        label="生产时间"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="life"
		        label="总寿命"
		        width="80">
		      </el-table-column>
              <!--<el-table-column
		        prop="stageCourse"
		        label="阶段行驶里程"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="repairNumber"
		        label="大修次数"
		        width="80">
		      </el-table-column>
              <el-table-column
		        prop="taskState"
		        label="车辆任务状态"
		        width="80">
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
            <el-dialog title="修改车辆信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="车辆名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="型号" label-width="100px">
                            <el-select v-model="selectTable.model">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="出厂号码" label-width="100px">
						<el-input v-model="selectTable.code"></el-input>
					</el-form-item>
					<el-form-item label="状态" label-width="100px">
                        <el-select v-model="selectTable.state">
                                <el-option
                                v-for="(item,index) in carStateType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="单位" label-width="100px">
						<el-input v-model="selectTable.organiz"></el-input>
					</el-form-item>
					<el-form-item label="服务机型" label-width="100px">
                            <el-select v-model="selectTable.service">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="部队编号" label-width="100px">
						<el-input v-model="selectTable.armyId"></el-input>
					</el-form-item>
					<el-form-item label="生产厂" label-width="100px">
						<el-input v-model="selectTable.product"></el-input>
					</el-form-item>
					<el-form-item label="生产时间" label-width="100px">
                        <el-date-picker
                            v-model="selectTable.productTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
					<el-form-item label="总寿命" label-width="100px">
						<el-input v-model="selectTable.life"></el-input>
					</el-form-item>
					<el-form-item label="阶段行驶里程" label-width="100px">
						<el-input v-model="selectTable.stageCourse"></el-input>
					</el-form-item>
					<el-form-item label="大修次数" label-width="100px">
						<el-input v-model="selectTable.repairNumber"></el-input>
					</el-form-item>
					<el-form-item label="车辆任务状态" label-width="100px">
                         <el-select v-model="selectTable.taskState">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
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
    import { getVehicle,getVehicleCount,getVehicleById,updateVehicle,deleteVehicle,addVehicle,getConfig } from '@/api/getData'
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
                airType: {},
                carType: {},
                carTaskType: {},
                carStateType: {}
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
                    const countData = await getVehicleCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVehicle();
                    const config = await getConfig();
                    this.carType = config.data[0].carTypeModel.split(",");
                    this.carStateType = config.data[0].carStateModel.split(",");
                    this.airType = config.data[0].airTypeModel.split(",");
                    this.carTaskType = config.data[0].carTaskModel.split(",");
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
                this.getVehicle()
            },
            async getVehicle(){
                try{
                    const res = await getVehicle({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                vehicle_id: item.vehicle_id,
                                name: item.name,
                                model: item.model,
                                code: item.code,
                                state: item.state,
                                organiz: item.organiz,
                                service: item.service,
                                armyId: item.armyId,
                                product: item.product,
                                productTime: item.productTime,
                                life: item.life,
                                stageCourse: item.stageCourse,
                                repairNumber: item.repairNumber,
                                taskState: item.taskState,
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
                const vehicle = await getVehicleById(row.vehicle_id);
                console.log(vehicle);
                this.selectTable = {...row, ...{
                    name: vehicle.name,
                    model: vehicle.model,
                    code: vehicle.code,
                    state: vehicle.state,
                    organiz: vehicle.organiz,
                    service: vehicle.service,
                    armyId: vehicle.armyId,
                    product: vehicle.product,
                    productTime: vehicle.productTime,
                    life: vehicle.life,
                    stageCourse: vehicle.stageCourse,
                    repairNumber: vehicle.repairNumber,
                    taskState: vehicle.taskState,
                    }};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateVehicle(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getVehicle();
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
                    console.log(row.vehicle_id);
                    const res = await deleteVehicle(row.vehicle_id);
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
                    let result = await addVehicle(iterator);
                    if (result.status == 1) {
						this.$message({
					        type: 'success',
					        message: '添加成功'
					    });
                        this.$router.push('/vehicle');
						} else{
                            this.$message({
                                type: 'error',
                                message: result.message
                        });
					}
                }
                this.tableHeader = header
            },
            addDevice() {
                this.$router.push('/addVehicle');
            },
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
    .el-button--medium {
        margin: 30PX;
        margin-bottom: 0PX;
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


