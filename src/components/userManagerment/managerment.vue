<template>
    <div id="content">
    <div class="container-fluid">
        <form class="form-inline">

            <div class="form-group" style="padding: 15px 0;">
                <label class="labe_l" for="status-search">请选择状态:</label>
                <select id="status-search" class="form-control" name="status" >
                    <option value="" label="全部"></option>
                    <option value="1" label="已启用"></option>
                    <option value="0" label="已禁用"></option>
                </select>
            </div>
            <span class="btn btn-default" @click="search()">查询</span>
        </form>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="userId"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                 <el-table-column
                    prop="workNumber"
                    label="工号">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号码">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="statusFormat">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small"  @click="openStatus(scope.row)">启用</el-button>
                  <el-button type="text" size="small"  @click="closeStatus(scope.row)">禁用</el-button>
                </template>
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
    methods:{
        openStatus:function(row){
          let self = this;
          let id = [];
          id.push(row.userId);
          // let parm = {"id": id};
          this.$http.post(this.HOST+"/um/enableUserByIds",id)
            .then(function(res){
                console.log(res)
            })
            console.log(row.userId);
        },
        closeStatus:function(row){
          let self = this;
          let id = [];
          id.push(row.userId);
          // let parm = {"id": id};
          this.$http.post(this.HOST+"/um/banUserByIds",id)
            .then(function(res){
                console.log(res)
            })
            console.log(row.userId);
        },

        statusFormat:function(row, column) {
               var date = row[column.property];
              if (date == 1) {
                return "启用";
            }  else{
          return "禁用"
        }
        },
        //组合查询
        search:function(){
          let self = this;
          this.$http.get(this.HOST+"/um/getUserByPage?pageNumber="+self.currentPage+"&pageSize="+self.pagesize+"&status="+$("#status-search").val())
            .then(function(res){
             console.log(self.tableData);
              self.tableData=res.data.data.data;
              self.total=res.data.data.totalCount;

            })
        },
        // dept:function(row,column){
        //     return row.deptNumber=this.deptNumber;
        // },
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

