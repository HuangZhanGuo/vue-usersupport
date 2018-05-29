<template>
<div>
    <div class="container center" style="margin-top: 20px; width: 90%">
        <div class="panel panel-default ">
            <!-- Default panel contents -->
            <div class="panel-heading">用户管理</div>
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="userId"
                        label="用户id">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名称">
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreate"
                        label="创建时间"
                        :formatter="gmtCreateFormat">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"  @click="openDialogForAuthorization(scope.row)">编辑</el-button>
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
            <el-dialog title="授权管理" :visible.sync="dialogTableVisible" style="padding: 40px 160px;">
                <el-table 
                    :data="gridData"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column property="roleName" label="角色名" width="200"></el-table-column>
                    <el-table-column property="description" label="描述"></el-table-column>
                </el-table>

                <el-button type="text" size="big"  @click="consuleThisDialog">取消</el-button>
                <el-button type="text" size="big"  @click="updateAuthorization">修改</el-button>
            </el-dialog>
        </div>
    </div>
</div>    
</template>

<script>
import $ from "jquery";
var data;

export default {
    created() {
		this.search()
	},
    data () {
        return {
            tableData: [],
            currentPage:1,
            pagesize:10,
            total:0,
            gridData: [],
            dialogTableVisible: false,
            multipleSelection: [],
            currentLoginUserId: ""
        }
    },
    methods: {
        updateAuthorization: function() {
            var ids = new Array();
            for(var i = 0; i< this.multipleSelection.length; i++) {
                ids.push(this.multipleSelection[i].roleId);
            }
            var params = new URLSearchParams();
            params.append("ids[]", ids);
            params.append("id", this.currentLoginUserId);
            this.$http.post(this.HOST + "/role/updateRole", params)
            .then((response)=> {
                console.log(response.data);
                if (response.data.code == 200) {
                    this.$message({
                        message: '授权成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                    message: "授权异常。请刷新页面或重新登录后尝试。",
                    type: 'error'
                    });
                }
            })
        },
        consuleThisDialog: function() {
            //关闭修改权限的模态框
            this.dialogTableVisible = false;
        },
        //组合查询
        search:function(){
          let self = this;
          var params = new URLSearchParams();
          params.append("pageNo", self.currentPage);
          params.append("length", self.pagesize);
          this.$http.post(this.HOST + "/role/findUserByPage", params)
            .then((response)=> {
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
        //每页显示数据量变更
        handleSizeChange: function(val) {
            this.pagesize = val;
            this. search(this.currentPage, this.pagesize);
        },
        gmtCreateFormat: function(row, column) {
            var data = row[column.property];
            var date = new Date(data);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this. search(this.currentPage, this.pagesize);
        },
        openDialogForAuthorization: function(row) {
            let self = this;
            //显示dialog
            self.dialogTableVisible = true;
            //获取当前用户的权限状态数据
            var params = new URLSearchParams();
            params.append("userId", row.userId);
            //将当前登录用户的ID放于全局变量中，以便后面使用
            self.currentLoginUserId = row.userId;
            this.$http.post(this.HOST + "/role/findRoleBegin", params)
                .then((response)=> {
                    if (response.data.code == 200) {
                        self.gridData=response.data.data;
                        var tempList = [];
                        var j=0;
                        for(var i=0; i< self.gridData.length; i++) {
                            if(self.gridData[i].userId != null) {
                                tempList[j]=self.gridData[i];
                                j++;
                            }
                        }
                        self.$nextTick(function(){
                            self.checked(tempList);//每次更新了数据，触发这个函数即可。
                        });
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
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        checked(tempList){
              //首先el-table添加ref="table"引用标识
            for(var i=0; i< tempList.length; i++) {
                this.$refs.multipleTable.toggleRowSelection(tempList[i]);
            }
        },
    }
}
</script>

<style>

</style>


