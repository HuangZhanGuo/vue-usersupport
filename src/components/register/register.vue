<template>
<div>
  <!-- 基本信息页面 -->
<div id="head">
    <span>{{msg}}</span>
</div>
<div id="main_div">
    <form @submit.prevent="submit">
        <table id="register_table" class="table table-hover">
            <tr class="head_table">
                <td colspan="2">
                    <font size="4">请填写以下注册信息！</font> &nbsp;&nbsp;&nbsp;
                </td>
            </tr>
            <tr>
                <td>
                    工号
                </td>
                <td>
                    <input class="syncVerity" type="text" name="workNumber" id="workNumber" v-model="user.workNumber"/>
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr>
                <td>
                    用户名
                </td>
                <td>
                    <input class="syncVerity" type="text" name="username" id="username" v-model="user.username"/>
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr>
                <td>
                    手机号码：
                </td>
                <td>
                    <input class="syncVerity" type="text" name="phone" id="phone" v-model="user.phone"/>
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr>
                <td>
                    邮箱
                </td>
                <td>
                    <input class="syncVerity" type="text" name="email"  id="email" v-model="user.email">
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr>
                <td>
                    密码
                </td>
                <td>
                    <input class="syncVerity" type="password" name="password" id="password" v-model="user.password"/>
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr>
                <td>
                    再次输入密码
                </td>
                <td>
                    <input class="syncVerity" type="password" id="password_verity" v-model="user.password_verity"/>
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr class="foot_table">
                <td colspan="2">
                    <input id="btn_submit" type="submit" value="注册" />
                </td>
            </tr>
        </table>
    </form>
</div>
</div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      msg: '笑脸金服  客服助手管理系统 V1.0.0',
      user: {
        workNumber: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        password_verity: ""
      }
    }
  },
  methods: {
    submit: function() {
      //判断，若两次密码输入不一致，则不执行表单提交操作。
      if(this.user.password != this.user.password_verity) {
          this.$message({
            message: "两次密码输入不一致。",
            type: 'error'
          });
          return;
      }
      //封装数据
      var params = new URLSearchParams();
      params.append("workNumber", this.user.workNumber);
      params.append("username", this.user.username);
      params.append("password", this.user.password);
      params.append("phone", this.user.phone);
      params.append("email", this.user.email);
     
      this.$http
        .post(this.HOST + "/register", params)
        .then((response)=> {
          console.log(response.data);
          if (response.data.code == 1) {
            this.$message({
                message: '注册成功',
                type: 'success'
            });
          } else {
            this.$message({
              message: "注册失败！请重试。",
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
#head {
    padding: 50px 50px 0px 50px;
}

#head span {
    font-size: 26px;
    color: #ffffff;
}

#main_div {
    background-color: #ffffff;
    margin: 100px auto;
    margin-top: 20px;
    border-top: 4px solid #d8d5ff;
}

#main_div table tr td input {
    height: 30px;
    width: 300px;
}

#register_table {
    margin: auto;
    width: 750px;
    height: 400px;
    align: center;
    cellpadding: 0px;
    cellspacing: 0px;
    bgcolor: white;
    background-color: #ffffff;
}

#register_table tr td {
    padding-left: 40px;
}

.head_table {
    height: 50px;
}

.foot_table {
    height: 100px;
}

#phonenumber {
    size: 34px;
}

#username {
    size: 34px;
}

#password {
    size: 34px;
    background-color: white;
}

#password_verity {
    size: 34px;
    background-color: white;
}

#email {
    size: 34px;
}

#btn_submit {
    width: 150px;
    height: 60px !important;
    padding: 10px 10px;
    border: none;
    background-color: #f6f4ff;
    font-size: 24px;
    text-align: center;
    margin-left: 120px;
}

#btn_submit:hover {
    background-color: #20233A;
    color: white;
}

.error {
    width: 300px;
}

.error_info {
    color: red;
}
</style>
