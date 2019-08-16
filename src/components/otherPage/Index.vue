<template>
<div>
    <Header class="header" :title="title" :messageCount="messageCount" :forumMessageCount="forumMessageCount"></Header>

    <div id="page-content" class="page-content">
        <!-- 搜索 -->
        <div class="search-box" style="display:none">
            <div @click="goSearch" class="search" id="searchBtn">
                <span class="search-icon mui-icon calcfont calc-sousuo"></span>
                <label class="f16 search-label lanText" data-lanid="780_搜索"></label>
            </div>
        </div>

        <div id="nav" class="sticky">
            <div class="weui-grids">
                <div class="weui-grid">
                    <div @click.stop="gotoUrl($event)" url="/tripmeeting" class="js_grid">
                        <div class="weui-grid__icon trip-meeting-icon">
                            <span class="mui-icon calcfont calc-kehu"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="781_出差&会议"></p>
                    </div>
                </div>
                <div class="weui-grid">
                    <div @click.stop="gotoUrl($event)" url="/contacts" class="js_grid">
                        <div class="weui-grid__icon lianxiren1-icon">
                            <span class="mui-icon calcfont calc-kehulianxiren"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="782_联系人"></p>
                    </div>
                </div>
                <div class="weui-grid">
                    <div @click.stop="gotoUrl($event)" url="/businessCategories" class="js_grid">
                        <div class="weui-grid__icon jihui-icon">
                            <span class="calcfont calc-jihui"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="783_商业"></p>
                    </div>
                </div>
                <!-- <div class="weui-grid" style="display:none">
                    <div @click.stop="gotoUrl($event)" url="/business" class="js_grid">
                        <div class="weui-grid__icon leibie-icon">
                            <span class="calcfont calc-leibie"></span>
                        </div>
                        <p class="f12 weui-grid__label">Categories</p>
                    </div>
                </div> -->

                <div class="weui-grid">
                    <!-- <div @click.stop="gotoUrl($event)" url="/airlineDatabase" class="js_grid"> -->
                    <div @click.stop="gotoUrl($event)" url="/forumlist" class="js_grid">
                        <div class="weui-grid__icon intelligence-icon">
                            <span class="calcfont calc-luntan"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="1054_论坛"></p>
                    </div>
                </div>
                <div class="weui-grid">
                    <div @click.stop="gotoUrl($event)" url="/userEvents" class="js_grid">
                        <div class="weui-grid__icon UserManagement-icon">
                            <span class="calcfont calc-yonghuqun"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="1000304_用户活动"></p>
                    </div>
                </div>
                 <div class="weui-grid">
                    <div @click.stop="gotoUrl($event)" url="/bIShareMaterials" class="js_grid">
                        <div class="weui-grid__icon biShare-icon">
                            <span class="calcfont calc-wj-gxwj"></span>
                        </div>
                        <p class="f12 weui-grid__label lanText" data-lanid="1080_共享文件"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="occupy-position"></div>
        <div class="pageListContent">
            <div class="nav sticky">
                <div id="meetingSwitchPage" @click="switchPage(0,$event)" class="nav-item f16 active-item lanText" data-lanid="619_会议"></div>
                <div id="dealsSwitchPage" @click="switchPage(1,$event)" class="nav-item f16 lanText" data-lanid="817_交易"></div>
                <div id="opportunitiesSwitchPage" @click="switchPage(2,$event)" class="nav-item f16 lanText" data-lanid="649_商业机会"></div>
                <div class="nav-border"></div>
            </div>
            <div v-show="showPage == 0" class="group-title">
                <div class="title-text f12"><span class="lanText" data-lanid="1000177_最近要参加的会议"></span><span>{{meetingDateInterval}}</span></div>
                <router-link to="/tripmeeting" class="check-all right f14 a">
                    <span class="lanText" data-lanid="936_更多"></span>&gt;&gt;
                </router-link>
            </div>
            <div v-show="showPage == 1" class="group-title">
                <div class="title-text f12" ><span class="lanText" data-lanid="1000347_最近的交易"></span><span>{{dealDateInterVal}}</span></div>
                <router-link to="/businessCategories" class="check-all right f14 a">
                    <span class="lanText" data-lanid="936_更多"></span>&gt;&gt;
                </router-link>
            </div>
            <div v-show="showPage == 2" class="group-title">
                <div class="title-text f12" ><span class="lanText" data-lanid="1000346_最近的商业机会"></span><span>{{dealDateInterVal}}</span></div>
                <router-link to="/businessCategories" class="check-all right f14 a">
                    <span class="lanText" data-lanid="936_更多"></span>&gt;&gt;
                </router-link>
            </div>
            <div v-show="showPage == 0" class="pageList">
                <!-- 列表 -->
                <div v-show ="!noData" class="list-view" id="indexMeetingList">

                    <div v-for="group in groupData" :key="group.GroupID" class="month-event list-group-div group-div" data-fromtype="meeting">
                        <div class="f14 date-div">
                            <span class="calcfont calc-richeng"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName|abdDateFormat('dd/MM/yyyy')}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>
                        <div v-if="group.items.length > 0" class="group-item-list meeting-list index-meeting-list">

                            <div v-for="item in group.items" :key="item.AutoID" class="data-events-item f14" :data-url="'/meetinginfo/'+ item.AutoID">
                                <div class="item-title">{{item.MeetingTitle}}</div>
                                <div class="item-time f12">
                                    <span class="calcfont calc-gengxinshijian"></span>
                                    <span class="time-text">{{item.BeginTime|MeetingTimeFormat}}~{{item.EndTime|MeetingTimeFormat}}</span>
                                    <span class="right-text">{{item.Realname}}</span>
                                </div>
                                <div class="item-address">{{item.CompanyID}}</div>
                                <div class="item-initiator">{{item.ContactsID|formatContactsID}}{{item.Title|formatTitle}}</div>
                            </div>

                        </div>
                    </div>

                </div>
                <!-- 没有数据   -->
                <nothing v-show="noData" class="noDataIcon"></nothing>
            </div>
            <div v-show="showPage == 1" class="pageList">
                <div v-show="!noData" id="dealpipelineList" data-fromtype="dealPipeline">
                    <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                        <div class="date-div">
                            <span class="calcfont calc-lianxiren1"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items.length > 0" class="group-item-list dealPipeline-list">
                            <div v-for="item in group.items" :key="item.AutoID" class=" group-item f14" :data-url="'/opportunitiesinfo/' + item.AutoID">
                                <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
                                <div class="item-block">
                                    <div class="item-div item-first-div blue-color">
                                        {{item.TheName}}
                                    </div>
                                    <div class="item-div line-clamp2">{{item.Memo}}</div>
                                    <div class="item-div f12 green-color padding-bottom-3 padding-top-3">
                                        <span :class="item.className">{{item.CurrentState}}</span>
                                        <span class="right updateTime">{{item.LastUpdateTime|abdDateFormat('dd/MM/yyyy')}}</span>
                                    </div>
                                    <div v-if="item.IsMeetingExist!='false'" class="item-div-box">
                                        <div class="item-new-text">{{item.meetingSysmbol}}</div>
                                        <div class="new-right">
                                            <div class="item-div">
                                                <span class="itme-div-span">{{item.MeetingTitle}}</span>
                                            </div>
                                            <div class="item-div dete-div f12">
                                                <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nothing v-show="noData" class="noDataIcon"></nothing>
            </div>
            <div v-show="showPage == 2" class="pageList">
                <div v-show="!noData" id="opportunitiesList" data-fromtype="opportunities">

                    <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                        <div class="date-div ">
                            <span class="calcfont calc-lianxiren1"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items.length > 0" class="group-item-list opportunities-list">
                            <div v-for="item in group.items" :key="item.AutoID" class=" group-item f14" :data-url="'/opportunitiesinfo/' + item.AutoID">
                                <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
                                <div class="item-block">
                                    <div class="item-div item-first-div blue-color">
                                        {{item.TheName}}
                                    </div>
                                    <div class="item-div f12 green-color padding-bottom-3 padding-top-3">
                                        <span :class="item.className">{{item.CurrentState}}</span>
                                        <span class="right updateTime">{{item.LastUpdateTime|abdDateFormat('dd/MM/yyyy')}}</span>
                                    </div>
                                    <div class="item-div line-clamp2">{{item.Memo}}</div>
                                    <div v-if="item.IsMeetingExist!='false'" class="item-div-box">
                                        <div class="item-new-text">{{item.meetingSysmbol}}</div>

                                        <div class="new-right">
                                            <div class="item-div">
                                                <span class="itme-div-span">{{item.MeetingTitle}}</span>
                                            </div>
                                            <div class="item-div dete-div f12">
                                                <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nothing v-show="noData" class="noDataIcon"></nothing>
            </div>
        </div>
    </div>
    <!-- 提示 -->
    <!-- <div class="tips">
            <div class="tips-box f12">
                <span class="calcfont calc-tishi1"></span>
                <div class="tips-text">
                    <span class="lanText" data-lanid="988_你有"></span><span>{{meetingCount}}</span><span class="lanText" data-lanid="987_场会议需要上传会议记录。"></span>
                </div>
                <router-link v-show="Number(meetingCount)>=1" to="/meetinglist" class="right upload-now a f14">
                    <span class="lanText" data-lanid="870_转到"></span>&gt;&gt;
                </router-link> -->
    <!-- <div @click="" to="/meetinglist" class="right upload-now a lanText f14" data-lanid="870_立刻去上传"></div> -->
    <!-- </div>
        </div> -->

    <!--  右侧侧滑 -->
    <div id="mask" class="mask" @click="panelToggle" v-show="showPanel"></div>
    <div id="right-content" class="right-content">
        <div class="user-info f14">
            <icon name="user" scale="10"></icon>
            <div class="userName"></div>
            <div class="userTitle"></div>
            <div class="userDepartment"></div>
        </div>
        <div class="right-content-block">
            <div class="right-block-title f14 lanText" data-lanid="774_通用"></div>

            <div class="right-block-items f14">
                <div class="block-item language-type" data-lantype="1">
                    <div class="switch-text">English</div>
                    <div class="right calcfont calc-gou1 language-icon"></div>
                </div>
                <div class="block-item language-type" data-lantype="2">
                    <div class="switch-text">中文简体</div>
                    <div class="right calcfont calc-gou1 language-icon"></div>
                </div>
                <div class="block-item language-type" data-lantype="3">
                    <div class="switch-text">中文繁体</div>
                    <div class="right calcfont calc-gou1 language-icon"></div>
                </div>
                <!-- <div class="block-item item-border-top">
            <div class="switch-text lanText" data-lanid="775_分享后发送邮件"></div>
            <div class="switch right">
              <div class="weui-cell__ft">
                <input @click="sendEmailSwitch" class="weui-switch" type="checkbox">
              </div>
            </div>
          </div> -->
                <div @click="SynchronousCamcardData" class="block-item item-border-top btnsynchronouscamcard lanText" data-lanid="1000193_同步CamCard数据"></div>
                <div @click="SynchronousNewCamCarddata" class="block-item item-border-top SynchronousNewCamCarddata lanText" data-lanid="1000372_同步新的CamCard数据"></div>
                <div @click="ClearCache" class="block-item item-border-top lanText" data-lanid="776_清除缓存"></div>
            </div>
        </div>

        <div @click="logout" class="logout-btn lanText" data-lanid="777_注销"></div>
    </div>
