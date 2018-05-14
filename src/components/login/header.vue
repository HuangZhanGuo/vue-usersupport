<template>
	<div id="system-info">
		<span>{{msg}}</span>
	</div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: '笑脸金服  客服助手管理系统 V1.0.0'
    }
  }
}

</script>

<style scoped>
#system-info {
	padding: 40px 80px 20px 80px;
	width: 100%;
	height: 60px;
	background-color: #36374c;
}
</style>
