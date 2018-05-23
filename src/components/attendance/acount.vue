<template>
    <div id="content">
    <div class="container-fluid">
        <form class="form-inline">


            <div class="form-group" style="padding: 15px 0;">
                <label class="labe_l">考勤时间:</label>
                <!--<input type="text" class="form_datetime form-control" id="datetimeStart" name="startTime" readonly>-->
                 <el-date-picker
                        v-model="DateValue"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                 </el-date-picker>
                <label class="labe_l" for="companySelect">部门:</label>
                <select id="companySelect" class="form-control" name="deptNumber" v-model="deptNumber"  @change="getEmpByNumber()">
                    <option value="">--请选择部门--</option>
                </select>
                <input type="hidden" id="deptNameInput" name="deptName" value="">
                <label class="labe_l" for="tempSelec">人员:</label>
                <select id="empSelect" class="form-control" name="workNumber">
                    <option value="">--请选择--</option>
                </select>
            </div>
            <span class="btn btn-primary" @click="search(1)" style="margin-left: 10px;">按年统计</span>
            <span class="btn btn-primary" @click="search(0)" style="margin: 0 10px;">按月统计</span>
            <span class="btn btn-default" @click="search(2)">查询</span>
        </form>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="workNumber"
                    label="员工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="empName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="deptNumber"
                    :formatter="dept"
                    label="部门">
                </el-table-column>
                <el-table-column
                    prop="late"
                   
                    label="迟到(次数)">
                </el-table-column>
                <el-table-column
                    prop="early"
                   
                    label="早退(次数)">
                </el-table-column>
                <el-table-column
                    prop="lateAndEarly"
                   
                    label="迟到早退(次数)">
                </el-table-column>
                <el-table-column 
                    prop="absent"
                    
                    label="旷工(次数)">
                </el-table-column>
                <el-table-column 
                    prop="exp"
                    
                    label="异常(次数)">
                </el-table-column>
                <el-table-column 
                    prop="leaveDuration"
                    
                    label="请假(时长)">
                </el-table-column>
                <el-table-column 
                    prop="restDuration"
                    
                    label="调休(时长)">
                </el-table-column>
                <el-table-column 
                    prop="overtimeDuration"
                    
                    label="加班(时长)">
                </el-table-column>
            </el-table>
        </div>
        <div align="center">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</div>
</template>
<script>
export default {
     data () { 
        return {
        DateValue: '',
        tableData: [], 
        currentPage:1, 
        pagesize:10, 
        total:0
        } 
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
            getEmpByNumber:function() {
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
        search:function(type){
        alert(type);
          let self = this;
          var startTime = this.DateValue;
          var workNumber = $("#empSelect").val();
          var deptNumber = $("#companySelect").val();
          var year=null;
          var month=null;
          if(type==1){
            year=new Date(startTime);
          }
          if(type==0){
            month=new Date(startTime);
          }
          var params = new URLSearchParams();
          params.append("deptNumber", deptNumber);
          params.append("workNumber", workNumber);
          params.append("attendanceDate",startTime);
          if(year!=null){
            params.append("year",year);
          }
          if(month!=null){
             params.append("month",month);
          }
          params.append("pageNumber",self.currentPage);
          params.append("pageSize",self.pagesize);
          this.$http.post(this.HOST+"/attendance/getAcountAll",params)
            .then(function(res){
             console.log(self.tableData);
              self.tableData=res.data.data.data;
              self.total=res.data.data.totalCount;
              
            })
        },
        dept:function(row,column){
            return row.deptNumber=this.deptNumber;
        },
        //每页显示数据量变更
        handleSizeChange: function(val) {
            this.pagesize = val;
            this. search(this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this. search(this.currentPage, this.pagesize);
        }, 
    },
           
}
</script>
<style>
    label{
            margin:0 5px;
        }
</style>

