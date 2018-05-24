import func from './vue-temp/vue-editor-bridge';
<template>
<div>
<div  >
    <div >
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
                <input type="text" id="number" name="phoneNumber" v-model="phoneNumber" class="form-control" placeholder="手机号">
                <input type="text" id="name" name="workName" v-model="workName"  class="form-control" placeholder="客服名称">
                <select id="statusService" v-model="status" class="form-control">
                    <option value="1">草稿</option>
                    <option value="2">待处理</option>
                    <option value="3">已处理</option>
                    <option value="4">待评价</option>
                    <option value="5">已完成</option>
                </select>
                <input id="datetimeStart" v-model="datetimeStart" class="Wdate form-control" type="text"
                       onclick="WdatePicker({el:this,dateFmt:'yyyy-M-d H:mm:ss',skin:'whyGreen',maxDate:'%y-%M-%d',readOnly:true})" readonly/>
                --
                <input id="datetimeEnd" v-model="datetimeEnd" class="Wdate form-control" type="text"
                       onclick="WdatePicker({el:this,dateFmt:'yyyy-M-d H:mm:ss',skin:'whyGreen',maxDate:'%y-%M-%d',readOnly:true})" readonly/>
                <button type="button"  class="btn btn-primary" v-on:click="startServer" data-toggle="modal" data-target="#startServer" >开始服务</button>
                <button type="button" class="btn btn-default"  v-on:click="searchService">查询</button>
            </div>
            </form>
    
    </div>
</div>
        <div   >
            <!-- Table -->
            <el-table
        :data="cashList"
        style="width: 100%"
        max-height="450">
        <el-table-column
         fixed
          prop="id"
          label="编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="serviceNo"
          label="服务单号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="workName"
          label="处理人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="提交时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="gmtModified"
          label="处理时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="status"
          :formatter="statusForm"
          label="服务状态"
          width="120">
        </el-table-column>
        <el-table-column
         fixed="right"
          label="操作"
          width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          编辑
        </el-button>
      </template>
        </el-table-column>
  </el-table>
        </div>
       <div class="block">
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
      
                <!--<tr style="word-break: keep-all;width: 100%;">
                    <th>id</th>
                    <th>服务单号</th>
                    <th>电话号码</th>
                    <th>客户姓名</th>
                    <th >服务类型</th>
                    <th >客服工号</th>
                    <th>处理人</th>
                    <th>提交时间</th>
                    <th>处理时间</th>
                    <th>服务状态</th>
                    <th >备注</th>
                    <th >创建时间</th>
                    <th >修改时间</th>
                    <th>操作</th>

                </tr>-->
</div>

</template>

<script>
export default {
  data () {
	   return { 
        cashList: [], 
        currentPage:1, 
        pagesize:10, 
        total:0
        } 
    },
    methods:{
      searchService:function(){
          let self = this;
          var params = new URLSearchParams();
          alert("aaa");
          var phoneNumber = $("#number").val();
          var workName = $("#name").val();
          var datetimeStart=$("#datetimeStart").val();
          var datetimeEnd = $("#datetimeEnd").val();
          var status = $("#statusService option:selected").val();
          params.append("phoneNumber",phoneNumber);
          params.append("workName", workName);
          params.append("datetimeStart", datetimeStart);
          params.append("datetimeEnd", datetimeEnd);
          params.append("status", status);
          params.append("pageNumber",self.currentPage);
          params.append("pageSize",self.pagesize);
          console.log(status)
           this.$http.post(this.HOST+"/customer/getServiceByCondition",params)
            .then(function(res){                
              self.cashList=res.data.data.list;
              self.total=res.data.total;
                 console.log(self.cashList);
                console.log(res.data.data.list);  
            })   
      },
       startServer:function(){
         window.location.href = "#/customerService/customerRecord";
      },
      statusForm:(row,column)=>{
          console.log(row.status);
          switch(row.status){
            case 1: 
              return '草稿';
              break;
            case 2: 
              return '待处理';
              break;
            case 3: 
              return '已处理';
              break;
            case 4: 
              return '待评价';
              break;
            case 5: 
              return '已完成';
              break;
          }
      },
     
   mounted() {
         this.getList()
    }
}
}
</script>


