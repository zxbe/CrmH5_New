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

          <!-- 列表模式   -->
          <!-- v-show="queryObj.groupByMode == 'List'" -->
          <div class="list-mode-div" >
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
export default {
  name:'meetinglist',
  mixins:[Mixins],
  components: {
        SearchInput,Sort,Screen,SearchModule,
        'vue-scroll': Scroll,
        nothing: Nothing
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
                      id:"date",
                      text:lanTool.lanContent("907_日期"),
                      sort:10,
                      isActive:true
                    },{
                      id:"popedomTeamInf",
                      text:lanTool.lanContent("769_业务组"),
                      sort:20
                    }
                ]
            },
            "FieldModel":[{
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
          groupByMode:"List",//分组模式,
          viewMode:"",//视图模式
          queryCondictionArr:[],//自定义查询条件
        },
        pageType:0,//0:Organizations;1:Contacts
        //列表数据(分组模式为List)
        listData:[],
        //分组数据(分组模式为非List)
        groupData:[]
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'meetinglist');
  },
  mounted(){
      let _self = this;
      _self.watchScroll();
      //分组模式事件绑定
      _self.groupToggleHandle('organizationsList');
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

    //接收搜索的值并刷新列表,str有可能为空  (专门处理搜索)
    refreshListBySearchValue(str){
        let _self = this;
        _self.pageState = 1;
        if( !tool.isNullOrEmptyObject(str)){
            _self.searchValue = str;
        }
        console.log(_self.searchValue);
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
.group-mode-div{
  padding-top:calc(0.88rem + 0.7rem);
}
</style>

