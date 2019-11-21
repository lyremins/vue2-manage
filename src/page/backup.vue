<template>
    <div v-loading="loading"
    element-loading-text="数据备份中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" class="fillcontain">
        <head-top></head-top>
    <div class="drop" style="margin-top: 50px;">
      备份系统数据
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="download">
        开始备份
      </el-button>
    </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data(){
            return {
                downloadhttp:'http://192.168.199.143:8002/img/16e8d7cbc982.png',
                loading: false
            }
        },
    	components: {
    		headTop,
    	},
        created(){

        },
        methods: {
            download() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$message.success('备份成功！');
                    window.location.href="http://users.cis.fiu.edu/~lpeng/datasets/DB_3.rar";
                }, 10000);
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
        }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
     .el-table th.is-leaf {
        text-align: center;
    }
    .el-table .cell {
        text-align-last: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
    .table_container{
        margin: 0 15%;
        padding: 20px;
    }
    .fa {
        font-size: 60px;
        color: #3d94e2;
    }
    .box {
        position: relative;
        // display: flex;
        // justify-content: space-between;
        // flex-direction: row;
        // flex-wrap: wrap;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        .title {
            // text-align: center;
        }
        .state {
            font-size: 12px;
            position: absolute;
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            top: -10%;
        }
        .wh {
            background-color: green;
        }
        .fault{
            background-color: red;
        }
        .try {
            background-color: grey;
        }
        .task {
            font-size: 12px;
            margin: 10px 0;
        }
        .air {
            display: inline-block;
            text-align: center;
            position: relative;
            margin: 10PX;
        }
        .car {
            text-align: center;
            position: relative;
            margin: 40PX;
        }
    }

</style>


