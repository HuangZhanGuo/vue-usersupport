<template>
    <div id="content">
    <div class="container-fluid">
        <form class="form-inline">

            <div class="form-group" style="padding: 15px 0;">

            </div>
            <el-button type="primary" @click="search()" style="float: right; margin-right: 50px;" round>点击查询</el-button>
        </form>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%; padding: 20px 80px">
                <el-table-column
                    prop="username"
                    label="工号">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                 <el-table-column
                    prop="loginTime"
                    label="登录时间"
                    :formatter="dateFormat" >
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
    created() {
		this.search()
	},
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
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == "") {
                return "";
            }
            return new Date(date).toLocaleString();
        },

        //组合查询
        search:function(){
          let self = this;
          this.$http.get(this.HOST+"/ul/getUserByPage?pageNumber="+self.currentPage+"&pageSize="+self.pagesize)
            .then(function(res){
             console.log(self.tableData);
             console.log(res);
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

