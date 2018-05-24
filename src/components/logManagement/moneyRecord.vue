
<template>
    <div id="content">
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
                        prop="touserid"
                        label="汇入者编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="tousernickname"
                        label="汇入者的昵称">
                    </el-table-column>
                    <el-table-column
                        prop="fromuserid"
                        label="汇出者编号">
                    </el-table-column>
                    <el-table-column
                        prop="fromusernickname"     
                        label="汇出者的昵称">
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="amount">
                    </el-table-column>
                    <el-table-column 
                        prop="accountbalance"
                        label="交易后账户余额">
                    </el-table-column>
                    <el-table-column 
                        prop="tradetype"
                        :formatter="formatterColumn"
                        label="资金来往类型">
                    </el-table-column>
                    <el-table-column 
                        prop="tradetime"
                        :formatter="formatterTradetime"
                        label="交易时间">
                    </el-table-column>
                    <el-table-column 
                        prop="tradechannel"
                        label="交易渠道">
                    </el-table-column>
                    <el-table-column 
                        prop="tradecomment"
                        label="交易备注">
                    </el-table-column>
                    <el-table-column 
                        prop="loanid"
                        label="关联的loanId">
                    </el-table-column>
                    <el-table-column 
                        prop="loantitle"
                        label="借款标题">
                    </el-table-column>
                    <el-table-column 
                        prop="loanportraitpath"
                        label="标头像的路径">
                    </el-table-column>
                    <el-table-column 
                        prop="outserialno"
                        label="外部序列号">
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

    <!-- <div class="panel panel-default" style="width:100%;height:auto;overflow:auto;">
        <table class="table table-bordered table-striped" style="min-width:1020px;word-break: keep-all;" id="datatables">
            <thead>
            <tr>
                <th width="80px">id</th>
                <th width="80px">汇入者id</th>
                <th width="80px">汇入者的昵称</th>
                <th width="80px">汇出者id</th>
                <th width="80px">汇出者的昵称</th>
                <th width="80px">汇出者的昵称</th>
                <th width="80px">交易后账户余额</th>
                <th width="80px">资金来往类型</th>
                <th width="80px">交易时间</th>
                <th width="80px">交易渠道</th>
                <th width="80px">交易备注</th>
                <th width="80px">关联的loanId</th>
                <th width="80px">借款标题</th>
                <th width="80px">标头像的路径</th>
                <th width="80px">外部序列号</th>
            </tr>
            </thead>
            
        </table>
    </div> -->
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
            value: '1',
          label: '汇入'
        },
        {
            value: '2',
          label: '汇出'
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
                return;
            }
        var type = this.type;
        var start = this.datetimeStart;
        if(start == "" || start == null){
                alert("请选择开始时间");
                return;
            }
        var end = this.datetimeEnd;
        if(end == "" || end == null){
                alert("请选择结束时间");
                return;
            }

        var params = new URLSearchParams();

        params.append("mobile", mobile);
        params.append("type", type);
        params.append("starttime", start);
        params.append("endtime",end);
        params.append("pageNumber",self.currentPage);
         params.append("pageSize",self.pagesize);
        

         this.$http.post(this.HOST+"/money/getMoneyRecordPage",params)
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
        formatterTradetime(row,column){
            return Format(new Date(row.tradetime),"yyyy-MM-dd HH:mm")
        },
        formatterColumn(row, column) {
            switch(row.tradetype){
                // 0：正常，1：迟到，2：早退，3：迟到早退，4：旷工，5：异常，6：请假，7：调休）
                

                case 1:
                return '汇入';
                break;

                case 2:
                return '汇出';
                break;
            
             
            }
        },
    }  ,
    
}
</script>
<style>
      
</style>


