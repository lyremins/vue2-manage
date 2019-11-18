<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="showConfig">
        <div class="textBox">
            <el-divider content-position="center">飞机状态管理</el-divider>
            <div class="list" v-for="(value,index) in state">
                <!-- <input type="text" v-model="state[index]" name="" id=""> -->
                <el-input style="width: 150px" v-model="state[index]" auto-complete="off"></el-input>
                <el-button @click="stateDel(index)" >删除</el-button>
            </div>


            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;" v-model="inputState" placeholder="添加一项飞机状态"></el-input>
                <el-button type="primary" @click="saveState()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">飞机任务管理：</el-divider>
            <div class="list" v-for="(value,index) in task">
                <el-input style="width: 150px" v-model="task[index]" auto-complete="off"></el-input>
                <el-button @click="taskDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputTask" placeholder="添加一项飞机任务"></el-input>
                <el-button type="primary" @click="saveTask()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">飞机故障管理：</el-divider>
            <div class="list" v-for="(value,index) in fault">
                <el-input style="width: 150px" v-model="fault[index]" auto-complete="off"></el-input>
                <el-button @click="faultDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputFault" placeholder="添加一项飞机故障"></el-input>
                <el-button type="primary" @click="saveFault()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">飞机科目管理：</el-divider>
            <div class="list" v-for="(value,index) in subject">
                <el-input style="width: 150px" v-model="subject[index]" auto-complete="off"></el-input>
                <el-button @click="subjectDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputSubject" placeholder="添加一项飞机科目"></el-input>
                <el-button type="primary" @click="saveSubject()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">气象科目管理：</el-divider>
            <div class="list" v-for="(value,index) in scene">
                <el-input style="width: 150px" v-model="scene[index]" auto-complete="off"></el-input>
                <el-button @click="sceneDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputScene" placeholder="添加一项气象科目"></el-input>
                <el-button type="primary" @click="saveScene()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">车辆状态管理：</el-divider>
            <div class="list" v-for="(value,index) in carState">
                <el-input style="width: 150px" v-model="carState[index]" auto-complete="off"></el-input>
                <el-button @click="carStateDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputCarState" placeholder="添加一项车辆状态"></el-input>
                <el-button type="primary" @click="saveCarState()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">车辆任务状态管理：</el-divider>
            <div class="list" v-for="(value,index) in carTask">
                <el-input style="width: 150px" v-model="carTask[index]" auto-complete="off"></el-input>
                <el-button @click="carTaskDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputCarTask" placeholder="添加一项车辆任务状态"></el-input>
                <el-button type="primary" @click="saveCarTask()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">车辆类型管理：</el-divider>
            <div class="list" v-for="(value,index) in carType">
                <el-input style="width: 150px" v-model="carType[index]" auto-complete="off"></el-input>
                <el-button @click="carTypeDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputCarType" placeholder="添加一项车辆类型"></el-input>
                <el-button type="primary" @click="saveCarType()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">车辆故障管理：</el-divider>
            <div class="list" v-for="(value,index) in carFault">
                <el-input style="width: 150px" v-model="carFault[index]" auto-complete="off"></el-input>
                <el-button @click="carFaultDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputCarFault" placeholder="添加一项车辆故障"></el-input>
                <el-button type="primary" @click="saveCarFault()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">人员类别管理：</el-divider>
            <div class="list" v-for="(value,index) in pType">
                <el-input style="width: 150px" v-model="pType[index]" auto-complete="off"></el-input>
                <el-button @click="pTypeDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputPType" placeholder="添加一项人员类别"></el-input>
                <el-button type="primary" @click="savePType()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">人员专业管理：</el-divider>
            <div class="list" v-for="(value,index) in pMajor">
                <el-input style="width: 150px" v-model="pMajor[index]" auto-complete="off"></el-input>
                <el-button @click="pMajorDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;" v-model="inputPMajor" placeholder="添加一项人员专业"></el-input>
                <el-button type="primary" @click="savePMajor()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">人员职务管理：</el-divider>
            <div class="list" v-for="(value,index) in pPost">
                <el-input style="width: 150px" v-model="pPost[index]" auto-complete="off"></el-input>
                <el-button @click="pPostDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputPPost" placeholder="添加一项人员职务"></el-input>
                <el-button type="primary" @click="savePPost()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">保障任务管理：</el-divider>
            <div class="list" v-for="(value,index) in ensure">
                <el-input style="width: 150px" v-model="ensure[index]" auto-complete="off"></el-input>
                <el-button @click="ensureDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputEnsure" placeholder="添加一项保障任务"></el-input>
                <el-button type="primary" @click="saveEnsure()">立即创建</el-button>
            </div>
        </div>

            <div class="textBox">
            <el-divider content-position="center">人员工作状态管理：</el-divider>
            <div class="list" v-for="(value,index) in pStatus">
                <el-input style="width: 150px" v-model="pStatus[index]" auto-complete="off"></el-input>
                <el-button @click="pStatusDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputPStatus" placeholder="添加一项人员工作状态"></el-input>
                <el-button type="primary" @click="savePStatus()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">车辆工作状态管理：</el-divider>
            <div class="list" v-for="(value,index) in carWork">
                <el-input style="width: 150px" v-model="carWork[index]" auto-complete="off"></el-input>
                <el-button @click="carWorkDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputCarWork" placeholder="添加一项车辆工作状态"></el-input>
                <el-button type="primary" @click="saveCarWork()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">飞机类型管理：</el-divider>
            <div class="list" v-for="(value,index) in airType">
                <el-input style="width: 150px" v-model="airType[index]" auto-complete="off"></el-input>
                <el-button @click="airTypeDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputairType" placeholder="添加一项飞机类型"></el-input>
                <el-button type="primary" @click="saveairType()">立即创建</el-button>
            </div>
        </div>

        <div class="textBox">
            <el-divider content-position="center">故障排除方法管理：</el-divider>
            <div class="list" v-for="(value,index) in faultMethod">
                <el-input style="width: 150px" v-model="faultMethod[index]" auto-complete="off"></el-input>
                <el-button @click="faultMethodDel(index)" >删除</el-button>
            </div>

            <div class="create">
                <el-input  style="width: 200px;margin-left: 10px;"  v-model="inputfaultMethod" placeholder="添加一项故障排除方法"></el-input>
                <el-button type="primary" @click="savefaultMethod()">立即创建</el-button>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="button">
            <el-button type="success" @click="submit()" round>确认提交</el-button>
        </div>
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
                airType: [],
                airType_s: '',
                faultMethod: [],
                faultMethod_s: '',
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
                inputairType: '',
                inputfaultMethod: '',
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
                    this.airType = this.configData.data[0].airTypeModel.split(",");
                    this.faultMethod = this.configData.data[0].faultMethodModel.split(",");
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            saveState() {
                console.log(this.state);
                this.state_s = this.state + "," + this.inputState;
                this.state = this.state_s.split(",");
            },
            stateDel(index) {
                this.state.splice(index, 1);
            },
            taskDel(index) {
                this.task.splice(index, 1);
            },
            faultDel(index) {
                this.fault.splice(index, 1);
            },
            subjectDel(index) {
                this.subject.splice(index, 1);
            },
            sceneDel(index) {
                this.scene.splice(index, 1);
            },
            carStateDel(index) {
                this.carState.splice(index, 1);
            },
            carTaskDel(index) {
                this.carTask.splice(index, 1);
            },
            carTypeDel(index) {
                this.carType.splice(index, 1);
            },
            carFaultDel(index) {
                this.carFault.splice(index, 1);
            },
            pTypeDel(index) {
                this.pType.splice(index, 1);
            },
            pMajorDel(index) {
                this.pMajor.splice(index, 1);
            },
            pPostDel(index) {
                this.pPost.splice(index, 1);
            },
            ensureDel(index) {
                this.ensure.splice(index, 1);
            },
            pStatusDel(index) {
                this.pStatus.splice(index, 1);
            },
            carWorkDel(index) {
                this.carWork.splice(index, 1);
            },
            airTypeDel(index) {
                this.airType.splice(index, 1);
            },
            faultMethodDel(index) {
                this.faultMethod.splice(index, 1);
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
            savefaultMethod() {
                this.faultMethod_s = this.faultMethod + "," + this.inputfaultMethod;
                this.faultMethod = this.faultMethod_s.split(",");
            },
            saveairType() {
                this.airType_s = this.airType + "," + this.inputairType;
                this.airType = this.airType_s.split(",");
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
                    airTypeModel: this.airType,
                    faultMethodModel: this.faultMethod,
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
    .list {
        display: inline-block;
        margin: 10px;
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
    .showTitle {
        // text-align: left;
    }
    .textBox {
        input {
            text-align: center;
            font-size: 14PX;
        }
            // display: flex;
            // justify-content: space-between;
            // width: 700px;
    }
    .create {
        text-align: center;
        // display: flex;
        // text-align: center;
    }
    .button {
        text-align: center;
    }
</style>


