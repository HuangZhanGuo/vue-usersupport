<template>
	<div id="main_head">
		<div class="t-logo">
			<span>笑&nbsp;脸&nbsp;金&nbsp;融&nbsp;客&nbsp;服&nbsp;管&nbsp;理&nbsp;系&nbsp;统</span>
		</div>
		<div class="t-login-info">
			<span>欢迎&nbsp;&nbsp;&nbsp;</span>

			<span class="loginName" sec:authorize="hasRole('ROLE_ADMIN')">
				管理员
				&nbsp;
			</span>
			<span class="loginName" sec:authorize="hasRole('ROLE_USER')">
				客服
				&nbsp;
				<span sec:authentication="name"></span>
			</span>

			<input type="hidden" id="user_storeId" value="${user.storeId }"/>
		</div>
		<div class="t-login-out">
			<a href="javascript:beforeLogoutForLog()">安全退出</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'head',
	data () {
		return {

		}
	},
	component : {

	},
}
</script>


<style scoped>
#main_head {
	width: 100%;
	height: 50px;
	background-color: #151927;
	padding: 0px 40px;
	margin: 0px;
	overflow: hidden;
}

#main_head .t-logo {
	float: left;
	padding: 8px 10px;
}

#main_head .t-logo span {
	color: #FFFEFE;
	font-size: 25px;
}

#main_head .t-login-info {
	float: left;
	padding: 20px 50px 5px 50px;
}

#main_head .t-login-info {
	color: #FFFEFE;
}

#main_head .t-login-out {
	float: right;
	padding: 20px 80px 0px 0px;
}

#main_head .t-login-out a {
	text-decoration: none;
	color: #FFFFFF;
}

#main_head .t-login-out a:hover {
	color: #E10505;
}
</style>