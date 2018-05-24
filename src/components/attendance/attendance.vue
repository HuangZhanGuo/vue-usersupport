
<template>
    <div id="content">
        <div class="container-fluid">
            <el-form :inline="true" id="attendanceForm" style="padding-top: 15px; float: left;width: 90%;" class="form-inline" method="post" action="">
                <div class="form-group">
                   <el-form-item label="部门:">
                <el-select v-model="value" id="dept" placeholder="请选择" @change="changeCount()">
                    <el-option
                        v-for="item in options"
                        :key="item.deptNumber"
                        :label="item.deptName"
                        :value="item.deptNumber">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="人员:">
                <el-select v-model="nameValue" placeholder="请选择">
                    <el-option 
                        v-for="item in nameOptions"
                        :key="item.workNumber"
                        :label="item.name"
                        :value="item.workNumber">
                    </el-option>

                </el-select>
                </el-form-item>
                <el-form-item label="考勤时间">
                    <el-date-picker
                    id="attendanceDate"
                    v-model="DateValue"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                </el-form-item>
                    <input type="hidden" id="attendanceDateInput" name="attendanceDate" value="">
                </div>
               <el-form-item>
                    <el-button type="primary" @click="searchAttendance()">查询</el-button>
                </el-form-item>
            </el-form>

            <form id="importForm" enctype="multipart/form-data" style="padding-top: 15px;float: right">
                <span style="float: right">
                <label class="form-control btn btn-info" for="importExcel">导入</label><input type="file" name="file" style="display: none" id="importExcel" @change="importAttendance()"/>
                </span>
            </form>

            <div style="clear: both"></div>

          <div>
                <form class="form-inline">
                    <div class="form-group">
                        <input type="button" class="form-control btn btn-info hide" @click="exportAttendance()" value="导出查询结果" id="exportExcel"/>
                    </div>
                </form>
            </div>
            <div>
                <el-table
                    v-loading="loading2"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="workNumber"
                        label="员工号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="empName"
                        label="员工姓名">
                    </el-table-column>
                    <el-table-column
                        prop="attendanceDate"
                        :formatter="formatterDate"
                        label="考勤日期">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        :formatter="formatterStartTime"
                        label="上班打卡时间">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        :formatter="formatterEndTime"
                        label="下班打卡时间">
                    </el-table-column>
                    <el-table-column 
                        prop="status"
                        :formatter="formatterColumn"
                        label="状态">
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
        options:[],
        nameOptions:[],
        value: '',
        nameValue:'',
        DateValue: '',
        tableData: [], 
        currentPage:1, 
        pagesize:10, 
        total:0,
        loading2:false
        } 
    },     

    created(){//加载页面执行事
            //初始化部门
            let self = this; 
            this.$http.post(this.HOST + '/dept/getAllDept')
            .then(function (response) {
                self.options=response.data.data;
                
            })
            
        },  
    methods:{
        //初始化成员
        changeCount:function() {
            let self = this;
            var params = new URLSearchParams();
            params.append('deptNumber',self.value);
            this.$http.post(this.HOST + '/emp/getEmpListByDeptNumber',params)
            .then(function (response) {
                self.nameOptions= response.data.data; 
            })
          
        },
        //组合查询
       searchAttendance:function(){
           
           let self = this;
           self.loading2=true;
           // 校验查询条件
           if(self.value==null||self.value==''){
              this.$message({
                message: '请选择部门',
                type: 'warning'
                });
                return;
           }
           if(self.nameValue==null||self.nameValue==''){
                this.$message({
                message: '请选择人员',
                type: 'warning'
                });
                return;
           }
           if(self.DateValue==null||self.DateValue==''){
                this.$message({
                message: '请选择日期',
                type: 'warning'
                });
                return;
           }
            var params = new URLSearchParams();
            params.append("workNumber", self.nameValue);
            params.append("deptNumber", self.value);
            params.append("attendanceDate",self.DateValue);
            params.append("pageNumber",self.currentPage);
            params.append("pageSize",self.pagesize);
            
            this.$http.post(this.HOST+"/attendance/getAttendanceRecord",params)
            .then(function(res){
                self.loading2=false;
                console.log(self.tableData);
              self.tableData=res.data.data.data;
              self.total=res.data.data.totalCount;
              $("#exportExcel").removeClass("hide");
            })
           
        },
       
        //导出
       exportAttendance:function(){
            alert("进入方法");
        $("#attendanceForm").attr("action",this.HOST+"/attendance/export");
        var attenDate = new Date($("#attendanceDate").val());
        $("#attendanceDateInput").val(attenDate);
        $("#attendanceForm").submit();
        },
        //每页显示数据量变更
        handleSizeChange: function(val) {
            this.pagesize = val;
            this.searchAttendance(this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.searchAttendance(this.currentPage, this.pagesize);
        }, 
         //状态改成汉字
        formatterColumn(row, column) {
            switch(row.status){
                // 0：正常，1：迟到，2：早退，3：迟到早退，4：旷工，5：异常，6：请假，7：调休）
                
                case 0:
                return '正常';
                break;

                case 1:
                return '迟到';
                break;

                case 2:
                return '早退';
                break;
            
                case 3:
                return '迟到早退';
                break;

                case 4:
                return '旷工';
                break;

                case 5:
                return '异常';
                break;

                case 6:
                return '请假';
                break;

                case 7:
                return '调休';
                break;

                default:
                return '未知';
            }
        }, 
        //对时间进行处理
        formatterDate(row,column){
            return Format(new Date(row.attendanceDate),"yyyy-MM-dd")
           
        },
        formatterStartTime(row,column){
            return Format(new Date(row.startTime)," HH:mm")
        },
        formatterEndTime(row,column){
            return Format(new Date(row.endTime)," HH:mm")
        },
       //excel导入操作
       importAttendance : function(){
           alert("进入方法");
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
label {
  margin: 0 5px;
}
.exportHide {
  display: none;
}
</style>

