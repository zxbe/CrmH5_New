<template>
<div>
    <Header class="header sticky" :title="title"></Header>

    <div id="page-content" class="page-content">

        <!-- calendar视图 -->
        <calendar v-show="viewType=='calendarView'" class="calendar-view"></calendar>

        <!-- list 视图 -->
        <div v-show="viewType=='listView'" class="list-view">
            <!-- <div class="nav sticky">
                <div id="meetingPanel" @click.stop="switchPage(0,$event)" class="nav-item f16 active-item  lanText" data-lanid="818_会议"></div>
                <div style="color:#ccc;" class="nav-item f16 lanText" data-lanid="819_出差"></div>
                <div class="nav-border"></div>
            </div> -->

            <div class="pageList" v-show="showPage == 0">
                <div class="add-btn-div">
                    <div @click="addData" class="add-div">
                        <span class="calcfont calc-add"></span>
                        <span class="add-text lanText" data-lanid="886_新增会议"></span>
                    </div>
                </div>
                <!-- 列表 -->
                <div v-show="!noData" id="meetingList" data-fromtype="meeting">
                      <div v-for="group in groupData" :key="group.GroupID"
                       class="list-group-div group-div">
                          <div class="date-div">
                            <span class="calcfont calc-rili1"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName|abdDateFormat('dd/MM/yyyy')}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                          </div>
                          <div class="occupy-div"></div>

                          <div v-if="group.items.length > 0" class="group-item-list meeting-list">
                              <div v-for="item in group.items" :key="item.AutoID"
                              class="data-events-item f14" :data-url="'/meetinginfo/' + item.AutoID">
                                      <div class="flex">
                                        <i style="margin-right: 3px;" class="calcfont calc-T icon"></i><div class="item-title">{{item.MeetingTitle}}</div>
                                      </div>
                                      <div class="item-time f12">
                                            <span class="calcfont calc-gengxinshijian"></span>
                                            <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                                            <span class="right-text">{{item.Realname}}</span>
                                      </div>
                                      <div class="flex pdtb">
                                          <i :class="[item.CompanyID !='' ? 'calc-gongsixinxi' : '']" class="icon calcfont "></i>
                                          <div class="item-address">{{item.CompanyID}}</div>
                                      </div>
                                      <div class="flex">
                                          <i :class="[item.ContactsID !='' ? 'calc-kehulianxiren' : '']" class="icon calcfont "></i>
                                          <div class="item-initiator">{{item.ContactsID|formatContactsID}}{{item.Title|formatTitle}}</div>
                                      </div>
                              </div>
                          </div>
                      </div>
                </div>
                <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
            </div>

            <!-- <div class="pageList" v-show="showPage == 1">
                <div class="add-btn-div">
                    <router-link to="/tripinfo/0" class="add-div">
                        <span class="calcfont calc-add"></span>
                        <span class="add-text lanText" data-lanid="887_新增出差"></span>
                    </router-link>
                </div> -->
                <!-- 列表 -->
                <!-- <div v-show="!noData" id="tripList" data-fromtype="trip"></div>
                <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
            </div> -->

        </div>
    </div>

    <!--  右侧侧滑 -->
    <list-right-panel ref="rightPanel" :panelData="rigthPanelData" :searchData="searchData"></list-right-panel>

</div>
</template>

<script>
import Calendar from '@/components/tripmeeting/Calendar'
import Header from '@/components/customPlugin/Listheader'
import Listrightpanel from '@/components/customPlugin/Listrightpanel'
import Nothing from "@/components/customPlugin/Nothing"
import Mixins from '@/mixins/commonlist.js'

