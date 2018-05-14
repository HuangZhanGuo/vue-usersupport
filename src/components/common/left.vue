<template>
<div id="side">
	<ul class="nav">
		<li class="module-1 item-manager">
			<span class="big_class">系统设置</span>
			<div class="module-2">
				<ul class="nav">
					<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runUserBaseInfo()">基本信息</a></span></li>
					<li><span class="glyphicon glyphicon-stats"></span><span>&nbsp;&nbsp;<a href="javascript:runChangePassword()">修改密码</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1" sec:authorize="hasAnyAuthority('service')">
			<span class="big_class">业务查询</span>
			<div class="module-2">
				<ul class="nav">
					<li sec:authorize="hasAuthority('service')"><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runRepaymentSearch()">债权还款查询</a></span></li>
					<li sec:authorize="hasAuthority('service')"><span class="glyphicon glyphicon-stats"></span><span>&nbsp;&nbsp;<a href="javascript:runRepaymentOrderSearch()">订单还款查询</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1" sec:authorize="hasAnyAuthority('log','money')">
			<span class="big_class">日志管理</span>
			<div class="module-2">
				<ul class="nav">
					<li sec:authorize="hasAuthority('money')"><span class="glyphicon glyphicon-signal"></span><span><a href="javascript:moneyRecord()">资金记录</a></span></li>
					<li sec:authorize="hasAuthority('log')"><span class="glyphicon glyphicon-stats"></span><span><a href="javascript:generalJournal()">资金流水</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1" >
			<span class="big_class">客服服务</span>
			<div class="module-2">
				<ul class="nav">
					<!--<li><span class="glyphicon glyphicon-edit"></span><span>&nbsp;&nbsp;<a href="javascript:customer_record()">客户服务</a></span></li>-->
					<li><span class="glyphicon glyphicon-edit"></span><span>&nbsp;&nbsp;<a href="javascript:customer_service()">服务列表</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1"  sec:authorize="hasAnyAuthority('role','menu')" >
			<span class="big_class" >权限管理</span>
			<div class="module-2">
				<ul class="nav">
					<li  sec:authorize="hasAuthority('role')"><span class="glyphicon glyphicon-eye-open"></span><span><a href="javascript:run_addUserManeger()">用户角色管理</a></span></li>
					<li  sec:authorize="hasAuthority('role')"><span class="glyphicon glyphicon-eye-open"></span><span><a href="javascript:roleManage()">角色管理</a></span></li>
					<li sec:authorize="hasAuthority('menu')"><span class="glyphicon glyphicon-eye-open"></span><span><a href="javascript:menuManage()">资源管理</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1" sec:authorize="hasAuthority('user')">
			<span class="big_class">用户管理</span>
			<div class="module-2">
				<ul class="nav">
					<li sec:authorize="hasAuthority('user')"><span class="glyphicon glyphicon-edit"></span><span>&nbsp;&nbsp;<a href="javascript:run_addUser()">增加用户</a></span></li>
					<li sec:authorize="hasAuthority('user')"><span class="glyphicon glyphicon-eye-open"></span><span>&nbsp;&nbsp;<a href="javascript:runOperaUser()">管理用户</a></span></li>
					<li sec:authorize="hasAuthority('user')"><span class="glyphicon glyphicon-eye-open"></span><span>&nbsp;&nbsp;<a href="javascript:runUserLog()">用户登录流水</a></span></li>
				</ul>
			</div>
		</li>
		<li class="module-1">
			<span class="big_class">考勤系统</span>
			<div class="module-2">
				<ul class="nav">
					<!--<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runOvertimeManage()">加班管理</a></span></li>-->
					<!--<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runRestManage()">调休管理</a></span></li>-->
					<!--<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runLeaveManage()">请假管理</a></span></li>-->
					<!--<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runDealManage()">审核管理</a></span></li>-->
					<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runAttendanceManage()">考勤管理</a></span></li>
					<li><span class="glyphicon glyphicon-signal"></span><span>&nbsp;&nbsp;<a href="javascript:runAttendanceAcount()">统计</a></span></li>
				</ul>
			</div>
		</li>
	</ul>
</div>
</template>


<script>
export default {
	name: 'left',
	data () {
		return {

		}
	},
	component: {

	},
	methods: {
		
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
	display: none;
}
</style>