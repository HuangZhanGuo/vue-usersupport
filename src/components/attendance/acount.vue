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
                <el-select id="companySelect" v-model="deptValue" name="deptNumber"  @change="getEmpByNumber()">
                    <el-option v-for="item in depts" :key="item.deptNumbe" :label="item.deptName" :value="item.deptNumber"></el-option>
                </el-select> 
                <!-- <input type="hidden" id="deptNameInput" name="deptName" value=""> -->
                <label class="labe_l" for="tempSelec">人员:</label>
                <el-select id="empSelect" v-model="deptEmpValue" name="workNumber">
                    <el-option v-for="item in deptEmp" :key="item.workNumber" :label="item.name" :value="item.workNumber"></el-option>
                </el-select>
            </div>
            <el-button type="primary"  @click="search(1)" style="margin-left: 10px;">按年</el-button>
            <el-button type="primary"  @click="search(0)" style="margin: 0 10px;">按月</el-button>
            <el-button @click="search(2)">查询</el-button>
        </form>
        <div>
            <el-table
                v-loading="loading2"
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
                    prop="deptName"
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
        total:0,
        loading2:false,
        depts:[],
        deptEmp:[],
        deptValue:'',
        deptEmpValue:''

        } 
    },  
    created(){//加载页面执行事
            //初始化部门
            let self = this;
            this.$http.post(this.HOST + '/dept/getAllDept')
            .then(function (response){
                self.depts = response.data.data;
            })
            
        },  
    methods:{
             //初始化成员
            getEmpByNumber:function() {
                let self = this;
                var params = new URLSearchParams();
                params.append('deptNumber', self.deptValue);
                // var deptName = $("#companySelect option:selected").text();
                this.$http.post(this.HOST + '/emp/getEmpListByDeptNumber',params)
                .then(function (response) {
                    // $("#empSelect").html("<el-option value=''>--请选择--</el-option>");
                    // var empList = response.data.data;
                    // var str = "";
                    // for(var i = 0; i < empList.length; i++){
                    //     str += "<el-option value='"+empList[i].workNumber+"'>"+empList[i].name+"</el-option>"
                    // }
                    // $("#empSelect").append(str);
                    self.deptEmp = response.data.data;
            })
          
        },
        //组合查询
        search:function(type){
        
          let self = this;
          self.loading2=true;
          var startTime = this.DateValue;
        //   var workNumber = $("#empSelect").val();
        //   var deptNumber = $("#companySelect").val();
          var workNumber = self.deptEmpValue;
          var deptNumber = self.deptValue;
          if(deptNumber == "" || deptNumber == null){
                this.$message('请选择部门');
                return;
          }
          if(startTime==""||startTime==null){
                this.$message('请选择时间');
                return;
          }
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
                self.loading2=false;
             console.log(self.tableData);
              self.tableData=res.data.data.data;
              self.total=res.data.data.totalCount;
            })
        },
        dept:function(row,column){
            return row.deptNumber="技术部";
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

