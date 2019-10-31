<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="型号" prop="filed1">
						<el-input v-model="formData.filed1"></el-input>
					</el-form-item>
					<el-form-item label="出厂号码" prop="filed2">
						<el-input v-model.number="formData.filed2" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="制造厂" prop="filed3">
						<el-input v-model="formData.filed3"></el-input>
					</el-form-item>
					<el-form-item label="日历寿命" prop="filed4">
						<el-input v-model="formData.filed4"></el-input>
					</el-form-item>
					<el-form-item label="出厂日期" prop="filed5">
						<el-input v-model="formData.filed5"></el-input>
					</el-form-item>
                    <el-form-item label="总挂飞小时" prop="filed6">
						<el-input v-model="formData.filed5"></el-input>
					</el-form-item>
                    <el-form-item label="已挂飞小时" prop="filed7">
						<el-input v-model="formData.filed5"></el-input>
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
    import { addAmmo } from '@/api/getData'
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
                    filed7: ''

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
				}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    	},
    	methods: {
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							let result = await addAmmo(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
                                    filed1: '', //店铺名称
                                    filed2: '', //性别
                                    filed3: '', // 分队
                                    filed4: '', // 工种
                                    filed5: '', // 联系方式
                                    filed6: '', // 备注
                                    filed7: ''
                                };
                                this.$router.push('/Ammo');
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
