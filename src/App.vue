<template>
  <div>
    <div v-show="pageArray.length<=0">
      <keep-alive :include="includes">
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 引导层 -->
    <div class="guideContent" v-show="pageArray.length>0">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in pageArray"
            :key="index"
            class="swiper-slide"
            :style="{'background':'url('+ item.src +') no-repeat center','background-size':'cover'}"
          ></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div
        @click="startUse"
        class="use-start weui-btn weui-btn_default lanText"
        data-lanid="1000460_开始使用"
      ></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "App",
  computed: {
    includes() {
      return this.$store.state.includes;
    }
  },
  data() {
    return {
      // isFirst:false,
      pageArray: [
        // { src: "http://197.7.50.139:6060/img/QQ1.png" },
        // { src: "http://197.7.50.139:6060/img/QQ2.png" },
        // { src: "http://197.7.50.139:6060/img/QQ3.png" }
      ]
    };
  },
  created: function() {},
  mounted: function() {
    var _self = this;
    lanTool.updateLanVersion();
    _self.queryFunGuid();
  },
  methods: {
    //查询功能引导页
    queryFunGuid: function() {
      var _self = this;
      var urlTemp = tool.AjaxBaseUrl();
      var controlName = tool.Api_FunctionBootHandle_MasterPageQuery;
      //传入参数
      var jsonDatasTemp = {
        CurrentLanguageVersion: lanTool.currentLanguageVersion,
        UserName: tool.UserName(),
        _ControlName: controlName,
        _RegisterCode: tool.RegisterCode(),
        IsAlwaysShow:false
      };
      // console.log(jsonDatasTemp);
      // return;
      $.ajax({
        async: true,
        type: "post",
        url: urlTemp,
        data: jsonDatasTemp,
        success: function(data) {
          console.log("data"+JSON.stringify(data));
          try {
            data = tool.jObject(data);
            if (data._ReturnStatus == false) {
              tool.showText(tool.getMessage(data));
              return true;
            }

            _self.pageArray = data._OnlyOneData.Rows || [];
            var mySwiper = new Swiper(".swiper-container", {
                  direction: "horizontal",
                  loop: false,
                  pagination: ".swiper-pagination",
                  onSlideChangeStart: function(swiper) {
                    var index = swiper.activeIndex + 1;
                    if (index == _self.pageArray.length) {
                      // $('.swiper-pagination').hide();
                      $(".use-start").show();
                    } else {
                      // $('.swiper-pagination').show();
                      $(".use-start").hide();
                    }
                  },
                  onSlideChangeEnd: function(swiper) {}
                });

          } catch (err) {
            _self.pageArray = [];
            console.log(err);
          } finally {
          }
        },
        error: function(jqXHR, type, error) {
          console.log(error);
          return true;
        },
        complete: function() {
          //隐藏虚拟键盘
          document.activeElement.blur();
        }
      });
    },
    //开始使用
    startUse: function() {
      //  var _self = this;
      //   _self.isFirst = false;
    }
  }
};
</script>

<style scoped>
.guideContent {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.swiper-container {
  height: 100%;
}
.use-start {
  display: none;
  position: absolute;
  z-index: 1;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  bottom: 20vh;
}
</style>