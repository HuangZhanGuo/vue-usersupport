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
                        prop="createtime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column 
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
  
}
</script>
<style>

</style>


