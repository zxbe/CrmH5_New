<template>
<div class="page">

  <header class="header">
      <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
      <search-input class="search" placeholder="搜索公司"></search-input>
      <a class="calcfont calc-tianjia add-icon" @click="addOrganization" ></a>
  </header>

  <sort :sortData="sortData" :sortObj="sortObj"></sort>

  <!-- 列表模式   -->
  <div class="list-mode-div" v-show="queryObj.groupByMode == 'List'">
    <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
        <div v-if="listData.length > 0" class=" organizations-list">
          <div v-for="item in listData" :key="item.AutoID"
          class="group-item data-events-item"
          :data-url="'/organizationsinfo/' + item.AutoID">
                <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
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
  <div class="group-mode-div" v-show="queryObj.groupByMode != 'List'">
        <div v-show="!noData" id="organizationsList" data-fromtype="organizations">
            <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                <div class="date-div">
                    <span class="calcfont calc-business"></span>
                    <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                    <span class="right">（{{group.GroupRowCount}}）</span>
                </div>
                <div class="occupy-div"></div>

                <!-- <div v-if="group.items.length > 0" class="group-item-list organizations-list">
                      <div v-for="item in group.items" :key="item.AutoID"
                      class="group-item data-events-item"
                      :data-url="'/organizationsinfo/' + item.AutoID">
                            <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
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
                </div> -->
          </div>
      </div>
      <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
  </div>


  <!-- 侧滑筛选 -->
  <screen :screenData="RightPanelModel" :queryObj="queryObj"></screen>

