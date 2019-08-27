<template>
  <div class="scrollList">
    <div class="warbox">
      <!-- <div class="fixedbox">
        <h4 class="area">
          <span class="area_title" data-id='1'></span>
          <div class="area_img">
            <img :src="top" alt="">
          </div>
          <span class="area_namber"></span>
        </h4>
      </div> -->
      <div class="container"> 
        <div class="box" v-for="item in dataList" :key="item.Id">
          <h4 class="area" @click="handleClick(item)">
            <span class="area_title" data-id='1'>{{item.Name}}</span>
            <div class="area_img">
              <img :src="item._isHidden ? bottom : top" alt="">
            </div>
          </h4>
          <h2 class="picture_list" :class="{hiddenHeight: item._isHidden}">
            <div v-for="(img, index) in item.imgList" :key="index"><img :src="img.imgUrl" alt=""></div>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mscroll from "./js/mscroll";
import jqueryOne from "./js/jquery-1.11.0.min";
const urlName = "https://www.17sucai.com/preview/313588/2018-12-29/mscroll";
const imgList = [
  {
    Id: "img1",
    imgUrl: require("@/assets/logo.png")
  },
  {
    Id: "img1",
    imgUrl: require("@/assets/logo.png")
  },
  {
    Id: "img1",
    imgUrl: require("@/assets/logo.png")
  },
  {
    Id: "img1",
    imgUrl: require("@/assets/logo.png")
  }
];
export default {
  name: 'scrollList',
  mixins: [mscroll],
  data () {
    return {
      top: urlName + "/img/top.png",
      bottom: urlName + "/img/bottom.png",
      dataList: [
        {
          Id: "1",
          Name: "门店展示",
          Number: "10p",
          _isHidden: false,
          imgList: imgList
        },
        {
          Id: "2",
          Name: "前台",
          Number: "20p",
          _isHidden: false,
          imgList: imgList
        },
        {
          Id: "3",
          Name: "休闲区",
          Number: "30p",
          _isHidden: false,
          imgList: imgList
        }
      ]
    }
  },
  methods: {
    handleClick(item) {
      item._isHidden = !item._isHidden;
    }
  },
  created () {
	  window.vm = this;
  },
  mounted () {
    let that = this;
    window.addEventListener("scroll", function () {
      // 获取网页可视区域的高度（页面整个全部内容共占有的高度）
      let clientHeight = document.body.clientHeight;
      // 获取整个设备的高度（工作区域的高度）
      let availHeight = window.screen.availHeight;
      // if(document.body.scrollHeight <= window.screen.height + document.body.scrollTop){
      //   if (that.noMore) {
      //     return;
      //   }
      // }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import url("./css/reset.css");
@import url("./css/mscroll.css");
</style>
