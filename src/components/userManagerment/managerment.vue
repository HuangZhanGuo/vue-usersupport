<template>
    <div id="content">
    <div class="container-fluid">
        <form class="form-inline">

            <div class="form-group" style="padding: 15px 0;">
                <label class="labe_l" for="status-search">请选择状态:</label>
                <select id="status-search" class="form-control" name="status" v-model="user.status">
                    <option value="" label="全部"></option>
                    <option value="1" label="已启用"></option>
                    <option value="0" label="已禁用"></option>
                </select>
            </div>
            <div class="form-group" style="padding: 15px 0;">
                <input type="text" class="form-control" id="workNumber-search" placeholder="请输入工号" v-model="user.workNumber"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="name-search" placeholder="请输入姓名" v-model="user.username"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="phone-search" placeholder="请输入手机号" v-model="user.phone"/>
            </div>
            <span class="btn btn-default" @click="search()">查询</span>
            <span class="btn btn-default" @click="reset()">重置</span>
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
            total:0,
            user: {
                status: "",
                workNumber: "",
                username: "",
                phone: ""
            }
        }
    },
    methods:{
        openStatus:function(row){
          let self = this;
          var params = new URLSearchParams();
          params.append("id", row.userId);
          this.$http.post(this.HOST + "/um/enableUserByIds", params)
            .then((response)=> {
            if (response.data.code == 1) {
                this.$message({
                    message: '启用成功',
                    type: 'success'
                });
                self.search();
            } else {
                this.$message({
                    message: "启用失败！请重试。",
                    type: 'error'
                });
            }
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        closeStatus:function(row){
          let self = this;
          var params = new URLSearchParams();
          params.append("id", row.userId);
          this.$http.post(this.HOST+"/um/banUserByIds", params)
            .then((response)=> {
            if (response.data.code == 1) {
                this.$message({
                    message: '禁用成功',
                    type: 'success'
                });
                self.search();
            } else {
                this.$message({
                    message: "禁用失败！请重试。",
                    type: 'error'
                });
            }
            })
            .catch(function(error) {
                console.log(error);
            });
        },

        statusFormat:function(row, column) {
            var date = row[column.property];
            if (date == 1) {
                return "启用中";
            } else{
                return "禁用中";
            }
        },
        //组合查询
        search:function(){
          let self = this;

          this.$http.get(this.HOST+"/um/getUserByPage", {params: {
              status: this.user.status,
              workNumber: this.user.workNumber,
              username: this.user.username,
              phone: this.user.phone,
              pageNumber: self.currentPage,
              pageSize: self.pagesize
          }}).then((response)=> {
                console.log(response.data);
                if (response.data.code == 1) {
                    self.tableData=response.data.data.data;
                    self.total=response.data.data.totalCount;
                    this.$message({
                        message: '查询成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                    message: "查询异常。请刷新页面或重新登录后尝试。",
                    type: 'error'
                    });
                }
            })
        },
        reset: function() {
            this.user.status = "";
            this.user.workNumber = "";
            this.user.username = "";
            this.user.phone = "";
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

