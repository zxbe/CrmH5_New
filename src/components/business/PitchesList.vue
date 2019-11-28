<template>
<div class="page">
    <div v-show="pageState == 1">
          <header class="header sticky">
              <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
              <div class="search" @click="showSearch">
                  <search-input :enableInput="false" :isShowClearIcon="true" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
              </div>
              <a class="calcfont calc-tianjia add-icon" @click="addBtn" ></a>
          </header>

          <sort :sortData="sortData" :sortObj="sortObj" ref="sort"></sort>

          <!-- 列表模式   -->
          <div class="list-mode-div" v-show="queryObj.groupByMode == 'List'">
              <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
                  <div v-if="listData !=null && listData != undefined && listData.length > 0" class="group-item-list opportunities-list">
                      <div v-for="item in listData" :key="item.AutoID" class=" group-item f14" @click="goInfo(item)">
                            <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID" @click.stop="followToggle($event)"></div>
                            <div class="item-block">
                                <div class="item-div item-first-div blue-color">
                                  {{item.TheName}}
                                </div>

                                <div class="item-div f12">
                                  <i class="calcfont calc-zhuangtai icon"></i>
                                  <span class="green-color" :class="item.className">{{item.CurrentState}}</span>
                                </div>
                                <div class="item-div" v-show="(item.Memo =='' || item.Memo == null) ? false : true">
                                  <i class="calcfont calc-beiwanglu icon"></i>
                                  <div class="line-clamp2">{{item.Memo}}</div>
                                </div>
                                <div v-if="item.IsMeetingExist.toLowerCase()!='false'" class="item-div-box">
                                      <div class="item-new-text">{{item.meetingSysmbol}}</div>
                                      <div class="new-right">
                                          <div class="item-div">
                                            <i class="calcfont calc-huiyi  icon"></i><span class="itme-div-span">{{item.MeetingTitle}}</span>
                                          </div>
                                          <div class="item-div dete-div f12">
                                            <i class="calcfont calc-gengxinshijian  icon"></i>
                                            <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                                          </div>
                                      </div>
                                </div>
                            </div>
                      </div>

                  </div>
              </vue-scroll>
          </div>

          <!-- 分组模式   -->
          <div class="group-mode-div" v-show="queryObj.groupByMode != 'List'">
              <div v-show="groupData !=null && groupData != undefined && groupData.length > 0" id="opportunitiesList" data-fromtype="opportunities">
                <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                        <div class="date-div " >
                            <span class="calcfont calc-lianxiren1"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items != null && group.items != undefined && group.items.length > 0" class="group-item-list opportunities-list">
                            <div v-for="item in group.items" :key="item.AutoID" class=" group-item f14" @click="goInfo(item)">
                                      <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
                                      <div class="item-block">
                                          <div class="item-div item-first-div blue-color">
                                            {{item.TheName}}
                                          </div>

                                          <div class="item-div f12">
                                            <i class="calcfont calc-zhuangtai icon"></i>
                                            <span class="green-color" :class="item.className">{{item.CurrentState}}</span>
                                          </div>
                                          <div class="item-div" v-show="(item.Memo =='' || item.Memo == null) ? false : true">
                                            <i class="calcfont calc-beiwanglu icon"></i>
                                            <div class="line-clamp2">{{item.Memo}}</div>
                                          </div>
                                          <div v-if="item.IsMeetingExist.toLowerCase()!='false'" class="item-div-box">
                                                <div class="item-new-text">{{item.meetingSysmbol}}</div>
                                                <div class="new-right">
                                                    <div class="item-div">
                                                      <i class="calcfont calc-huiyi  icon"></i><span class="itme-div-span">{{item.MeetingTitle}}</span>
                                                    </div>
                                                    <div class="item-div dete-div f12">
                                                      <i class="calcfont calc-gengxinshijian  icon"></i>
                                                      <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                                                    </div>
                                                </div>
                                          </div>
                                      </div>
                            </div>
                        </div>
                </div>
              </div>
          </div>

          <!-- 侧滑筛选 -->
          <screen :screenData="RightPanelModel" :queryObj="queryObj" ref="screen"></screen>

    </div>

    <!-- 页面处于搜索状态 -->
    <div v-show="pageState == 2">
        <search-module :searchModuleFromType=searchModuleFromType :lanSearchModuleInputPlaceHolder=lanSearchModuleInputPlaceHolder :queryObj=queryObj :businessType=businessType ref="searchModule"></search-module>
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
export default {
    name:'pitcheslist',
    mixins:[Mixins],
    components: {
          SearchInput,Sort,Screen,SearchModule,
          'vue-scroll': Scroll,
          nothing: Nothing
    },
    data(){
    return{
        pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
        //排序模型
        sortData:[{
            sortName:"AddTime",
            sortText:lanTool.lanContent("1000536_按创建时间正序排序"),
            sortOrder:'asc',
            sort:10
          },{
            sortName:"AddTime",
            sortText:lanTool.lanContent("1000537_按创建时间倒序排序"),
            sortOrder:'desc',
            sort:20,
            isActive:true
          },
          {
            sortName:"TheName",
            sortText:lanTool.lanContent("1000538_按标题正序排序"),
            sortOrder:'asc',
            sort:30
          },{
            sortName:"TheName",
            sortText:lanTool.lanContent("1000539_按标题倒序排序"),
            sortOrder:'desc',
            sort:40
          }],
        //右侧侧滑数据模型
        RightPanelModel:{
          "DataFilterModel":{
              text:lanTool.lanContent("794_数据筛选"),
              option:[
                {
                  id:"allData",
                  text:lanTool.lanContent("795_全部"),
                  sort:10,
                  isActive:true
                },{
                  id:"MyFollowData",
                  text:lanTool.lanContent("981_我关注的数据"),
                  sort:20
                },{
                  id:"InProcess",
                  text:lanTool.lanContent("1083_进行中"),
                  sort:30
                },{
                  id:"Won",
                  text:lanTool.lanContent("1142_赢单"),
                  sort:40
                },{
                  id:"Lost",
                  text:lanTool.lanContent("1143_输单"),
                  sort:50
                },{
                  id:"Withdrew",
                  text:lanTool.lanContent("1000409_取回"),
                  sort:60
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
                    id:"popedomTeamInf",
                    text:lanTool.lanContent("1000491_部门/工作组"),
                    sort:20
                  },{
                    id:"businessType",
                    text:lanTool.lanContent("695_业务"),
                    sort:30
                  },{
                    id:"countryName",
                    text:lanTool.lanContent("701_国家"),
                    sort:40
                  },{
                    id:"shortName",
                    text:lanTool.lanContent("641_组织机构"),
                    sort:50
                  },{
                    id:"initiator",
                    text:lanTool.lanContent("711_发起人"),
                    sort:60
                  }
              ]
          },
          "FieldModel":[{
                  queryfield: "AddTime",
                  text: lanTool.lanContent("1000024_时间范围"),
                  fieldControlType: "dateRange",
                  queryType: "DateTime",
                  queryFormat: "dd/MM/yyyy HH:mm:ss",
                  queryRelation: "and",
                  queryValue: "",
                  queryComparison: "between",
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
                }
              //   ,
              //   {
              //     queryfield: "CompanyID",
              //     text: lanTool.lanContent("790_公司"),
              //     fieldControlType: "selectList",
              //     queryType: "string",
              //     queryFormat: "",
              //     queryRelation: "and",
              //     queryValue: "",
              //     queryComparison: "=",
              //     Code: "DropDowList_PopedomTeamVsUser",
              //     TypeValue: "",
              //     selectType: "radio",
              //     datalanid: "1000526_请选择",
              //     iconClass:'calc-gongsixinxi'
              // }
              ]
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
          autoValue:""//模糊查询值
        },
        pageType:1,//0:pipeline
        //列表数据(分组模式为List)
        listData:[
        //   {
        //   "AutoID": 443,
        //   "TheName": "ISTAT Latin America",
        //   "Memo": "Meetings at the ISTAT Latin America Forum",
        //   "CurrentState": "In Progress",
        //   "CurrentStateNew": 38,
        //   "IsFollow": "calc-noshoucang",
        //   "IsMeetingExist": "true",
        //   "MeetingTitle": "ISTAT Latin America ",
        //   "BeginTime": "2019-11-11T08:00:00"
        // }
        ],
        //分组数据(分组模式为非List)
        groupData:[
        //   {
        //   "GroupID": 6,
        //   "GroupName": "Component Sales - Airframe & Component Solution",
        //   "GroupRowCount": 51
        // }, {
        //   "GroupID": 8,
        //   "GroupName": "Corporate Financing & Global Banking",
        //   "GroupRowCount": 1
        // }
        ],
        
        lanSearchModuleInputPlaceHolder:lanTool.lanContent("644_商业机会"),
        searchModuleFromType:"9", //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
        businessType:"30", //商机=>30;交易=>29
        showPage:"1"//记录列表页是从哪个模块进来的 0：交易；1：商业机会
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'pitcheslist');

      //接收从HomeSearch页面传过来的值
      //设置模糊查询的值
      var autoVal = _self.$route.query.autoValue || '';
      _self.$nextTick(function(){
        _self.queryObj.autoValue = autoVal;
        _self.$refs.searchInput.searchValue = autoVal;
      });
  },
  mounted(){
      let _self = this;
      _self.watchScroll();
      //分组模式事件绑定
      _self.groupToggleHandle('opportunitiesList');
      _self.groupToggleHandle('organizationsList');
  },
  methods:{
      //返回上一页
      back(){
          var $this = this;
          $this.$router.back(-1);
      },
      //添加
      addBtn(){
          let _self = this;
          //传入参数
          //showPage:记录列表页是从哪个模块进来的 0：交易；1：商业机会
          var parameter = {
            showPage : _self.showPage
          };
          _self.$router.push({
              path: '/opportunitiesinfo/-1',
              query: parameter
          });
      },
      //查询委托
      delegateQuery:function(){
        let _self = this;

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
        var controlName = tool.Api_OpportunityHandle_GroupInnerData;

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
            PageType:_self.pageType,
            AutoValue:_self.queryObj.autoValue||"",
            BusinessTypes:_self.businessType || ""
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
                // console.log(data);

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
                  _self.listData = [];
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
        var controlName = tool.Api_OpportunityHandle_Group;

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
                // console.log(data);

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
      //添加/取消关注
      followToggle: function (e) {
          var _curObj = $(e.target);
          var fromType = "dealPipeline";
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
            showPage: _self.showPage,
            infoName:data.TheName||""
        };
        _self.$router.push({
            path: '/opportunitiesinfo/' + data.AutoID,
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

      //分组模式下展开收起
    groupToggleHandle:function(idName){
        console.log(0);
        var _self = this;
        $("#"+ idName ).off("click", "div.date-div").on(
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

                console.log(1);

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
                    console.log(2);
                    let groupBy = _self.queryObj.groupByMode ||"";
                    let queryCondictionArr = _self.constructQueryCondiction() || [];
                    tool.InitInnerDataList(_self, fromType, groupID, queryCondictionArr, function(){
                        _self.$nextTick(function () {

                            target.addClass("open")
                                .siblings(".group-item-list")
                                .slideDown(500);
                        });
                    }, '', groupBy, _self.pageType);
                }
            }
        );

      },

      //点击头部搜索
      showSearch(){
          let _self = this;
          //1>隐藏排序的下拉
          _self.$refs.sort.closeDownToggle();
          //2>构造历史查询记录
          _self.$refs.searchModule.getHistoricalSearchRecord();
          //3>若当前组件的input组件有值，则将该值赋予SearchModule的input组件
          var curAutoVal = _self.$refs.searchInput.searchValue || "";
          _self.$refs.searchModule.$refs.searchInput.searchValue = curAutoVal;
          //4>执行模糊查询，查询匹配的前N条记录
          _self.$refs.searchModule.$refs.searchInput.inputChange();
          //5>切换到模糊查询页面
          _self.pageState = 2;
          //6>获取搜索框焦点
          _self.$nextTick(function(){
            var $inputObj = $('#searchHeader').find('input.search-input');
            if($inputObj.length>=1){
                //获取焦点并设置光标位置
                //console.log(($inputObj[0].value||"").length);
                tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length);
            }
          });
      },
      //input查询框,点击搜索/回车键执行的查询
      //接收搜索的值并刷新列表
      //str有可能为空(专门处理搜索)
      refreshListBySearchValue(str,callBack){
        let _self = this;
        str = (str ||"").trim();
        _self.pageState = 1;
        //1>初始化排序
        _self.$refs.sort.initDefultSortItem(false);
        //2>初始化筛选条件
        _self.$refs.screen.resetEvent(true);
        //3>设置模糊查询的值
        _self.queryObj.autoValue = str;
        //4>执行查询
        _self.queryList('pushRefresh');
        //5>执行回调函数(这里不把callback放在queryList执行，是因为queryList里的callBack,只有执行查询成功，并且有数据的情况下，才会执行callBack)
        if(!tool.isNullOrEmptyObject(callBack) && typeof(callBack) == "function"){
          callBack();
        }
      },
      //点击头部输入框中的X按钮
      clearSearchValue(){
          let _self = this;
          var autoVal = "";
          //1>清除input控件的值
          _self.$refs.searchInput.searchValue = autoVal;
          //2>清除searchModule的input组件的值
          _self.$refs.searchModule.$refs.searchInput.searchValue = autoVal;
          //3>清除searchModule的inputValue
          _self.$refs.searchModule.inputValue = autoVal;
          //4>清除searchModule的模糊查询结果
          _self.$refs.searchModule.resultData = [];
          //5>触发searchModule的查询动作
          _self.$nextTick(function(){
              _self.$refs.searchModule.excuteSeach(autoVal);
          });
      }
  },
  beforeRouteLeave: function (to, from, next) {
      if (to.name == 'index') {
          this.$store.commit('REMOVE_ITEM', 'pitcheslist');
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


/*列表*/
.list-mode-div{
  position: fixed;
  left:0;right:0;bottom:0;
  top:calc(0.88rem + 0.7rem);
}


/*分组模式*/
.group-mode-div{
  padding-top:calc(0.88rem + 0.7rem);
}
</style>
