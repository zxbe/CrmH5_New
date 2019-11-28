<template>
<div class="page">
  <div v-show="pageState == 1">
      <header class="header sticky">
          <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
          <div class="search" @click="showSearch">
              <search-input :enableInput="false" :isShowClearIcon="true" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
          </div>
          <a class="add-icon"></a>
      </header>

      <sort :sortData="sortData" :sortObj="sortObj" ref="sort"></sort>

      <!-- 列表模式   -->
      <div class="pageContent">
          <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
              <ul class="dataList" :key="item.AutoID" v-for="item in userDataList">
                  <li>
                      <a class="userMessage" @click="goUserInfoPage(item)">
                          <div class="headImg"><img src="../../assets/images/default_user_img.png" alt=""></div>
                          <h4>
                              <div class="userName">{{item.Realname}}</div>
                          </h4>
                          <div class="position" ><span class="positionIcon calcfont" :class="[item.PositionID !='' ? 'calc-zhiwei' : '']"></span>{{item.PositionID}}</div>
                          <div class="department" ><span class="departmentIcon calcfont" :class="[item.DepartmentID !='' ? 'calc-zuzhibumen' : '']"></span>{{item.DepartmentID}}</div>
                          <div>
                              <span :class="[item.Email !='' ? 'calc-youxiang' : '']" class="userEmail pullLeft calcfont">{{item.Email}}</span>
                          </div>
                          <div>
                              <span :class="[item.Phone !='' ? 'calc-phone' : '']" class="userPhone pullRight calcfont">{{item.Phone}}</span>
                          </div>
                      </a>
                  </li>
              </ul>
          </vue-scroll>
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

// import Listrightpanel from "@/components/customPlugin/Listrightpanel";
// import Nothing from "@/components/customPlugin/Nothing";
export default {
    name: 'userEvents',
    components: {
        SearchInput,Sort,Screen,SearchModule,
        'vue-scroll': Scroll,
        nothing: Nothing
    },
    data() {
        return {
            pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
            searchValue:'', //搜索框的值
            //排序模型
            sortData:[{
                sortName:"ShortName",
                sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
                sortOrder:'asc',
                sort:10,
                isActive:true
              },{
                sortName:"ShortName",
                sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
                sortOrder:'desc',
                sort:20
              },
              {
                sortName:"BusinessType",
                sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
                sortOrder:'asc',
                sort:30
              },{
                sortName:"BusinessType",
                sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
                sortOrder:'desc',
                sort:40
              },{
                sortName:"CountryName",
                sortText:lanTool.lanContent("1000522_按国家正序排序"),
                sortOrder:'asc',
                sort:50
              },{
                sortName:"CountryName",
                sortText:lanTool.lanContent("1000523_按国家倒序排序"),
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
                    Code: "DropDowList_ViewBaseAllTypes",
                    TypeValue: "Companybusinesstype",
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

            title: lanTool.lanContent("1000304_用户活动"),
            // queryCondictionData: [], //综合查询条件
            userDataList: [],
            lanSearchModuleInputPlaceHolder:lanTool.lanContent("1000304_用户活动"),
            searchModuleFromType:"11" //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；

        }
    },
    created: function () {
        var _self = this;
        //清空右侧筛选数据
        eventBus.queryCondictionData = null;
        _self.$store.commit('SET_ITEM', 'userEvents');
    },
    mounted: function () {
        this.queryList('',function(){});
    },
    activated: function () {
        var _self = this;
        _self.queryCondictionData = eventBus.queryCondictionData;
        //获取是否是从搜索页面点击确定按钮返回来的标志
        var fromSearchBtn = eventBus.fromSearchBtn || false;
        eventBus.fromSearchBtn = false;
        if (fromSearchBtn) {
            _self.queryList('',function(){});
        }
    },
    methods: {
        //返回上一步
        back: function () {
            this.$router.back(-1);
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
                  tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length);
              }
            });
        },
        //跳转到用户详情
        goUserInfoPage: function (item) {
            var _self = this;
            if(tool.isNullOrEmptyObject(item.AutoID)){
                return;
            }
            var url = "/userEventsInfo/" + item.AutoID;
            var infoName = item.Realname || '';
            _self.$router.push({
                path: url,
                query: {
                        infoName: infoName
                    }
            });
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
            var controlName = tool.Api_BaseUserBaseInfHandle_QueryNew;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                SortName:"",
                SortOrder:"",
                QueryCondiction: JSON.stringify(_self.queryCondictionData || [])
            };
            console.log(jsonDatasTemp);
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
                        _self.userDataList = _self.userDataList.concat(data);
                    }else{
                        _self.userDataList = data;
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
        pulldown: function () {
            console.log("下拉");
            let _self = this;
            _self.queryList('pushRefresh', function () {
                // _self.$refs.scroll.refresh();
            });
        },
        //上拉
        pullup: function () {
            console.log("上拉");
            let _self = this;
            _self.queryList('pushLoad', function (data, pageSize) {

                if (data.length < pageSize) {
                    _self.$refs.scroll.pullupEnd();
                }
            });
        },
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'userEvents');
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



.pageContent {
    position: fixed;
    top:calc(0.88rem + 0.7rem);
    bottom: 0px;
    left: 0;
    right: 0;
}

.pageContent .userMessage {
    position: relative;
    display: block;
    padding: 0.2rem;
    /* height: auto; */
    border-bottom: 1px solid beige;
    height: 1.56rem;
}
ul li{
  list-style-type: none;
}
.pageContent .userMessage .calcfont.calc-youxiang,.pageContent .userMessage .calcfont.calc-phone{
    padding: 0.3rem 0.1rem 0.1rem 0.1rem;
    font-size: 0.28rem;
    /* width: calc(50% - 0.4rem); */
    /* max-width: 50%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pageContent .userMessage .calcfont.calc-youxiang{
  max-width: calc(60% - 0.4rem);
}
.pageContent .userMessage .calcfont.calc-phone{
   max-width: calc(40% - 0.4rem);
}
.headImg {
    float: left;
    height: 1rem;
    width: 1rem;
}

.headImg img {
    width: 100%;
    height: 100%;
}

.userMessage .userName {
    font-size: 0.28rem;
    padding-left: 0.2rem;
    padding-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.position {
    font-size: 0.24rem;
    padding-left: 10px;
    /* padding-top: 0.1rem; */
    color: #888888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.departmentIcon,
.positionIcon{
    font-size: 0.25rem;
    padding-right: 2px;
}
.department{
    font-size: 0.24rem;
    padding-left: 10px;
    /* padding-top: 0.1rem; */
    color: #888888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.department::after{

}
.pullLeft {
    clear: left;
    float: left;
}

.pullRight {
    float: right;
}

.userEmail,
.userPhone {
    padding-top: 0.3rem;
    font-size: 13px;
}
</style>
