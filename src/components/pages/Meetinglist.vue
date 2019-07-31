<template>
<!-- 从详情点击进入的会议列表页面 -->
<div>
    <header class="mui-bar mui-bar-nav">
          <!-- <a v-if="isMain" @click="showRightPanel" class="calcfont calc-yonghu1 right"></a>
          <a v-if="isMain" @click="goNotification" class="calcfont calc-mailbox right">
              <span v-show="Number(messageCount)>=1" class="count">{{messageCount}}</span>
          </a> -->
          <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
          <h1 class="mui-title f18">{{title}}</h1>
    </header>

    <div class="page-content">

        <!-- <div class="group-item-list meeting-list">
              <div v-show="!noData" v-for="item in listData" :key="item.AutoID" class="data-events-item f14" @click="goInfoPage(item.AutoID,$event)">
                  <div class="item-title">{{item.MeetingTitle}}</div>
                  <div class="item-time f12">
                    <span class="calcfont calc-gengxinshijian"></span>
                    <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                    <div class="right-text">{{item.Realname}}</div>
                  </div>
                  <div class="item-address">{{item.CompanyID}}</div>
                  <div class="item-initiator">{{item.ContactsID|formatContactsID}}{{item.Title|formatTitle}}</div>
              </div>
        </div> -->

        <vue-scroll
          v-show="!noData"
          :showToTop="false"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="false" ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup">
            <div class="group-item-list meeting-list">
                <div v-show="!noData" v-for="item in listData" :key="item.AutoID" class="data-events-item f14" @click="goInfoPage(item.AutoID,$event)">
                    <div class="item-title">{{item.MeetingTitle}}</div>
                    <div class="item-time f12">
                      <span class="calcfont calc-gengxinshijian"></span>
                      <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                      <div class="right-text">{{item.LastUpdateUserName}}</div>
                    </div>
                </div>
            </div>

        </vue-scroll>

        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>

</div>
</template>

<script>
// import Header from '../common/Header'
import Scroll from '@/components/common/scroll/Scroll';
import Nothing from "../common/Nothing"
export default {
    components:{
        // 'Header':Header,
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
        }
    },
    created:function(){
    },
    mounted:function(){
       lanTool.updateLanVersion();
       this.queryList();
    },
    methods:{
        back:function(){
            this.$router.back(-1);
        },

        //点击跳转到会议记录页
        goInfoPage:function(scheduleID,el){
            if(tool.isNullOrEmptyObject(scheduleID)){
                return;
            }

            var _self = this;
            var meetingNoticeID = "-1";
            var url = "/MeetingNoteinfo/" + meetingNoticeID;
            var oppID = "";
             //获取会议记录详情的标题
            var infoName = null;
            if ($(el.target).hasClass("data-events-item")) {
                infoName = $(el.target).find(".item-title").text();
            } else {
                infoName = $(el.target).parents(".data-events-item").children(".item-title").text() || "";
            }
            scheduleID = Number(scheduleID)<=0?"":scheduleID;
            var parameter = {
                OppID:oppID,
                ScheduleID:scheduleID,
                infoName:infoName
            };
            _self.$router.push({
                path: url,
                query: parameter
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
            var apiUrlTemp = '';
            var jsonDatas = {
                // CurrentLanguageVersion: lanTool.currentLanguageVersion,
                // UserName: tool.UserName(),
                // TabID: _self.tabID,
                // CompanyID: _self.companyID,
                // VersionID: _self.versionID,
                // IsUsePager: true,
                // PageSize:_self.pageSize,
                // PageNum:_self.pageNum,
                // QueryCondiction: _self.queryCondictionData || []
            };

            if(tool.isNullOrEmptyObject(queryType)){
                var loadingIndexClassName = tool.showLoading();
            }
            // $.ajax({
            //     async: true,
            //     type: "post",
            //     url: apiUrlTemp,
            //     data: {
            //         jsonDatas: JSON.stringify(jsonDatas)
            //     },
            //     success: function (data) {
            //         tool.hideLoading(loadingIndexClassName);
            //         data = tool.jObject(data);
            //         if (data.Result != 1) {
            //             tool.showText(data.Msg);
            //             console.log(tool.getMessage(data.Msg));
            //             return true;
            //         }
            //         data = data.Data || {};

            //         //没有数据
            //         if(tool.isNullOrEmptyObject(data["FleetDatailsArray"]) && _self.pageNum == 1){
            //             _self.noData = true;
            //             return ;
            //         }
            //         _self.noData = false;

            //         if(queryType == 'pushLoad'){
            //             _self.listData = _self.listData.concat(data["FleetDatailsArray"]);
            //         }else{
            //             _self.listData = data["FleetDatailsArray"] || [];
            //         }

            //         if(queryType == undefined || queryType == ''){
            //             _self.$refs.scroll.isPullingDown = true;
            //             _self.$refs.scroll.isPullingUpEnd = false;
            //             _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
            //         }
            //         _self.$refs.scroll.refresh();

            //         if(!tool.isNullOrEmptyObject(callback)){
            //           callback(data["FleetDatailsArray"],_self.pageSize);
            //         }

            //         //渲染textarea
            //         _self.$nextTick(function () {
            //             $(window).scrollTop(0);
            //             $("textarea").each(function (index, cur) {
            //                 // $(cur).height('25');
            //                 tool.autoTextarea(cur);
            //             });
            //         });
            //     },
            //     error: function (jqXHR, type, error) {
            //         tool.hideLoading(loadingIndexClassName);
            //         console.log(error);
            //         return true;
            //     },
            //     complete: function () {
            //         //隐藏虚拟键盘
            //         document.activeElement.blur();
            //     }
            // });

            var responseData = [
              {
                AutoID: 10373,
                BeginTime: "2019-07-28T08:00:00",
                EndTime: "2019-07-28T10:00:00",
                LastUpdateTime: "2019-07-26T14:09:00",
                LastUpdateUserName: "aoniruan阮毅文",
                MeetingID: 10289,
                MeetingTitle: "关于和中国南方航空公司的合作相关会议"
              },
              {
                AutoID: 10371,
                BeginTime: "2019-07-26T08:00:00",
                EndTime: "2019-07-26T18:00:00",
                LastUpdateTime: "2019-07-26T15:17:00",
                LastUpdateUserName: "alancheng鄭兆麟",
                MeetingID: 10287,
                MeetingTitle: "26号1次会议"
              },
            ]

            if(queryType == 'pushLoad'){
                _self.listData = _self.listData.concat(responseData);
            }else{
                _self.listData = responseData || [];
            }

            setTimeout(() => {
              tool.hideLoading(loadingIndexClassName);
              _self.$refs.scroll.refresh();
            }, 2000);
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
        }
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

.page-content{
  position: fixed;
  top:0.88rem;
  bottom:0;
  left:0;right:0;
}

</style>
