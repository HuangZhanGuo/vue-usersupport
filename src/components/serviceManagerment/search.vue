
<template>
 <div >
   <div>
        <el-form :inline="true" id="repaymentForm" class="demo-form-inline">
          
            <el-form-item >
                <el-input v-model="telephone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input v-model="orderId" placeholder="订单ID"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input v-model="creditId" placeholder="债权ID"></el-input>
            </el-form-item>
            <el-date-picker
                v-model="dateTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-form-item label="">
                <el-select v-model="bizStatus1" placeholder="全部">
                <el-option label="已还" value="100"></el-option>
                <el-option label="未还" value="200"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top: 20px">
                <label>用户资产信息：</label>
                
            </div>
        <div class="table table-bordered data-table display" cellspacing="0" style="width:100%;word-break: keep-all;white-space:nowrap">
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    prop="userId"
                    label="用户ID"
                    show-overflow-tooltip="true"
                    >
                </el-table-column>
                <el-table-column
                    prop="realName"
                    label="用户名"
                     show-overflow-tooltip="true"
                    >
                </el-table-column>
                <el-table-column
                    prop="mobile"
                     show-overflow-tooltip="true"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="cash" 
                     show-overflow-tooltip="true"
                    label="可用余额">
                </el-table-column>
                <el-table-column
                    prop="frozenFpOrderCash" 
                     show-overflow-tooltip="true"
                    label="在投金额">
                </el-table-column>
                <el-table-column
                    prop="frozenWithDrawCash"
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="提现冻结金额">
                </el-table-column>
                <el-table-column 
                    prop="totalCredPlanPrincipal" 
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="债权计划本金总额">
                </el-table-column>
                <el-table-column 
                    prop="totalCredRealPrincipal"
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="债权实收本金总额">
                </el-table-column>
                <el-table-column 
                    prop="totalCredPlanInterest" 
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="债权计划利息总额">
                </el-table-column>
                <el-table-column 
                    prop="totalCredRealInterest" 
                     show-overflow-tooltip="true"
                     align='center' width='130px'    
                    label="债权实收利息总额">
                </el-table-column>
                <el-table-column 
                    prop="totalRedPlanAmount"
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="应收红包总额">
                </el-table-column>
                <el-table-column 
                    prop="totalRedRealAmount" 
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="实收红包总额">
                </el-table-column>
                <el-table-column 
                    prop="totalVipPlanAmount"
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="应收vip总收益">
                </el-table-column>
                <el-table-column 
                    prop="totalVipRealAmount" 
                     show-overflow-tooltip="true"
                     align='center' width='130px'
                    label="实收vip总收益">
                </el-table-column>
                <el-table-column 
                    prop="totalPfPlanAmount"
                     show-overflow-tooltip="true"
                    label="应收加息总额">
                </el-table-column>
                <el-table-column 
                    prop="totalPfRealAmount" 
                     show-overflow-tooltip="true"
                    label="实收加息总额">
                </el-table-column>
                <el-table-column 
                    prop="totalAssets"
                     show-overflow-tooltip="true"
                    label="总资产">
                </el-table-column>
            </el-table>
       <!-- </div> -->
            <div style="margin-top: 20px">
                <label>用户债权还款信息：</label>
                <span style="float: right">
                    <input type="button" class="form-control hide" @click="exportRepayment()" value="导出查询结果" id="exportExcel"/>
                </span>
            </div>
            <!-- <div class="table table-bordered data-table display" cellspacing="0" style="width:100%;word-break: keep-all;white-space:nowrap"> -->
                    <el-table
                    v-loading="loading2"
                    :data="tableData1"
                    tooltip-effect="dark"
                    
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        type="index"
                        label="编号"
                         show-overflow-tooltip="true"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="creditId"
                        label="债权ID"
                        show-overflow-tooltip="true"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="orderId"
                        show-overflow-tooltip="true"
                        label="订单ID">
                    </el-table-column>
                    <el-table-column
                        prop="userId" 
                        show-overflow-tooltip="true"
                        label="用户ID">
                    </el-table-column>
                    <el-table-column
                        prop="planDate" 
                        :formatter="planDate"
                        show-overflow-tooltip="true"
                        label="计划还款时间">
                    </el-table-column>
                    <el-table-column
                        prop="bizStatus"
                        :formatter="bizStatus"
                        show-overflow-tooltip="true"
                        label="是否还款">
                    </el-table-column>
                    <el-table-column 
                        prop="credPlanPrincipal"
                        show-overflow-tooltip="true" 
                        label="债权计划本金">
                    </el-table-column>
                    <el-table-column 
                        prop="credRealPrincipal"
                        show-overflow-tooltip="true"
                        label="债权实收本金">
                    </el-table-column>
                    <el-table-column 
                        prop="credPlanInterest" 
                        show-overflow-tooltip="true"
                        label="债权计划利息">
                    </el-table-column>
                    <el-table-column 
                        prop="credRealInterest"
                        show-overflow-tooltip="true"
                        label="债权实收利息">
                    </el-table-column>
                    <el-table-column 
                        prop="redPlanAmount"
                        show-overflow-tooltip="true"
                        :formatter="redPlanAmount"
                        label="应收红包金额">
                    </el-table-column>
                    <el-table-column 
                        prop="redRealAmount" 
                        show-overflow-tooltip="true"
                        :formatter="redRealAmount"
                        label="实收红包金额">
                    </el-table-column>
                    <el-table-column 
                        prop="vipRate"
                        show-overflow-tooltip="true"
                        :formatter="vipRate"
                        label="vip利率">
                    </el-table-column>
                    <el-table-column 
                        prop="vipPlanAmount"
                        show-overflow-tooltip="true" 
                        :formatter="vipPlanAmount"
                        label="应收vip收益">
                    </el-table-column>
                    <el-table-column 
                        prop="vipRealAmount"
                        show-overflow-tooltip="true"
                        :formatter="vipRealAmount"
                        label="实收vip收益">
                    </el-table-column>
                    <el-table-column 
                        prop="vipTermNum"
                        show-overflow-tooltip="true"
                        :formatter="vipTermNum" 
                        label="vip期数">
                    </el-table-column>
                    <el-table-column 
                        prop="pfPlanAmount"
                        show-overflow-tooltip="true"
                        :formatter="pfPlanAmount"
                        label="应收加息金额">
                    </el-table-column>
                    <el-table-column 
                        prop="pfRealAmount"
                        show-overflow-tooltip="true"
                        :formatter="pfRealAmount"
                        label="实收加息金额">
                    </el-table-column>
                    <el-table-column 
                        prop="pfTermNum"
                        show-overflow-tooltip="true"
                        :formatter="pfTermNum"
                        label="加息期数">
                    </el-table-column>
                    <el-table-column 
                        prop="pfType"
                        show-overflow-tooltip="true"
                        :formatter="pfType"
                        label="加息类型">
                    </el-table-column>
                    <!--  -->
                    
                </el-table>
            
                <el-pagination
                        align="center"
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
  data() {
    return {
      dateTime: [],
      bizStatus1: '',
      currentPage: 1,
      pagesize: 10,
      total: 0,
      tableData1:[],
      tableData:[],
      

    };
  },
  methods:{
      onSubmit:function(){
          let self = this;
          var startTime=null;
          var endTime=null;
          if(self.dateTime[0] != null && self.dateTime[0] != ""){
          startTime = new Date(self.dateTime[0]).getTime();
         }
         if(self.dateTime[1] != null && self.dateTime[1] != ""){
            endTime = new Date(self.dateTime[1]).getTime();
            
            }
        if( self.telephone==null|| self.telephone==''){
            this.$message({
                message: '请输入电话',
                type: 'warning'
            });
            return;
        }
        if( self.orderId==null|| self.orderId==''){
            this.$message({
                message: '请输入订单Id',
                type: 'warning'
            });
            return;
        }
        if( self.creditId==null|| self.creditId==''){
            this.$message({
                message: '请输入债权Id',
                type: 'warning'
            });
            return;
        }

        if(self.dateTime==null||self.dateTime==''){
            this.$message({
                message: '请选择时间',
                type: 'warning'
            });
            return;
        }
          var params = new URLSearchParams();
            params.append("mobile", self.telephone);
            params.append("orderId", self.orderId);
            params.append("creditId",self.creditId);
            params.append("startTime",startTime);
            params.append("endTime",endTime);
            params.append("bizStatus",self.bizStatus1);
            params.append("PageNumber",self.currentPage);
            params.append("PageSize",self.pagesize);
            this.$http.post(this.HOST+"/service/repayment",params)
            .then(function(res){
                self.loading2=false;
                self.tableData1=res.data.data[0].data;
                self.tableData=res.data.data[1].data;
                self.total=res.data.data[0].totalCount;
              $("#exportExcel").removeClass("hide");
            })
      },
      //每页显示数据量变更
        handleSizeChange: function(val) {
            this.pagesize = val;
            this.searchAttendance(this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.searchAttendance(this.currentPage, this.pagesize);
        }, 
      bizStatus(row,column){
        //   100待还、200已还、300逾期还款、400提前还款、500坏账回购
        console.log(row.bizStatus);
          switch(row.bizStatus){
                case 100:
                return '待还';
                break;

                case 200:
                return '已还';
                break;

                case 300:
                return '逾期还款';
                break;
            
                case 400:
                return '提前还款';
                break;

                case 500:
                return '坏账回购';
                break;

                default:
                return '未知';
      }
    },
    redPlanAmount(row,column){
        if(row.redPlanAmount==null){
            return '0';
        }
    },
    redRealAmount(row){
        if(row.redRealAmount==null){
            return '0';
        }
    },
   vipRate(row){
        if(row.vipRate==null){
            return '';
        }
    },
   vipPlanAmount(row){
        if(row.vipPlanAmount==null){
            return '0';
        }
    },
    vipRealAmount(row){
        if(row.vipRealAmount==null){
            return '0';
        }
    },
    vipTermNum(row){
        if(row.vipTermNum==null){
            return '';
        }else{
            return row.vipTermNum+"期";
        }
    },
    pfPlanAmount(row){
        if(row.pfPlanAmount==null){
            return '0';
        }
    },
    pfRealAmount(row){
        if(row.pfRealAmount==null){
            return '0';
        }
    },
    pfTermNum(row){
        if(row.pfTermNum==null){
            return '';
        }else{
            return row.pfTermNum+"期";
        }
    },
    pfType(row,column){
        switch (row.pfType) {
            case 100:
                return '首购加息';
                break;
            case 200:
                return '限时加息';
                break;
            case 300:
                return '项目加息';
                break;
            default:
                return '';
                break;
        }
    },
    planDate(row,column){
        return new Date(parseInt(row.planDate)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    /**
     * 将结果导出到excel
     */
    exportRepayment:function() {
        $("#repaymentForm").attr("action",this.HOST+"/repayment/export"); 
        $("#repaymentForm").submit();
    }


  }
};
</script>

<style>
</style>
