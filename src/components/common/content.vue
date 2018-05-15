<template>
<div id="main_center">
	<!--上方关于点击缩略的卡片-->
	<div class="manager-block-list">
		<ul id="ul-block_for_page">
		</ul>
		<div class="btn2-slide">
			<span onclick="javascript:left_slideCard()" class="glyphicon glyphicon-triangle-left"></span>
			<span onclick="javascript:right_slideCard()" class="glyphicon glyphicon-triangle-right"></span>
		</div>
	</div>
	
	<!-- 主页显示的内容 -->
	<div id="always-change-area">
		<div class="shortcuts-service center_show_area">
			<ul>
				<li class="li-item">
					<a href="javascript:runUserBaseInfo()">
						<span class="glyphicon glyphicon-list mainPage_init_option"></span>
						<br>
						<strong>基&nbsp;本&nbsp;信&nbsp;息</strong>
					</a>
				</li>
				<li class="li-order">
					<a href="javascript:runRepaymentSearch()">
						<span class="glyphicon glyphicon-list-alt mainPage_init_option"></span>
						<br>
						<strong>业&nbsp;务&nbsp;查&nbsp;询</strong>
					</a>
				</li>
				<li class="li-notice" sec:authorize="hasRole('ROLE_ADMIN')">
					<a href="#">
						<span class="glyphicon glyphicon-volume-up mainPage_init_option"></span>
						<br>
						<strong>权&nbsp;限&nbsp;管&nbsp;理</strong>
					</a>
				</li>
				<li class="li-root"  sec:authorize="hasRole('ROLE_ADMIN')">
					<a href="javascript:runOperaUser()">
						<span class="glyphicon glyphicon-user mainPage_init_option"></span>
						<br>
						<strong>用&nbsp;户&nbsp;管&nbsp;理</strong>
					</a>
				</li>
				<li class="li-root"  sec:authorize="hasRole('ROLE_ADMIN')">
					<a href="javascript:runUserLog()">
						<span class="glyphicon glyphicon-user mainPage_init_option"></span>
						<br>
						<strong>用&nbsp;户&nbsp;登&nbsp;录&nbsp;流&nbsp;水</strong>
					</a>
				</li>
			</ul>
		</div>
		<router-view></router-view>
		<!--系统设置--基本信息 -->
		<!--<iframe class="center_show_area" id="system-base-info-page" frameborder="0"></iframe>-->
		<router-view></router-view>
		<!--系统设置--修改密码-->
		<!--<iframe class="center_show_area" id="system-change-password-page" frameborder="0"></iframe>-->
		<!--业务查询--债权还款查询 -->
		<!--<iframe class="center_show_area" id="service-repayment-page"  frameborder="0"></iframe>-->
		<!--业务查询--订单还款查询 -->
		<!--<iframe class="center_show_area" id="service-repaymentOrder-page" frameborder="0"></iframe>-->
		<!--资金记录 -->
		<!--<iframe class="center_show_area" id="log-record" frameborder="0"></iframe>-->
		<!--资金流水 -->
		<!--<iframe class="center_show_area" id="log-journal" frameborder="0"></iframe>-->
		<!--角色管理 -->
		<!--<iframe class="center_show_area" id="role-manage" src="/role/roleManage" frameborder="0"></iframe>-->
		<!--用户角色管理 -->
		<!--<iframe class="center_show_area" id="userPermission-manage" frameborder="0"></iframe>-->
		<!--菜单管理 -->
		<!--<iframe class="center_show_area" id="menu-manage" frameborder="0"></iframe>-->
		<!--用户管理--增加用户 -->
		<!--<iframe  class="center_show_area" id="userManager-add-user-page" frameborder="0"></iframe>-->
		<!--用户管理--管理用户 -->
		<!--<iframe  class="center_show_area" id="userManager-opera-user-page" frameborder="0"></iframe>-->
		<!--用户管理--用户登录流水 -->
		<!--<iframe  class="center_show_area" id="userManager-login-page" frameborder="0"></iframe>-->
		<!--考勤系统--加班管理-->
		<!--<iframe  class="center_show_area" id="attendance-overtime-page" frameborder="0"></iframe>-->
		<!--考勤系统--调休管理-->
		<!--<iframe  class="center_show_area" id="attendance-rest-page" frameborder="0"></iframe>-->
		<!--考勤系统--请假管理-->
		<!--<iframe  class="center_show_area" id="attendance-leave-page" frameborder="0"></iframe>-->
		<!--考勤系统--审核管理-->
		<!--<iframe  class="center_show_area" id="attendance-deal-page" frameborder="0"></iframe>-->
		<!--考勤系统--考勤管理-->
		<!--<iframe  class="center_show_area" id="attendance-attendance-page" frameborder="0"></iframe>-->
		<!--考勤系统--统计-->
		<!--<iframe  class="center_show_area" id="attendance-acount-page" frameborder="0"></iframe>-->
		<!--客服服务--致电信息处理 -->
		<!--<iframe class="center_show_area" id="customer_record" frameborder="0"></iframe>-->
		<!--客服服务--服务列表 -->
		<!--<iframe class="center_show_area" id="customer_service" frameborder="0"></iframe>-->
	</div>		
