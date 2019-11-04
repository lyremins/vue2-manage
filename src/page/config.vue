<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="showConfig">
        <p>飞机状态配置项：</p>
        <div class="textBox">
            <div v-for="(value,index) in state">
                <span>{{v}}</span>
                <input v-model="a.state[index]">
            </div>
        </div>
        <el-input v-model="inputState" placeholder="添加一项飞机状态"></el-input>
        <el-button type="primary" @click="saveState()">立即创建</el-button>

        <p>飞机任务配置项：</p>
        <div class="textBox">
            <div v-for="v in task">
                <span>{{v}}</span>
            </div>
        </div>
                <el-input v-model="inputTask" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveTask()">立即创建</el-button>

        <p>飞机故障配置项：</p>
        <div class="textBox">
            <div v-for="v in fault">
                <span>{{v}}</span>
            </div>
        </div>

                        <el-input v-model="inputFault" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveFault()">立即创建</el-button>

        <p>飞机科目配置项：</p>
        <div class="textBox">
            <div v-for="v in subject">
                <span>{{v}}</span>
            </div>
        </div>
                                <el-input v-model="inputSubject" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveSubject()">立即创建</el-button>

        <p>气象科目配置项：</p>
        <div class="textBox">
            <div v-for="v in scene">
                <span>{{v}}</span>
            </div>
        </div>

            <el-input v-model="inputScene" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveScene()">立即创建</el-button>

        <p>车辆状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carState">
                <span>{{v}}</span>
            </div>
        </div>

                    <el-input v-model="inputCarState" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveCarState()">立即创建</el-button>

        <p>车辆任务状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carTask">
                <span>{{v}}</span>
            </div>
        </div>

                            <el-input v-model="inputCarTask" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveCarTask()">立即创建</el-button>

        <p>车辆类型配置项：</p>
        <div class="textBox">
            <div v-for="v in carType">
                <span>{{v}}</span>
            </div>
        </div>
                                    <el-input v-model="inputCarType" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveCarType()">立即创建</el-button>

        <p>车辆故障配置项：</p>
        <div class="textBox">
            <div v-for="v in carFault">
                <span>{{v}}</span>
            </div>
        </div>

                                            <el-input v-model="inputCarFault" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveCarFault()">立即创建</el-button>

        <p>人员类别配置项：</p>
        <div class="textBox">
            <div v-for="v in pType">
                <span>{{v}}</span>
            </div>
        </div>

        <el-input v-model="inputPType" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="savePType()">立即创建</el-button>

        <p>人员专业配置项：</p>
        <div class="textBox">
            <div v-for="v in pMajor">
                <span>{{v}}</span>
            </div>
        </div>

                <el-input v-model="inputPMajor" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="savePMajor()">立即创建</el-button>

        <p>人员职务配置项：</p>
        <div class="textBox">
            <div v-for="v in pPost">
                <span>{{v}}</span>
            </div>
        </div>

                        <el-input v-model="inputPPost" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="savePPost()">立即创建</el-button>

        <p>保障任务配置项：</p>
        <div class="textBox">
            <div v-for="v in ensure">
                <span>{{v}}</span>
            </div>
        </div>

                                <el-input v-model="inputEnsure" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveEnsure()">立即创建</el-button>

        <p>人员工作状态配置项：</p>
        <div class="textBox">
            <div v-for="v in pStatus">
                <span>{{v}}</span>
            </div>
        </div>

                                        <el-input v-model="inputPStatus" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="savePStatus()">立即创建</el-button>

        <p>车辆工作状态配置项：</p>
        <div class="textBox">
            <div v-for="v in carWork">
                <span>{{v}}</span>
            </div>
        </div>

                                                <el-input v-model="inputCarWork" placeholder="添加一项任务状态"></el-input>
        <el-button type="primary" @click="saveCarWork()">立即创建</el-button>

        <el-button style="width:100%;" type="primary" @click="submit()">确认提交</el-button>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getConfig,updateConfig } from '@/api/getData'
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
                configData: {},
                airModel: '',
                state: [],
                state_s: '',
                task: [],
                task_s: '',
                fault: [],
                fault_s: '',
                subject: [],
                subject_s: '',
                scene: [],
                scene_s: [],
                carState: [],
                carState_s: '',
                carTask: [],
                carTask_s: '',
                carType: [],
                carType_s: '',
                carFault: [],
                carFault_s: '',
                pType: [],
                pType_s: '',
                pMajor: [],
                pMajor_s: '',
                pPost: [],
                pPost_s: '',
                ensure: [],
                ensure_s: '',
                pStatus: [],
                pStatus_s: '',
                carWork: [],
                carWork_s: '',
                inputState: '',
                inputTask: '',
                inputFault: '',
                inputSubject: '',
                inputScene: '',
                inputCarState: '',
                inputCarTask: '',
                inputCarType: '',
                inputCarFault: '',
                inputPType: '',
                inputPMajor: '',
                inputPPost: '',
                inputEnsure: '',
                inputPStatus: '',
                inputCarWork: '',
                showAlert: false,
                alertText: '',
                a: {
                    state: []
                }
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
                console.log('234');
                try{
                    this.getConfig();
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
                this.getAmmo()
            },
            async getConfig(){
                try{
                    this.configData = await getConfig();
                    this.state = this.configData.data[0].stateModel.split(",");
                    this.a.state = this.configData.data[0].stateModel.split(",");
                    this.task = this.configData.data[0].taskModel.split(",");
                    this.fault = this.configData.data[0].faultModel.split(",");
                    this.subject = this.configData.data[0].subjectModel.split(",");
                    this.scene = this.configData.data[0].sceneModel.split(",");
                    this.carState = this.configData.data[0].carStateModel.split(",");
                    this.carTask = this.configData.data[0].carTaskModel.split(",");
                    this.carType = this.configData.data[0].carTypeModel.split(",");
                    this.carFault = this.configData.data[0].carFaultModel.split(",");
                    this.pType = this.configData.data[0].pTypeModel.split(",");
                    this.pMajor = this.configData.data[0].pMajorModel.split(",");
                    this.pPost = this.configData.data[0].pPostModel.split(",");
                    this.ensure = this.configData.data[0].ensureModel.split(",");
                    this.pStatus = this.configData.data[0].pStatusModel.split(",");
                    this.carWork = this.configData.data[0].carWorkModel.split(",");
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            saveState() {
                this.state_s = this.state + "," + this.inputState;
                this.state = this.state_s.split(",");
            },
            saveTask() {
                this.task_s = this.task + "," + this.inputTask;
                this.task = this.task_s.split(",");
            },
            saveFault() {
                this.fault_s = this.fault + "," + this.inputFault;
                this.fault = this.fault_s.split(",");
            },
            saveSubject() {
                this.subject_s = this.subject + "," + this.inputSubject;
                this.subject = this.subject_s.split(",");
            },
            saveScene() {
                this.scene_s = this.scene + "," + this.inputScene;
                this.scene = this.scene_s.split(",");
            },
            saveCarState() {
                this.carState_s = this.carState + "," + this.inputCarState;
                this.carState = this.carState_s.split(",");
            },
            saveCarTask() {
                this.carTask_s = this.carTask + "," + this.inputCarTask;
                this.carTask = this.carTask_s.split(",");
            },
            saveCarType() {
                this.carType_s = this.carType + "," + this.inputCarType;
                this.carType = this.carType_s.split(",");
            },
            saveCarFault() {
                this.carFault_s = this.carFault + "," + this.inputCarFault;
                this.carFault = this.carFault_s.split(",");
            },
            savePType() {
                this.pType_s = this.pType + "," + this.inputPType;
                this.pType = this.pType_s.split(",");
            },
            savePMajor() {
                this.pMajor_s = this.pMajor + "," + this.inputPMajor;
                this.pMajor = this.pMajor_s.split(",");
            },
            savePPost() {
                this.pPost_s = this.pPost + "," + this.inputPPost;
                this.pPost = this.pPost_s.split(",");
            },
            saveEnsure() {
                this.ensure_s = this.ensure + "," + this.inputEnsure;
                this.ensure = this.ensure_s.split(",");
            },
            savePStatus() {
                this.pStatus_s = this.pStatus + "," + this.inputPStatus;
                this.pStatus = this.pStatus_s.split(",");
            },
            saveCarWork() {
                this.carWork_s = this.carWork + "," + this.inputCarWork;
                this.carWork = this.carWork_s.split(",");
            },
            handleEdit(index,row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                console.log(row);
                const device = await getAmmoById(row.ammo_id);
                console.log(device);
                this.selectTable = {...row, ...{
                    filed1: device.filed1,
                    filed2: device.filed2,
                    filed3: device.filed3,
                    filed4: device.filed4,
                    filed5: device.filed5,
                    filed6: device.filed6}};

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
                        this.getAmmo();
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
                this.$router.push('/addAmmo');
            },
            async submit() {
                const data = {
                    stateModel: this.state,
                    taskModel: this.task,
                    faultModel: this.fault,
                    subjectModel: this.subject,
                    sceneModel: this.scene,
                    carStateModel: this.carState,
                    carTaskModel: this.carTask,
                    carTypeModel: this.carType,
                    carFaultModel: this.carFault,
                    pTypeModel: this.pType,
                    pMajorModel: this.pMajor,
                    pPostModel: this.pPost,
                    ensureModel: this.ensure,
                    pStatusModel: this.pStatus,
                    carWorkModel: this.carWork,
                }
                const res = await updateConfig(data);
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
    .showConfig {
        margin: 20px;
        line-height: 3;
    }
    .textBox {
            display: flex;
            justify-content: space-between;
            width: 700px;
    }
</style>


