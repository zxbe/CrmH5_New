// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import store from './store/store'

import App from './App'

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

// import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$axios = axios


import './assets/weui/css/weui.css'
import './assets/weui/css/jquery-weui.css'

import $ from 'jquery'

import './assets/weui/js/jquery-weui.js'

// import '@/assets/weui/js/swiper.js'

import './assets/js/common/RootFontSize.js'

import './assets/css/common/common.css'
import './assets/css/common/commonFront.css'

import './assets/js/common/common.js'
import './assets/js/common/CommonFront.js'

import eventBus from '@/components/customPlugin/Event.js'


//图片预览组件
import gallery from 'img-vuer'
Vue.use(gallery, {
  swipeThreshold: 150  // default 100 ,new in 0.12.0
})

window.eventBus = eventBus;


Vue.config.productionTip = false

//会议相关的格式化
//formatContactsID
Vue.filter('formatContactsID',function(val){
    if (tool.isNullOrEmptyObject(val)) {
      return "";
    }

    return val + " ";
});
//formatTitle
Vue.filter('formatTitle',function(val){
    if (tool.isNullOrEmptyObject(val)) {
      return "";
    }

    return "("+val+")";
});
//MeetingTimeFormat
Vue.filter('MeetingTimeFormat',function(val){
    if (tool.isNullOrEmptyObject(val)) {
      return "";
    }

    var format = "dd/MM/yyyy HH:mm";
    val = val.ReplaceAll("T", " ");
    val = tool.ChangeTimeFormat(val, format);

    return val;
});
//FileSizeFormat
Vue.filter('FileSizeFormat',function(val){
  if (tool.isNullOrEmptyObject(val)) {
    return "0KB";
  }

  val = tool.fileSizeFormat(val);

  return val;
});

//百分数格式化
Vue.filter('formatPercent',function(val,dataFormat){
  // console.log("formatPercent:"+val);
  // console.log("formatPercent:"+dataFormat);
  if (tool.isNullOrEmptyObject(val)) {
      return "";
  }
  if(tool.isNullOrEmptyObject(tool.isNullOrEmptyObject(dataFormat))){
    return val;
  }

  try{
    val = Number(val).mul(100);
    val = tool.formatNum(val, tool.getFixNum(dataFormat));

    if(tool.isNullOrEmptyObject(val)){
      return val;
    }else{
      return val.toString() + "%";
    }
  }
  catch(err){
    return val;
  }
});
//数字格式化
Vue.filter('formatFigure',function(val,dataFormat){
  // console.log("formatFigure:"+val);
  // console.log("formatFigure:"+dataFormat);
  if (tool.isNullOrEmptyObject(val)) {
      return "";
  }
  if(tool.isNullOrEmptyObject(tool.isNullOrEmptyObject(dataFormat))){
    return val;
  }

  try{
    val = tool.formatNum(val, tool.getFixNum(dataFormat));
    // console.log(val);
    return val;
  }
  catch(err){
    console.log(err);
    return val;
  }
});
//ADB日期格式化
Vue.filter('abdDateFormat',function(val,dataFormat){
  if (tool.isNullOrEmptyObject(val)) {
    return "";
  }

  if(tool.isNullOrEmptyObject(dataFormat)){
    return val;
  }

  var oldFormat = "yyyy/MM/dd HH:mm:ss";
  try{
    val = val.ReplaceAll("-","/")
    val = val.ReplaceAll("T", " ");
    val = tool.ChangeTimeFormat(val, dataFormat,oldFormat);
    return val;
  }catch(err){
    console.log(err);
    return val;
  }
});
//数值范围格式化
Vue.filter('formatFigureRange',function(val,dataFormat){
  // console.log("formatFigure:"+val);
  // console.log("formatFigure:"+dataFormat);

  if (tool.isNullOrEmptyObject(val)) {
    return "";
  }

  try{

    var valDisplay = "";
    var valArray = val.split(",");
    for(var i=0;i<valArray.length;i++){
      var valTemp = valArray[i];

      if(!tool.isNullOrEmptyObject(dataFormat)){
        valTemp = tool.formatNum(valTemp, tool.getFixNum(dataFormat));
      }

      valDisplay += valTemp + "~";
    }

    valDisplay = tool.isNullOrEmptyObject(valDisplay)?"":valDisplay.substring(0, valDisplay.length - 1);
    return valDisplay;
  }
  catch(err){
    console.log(err);
    return val;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
      // console.log(this.$myConfig);
  },
  components: { App },
  template: '<App/>'
});


if (tool.getSystem() == 'ios') {

    //禁止iOS 10+ safari浏览器页面双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    // }, { passive: false });
    }, false);

    document.addEventListener('touchmove', function (event) {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    // }, { passive: false });
    }, false);

    //iOS 里有一组双指手势操作的事件：gesturestart、gesturechange、gestureend
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });

}

