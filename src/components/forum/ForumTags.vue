<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
    </header>

    <div class="content">

        <div class="content-title">
          <i class="f18 calcfont calc-fenlei"></i>
          <span class="lanText f16" data-lanid="1000295_所有标签"></span>
        </div>

        <div class="tag-list f14 ">
            <!-- 字段IsFollow值为fa-star表示关注；fa-star-o表示未关注 -->
            <div
              v-for="item in listData"
              :key="item.AutoID"
              class="item left"
              :data-id="item.AutoID"
              :class="{'active': item.IsFollow == 'fa-star'}"
              @click="goToList(item.AutoID)"
              @touchstart="gotouchstart(item, $event)"
              @touchmove="gotouchmove(item, $event)"
              @touchend="gotouchend(item, $event)"
              >{{item.Name}}({{item.PostCount}})</div>
        </div>
    </div>



</div>
</template>

<script>
export default {
    data(){
      return{
        timeOutEvent:0, //定时器对象
        title:lanTool.lanContent('1000295_所有标签'),
        listData:[]
      }
    },
    created:function(){
      //获取所有标签
      this.getTagsData();
    },
    mounted:function(){
      let _self = this;
      lanTool.updateLanVersion();
    },
    methods:{
        // 获取数据
        getTagsData:function(){
          var _self = this;
          //api接口地址
          var urlTemp = tool.AjaxBaseUrl();
          var controlName = tool.Api_ForumHandle_TagQuery;
          var jsonDatasTemp = {
              CurrentLanguageVersion: lanTool.currentLanguageVersion,
              UserName: tool.UserName(),
              _ControlName: controlName,
              _RegisterCode: tool.RegisterCode(),
              IsUsePager: false,
              PageSize: 1,
              PageNum: 10,
              QueryCondiction: [],
              IsContainAll: false
          };
          var loadingIndexClassName = tool.showLoading();
          $.ajax({
              async: true,
              type: "post",
              url: urlTemp,
              data: jsonDatasTemp,
              success: function (data) {
                  tool.hideLoading(loadingIndexClassName);
                  data = tool.jObject(data);
                  // console.log(data);
                  if (data._ReturnStatus == false) {
                      tool.showText(tool.getMessage(data));
                      console.log(tool.getMessage(data));
                      return;
                  }
                  data = data._OnlyOneData.Rows || [];
                  _self.listData = data;
              },
              error: function (jqXHR, type, error) {
                  tool.hideLoading(loadingIndexClassName);
                  console.log(error);
                  return true;
              },
              complete: function () {
                  //隐藏虚拟键盘
                  document.activeElement.blur();
              }
          });
        },

        //手指开始按
        gotouchstart(obj,e){
          let _self = this;
          clearTimeout(_self.timeOutEvent);//清除定时器
          _self.timeOutEvent = 0;
          _self.timeOutEvent = setTimeout(function(){
                //执行长按要执行的内容，
                $.actions({
                  closeText:lanTool.lanContent("111_关闭"),
                  actions: [{
                    text: '<div>'+ lanTool.lanContent("786_关注") +'</div>',
                    onClick: function() {
                      var curObj = $(e.target);
                      if(tool.isNullOrEmptyObject(curObj)){
                        return false;
                      }
                      //已关注的再点击关注无效果
                      if(curObj.hasClass('active')){
                        return;
                      }
                      var autoID = curObj.attr("data-id")||"";
                      if(tool.isNullOrEmptyObject(autoID)){
                        return false;
                      }
                      //api接口地址
                      var urlTemp = tool.AjaxBaseUrl();
                      var controlName = tool.Api_ForumHandle_UserFollowTag;
                      var jsonDatasTemp = {
                          CurrentLanguageVersion: lanTool.currentLanguageVersion,
                          UserName: tool.UserName(),
                          _ControlName: controlName,
                          _RegisterCode: tool.RegisterCode(),
                          AutoID:autoID,
                          ActionType:"1",  //(0=>取消关注;1=>添加关注)
                      };
                      var loadingIndexClassName = tool.showLoading();
                      $.ajax({
                          async: true,
                          type: "post",
                          url: urlTemp,
                          data: jsonDatasTemp,
                          success: function (data) {
                              tool.hideLoading(loadingIndexClassName);
                              data = tool.jObject(data);
                              //console.log(data);
                              if (data._ReturnStatus == false) {
                                  tool.showText(tool.getMessage(data));
                                  console.log(tool.getMessage(data));
                                  return;
                              }
                              //改变标签状态
                              curObj.addClass('active');
                          },
                          error: function (jqXHR, type, error) {
                              tool.hideLoading(loadingIndexClassName);
                              console.log(error);
                              return true;
                          },
                          complete: function () {
                              //隐藏虚拟键盘
                              document.activeElement.blur();
                          }
                      });
                    }
                  },{
                    text: '<div>'+ lanTool.lanContent("905_取消关注") +'</div>',
                    onClick: function() {
                      var curObj = $(e.target);
                      if(tool.isNullOrEmptyObject(curObj)){
                        return false;
                      }
                      //未关注的再点击取消关注无效果
                      if(!curObj.hasClass('active')){
                          return;
                      }
                      var autoID = curObj.attr("data-id")||"";
                      if(tool.isNullOrEmptyObject(autoID)){
                        return false;
                      }
                      //api接口地址
                      var urlTemp = tool.AjaxBaseUrl();
                      var controlName = tool.Api_ForumHandle_UserFollowTag;
                      var jsonDatasTemp = {
                          CurrentLanguageVersion: lanTool.currentLanguageVersion,
                          UserName: tool.UserName(),
                          _ControlName: controlName,
                          _RegisterCode: tool.RegisterCode(),
                          AutoID:autoID,
                          ActionType:"0",  //(0=>取消关注;1=>添加关注)
                      };
                      var loadingIndexClassName = tool.showLoading();
                      $.ajax({
                          async: true,
                          type: "post",
                          url: urlTemp,
                          data: jsonDatasTemp,
                          success: function (data) {
                              tool.hideLoading(loadingIndexClassName);
                              data = tool.jObject(data);
                              //console.log(data);
                              if (data._ReturnStatus == false) {
                                  tool.showText(tool.getMessage(data));
                                  console.log(tool.getMessage(data));
                                  return;
                              }
                              //改变标签状态
                              curObj.removeClass('active');
                          },
                          error: function (jqXHR, type, error) {
                              tool.hideLoading(loadingIndexClassName);
                              console.log(error);
                              return true;
                          },
                          complete: function () {
                              //隐藏虚拟键盘
                              document.activeElement.blur();
                          }
                      });
                    }
                  }]
                });
          },600);//这里设置定时
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gotouchend(obj, e){
            let _self = this;
            clearTimeout(_self.timeOutEvent);
            if(_self.timeOutEvent!=0){
                //这里写要执行的内容（尤如onclick事件）
            }
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gotouchmove(obj, e){
            let _self = this;
            clearTimeout(_self.timeOutEvent);//清除定时器
            _self.timeOutEvent = 0;
        },

        //返回上一页
        back:function(){
            this.$router.back(-1);
        },

        //点击去列表页面
        goToList:function(id){
          var _self = this;
          if(tool.isNullOrEmptyObject(id)){
              return;
          }
          var parameter = {
              id:id
          };
          _self.$router.push({
            name:'forumlist',
            params:parameter
          })
        }
    }

}
</script>


<style scoped>
.mycalcfont {
  font-size: 0.48rem;
  text-align: center;
  padding: 0.2rem 10px;
  position: relative;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  line-height: 1;
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background: #fff;
}
.header .title-text{
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
    position: absolute;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    line-height: 0.88rem;
}

.content{
  padding:0.88rem 15px 15px;
}
.content-title{padding:10px 0;}
.content-title i{margin-right: 5px;color:#8b8d8c;}

.content .item{
  padding:8px 12px;
  border:1px solid #e3e3e3;
  margin: 5px 10px 5px 0;
  border-radius: 5px;
}
.content .item.active{
  color:rgb(255, 90, 33);
}



</style>
