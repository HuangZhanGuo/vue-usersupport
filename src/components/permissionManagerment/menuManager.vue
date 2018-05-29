<template>
<div class="container center" style="margin-top: 20px; width: 80%">
    <div class="panel panel-default" id="document">
        <!-- Default panel contents -->
        <div class="panel-heading">菜单管理
        <button style = "float: right" class="btn btn-default" type="button" data-target="#exampleModalInsert" data-toggle="modal">新增菜单</button>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="menuId"
                    label="菜单编号">
                </el-table-column>
                <el-table-column
                    prop="menuName"
                    label="菜单名">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="启用状态"
                    :formatter="statusFormat">
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
                        <el-button type="text" size="small"  @click="openDialogForEditMenuItem(scope.row)">编辑</el-button>
                        <el-button type="text" size="small"  @click="deleteMenuItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="菜单编辑" :visible.sync="dialogEditFormVisible">
                <el-form :model="EditMenuform">
                    <el-form-item label="菜单名字" :label-width="formLabelWidth">
                    <el-input v-model="EditMenuform.menuName" auto-complete="off" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="启用状态" :label-width="formLabelWidth">
                    <el-select v-model="EditMenuform.status" placeholder="启用中"  style="width: 300px">
                        <el-option label="启用中" value="1"></el-option>
                        <el-option label="已禁用" value="0"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="EditMenuform.description" auto-complete="off" style="width: 300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditMenuItem()">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="modal fade" id="exampleModalInsert" tabindex="-1" role="dialog" aria-labelledby="exampleModalInsertLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="exampleModalInsertLabel">新增菜单</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                            </thead>
                            <tbody  id="permissionInsert">
                            <tr><td>菜单名:<input type="text" id="menuName" class="form-control" ></td></tr>
                            <tr><td>链接:<input type="text" id="menuUrl" class="form-control"></td></tr>
                            <tr><td>启用状态:<select id="status" class="form-control">
                                <option value="1" selected>启用</option>
                                <option value="0">禁用</option>
                            </select></td></tr>
                            <tr><td>描述:<input type="text" id="description" class="form-control"></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary"   onclick="InsertDate()">提交</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>


<script>
import $ from 'jquery'

export default {
    created() {
        this.search()
    },
    data () {
        return {
            tableData: [],
            dialogEditFormVisible: false,
            EditMenuform: {
                menuName: '',
                status: "",
                description: "",
            },
            formLabelWidth: '180px',
        }
    },
    methods: {
        search: function() {
            console.log("查询");
            let self = this;
            this.$http.get(this.HOST + "/menu/findAllMenu")
            .then((response)=> {
                console.log(response.data.data);
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
        statusFormat: function(row, column) {
            var data = row[column.property];
            if (data == 1) {
                return "启用中";    
            } else{
                return "禁用中";
            }
        },
        openDialogForEditMenuItem: function(row) {
            let self = this;
            //显示dialog
            self.dialogEditFormVisible = true;

            this.$http.get(this.HOST + "/menu/selectById", {params: {
                menuId: row.menuId,
            }}).then((response)=> {
                console.log(response.data);
                if (response.data.code == 1) {
                    self.EditMenuform.menuName = response.data.data.menuName;
                    self.EditMenuform.description = response.data.data.description;
                    if(response.data.data.status == 1) {
                        self.EditMenuform.status = "启用中"
                    } else {
                        self.EditMenuform.status = "已禁用";
                    }
                    
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
