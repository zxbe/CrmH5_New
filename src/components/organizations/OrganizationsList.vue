<template>
<div class="page">
  <div v-show="pageState == 1">
  <!-- <div class="mainModule show"> -->
      <header class="header sticky">
          <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
          <div class="search" @click="showSearch">
              <search-input :enableInput="false" :isShowClearIcon="true" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
          </div>
          <a class="calcfont calc-tianjia add-icon" @click="addOrganization" ></a>
      </header>

      <sort :sortData="sortData" :sortObj="sortObj" ref="sort"></sort>

      <!-- 列表模式   -->
      <div class="list-mode-div" v-if="queryObj.groupByMode == 'List'">
        <vue-scroll v-show="!noData" :showToTop="true" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
            <div v-if="listData !=null && listData != undefined && listData.length > 0" class="organizations-list list-module-list">
              <div v-for="item in listData" :key="item.AutoID"
              class="group-item data-events-item"  @click="goInfo(item)">
                    <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID" @click.stop="followToggle($event)"></div>
                    <div class="item-block f14">
                        <div class="item-div item-first-div">
                          <span class="short-name">{{item.ShortName}}</span>
                          <span class="icao-code f12">{{item.ICAOCode}}</span>
                        </div>
                        <div class="item-div">
                          <div class="left-text" v-show="(item.BusinessType =='' || item.BusinessType == null) ? false : true">
                            <i class="calcfont icon calc-yewu"></i><span >{{item.BusinessType}}</span>
                          </div>
                          <div class="right-text" v-show="(item.AccountManager =='' || item.AccountManager == null) ? false : true">
                            <i class="calcfont icon calc-chengshijingli"></i><span>{{item.AccountManager}}</span>
                          </div>
                        </div>
                        <div class="item-div">
                          <div class="left-text" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                            <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                          </div>
                          <div class="right-text" v-show="(item.CityName =='' || item.CityName == null) ? false : true">
                            <i class="calcfont icon calc-diqiuquanqiu"></i><span>{{item.CityName}}</span>
                          </div>
                        </div>
                    </div>
              </div>
        </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
      </div>

      <!-- 分组模式   -->
      <div class="group-mode-div" v-if="queryObj.groupByMode != 'List'">
          <div v-show="!noData" id="organizationsList" data-fromtype="organizations">
                <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                    <div class="date-div">
                        <span class="calcfont calc-business"></span>
                        <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                        <span class="right">（{{group.GroupRowCount}}）</span>
                    </div>
                    <div class="occupy-div"></div>
                    <div v-if="group.items != null && group.items != undefined &&  group.items.length >= 1" class="group-item-list organizations-list">
                          <div v-for="item in group.items" :key="item.AutoID"
                          class="group-item data-events-item" @click="goInfo(item)">
                                <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID" @click.stop="followToggle($event)"></div>
                                <div class="item-block f14">
                                    <div class="item-div item-first-div">
                                      <span class="short-name">{{item.ShortName}}</span>
                                      <span class="icao-code f12">{{item.ICAOCode}}</span>
                                    </div>
                                    <div class="item-div">
                                      <div class="left-text" v-show="(item.BusinessType =='' || item.BusinessType == null) ? false : true">
                                        <i class="calcfont icon calc-yewu"></i><span >{{item.BusinessType}}</span>
                                      </div>
                                      <div class="right-text" v-show="(item.AccountManager =='' || item.AccountManager == null) ? false : true">
                                        <i class="calcfont icon calc-chengshijingli"></i><span>{{item.AccountManager}}</span>
                                      </div>
                                    </div>
                                    <div class="item-div">
                                      <div class="left-text" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                                        <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                                      </div>
                                      <div class="right-text" v-show="(item.CityName =='' || item.CityName == null) ? false : true">
                                        <i class="calcfont icon calc-diqiuquanqiu"></i><span>{{item.CityName}}</span>
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
  <!-- <div class="otherModule hide"> -->
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
  name:'organizationslist',
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
        sortData:[
          {
            sortName:"AddTime",
            sortText:lanTool.lanContent("1000536_按创建时间排序"),
            sortOrder:'desc',
            sort:5,
            isActive:true
          },
          {
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000518_按公司名称排序"),
            sortOrder:'',
            sort:10
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类排序"),
            sortOrder:'',
            sort:30
          },{
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000522_按国家排序"),
            sortOrder:'',
            sort:50
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
                      text:lanTool.lanContent("1000550_我关注的"),
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
                      text:lanTool.lanContent("1007_业务分类"),
                      sort:20
                    }
                ]
            },
            "FieldModel":[{
                queryfield: "BusinessType",
                text: lanTool.lanContent("1007_业务分类"),
                fieldControlType: "picketTile",//下拉选项以磁贴的方式展示的控件
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryComparison: "=",
                Code: "DropDowList_BusinessType",
                TypeValue: "organization",
                datalanid: "1007_业务分类",
                option:[],
                more:true  //picker中是否提供显示更多功能
            },
            {
                queryfield: "CountryID",
                text: lanTool.lanContent("701_国家"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCountryInf",
                TypeValue: "",
                selectType: "radio",
                // clickObj: "CountryIDClickObj",
                datalanid: "1000526_请选择",
                resulteRow: true,
                iconClass:'calc-nationaarea'
              },
              {
                queryfield: "CityID",
                text: lanTool.lanContent("702_城市"),
                fieldControlType: "linkSelectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCountryCity",
                TypeValue: "",
                selectType: "radio",
                datalanid: "1000526_请选择",
                iconClass:'calc-diqiuquanqiu'
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
          autoValue:""//模糊查询值
        },
        pageType:0,//0:Organizations;1:Contacts
        //列表数据(分组模式为List)
        listData:[],
        //分组数据(分组模式为非List)
        groupData:[],
        lanSearchModuleInputPlaceHolder:lanTool.lanContent("1000556_名称/业务分类/国家/城市"),
        searchModuleFromType:"7" //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
    }
  },
  watch:{
      //监听分组模式和列表模式的变化
     'queryObj.groupByMode':function(newValue,oldValue){
        // console.log(oldValue);
        // console.log(newValue);
        if(tool.isNullOrEmptyObject(newValue)){
          return;
        }

        let _self = this;
        newValue = newValue.toLowerCase();
        if(newValue != "list"){
            //分组模式事件绑定
            _self.$nextTick(function(){
              _self.groupToggleHandle('organizationsList');
            });
        }
     }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'organizationslist');

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
      ////分组模式事件绑定
      //_self.groupToggleHandle('organizationsList');
  },
  activated(){
    let _self = this;
    var isShowPanel =
    (_self.$refs.screen.showPanel == null || _self.$refs.screen.showPanel == undefined)
    ? false
    : _self.$refs.screen.showPanel;

    //若侧滑是展开的，则给body添加hideOverflow样式
    if(isShowPanel){
      $("body").addClass("hideOverflow");
    }else{
      //若侧滑是收起的，移除body的hideOverflow样式
      $("body").removeClass("hideOverflow");
    }
  },
  methods:{
    //返回上一页
    back(){
        var $this = this;
        $this.$router.back(-1);
    },
    //添加公司
    addOrganization(){
        let _self = this;
        _self.$router.push({
            path: '/organizationsinfo/-1'
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
              //列表回到顶部
              _self.$refs.scroll.goTopping();
              //重置上拉加载
              _self.$refs.scroll.resetPullUp();
          });
        }else{

          //非列表模式下把头部输入框清空
          _self.$refs.searchInput.searchValue = "";
          _self.$refs.searchModule.$refs.searchInput.searchValue = '';

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
            PageType:_self.pageType,
            AutoValue:_self.queryObj.autoValue||""
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

                //重新计算 better-scroll,当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
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
          infoName:data.ShortName
      };
      _self.$router.push({
          path: '/organizationsinfo/' + data.AutoID,
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
        var _self = this;
        $("#"+ idName ).off("click", "div.date-div").on(
            "click",
            "div.date-div",
            function (event) {
              console.log("click");
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
                          //  console.log(_self.groupData);
                            target.addClass("open")
                                .siblings(".group-item-list")
                                .slideDown(500);
                        });
                    }, '', groupBy, _self.pageType);
                }
            }
        );

    },
    //处理右侧字段联动
    rightPanelLinkageField(vueObj){
        tool.linkageField(vueObj, 'CountryID', 'CityID');
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
            _self.$refs.searchModule.$refs.searchInput.$refs.curInput.click();
         });
    },
    //是否显示主模块
    ModuleDsiplayAction:function(isShowMainModule){
      isShowMainModule = (isShowMainModule == null || isShowMainModule == undefined)?true:isShowMainModule;
      if(isShowMainModule){
        $(".mainModule").removeClass("hide").addClass("show");
        $(".otherModule").removeClass("show").addClass("hide");
      }else{
        $(".mainModule").removeClass("show").addClass("hide");
        $(".otherModule").removeClass("hide").addClass("show");
      }
    },
    //input查询框,点击搜索/回车键执行的查询
    //接收搜索的值并刷新列表
    //str有可能为空(专门处理搜索)
    refreshListBySearchValue(str,callBack){
      let _self = this;
      str = (str ||"").trim();
      _self.pageState = 1;
      // _self.ModuleDsiplayAction(true);
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
            this.$store.commit('REMOVE_ITEM', 'organizationslist');
        }

        //移除body的hideOverflow样式
        $("body").removeClass("hideOverflow");

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


/* .p-sort{position:fixed;left:0;right:0;top:0.88rem;} */

/*列表*/
.list-mode-div{
  position: fixed;
  left:0;right:0;bottom:0;
  top:calc(0.88rem + 0.88rem);
}


/*分组模式*/
.group-mode-div{
  padding-top:calc(0.88rem + 0.88rem);
}

</style>