</div>
</template>

<style>
.test-div {
    height: 50px;
    line-height: 50px;
}
</style>

<script>
import Header from "@/components/customPlugin/Header"
import Nothing from "@/components/customPlugin/Nothing"
export default {
    components: {
        Header: Header,
        'nothing': Nothing
    },
    data() {
        return {
            title: "",
            noData: false, //没有数据
            showPanel: false,
            groupData: [], //7天的数据
            meetingDateInterval:"",
            dealDateInterVal:"",
            dealData:
            [
                // {
                //     "GroupID": 2,
                //     "GroupName": "測試銷售組1",
                //     "GroupRowCount": 15,
                //     "items": []
                // },
                // {
                //     "GroupID": 1,
                //     "GroupName": "測試銷售組2",
                //     "GroupRowCount": 53,
                //     "items": []
                // },
                // {
                //     "GroupID": 3,
                //     "GroupName": "測試銷售組3",
                //     "GroupRowCount": 8,
                //     "items": []
                // }
            ],
            pitchesData: [
            // {
            //     "GroupID": 13,
            //     "GroupName": "IT Team",
            //     "GroupRowCount": 7,
            //     "items": []
            // }, {
            //     "GroupID": 2,
            //     "GroupName": "Test Sales Team1",
            //     "GroupRowCount": 10,
            //     "items": [],
            // }, {
            //     "GroupID": 1,
            //     "GroupName": "Test Sales Team2",
            //     "GroupRowCount": 34,
            //     "items": []
            // }, {
            //     "GroupID": 3,
            //     "GroupName": "Test Sales Team3",
            //     "GroupRowCount": 4,
            //     "items": []
            // }
            ],
            meetingCount: 0, //未上传会议记录的会议数量
            messageCount: 0, //消息数量
            forumMessageCount: 0, //论坛消息的数量
            showPage: 0,
            isFromSingleSignOn: false, //是否来源于单点登陆
            recentMeetingDay:6,
            recentDealAndPitchDay:30,//查询最近30天的Deal和Pitch记录
        };
    },
    created: function () {

    },
    mounted: function () {

        var _self = this;
        _self.isFromSingleSignOn =
            (_self.$route.query.IsFromSingleSignOn == null || _self.$route.query.IsFromSingleSignOn == undefined) ?
            false :
            _self.$route.query.IsFromSingleSignOn;

        lanTool.updateLanVersion();
        _self.recentDate();
        //侧滑
        eventBus.$on("showIndexRightPanelEvent", _self.panelToggle);

        //分组展开/收起
        _self.groupToggle();

        //初始化用户信息
        _self.initUserInfo();

        //初始化多语言
        _self.initLV();

        //获取最近7天的会议分组数据
        _self.getRecentMeeting();

        //获取未上传会议记录的会议数量
        _self.getNoUploadRecordCount();

        //获取分享消息数量
        _self.getMessageCount();
        //获取论坛消息数量
        _self.getForumMessageCount();

        //收藏
        _self.followToggle();
        _self.goInfo();

        //处理单点登陆
        _self.handleLogOut();

        _self.watchScroll();
    },
    methods: {
        //获取最近七天要参加的会议，获取最近一个月的交易和商业机会日期
        recentDate:function(){
            var _self = this;
            var dateTimeFormatStr = "dd/MM/yyyy";
            var date = new Date();
            var dateStr = date.FormatNew(dateTimeFormatStr);
            var startDate = new Date();
            var isFormat = true;
            var startDateStr = tool.SetDate(startDate, 0, 0, -_self.recentDealAndPitchDay, isFormat, dateTimeFormatStr);
            var meetingEndDateStr = tool.SetDate(startDate, 0, 0, _self.recentMeetingDay, isFormat, dateTimeFormatStr);
            _self.dealDateInterVal = "("+startDateStr+"-"+dateStr+")";
            _self.meetingDateInterval = "("+dateStr+"-"+meetingEndDateStr+")";
        },
        switchPage: function (num, e) {
            var _self = this;
            _self.groupData = [];
            var el = e.target;
            if (num === undefined) return;
            $(el).addClass('active-item').siblings().removeClass('active-item');
            _self.changePos();
            switch (num) {
                case 0:
                    _self.getRecentMeeting();
                    break;
                case 1:
                    _self.getRecentDealsAndOpportunities(1);
                    break;
                case 2:
                    _self.getRecentDealsAndOpportunities(2);
                    break;
                default:
                    break;
            }
            _self.showPage = num;
        },
        //table底部横条过渡效果
        changePos: function () {
            this.$nextTick(function () {
                var activePos = $('.nav.sticky .active-item').position();
                $('.nav-border').stop().css({
                    left: activePos.left,
                    // width: $('.calendar-nav .active-item').width()
                });
            })
        },
        gotoUrl: function (e) {
            var target = $(e.target);
            var url = target.attr("url") || "";
            if (tool.isNullOrEmptyObject(url)) {
                target = target.parents("div[url]:first");
                url = target.attr("url") || "";
            }
            if (tool.isNullOrEmptyObject(url)) {
                return;
            }
            tool.setSessionStorageItem("fromPage", "index");
            var _self = this;
            _self.$router.push({
                path: url
            });
        },
        //初始化用户信息
        initUserInfo: function () {
            //赋用户信息
            var curUser = tool.CurUser();
            if (tool.isNullOrEmptyObject(curUser)) {
                return;
            }
            $(".userName").text(curUser.Realname || "");
            var curLV = lanTool.currentLanguageVersion;
            if (curLV == "1") {
                $(".userTitle").text(curUser.PositionNameEN || "");
                $(".userDepartment").text(curUser.DepartmentNameEN || "");
            } else if (curLV == "2") {
                $(".userTitle").text(curUser.PositionNameCN || "");
                $(".userDepartment").text(curUser.DepartmentNameCN || "");
            } else if (curLV == "3") {
                $(".userTitle").text(curUser.PositionNameTD || "");
                $(".userDepartment").text(curUser.DepartmentNameTD || "");
            }
        },
        //初始化多语言
        initLV: function () {
            var _self = this;
            //切换语言
            $(".language-type").off('click').on("click", function (event) {
                var target = $(event.target);
                if (!target.hasClass("language-type")) {
                    target = target.closest("div.language-type");
                    if (target == undefined) {
                        return;
                    }
                }

                if (!target.hasClass("language-show")) {
                    target
                        .addClass("language-show")
                        .siblings(".language-type")
                        .removeClass("language-show");
                }

                var curLV = target.attr("data-lantype");
                lanTool.setLan(curLV, function () {
                    lanTool.updateLanVersion();
                });

                //_self.$router.go(0); //todo 以后增加刷新机制以后增加刷新机制
                window.location.reload(); //todo 以后增加刷新机制以后增加刷新机制
            });

            //写入当前多语言值
            // $(
            //     "div.language-type[data-lantype='" +
            //     lanTool.currentLanguageVersion +
            //     "']:first"
            // ).trigger("click");
            var target =
                $(
                    "div.language-type[data-lantype='" +
                    lanTool.currentLanguageVersion +
                    "']:first"
                );
            if (!target.hasClass("language-type")) {
                target = target.closest("div.language-type");
                if (target == undefined) {
                    return;
                }
            }
            if (!target.hasClass("language-show")) {
                target
                    .addClass("language-show")
                    .siblings(".language-type")
                    .removeClass("language-show");
            }

            var curLV = target.attr("data-lantype");
            lanTool.setLan(curLV, function () {
                lanTool.updateLanVersion();
            });
        },
        // 发送邮件开关
        sendEmailSwitch: function (e) {
            if ($(e.target).is(":checked") == true) {
                console.log("true");
            } else {
                console.log("false");
            }
        },
        //同步Camcard的数据
        SynchronousCamcardData: function () {

            tool.showConfirm(
                lanTool.lanContent("1000212_同步Camcard数据将会覆盖本地数据，是否确定同步？"),
                function () {
                    //请求地址
                    var urlTemp = tool.AjaxBaseUrl();
                    var controlName = tool.Api_CamcardDataHandle_SyncCompanyAndContactData;
                    //传入参数
                    var jsonDatasTemp = {
                        CurrentLanguageVersion: lanTool.currentLanguageVersion,
                        UserName: tool.UserName(),
                        _ControlName: controlName,
                        _RegisterCode: tool.RegisterCode()
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
                            tool.showText(tool.getMessage(data));
                            window.location.reload();
                        },
                        error: function (jqXHR, type, error) {
                            tool.hideLoading(loadingIndexClassName);
                            console.log(error);
                            return;
                        },
                        complete: function () {
                            //隐藏虚拟键盘
                            document.activeElement.blur();
                        }
                    });
                },
                function () {}
            );
        },
        //同步新的Camcard的数据
        SynchronousNewCamCarddata: function () {

            tool.showConfirm(
                lanTool.lanContent("1000373_同步新的Camcard数据将会覆盖本地数据，是否确定同步？"),
                function () {
                    //请求地址
                    var urlTemp = tool.AjaxBaseUrl();
                    var controlName = tool.Api_CamcardDataHandle_SyncNewCompanyAndContactData;
                    //传入参数
                    var jsonDatasTemp = {
                        CurrentLanguageVersion: lanTool.currentLanguageVersion,
                        UserName: tool.UserName(),
                        _ControlName: controlName,
                        _RegisterCode: tool.RegisterCode()
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
                            tool.showText(tool.getMessage(data));
                            window.location.reload();
                        },
                        error: function (jqXHR, type, error) {
                            tool.hideLoading(loadingIndexClassName);
                            console.log(error);
                            return;
                        },
                        complete: function () {
                            //隐藏虚拟键盘
                            document.activeElement.blur();
                        }
                    });
                },
                function () {}
            );
        },
        //清除缓存
        ClearCache: function () {
            var _self = this;

            tool.showConfirm(
                lanTool.lanContent("778_是否确认清除缓存？"),
                function () {
                    //重新加载多语言
                    lanTool.waitExcute(false, true, function () {
                        //window.location.reload();
                        // _self.$router.go(0); //todo 以后增加刷新机制
                        window.location.reload(); //todo 以后增加刷新机制
                    });
                },
                function () {}
            );
        },
        //退出
        logout: function () {
            var _self = this;

            tool.showConfirm(
                lanTool.lanContent("779_是否确认注销？"),
                function () {
                    //清除所有缓存
                    tool.removeSessionStoragItem(tool.cache_RegisterCode);
                    tool.removeSessionStoragItem(tool.cache_UserName);
                    tool.removeSessionStoragItem(tool.cache_CurUser);
                    tool.removeSessionStoragItem(tool.cache_loginUserName);
                    tool.removeSessionStoragItem(tool.cache_loginPwd);
                    _self.$router.push("/Login");
                },
                function () {}
            );
        },
        //监听滚动固定
        watchScroll: function () {
            var _self = this;
            var headerH = parseFloat($("header").innerHeight());
            // var searchH = parseFloat($("#searchBtn").innerHeight()) + 16;
            var navH = parseFloat($(".occupy-position").innerHeight());

            $(window).unbind('scroll').bind('scroll', function () {

                if ($(".month-event").length <= 0) return;
                // var scrollTop = $(this).scrollTop();
                var scrollTop = $(document).scrollTop() || $(window).scrollTop();

                $(".month-event").each(function () {
                    if (
                        $(this).offset().top - scrollTop <=
                        navH + headerH
                    ) {
                        if (tool.getSystem() === "ios") {
                            $(this)
                                .find(".date-div")
                                .addClass("sticky")
                                .css({
                                    top: navH + headerH + "px"
                                });
                        } else {
                            $(this)
                                .find(".date-div")
                                .css({
                                    position: "fixed",
                                    top: navH + headerH + "px"
                                });
                            $(this)
                                .find(".occupy-div")
                                .show();
                        }
                    } else {
                        if (tool.getSystem() === "ios") {
                            $(this)
                                .find(".date-div")
                                .removeClass("sticky")
                                .css({
                                    top: "0px"
                                });
                        } else {
                            $(this)
                                .find(".date-div")
                                .css({
                                    position: "static"
                                });
                            $(this)
                                .find(".occupy-div")
                                .hide();
                        }
                    }
                });
            });
        },
        //搜索
        goSearch: function () {
            this.$router.push("/search");
        },
        //点击分组收起展开
        groupToggle: function () {
            var _self = this;
            $("#indexMeetingList").off("click", "div.date-div").on(
                "click",
                "div.date-div",
                function (event) {
                    var target = $(event.target);
                    if (!target.hasClass('date-div')) {
                        target = target.closest('div.date-div');
                        if (target == undefined) {
                            return;
                        }
                    }

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
                        // _self.getInnerDataList(groupID, function () {
                        //     _self.$nextTick(function () {
                        //         target.addClass("open")
                        //             .siblings(".group-item-list")
                        //             .slideDown(500);
                        //     })
                        // });
                        console.log("groupID:" + groupID);

                        tool.InitInnerDataList(_self, 'meeting', groupID, [], function () {
                            _self.$nextTick(function () {
                                target.addClass("open")
                                    .siblings(".group-item-list")
                                    .slideDown(500);
                            })
                        }, 'index');
                    }
                });

            $("#dealpipelineList,#opportunitiesList").off("click", "div.date-div").on(
                "click",
                "div.date-div",
                function (event) {
                    var target = $(event.target);
                    if (!target.hasClass('date-div')) {
                        target = target.closest('div.date-div');
                        if (target == undefined) {
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
                        var queryCondictionTemp = _self.constructDealAndPitchQueryCondition();
                        var fromTypeTemp = "";
                        switch (_self.showPage) {
                            case 1:
                                fromTypeTemp = "dealPipeline";
                                break;
                            case 2:
                                fromTypeTemp = "opportunities";
                                break;
                            default:
                                break;
                        }
                        tool.InitInnerDataList(_self, fromTypeTemp, groupID, queryCondictionTemp, function () {
                            _self.$nextTick(function () {
                                target.addClass("open")
                                    .siblings(".group-item-list")
                                    .slideDown(500);
                            })
                        }, 'index');
                    }
                });
        },
        //侧滑
        panelToggle: function () {
            var _self = this;
            _self.showPanel = !_self.showPanel;
            if (_self.showPanel) {
                _self.$nextTick(function () {
                    $("#right-content").css({
                        left: "30%",
                        transition: "left 0.1s ease-out",
                        "-moz-transition": "left 0.1s ease-out",
                        "-webkit-transition": "left 0.1s ease-out",
                        "-o-transition": "left 0.1s ease-out"
                    });
                    $("#mask,#right-content").off("touchmove").on("touchmove", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                });
            } else {
                _self.$nextTick(function () {
                    $("#right-content").css({
                        left: "100%",
                        transition: "left 0.3s ease-out",
                        "-moz-transition": "left 0.3s ease-out",
                        "-webkit-transition": "left 0.3s ease-out",
                        "-o-transition": "left 0.3s ease-out"
                    });
                });
            }
        },
        //构造交易和商业机会的查询条件
        constructDealAndPitchQueryCondition:function(){
            var _self = this;
            var queryCondictionTemp = [];
            var dateTimeFormatStr = "yyyy/MM/dd";
            var endDate = new Date();
            var endDateStr = endDate.FormatNew(dateTimeFormatStr);
            var startDate = new Date();
            var isFormat = true;
            var startDateStr = tool.SetDate(startDate, 0, 0, -_self.recentDealAndPitchDay, isFormat, dateTimeFormatStr);
            var queryCondictionObjTemp =
            {
                Field:"LastUpdateTime",
                Type:"Date",
                Format:"yyyy/MM/dd",
                Relation:"and",
                Value:startDateStr+","+endDateStr,
                Comparison:"between"
            };
            queryCondictionTemp.push(queryCondictionObjTemp);
            return queryCondictionTemp;
        },
        //获取最近交易和商业机会的分组数据
        getRecentDealsAndOpportunities: function (num) {
            var _self = this;
            var fromTypeTemp = "";
            switch (num) {
                case 1:
                    fromTypeTemp = "dealPipeline";
                    break;
                case 2:
                    fromTypeTemp = "opportunities";
                    break;
                default:
                    break;
            }

            var queryCondictionTemp = _self.constructDealAndPitchQueryCondition();
            tool.InitGrouplist(_self, fromTypeTemp, queryCondictionTemp, function (data) {
            });
        },
        //获取最近几天的会议分组数据
        getRecentMeeting: function () {
            var _self = this;
            tool.InitGrouplist(_self, 'meeting', [], function (data) {}, 'index')
        },
        //获取未上传会议记录的会议数量
        getNoUploadRecordCount: function () {
            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MeetingHandle_QueryNoUploadRecordCount;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode()
            };

            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    data = tool.jObject(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        _self.noData = true;
                        return;
                    }

                    _self.meetingCount = data._OnlyOneData || 0;
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    return;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //获取分享消息数量
        getMessageCount: function () {
            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_QueryCount;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode()
            };

            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    data = tool.jObject(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        _self.noData = true;
                        return;
                    }

                    _self.messageCount = data._OnlyOneData || 0;
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    return;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //获取论坛消息数量
        getForumMessageCount: function () {
            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_QueryPostCount;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode()
            };

            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    data = tool.jObject(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        _self.noData = true;
                        return;
                    }

                    _self.forumMessageCount = data._OnlyOneData || 0;
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    return;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //点击关注/取消关注
        followToggle: function () {
            var _self = this;

            $("#dealpipelineList,#opportunitiesList").off("click", ".item-stars-icon").on("click", ".item-stars-icon", function (e) {
                e.preventDefault();
                e.stopPropagation();

                var target = $(e.target);
                var _curObj = $(this);
                var fromType = target.parents("div[data-fromtype]").attr("data-fromtype") || "";
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
        //点击跳转到详情页
        goInfo: function () {
            var _self = this;
            $("#indexMeetingList").off('click', 'div.data-events-item').on(
                'click',
                'div.data-events-item',
                function (event) {
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
                    infoName = $(this).find(".item-title:first").text() || "";
                    _self.$router.push({
                        path: url,
                        query: {
                            infoName: infoName
                        }
                    });
                }
            );
            $("#dealpipelineList,#opportunitiesList").off('click', 'div.group-item').on(
                'click',
                'div.group-item',
                function (event) {
                    var target = $(event.target);
                    if (target.hasClass("item-stars-icon")) {
                        return;
                    }
                    if (!target.hasClass("group-item")) {
                        target = target.closest("div.group-item");
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
                    infoName = $(this).find(".item-first-div").text() || "";
                    var parameter = {
                        showPage: _self.showPage,
                        infoName: infoName
                    };
                    _self.$router.push({
                        path: url,
                        query: parameter
                    });

                });

        },
        //处理退出登陆按钮
        handleLogOut: function () {
            var _self = this;
            if (_self.isFromSingleSignOn) {
                _self.title = "";
                $(".logout-btn").hide();
            } else {
                _self.title = "CRM";
                $(".logout-btn").show();
            }
        }
    },
    beforeDestroy: function () {
        eventBus.$off("showIndexRightPanelEvent");
        var a = 0;
    }
};
</script>

<style scoped>
/* @import "../assets/css/common/commonlist.css"; */
@import "../../assets/css/pages/index.css";
</style>
