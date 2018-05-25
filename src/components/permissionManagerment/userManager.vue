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
                <el-table :data="gridData">
                    <el-table-column
                        fixed="left"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-checkbox ></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column property="roleName" label="角色名" width="200"></el-table-column>
                    <el-table-column property="description" label="描述"></el-table-column>
                </el-table>

                <el-button type="text" size="big"  @click="openDialogForAuthorization">取消</el-button>
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
            checked: true,
        }
    },
    methods: {
        updateAuthorization: function() {
            var ids = new Array();
            $("input:checkbox:checked").each(function () {
                ids.push($(this).attr("value"));
            });
            console.log(ids);
        },
        //组合查询
        search:function(){
          let self = this;
          var params = new URLSearchParams();
          params.append("pageNo", self.currentPage);
          params.append("length", self.pagesize);
          this.$http.post(this.HOST + "/role/findUserByPage", params)
            .then((response)=> {
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
            this.$http.post(this.HOST + "/role/findRoleBegin", params)
                .then((response)=> {
                    console.log(response.data);
                    if (response.data.code == 200) {
                        self.gridData=response.data.data;
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
        }
    }
}
</script>

<style>

</style>


