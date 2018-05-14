<template>
<div>
  <!-- 基本信息页面 -->
<div id="head">
    <span>{{msg}}</span>
</div>
<div id="main_div">
    <form id="form_insertUser" action="/register" method="post">
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
                    <input class="syncVerity" type="text" name="workNumber" id="workNumber"/>
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
                    <input class="syncVerity" type="text" name="username" id="username"/>
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
                    <input class="syncVerity" type="text" name="phone" id="phone"/>
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
                    <input class="syncVerity" type="text" name="email"  id="email"/>
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
                    <input class="syncVerity" type="password" name="password" id="password" />
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
                    <input class="syncVerity" type="password" id="password_verity" />
                </td>
                <td class="error">
                    <span class="error_info"></span>
                </td>
            </tr>
            <tr class="foot_table">
                <td colspan="2">
                    <input id="btn_submit" type="button" value="注册" />
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
      msg: '笑脸金服  客服助手管理系统 V1.0.0'
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
