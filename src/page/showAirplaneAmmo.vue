<template>
    <div>
        <head-top></head-top>
        <div class="selectBox">
            <span class="seText">选择飞机：</span>
            <select v-model="selectAirplane">
                <option v-for="v in airPlane.data" :value="v.code">{{v.code}}</option>
            </select>
            <button @click="search()" class="search">查询</button>
            <button @click="searchAll()" class="search">查询全部</button>
        </div>
        <div>
            <table>
                <tr>
                    <td>飞机_弹药编号</td>
                    <td>总寿命</td>
                    <td>余寿</td>
                </tr>
                <tr v-for="v in ammoData">
                    <td>{{v.air_code}}_{{v.ammo_code}}</td>
                    <td>{{v.zsm}}</td>
                    <td>{{v.sm}}</td>
                </tr>
            </table>
        </div>
            <el-table
            :data="ammoData"
            style="width: 100%">
            <el-table-column
                prop="air_code"
                label="飞机_弹药编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="zsm"
                label="总寿命"
                width="180">
            </el-table-column>
            <el-table-column
                prop="sm"
                label="余寿">
            </el-table-column>
            </el-table>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {
        getAirplaneAmmo,
        getAirplane } from '@/api/getData'
    export default {
    	data(){
    		return {
                formData: {
                    model: '',
                    code: '',
                    type: '',
                    army_id: '',
                    airHour: '',
                    yairHour: '',
                    airUpOrDown: '',
                    yairUpOrDown: '',
                    image_path: '',
                    factory: '',
                    stageUpOrDown: '',
                    engine_1: '',
                    engine_2: '',
                    state: '',
                    task: '',
                    stageUpOrDownTime: '',
                    repairNumber:'',
                    repairFactory:'',
                    unit: ''
                },
                showAlert: false,
                alertText: '',
                stateModel: [],
                taskModel: [],
                organizData: {},
                showOrganiz: false,
                ammoData: {},
                deviceData: {},
                checked: false,
                subitem: {
                    isCheck: false
                },
                air: [],
                newData: [],
                device: [],
                airplaneIndex: '',
                device: this.$util.getUrlKey('device'),
                airPlane: {},
                selectAirplane: '',
                oldPlaneData: {}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            this.init();
    	},
    	methods: {
            async init() {
                this.ammoData = await getAirplaneAmmo();
                this.airPlane = await getAirplane();
                this.ammoData = this.ammoData.data;
                this.oldPlaneData = this.ammoData;
                console.log(this.oldPlaneData);
            },
            search() {
                console.log(this.oldPlaneData);
                this.ammoData = this.oldPlaneData.filter(
                    item => item.air_code === this.selectAirplane
                )
                console.log(this.ammoData);

            },
            searchAll() {
                this.ammoData = this.oldPlaneData;
            }
		}
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .content {
        margin-left: 20px;
    }
</style>
