<template>
<div>

    <div v-show="!isFirst">
        <keep-alive :include="includes">
            <router-view></router-view>
        </keep-alive>
    </div>

    <!-- 引导层 -->
    <div class="guideContent" v-show="isFirst">
        <div class="swiper-container">
              <div class="swiper-wrapper">
                    <div v-for="(item, index) in pageArray" :key="index" class="swiper-slide" :style="{'background':'url('+ item.src +') no-repeat center','background-size':'cover'}"></div>
              </div>
              <div class="swiper-pagination"></div>
        </div>
        <div @click="startUse" class="use-start weui-btn weui-btn_default">开始使用</div>
    </div>

</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'App',
  computed:{
      includes(){
        return this.$store.state.includes
      }
  },
  data(){
    return{
        isFirst:true,
        pageArray:[
            { src: 'https://www.17sucai.com/preview/859324/2018-07-24/tu/img/a1.png' },
            { src: 'https://www.17sucai.com/preview/859324/2018-07-24/tu/img/a2.png' },
            { src: 'https://www.17sucai.com/preview/859324/2018-07-24/tu/img/a3.png' }
        ]
    }
  },
  created:function(){
  },
  mounted:function(){
    var _self = this;
    var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: false,
          pagination: '.swiper-pagination',
          onSlideChangeStart: function (swiper) {
              var index = swiper.activeIndex + 1;
              if (index == _self.pageArray.length) {
                  // $('.swiper-pagination').hide();
                  $('.use-start').show();
              } else {
                  // $('.swiper-pagination').show();
                  $('.use-start').hide();
              }
          },
          onSlideChangeEnd: function (swiper) {
          },

      })
  },
  methods:{
     //开始使用
     startUse:function(){
       var _self = this;
        _self.isFirst = false;
     }
  }
}
</script>

<style scoped>
.guideContent{
  width: 100vw;
  height: 100vh;
  position: relative;
}
.swiper-container {
    height:100%;
}
.use-start{
  display: none;
  position: absolute;
  z-index: 1;
  left:50%;
  -webkit-transform: translate(-50%,0);
  -moz-transform: translate(-50%,0);
  transform:translate(-50%,0);
  bottom:20vh;
}
</style>