var count = 0;
export default {
    name:'tripmeeting',
    mixins:[Mixins],
    components: {
        'Header': Header,
        'calendar': Calendar,
        'nothing': Nothing,
        'list-right-panel': Listrightpanel,
    },
    computed:{
        viewType(){
          return this.$store.state.viewType;
        }
    },
    data() {
        return {
            title: lanTool.lanContent('1149_会议'),
            // viewType: 'calendarView', //展示视图类型  calendarView, listView

            //侧滑数据模型
            rigthPanelData: [{
                    groupText: lanTool.lanContent('867_视图'),
                    groupName: 'view',
                    type: 'radio',
                    default: 'listView',
                    items: [
                        {
                            text: lanTool.lanContent('929_列表视图'),
                            value: 'listView'
                        },
                        {
                            text: lanTool.lanContent('928_日历视图'),
                            value: 'calendarView'
                        }
                    ]
                },
                {
                    groupText: lanTool.lanContent('856_数据筛选'),
                    groupName: 'dataFilter',
                    type: 'radio',
                    default: 'allData',
                    items: [{
                            text: lanTool.lanContent("795_全部"),
                            queryfield: "allData",
                            queryType: "string",
                            queryFormat: "",
                            queryRelation: "and",
                            queryValue: "allData",
                            queryComparison: "="
                        },
                        {
                            text: lanTool.lanContent("930_我的日程"),
                            queryfield: "myData",
                            queryType: "string",
                            queryFormat: "",
                            queryRelation: "and",
                            queryValue: "myData",
                            queryComparison: "="
                        },
                        {
                            text: lanTool.lanContent('942_其他同事的日程'),
                            queryfield: "otherData",
                            queryType: "string",
                            queryFormat: "",
                            queryRelation: "and",
                            queryValue: "otherData",
                            queryComparison: "="

                        }
                    ]
                },

            ],
            //侧滑搜索页面数据模型
            searchData: {},
            meetingSearch: [{
                    queryfield: "MeetingTitle",
                    text: lanTool.lanContent("710_标题"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "CompanyID",
                    text: lanTool.lanContent('726_公司名称'),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_ViewBaseCompanyBaseInf",
                    TypeValue: "",
                    selectType: "radio",
                    resulteRow: true,
                    clickObj: "CompanyIDClickObj",
                    datalanid: "726_公司名称"
                },
                {
                    queryfield: "ContactsID",
                    text: lanTool.lanContent("630_联系人"),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_ViewBaseCompanyContactsByCompany",
                    TypeValue: "",
                    selectType: "radio",
                    datalanid: "630_联系人"
                }
            ],
            tripSearch: [{
                    type: 'input',
                    field: 'name',
                    queryType: 'string',
                    text: 'Name',
                    value: '',
                },
                {
                    type: 'picker',
                    field: 'cf_765',
                    queryType: 'string',
                    text: lanTool.lanContent('860_状态'),
                    value: '',
                    id: Number((new Date()).valueOf()) + count++
                },
                {
                    type: 'selectlist',
                    field: 'related_to_2',
                    queryType: 'string',
                    queryUrl: "Accounts/Query",
                    text: lanTool.lanContent('711_发起人'),
                    selectType: 'checkbox',
                    resulteRow: false, //第二行显示结果
                    value: {
                        text: '',
                        value: ''
                    }
                },
                {
                    type: 'selectlist',
                    field: 'related_to_3',
                    queryType: 'string',
                    queryUrl: "Accounts/Query",
                    text: lanTool.lanContent('790_公司'),
                    selectType: 'checkbox',
                    resulteRow: true, //第二行显示结果
                    value: {
                        text: '',
                        value: ''
                    }
                },
                {
                    type: 'picker',
                    field: 'cf_765',
                    queryType: 'string',
                    text: lanTool.lanContent('868_业务分类'),
                    value: '',
                    id: Number((new Date()).valueOf()) + count++
                },
                {
                    type: 'picker',
                    field: 'cf_771',
                    queryType: 'string',
                    text: lanTool.lanContent('869_区域'),
                    value: '',
                    id: Number((new Date()).valueOf()) + count++
                }
            ],

        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created:function(){
        let _self = this;
        //清空右侧筛选数据
        eventBus.queryCondictionData = null;
        _self.$store.commit('SET_ITEM', 'tripmeeting');

        //设置视图默认值
        $.each(_self.rigthPanelData,function(index, item){
            if(item.groupName == 'view'){
              item.default = _self.viewType;
            }
        })

    },
    mounted:function(){
        let _self = this;
        lanTool.updateLanVersion();
        // _self.changePos();
        _self.groupToggle();
        _self.watchScroll();
        _self.goInfo();

        //重置右侧默认值
        var returnObj = _self.$refs.rightPanel.reductionDataFilter(true);
        if (tool.isNullOrEmptyObject(returnObj)) {
            return ;
        }

        //场景：在searchmodule页刷新再点确定搜索(暂时不考虑此场景)
        // if(!tool.isNullOrEmptyObject(eventBus.queryCondictionData)){
        //     _self.queryCondictionData = eventBus.queryCondictionData;
        //     eventBus.queryCondictionData = null;
        // }

        _self.queryCondiction.push(returnObj.defaultQueryCondition);

        _self.showPage = _self.$store.state.tripmeetingShowModule;
       _self.switchPageHandle(0, "" ,'SET_TRIPMEETING_SHOW_MODULE');
        // if(_self.showPage == 0){
        //     _self.searchData = _self.meetingSearch;
            // $("#meetingPanel").trigger("click");
        // }else{
            // _self.searchData = _self.ContactsSearch;
            // $("#contactSwitchPage").trigger("click");
        // }

        eventBus.$on('updataListEvent', function () {
            _self.RefreshCurPageGroupData();
        })
        eventBus.$on('changeViewEvent', function (data) {
            $(window).scrollTop(0);
            _self.$store.commit('SET_VIEW_TYPE', data);
        })

    },

    activated: function () {
        var _self = this;

        _self.queryCondictionData = eventBus.queryCondictionData;

        //获取是否是从搜索页面点击确定按钮返回来的标志
        var fromSearchBtn = eventBus.fromSearchBtn || false;
        eventBus.fromSearchBtn = false;
        if (fromSearchBtn) {
            _self.RefreshCurPageGroupData();
        }
    },
    methods: {
        //切换
        // switchPage:function(num,$event){
        //     let _self = this;
        //     _self.switchPageHandle(num, $event ,'SET_TRIPMEETING_SHOW_MODULE');
        // },

        //列表展开收起
        groupToggle: function () {
            var _self = this;
            _self.groupToggleHandle('meetingList','tripList');
        },

        //刷新当前激活的page的分组数据
        RefreshCurPageGroupData: function () {
            var _self = this;
            var data = [
                {
                  moduleId:0,
                  fromType:'meeting',
                  container:$("#meeting"),
                  searchData:_self.meetingSearch
                },
                {
                  moduleId:1,
                  fromType:'trip',
                  container:$("#trip"),
                  searchData:_self.tripSearch
                },
            ]
            _self.RefreshCurPageGroupDataHandle(data);
        },

        //点击跳转到详情页
        goInfo:function(){
            var _self = this;
            $("#meetingList,#tripList").off('click','div.data-events-item').on('click','div.data-events-item',function(event){

                var target = $(event.target);

                if (!target.hasClass("data-events-item")) {
                    target = target.closest("div.data-events-item");
                    if (tool.isNullOrEmptyObject(target)) {
                        return;
                    }
                }

                var url = target.attr("data-url") || "";
                if (tool.isNullOrEmptyObject(url)) {
                    return;
                }

                //点击列表是获取到属性名传给详情
                var infoName = null;
                //判断是meeting列表还是trip列表
                // if ($(this).hasClass("contacts-item-block")) {
                //     infoName = $(this).find(".item-first-div").text() || "";
                //     console.log("contactsinfoName:" + infoName);
                // } else {
                infoName = $(this).find(".item-title:first").text() || "";
                // }
                _self.$router.push({
                    path: url,
                    query: {
                        infoName: infoName
                    }
                });

            });
        },

        //新增
        addData:function(){
            var _self = this;
            var timeArray = tool.GetTimeArray('special');
            var defaultDateTime = timeArray[2] + "/" + timeArray[1] + "/" + timeArray[0]+" "+ timeArray[3] +":" + timeArray[4];
            var url = "/meetinginfo/-1";
            _self.$router.push({
                    path: url,
                    query: {
                        defaultDateTime: defaultDateTime
                    }
            });
        },

        //监听滚动
        watchScroll:function(){
            var _self = this;
            var headerH = parseFloat($("header").innerHeight());
            // var navH = parseFloat($(".nav").innerHeight());

            // _self.watchScrollHandle( headerH + navH );
            _self.watchScrollHandle(headerH);
        }
    },

    beforeRouteLeave:function(to, from, next){
      if(to.name == 'index'){
          this.$store.commit('REMOVE_ITEM', 'tripmeeting');
          this.$store.commit('SET_TRIPMEETING_SHOW_MODULE', 0);
          this.$store.commit('SET_VIEW_TYPE', 'listView');
      }
      next();
    },

    beforeDestroy: function () {
        eventBus.$off('updataListEvent');
        eventBus.$off('changeViewEvent');
    }
}
</script>

<style scoped>
@import "../../assets/css/common/commonlist.css";
.pageList{
    padding-top:0;
}
</style>
