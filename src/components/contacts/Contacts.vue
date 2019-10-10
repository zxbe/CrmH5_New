<template>
<div>
    <Header class="header sticky" :title="title"></Header>

    <div id="page-content" class="page-content">
        <div class="nav sticky">
            <div id="companySwitchPage" @click="switchPage(0,$event)" class="nav-item f16 active-item lanText" data-lanid="790_公司"></div>
            <div id="contactSwitchPage" @click="switchPage(1,$event)" class="nav-item f16 lanText" data-lanid="791_联系人"></div>
            <div class="nav-border"></div>
        </div>

        <div v-show="showPage == 0" class="pageList">
            <div class="add-btn-div">
                <router-link to="/organizationsinfo/-1" class="add-div">
                    <span class="calcfont calc-add"></span>
                    <span class="add-text lanText" data-lanid="792_添加公司"></span>
                </router-link>
            </div>
            <!-- 列表 -->
            <div v-show="!noData" id="organizationsList" data-fromtype="organizations">
                  <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                      <div class="date-div">
                          <span class="calcfont calc-business"></span>
                          <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                          <span class="right">（{{group.GroupRowCount}}）</span>
                      </div>
                      <div class="occupy-div"></div>

                      <div v-if="group.items.length > 0" class="group-item-list organizations-list">
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

                      </div>
                </div>
            </div>
            <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
        </div>

        <div v-show="showPage == 1" class="pageList">
            <div class="add-btn-div">
                <router-link to="/contactsinfo/-1" class="add-div">
                    <span class="calcfont calc-add"></span>
                    <span class="add-text lanText" data-lanid="793_添加联系人"></span>
                </router-link>
            </div>
            <!-- 列表 -->
            <div v-show="!noData" id="contactsList" data-fromtype="organizations">
                  <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                      <div class="date-div">
                          <span class="calcfont calc-business"></span>
                          <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                          <span class="right">（{{group.GroupRowCount}}）</span>
                      </div>
                      <div class="occupy-div"></div>

                      <div v-if="group.items.length > 0" class="group-item-list contacts-list ">
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
                                            <!-- <div class="item-user-icon calcfont calc-fuzeren1" :data-autoid="company.AutoID"></div> -->
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
                                                    <!-- <div class="item-div">{{company.BusinessType}},{{company.DepartmentName}}</div> -->
                                            </div>
                                      </div>
                                </div>
                          </div>
                      </div>
                  </div>


            </div>
            <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
        </div>
    </div>

    <!--  右侧侧滑 -->
    <list-right-panel ref="rightPanel" :panelData="rigthPanelData" :searchData="searchData"></list-right-panel>
</div>
</template>

<script>
import Header from "@/components/customPlugin/Listheader";
import Listrightpanel from "@/components/customPlugin/Listrightpanel";
import Nothing from "@/components/customPlugin/Nothing";
import Mixins from '@/mixins/commonlist.js'

