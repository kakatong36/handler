<template>
  	<div class="hello">
		 <!-- 导航 -->
		<div class="container">
			<div class='row'>
				<div class='col-lg-3 col-sm-6'>
					<img src="../assets/01.jpg" alt="">
				</div>
				<div class='col-lg-3 col-sm-6'>
					<img src="../assets/02.jpg" alt="">
				</div>
				<div class='col-lg-3 col-sm-6'>
					<img src="../assets/03.jpg" alt="">
				</div>
				<div class='col-lg-3 col-sm-6'>
					<img src="../assets/04.jpg" alt="">
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
.hello img{
	width: 100%;
}
.container{
}
</style>
