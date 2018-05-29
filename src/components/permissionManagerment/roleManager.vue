<template>
<div>
    <div class="container center" style="margin-top: 20px; width: 90%">
        <div class="panel panel-default ">
            <!-- Default panel contents -->
            <div class="panel-heading">角色管理</div>
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="roleId"
                        label="角色id">
                    </el-table-column>
                    <el-table-column
                        prop="roleName"
                        label="角色名">
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="描述">
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
            <el-dialog title="授权管理" :visible.sync="dialogTableVisible" style="padding: 40px 160px;">
                <el-table 
                    :data="gridData"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column property="menuUrl" label="url" width="200"></el-table-column>
                    <el-table-column property="description" label="名称"></el-table-column>
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
            gridData: [],
            dialogTableVisible: false,
            multipleSelection: [],
            currentRoleId: ""
        }
    },
    methods: {
        updateAuthorization: function() {
            var ids = new Array();
            for(var i = 0; i< this.multipleSelection.length; i++) {
                ids.push(this.multipleSelection[i].menuId);
            }
            var params = new URLSearchParams();
            params.append("ids[]", ids);
            params.append("id", this.currentRoleId);
            this.$http.post(this.HOST + "/role/updataMenu", params)
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
          this.$http.post(this.HOST + "/role/findAll")
            .then((response)=> {
                if (response.data.code == 200) {
                    self.tableData=response.data.data;
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
        openDialogForAuthorization: function(row) {
            let self = this;
            //显示dialog
            self.dialogTableVisible = true;
            var params = new URLSearchParams();
            params.append("id", row.roleId);
            this.$http.post(this.HOST + "/role/findMenuAlready", params)
                .then((response)=> {
                    if (response.data.code == 200) {
                        self.gridData=response.data.data;
                        var tempList = [];
                        var j=0;
                        for(var i=0; i< self.gridData.length; i++) {
                            if(self.gridData[i].roleId != null) {
                                tempList[j]=self.gridData[i];
                                j++;
                            }
                        }
                        self.$nextTick(function(){
                            self.checked(tempList);//每次更新了数据，触发这个函数即可。
                        });
                        this.currentRoleId = row.roleId;
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


