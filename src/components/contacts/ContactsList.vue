<template>
<div class="page">

  <div v-show="pageState == 1">
      <header class="header">
          <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
          <div class="search" @click="showSearch">
              <search-input :enableInput="false" :isShowClearIcon="true" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
          </div>
          <a class="calcfont calc-tianjia add-icon" @click="addContacts" ></a>
      </header>
      <sort :sortData="sortData" :sortObj="sortObj" ref="sort"></sort>
      <!-- 列表模式   -->
      <div v-show="queryObj.groupByMode == 'List'" class="list-mode-div">
        <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

              <div v-if="listData.length > 0" class="contacts-list data-list">
                    <div v-for="item in listData" :key="item.AutoID" @click="goInfo(item)" class="group-item data-events-item f14">
                          <div class="item-user-icon"><img src="../../assets/images/default_user_img.png" alt=""></div>
                          <div class="item-block contacts-item-block">
                                  <div class="item-div item-first-div"><span>{{item.EnglishName}}</span></div>
                                  <div class="item-div" style="padding-top:5px;">
                                      <i :class="[(item.Title =='' || item.Title == null) ? '' : 'calc-zhiwei']" class="calcfont icon"></i><span>{{item.Title}}</span>
                                  </div>
                                  <div class="item-div">
                                      <div class="left-text max60" v-show="(item.CompanyID =='' || item.CompanyID == null) ? false : true">
                                          <i class="calcfont icon calc-gongsixinxi"></i><span >{{item.CompanyID}}</span>
                                      </div>
                                      <div class="right-text max35" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                                          <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                                      </div>
                                  </div>
                                  <div class="item-div">
                                      <div class="left-text max60" v-show="(item.Email =='' || item.Email == null) ? false : true">
                                        <i class="calcfont icon calc-mailbox"></i><span>{{item.Email}}</span>
                                      </div>
                                      <div class="right-text max35" v-show="(item.TelPhone =='' || item.TelPhone == null) ? false : true">
                                        <i class="calcfont icon calc-mobilephone"></i><span>{{item.TelPhone}}</span>
                                      </div>
                                  </div>

                          </div>
                    </div>
              </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
      </div>
      <!-- 分组模式   -->
      <div v-show="queryObj.groupByMode != 'List'" class="group-mode-div" id="contactsList">
          <div v-show="!noData" id="contactsList" data-fromtype="organizations">
                <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                    <div class="date-div">
                        <span class="calcfont calc-business"></span>
                        <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                        <span class="right">（{{group.GroupRowCount}}）</span>
                    </div>
                    <div class="occupy-div"></div>

                    <div v-if="group.items != null && group.items != undefined && group.items.length >= 1" class="group-item-list contacts-list ">
                            <div v-for="companys in group.items" :key="companys.AutoID" class="company_item">
                              <div class="company_item_tit f14" >
                                  <span class="calcfont calc-gongsixinxi"></span>
                                  <div class="company_name" :data-groupid="companys.AutoID">{{companys.ShortName}}</div>
                                  <div>（{{companys.GroupRowCount}}）</div>
                              </div>
                              <div class="occupy-div"></div>

                              <div v-if="companys.items.length > 0" class="contact_list data-list">
                                    <div v-for="company in companys.items" :key="company.AutoID" @click="goInfo(company)" class="group-item data-events-item f14">
                                          <div class="item-user-icon"><img src="../../assets/images/default_user_img.png" alt=""></div>
                                          <div class="item-block contacts-item-block">
                                                  <div class="item-div item-first-div"><span>{{company.EnglishName}}</span></div>
                                                  <div class="item-div" style="padding-top:5px;">
                                                      <i :class="[(company.Title =='' || company.Title == null) ? '' : 'calc-zhiwei']" class="calcfont icon"></i><span>{{company.Title}}</span>
                                                  </div>
                                                  <div class="item-div">
                                                      <div class="left-text max60" v-show="(company.CompanyID =='' || company.CompanyID == null) ? false : true">
                                                          <i class="calcfont icon calc-gongsixinxi"></i><span >{{company.CompanyID}}</span>
                                                      </div>
                                                      <div class="right-text max35" v-show="(company.CountryName =='' || company.CountryName == null) ? false : true">
                                                          <i class="calcfont icon calc-nationaarea"></i><span>{{company.CountryName}}</span>
                                                      </div>
                                                  </div>
                                                  <div class="item-div">
                                                      <div class="left-text max60" v-show="(company.Email =='' || company.Email == null) ? false : true">
                                                        <i class="calcfont icon calc-mailbox"></i><span>{{company.Email}}</span>
                                                      </div>
                                                      <div class="right-text max35" v-show="(company.TelPhone =='' || company.TelPhone == null) ? false : true">
                                                        <i class="calcfont icon calc-mobilephone"></i><span>{{company.TelPhone}}</span>
                                                      </div>
                                                  </div>

                                          </div>
                                    </div>
                              </div>
                        </div>
                    </div>
                </div>
          </div>
          <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
      </div>

      <!-- 侧滑筛选 -->
      <screen :screenData="RightPanelModel" :queryObj="queryObj" ref="screen"></screen>
  </div>

  <!-- 页面处于搜索状态 -->
  <div v-show="pageState == 2">
      <search-module :searchModuleFromType=searchModuleFromType :lanSearchModuleInputPlaceHolder=lanSearchModuleInputPlaceHolder :queryObj=queryObj ref="searchModule"></search-module>
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
  name:'contactslist',
  mixins:[Mixins],
  components: {
        SearchInput,Sort,Screen,SearchModule,
        'vue-scroll': Scroll,
        nothing: Nothing
  },
  data(){
    return{
        sortData:[{
            sortName:"EnglishName",
            sortText:lanTool.lanContent("1000528_按联系人名称正序排序"),
            sortOrder:'asc',
            sort:10,
            isActive:true
          },{
            sortName:"EnglishName",
            sortText:lanTool.lanContent("1000529_按联系人名称倒序排序"),
            sortOrder:'desc',
            sort:20
          },{
            sortName:"CompanyID",
            sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
            sortOrder:'asc',
            sort:30
          },{
            sortName:"CompanyID",
            sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
            sortOrder:'desc',
            sort:40
          },{
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
            sortOrder:'asc',
            sort:50
          },{
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
            sortOrder:'desc',
            sort:60
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
                      text:lanTool.lanContent("796_关注的公司"),
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
                      id:"BusinessType",
                      text:lanTool.lanContent("1000530_业务分类/公司"),
                      sort:20
                    }
                ]
            },
            "FieldModel":[{
                queryfield: "BusinessType",
                text: lanTool.lanContent("1007_业务分类"),
                fieldControlType: "picketTile",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseAllTypes",
                TypeValue: "Companybusinesstype",
                datalanid: "1007_业务分类",
                option:[],
                more:true  //picker中是否提供显示更多功能
            },
            {
                queryfield: "CompanyID",
                text: lanTool.lanContent("1025_公司"),
                fieldControlType: "textareaInput",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "like",
                datalanid: "1025_公司",
                iconClass:'calc-gongsixinxi'
              }]
        },
        pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
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
        pageType:1,//0:Organizations;1:Contacts
        listData:[],//列表模式数据
        groupData:[],//分组模式数据
        lanSearchModuleInputPlaceHolder:lanTool.lanContent("729_联系人名称"),
        searchModuleFromType:"6" //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
    }
  },
  computed:{

  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'contactslist');

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
      _self.groupToggleHandle('contactsList');
  },
  activated(){

  },
  methods:{
    //返回上一页
    back(){
        var _self = this;
        _self.$router.back(-1);
    },
    //添加联系人
    addContacts(){
        let _self = this;
        _self.$router.push({
            path: '/contactsinfo/-1'
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
        var controlName = tool.Api_ContactsHandle_GroupInnerData;

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
            AutoValue:_self.queryObj.autoValue||""
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
    //监听滚动
    watchScroll:function(){
        var _self = this;
        var headerH = parseFloat($("header").innerHeight());
        var navH = parseFloat($(".sort").innerHeight());

        _self.watchScrollHandle( headerH + navH );
    },
    //分组模式下展开收起
    groupToggleHandle:function(idName){
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
                    let groupBy = _self.queryObj.groupByMode ||"";
                    let queryCondictionArr = _self.constructQueryCondiction() || [];
                    tool.InitInnerDataList(_self, fromType, groupID, queryCondictionArr, function(){
                        _self.$nextTick(function () {
                            target.addClass("open")
                                .siblings(".group-item-list")
                                .slideDown(500);

                              //联系人二级展开收起
                              if(!tool.isNullOrEmptyObject(_self.subGroupToggle)&& typeof(_self.subGroupToggle) == "function"){
                                _self.subGroupToggle();
                              }
                        })
                    }, '', groupBy, _self.pageType);
                }
            }
        );
    },
    //联系人展开收起
    //二级展开收起
    subGroupToggle:function(){
        let _self = this;
        $('#contactsList').off('click','.company_item_tit').on(
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
              var firstGroupID = target.closest('.contacts-list')
                              .siblings('div.date-div')
                              .find("span[data-groupid]:first")
                              .attr("data-groupid") || "";
              var fromType = "contacts";
              var subGroupID = target.find("div[data-groupid]:first").attr("data-groupid") || "";
              if (tool.isNullOrEmptyObject(firstGroupID) || tool.isNullOrEmptyObject(subGroupID)) {
                    return;
              }
              //若是展开
                if (target.hasClass("open")) {
                    target
                        .removeClass("open")
                        .siblings(".contact_list")
                        .slideUp(500, function () {
                            //清空items数据
                            $.each(_self.groupData, function (index, item) {
                                if (item.GroupID == firstGroupID) {
                                    $.each(item.items, function(i, subItem){
                                        //清空当前二级分组内部的列表数据
                                        if(subItem.AutoID == subGroupID){
                                            subItem.items = [];
                                        }
                                    })
                                }
                            })
                        });
                }else{
                    //若是收起
                    //则查询内部列表数据
                    _self.getsubList(firstGroupID, subGroupID, function(){
                        _self.$nextTick(function () {
                            target.addClass("open")
                                .siblings(".contact_list")
                                .slideDown(500);
                        });
                    });
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
          infoName:data.EnglishName||""
      };
      _self.$router.push({
          path: '/contactsinfo/' + data.AutoID,
          query: parameter
      });
    },
    //获取二级分组的内部列表
    getsubList:function(firstGroupID, subGroupID, callBack){
      let _self = this;
      if(tool.isNullOrEmptyObject(firstGroupID)||tool.isNullOrEmptyObject(subGroupID)){
        return;
      }
      //请求地址
      var urlTemp = tool.AjaxBaseUrl();
      var controlName = tool.Api_ContactsHandle_GroupInnerData;
      //传入参数
      var jsonDatasTemp = {
          CurrentLanguageVersion: lanTool.currentLanguageVersion,
          UserName: tool.UserName(),
          _ControlName: controlName,
          _RegisterCode: tool.RegisterCode(),
          QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
          GroupBy:_self.queryObj.groupByMode||"",
          PageType:_self.pageType,
          GroupID: subGroupID
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
                  console.log(tool.getMessage(data));
                  // _self.noData = true;  //二级没数据不能设置noData,不然整个列表都没，显示机器人图标
                  return;
              }
              data = data._OnlyOneData.Rows || [];

              //无数据
              if (data.length <= 0) {
                  return;
              }
              //找到对应的二级分组，往二级分组内塞列表数据
              $.each(_self.groupData, function (index, item) {
                  if (item.GroupID == firstGroupID) {
                      $.each(item.items, function(i, subItem){
                          if(subItem.AutoID == subGroupID){
                              subItem.items = data;
                          }
                      })
                  }
              });

              if (!tool.isNullOrEmptyObject(callBack) && typeof(callBack) == "function") {
                  callBack();
              }
          },
          error: function (jqXHR, type, error) {
              console.log(error);
              tool.hideLoading(loadingIndexClassName);
              return;
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
      if (to.name == 'index' || to.name == 'homesearch') {
          this.$store.commit('REMOVE_ITEM', 'contactslist');
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
