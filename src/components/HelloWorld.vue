<template>
  	<div class="hello">
		 <!-- 导航 -->
		<div class="container">
		<div class="waterfall">
			<div class="item" v-for="item in imgList" :key="item.Id">
				<img :src="item.ImgUrl">
			</div>
		</div>
		</div>
  	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
		imgList: [
			{
				Id: "sssssssssssssssssssssssss",
				Name: "唯美意境图片",
				ImgUrl: require("@/assets/01.jpeg")
			},
			{
				Id: "s5555555555555555555ddddddd",
				Name: "名侦探柯南",
				ImgUrl: require("@/assets/01.jpg")
			},
			{
				Id: "5dddddddddddddddddddddddd5",
				Name: "名侦探柯南",
				ImgUrl: require("@/assets/02.jpg")
			},
			{
				Id: "sssssssssssssssssssss",
				Name: "唯美意境图片",
				ImgUrl: require("@/assets/2.jpg")
			},
			{
				Id: "safsfasdgfdfsgdfjkdjdjjd",
				Name: "唯美意境图片",
				ImgUrl: require("@/assets/3.jpg")
			},
			{
				Id: "sssssssssssssssslllllllllllll",
				Name: "唯美意境图片",
				ImgUrl: require("@/assets/4.jpg")
			}
		],
		model14: "",
		loading2: false,
		options2: []
    }
  },
  methods: {
	  
  },
  created (){
	  window.vm = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/*大层*/
.container {
	width: 100%;
	padding: 0 10px;
	margin: 0 auto;
}

/*瀑布流层*/
.waterfall {
	-moz-column-count: 2;
	/* Firefox */
	-webkit-column-count: 2;
	/* Safari 和 Chrome */
	column-count: 2;
	// 左右图片之间没有间距
	-moz-column-gap: 0;
	-webkit-column-gap: 0;
	column-gap: 0;
}

/*一个内容层*/
.item {
	margin: 0;
	-moz-page-break-inside: avoid;
	-webkit-column-break-inside: avoid;
	break-inside: avoid;
	border: 1px solid #999;
}

.item img {
	width: 100%;
}
</style>
