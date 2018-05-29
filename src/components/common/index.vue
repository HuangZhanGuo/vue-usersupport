<template>
<div>
<el-header style="height: 50px; text-align: left; font- : 12px; background-color: #31263D">
  <span style="color: #FFFFFF; font-size: 18px; padding-bottom: -10px">笑脸金融客服助手管理系统 V1.1.0</span>
	<span class="loginout"><el-button type="danger" round @click="login_out">注销</el-button></span>
</el-header>
<el-container style="height: 590px; border: 1px solid #eee">
  <el-aside width="160px" style="background-color: #31263D">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu :index="index+1" v-for="(item,index) in items" :key="index">
        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.code" v-for="(subItem,subItemIndex) in item.subItems" :key="subItemIndex">
          	<router-link :to='subItem.url'>{{subItem.name}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

  <el-main>
	  	<router-view></router-view>
  </el-main>
</el-container>
</div>
</template>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
	.loginout{
	position: absolute;
	right: 10px;
}
</style>

<script scode>

  export default {
	name: 'index',
	data () {
		return {
			items: [
				{
					name: '系统设置',
					isSubShow: false,
					subItems:  [
						{
							name: '基本信息',
							url: '/sc/base_infomation',
							isSubItemShow: false,
							code: '1-1'
						},
						{
							name: '修改密码',
							url: '/sc/reset_password',
							isSubItemShow: false,
							code: '1-2'
						}
					]
				},
				{
					name: '业务查询',
					isSubShow: false,
					subItems:  [
						{
							name: '债权还款查询',
							url: '/serviceManagerment/search',
							isSubItemShow: false,
							code: '2-1'
						},
						{
							name: '订单还款查询',
							url: '/service/orderSearch',
							isSubItemShow: false,
							code: '2-2'
						}
					]
				},
				{
					name: '日志管理',
					isSubShow: false,
					subItems:  [
						{
							name: '资金记录',
							url: '/logManagement/moneyRecord',
							code: '3-1'
						},
						{
							name: '资金流水',
							url: '/logManagement/generalJournal',
							code: '3-2'
						}
					]
				},
				{
					name: '客服服务',
					isSubShow: false,
					subItems:  [
						{
							name: '客户服务',
							url: '/customerService/customerRecord',
							code: '4-1'
						},
						{
							name: '服务列表',
							url: '/customerService/showService',
							code: '4-2'
						}
					]
				},
				{
					name: '权限管理',
					isSubShow: false,
					subItems:  [
						{
							name: '用户角色管理',
							url: '/pm/userManager',
							code: '5-1'
						},
						{
							name: '角色管理',
							url: '/pm/roleManager',
							code: '5-2'
						},
						{
							name: '资源管理',
							url: '/pm/menuManager',
							code: '5-3'
						}
					]
				},
				{
					name: '用户管理',
					isSubShow: false,
					subItems:  [
						{
							name: '增加用户',
							url: '/um/addUser',
							code: '6-1'
						},
						{
							name: '管理用户',
							url: '/um/managerment',
							code: '6-2'
						},
						{
							name: '用户登录流水',
							url: '/um/loginRecord',
							code: '6-3'
						}
					]
				},
				{
					name: '考勤系统',
					isSubShow: false,
					subItems:  [
						// {
						// 	name: '加班管理',
						// 	url: '/attendance/overtime',
						// 	code: '7-1'
						// },
						// {
						// 	name: '调休管理',
						// 	url: '/attendance/rest',
						// 	code: '7-2'
						// },
						// {
						// 	name: '请假管理',
						// 	url: '/attendance/leave',
						// 	code: '7-3'
						// },
						// {
						// 	name: '审核管理',
						// 	url: '/attendance/deal',
						// 	code: '7-4'
						// },
						{
							name: '考勤管理',
							url: '/attendance/attendance',
							code: '7-5'
						},
						{
							name: '统计',
							url: '/attendance/acount',
							code: '7-6'
						}
					]
				}
			]
		}
	},
	methods:{
		login_out:function(){
    sessionStorage.removeItem("isLogin")
    this.$store.dispatch('login',false);
    window.location.href = "#/";
		}
	},
	component : {

	},
  };
</script>
