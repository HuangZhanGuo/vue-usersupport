
<template>
  
    <div id="content">
        <div class="container-fluid">

            <form id="attendanceForm" style="padding-top: 15px; float: left;width: 90%;" class="form-inline" method="post" action="">
                <div class="form-group">
                    <label class="labe_l" for="companySelect">部门:</label>
                    <select id="companySelect" class="form-control" name="deptNumber" v-model="deptNumber" @change="changeCount()">
                        <option value="">--请选择部门--</option>
                    </select>
                    <input type="hidden" id="deptNameInput" name="deptName" value="">
                    <label class="labe_l" for="empSelect">人员:</label>
                    <select id="empSelect" class="form-control" name="workNumber">
                        <option value="">--请选择--</option>
                    </select>
                    <label class="labe_l" for="attendanceDate">考勤时间:</label>
                    <!--<input type="text" class="form_datetime form-control" id="attendanceDate" readonly>-->
                    <input class="Wdate form-control" type="text" id="attendanceDate" @click="WdatePicker({el:this,dateFmt:'yyyy-MM',readOnly:true})" readonly>
                    <input type="hidden" id="attendanceDateInput" name="attendanceDate" value="">
                </div>
                <span class="btn btn-primary" @click="searchAttendance()">查询</span>
            </form>

            <form id="importForm" enctype="multipart/form-data" style="padding-top: 15px;float: right">
                <span style="float: right">
                <label class="form-control btn btn-info" for="importExcel">导入</label><input type="file" name="file" style="display: none" id="importExcel" @change="importAttendance()"/>
                </span>
            </form>

            <div style="clear: both"></div>

            <div>
                <form class="form-inline">
                    <div class="form-group">
                        <input type="button" class="form-control hide" @click="exportAttendance()" value="导出查询结果" id="exportExcel"/>
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
    created(){//加载页面执行事
            this.$http.post(this.HOST + '/dept/getAllDept')
            .then(function (response) {
            var depts=response.data.data;
            console.log(depts);
                var str = "";
                for(var i = 0; i < depts.length; i++){
                    str += "<option value='"+depts[i].deptNumber+"'>"+depts[i].deptName+"</option>"
                }
                $("#companySelect").append(str);
            })
            
        },  
    methods:{
        changeCount:function() {
            var params = new URLSearchParams();
            params.append('deptNumber', this.deptNumber);
            var deptName = $("#companySelect option:selected").text();
            this.$http.post(this.HOST + '/emp/getEmpListByDeptNumber',params)
            .then(function (response) {
                $("#empSelect").html("<option value=''>--请选择--</option>");
                var empList = response.data.data;
                var str = "";
                for(var i = 0; i < empList.length; i++){
                    str += "<option value='"+empList[i].workNumber+"'>"+empList[i].name+"</option>"
                }
                $("#empSelect").append(str);
            })
          
        },
       getQueryCondition:function(data) {
            var params = {};
            params.deptNumber = $("#companySelect").val();
            params.deptName = $("#companySelect option:selected").text();
            params.workNumber = $("#empSelect").val();
            params.attendanceDate = new Date($("#attendanceDate").val());

            //组装分页参数
            params.draw = data.draw;
            return params;
        },
        
        searchAttendance:function(){
            // 校验查询条件
            var tableNotLoad = true;
            
            var deptNumber = $("#companySelect").val();
            var deptName = $("#companySelect option:selected").text();
            if(deptNumber == "" || deptNumber == null){
                alert("请选择部门");
                return;
            }

            var workNumber = $("#empSelect").val();
            // var attenDate = $("#attendanceDate").val();
            // if(attenDate == "" || attenDate == null){
            //     alert("请选择考勤时间");
            //     return;
            // }
            if(tableNotLoad) {
            $('#attendanceTable').DataTable({
                "searching": true, // 从结果搜索
                "bJQueryUI": true,
                "aaSorting": [3, "desc"], // 按第7列倒序排列
                "sPaginationType": "full_numbers",
                "serverSide": false, // true代表后台分页，false代表前台分页
                // 表格填充数据来源，使用ajax异步请求后台获取数据
                ajax: function (data, callback, settings) {
                    var params = getQueryCondition(data)
                     this.$http
                    .post(this.HOST + "/attendance/getAttendanceRecord", params)
                    .then(function(response) {
                        $("#exportExcel").removeClass("hide");
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                },
                "columns": [
                    {
                        "data": null,
                        "render": function (data, type, full, meta) {
                            return meta.row + 1;
                        }
                    },
                    {"data": "workNumber"},
                    {"data": "empName"},
                    {
                        "data": "attendanceDate",
                        "render": function (data, type, full, meta) {
                            return Format(new Date(data),"yyyy-MM-dd")
                        }
                    },
                    {
                        "data": "startTime",
                        "render": function (data, type, full, meta) {
                            return Format(new Date(data)," HH:mm")
                        }
                    },
                    {
                        "data": "endTime",
                        "render": function (data, type, full, meta) {
                            return Format(new Date(data)," HH:mm")
                        }
                    },
                    {
                        "data": "status",
                        "render": function (data, type, full, meta) {
                            //类型：0导航菜单；1操作按钮。
                            switch (data) {
                                case 0:
                                    return "正常";
                                    break;
                                case 1:
                                    return "迟到";
                                    break;
                                case 2:
                                    return "早退";
                                    break;
                                case 3:
                                    return "迟到早退";
                                    break;
                                case 4:
                                    return "旷工";
                                    break;
                                case 5:
                                    return "异常";
                                    break;
                                case 6:
                                    return "请假";
                                    break;
                                case 7:
                                    return "调休";
                                    break;
                            }
                        }
                    }
                ],
                "oLanguage": {    // 语言设置
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                    "sInfoEmpty": "没有数据",
                    "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                    "sZeroRecords": "没有检索到数据",
                    "sSearch": "检索:",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    }
                }
            });

            tableNotLoad = false;
        }else {
            attenTable.ajax.reload();
        }
        },
       //
       importAttendance : function(){
           var formData = new FormData($("#importForm")[0]);
           this.$http
            .post(this.HOST + "/attendance/import",formData)
            .then(function(response) {
                console.log(response);
                if(response.data.code==1){
                    alert("导入成功");
                }else{
                    alert("导入失败");
                }
            })
        }
        
    }

    
}
</script>
<style>
    .Wdate{
            background-image:url('/static/js/My97DatePicker/skin/datePicker.gif');
        }
    label{
            margin:0 5px;
        }
    .exportHide{
        display: none;
    }
</style>