export default {
    name:'contacts',
    mixins:[Mixins],
    components: {
        Header: Header,
        "list-right-panel": Listrightpanel,
        nothing: Nothing
    },
    data() {
        return {
            title: lanTool.lanContent("791_联系人"),
            //侧滑数据模型
            rigthPanelData: [{
                groupText: lanTool.lanContent("794_数据筛选"),
                groupName: 'dataFilter',
                type: "radio",
                default: "allData",
                items: [{
                        text: lanTool.lanContent("795_全部"),
                        queryfield: "allData",
                        queryType: "string",
                        queryFormat: "",
                        queryRelation: "and",
                        queryValue: "",
                        queryComparison: "="
                    },
                    {
                        text: lanTool.lanContent("796_关注的公司"),
                        queryfield: "MyFollowData",
                        queryType: "string",
                        queryFormat: "",
                        queryRelation: "and",
                        queryValue: "",
                        queryComparison: "="
                    }
                ]
            }],
            //搜索页面数据模型
            searchData: {},
            OrganizationsSearch: [{
                    queryfield: "ShortNameEN",
                    text: lanTool.lanContent("733_英文名称"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "ShortNameCN",
                    text: lanTool.lanContent("32_中文名称"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
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
                    datalanid: "1007_业务分类"
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
                    resulteRow: true,
                    clickObj: "CountryIDClickObj",
                    datalanid: "701_国家"
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
                },
                {
                    queryfield: "AccountManager",
                    text: lanTool.lanContent("785_客户经理"),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_AccountManager",
                    TypeValue: "",
                    selectType: "radio",
                    datalanid: "785_客户经理"
                }
            ],
            ContactsSearch: [{
                    queryfield: "ShortNameEN",
                    text: lanTool.lanContent("726_公司名称"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
				{
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
                    datalanid: "1007_业务分类"
                },
                {
                    queryfield: "EnglishName",
                    text: lanTool.lanContent("848_姓名"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "Initiator",
                    text: lanTool.lanContent("825_负责人"),
                    fieldControlType: "groupSelectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_PopedomTeamVsUser",
                    TypeValue: "",
                    selectType: "checkbox",
                    datalanid: "825_负责人",
                    fromType: "6"
                }
                //,
                // {
                //     queryfield: "CompanyID",
                //     text: lanTool.lanContent('726_公司名称'),
                //     fieldControlType: "selectList",
                //     queryType: "string",
                //     queryFormat: "",
                //     queryRelation: "and",
                //     queryValue: "",
                //     queryComparison: "=",
                //     Code: "DropDowList_ViewBaseCompanyBaseInf",
                //     TypeValue: "",
                //     selectType: "radio",
                //     resulteRow: true,
                //     clickObj: "CompanyIDClickObj",
                //     datalanid: "726_公司名称"
                // },
            ]
        };
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created:function(){
        let _self = this;
        _self.title = lanTool.lanContent("791_联系人");
        //清空右侧筛选数据
        eventBus.queryCondictionData = null;
        _self.$store.commit('SET_ITEM', 'contacts');

    },
    mounted:function(){
        let _self = this;
        lanTool.updateLanVersion();
        _self.changePos();
        _self.followToggle();
        _self.watchScroll();
        _self.groupToggle();
        _self.goInfo();

        //重置右侧默认值
        var returnObj = _self.$refs.rightPanel.reductionDataFilter(true);
        if (tool.isNullOrEmptyObject(returnObj)) {
            return ;
        }

        //场景：在searchmodule页刷新再点确定搜索 (暂时不考虑此场景)
        // if(!tool.isNullOrEmptyObject(eventBus.queryCondictionData)){
        //     _self.queryCondictionData = eventBus.queryCondictionData;
        //     eventBus.queryCondictionData = null;
        // }

        _self.queryCondiction.push(returnObj.defaultQueryCondition);

        _self.showPage = _self.$store.state.contactsShowModule;
        //  _self.showPage = 1;
        if(_self.showPage == 0){
            _self.searchData = _self.OrganizationsSearch;
            $("#companySwitchPage").trigger("click");
        }else{
            _self.searchData = _self.ContactsSearch;
            $("#contactSwitchPage").trigger("click");
        }

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
        switchPage:function(num,$event){
            let _self = this;
            _self.switchPageHandle(num, $event ,'SET_CONTACTS_SHOW_MODULE');
        },

        //列表展开/收起
        groupToggle: function () {
            var _self = this;
            _self.groupToggleHandle('organizationsList', 'contactsList');
        },

        //联系人展开收起
        contactsToggle:function(){
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
                  var categoryID = target.closest('.contacts-list')
                                  .siblings('div.date-div')
                                  .find("span[data-groupid]:first")
                                  .attr("data-groupid") || "";
                  var fromType = "contacts";
                  var companyID = target.find("div[data-groupid]:first").attr("data-groupid") || "";
                  if (tool.isNullOrEmptyObject(categoryID) || tool.isNullOrEmptyObject(companyID)) {
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
                        _self.getContacts(categoryID, companyID, function(){
                            _self.$nextTick(function () {
                                target.addClass("open")
                                    .siblings(".contact_list")
                                    .slideDown(500);
                            })
                        });
                    }


              })
        },

        //根据公司获取联系人
        getContacts:function(categoryID, companyID, callBack){
            let _self = this;
            if(tool.isNullOrEmptyObject(categoryID) || tool.isNullOrEmptyObject(companyID)){
              return;
            }
            //筛选条件
            var allQueryData = tool.combineArray(_self.queryCondictionData, _self.queryCondiction, "Field");
            // console.log(allQueryData);
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ContactsHandle_GroupInnerData;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                GroupID: companyID,
                _RegisterCode: tool.RegisterCode(),
                QueryCondiction:JSON.stringify(allQueryData)
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
                        _self.noData = true;
                        return;
                    }
                    data = data._OnlyOneData.Rows || [];
                    console.log(data);
                    //无数据
                    if (data.length <= 0) {
                        return;
                    }
                    $.each(_self.groupData, function (index, item) {
                        if (item.GroupID == categoryID) {
                            $.each(item.items, function(i, companyData){
                                if(companyData.AutoID == companyID){
                                    companyData.items = data;
                                }
                            })
                        }
                    })
                    if (!tool.isNullOrEmptyObject(callBack)) {
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

        //添加/取消关注
        followToggle: function () {
            $("#organizationsList").off("click", ".item-stars-icon").on("click", ".item-stars-icon", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var _curObj = $(this);
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
            })
        },

        //刷新当前激活的page的分组数据
        RefreshCurPageGroupData: function () {

            var _self = this;
            var data = [
                {
                  moduleId:0,
                  fromType:'organizations',
                  // container:$("#organizations"),
                  searchData:_self.OrganizationsSearch
                },
                {
                  moduleId:1,
                  fromType:'organizations',
                  // container:$("#contacts"),
                  searchData:_self.ContactsSearch
                },
            ]
            _self.RefreshCurPageGroupDataHandle(data);

        },

        //点击跳转到详情页
        goInfo:function(){
            var _self = this;
            $("#organizationsList,#contactsList").off('click','div.data-events-item').on(
              'click',
              'div.data-events-item',
              function(event){
                var target = $(event.target);
                if (target.hasClass("item-stars-icon")) {
                    return;
                }

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
                    infoName = $(this).find(".item-first-div span").eq(0).text() || "";
                var parameter = {
                    showPage: _self.showPage,
                    infoName:infoName
                };
                _self.$router.push({
                    path: url,
                    query: parameter
                });

            });
        },

        //监听滚动
        watchScroll:function(){
            var _self = this;
            var headerH = parseFloat($("header").innerHeight());
            var navH = parseFloat($(".nav").innerHeight());

            _self.watchScrollHandle( headerH + navH );
        }

    },
    beforeRouteLeave:function(to, from, next){
      if(to.name == 'index'){
          this.$store.commit('REMOVE_ITEM', 'contacts');
          this.$store.commit('SET_CONTACTS_SHOW_MODULE', 1);
      }
      next();
    }

};
</script>

<style scoped>
@import "../../assets/css/common/commonlist.css";
</style>
