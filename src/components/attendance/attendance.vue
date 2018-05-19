
import func from './vue-temp/vue-editor-bridge';
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
                    <select id="empSelect" class="form-control" v-model="workNumber" name="workNumber">
                        <option value="">--请选择--</option>
                    </select>
                    <label class="labe_l" for="attendanceDate">考勤时间:</label>
                    <!--<input type="text" class="form_datetime form-control" id="attendanceDate" readonly>-->
                    <input class="Wdate form-control" type="text" id="attendanceDate" @click="WdatePicker({el:this,dateFmt:'yyyy-MM',readOnly:true})" readonly>
                    <input type="hidden" id="attendanceDateInput" name="attendanceDate" value="">
                </div>
                <span class="btn btn-primary" v-on:click="searchAttendance">查询</span>
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
                     <thead>
                        <tr v-for="(peopel in tableData">
                            <th v-text="peopel.workNumberr"></th>
                            
                        </tr>
                    </thead>
                </table>
            </div>
            <div align="center">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
              </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    data: {     
                //表格当前页数据
                tableData: []

                // //多选数组
                // multipleSelection: [],

                // //请求的URL
                // // url:'newstu/querystudentbypage',

                // //搜索条件
                // criteria: '',

                // //下拉菜单选项
                // select: '',

                // //默认每页数据量
                // pageSize: 10,

                // //默认高亮行数据id
                // highlightId: -1,

                // //当前页码
                // currentPage: 1,

                // //查询的页码
                // start: 1,

                // //默认数据总数
                // totalCount: 1000,
            },

    created(){//加载页面执行事
            //初始化部门
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
        //初始化成员
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
        //组合查询
       searchAttendance:function(){
           this.$message.warning("进入方法");
           // 校验查询条件
            var deptNumber = $("#companySelect").val();
            var deptName = $("#companySelect option:selected").text();
            if(deptNumber == "" || deptNumber == null){
                alert("请选择部门");
                return;
            }
            var workNumber = $("#empSelect").val();
            var attenDate = $("#attendanceDate").val();
            var params = new URLSearchParams();
            var pageSize=10;
            var pageNumber=1;
            // params.append("deptNumber", deptNumber);
            params.append("workNumber", workNumber);
            params.append("deptName", deptName);
            params.append("pageNumber",pageNumber);
            params.append("pageSize",pageSize);
            alert(pageNumber);
             alert(pageSize);
            this.$http.post(this.HOST+"/attendance/getAttendanceRecord",params)
            .then(function(res){
               this.tableData=res.data.data.data;
                 console.log(this.tableData);
            })
           
        },
        //每页显示数据量变更
        handleSizeChange: function(val) {
            this.pagesize = val;
            alert(val)
            this.loadData(this.criteria, this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.searchAttendance(this.currentPage, this.pagesize);
        },    
       //
       //excel导入操作
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

