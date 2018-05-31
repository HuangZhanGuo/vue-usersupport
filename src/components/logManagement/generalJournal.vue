<template>
<div>
  <el-form  :inline="true" ref="form" :model="form">
        <div style="margin-top: 15px;">
            <el-form-item label="手机号:">
            <el-input v-model="mobile" placeholder="手机号"  label="手机号:" ></el-input>
            </el-form-item>
            <el-form-item label="交易类型:">
                <el-select v-model="type" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            
            </el-form-item>
           <el-date-picker
            v-model="datetimeStart"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp">
            </el-date-picker>
            <el-date-picker
            v-model="datetimeEnd"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp">
            </el-date-picker>
            
        
        <el-button  @click="searchM" type="info" round>查询</el-button>
        </div>
    </el-form>
     <div>
                <el-table
                    v-loading="loading2"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="journaltype"
                        label="类型"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="userid"
                        label="账户id">
                    </el-table-column>
                    <el-table-column
                        prop="serialnumber"
                        label="账户名">
                    </el-table-column>
                    <el-table-column
                        prop="relationid"     
                        label="流水号">
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="关联id">
                    </el-table-column>
                    <el-table-column 
                    :formatter="formatterInouttype"
                        prop="inouttype"
                        label="收入支出">
                        
                    </el-table-column>
                    <el-table-column 
                        prop="amount"
                        label="金额">
                    </el-table-column>
                    <el-table-column 
                        prop="balance"
                        label="余额">
                    </el-table-column>
                    <el-table-column 
                        prop="remarks"
                        label="备注">
                    </el-table-column>
                    <el-table-column 
                    :formatter="formatterTime"
                        prop="createtime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column 
                    :formatter="formatterTime"
                        prop="modifytime"
                        label="修改时间">
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
</template>
<script>
export default {
    data () { 
        return {
        datetimeStart:'',
        datetimeEnd:'',
        tableData:[],
        currentPage:1, 
        pagesize:10, 
        total:0,
        mobile:'',
        options:[{
            value: '',
          label: '所有类型'
        },
        {
            value: '0',
          label: '支付'
        },
        {
            value: '1',
          label: '收入'
        }
        ],
        type:'',
        loading2:false
        }
    },
    methods:{
    searchM:function(){
        console.log("cha xun");
        let self = this;
        self.loading2=true;
        var mobile = this.mobile;
        if(mobile == "" || mobile == null){
            alert("请选择手机");
            self.loading2 = false;
            return;
        }
        var type = this.type;
        var start = this.datetimeStart;
        if(start == "" || start == null){
                alert("请选择开始时间");
                self.loading2 = false;
                return;
            }
        var end = this.datetimeEnd;
        if(end == "" || end == null){
                alert("请选择结束时间");
                self.loading2 = false;
                return;
            }

        var params = new URLSearchParams();

        params.append("mobile", mobile);
        params.append("type", type);
        params.append("starttime", start);
        params.append("endtime",end);
        params.append("pageNumber",self.currentPage);
         params.append("pageSize",self.pagesize);
        

         this.$http.post(this.HOST+"/log/generalPage",params)
            .then(function(res){
                self.loading2=false;
                console.log(self.tableData);
              self.tableData=res.data.data.data;
              self.total=res.data.data.totalCount;
            })
        
        },
        handleSizeChange: function(val) {
            this.pagesize = val;
            this.searchM(this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.searchM(this.currentPage, this.pagesize);
        },
        formatterTime(row, column){
            return Format(new Date(row[column.property]),"yyyy-MM-dd HH:mm")
        },
        formatterInouttype(row, column) {
            switch(row.inouttype){
                

                case 0:
                return '支出';
                break;

                case 1:
                return '收入';
                break;
            
             
            }
        },
    }  ,
    
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


