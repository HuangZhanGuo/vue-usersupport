<template>
  <div id="border">
	<Header></Header>
	<div class="t-form">
		<form @submit.prevent="submit">
			<table>
				<tr>
					<td><span>登录账号: </span></td>
					<td><input class="user-write-input" type="text" name="username" v-model="user.username" placeholder="用户名/联系手机/邮箱"></td>
				</tr>
				<tr>
					<td><span>通行码:&nbsp; </span></span></td>
					<td><input class="user-write-input" type="password" name="password" v-model="user.password"></td>
				</tr>
				<!-- <tr>
					<td><span>验证码:&nbsp; </span></span></td>
					<td><input type="text" name="verityCode" class="verityCode" id="myVerityCode" onchange="javascript:blurForVerityCode();"/></td>
				</tr> -->
				<!-- <tr>
					<td colspan="2">
						<img src="/verity/verityImg" class="verityImg" id="myVerityImg"/>
						<a id="btn_changeVerityImg" href="javascript:changeVerityImg()">换一张</a>
					</td>
				</tr> -->
				<tr>
					<router-link to="/register">立即注册</router-link>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td class="t-login-btn">
						<input class="login-btn" id="btn-submit" type="submit" value="登录">
						<!--<input class="login-btn" id="btn-reset" type="reset" value="重置">-->
						<input @click="testTheJQuery" type="button" value="重置"/>
					</td>
				</tr>
				<tr class="error">
					<td colspan="2">
						<p th:if="${param.logout}" class="bg-warning">已成功注销</p><!-- 1 -->
						<p th:if="${param.error}" class="bg-danger">登录账号或密码错误，请重试</p> <!-- 2 -->
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>
</template>

<script>
import Header from "./header.vue";
import $ from "jquery";

export default {
  
  data() {
    return {
      msg: "笑脸金服 客服助手管理系统 V1.0.0",
      user: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    Header
  },
  methods: {
    testTheJQuery: function() {
      console.log($);
    },
    submit: function() {
      //封装数据
      var params = new URLSearchParams();
      params.append("username", this.user.username);
      params.append("password", this.user.password);
     
      this.$http
        .post(this.HOST + "/login", params)
        .then(function(response) {
          if (response.data.code == 1) {
            window.location.href = "#/index";
          }
          if (response.data.code == 0) {
            alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#border {
  padding: 0px;
  background-color: #36374c;
  margin: 0px;
  overflow: hidden;
}

#border #system-info span {
  font-size: 30px;
  color: #000000;
  color: white;
}

#border .t-form {
  width: 100%;
  margin-left: 0px;
  padding-left: 450px;
  padding-top: 40px;
  border: 4px solid #dbdbdb;
  background-color: #ffffff;
}

#border .t-form:hover {
  border: 4px solid #fa9c9c;
}

#border .t-form table tr td {
  width: 100px;
  height: 50px;
  margin-bottom: 20px;
}

#border .t-form table tr td .user-write-input {
  width: 230px;
  height: 25px;
  padding-left: 5px;
}

#border .t-form table tr .t-link-register-page {
  text-align: right;
}

#border .t-form table tr td #link-register-page {
  text-decoration: none;
  color: #797575;
  font-size: 14px;
}

#border .t-form table tr td #link-register-page:hover {
  color: #0b71ce;
}

#border .t-form table tr td .login-btn {
  padding: 10px 35px;
  background-color: white;
  border: none;
  margin-right: 10px;
  font-size: 16px;
}

#border .t-form table tr td #btn-submit {
  background-color: #8388a1;
  color: #ffffff;
}

#border .t-form table tr td #btn-submit:hover {
  background-color: red;
}

#border .t-form table tr td #btn-reset {
}

#border .t-form table tr td .verityImg {
  width: 150px;
  height: 50px;
  margin-left: 105px;
}

#border .t-form table tr td .verityCode {
  width: 235px;
  height: 25px;
}

.error td p {
  color: red;
  text-align: center;
}
</style>
