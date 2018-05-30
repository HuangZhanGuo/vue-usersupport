<template>
    <div id="content" v-loading="loading2">
        <div class="container-fluid">
            <el-form class="form-inline" id="repaymentForm" method="post">
                <!--用于存储当前iframe的id-->
                <el-input type="hidden" v-model="iframeId" name="iframeId" id="iframeId"></el-input>
                <div class="form-group">
                    <el-input v-model="mobile" clearable id="mobile" name="mobile" placeholder="手机号"></el-input>
                </div>
                <div class="form-group">
                    <el-input v-model="orderId" clearable id="orderId" name="orderId" placeholder="订单ID"></el-input>
                </div>
                <div class="form-group">
                    <!-- <el-date-picker  arrow-control v-model="datetimeStart" type="date"  placeholder="选择日期"></el-date-picker>
                    <el-date-picker  arrow-control v-model="datetimeEnd" type="date"  placeholder="选择日期"></el-date-picker> -->
                    <el-date-picker
                        v-model="dateTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="form-group">
                    <el-select v-model="bizStatus" placeholder="类型" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已还" value="200"></el-option>
                        <el-option label="未还" value="100"></el-option>
                    </el-select>
                </div>
                <div style="float: right">
                    <!-- <el-button type="primary" onclick="reset()" >重置</el-button>&nbsp;&nbsp; -->
                    <el-button type="primary" @click="search()" >查询</el-button>
                </div>
            </el-form>

            <!-- datatable_length datatable_filter <table class=""width="100%" id="datatable" style="word-break: keep-all;white-space:nowrap">-->

            
            <div>
                <label>用户资产信息：</label>
            </div>
            <div>
                <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
                        <el-table-column prop="userId" show-overflow-tooltip="true" label="用户ID"></el-table-column>
                        <el-table-column prop="realName" show-overflow-tooltip="true" label="用户名" ></el-table-column>
                        <el-table-column prop="mobile" show-overflow-tooltip="true" label="手机号" width="150"></el-table-column>
                        <el-table-column prop="cash" show-overflow-tooltip="true" label="可用余额"></el-table-column>
                        <el-table-column prop="frozenFpOrderCash" show-overflow-tooltip="true" label="在投金额" ></el-table-column>
                        <el-table-column prop="frozenWithDrawCash" show-overflow-tooltip="true" label="提现冻结金额" ></el-table-column>
                        <el-table-column prop="totalCredPlanPrincipal" show-overflow-tooltip="true" label="债权计划本金总额" ></el-table-column>
                        <el-table-column prop="totalCredRealPrincipal" show-overflow-tooltip="true" label="债权实收本金总额"></el-table-column>
                        <el-table-column prop="totalCredPlanInterest" show-overflow-tooltip="true" label="债权计划利息总额"></el-table-column>
                        <el-table-column prop="totalCredRealInterest" show-overflow-tooltip="true" label="债权实收利息总额"></el-table-column>
                        <el-table-column prop="totalRedPlanAmount" show-overflow-tooltip="true" label="应收红包总额"></el-table-column>
                        <el-table-column prop="totalRedRealAmount" show-overflow-tooltip="true" label="实收红包总额"></el-table-column>
                        <el-table-column prop="totalVipPlanAmount" show-overflow-tooltip="true" label="应收vip总收益"></el-table-column>
                        <el-table-column prop="totalVipRealAmount" show-overflow-tooltip="true" label="实收vip总收益"></el-table-column>
                        <el-table-column prop="totalPfPlanAmount" show-overflow-tooltip="true" label="应收加息总额"></el-table-column>
                        <el-table-column prop="totalPfRealAmount" show-overflow-tooltip="true" label="实收加息总额"></el-table-column>
                        <el-table-column prop="totalAssets" show-overflow-tooltip="true" label="总资产" ></el-table-column>
                </el-table>
            </div>

            <div style="margin-top: 20px">
                <label>用户订单还款信息：</label>
                <span style="float: right">
                    <el-button :class="{hide:ishide}" @click="exportRepaymentOrder()" id="exportExcel">导出查询结果</el-button>
                </span>
                <span style="float: right">
                    <el-button type="primary" :class="{hide:ishide}" @click="searchRepaymentDetail()"  id="getRepaymentDetail">查询债权还款明细</el-button>
                </span>
            </div>
            <div>
                <el-table :data="tableData2" tooltip-effect="dark" style="width: 100%">
                        <el-table-column type="index" show-overflow-tooltip="true"  label="编号"></el-table-column>
                        <el-table-column prop="orderId" show-overflow-tooltip="true" label="订单ID" width="150"></el-table-column>
                        <el-table-column prop="userId" show-overflow-tooltip="true" label="用户ID"></el-table-column>
                        <el-table-column prop="planDate" :formatter="formatPlanDate" width="200" label="计划还款时间"></el-table-column>
                        <el-table-column prop="bizStatus" :formatter="formatBizStatus" show-overflow-tooltip="true" label="是否还款" ></el-table-column>
                        <el-table-column prop="credPlanPrincipal" show-overflow-tooltip="true" label="订单计划本金" ></el-table-column>
                        <el-table-column prop="credRealPrincipal" show-overflow-tooltip="true" label="订单实收本金"></el-table-column>
                        <el-table-column prop="credPlanInterest" show-overflow-tooltip="true" label="订单计划利息" ></el-table-column>
                        <el-table-column prop="credRealInterest" show-overflow-tooltip="true" label="订单实收利息" ></el-table-column>
                        <el-table-column prop="redPlanAmount" :formatter="formatRedPlanAmount" show-overflow-tooltip="true" label="应收红包金额" ></el-table-column>
                        <el-table-column prop="redRealAmount" :formatter="formatRedRealAmount" show-overflow-tooltip="true" label="实收红包金额"></el-table-column>
                        <el-table-column prop="vipPlanAmount" :formatter="formatVipPlanAmount" show-overflow-tooltip="true" label="vip计划收益"></el-table-column>
                        <el-table-column prop="vipRealAmount" :formatter="formatVipRealAmount" show-overflow-tooltip="true" label="vip实际收益" ></el-table-column>
                        <el-table-column prop="pfPlanAmount" :formatter="formatPfPlanAmount" show-overflow-tooltip="true" label="应收加息金额"></el-table-column>
                        <el-table-column prop="pfRealAmount" :formatter="formatPfRealAmount" show-overflow-tooltip="true" label="实收加息金额"></el-table-column>

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
            <div :class ="{hide:isDetail}" id="repaymentDetailDiv">
                <div style="margin-top: 20px">
                    <label>用户债权还款明细信息：</label>
                    <span style="float: right">
                    <el-button type="primary" @click="exportRepaymentDetail()" id="exportExcel2">导出查询结果</el-button>
                </span>
                </div>

                <el-table :data="tableData3" tooltip-effect="dark" style="width: 100%">
                        <el-table-column type="index" show-overflow-tooltip="true"  label="编号"></el-table-column>
                        <el-table-column prop="creditId" show-overflow-tooltip="true" label="债权ID" width="150"></el-table-column>
                        <el-table-column prop="orderId" show-overflow-tooltip="true" label="订单ID" width="150"></el-table-column>
                        <el-table-column prop="userId" show-overflow-tooltip="true" label="用户ID"></el-table-column>
                        <el-table-column prop="planDate" :formatter="formatPlanDate" width="200" label="计划还款时间"></el-table-column>
                        <el-table-column prop="bizStatus" :formatter="formatBizStatus" label="是否还款" ></el-table-column>
                        <el-table-column prop="credPlanPrincipal" show-overflow-tooltip="true" label="债权计划本金" ></el-table-column>
                        <el-table-column prop="credRealPrincipal" show-overflow-tooltip="true" label="债权实收本金"></el-table-column>
                        <el-table-column prop="credPlanInterest" show-overflow-tooltip="true" label="债权计划利息" ></el-table-column>
                        <el-table-column prop="credRealInterest" show-overflow-tooltip="true" label="债权实收利息" ></el-table-column>
                        <el-table-column prop="credTermNum" :formatter="formatCredTermNum" show-overflow-tooltip="true" label="期数" ></el-table-column>
                        <el-table-column prop="redLocalInfo" :formatter="formatRedLocalInfo" show-overflow-tooltip="true" label="红包信息"></el-table-column>
                        <el-table-column prop="redPlanAmount" :formatter="formatRedPlanAmount" show-overflow-tooltip="true" label="应收红包金额"></el-table-column>
                        <el-table-column prop="redRealAmount" :formatter="formatPfRealAmount" show-overflow-tooltip="true" label="实收红包金额" ></el-table-column>
                        <el-table-column prop="redPackageType" :formatter="formatRedPackageType" show-overflow-tooltip="true" label="红包类型"></el-table-column>
                        <el-table-column prop="vipRate" :formatter="formatVipRate" show-overflow-tooltip="true" label="vip利率"></el-table-column>
                        <el-table-column prop="vipPlanAmount" :formatter="formatVipPlanAmount" show-overflow-tooltip="true" label="应收vip收益"></el-table-column>
                        <el-table-column prop="vipRealAmount" :formatter="formatVipRealAmount" show-overflow-tooltip="true" label="实收vip收益"></el-table-column>
                        <el-table-column prop="pfPlanAmount" :formatter="formatPfPlanAmount" show-overflow-tooltip="true" label="应收加息金额"></el-table-column>
                        <el-table-column prop="pfRealAmount" :formatter="formatPfRealAmount" show-overflow-tooltip="true" label="实收加息金额"></el-table-column>
                        <el-table-column prop="pfType" :formatter="formatPfType" show-overflow-tooltip="true" label="加息类型"></el-table-column>

                </el-table>
                <el-pagination align="center"
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesize2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            total:0,
            total2:0,
            currentPage:1,
            pagesize:10, 
            currentPage2:1,
            pagesize2:10, 
            loading2:false,
            dateTime:[],
            bizStatus:'',
            orderId:'',
            mobile:'',
            tableData:[],
            tableData2:[],
            tableData3:[],
            iframeId:'',
            ishide:true,
            isDetail:true
        }
    },
    methods:{
        //是否还款
        formatBizStatus (row, column) {
            var data = row[column.property];
            switch(data){
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
        //格式化日期
        formatPlanDate(row,column){
            return new Date(parseInt(row.planDate)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        } ,
        // 期数
        formatCredTermNum(row,column){
            var data = row.credTermNum;
            if(data != null && data != ""){
                return data+"期";
            }else{
                return "";
            }
        },
        //红包信息
        formatRedLocalInfo(row,column){
            var data = row.redLocalInfo;
            if(data != null && data != ""){
                var localInfoJson = JSON.parse(data);
                return localInfoJson.model_name;
            }else{
                return "";
            }
        },
        //应收红包
        formatRedPlanAmount(row,column){
            var data = row.redPlanAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //实收红包
        formatRedRealAmount(row,column){
            var data = row.redRealAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //红包类型
        formatRedPackageType(row,column){
            var data = row.redPackageType;
            switch(data){
                case 1000:
                    return "加息红包";
                    break;
                case 1010:
                    return "返现红包";
                    break;
                default:
                    return "";
                    break;
            }
        },
        //vip利率
        formatVipRate(row,column){
            var data = row.vipRate;
            if(data != null && data != ""){
                return data;
            }else{
                return "";
            }
        },
        //VIP计划收益
        formatVipPlanAmount(row,column){
            var data = row.vipPlanAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //vip实际收益
        formatVipRealAmount(row,column){
            var data = row.vipRealAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //应收加息金额
        formatPfPlanAmount(row,column){
            var data = row.pfPlanAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //实收加息金额
        formatPfRealAmount(row,column){
            var data = row.pfRealAmount;
            if(data != null && data != ""){
                return data;
            }else{
                return "0";
            }
        },
        //加息类型
        formatPfType(row,column){
            var data = row.pfType;
            switch(data){
                case 100:
                    return "首购加息";
                    break;
                case 200:
                    return "限时加息";
                    break;
                case 300:
                    return "项目加息";
                    break;
                default:
                    return "";
                    break;
            }
            
        },
        //查询订单
        search(){
            let self = this;
            self.loading2 = true;
            console.info(self.dateTime);
            console.info(self.dateTime[0]);
            console.info(self.dateTime[1]);
            var startTime = null;
            var endTime = null;
            var flag = false;
            if(!self.mobile){
                this.$message({
                    message: '请输入手机号查询',
                    type: 'warning',
                });
                self.loading2 = false;
                return;
            }
            if(self.dateTime[0] != null && self.dateTime[0] != ""){
                startTime = new Date(self.dateTime[0]).getTime();
            }
            if(self.dateTime[1] != null && self.dateTime[1] != ""){
                endTime = new Date(self.dateTime[1]).getTime();
                flag = true;
            }
            if(!flag){
                this.$message({
                    message: '日期不能为空',
                    type: 'warning'
                });
                self.loading2 = false;
                return;
            }
            var params = new URLSearchParams();
            params.append('mobile', self.mobile);
            params.append('orderId', self.orderId);
            params.append('bizStatus', self.bizStatus);
            params.append('startTime', startTime);
            params.append('endTime', endTime);
            params.append('iframeId', self.iframeId);
            params.append("pageNumber",self.currentPage);
            params.append("pageSize",self.pagesize);
            // var deptName = $("#companySelect option:selected").text();
            this.$http.post(this.HOST + '/service/repaymentOrder',params)
            .then(function (response) {
                console.log(response);
                self.tableData = response.data.data[1].data;
                self.tableData2 = response.data.data[0].data;
                console.info("response.data.data[0].data"+response.data.data[0].data.toString);
                self.total = response.data.data[0].totalCount;
                self.loading2 = false;
                self.ishide = false;
            })
        },
        /**
         * 查询债权还款明细
         */
        searchRepaymentDetail(){
            let self = this;
            self.loading2 = true;
            if(!self.mobile){
                this.$message({
                    message: '请输入手机号查询',
                    type: 'warning',
                });
                self.loading2 = false;
                return;
            }
            if(self.orderId == null || self.orderId == ""){
                this.$message({
                    message: '请选择订单ID重新查询后再查看债权明细',
                    type: 'warning'
                });
                self.loading2 = false;
                return;
            }
            console.info(self.dateTime);
            console.info(self.dateTime[0]);
            console.info(self.dateTime[1]);
            var startTime = null;
            var endTime = null;
            var flag = false;
            if(self.dateTime[0] != null && self.dateTime[0] != ""){
                startTime = new Date(self.dateTime[0]).getTime();
            }
            if(self.dateTime[1] != null && self.dateTime[1] != ""){
                endTime = new Date(self.dateTime[1]).getTime();
                flag = true;
            }
            if(!flag){
                this.$message({
                    message: '日期不能为空',
                    type: 'warning'
                });
                self.loading2 = false;
                return;
            }
            var params = new URLSearchParams();
            params.append('mobile', self.mobile);
            params.append('orderId', self.orderId);
            params.append('bizStatus', self.bizStatus);
            params.append('startTime', startTime);
            params.append('endTime', endTime);
            params.append('iframeId', self.iframeId);
            params.append("pageNumber",self.currentPage2);
          params.append("pageSize",self.pagesize2);
            // var deptName = $("#companySelect option:selected").text();
            this.$http.post(this.HOST + '/service/repaymentDetail',params)
            .then(function (response) {
                console.log("detail"+response);
                self.tableData3 = response.data.data.data;
                self.total2 = response.data.data.totalCount;
                alert(self.total2);
                self.isDetail = false;
                self.loading2 = false;
            })
        },
        //导出
        exportRepaymentOrder(){
            $("#repaymentForm").attr("action",this.HOST+"/repaymentOrder/export");
            // 获取当前iframe的id
            var iframeId = window.frameElement && window.frameElement.id || '';
            $("#iframeId").val(iframeId)
            $("#repaymentForm").submit();
        },
        exportRepaymentDetail(){
            $("#repaymentForm").attr("action",this.HOST+"/repaymentDetail/export");
            // 获取当前iframe的id
            var iframeId = window.frameElement && window.frameElement.id || '';
            $("#iframeId").val(iframeId)
            $("#repaymentForm").submit();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.pagesize = val;
            this. search(this.currentPage, this.pagesize);
        },

        //页码变更
        handleCurrentChange(val) {
            this.currentPage = val;
            this. search(this.currentPage, this.pagesize);
        }, 
        //每页显示数据量变更
        handleSizeChange2(val) {
            this.pagesize2 = val;
            this. searchRepaymentDetail(this.currentPage2, this.pagesize2);
        },

        //页码变更
        handleCurrentChange2(val) {
            this.currentPage2 = val;
            this. searchRepaymentDetail(this.currentPage2, this.pagesize2);
        }, 
    }
}
</script>

<style>
    .hide{
        display: none;
    }
</style>
