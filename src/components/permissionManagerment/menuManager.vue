<template>
<div class="container center" style="margin-top: 20px; width: 80%">
    <div class="panel panel-default" id="document">
        <!-- Default panel contents -->
        <div class="panel-heading">菜单管理
        <button style = "float: right" class="btn btn-default" type="button" @click="openDialogForAddMenuItem()">新增菜单</button>
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
                    prop="menuUrl"
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
                    <el-form-item label="url" :label-width="formLabelWidth">
                    <el-input v-model="EditMenuform.menuUrl" auto-complete="off" style="width: 300px"></el-input>
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
                    <el-button type="primary" @click="saveEditMenuItem">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="新增菜单" :visible.sync="dialogAddFormVisible" style="padding: 40px 160px;">
               <el-form  :model="AddMenuform">
                    <el-form-item label="菜单名：">
                        <el-input v-model="AddMenuform.meunName"></el-input>
                    </el-form-item>
                    <el-form-item label="链接：">
                        <el-input v-model="AddMenuform.menuUrl"></el-input>
                    </el-form-item>
                    <el-form-item  label="启用状态：">
                        <el-select v-model="AddMenuform.status"  placeholder="请选择启用状态">
                            <el-option label="启用" value="0"></el-option>
                            <el-option label="禁用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述:">
                        <el-input v-model="AddMenuform.description"></el-input>
                    </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAddMenuItem">确 定</el-button>
                </div>
            </el-dialog>
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
            dialogAddFormVisible: false,
            EditMenuform: {
                menuUrl: "",
                status: "",
                description: "",
            },
            AddMenuform:{
                menuName:'',
                menuUrl: '',
                status: "",
                description: "",
            },
            currentMenuId:"",
            formLabelWidth: '180px',
        }
    },
    methods: {
        search: function() {
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
                    self.currentMenuId=row.menuId;
                    self.EditMenuform.menuUrl = response.data.data.menuUrl;
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
                    self.currentMenuId="";
                    this.$message({
                    message: "查询异常。请刷新页面或重新登录后尝试。",
                    type: 'error'
                    });
                }
            })
        },openDialogForAddMenuItem: function(){
            let self = this;
            self.AddMenuform.menuName=''
            self.AddMenuform.menuUrl=''
            self.AddMenuform.status=''
            self.AddMenuform.description=''
            //显示dialog
            self.dialogAddFormVisible = true;

        },saveAddMenuItem: function(){
            let self = this;
            var params = new URLSearchParams();
            params.append("menuName", self.AddMenuform.menuName);
            params.append("menuUrl", self.AddMenuform.menuUrl);
            params.append("status", self.AddMenuform.status);
            params.append("description", self.AddMenuform.description);
            this.$http.post(this.HOST + "/menu/insertSelective", params)
            .then((response)=> {
                console.log(response.data);
                if (response.data.code == 1) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                    message: "授权异常。请刷新页面或重新登录后尝试。",
                    type: 'error'
                    });
                }
            })
        },deleteMenuItem: function(row){
            let self = this;
            this.$http.get(this.HOST + "/menu/deleteMenu", {params: {
                menuId: row.menuId,
            }}).then((response)=> {
                console.log(response.data);
                if (response.data.code == 1) {
                    this.search()                  
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                    message: "删除失败",
                    type: 'error'
                    });
                }
            })
        },saveEditMenuItem: function(){
            let self = this;
            var params = new URLSearchParams();
            params.append("menuId",self.currentMenuId);
            params.append("menuUrl", self.EditMenuform.menuUrl);
            var statuss = self.EditMenuform.status;
            if(statuss=="启用中"){ statuss = 1;}
            if(statuss=="禁用中"){ statuss = 0;}
            params.append("status", statuss);
            params.append("description", self.EditMenuform.description);
            this.$http.post(this.HOST + "/menu/updateByPrimaryKey", params)
            .then((response)=> {
                console.log(response.data);
                if (response.data.code == 1) {
                    this.search()
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                    message: "编辑失败",
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
