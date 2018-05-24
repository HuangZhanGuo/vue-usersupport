<template>
<!--问题详情-->
<div id='customerRecord'>
<div class="container center" style="margin-top: 20px;" id="solveProblem">
    <form  id="formData">
    <!--客户信息-->
    <div class="container center" style="width:100%;">
        <div class="container center" style="width:100%;">
            <form class="navbar-form navbar-left" role="search" >
                <div class="form-group">
                    电话：<input type="text" v-model="phoneNumber" class="form-control" name="phoneNumber"  id="phoneNumber" placeholder="请输入电话号码">
                    客户姓名：<input type="text" v-model="name" class="form-control"  name="name" id="name" placeholder="请输入客户姓名">

                </div>
            </form>
        </div>
    </div>
    <div class="container center" style="width:100%;">
        <div class="container center" style="width:100%;">
                <div class="form-group" id="sanji">
                    问题类型：<select class="form-control" id="type" ></select>
                    --<select class="form-control" id="type1"><option value="-1" id="-2">---请选择---</option></select>
                    --<select class="form-control" id="type2"><option value="-1" id="-3">---请选择---</option></select>
        </div>
    </div>


        <div class="form-group">
            <label for="title">问题标题</label>
            <input type="text" v-model="title" class="form-control" id="title" name="title" placeholder="请输入问题标题">
        </div>
        <div class="form-group">
            <label for="description">问题详情</label>
            <textarea class="form-control" v-model="description" rows="3" id="description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="solve">问题处理</label>
            <textarea class="form-control" v-model="solve" rows="3" id="solve" name="solve"></textarea>
        
        </div>
        <div class="form-group">
            <label for="file">图片</label>
            <input type="file" id="file"  multiple="multiple" accept="image/png,image/jpg,image/gif,image/JPEG">
        </div>
        <div id="imgBox" style="padding-bottom:15px; "></div>
        <div>
            <button type="button" class="btn btn-info" onclick="insertService(0)">草稿</button>
            <button type="button"  class="btn btn-success" onclick="insertService(1)">待处理</button>
        </div>

    <!--问题详情结束-->
    </div>
    </form>

</div>

</div>
</template>

<script>
export default {
     data() {
         return{
             msg:数据,
            phoneNumber:'',
            name:'',
            title:''
            }
     },
  methods: {

  }
}
</script>