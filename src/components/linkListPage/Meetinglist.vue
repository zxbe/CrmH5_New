<template>
<!-- 从详情点击进入的会议列表页面 -->
<div>
    <header class="mui-bar mui-bar-nav">
          <!-- <a v-if="isMain" @click="showRightPanel" class="calcfont calc-yonghu1 right"></a> -->
          <!-- <a v-if="isMain" @click="goNotification" class="calcfont calc-mailbox right">
              <span v-show="Number(messageCount)>=1" class="count">{{messageCount}}</span>
          </a> -->
          <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
          <h1 class="mui-title f18">{{title}}</h1>

          <a v-show="fromType=='9'" @click="deleteMeeting" class="calc-shanchu calcfont right" id="delete"></a>
          <a v-show="fromType=='9'" @click="addMeeting" class="calc-jiahao calcfont right" id="add"></a>
          <a v-show="fromType=='9'" @click="relationMeeting" class="calc-guanlian calcfont right" id="relation"></a>

    </header>

    <div class="page-content" :class="{'checkbox-list': fromType=='9'}">

        <vue-scroll
          v-show="!noData"
          :showToTop="false"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="false" ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup">
            <div class="group-item-list meeting-list">
                <div
                  v-for="item in listData"
                  :key="item.AutoID"
                  class="data-events-item f14 "
                  :class="{'selectable': fromType=='9'}">
                      <label class="checkbox-label" v-if="fromType=='9'">
                          <input type="checkbox" name="meetinglist" :value="item.MeetingNoticeAutoID" v-model="checkboxValue"/><i class="checkbox"></i>
                      </label>
                      <div @click="goInfoPage(item,$event)">
                          <div class="flex">
                            <i style="margin-right: 3px;" class="calcfont calc-biaoti icon"></i>
                            <div class="item-title">{{item.MeetingTitle}}</div>
                          </div>
                          <div class="item-time f12">
                                <span class="calcfont calc-gengxinshijian"></span>
                                <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                                <span class="right-text">{{item.Realname}}</span>
                          </div>
                          <div class="flex pdtb" v-show="(item.CompanyID =='' || item.CompanyID == null) ? false : true">
                              <i class="icon calcfont calc-gongsixinxi"></i>
                              <div class="item-address">{{item.CompanyID}}</div>
                          </div>
                          <div class="flex" v-show="(item.ContactsID =='' || item.ContactsID == null) ? false : true">
                              <i class="icon calcfont calc-kehulianxiren"></i>
                              <div class="item-initiator">{{item.ContactsID|formatContactsID}}{{item.Title|formatTitle}}</div>
                          </div>
                      </div>
                </div>

            </div>

        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>

    <div v-if="fromType=='9'" class="selectAll">
        <div class="item-div">
            <label class="checkbox-label">
                      <input @click="selectAll" type="checkbox" name="sex"/><i class="checkbox checkAll"></i>
                      <span class="lanText" data-lanid="857_全部"></span>
        </label>
        </div>
    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    components:{
        'vue-scroll':Scroll,
        'nothing': Nothing
    },
    data(){
        return{
            title:lanTool.lanContent('1000_会议列表'),
            listData:[],
            noData: false, //没数据
            pageSize:10,//一页显示多少记录
            pageNum:1,//当前页码

            fromType:'',  //标志是用那个模块过来的；联系人:6;公司:7;会议:8;商机&交易:9;
            fromId:'',  //dealPipelineID或者pitchesID,用于新增会议自动选择关联于商业字段
            checkboxValue:[], //选择需要删除meetingId
        }
    },
    created:function(){
      var _self = this;
      _self.fromType = _self.$route.query.fromType || '';
      _self.fromId = _self.$route.query.fromId || '';

    },
    mounted:function(){
       lanTool.updateLanVersion();
       this.queryList();
    },
    methods:{
        back:function(){
            this.$router.back(-1);
        },

        //点击跳转到会议详情
        goInfoPage:function(item,e){
            var _self = this;
            if(tool.isNullOrEmptyObject(item.AutoID)){
                return;
            }
            var url = "/meetinginfo/" + item.AutoID;
            var infoName = item.MeetingTitle || '';
            _self.$router.push({
                path: url,
                query: {
                        infoName: infoName
                    }
            });
        },

        //查询列表数据
        queryList: function (queryType, callback) {
            let _self = this;
            if(queryType == 'pushLoad'){
                //上拉请求
                _self.pageNum += 1;
            }else{
                //非上拉请求
                _self.pageNum = 1;
            }
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MeetingHandle_QueryRelatedMeeting;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                QueryCondiction: _self.queryCondictionData || [],
                FromType:_self.fromType,
                FromID:_self.fromId
            };

            //console.log(JSON.stringify(jsonDatasTemp));

            if(tool.isNullOrEmptyObject(queryType)){
                var loadingIndexClassName = tool.showLoading();
            }

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
                        _self.noData = true;
                        return;
                    }
                    data = data._OnlyOneData.Rows || [];

                    //没有数据
                    if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                        _self.noData = true;
                        return ;
                    }

                    _self.noData = false;
                    if(queryType == 'pushLoad'){
                        _self.listData = _self.listData.concat(data);
                    }else{
                        _self.listData = data;
                    }

                    if(queryType == undefined || queryType == ''){
                        _self.$refs.scroll.isPullingDown = true;
                        _self.$refs.scroll.isPullingUpEnd = false;
                        _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                    }
                    _self.$refs.scroll.refresh();

                    if(!tool.isNullOrEmptyObject(callback)){
                      callback(data,_self.pageSize);
                    }
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

        //下拉
        pulldown:function(){
            let _self = this;
            _self.queryList('pushRefresh',function(){
                // _self.$refs.scroll.refresh();
            })
        },

        //上拉
        pullup:function(){
            let _self = this;
             _self.queryList('pushLoad',function(data,pageSize){

               if(data.length < pageSize){
                  _self.$refs.scroll.pullupEnd();
               }
              //  else{
              //     _self.$refs.scroll.refresh();
              //  }
            })
        },

        //删除会议
        deleteMeeting:function(){
          var _self = this;
          if(_self.checkboxValue.length <=0 ){
              tool.showText(lanTool.lanContent("709_请选择要删除的记录！"));
              return;
          }
          tool.showConfirm(
              lanTool.lanContent("593_您确定要删除数据吗？"),
              function() {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_MeetingNoticeHandle_Delete;
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode(),
                    AutoID:JSON.stringify(_self.checkboxValue)
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
                    if (data._ReturnStatus == false) {
                      tool.showText(tool.getMessage(data));
                      return true;
                    }

                    //刷新当前页面
                    _self.pulldown();
                  },
                  error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                  },
                  complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                  }
                });

              },
              function() {}
          );

        },

        //新建会议
        addMeeting:function(){
            var _self = this;
            var url = "/meetinginfo/-1";
            // var timeArray = tool.GetTimeArray('special');
            // var defaultDateTime = timeArray[2] + "/" + timeArray[1] + "/" + timeArray[0]+" "+ timeArray[3] +":" + timeArray[4];
            var parameter = {
                // fromType: _self.fromType, //来源类型
                // fromId: _self.fromId //来源ID
                dealOppID:_self.fromId,
                // defaultDateTime: defaultDateTime
            };
            _self.$store.commit('REMOVE_ITEM', 'meetinginfo');
            _self.$router.push({
                path: url,
                query: parameter
            });
        },

        //关联会议
        relationMeeting:function(){
            var _self = this;
            var url = "/meetinglistforrelation";
            var parameter = {
                fromType: _self.fromType, //来源类型
                fromId: _self.fromId //来源ID
            };
            _self.$router.push({
                    path: url,
                    query: parameter
            });
        },

        //选择全部
        selectAll: function (e) {
            var self = this;
            var el = e.target,
                t = $(e.target).is(":checked");
            if (t) {
                $.each(self.listData, function (index, item) {
                    self.checkboxValue.push(item.MeetingNoticeAutoID);
                })
            } else {
                self.checkboxValue = [];
            }
        },
    },
     beforeRouteLeave: function (to, from, next) {
    if (to.name == 'index' || to.name == 'homesearch') {
        this.$store.commit('REMOVE_ITEM', 'meetinglist');
    }

    //移除body的hideOverflow样式
    $("body").removeClass("hideOverflow");

    next();
  }
}
</script>

<style scoped>

header.mui-bar {
  position: relative;
  background: #f8f2dc;
  overflow: hidden;
}
.mui-bar .calcfont{
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}
.mui-bar .mui-title {
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
.mui-bar .right.calcfont{
  margin-left: -10px
}


.page-content{
  position: fixed;
  top:0.88rem;
  bottom:0px;
  left:0;right:0;
}
.checkbox-list{
  bottom:50px;
}
.meeting-list .selectable{
  padding:8px 10px 8px 36px;
}
.meeting-list .checkbox-label{
  position: absolute;top:8px;left:10px;
}


.selectAll{
	position: fixed;
	left: 0;
	right: 0;
	height: 50px;
  line-height: 50px;
  padding-left:10px;
	bottom: 0;
  z-index: 2;
  background-color: rgb(245,245,245);
  color: gray;
  /* display: none; */
}
.selectAll .checkbox-label{position: relative;}
.selectAll span{
    padding-left:5px;
}
/* .selectAll .item-div .checkbox-label .checkbox{top:2px;} */
</style>
