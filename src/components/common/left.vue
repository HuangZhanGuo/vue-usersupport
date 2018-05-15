<template>
<div id="side">
	<ul class="nav">
		<li class="module-1 item-manager" v-for='item in items'>
			<span class="big_class" @click='showToggle(item)'>{{item.name}}</span>
			<div class="module-2">
				<ul class="nav" v-if='item.isSubShow'>
					<li v-for='subItem in item.subItems'>
						<span class="glyphicon glyphicon-signal">
						</span>
						<span>
							&nbsp;&nbsp;
							<span @click='runItemPage(subItem.url)'>{{subItem.name}}</span>
						</span>
					</li>
				</ul>
			</div>
		</li>
	</ul>
</div>
</template>


<script>

import $ from 'jquery'
import Content from './content'
export default {
	name: 'left',
	data () {
		return {
			isTrueForShow: false,
			items: [
				{
					name: '系统设置',
					isSubShow: false,
					subItems:  [
						{
							name: '基本信息',
							url: '/sc/base_infomation',
						},
						{
							name: '修改密码',
							url: '/sc/reset_password',
						}
					]
				},
				{
					name: '业务查询',
					isSubShow: false,
					subItems:  [
						{
							name: '债权还款查询',
							url: '/service/search',
						},
						{
							name: '订单还款查询',
							url: '/service/orderSearch',
						}
					]
				},
				{
					name: '日志管理',
					isSubShow: false,
					subItems:  [
						{
							name: '资金记录',
							url: '/money/moneyRecord',
						},
						{
							name: '资金流水',
							url: '/log/generalJournal',
						}
					]
				},
				{
					name: '客服服务',
					isSubShow: false,
					subItems:  [
						{
							name: '客户服务',
							url: '/customer/customerRecord',
						},
						{
							name: '服务列表',
							url: '/customer/showService',
						}
					]
				},
				{
					name: '权限管理',
					isSubShow: false,
					subItems:  [
						{
							name: '用户角色管理',
							url: '/role/userManage',
						},
						{
							name: '角色管理',
							url: '/role/userManage',
						},
						{
							name: '资源管理',
							url: '/menu/menuManage',
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
						},
						{
							name: '管理用户',
							url: '/um/managerment',
						},
						{
							name: '用户登录流水',
							url: '/um/loginRecord',
						}
					]
				},
				{
					name: '考勤系统',
					isSubShow: false,
					subItems:  [
						{
							name: '加班管理',
							url: '/attendance/overtime',
						},
						{
							name: '调休管理',
							url: '/attendance/rest',
						},
						{
							name: '请假管理',
							url: '/attendance/leave',
						},
						{
							name: '审核管理',
							url: '/attendance/deal',
						},
						{
							name: '考勤管理',
							url: '/attendance/attendance',
						},
						{
							name: '统计',
							url: '/attendance/acount',
						}
					]
				}
			]
		}
	},
	component: {

	},	
	methods: {
		showToggle: function(item) {
			item.isSubShow = !item.isSubShow;
		},
		runItemPage: function(url) {
			Content.methods.runPage(url);
		}
	}
}
</script>


<style scoped>
#side {
	width: 160px;
	height: 585px;
	background-color: #151927;
	border-right: 4px solid #D8D6D6;
	border-top: 5px solid #18A7CE;
	border-radius: 1%;
	float: left;
	position: absolute;
	z-index: auto;
	overflow: hidden;
}

#side ul .module-1 .big_class a {
	color: #FFFFFF;
}

#side ul .module-1:hover .big_class a {
	color: #030000;
	text-decoration: none; 
}

#side ul .module-1 {
	padding: 15px 0px 15px 25px;
	font-size: 18px;
	cursor: pointer;
	border-bottom: 1px outset #ECEBEB;
}


#side ul .module-1 .big_class {
	color: #FFFFFF;
}

#side ul .module-1:hover {
	background-color: #FEFEFE;	
	color: #030000;
}

#side ul .module-1:hover .big_class {
	color: #030000;
}

#side ul .module-1 .module-2 ul li span {
	color: #FFFFFF;
}

#side ul .module-1:hover .module-2 ul li span {
	color: #000000;
}

#side ul .module-1 .module-2 ul li span a {
	color: #FFFFFF;
}

#side ul .module-1:hover .module-2 ul li span a {
	color: #000000;
}

#side ul .module-1 .module-2 {
	padding-top: 5px;
	padding-left: 5px;
	text-align: left;
	font-size: 14px;
}
</style>