<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="器件名称" prop="filed1">
						<el-input v-model="formData.filed1"></el-input>
					</el-form-item>
					<el-form-item label="器件型号" prop="filed2">
						<el-input v-model.number="formData.filed2" maxLength="11"></el-input>
					</el-form-item>
                    <el-form-item label="适配机型" prop="filed3">
                        <el-select v-model="formData.filed3">
                                <el-option
                                v-for="(item,index) in air"
                                :key="index"
                                :label="item.code"
                                :value="item.code"></el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="制造厂" prop="filed4">
						<el-input v-model.number="formData.filed4" maxLength="11"></el-input>
					</el-form-item>
                    <el-form-item label="总寿命" prop="filed5">
						<el-input v-model="formData.filed5"></el-input>
					</el-form-item>
                    <el-form-item label="阈值" prop="filed6">
						<el-input v-model="formData.filed6"></el-input>
					</el-form-item>
					<el-form-item label="装机日期" prop="filed7">
                        <el-date-picker
                            v-model="formData.filed7"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
                    <el-form-item label="寿命" prop="filed8">
						<el-input v-model="formData.filed8"></el-input>
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
    import { addDevice,getAirplane } from '@/api/getData'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					filed1: '', //店铺名称
                    filed2: '', //性别
                    filed3: '', // 分队
                    filed4: '', // 工种
                    filed5: '', // 联系方式
                    filed6: '', // 备注
                    filed7: '', // 备注
                    filed8: '', // 备注

		        },
		        rules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    sex: [
						{ required: true, message: '请输入性别', trigger: 'blur' },
					],
					detachment: [
						{ required: true, message: '请输入所属分队', trigger: 'blur' }
                    ],
                    type: [
						{ required: true, message: '请输入所属工种', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
                },
                air: {}
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
							let result = await addDevice(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
                                    name: '', //店铺名称
                                    sex: '', //性别
                                    detachment: '', // 分队
                                    type: '', // 工种
                                    phone: '', // 联系方式
                                    remark: '' // 备注
                                };
                                this.$router.push('/device');
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
                const airplane = await getAirplane();
                this.air = airplane.data
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
