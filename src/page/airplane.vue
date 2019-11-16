<template>
    <div class="fillcontain">
        <head-top></head-top>
         <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-button
            size="medium"
            type="primary"
            @click="addAirplane()">添加飞机</el-button>
         <el-dialog title="修改飞机信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">

                    <el-form-item label="飞机型号" label-width="100px" prop="model">
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

                    <el-form-item label="部队编号" label-width="100px">
                        <el-input v-model="selectTable.army_id"></el-input>
                    </el-form-item>

                    <el-form-item label="生产厂家" label-width="100px">
                        <el-input v-model="selectTable.factory"></el-input>
                    </el-form-item>

                    <el-form-item label="生产时间" label-width="100px">
                                <el-date-picker
                            v-model="selectTable.date"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>

                    <el-form-item label="所属单位" label-width="100px">
                        <el-input v-model="selectTable.unit"></el-input>
                    </el-form-item>


                    <el-form-item label="飞行时间" label-width="100px">
                        <el-input type="number" v-model="selectTable.airTime"></el-input>
                    </el-form-item>

                    <el-form-item label="总飞行起落" label-width="100px">
                        <el-input type="number" v-model="selectTable.airUpOrDown"></el-input>
                    </el-form-item>

                    <el-form-item label="飞行小时" label-width="100px">
                        <el-input type="number" v-model="selectTable.airHour"></el-input>
                    </el-form-item>

                    <el-form-item label="阶段起落" label-width="100px">
                        <el-input type="number" v-model="selectTable.stageUpOrDown"></el-input>
                    </el-form-item>

                    <el-form-item label="发动机1小时数" label-width="100px">
                        <el-input type="number" v-model="selectTable.engine_1"></el-input>
                    </el-form-item>

                    <el-form-item label="发动机2小时" label-width="100px">
                        <el-input type="number" v-model="selectTable.engine_2"></el-input>
                    </el-form-item>

                    <el-form-item label="飞机状态" label-width="100px">
                        <el-input v-model="selectTable.state"></el-input>
                    </el-form-item>

                    <el-form-item label="飞机任务状态" label-width="100px">
                        <el-input v-model="selectTable.task"></el-input>
                    </el-form-item>

                    <el-form-item label="操作时间" label-width="100px">
                        <el-input  v-model="selectTable.create_time"></el-input>
                    </el-form-item>

                    <el-form-item  label="阶段飞行小时" label-width="100px">
                        <el-input type="number" v-model="selectTable.stageUpOrDownTime"></el-input>
                    </el-form-item>

                    <el-form-item label="大修次数" label-width="100px">
                        <el-input v-model="selectTable.repairNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="飞机图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAirplane">确 定</el-button>
              </div>
            </el-dialog>
    <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table> -->
        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog> -->

        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
                              <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                       <el-form-item label="飞机型号">
                        <span>{{ props.row.model }}</span>
                      </el-form-item>

                <el-form-item label="出厂号码">
                        <span>{{ props.row.code }}</span>
                      </el-form-item>

                      <el-form-item label="部队编号">
                        <span>{{ props.row.army_id }}</span>
                      </el-form-item>

                      <el-form-item label="生产厂家">
                        <span>{{ props.row.factory }}</span>
                      </el-form-item>

                      <el-form-item label="生产时间">
                        <span>{{ props.row.date }}</span>
                      </el-form-item>

                      <el-form-item label="所属单位">
                        <span>{{ props.row.unit }}</span>
                      </el-form-item>

                      <el-form-item label="飞行时间">
                        <span>{{ props.row.airTime }}</span>
                      </el-form-item>

                      <el-form-item label="总飞行起落">
                        <span>{{ props.row.airUpOrDown }}</span>
                      </el-form-item>

                      <el-form-item label="飞行小时">
                        <span>{{ props.row.airHour }}</span>
                      </el-form-item>

                      <el-form-item label="阶段起落">
                        <span>{{ props.row.stageUpOrDown }}</span>
                      </el-form-item>

                      <el-form-item label="发动机1小时数">
                        <span>{{ props.row.engine_1 }}</span>
                      </el-form-item>

                      <el-form-item label="发动机2小时">
                        <span>{{ props.row.engine_2 }}</span>
                      </el-form-item>

                      <el-form-item label="飞机图片">
                        <span>{{ props.row.image_path }}</span>
                      </el-form-item>

                      <el-form-item label="飞机状态">
                        <span>{{ props.row.state }}</span>
                      </el-form-item>

                      <el-form-item label="飞机任务状态">
                        <span>{{ props.row.task }}</span>
                      </el-form-item>

                      <el-form-item label="操作时间">
                        <span>{{ props.row.create_time }}</span>
                      </el-form-item>

                      <el-form-item label="阶段飞行小时">
                        <span>{{ props.row.stageUpOrDownTime }}</span>
                      </el-form-item>

                      <el-form-item label="大修次数">
                        <span>{{ props.row.repairNumber }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
		      <el-table-column
		        prop="model"
		        label="飞机型号"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="code"
		        label="出厂号码"
		        width="120">
		      </el-table-column>
              <el-table-column
                prop="army_id"
                label="部队编号"
                width="180">
              </el-table-column>
            <el-table-column
                prop="unit"
                label="所属单位"
                width="120">
              </el-table-column>
              <el-table-column
                prop="airHour"
                label="飞行小时"
                width="180">
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
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getAirplane,getAirplaneCount,getAirplaneById,updateAirplane,deleteAirplane,addAirplane,getConfig } from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import UploadExcelComponent from '../components/index.vue'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                tableData: [],
                tableHeader: [],
                airType: {}
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
                    const countData = await getAirplaneCount();
                    console.log(countData);
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getAirplane();
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
                this.getAirplane()
            },
            async getAirplane(){
                try{
                    const res = await getAirplane({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                airplane_id: item.airplane_id,
                                type: item.type, // 机型
                                model: item.model,       // 飞机型号
                                code: item.code,        // 出厂号码
                                army_id: item.army_id, // 部队编号
                                factory: item.factory, // 生产厂家
                                date: item.date, // 生产时间
                                unit: item.unit, // 所属单位
                                airTime: item.airTime, // 飞行时间
                                airUpOrDown: item.airUpOrDown, // 总飞行起落
                                yairUpOrDown: item.yairUpOrDown, // 已飞行起落
                                airHour: item.airHour, // 飞行小时
                                yairHour: item.yairHour, // 已行小时
                                stageUpOrDown: item.stageUpOrDown, // 阶段起落
                                engine_1: item.engine_1, // 发动机1小时数
                                engine_2: item.engine_2, // 发动机2小时
                                image_path: item.image_path, // 飞机图片
                                stageUpOrDownTime: item.stageUpOrDownTime, // 阶段飞行小时
                                repairNumber: item.repairNumber, // 大修次数
                                repairFactory: item.repairFactory, // 大修次数
                                state: item.state, // 飞机状态
                                task: item.task, // 飞机飞机任务状态
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
                const airplane = await getAirplaneById(row.airplane_id);
                console.log(airplane);
                this.selectTable = {...row, ...{
                    model: airplane.model,
                    code: airplane.code,
                    army_id: airplane.army_id,
                    unit: airplane.unit,
                    airHour: airplane.airHour,
                    image_path: airplane.image_path}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updateAirplane(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateAirplane(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getAirplane();
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
                    const res = await deleteAirplane(row.airplane_id);
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
            uploadImg(res, file) {
				if (res.status == 1) {
					this.formData.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            addAirplane() {
                this.$router.push('/addAirplane');
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
                    let result = await addAirplane(iterator);
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
    .el-table .cell {
        text-align: center;
    }
</style>


