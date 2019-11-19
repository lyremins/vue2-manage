<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="人员姓名" prop="user_name">
						<el-input v-model="formData.user_name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
                            <el-select v-model="formData.sex">
                                <el-option
                                v-for="(item,index) in sex"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="类别" prop="type">
                            <el-select v-model="formData.type">
                                <el-option
                                v-for="(item,index) in gz"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="备注" prop="remark">
						<el-input v-model="formData.remark"></el-input>
					</el-form-item>
					<el-form-item label="籍贯" prop="native">
						<el-input v-model="formData.native"></el-input>
					</el-form-item>
					<el-form-item label="单位" prop="company">
						<!-- <el-input v-model="formData.company"></el-input> -->
                        <el-select v-model="formData.company" placeholder="请选择单位"  style="width: 360px" ref="selectReport">
                        <el-option :value="formData.company" :label="formData.company" style="width: 560px;height:200px;overflow: auto;background-color:#fff">
                            <el-tree
                                :data="organiz"
                                @node-click="handleNodeClick"
                            ></el-tree>
                        </el-option>
                    </el-select>
					</el-form-item>
					<el-form-item label="职务" prop="post">
                            <el-select v-model="formData.post">
                                <el-option
                                v-for="(item,index) in zw"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="专业" prop="major">
                            <el-select v-model="formData.major">
                                <el-option
                                v-for="(item,index) in zy"
                                :key="index"
                                :label="item"
                                :value="item"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="等级" prop="grade">
						<el-input v-model="formData.grade"></el-input>
					</el-form-item>
					<el-form-item label="绑定飞机" prop="bindAir">
                        <el-select v-model="formData.bindAir">
                                <el-option
                                v-for="(item,index) in air"
                                :key="index"
                                :label="item.code"
                                :value="item.code"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="入伍时间" prop="enlist">
                        <el-date-picker
                            v-model="formData.enlist"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
					</el-form-item>
					<el-form-item label="毕业院校" prop="school">
						<el-input v-model="formData.school"></el-input>
					</el-form-item>
					<el-form-item label="执行重大任务" prop="greatTask">
						<el-input v-model="formData.greatTask"></el-input>
					</el-form-item>
                    <el-form-item label="是否在岗" prop="duty">
                        <el-select v-model="formData.duty">
                                <el-option
                                v-for="(item,index) in zg"
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
    import { addPersonnel,getAirplane,getConfig,getOrganiz } from '@/api/getData'
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					user_name: '', //店铺名称
                    sex: '', //性别
                    detachment: '', // 分队
                    type: '', // 工种
                    phone: '', // 联系方式
                    remark: '', // 备注
					organiz: '',// 组织架构
					native: '',// 籍贯
					company: '',// 单位
					row: '', // 排
					post: '', // 职务
					major: '', // 专业
					grade: '', // 等级
					bindAir: '', // 绑定飞机
					enlist: '', // 入伍时间
					school: '', // 毕业院校
                    greatTask: '', //执行重大任务
                    duty: '', //是否在岗
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
                air: {},
                gz: {},
                zw: {},
                zy: {},
                zg: ['是','否'],
                organiz: [],
                sex: ['男','女']
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
							let result = await addPersonnel(this.formData);
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
									remark: '', // 备注
									organiz: '',// 组织架构
									native: '',// 籍贯
									company: '',// 单位
									row: '', // 排
									post: '', // 职务
									major: '', // 专业
									grade: '', // 等级
									bindAir: '', // 绑定飞机
									enlist: '', // 入伍时间
									school: '', // 毕业院校
									greatTask: '', //执行重大任务
                                };
                                this.$router.push('/personnel');
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
                this.gz = config.data[0].pTypeModel.split(",");
                this.zw = config.data[0].pPostModel.split(",");
                this.zy = config.data[0].pMajorModel.split(",");
                const airplane = await getAirplane();
                this.air = airplane.data
                this.organiz = await getOrganiz();
                this.organiz = this.organiz.data[0].organizArray;
                // this.organiz = this.organiz[0].organizArray
            },
            handleNodeClick(node){
                console.log(node,'node')
                if(node.children.length){
                    console.log('11111');
                }else{
                    console.log('22233');
                    this.formData.company = node.label
                    console.log(this.formData.company);
                    this.$refs.selectReport.blur()
                }
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
