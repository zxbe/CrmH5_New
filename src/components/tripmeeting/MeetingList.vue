<template>
<div class="page">

    <div v-show="pageState == 1">
          <header class="header sticky">
              <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
              <div class="search" @click="showSearch">
                  <search-input :enableInput="false" placeholder="搜索会议" :searchValue="searchValue"></search-input>
              </div>
              <a class="calcfont calc-tianjia add-icon" @click="addMeeting" ></a>
          </header>

          <sort :sortData="sortData" :sortObj="sortObj"></sort>

          <!-- 列表视图 -->
          <div v-show="queryObj.viewMode == 'listView'">
              <!-- 列表模式 List -->
              <div v-show="queryObj.groupByMode == 'List'" class="list-mode-div">
                  <vue-scroll :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
                        <div v-if="listData !=null && listData != undefined && listData.length > 0" class="group-item-list meeting-list">
                            <div v-for="item in listData" :key="item.AutoID"
                            class="data-events-item f14" @click="goInfo(item)">
                                    <div class="flex">
                                      <i style="margin-right: 3px;" class="calcfont calc-T icon"></i><div class="item-title">{{item.MeetingTitle}}</div>
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
                  </vue-scroll>
              </div>

              <!-- Date模式 -->
              <div v-show="queryObj.groupByMode == 'Date'" class="date-mode-div" id="meetingList" data-fromtype="meeting">
                    <div v-for="group in groupData" :key="group.GroupID"
                      class="list-group-div group-div">
                        <div class="date-div">
                          <span class="calcfont calc-rili1"></span>
                          <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName|abdDateFormat('dd/MM/yyyy')}}</span>
                          <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items !=null && group.items != undefined && group.items.length > 0" class="group-item-list meeting-list">
                            <div v-for="item in group.items" :key="item.AutoID"
                            class="data-events-item f14" @click="goInfo(item)">
                                    <div class="flex">
                                      <i style="margin-right: 3px;" class="calcfont calc-T icon"></i><div class="item-title">{{item.MeetingTitle}}</div>
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
              </div>

              <!-- 业务分组 模式 -->
              <div v-show="queryObj.groupByMode == 'PopedomTeamInf'" class="department-mode-div" id="meetingListOfGroup" data-fromtype="meeting">
                    <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                        <div class="date-div">
                            <span class="calcfont calc-business"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items !=null && group.items != undefined && group.items.length > 0" class="group-item-list contacts-list">
                                <div v-for="dateGroup in group.items" :key="dateGroup.GroupID" class="company_item">
                                  <div class="company_item_tit f14" >
                                      <span class="calcfont calc-rili1"></span>
                                      <div class="company_name" :data-groupid="dateGroup.GroupID">{{dateGroup.GroupName|abdDateFormat('dd/MM/yyyy')}}</div>
                                      <div>（{{dateGroup.GroupRowCount}}）</div>
                                  </div>
                                  <div class="occupy-div"></div>

                                  <div v-if="dateGroup.items && dateGroup.items.length > 0" class="meeting-list data-list">
                                        <div v-for="item in dateGroup.items" :key="item.AutoID"
                                            class="data-events-item f14" @click="goInfo(item)">
                                                <div class="flex">
                                                  <i style="margin-right: 3px;" class="calcfont calc-T icon"></i><div class="item-title">{{item.MeetingTitle}}</div>
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
                        </div>

                    </div>
              </div>
          </div>

          <!-- calendar视图 -->
          <div v-show="queryObj.viewMode != 'listView'" class="calendar-div">
              <calendar class="calendar-view"></calendar>
          </div>

          <!-- 侧滑筛选 -->
          <screen :screenData="RightPanelModel" :queryObj="queryObj"></screen>
    </div>

    <!-- 页面处于搜索状态 -->
    <div v-show="pageState == 2">
        <search-module module="meeting" ref="searchModule"></search-module>
    </div>

