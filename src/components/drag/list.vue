<template>
  <div class="dragList">
    <ul ref="imgList" class="imgList">
      <li
        ref="imgItem"
        class="imgCoverItem"
        v-for="(item, index) in filesResults"
        :key="index"
        @click="deleteImage(index)"
        :data-index="index"
        @touchstart="touchstart($event, item, index)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)"
      >
        <img :id="'avarimgs' + index" :src="item" />
      </li>
      <li class="imgCoverItem upLoadImageWrapper">
        <input
          ref="upLoadImageFile"
          id="upLoadImage"
          type="file"
          multiple="multiple"
          accept="image/*"
          @change="change"
        />
      </li>
    </ul>
    <p>点击图片删除, 拖拽可更改顺序，共4张</p>
    <div class="btnConfimList" v-show="DeleteImageMask">
      <div class="btnConfimListMask" @click="setDelete(false)"></div>
      <transition name="transTop">
        <div class="btnConfimListContent">
          <ul>
            <li class="borderT">删除该图片？</li>
            <li class="borderT" @click="setDelete(true)" style="color: var(--mRed);">删除</li>
          </ul>
          <p class="cancelDeleteImage" @click="setDelete(false)">取消</p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "dragList",
  data() {
    return {
      files: [],
      fileItem: {},
      filesResults: [],
      DeleteImageMask: false,
      // isShow:false,
      startX: 0, // 开始触摸的位置
      startY: 0,
      moveX: 0, // 滑动时的位置
      moveY: 0,
      endX: 0,
      endY: 0, // 结束触摸的位置
      disX: 0, // 移动距离
      disY: 0,
      slideEffect: [], // 滑动时的效果
      target: null,
      startIndex: null,
      zindex: 1,
      leftW: 0,
      targetW: 0,
      clientW: 0,
      targetX: 0,
      targetY: 0,
      allItems: [],
      targetIndex: null
    };
  },
  // computed: {
  //   toRightW () { return (this.leftW + this.targetW) * (this.startIndex + 1) - this.startX },
  //   toLeftW () { return this.startX - (this.leftW + this.targetW) * this.startIndex },
  //   toTopH () { return this.startY - parseInt(this.startIndex / 4) * (this.topH + this.targetW) },
  //   toBottomH () { return (this.topH + this.targetW) - this.startY + (this.leftW + this.targetW) * (parseInt(this.startIndex / 4)) }
  // },
  mounted() {
    this.$nextTick(() => {
      this.absoluteItems();
    });
  },
  watch: {
    slideEffect(newV) {
      return newV;
    }
  },
  methods: {
    change(e) {
      var fileItem = e.target.files;
      let me = this;
      for (let i = e.target.files.length - 1; i >= 0; i--) {
        var reader = new FileReader();
        var file = e.target.files[i];
        reader.onloadstart = function(e) {
          // console.log('开始读取....')
        };
        reader.onprogress = function(e) {
          // console.log('正在读取中....')
        };
        reader.onabort = function(e) {
          // console.log('中断读取....')
        };
        reader.onerror = function(e) {
          // console.log('读取异常....')
        };
        reader.onload = function(e) {
          if (me.filesResults.indexOf(e.target.result) >= 0) {
            me.$toast("请勿重复上传");
            return;
          }
          if (me.files.length >= 7) {
            me.$toast("最多上传4张图片");
            return;
          }
          me.files.unshift(fileItem);
          me.filesResults.unshift(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    absoluteItems() {
      for (let i = 0; i < 8; i++) {
        this.allItems = [];
      }
    },
    deleteImage(index) {
      this.curIndex = index;
      this.DeleteImageMask = true;
    },
    setDelete(data) {
      this.DeleteImageMask = false;
      this.curIndex = null;
      data &&
        this.curIndex >= 0 &&
        this.files.splice(this.curIndex, 1) &&
        this.filesResults.splice(this.curIndex, 1);
    },
    touchstart(e, item, index) {
      this.startIndex = index;
      this.targetIndex = index;
      this.target =
        e.target.nodeName.toLowerCase() === "li"
          ? e.target
          : e.target.parentNode;
      !this.leftW &&
        (this.leftW = this.target.parentNode
          .querySelectorAll("li")[0]
          .getBoundingClientRect().left);
      !this.topH &&
        (this.topH = this.target.parentNode
          .querySelectorAll("li")[0]
          .getBoundingClientRect().top);
      !this.targetW && (this.targetW = this.target.offsetWidth);
      !this.clientW && (this.clientW = this.leftW + this.targetW);
      this.zindex++;
      this.target.style.zIndex = this.zindex;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(ev) {
      ev = ev || window.event;
      ev.preventDefault();
      if (ev.touches.length === 1) {
        this.moveX = ev.touches[0].clientX;
        this.moveY = ev.touches[0].clientY;
        this.disX = this.moveX - this.startX;
        this.disY = this.moveY - this.startY;
        // 边界处理
        this.disY <= 0 && (this.disY = 0);
        this.disY >= this.$refs.imgList.offsetHeight - this.clientW &&
          (this.disY = this.$refs.imgList.offsetHeight - this.clientW);
        this.target.style.transform =
          "translate3d(" + this.disX + "px," + this.disY + "px, 0)";
        this.target.getBoundingClientRect().left <= 0 &&
          (this.target.style.transform =
            "translate3d(" +
            -this.clientW * this.startIndex +
            "px," +
            this.disY +
            "px, 0)");
        this.target.getBoundingClientRect().right >=
          this.$refs.imgList.offsetWidth &&
          (this.target.style.transform =
            "translate3d(" +
            this.clientW * (3 - this.startIndex) +
            "px," +
            this.disY +
            "px, 0)");
        for (let i = 0; i < this.filesResults.length; i++) {
          // && this.moveY > this.$refs.imgItem[i].getBoundingClientRect().top && this.moveY < this.$refs.imgItem[i].getBoundingClientRect().top + this.targetW
          if (
            this.moveX >= this.$refs.imgItem[i].getBoundingClientRect().left &&
            this.moveX <
              this.$refs.imgItem[i].getBoundingClientRect().left +
                this.targetW &&
            i !== this.startIndex
          ) {
            if (
              i > this.targetIndex &&
              this.moveX >=
                this.$refs.imgItem[i].getBoundingClientRect().left &&
              this.moveX <
                this.$refs.imgItem[i].getBoundingClientRect().left +
                  this.targetW
            ) {
              if (this.$refs.imgItem[i].style.transform) {
                if (
                  this.$refs.imgItem[i].style.transform ===
                  "translate3d(0px, 0px, 0px)"
                ) {
                  this.$refs.imgItem[i].style.transform =
                    "translate3d(" + -this.clientW + "px, 0, 0)";
                  this.targetIndex = i;
                } else {
                  this.$refs.imgItem[i].style.transform =
                    "translate3d(0px, 0px, 0px)";
                  this.targetIndex = i - 1;
                }
              } else {
                this.$refs.imgItem[i].style.transform =
                  "translate3d(" + -this.clientW + "px, 0, 0)";
                this.targetIndex = i;
              }
            } else if (
              i < this.targetIndex &&
              this.moveX >=
                this.$refs.imgItem[i].getBoundingClientRect().left &&
              this.moveX <
                this.$refs.imgItem[i].getBoundingClientRect().left +
                  this.targetW
            ) {
              if (this.$refs.imgItem[i].style.transform) {
                if (
                  this.$refs.imgItem[i].style.transform ===
                  "translate3d(0px, 0px, 0px)"
                ) {
                  this.$refs.imgItem[i].style.transform =
                    "translate3d(" + this.clientW + "px, 0, 0)";
                  this.targetIndex = i;
                } else {
                  this.$refs.imgItem[i].style.transform =
                    "translate3d(0px, 0px, 0px)";
                  this.targetIndex = i + 1;
                }
              } else {
                this.$refs.imgItem[i].style.transform =
                  "translate3d(" + this.clientW + "px, 0, 0)";
                this.targetIndex = i;
              }
            } else {
              this.targetIndex > this.startIndex && (this.targetIndex = i - 1);
              this.targetIndex < this.startIndex && (this.targetIndex = i + 1);
            }
          }
        }
      }
    },
    touchend(e) {
      this.target.style.transform =
        "translate3d(" +
        (this.targetIndex - this.startIndex) * (this.leftW + this.targetW) +
        "px," +
        this.targetY +
        "px, 0)";
      let start = this.filesResults.splice(this.startIndex, 1)[0];
      this.filesResults.splice(this.targetIndex, 0, start);
      for (let i = 0; i < this.filesResults.length; i++) {
        this.$refs.imgItem[i].style.transform = "none";
      }
    }
  }
};
</script>
<style lang="scss">
.dragList {
  background: #f0f0f3;
  color: #a8a8a8;
  overflow: hidden;
  p {
    text-align: center;
    color: #a7a7a7;
    height: 4.07vw;
    line-height: 4.07vw;
    font-size: var(--mText);
    margin-bottom: var(--nText);
  }
  .imgList {
    padding: 2.78vw 0;
    font-size: 0;
    position: relative;
    .imgCoverItem {
      position: relative;
      width: 23.25vw;
      height: 23.25vw;
      border-radius: 1.11vw;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      margin-left: 1.4vw;
      margin-bottom: 1.4vw;
    }
    .upLoadImageWrapper {
      position: relative;
      background: #e0e0e0;
      #upLoadImage {
        position: absolute;
        outline: none;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
