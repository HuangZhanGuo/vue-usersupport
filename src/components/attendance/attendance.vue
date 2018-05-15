
<template>
  
    <div id="content">
        <div class="container-fluid">

            <form id="attendanceForm" style="padding-top: 15px; float: left;width: 90%;" class="form-inline" method="post" action="">
                <div class="form-group">
                    <label class="labe_l" for="companySelect">部门:</label>
                    <select id="companySelect" class="form-control" name="deptNumber" onchange="getEmpByNumber()">
                        <option value="">--请选择部门--</option>
                    </select>
                    <input type="hidden" id="deptNameInput" name="deptName" value="">
                    <label class="labe_l" for="empSelect">人员:</label>
                    <select id="empSelect" class="form-control" name="workNumber">
                        <option value="">--请选择--</option>
                    </select>
                    <label class="labe_l" for="attendanceDate">考勤时间:</label>
                    <!--<input type="text" class="form_datetime form-control" id="attendanceDate" readonly>-->
                    <input class="Wdate form-control" type="text" id="attendanceDate" v-on:click="WdatePicker({el:this,dateFmt:'yyyy-MM',readOnly:true})" readonly>
                    <input type="hidden" id="attendanceDateInput" name="attendanceDate" value="">
                </div>
                <span class="btn btn-primary" @click="searchAttendance()">查询</span>
            </form>

            <form id="importForm" enctype="multipart/form-data" style="padding-top: 15px;float: right">
                <span style="float: right">
                <label class="form-control btn btn-info" for="importExcel">导入</label><input type="file" name="file" onchange="importAttendance()" style="display: none" id="importExcel"/>
                </span>
            </form>

            <div style="clear: both"></div>

            <div>
                <form class="form-inline">
                    <div class="form-group">
                        <input type="button" class="form-control hide" onclick="exportAttendance()" value="导出查询结果" id="exportExcel"/>
                    </div>
                </form>
            </div>

            <div>
                <table class="table table-bordered data-table" cellspacing="0" width="100%" id="attendanceTable">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>员工号</th>
                            <th>员工姓名</th>
                            <th>考勤日期</th>
                            <th>上班打卡时间</th>
                            <th>下班打卡时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                </table>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    created(){//加载页面执行事件
        console.log(this.HOST);
      this.$http.post(this.HOST + '/dept/getAllDept')
	  .then(function (response) {
        var depts=response.data.data;
            var str = "";
            for(var i = 0; i < depts.length; i++){
                str += "<option value='"+depts[i].deptNumber+"'>"+depts[i]+"</option>"
            }
            $("#companySelect").append(str);
	  })
      
} 
}
</script>
<style>
    .Wdate{
            background-image:url('../../../static/js/My97DatePicker/skin/datePicker.gif');
        }
    label{
            margin:0 5px;
        }
    .exportHide{
        display: none;
    }
</style>

