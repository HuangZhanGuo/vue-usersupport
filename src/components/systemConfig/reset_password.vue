<template>
	<el-form>
<table id="change_pw_table">
    <tr height="40px">
        <td colspan="2">
            <font size="5">修改密码</font> &nbsp;&nbsp;&nbsp;
        </td>
    </tr>
    <tr>
        <td>
            旧密码:
        </td>
        <td>
            <el-input type="password" v-model="old_password"  id="password"/>
        </td>
    </tr>
    <br>
    <tr>
        <td>
            新密码:
        </td>
        <td>
            <el-input type="password" v-model="new_password"  id="new_password"/>
        </td>
    </tr>
      <br>
    <tr>
        <td>
            确认密码:
        </td>
        <td>
            <el-input type="password" v-model="confirm_password" id="confirm_password"/>
        </td>
    </tr>
      <br>
    <tr>
        <td>
            &nbsp;
        </td>
        <td>
            <el-button type="info" @click="change_password" id="btn_reset_password" >确定</el-button>
        </td>
    </tr>
</table>

</el-form>
</template>

<script>
	import $ from 'jquery'
	export default{
		data (){
			return {
				old_password:'',
				new_password:'',
				confirm_password:''
			}
		},
		methods:{
			change_password:function(){
				var self = this
				var old_password = this.old_password
				var new_password = this.new_password
                var confirm_password = this.confirm_password
                
                var paramsForVerity = new URLSearchParams();
                paramsForVerity.append("password",this.old_password);

				var paramsForChange = new URLSearchParams();
                paramsForChange.append("password",this.new_password);

				this.$http.post(this.HOST + '/sc/getByUserPassword', paramsForVerity)
				.then(function(response){
                    console.log(response.data);
                    console.log(response.data.data);
					if(response.data.code == 1){
                        if(new_password == confirm_password){
                            self.$http.post(self.HOST + 'sc/updatePasswordById',paramsForChange)
                            .then(function(result){
                                if(result.data.code == 1){
                                    //清空数据
                                    this.old_password = "";
                                    this.new_password = "";
                                    this.confirm_password = "";
                                    //成功显示结果
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                } else {
                                    //失败显示结果
                                    this.$message({
                                        message: '修改失败',
                                        type: 'error'
                                    });
                                }
                            });
                        }else{
                            alert("两次输入的密码不一致");
                        }
					} else {
						alert("请输入正确的原密码");
					}
				});
			}
		}
	}
</script>

<style>
	#change_pw_table {
    margin-left: 20px;
    margin-top: 40px;
}

#change_pw_table tr td {
    /*margin-left: 0px;*/
    margin-top: 20px;
    size:20px;
}
</style>