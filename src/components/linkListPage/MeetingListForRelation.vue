<template>
<!-- 该页面用于交易和商业机会模块中 -- 关联会议 -->
<div>
  <header class="mui-bar mui-bar-nav">
          <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
          <h1 class="mui-title f18">{{title}}</h1>

          <a @click="relationAction" class="calcfont calc-gou right" id=""></a>
  </header>

  <div class="page-content">

        <vue-scroll
          v-show="!noData"
          :showToTop="false"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="false" ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup">
            <div class="group-item-list meeting-list">
                <div
                  v-show="!noData"
                  v-for="item in listData"
                  :key="item.AutoID"
                  class="data-events-item f14 selectable">

                      <label class="radios-label">
                          <input type="radio" name="relationMeeting" :value="item.AutoID" v-model="radioValue"/><i class="radios"></i>
                      </label>
                      <div>
                          <div class="item-title">{{item.MeetingTitle}}</div>
                          <div class="item-time f12">
                            <span class="calcfont calc-gengxinshijian"></span>
                            <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                            <div class="right-text">{{item.ContactsID}}</div>
                          </div>
                          <div class="item-company">{{item.CompanyID}}</div>
                      </div>
                  </div>
            </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
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
            title:'关联会议',
            listData:[],
            noData: false, //没数据
            pageSize:10,//一页显示多少记录
            pageNum:1,//当前页码

            radioValue:'',

            fromType:'',  //标志是用那个模块过来的；联系人:6;公司:7;会议:8;商机&交易:9;
            fromId:'',  //dealPipelineID或者pitchesID,用于新增会议自动选择关联于商业字段
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
                AddUserName: "alancheng鄭兆麟",
                AutoID: 10218,
                BeginTime: "2019-05-27T09:15:00",
                CompanyID: "9 Air",
                ContactsID: "员工姓氏",
                EndTime: "2019-05-27T17:15:00",
                LastUpdateTime: "2019-05-24T09:10:00",
                MeetingTitle: "27号会议",
                MeetingType: null,
                Remark: null
              },
              {
                AddUserName: "alancheng鄭兆麟",
                AutoID: 10216,
                BeginTime: "2019-05-22T16:15:00",
                CompanyID: "9 Air",
                ContactsID: "纳尼",
                EndTime: "2019-05-22T16:45:00",
                LastUpdateTime: "2019-05-22T16:16:00",
                MeetingTitle: "半年总结",
                MeetingType: null,
                Remark: null
              },
              {
                AddUserName: "alancheng鄭兆麟",
                AutoID: 10212,
                BeginTime: "2019-05-25T16:15:00",
                CompanyID: "9 Air",
                ContactsID: "15中机租联系人_1",
                EndTime: "2019-05-25T19:15:00",
                LastUpdateTime: "2019-05-22T16:25:00",
                MeetingTitle: "25号会议",
                MeetingType: null,
                Remark: null
              }
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
        },

        //关联会议动作
        relationAction:function(){
          var _self = this;
          if(tool.isNullOrEmptyObject(_self.radioValue)){
              tool.showText(lanTool.lanContent("592_请选择数据！"));
              return;
          }
          // 请求接口去关联
          console.log(_self.radioValue);


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
  bottom:0px;
  left:0;right:0;
}
.meeting-list .selectable{
  padding:8px 10px 8px 36px;
}
.meeting-list .radios-label{
  position: absolute;top:30px;left:10px;
}
.meeting-list .item-company{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
