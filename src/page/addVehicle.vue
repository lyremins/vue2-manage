<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="车辆名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="型号" prop="model">
                            <el-select v-model="formData.model">
                                <el-option
                                v-for="(item,index) in carType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="出厂号码" prop="code">
						<el-input v-model="formData.code"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="state">
						<el-input v-model="formData.state"></el-input>
					</el-form-item>
					<el-form-item label="单位" prop="organiz">
						<el-input v-model="formData.organiz"></el-input>
					</el-form-item>
					<el-form-item label="服务机型" prop="service">
                            <el-select v-model="formData.service">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="部队编号" prop="armyId">
						<el-input v-model="formData.armyId"></el-input>
					</el-form-item>
					<el-form-item label="生产厂" prop="product">
						<el-input v-model="formData.product"></el-input>
					</el-form-item>
					<el-form-item label="生产时间" prop="productTime">
						<el-input v-model="formData.productTime"></el-input>
					</el-form-item>
					<el-form-item label="总寿命" prop="life">
						<el-input v-model="formData.life"></el-input>
					</el-form-item>
					<el-form-item label="阶段行驶里程" prop="stageCourse">
						<el-input v-model="formData.stageCourse"></el-input>
					</el-form-item>
					<el-form-item label="大修次数" prop="repairNumber">
						<el-input v-model="formData.repairNumber"></el-input>
					</el-form-item>
					<el-form-item label="车辆任务状态" prop="taskState">
                            <el-select v-model="formData.taskState">
                                <el-option
                                v-for="(item,index) in carTaskType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import { addVehicle,getConfig } from '@/api/getData'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					name: '', //店铺名称
					model: '', //性别
					code: '',// 出厂号码
					state: '', // 状态
					organiz: '', // 单位
					service: '', // 服务机型
					armyId: '', // 部队编号
					product: '', // 生产厂
					productTime: '', // 生产时间
					life: '', // 总寿命
					stageCourse: '', // 阶段行驶里程
					repairNumber: '', // 大修次数
					taskState: '', // 车辆任务状态
		        },
		        rules: {

                },
                airType: {},
                carType: {},
                carTaskType: {}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            this.init();
    	},
    	methods: {
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							let result = await addVehicle(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
                                    name: '', //店铺名称
									model: '', //性别
									code: '', // 出厂号码
									state: '', // 状态
									organiz: '', // 单位
									service: '', // 服务机型
									armyId: '', // 部队编号
									product: '', // 生产厂
									productTime: '', // 生产时间
									life: '', // 总寿命
									stageCourse: '', // 阶段行驶里程
									repairNumber: '', // 大修次数
									taskState: '', // 车辆任务状态
                                };
                                this.$router.push('/vehicle');
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
            },
            async init() {
                const config = await getConfig();
                this.carType = config.data[0].carTypeModel.split(",");
                this.airType = config.data[0].airTypeModel.split(",");
                this.carTaskType = config.data[0].carTaskModel.split(",");
            }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