</div>
</template>


<script>
export default {
	name: 'content',
	data () {
		return {
			testData: "这是测试用的",
		}
	},
	component: {

	},
	methods: {
		runPage: function(url) {
			console.log(url);
			$("router-view")
		}
	}
}
</script>


<style scoped>
#main_center {
	width: 100%;
	height: 585px;
	margin-left: 0px;
	float: left;
	border-top: 5px solid #18A7CE;
	/*background-image: url(../images/backImg.jpg);*/
	padding: 0px;
	position: absolute;
	z-index: auto;
	left: 160px;
	overflow: hidden;
}

#main_center .manager-block-list {
	width: 90%;
	border-bottom: 2px solid #181B43;
	clear: both;
	height: 31px;
	padding-right: 20px;

}

#main_center .manager-block-list .btn2-slide {
	text-align: right;
}


#main_center .manager-block-list .btn2-slide span {
	background-color: #EAE7E7;
	padding: 3px;
}

#main_center .manager-block-list #ul-block_for_page li {
	list-style: none;
	float: left;
	margin-right: 20px;
	padding: 5px 4px 2px 10px;
	border: 2px solid #B1B1B7;
	border-bottom: none;
	cursor: pointer;
}

#main_center .manager-block-list #ul-block_for_page .block-selected {
	border: 2px solid #1D1D3C;
	border-bottom: 2px solid #FFFFFF;
}

#main_center .manager-block-list #ul-block_for_page li .t-close {
	padding: 3px 8px;
	margin-left: 5px;
}

#main_center .manager-block-list #ul-block_for_page li .t-close:hover {
	background-color: #E6E6E6;
}

#main_center .shortcuts-service {
	width: 90%;
	height: 180px;
}

#log-record {
	display: none;
}

#log-journal{
	display: none;
}
#userPermission-manage {
	display: none;
}
#role-manage {
	display: none;
}

#menu-manage{
	display: none;
}

#main_center .shortcuts-service ul {
	padding-top: 40px;
	height: 100px;
	background-color: #24273A;
	padding-left: 300px;
}

#main_center .shortcuts-service ul li {
	float: left;
	list-style: none;
	width: 120px;
	height: 120px;
	padding-top: 38px;
	margin-right: 80px;
	text-align: center;
	background-color: #FEFEFE;
	border-radius: 50%;
}

#main_center .shortcuts-service ul li a{
	font-size: 15px;
}

#main_center .shortcuts-service ul li a .glyphicon {
	color: #030000;
	font-size: 42px;
	margin-bottom: 20px;
}

.center_show_area {
	width: 88%;
	height: 540px;
	overflow: hidden;

}

#system-base-info-page {
	display: none;
}

#system-change-password-page {
	display: none;
}

#service-repayment-page {
	display: none;
}

#service-repaymentOrder-page {
	display: none;
}

#permission-page {
	display: none;
	height: 600px;
	margin-left: -5px;
	frameborder: 0;
}

#log-record {
	display: none;
}

#userManager-add-user-page {
	display: none;
	height: 600px;
	margin-left: 0px;
}

#userManager-opera-user-page {
	display: none;
	margin-bottom: 25px;
	padding-bottom: 20px;
}

#userManager-login-page{
	display: none;
}
.mainPage_init_option {
	transition: all 1.0s;
}

.mainPage_init_option:hover {
	transform: rotate(720deg);
}

#attendance-overtime-page{
	display: none;
}

#attendance-attendance-page {
	display: none;
}

#attendance-acount-page {
	display: none;
}

#customer_service {
	display: none;
}

</style>