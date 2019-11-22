<template>
<div class="page">

  <div v-show="pageState == 1">
      <header class="header">
          <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
          <div class="search" @click="showSearch">
              <search-input :enableInput="false" placeholder="搜索联系人"></search-input>
          </div>
          <a class="calcfont calc-tianjia add-icon" @click="addContacts" ></a>
      </header>
      <sort :sortData="sortData"></sort>
      <!-- 列表模式   -->
      <div v-show="queryObj.groupByMode == 'List'" class="list-mode-div">
        <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

              <div v-if="listData.length > 0" class="contacts-list data-list">
                    <div v-for="(item, index) in listData" :key="item.AutoID"
                      :data-url="'/contactsinfo/' + item.AutoID"
                      class="group-item data-events-item f14">
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

                    <!-- <div v-if="group.items.length > 0" class="group-item-list contacts-list ">
                            <div v-for="companys in group.items" :key="companys.AutoID" class="company_item">
                              <div class="company_item_tit f14" >
                                  <span class="calcfont calc-gongsixinxi"></span>
                                  <div class="company_name" :data-groupid="companys.AutoID">{{companys.ShortName}}</div>
                                  <div>（{{companys.GroupRowCount}}）</div>
                              </div>
                              <div class="occupy-div"></div>

                              <div v-if="companys.items.length > 0" class="contact_list data-list">
                                    <div v-for="company in companys.items" :key="company.AutoID"
                                      :data-url="'/contactsinfo/' + company.AutoID"
                                      class="group-item data-events-item f14">
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
                    </div> -->
                </div>
          </div>
          <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
      </div>

      <!-- 侧滑筛选 -->
      <screen :screenData="RightPanelModel"></screen>
  </div>

  <!-- 页面处于搜索状态 -->
  <div v-show="pageState == 2">
      <search-module module="contacts" ref="searchModule"></search-module>
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
export default {
  name:'contactslist',
  components: {
        SearchInput,Sort,Screen,SearchModule,
        'vue-scroll': Scroll,
        nothing: Nothing
  },
  data(){
    return{
        pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
        sortData:[{
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
            sortOrder:'desc'
          },{
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
            sortOrder:'desc'
          }],
        noData: false, //没数据
        pageSize: 10, //一页显示多少记录
        pageNum: 1, //当前页码
        sortObj:{
          sortName:"",//排序名称
          sortOrder:""//排序方向
        },
        //查询对象
        queryObj:{
          dataFilter:"",//数据筛选模式,
          groupByMode:"List1",//分组模式,
          viewMode:"",//视图模式
          queryCondictionArr:[],//自定义查询条件
        },
        pageType:1,//0:Organizations;1:Contacts
        //列表模式数据
        listData:[{
            "AutoID": 1178,
            "EnglishName": "Alex Pang",
            "Title": "Cisco Gold Certified Partner",
            "Email": "alex_pang@macroview.com",
            "TelPhone": "+852 3529 5587",
            "DepartmentName": "Cisco Master Collaboration Specialization",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1343,
            "EnglishName": "Alvin Chun",
            "Title": "",
            "Email": "alvin_chun@macroview.com",
            "TelPhone": "35295459",
            "DepartmentName": "Solution and Service Architect",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1176,
            "EnglishName": "Michael Yan",
            "Title": "甄文達",
            "Email": "michael_yan@macroview.com",
            "TelPhone": "+852 3529 7471",
            "DepartmentName": "Cisco Master Collaboration Specialization",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1177,
            "EnglishName": "Samson choi",
            "Title": "Cisco Gold Certified Parmer",
            "Email": "samson_choi@macroview.com",
            "TelPhone": "+852 3529 3804",
            "DepartmentName": "CISA,CISSP",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1342,
            "EnglishName": "Selina Wong",
            "Title": "associate Service Architect",
            "Email": "selina_wong@macroview.com",
            "TelPhone": "35295337",
            "DepartmentName": "",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1173,
            "EnglishName": "黃俊華",
            "Title": "Senior Manager",
            "Email": "dennis_wong@macroview.com",
            "TelPhone": "+852 2903 7329",
            "DepartmentName": "",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1174,
            "EnglishName": "余亮生",
            "Title": "account manager",
            "Email": "nelson_yu@macroview.com",
            "TelPhone": "+852 3529 5585",
            "DepartmentName": "sales",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1175,
            "EnglishName": "周健友",
            "Title": "Technical Manager",
            "Email": "philip_chow@macroview.com",
            "TelPhone": "+852 2903 7350",
            "DepartmentName": "TS-Network Infrastructure Solutions",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }],
        //分组模式数据
        groupData:[{
              "GroupName": "Other",
              "GroupID": 213,
              "GroupRowCount": 318,
              "InternalSort": 1
            }, {
              "GroupName": "Airline",
              "GroupID": 209,
              "GroupRowCount": 108,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Bank",
              "GroupID": 172,
              "GroupRowCount": 32,
              "InternalSort": 99
            }, {
              "GroupName": "OEM_Aircraft",
              "GroupID": 173,
              "GroupRowCount": 26,
              "InternalSort": 99
            }, {
              "GroupName": "Legal Entity(SPV)",
              "GroupID": 171,
              "GroupRowCount": 19,
              "InternalSort": 99
            }, {
              "GroupName": "Financiers",
              "GroupID": 248,
              "GroupRowCount": 6,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Investment/Investment Bank",
              "GroupID": 217,
              "GroupRowCount": 5,
              "InternalSort": 99
            }, {
              "GroupName": "MRO_Airframe",
              "GroupID": 230,
              "GroupRowCount": 5,
              "InternalSort": 99
            }, {
              "GroupName": "Vendor",
              "GroupID": 16,
              "GroupRowCount": 5,
              "InternalSort": 99
            }, {
              "GroupName": "Lessee",
              "GroupID": 15,
              "GroupRowCount": 4,
              "InternalSort": 99
            }, {
              "GroupName": "Government_Chamber of Commerce",
              "GroupID": 228,
              "GroupRowCount": 2,
              "InternalSort": 99
            }, {
              "GroupName": "MRO_Engin",
              "GroupID": 229,
              "GroupRowCount": 2,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institution_Media",
              "GroupID": 226,
              "GroupRowCount": 2,
              "InternalSort": 99
            }, {
              "GroupName": "OEM_BFE",
              "GroupID": 219,
              "GroupRowCount": 1,
              "InternalSort": 99
            }, {
              "GroupName": "OEM_Engin",
              "GroupID": 218,
              "GroupRowCount": 1,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institution_Evaluation",
              "GroupID": 223,
              "GroupRowCount": 1,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institutions_Aerospace Industry Professional Institutions",
              "GroupID": 225,
              "GroupRowCount": 1,
              "InternalSort": 99
            }, {
              "GroupName": "Transportation",
              "GroupID": 215,
              "GroupRowCount": 1,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Asset Management",
              "GroupID": 216,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Funds/Securities/Trust Companies",
              "GroupID": 175,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Guarantee Corporation",
              "GroupID": 178,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Insurance",
              "GroupID": 212,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Financial_Mortgage",
              "GroupID": 179,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Financier_Other",
              "GroupID": 211,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Government_Airworthiness Authorities",
              "GroupID": 177,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Government_Government Department",
              "GroupID": 227,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Operator",
              "GroupID": 174,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institution_Law Firm",
              "GroupID": 220,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institution_Rating Company",
              "GroupID": 224,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institution_Technical",
              "GroupID": 214,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institutions_3rd Party Managed",
              "GroupID": 210,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institutions_Accounting Office/Audit/Tax",
              "GroupID": 221,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Professional Institutions_Consultant/Consulting",
              "GroupID": 222,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Remarketing_Overseas",
              "GroupID": 233,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Remarketing_PRC",
              "GroupID": 234,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Shareholder Unit_Ari Shareholder Unit",
              "GroupID": 231,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Shareholder Unit_Calc Shareholder Unit",
              "GroupID": 176,
              "GroupRowCount": 0,
              "InternalSort": 99
            }, {
              "GroupName": "Shareholder Unit_Other",
              "GroupID": 232,
              "GroupRowCount": 0,
              "InternalSort": 99
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
                fieldControlType: "picker",
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
            }]
        },

    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'contactslist');
  },
  mounted(){
      let _self = this;
      _self.groupToggleHandle('contactsList');
  },
  activated(){

  },
  methods:{
    //返回上一页
    back(){
        var $this = this;
        $this.$router.back(-1);
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
        /*
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
        */
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
                /*
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
                */
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

    //点击头部搜索
    showSearch(){
        let _self = this;
        _self.pageState = 2;
        //给搜索框获取焦点
        $('#searchHeader').find('input.search-input').focus();
        // console.log($('#searchHeader').find('input.search-input'));

        //获取搜索历史数据
        _self.$refs.searchModule.getHistory();
    },

    //接收搜索的值并刷新列表,str有可能为空  (专门处理搜索)
    refreshListBySearchValue(str){
        let _self = this;
        _self.pageState = 1;

    }

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
  position:fixed;
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
