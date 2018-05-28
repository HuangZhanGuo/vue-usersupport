<template>
	<!-- 基本信息页面 -->
	<div id="base_info_body">
		<el-form id="base_infomation" name="base_infomation">
			<table class="table table-hover" id="base_table">
				<tr height="40px">
					<td colspan="2">
						<el-font size="4">基本信息</el-font> &nbsp;&nbsp;&nbsp;
					</td>
				</tr>
				<tr>
					<td>
						工号
					</td>
					<td>
						<el-input id="workNumber" readonly="readonly" v-model="user.workNumber" />
					</td>
				</tr>
				<tr>
					<td>
						用户名
					</td>
					<td>
						<el-input id="username" class="syncVerity" :readonly="isreadonly" v-model="user.username"/>
					</td>
				</tr>
				<tr>
					<td>
						手机号码：
					</td>
					<td>
						<el-input id="phone" class="syncVerity" :readonly="isreadonly" v-model="user.phone"/>
					</td>
				</tr>
				<tr>
					<td>
						邮箱
					</td>
					<td>
						<el-input id="email" class="syncVerity" :readonly="isreadonly" v-model="user.email"/>
					</td>
				</tr>
				<tr>
					<td>
						状态
					</td>
					<td>
						<el-input id="status" class="syncVerity" readonly="readonly" v-model="user.status">
						</el-input>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<el-button type="info" v-show="mdisplay" @click="modify" >
							修改
						</el-button>
						<el-button type="info" v-show="display" @click="submitBase">
							确定
						</el-button>
						<el-button type="info" v-show="display" @click="consoleModify">
							取消
						</el-button>
					</td>
				</tr>
			</table>
		</el-form>
	</div>
</template>

<script>
	import $ from 'jquery'
	import Cookies from 'js-cookie'
	export default {
		name: 'base_infomation',
		created() {
			this.request()
		},
		data() {
			return {
				isreadonly: true,
				display: false,
				mdisplay: true,
				user: {
					workNumber: "",
					username: "",
					phone: "",
					email: "",
					status: ""
				}
			}
		},
		methods: {
			modify: function() {
				this.isreadonly = false;
				this.display = true;
				this.mdisplay = false;
			},
			consoleModify: function() {
				this.isreadonly = true;
				this.display = false;
				this.mdisplay = true;
			},
			submitBase: function() {
				var params = new URLSearchParams();
				var self = this;
				params.append('username', this.user.username);
				params.append('email', this.user.email);
				params.append('phone', this.user.phone);
				params.append('userId', Cookies.get('userId'));
				this.$http.post(this.HOST + '/um/check', params)
					.then(function(response) {
						var toast = "";
						if(response.data.code == 1) {
							if(response.data.data.phoneRepeat == true) {
								toast += "手机号码重复！";
							}
							if(response.data.data.emailRepeat == true) {
								toast += "邮箱号码重复！";
							}
							if(response.data.data.usernameRepeat == true) {
								toast += "用户名重复！";
							}
							if(toast.length > 1) {
								this.$message({
									message: toast,
									type: 'error'
								});
								return;
							} else {
								self.updateInfomation(params)
							}
						}
					});
			},
			updateInfomation: function(params) {
				if(params.get('username') == '') {
					this.$message({
						message: "用户名不能为空",
						type: 'error'
					});
					return;
				}
				var phoneReg = /^1[34578]\d{9}$/;
				if(params.get('phone') == '') {
					this.$message({
						message: "手机号码不能为空",
						type: 'error'
					});
					return;
				}
				if(!phoneReg.test(params.get('phone'))) {
					this.$message({
						message: "手机号码格式错误",
						type: 'error'
					});
					return;
				}
				var emailReg = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
				if(params.email == '') {
					this.$message({
						message: "邮箱不能为空",
						type: 'error'
					});
					return;
				}
				if(!emailReg.test(params.get('email'))) {
					this.$message({
						message: "邮箱格式错误",
						type: 'error'
					});
					return;
				}
				this.$http.post(this.HOST + '/sc/updateBaseInfoMationById', params)
					.then(function(result) {
						if(result.data.code == 1) {
							this.$message({
								message: "修改成功！",
								type: 'success'
							});
						} else {
							this.$message({
								message: "修改失败！",
								type: 'error'
							});
							return;
						}
					});
				this.isreadonly = true
				this.display = false
				this.mdisplay = true
			},
			request: function() {
				var self = this
				this.$http.get(this.HOST + '/sc/getByUserId')
					.then(function(response) {
						if(response.data.code == 1) {
							Cookies.set('userId', response.data.data.userId);
							// $("#workNumber").val(response.data.data.workNumber);
							// $("#username").val(response.data.data.username);
							// $("#phone").val(response.data.data.phone);
							// $("#email").val(response.data.data.email);
							self.user.workNumber = response.data.data.workNumber;
							self.user.username = response.data.data.username;
							self.user.phone = response.data.data.phone;
							self.user.email = response.data.data.email;
							if(response.data.data.status == 1) {
								// $("#status").val("在职");
								self.user.status = "在职";
							} else if(response.data.data.status == 0) {
								self.user.status = "离职";
							} else {
								self.user.status = "待定";
							}
						}
					});
			},
		}
	}
</script>

<style>
	#base_info_body {
		background-color: #ffffff;
		margin: 100px auto;
		margin-top: 20px;
		border-top: 4px solid #d8d5ff;
	}
	
	#base_info_body table tr td input {
		height: 30px;
		width: 300px;
	}
	
	#base_table {
		margin: auto;
		width: 750px;
		height: 400px;
		align: center;
		cellpadding: 0px;
		cellspacing: 0px;
		bgcolor: white;
		background-color: #ffffff;
	}
	
	#base_table tr td {
		padding-left: 40px;
	}
</style>