</div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
import Sort from "@/components/customPlugin/Sort"
import Screen from "@/components/customPlugin/Screen"
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";
export default {
  name:'organizationslist',
  components: {
        SearchInput,Sort,Screen,
        'vue-scroll': Scroll,
        nothing: Nothing
  },
  data(){
    return{
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
            },{
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
                datalanid: "701_国家",
                resulteRow: true,
              },
              {
                queryfield: "CityID",
                text: lanTool.lanContent("702_城市"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCountryCity",
                TypeValue: "",
                selectType: "radio",
                datalanid: "702_城市"
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
        pageType:0,//0:Organizations;1:Contacts
        //列表数据(分组模式为List)
        listData:[
          // {
          //   "AutoID": 487,
          //   "ShortName": "OEINC",
          //   "ICAOCode": "",
          //   "BusinessType": "OEM_Aircraft",
          //   "AccountManager": "",
          //   "CountryName": "China",
          //   "CityName": "ShangHai",
          //   "GroupID": 173,
          //   "IsFollow": "calc-noshoucang",
          //   "GroupRowCount": 1
          // }
          ],
        //分组数据(分组模式为非List)
        groupData:[{
              "GroupName": "Other",
              "GroupID": 213,
              "GroupRowCount": 653
            }, {
              "GroupName": "Airline",
              "GroupID": 209,
              "GroupRowCount": 617
            }, {
              "GroupName": "Legal Entity(SPV)",
              "GroupID": 171,
              "GroupRowCount": 391
            }, {
              "GroupName": "Financial_Bank",
              "GroupID": 172,
              "GroupRowCount": 174
            }, {
              "GroupName": "Financial_Funds/Securities/Trust Companies",
              "GroupID": 175,
              "GroupRowCount": 10
            }, {
              "GroupName": "Financial_Investment/Investment Bank",
              "GroupID": 217,
              "GroupRowCount": 9
            }, {
              "GroupName": "OEM_Aircraft",
              "GroupID": 173,
              "GroupRowCount": 9
            }, {
              "GroupName": "Professional Institution_Rating Company",
              "GroupID": 224,
              "GroupRowCount": 6
            }, {
              "GroupName": "Financiers",
              "GroupID": 248,
              "GroupRowCount": 5
            }, {
              "GroupName": "MRO_Airframe",
              "GroupID": 230,
              "GroupRowCount": 5
            }, {
              "GroupName": "Vendor",
              "GroupID": 16,
              "GroupRowCount": 5
            }, {
              "GroupName": "Government_Government Department",
              "GroupID": 227,
              "GroupRowCount": 4
            }, {
              "GroupName": "OEM_Engin",
              "GroupID": 218,
              "GroupRowCount": 4
            }, {
              "GroupName": "Financial_Asset Management",
              "GroupID": 216,
              "GroupRowCount": 3
            }, {
              "GroupName": "MRO_Engin",
              "GroupID": 229,
              "GroupRowCount": 3
            }, {
              "GroupName": "Government_Chamber of Commerce",
              "GroupID": 228,
              "GroupRowCount": 2
            }, {
              "GroupName": "Lessee",
              "GroupID": 15,
              "GroupRowCount": 2
            }, {
              "GroupName": "Professional Institution_Media",
              "GroupID": 226,
              "GroupRowCount": 2
            }, {
              "GroupName": "Government_Airworthiness Authorities",
              "GroupID": 177,
              "GroupRowCount": 1
            }, {
              "GroupName": "OEM_BFE",
              "GroupID": 219,
              "GroupRowCount": 1
            }, {
              "GroupName": "Professional Institution_Evaluation",
              "GroupID": 223,
              "GroupRowCount": 1
            }, {
              "GroupName": "Professional Institutions_Aerospace Industry Professional Institutions",
              "GroupID": 225,
              "GroupRowCount": 1
            }, {
              "GroupName": "Professional Institutions_Consultant/Consulting",
              "GroupID": 222,
              "GroupRowCount": 0
            }, {
              "GroupName": "Shareholder Unit_Calc Shareholder Unit",
              "GroupID": 176,
              "GroupRowCount": 1
            }, {
              "GroupName": "Transportation",
              "GroupID": 215,
              "GroupRowCount": 1
            }, {
              "GroupName": "Financial_Guarantee Corporation",
              "GroupID": 178,
              "GroupRowCount": 0
            }, {
              "GroupName": "Financial_Insurance",
              "GroupID": 212,
              "GroupRowCount": 0
            }, {
              "GroupName": "Financial_Mortgage",
              "GroupID": 179,
              "GroupRowCount": 0
            }, {
              "GroupName": "Financier_Other",
              "GroupID": 211,
              "GroupRowCount": 0
            }, {
              "GroupName": "Operator",
              "GroupID": 174,
              "GroupRowCount": 0
            }, {
              "GroupName": "Professional Institution_Law Firm",
              "GroupID": 220,
              "GroupRowCount": 0
            }, {
              "GroupName": "Professional Institution_Technical",
              "GroupID": 214,
              "GroupRowCount": 0
            }, {
              "GroupName": "Professional Institutions_3rd Party Managed",
              "GroupID": 210,
              "GroupRowCount": 0
            }, {
              "GroupName": "Professional Institutions_Accounting Office/Audit/Tax",
              "GroupID": 221,
              "GroupRowCount": 0
            }, {
              "GroupName": "Remarketing_Overseas",
              "GroupID": 233,
              "GroupRowCount": 0
            }, {
              "GroupName": "Remarketing_PRC",
              "GroupID": 234,
              "GroupRowCount": 0
            }, {
              "GroupName": "Shareholder Unit_Ari Shareholder Unit",
              "GroupID": 231,
              "GroupRowCount": 0
            }, {
              "GroupName": "Shareholder Unit_Other",
              "GroupID": 232,
              "GroupRowCount": 0
            }]
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'organizationslist');
  },
  mounted(){
      let _self = this;
      //分组模式事件绑定
      _self.groupToggleHandle('organizationsList');
  },
  activated(){

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
          });
        }else{
          //查询分组数据
          _self.queryGroup();
        }
      });

    },
    //合并综合查询条件
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
    //分组数据查询
    queryGroup:function(){
      return;
      let _self = this;
        //api接口地址
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_OrganizationsHandle_Group;

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

                // //没有数据
                // if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                //     _self.noData = true;
                //     return ;
                // }

                // _self.noData = false;
                // if(queryType == 'pushLoad'){
                //     _self.listData = _self.listData.concat(data);
                // }else{
                //     _self.listData = data;
                // }

                // if(queryType == undefined || queryType == ''){
                //     _self.$refs.scroll.isPullingDown = true;
                //     _self.$refs.scroll.isPullingUpEnd = false;
                //     _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                // }
                // _self.$refs.scroll.refresh();

                // if(!tool.isNullOrEmptyObject(callback)){
                //   callback(data,_self.pageSize);
                // }
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
    //头部搜索，提供给SearchInput子组件调用的
    search(str){
        console.log(str);
    },

    //分组模式下展开收起
    groupToggleHandle:function( idName ){
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
                    /*
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
                            //联系人二级展开收起
                            if(!tool.isNullOrEmptyObject(_self.contactsToggle)){
                              _self.contactsToggle();
                            }
                            //分组模式会议 二级展开收起
                            if(!tool.isNullOrEmptyObject(_self.meetingToggle)){
                              _self.meetingToggle();
                            }
                        })
                    }, '', groupBy, _self.showPage);
                    */
                }
            }
        );

    },




  },
  beforeRouteLeave: function (to, from, next) {
        if (to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'organizationslist');
        }
        next();
    }
}
</script>

<style scoped>
.page{
    /*display: flex;flex-direction: column;justify-content: center;height: 100vh;*/
  }
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  position:fixed;
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
  top:calc(0.88rem + 0.7rem);
}


/*分组模式*/
.group-mode-div{
  padding-top:calc(0.88rem + 0.7rem);
}

</style>
