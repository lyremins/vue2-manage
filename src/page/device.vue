<template>
    <div class="fillcontain">
        <head-top></head-top>
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                            <el-button
            size="medium"
            type="primary"
            @click="addDevice()">添加有寿器件</el-button>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                              <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="有寿器件名称">
                        <span>{{ props.row.filed1 }}</span>
                      </el-form-item>
                        <el-form-item label="有售器件型号">
                        <span>{{ props.row.filed2 }}</span>
                      </el-form-item>
                        <el-form-item label="适配机型">
                        <span>{{ props.row.filed3 }}</span>
                      </el-form-item>
                         <el-form-item label="制造厂">
                        <span>{{ props.row.filed4 }}</span>
                      </el-form-item>
                          <el-form-item label="总寿命">
                        <span>{{ props.row.filed5 }}</span>
                      </el-form-item>
                        <el-form-item label="阈值">
                        <span>{{ props.row.filed6 }}</span>
                      </el-form-item>
                        <el-form-item label="装机日期">
                        <span>{{ props.row.filed7 }}</span>
                      </el-form-item>
                        <el-form-item label="">
                        <span></span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="filed1"
		        label="有寿器件名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="filed2"
		        label="型号"
		        width="80">
		      </el-table-column>
              <el-table-column
                prop="filed3"
                label="适配机型"
                width="120">
              </el-table-column>
            <el-table-column
                prop="filed4"
                label="制造厂"
                width="120">
              </el-table-column>
              <el-table-column
                prop="filed5"
                label="总寿命"
                width="120">
              </el-table-column>
            <el-table-column
                prop="filed6"
                label="阈值"
                width="120">
              </el-table-column>
                          <el-table-column
                prop="filed7"
                label="装机日期"
                width="120">
              </el-table-column>
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
            <el-dialog title="修改保障信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="有寿器件名称" label-width="100px">
                        <el-input v-model="selectTable.filed1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="型号" label-width="100px">
                        <el-input v-model="selectTable.filed2"></el-input>
                    </el-form-item>
                    <el-form-item label="适配机型" label-width="100px">
                        <el-select v-model="selectTable.filed3">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="装机日期" label-width="100px">
                        <el-date-picker
                            v-model="selectTable.filed7"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="修理次数" label-width="100px">
                        <el-input v-model="selectTable.filed4"></el-input>
                    </el-form-item>
                    <el-form-item label="总寿命" label-width="100px">
                        <el-input v-model="selectTable.filed5"></el-input>
                    </el-form-item>
                    <el-form-item label="总起落" label-width="100px">
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
    import { getDevice,getDeviceCount,getDeviceById,updateDevice,deleteDevice,addDevice,getConfig } from '@/api/getData'
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
                airType: []
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
                    const countData = await getDeviceCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getDevice();
                    const config = await getConfig();
                    this.airType = config.data[0].airTypeModel.split(",");
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
                this.getDevice()
            },
            async getDevice(){
                try{
                    const res = await getDevice({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                device_id: item.device_id,
                                filed1: item.filed1,
                    			filed2: item.filed2,
						        filed3: item.filed3,
						        filed4: item.filed4,
                                filed5: item.filed5,
                                filed6: item.filed6,
                                filed7: item.filed7,
                                filed8: item.filed8,
                                filed9: item.filed9,
                                filed10: item.filed10,
                                filed11: item.filed11,
                                filed12: item.filed12,
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
                const device = await getDeviceById(row.device_id);
                console.log(device);
                this.selectTable = {...row, ...{
                    filed1: device.filed1,
                    filed2: device.filed2,
                    filed3: device.filed3,
                    filed4: device.filed4,
                    filed5: device.filed5,
                    filed6: device.filed6,
                    filed7: device.filed7,
                    filed8: device.filed8,
                    filed9: device.filed9,
                    filed10: device.filed10,
                    filed11: device.filed11,
                    filed12: device.filed12 }}

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateDevice(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getDevice();
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
                    console.log(row.device_id);
                    const res = await deleteDevice(row.device_id);
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
            addDevice() {
                this.$router.push('/addDevice');
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
                    let result = await addDevice(iterator);
                    if (result.status == 1) {
						this.$message({
					        type: 'success',
					        message: '添加成功'
					    });
                        this.$router.push('/device');
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


