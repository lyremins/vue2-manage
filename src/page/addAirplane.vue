<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="上传飞机图片">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/airplane'"
						  :show-file-list="false"
						  :on-success="uploadImg"
						  :before-upload="beforeImgUpload">
						  <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
                    <el-form-item label="飞机型号" prop="model">
                            <el-select v-model="formData.model">
                                <el-option
                                v-for="(item,index) in airType"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                            </el-select>
					</el-form-item>
					<el-form-item label="出厂号码" prop="code">
						<el-input v-model.number="formData.code" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="部队编号" prop="army_id">
						<el-input v-model="formData.army_id"></el-input>
					</el-form-item>
					<el-form-item label="生产厂家" prop="factory">
						<el-input v-model="formData.factory"></el-input>
					</el-form-item>
					<el-form-item label="生产日期" prop="date">
                            <el-date-picker
                            v-model="formData.date"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
                    <el-form-item label="所属单位" prop="unit">
                            <el-select v-model="formData.unit">
                                <el-option
                                v-for="(item,index) in organiz.data"
                                :key="index"
                                :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
						<!-- <el-input v-model="formData.unit"></el-input> -->
					</el-form-item>
                    <el-form-item label="飞行时间" prop="airTime">
						<el-input type="number" v-model="formData.airTime"></el-input>
					</el-form-item>
                    <el-form-item label="总飞行起落" prop="airUpOrDown">
						<el-input type="number" v-model="formData.airUpOrDown"></el-input>
					</el-form-item>
                    <el-form-item label="飞行小时" prop="airHour">
						<el-input type="number" v-model="formData.airHour"></el-input>
					</el-form-item>
                    <el-form-item label="阶段起落" prop="stageUpOrDown">
						<el-input type="number" v-model="formData.stageUpOrDown"></el-input>
					</el-form-item>
                    <el-form-item label="发动机1小时数" prop="engine_1">
						<el-input type="number" v-model="formData.engine_1"></el-input>
					</el-form-item>
                    <el-form-item label="发动机2小时数" prop="engine_2">
						<el-input type="number" v-model="formData.engine_2"></el-input>
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
    import { addAirplane,getOrganiz,getConfig } from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
                city: {},
                baseUrl,
                baseImgPath,
    			formData: {
                    model: '',       // 飞机型号
                    code: '',        // 出厂号码
                    army_id: '', // 部队编号
                    factory: '', // 生产厂家
                    date: '', // 生产时间
                    unit: '', // 所属单位
                    airTime: '', // 飞行时间
                    airUpOrDown: '', // 总飞行起落
                    airHour: '', // 飞行小时
                    stageUpOrDown: '', // 阶段起落
                    engine_1: '', // 发动机1小时数
                    engine_2: '', // 发动机2小时
                    image_path: '' // 飞机图片

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
                organiz: {},
                airType: {}
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
							let result = await addAirplane(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
                                this.$router.push('/airplane');
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
            async init() {
                this.organiz = await getOrganiz();
                const config = await getConfig();
                this.airType = config.data[0].airTypeModel.split(",");
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
