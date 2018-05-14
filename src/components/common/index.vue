<template>
	<div id="main">	
		<Header></Header>
		<div id="include_left_and_main">
			<Left></Left>
			<Content></Content>
		</div>
	</div>
</template>

<script src="/static/js/jquery-3.1.1.js"></script>
<script src="/static/js/bootstrap.min.js"></script>
<script src="/static/js/kindeditor-all-min.js"></script>
<script src="/static/js/common.js"></script>
<script src="/static/lang/zh-CN.js"></script>
<script>

import Header from './head.vue'
import Left from './left.vue'
import Content from './content.vue'

export default {
    name: 'index',
    data () {
        return {
            
    	}
  	},
  	components: {
		Header,
		Left,
		Content,
  	},
}
</script>

<style>
#main {
}


#include_left_and_main {
	position: absolute;
	background-color: #FFFFFF;
	width: 100%;

}
</style>