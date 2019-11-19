<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>基础数据管理</template>
						<el-menu-item index="personnel">机务人员管理</el-menu-item>
						<el-menu-item index="airplane">飞机管理</el-menu-item>
						<el-menu-item index="device">有寿器件管理</el-menu-item>
						<el-menu-item index="vehicle">车辆管理</el-menu-item>
						<el-menu-item index="ammo">弹药管理</el-menu-item>
						<el-menu-item index="airplaneDevice">飞机有寿器件管理</el-menu-item>
                        <el-menu-item index="airplaneAmmo">飞机弹药管理</el-menu-item>
                        <el-menu-item index="airplaneCar">飞机保障车辆管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>综合态势</template>
						<el-menu-item index="situation">飞机态势查看</el-menu-item>
					</el-submenu>
                    <el-submenu index="4">
						<template slot="title"><i class="el-icon-plus"></i>计划任务</template>
						<el-menu-item index="ensure">保障任务</el-menu-item>
						<el-menu-item index="plan">飞行计划</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-star-on"></i>历史数据分析</template>
						<el-menu-item index="visitor">历史回放</el-menu-item>
						<el-menu-item index="analys">数据分析</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-edit"></i>聊天</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="chat">聊天管理</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
                <router-view></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
