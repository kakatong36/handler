<template>
  <div class="hello">
	  <!-- 轮播图 -->
	  <div id='ring_slide' class='carousel slide'>
		  <!-- 轮播小点点 -->
		  <ol class='carousel-indicators'>
			  <li data-target='ring_slide' data-slide-to="0" class="active"></li>
			  <li data-target='ring_slide' data-slide-to="1"></li>
			  <li data-target='ring_slide' data-slide-to="3"></li>
			  <li data-target='ring_slide' data-slide-to="4"></li>
		  </ol>
		  <!-- 循环的图片 -->
		  <div class='carousel-inner'>
			  <div class='item active'>
				  <img src="../assets/01.jpg" alt="">
			  </div>
			  <div class='item'>
				  <img src="../assets/02.jpg" alt="">
			  </div>
			  <div class='item'>
				  <img src="../assets/03.jpg" alt="">
			  </div>
			  <div class='item'>
				  <img src="../assets/04.jpg" alt="">
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
// import '../../node_modules/bootstrap/js/src/carousel.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {

  },
  created (){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