</div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
import Sort from "@/components/customPlugin/Sort"
import Screen from "@/components/customPlugin/Screen"
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";
import SearchModule from '@/components/customplugin/SearchModule'
import Mixins from '@/mixins/commonlist.js'
import Calendar from '@/components/tripmeeting/Calendar'
export default {
  name:'meetinglist',
  mixins:[Mixins],
  components: {
        SearchInput,Sort,Screen,SearchModule,
        'vue-scroll': Scroll,
        nothing: Nothing,
        'calendar': Calendar
  },
  data(){
    return{
        pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
        searchValue:'', //搜索框的值
        //排序模型
        sortData:[{
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
            sortOrder:'desc'
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
            sortOrder:'desc'
          },
          {
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000522_按国家正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000523_按国家倒序排序"),
            sortOrder:'desc'
        }],
        //右侧侧滑数据模型
        RightPanelModel:{
            "ViewModel":{
                text:lanTool.lanContent("867_视图"),
                option:[
                    {
                      id:"listView",
                      text:lanTool.lanContent("929_列表视图"),
                      sort:10,
                      isActive:true
                    },{
                      id:"calendarView",
                      text:lanTool.lanContent("928_日历视图"),
                      sort:20,
                      //isActive:true
                    }
                ]
            },
            "DataFilterModel":{
                text:lanTool.lanContent("794_数据筛选"),
                option:[
                    {
                      id:"allData",
                      text:lanTool.lanContent("795_全部"),
                      sort:10,
                      isActive:true
                    },{
                      id:"myData",
                      text:lanTool.lanContent("930_我的日程"),
                      sort:20,
                      //isActive:true
                    },{
                      id:"otherData",
                      text:lanTool.lanContent("942_其他同事的日程"),
                      sort:20,
                      //isActive:true
                    }
                ]
            },
            "GroupByModel":{
                text:lanTool.lanContent("1000004_分组模式"),
                option:[
                    {
                      id:"List",
                      text:lanTool.lanContent("1000524_列表"),
                      sort:10,
                      isActive:true
                    },{
                      id:"Date",
                      text:lanTool.lanContent("907_日期"),
                      sort:20,
                      // isActive:true
                    },{
                      id:"PopedomTeamInf",
                      text:lanTool.lanContent("769_业务组"),
                      sort:30
                    }
                ]
            },
            "TimeRangeModel":{
                text:lanTool.lanContent("1000024_时间范围"),
                option:[
                    {
                      id:"all",
                      text:lanTool.lanContent("795_全部"),
                    },{
                      id:"week",
                      text:lanTool.lanContent("1000005_最近7天"),
                    },{
                      id:"month",
                      text:lanTool.lanContent("1000006_最近30天"),
                    },{
                      id:"halfyear",
                      text:lanTool.lanContent("1000007_最近半年"),
                    },{
                      id:"customize",
                      text:lanTool.lanContent("1000008_自定义"),
                    }
                ]
            },
            "FieldModel":[{
                queryfield: "CompanyID",
                text: lanTool.lanContent("790_公司"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCompanyBaseInfHasContact",
                TypeValue: "",
                selectType: "radio",
                // clickObj: "CountryIDClickObj",
                datalanid: "1000526_请选择",
                resulteRow: true,
                iconClass:'calc-gongsixinxi'
              },
              {
                queryfield: "ContactsID",
                text: lanTool.lanContent("630_联系人"),
                fieldControlType: "linkSelectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCompanyContactsByCompany",
                TypeValue: "",
                selectType: "radio",
                datalanid: "1000526_请选择",
                iconClass:'calc-kehulianxiren'
              }]
        },
        noData: false, //没数据
        pageSize: tool.PageSize, //一页显示多少记录
        pageNum: 1, //当前页码
        sortObj:{
          sortName:"",//排序名称
          sortOrder:""//排序方向
        },
        //查询对象
        queryObj:{
          dataFilter:"",//数据筛选模式,
          groupByMode:"",//分组模式,
          viewMode:"",//视图模式
          queryCondictionArr:[],//自定义查询条件
        },
        pageType:0,
        //列表数据(分组模式为List)
        listData:[{
            "AutoID": 996,
            "MeetingTitle": "Hongtu Airlines A320 Placement",
            "BeginTime": "2019-11-20T17:27:00",
            "EndTime": "2019-11-22T17:27:00",
            "CompanyID": "红土航空有限公司",
            "ContactsID": "豆海东",
            "Title": "副总经理",
            "Realname": "Qing Fang"
          }, {
            "AutoID": 964,
            "MeetingTitle": "工作进度报告",
            "BeginTime": "2019-11-20T16:00:00",
            "EndTime": "2019-11-20T17:30:00",
            "CompanyID": "中国飞机租赁集团(spv)",
            "ContactsID": "阮毅文",
            "Title": "前端开发工程师",
            "Realname": "Alan Cheng"
          }, {
            "AutoID": 962,
            "MeetingTitle": "Norwegian/Joy Air delivery",
            "BeginTime": "2019-11-20T20:47:00",
            "EndTime": "2019-11-20T20:47:00",
            "CompanyID": "Norwegian",
            "ContactsID": "Arvid Jensen",
            "Title": "Aircraft Transition Coordinator",
            "Realname": "Richard Luo"
          }],
        //分组数据(分组模式为非List)
        groupData:[{
              "GroupName": "2019-12-06",
              "GroupID": "2019-12-06",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-12-05",
              "GroupID": "2019-12-05",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-12-04",
              "GroupID": "2019-12-04",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-12-03",
              "GroupID": "2019-12-03",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-11-25",
              "GroupID": "2019-11-25",
              "GroupRowCount": 2
            }, {
              "GroupName": "2019-11-22",
              "GroupID": "2019-11-22",
              "GroupRowCount": 2
            }, {
              "GroupName": "2019-11-21",
              "GroupID": "2019-11-21",
              "GroupRowCount": 5
            }, {
              "GroupName": "2019-11-20",
              "GroupID": "2019-11-20",
              "GroupRowCount": 3
            }, {
              "GroupName": "2019-11-19",
              "GroupID": "2019-11-19",
              "GroupRowCount": 4
            }, {
              "GroupName": "2019-11-18",
              "GroupID": "2019-11-18",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-11-16",
              "GroupID": "2019-11-16",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-11-15",
              "GroupID": "2019-11-15",
              "GroupRowCount": 6
            }, {
              "GroupName": "2019-11-14",
              "GroupID": "2019-11-14",
              "GroupRowCount": 5
            }, {
              "GroupName": "2019-11-13",
              "GroupID": "2019-11-13",
              "GroupRowCount": 4
            }, {
              "GroupName": "2019-11-12",
              "GroupID": "2019-11-12",
              "GroupRowCount": 6
            }, {
              "GroupName": "2019-11-11",
              "GroupID": "2019-11-11",
              "GroupRowCount": 11
            }, {
              "GroupName": "2019-11-08",
              "GroupID": "2019-11-08",
              "GroupRowCount": 6
            }, {
              "GroupName": "2019-11-07",
              "GroupID": "2019-11-07",
              "GroupRowCount": 5
            }, {
              "GroupName": "2019-11-06",
              "GroupID": "2019-11-06",
              "GroupRowCount": 4
            }, {
              "GroupName": "2019-11-05",
              "GroupID": "2019-11-05",
              "GroupRowCount": 5
            }, {
              "GroupName": "2019-11-04",
              "GroupID": "2019-11-04",
              "GroupRowCount": 7
            }, {
              "GroupName": "2019-11-03",
              "GroupID": "2019-11-03",
              "GroupRowCount": 3
            }, {
              "GroupName": "2019-11-01",
              "GroupID": "2019-11-01",
              "GroupRowCount": 3
            }, {
              "GroupName": "2019-10-31",
              "GroupID": "2019-10-31",
              "GroupRowCount": 5
            }, {
              "GroupName": "2019-10-30",
              "GroupID": "2019-10-30",
              "GroupRowCount": 7
            }, {
              "GroupName": "2019-10-29",
              "GroupID": "2019-10-29",
              "GroupRowCount": 8
            }, {
              "GroupName": "2019-10-28",
              "GroupID": "2019-10-28",
              "GroupRowCount": 6
            }, {
              "GroupName": "2019-10-27",
              "GroupID": "2019-10-27",
              "GroupRowCount": 1
            }, {
              "GroupName": "2019-10-26",
              "GroupID": "2019-10-26",
              "GroupRowCount": 2
            }, {
              "GroupName": "2019-10-25",
              "GroupID": "2019-10-25",
              "GroupRowCount": 8
            }, {
              "GroupName": "2019-10-24",
              "GroupID": "2019-10-24",
              "GroupRowCount": 6
            }, {
              "GroupName": "2019-10-23",
              "GroupID": "2019-10-23",
              "GroupRowCount": 6
            }]
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'meetinglist');
  },
  mounted(){
      let _self = this;
      _self.watchScroll();
      _self.groupToggle('meetingList','meetingListOfGroup');
  },
  methods:{
    //返回上一页
    back(){
        var $this = this;
        $this.$router.back(-1);
    },
    //添加会议
    addMeeting(){
        let _self = this;
        _self.$router.push({
            path: '/meetinginfo/-1'
        });
    },
    //查询委托
    delegateQuery:function(){
      let _self = this;
/*
      _self.$nextTick(function(){

        //执行查询
        if(tool.isNullOrEmptyObject(_self.queryObj.groupByMode)){
          return;
        }

        if(_self.queryObj.groupByMode.toLowerCase() == "list"){
          //查询列表
          _self.queryList('pushRefresh', function () {
          });
        }else{
          //查询分组数据
          _self.queryGroup();
        }
      });
*/
    },
    //合并查询条件
    constructQueryCondiction:function(){
      let _self = this;
      var queryCondictionAllArr = [];
      if(!tool.isNullOrEmptyObject(_self.queryObj.dataFilter)){
        var dataFilterObj = {
          Field:_self.queryObj.dataFilter||"",
          Type:"string",
          Format:"",
          Relation:"and",
          Value:_self.queryObj.dataFilter,
          Comparison:"="
        };
        queryCondictionAllArr.push(dataFilterObj);
      }

      if(!tool.isNullOrEmptyObject(_self.queryObj.queryCondictionArr)){
        queryCondictionAllArr = tool.combineArray(queryCondictionAllArr,_self.queryObj.queryCondictionArr);
      }

      return queryCondictionAllArr;
    },
    //列表查询
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
        var controlName = tool.Api_OrganizationsHandle_GroupInnerData;

        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            IsUsePager: true,
            PageSize:_self.pageSize,
            PageNum:_self.pageNum,
            SortName:_self.sortObj.sortName||"",
            SortOrder:_self.sortObj.sortOrder||"",
            QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
            GroupBy:_self.queryObj.groupByMode||"",
            PageType:_self.pageType
        };
        //console.log(jsonDatasTemp);

        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                console.log(data);

                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    _self.listData = [];
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

                if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
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
    pulldown: function () {
        let _self = this;
        _self.queryList('pushRefresh', function () {
            // _self.$refs.scroll.refresh();
        });
    },
    //上拉
    pullup: function () {
        let _self = this;
        _self.queryList('pushLoad', function (data, pageSize) {
            if (data.length < pageSize) {
                _self.$refs.scroll.pullupEnd();
            }
        });
    },
    //查询分组数据
    queryGroup:function(callback){
      let _self = this;
      var urlTemp = tool.AjaxBaseUrl();
      var controlName = tool.Api_OrganizationsHandle_Group;

      var jsonDatasTemp = {
          CurrentLanguageVersion: lanTool.currentLanguageVersion,
          UserName: tool.UserName(),
          _ControlName: controlName,
          _RegisterCode: tool.RegisterCode(),
          QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
          GroupBy:_self.queryObj.groupByMode||"",
          PageType:_self.pageType
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
              console.log(data);

              if (data._ReturnStatus == false) {
                  tool.showText(tool.getMessage(data));
                  console.log(tool.getMessage(data));
                  _self.listData = [];
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
              _self.groupData = data;

              if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
                callback(data);
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

    //点击头部搜索
    showSearch(){
        let _self = this;
        _self.pageState = 2;
        //给搜索框获取焦点
        $('#searchHeader').find('input.search-input').focus();
        // console.log($('#searchHeader').find('input.search-input'));


        //设置搜索输入框值
        // _self.$set(_self.$refs.searchModule, 'inputValue', _self.searchValue);

        //获取搜索历史数据
        _self.$refs.searchModule.getHistory();
    },

    //添加/取消关注
    followToggle: function (e) {
        var _curObj = $(e.target);
        var fromType = "Organizationsinfo";
        var autoID = _curObj.attr("data-autoid") || "";

        var actionType;
        if (_curObj.hasClass("calc-shoucang")) {
            //取消关注
            actionType = 0;
        } else {
            //添加关注
            actionType = 1;
        }

        tool.UserFollow(fromType, autoID, actionType, function () {
            if (_curObj.hasClass("calc-shoucang")) {
                //取消关注
                _curObj.removeClass("calc-shoucang").addClass("calc-noshoucang");
            } else {
                //添加关注
                _curObj.removeClass("calc-noshoucang").addClass("calc-shoucang");
            }
        });
    },

    //点击跳转到详情页
    goInfo(data){
      let _self = this;
      if(tool.isNullOrEmptyObject(data) || tool.isNullOrEmptyObject(data.AutoID)){
          return;
      }
      var parameter = {
          // showPage: _self.showPage,
          infoName:data.MeetingTitle
      };
      _self.$router.push({
          path: '/meetinginfo/' + data.AutoID,
          query: parameter
      });
    },

    //监听滚动
    watchScroll:function(){
        var _self = this;
        var headerH = parseFloat($("header").innerHeight());
        var navH = parseFloat($(".sort").innerHeight());

        _self.watchScrollHandle( headerH + navH );
    },

    //列表展开收起(一级)
    /*
      * 列表展开收起
      *  id1 , id2 :只模块id
      */
    groupToggle:function(id1, id2){
        var _self = this;
        $("#"+ id1 +",#"+id2).off("click", "div.date-div").on(
            "click",
            "div.date-div",
            function (event) {
                event.preventDefault();
                var target = $(event.target);
                if (!target.hasClass('date-div')) {
                    target = target.parents("div.date-div:first");
                    if (tool.isNullOrEmptyObject(target)) {
                        return;
                    }
                }
                var fromType = target.parents("div[data-fromtype]").attr("data-fromtype") || "";
                var groupID = target.find("span[data-groupid]:first").attr("data-groupid") || "";

                if (tool.isNullOrEmptyObject(groupID)) {
                    return;
                }

                //若是展开
                if (target.hasClass("open")) {
                    target
                        .removeClass("open")
                        .siblings(".group-item-list")
                        .slideUp(500, function () {
                            //清空items数据
                            $.each(_self.groupData, function (index, item) {
                                if (item.GroupID == groupID) {
                                    item.items = [];
                                    return;
                                }
                            })
                        });
                } else {
                    //若是收起
                    var allQueryData = tool.combineArray(_self.queryCondictionData, _self.queryCondiction, "Field");

                    //BusinessCategories模块需要用到
                    if(allQueryData && !tool.isNullOrEmptyObject(_self.dateRangeJObject)){
                        allQueryData.push(_self.dateRangeJObject);
                    }

                    let groupBy = _self.groupBy == undefined ? '' : _self.groupBy;

                    tool.InitInnerDataList(_self, fromType, groupID, allQueryData, function(){
                        _self.$nextTick(function () {
                            target.addClass("open")
                                .siblings(".group-item-list")
                                .slideDown(500);

                            //分组模式会议 二级展开收起
                            if(!tool.isNullOrEmptyObject(_self.meetingToggle)){
                              _self.meetingToggle();
                            }
                        })
                    }, '', groupBy, _self.showPage);
                }
            }
        );

    },

    //分组模式会议 二级展开收起
    meetingToggle:function(){
        let _self = this;
        $('#meetingListOfGroup').off('click','.company_item_tit').on(
          'click',
          '.company_item_tit',
          function(event){
              event.preventDefault();
              var target = $(event.target);
              if (!target.hasClass('company_item_tit')) {
                  target = target.parents("div.company_item_tit:first");
                  if (tool.isNullOrEmptyObject(target)) {
                      return;
                  }
              }
              var categoryID = target.closest('.contacts-list')
                              .siblings('div.date-div')
                              .find("span[data-groupid]:first")
                              .attr("data-groupid") || "";
              var companyID = target.find("div[data-groupid]:first").attr("data-groupid") || "";
              if (tool.isNullOrEmptyObject(categoryID) || tool.isNullOrEmptyObject(companyID)) {
                    return;
              }
              //若是展开
              if (target.hasClass("open")) {
                  target
                      .removeClass("open")
                      .siblings(".meeting-list")
                      .slideUp(500, function () {
                          //清空items数据
                          $.each(_self.groupData, function (index, item) {
                              if (item.GroupID == categoryID) {
                                  $.each(item.items, function(i, companyData){
                                      if(companyData.AutoID == companyID){
                                          companyData.items = [];
                                      }
                                  })
                              }
                          })
                      });
              }else{
                  //若是收起
                  _self.getMeetings(categoryID, companyID, function(){
                      _self.$nextTick(function () {
                          target.addClass("open")
                              .siblings(".meeting-list")
                              .slideDown(500);
                      })
                  });
              }


          })
    },

    //接收搜索的值并刷新列表,str有可能为空  (专门处理搜索)
    refreshListBySearchValue(str){
        let _self = this;
        _self.pageState = 1;
        if( !tool.isNullOrEmptyObject(str)){
            _self.searchValue = str;
        }
        console.log(_self.searchValue);
    },

    //处理右侧字段联动
    rightPanelLinkageField(vueObj){
        tool.linkageField(vueObj, 'CompanyID', 'ContactsID');
    }

  },
  beforeRouteLeave: function (to, from, next) {
      if (to.name == 'index') {
          this.$store.commit('REMOVE_ITEM', 'meetinglist');
      }
      next();
  }

}
</script>

<style scoped>
.page{}
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  position:fixed;z-index: 99;
  top:0;left:0;right:0;
}
.back-icon{font-size: 0.48rem;padding:0.1rem 10px;}
.search{flex:1;}
.add-icon{font-size: 0.4rem;padding:0.1rem 10px;}


/*列表模式*/
.list-mode-div{
  position: fixed;
  left:0;right:0;bottom:0;
  top:calc(0.88rem + 0.7rem);
}


/*分组模式*/
.date-mode-div,.department-mode-div,.calendar-div{
  padding-top:calc(0.88rem + 0.7rem);
}
</style>

