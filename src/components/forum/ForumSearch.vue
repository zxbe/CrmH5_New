<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <div class="searchDiv"><input @keyup.enter="submit" @focus="searchFocus" id="searchAskInput" class="searchText f14" type="search" value=""></div>
        <div class="headLeftIconDiv">
            <a @click.stop="selectDropDownType" class="dropDownBtn calcfont calc-xiala"></a>
            <a @click="search" class="searchBtn calcfont calc-shaixuan2"></a>
        </div>
    </header>
    <div v-show="isShowdropDown" class="dropDownList">
        <a @click="selectTitleOrTag($event)" data-type="Other" class="selected"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000303_标题和内容"></span></a>
        <a @click="selectTitleOrTag($event)" data-type="Tag"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000302_标签"></span></a>
    </div>
    <!-- <div v-show="!isFocus" class="searchSelectDiv">

        <div class="selectFilter">
            <a @click="filterDropDown($event)" class="filterBlock">
                <span class="filterText lanText" data-lanid="1000213_所有问题">All Questions</span>
                <span class="zen-selectArrow"></span>
            </a>
            <ul v-show="isShowFilter" class="feedFilterby">
                <li><a @click="selectFiltertype($event)" data-fieldval="AllQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT selected"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000213_所有问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="MineQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000214_我的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="UnansweredQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000215_未答复的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="UnsolvedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000216_未解决的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="ResolvedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000217_已解决的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="InProgressQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000218_正在处理的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="ClosedQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000219_已关闭的问题"></span></a></li>
            </ul>
        </div>
        <div class="selectSort">
            <a @click="sortDropDown($event)" class="sortBlock">
                <span class="sortText lanText" data-lanid="1000222_发布日期"></span>
                <span class="zen-selectArrow"></span>
            </a>
            <ul v-show="isShowSort" class="feedsortby">
                <li class="zen-checked"><a @click="selectSorttype($event)" data-fieldval="DatePosted" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT selected"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000222_发布日期"></span></a></li>
                <li><a @click="selectSorttype($event)" data-fieldval="RecentActivity" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000223_近期活动"></span></a></li>
                <li><a @click="selectSorttype($event)" data-fieldval="MostPopular" data-group="SortGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000224_最受欢迎"></span></a></li>
            </ul>
        </div>
    </div> -->
    <div v-show="!isFocus" class="list">

        <vue-scroll v-show="!noData" :showToTop="true" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

            <div v-for="item in listData" @click="goToInfo(item.AutoID)" :key="item.AutoID" class="list-item">
                <div class="title f16">{{item.Theme}}</div>
                <div class="content f14">{{item.Content}}</div>
                <div class="feeditemtag f12">
                    <span v-for="i in item.TagName" :key="i">{{i}}</span>
                </div>
                <div class="info f12">
                    <!-- "Status": "已关闭", "Status_ID": 71,
                        "Status": "进行中", "Status_ID": 70, -->
                    <span class="info-state" :class="{'result73':item.Result_ID == 73,'result74':item.Result_ID == 74}">{{item.Result}}</span>
                    <!-- "Result": "已解决", "Result_ID": 73,
                        "Result": "未解决","Result_ID": 74, -->
                    <span class="info-state" :class="{'status71':item.Status_ID == 71,'status70':item.Status_ID == 70}">{{item.Status}}</span>
                </div>
                <div class="info f12">
                    <img class="img" src="../../assets/images/forum/default_user_img.png" />
                    <span class="name">{{item.UserName}}</span>
                    <div class="hand">
                        <span class="calcfont" :class="[parseInt(item.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="fabulous" @click.stop="fabulousEvent($event)"></span><span>{{item.LikeCount}}</span>
                    </div>
                    <div class="hand">
                        <span class="calcfont" :class="[parseInt(item.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="unfabulous" @click.stop="fabulousEvent($event)"></span><span>{{item.DislikeCount}}</span>
                    </div>
                    <div class="replies">
                        <span>{{repliesText}}</span><span>{{item.ReplyCount}}</span>
                    </div>
                    <span class="time">{{item.PostTime|MeetingTimeFormat}}</span>
                </div>

            </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>
    <!-- <div v-show="isFocus" class="searchHotBlock">
        <div class="hotTagsBlock">
            <p class="lanText" data-lanid="1000292_热门标签"></p>
            <div class="tagDiv">
                <span v-for="(item, index) in hotSearchData" @click="hotSearchClick(index,$event)" :key="item.AutoID" class="tagItem">{{item.TagName}}</span>
            </div>
        </div>
        <div class="searchHistoryBlock">
            <div class="instroduciton">
                <div class="theme">搜索历史</div>
                <div @click="clearAllSearchHistory" class="clearBtn">全部清空</div>
            </div>
            <div class="hisStorySearchList">
                <div v-for="item in historyData" :key="item.AutoID" class="hisStorySearchItem">
                    <span class="searchIcon calcfont calc-shaixuan2"></span>
                    <span @click="hotSearchClick(222,$event)" class="searchContent"> {{item.HistoryRecord}}</span>
                    <span @click="deleteHistoryClick($event)" :data-AutoID="item.AutoID" class="deleteIcon calcfont calc-guanbi"></span>
                </div>
            </div>
        </div>
    </div> -->
    <div v-show="!isFocus" class="buttom-div">
        <a @click="goToPosting" class="f18 calcfont calc-combinedshapecopy2"></a>
    </div>
</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    name:'forumsearch',
    components: {
        'vue-scroll': Scroll,
        'nothing': Nothing
    },
    data() {
        return {
            noData: false, //没数据
            pageSize: 10, //一页显示多少记录
            pageNum: 1, //当前页码
            isShowdropDown: false, //隐藏内容和标签的下拉列表
            repliesText: lanTool.lanContent("1000350_答复"), //在列表通过属性配置不显示
            // isShowFilter: false, //隐藏筛选的下拉列表
            // isShowSort: false, //隐藏排序的下拉列表
            isFocus: true,
            hotSearchData: [{
                    AutoID: "0",
                    TagName: "人工智能"
                },
                {
                    AutoID: "2",
                    TagName: "大数据"
                },
                {
                    AutoID: "3",
                    TagName: "数据库"
                },
                {
                    AutoID: "4",
                    TagName: "大数据"
                },
                {
                    AutoID: "5",
                    TagName: "Web"
                },
                {
                    AutoID: "6",
                    TagName: "Jq"
                },
                {
                    AutoID: "7",
                    TagName: "C#"
                },
            ],
            listData: [
            ],
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {
        var _self = this;
        //console.log("创建查询页");
        //console.log(_self.$store.state.includes);
        //设置为Keep-Alive页面
        _self.$store.commit('SET_ITEM', 'forumsearch');
        // console.log(_self.$store.state.includes);
    },
    mounted: function () {
        lanTool.updateLanVersion();
        this.hideDropdownList();
    },
    beforeRouteLeave: function (to, from, next) {
        if(to.name == 'forumlist'){
            this.$store.commit('REMOVE_ITEM', 'forumsearch');
        }
        next();
    },
    methods: {
        //点击空白处隐藏下拉列表
        hideDropdownList: function () {
            // console.log("xiala");
            var _self = this;
            $(document).on('click', function (e) {
                // _self.isShowSort = false;
                // _self.isShowFilter = false;
                _self.isShowdropDown = false;

            });
        },
        //搜索聚焦事件
        searchFocus: function () {
            this.isFocus = true;
        },
        //热门搜索按钮点击事件
        hotSearchClick: function (num, e) {
            console.log("num:" + num);
            var _self = this;
            var el = e.target;
            var obj = $(el);
            if (!tool.isNullOrEmptyObject(obj)) {
                var text = obj.text();
                console.log("text:" + text);
                $("input#searchAskInput").val(text);
                _self.search();
            }
        },
        goToPosting: function () {
            this.$router.push('/forumposting');
        },
        //点击回车触发搜索事件
        submit: function () {
            var _self = this;
            _self.search();
        },
        //选择标题或者标签
        selectTitleOrTag: function (e) {
            var _self = this;
            var el = e.target;
            var obj;
            if (e.target === e.currentTarget) {
                obj = $(el);
            } else {
                obj = $(el).parent("a");
            }
            obj.addClass("selected");
            obj.siblings().removeClass("selected");
            var val = obj.find("span").text();
            _self.isShowdropDown = false;
        },
        //筛选选择
        // selectFiltertype: function (e) {
        //     var _self = this;
        //     var el = e.target;
        //     var obj;
        //     if (e.target === e.currentTarget) {
        //         obj = $(el);
        //     } else {
        //         obj = $(el).parent("a");
        //     }
        //     obj.addClass("selected");
        //     var parent = obj.parent("li");
        //     parent.siblings().find("a").removeClass("selected");
        //     var val = obj.find("span").text();
        //     $(".filterText").eq(0).text(val);
        //     _self.isShowFilter = false;

        // },
        //排序选择
        // selectSorttype: function (e) {
        //     var _self = this;
        //     var el = e.target;
        //     var obj;
        //     if (e.target === e.currentTarget) {
        //         obj = $(el);
        //     } else {
        //         obj = $(el).parent("a");
        //     }
        //     obj.addClass("selected");
        //     var parent = obj.parent("li");
        //     parent.siblings().find("a").removeClass("selected");
        //     var val = obj.find("span").text();
        //     $(".sortText").eq(0).text(val);
        //     _self.isShowSort = false;
        // },
        //标题和标签下拉的展示和隐藏
        selectDropDownType: function () {
            var _self = this;
            // _self.isShowSort = false;
            // _self.isShowFilter = false;
            _self.isShowdropDown = !_self.isShowdropDown;
        },
        //筛选下拉展示隐藏
        // filterDropDown: function (e) {
        //     window.event ? window.event.cancelBubble = true : e.stopPropagation();
        //     var _self = this;
        //     _self.isShowSort = false;
        //     _self.isShowdropDown = false;
        //     _self.isShowFilter = !_self.isShowFilter;

        // },
        //排序下拉列表展示和隐藏
        // sortDropDown: function () {
        //     window.event ? window.event.cancelBubble = true : e.stopPropagation();
        //     var _self = this;
        //     _self.isShowFilter = false;
        //     _self.isShowdropDown = false;
        //     _self.isShowSort = !_self.isShowSort;
        // },
        goToInfo: function (num) {
            //console.log("跳转到详情" + num);
            var _self = this;
            if (tool.isNullOrEmptyObject(num)) {
                return;
            }
            var url = '/foruminfo/' + num;
            _self.$router.push({
                path: url
            });
        },
        // switchPage: function (num, e) {
        //     var _self = this;
        //     var el = e.target;
        //     if (num === undefined) return;
        //     $(el).addClass('active').siblings().removeClass('active');
        // },
        //返回上一步
        back: function () {
            this.$router.back(-1);
        },
        //清空搜索历史
        // clearAllSearchHistory: function () {
        //     console.log("清空历史");
        //     var _self = this;
        //     _self.historyData = [];
        // },
        //删除单条搜索历史
        // deleteHistoryClick: function (e) {
        //     console.log("删除历史记录");
        //     var _self = this;
        //     var el = e.target;
        //     var obj = $(el);
        //     if (!tool.isNullOrEmptyObject(obj)) {
        //         console.log("autoID:"+obj.attr("data-AutoID"));
        //         var id = obj.attr("data-AutoID");
        //         for (let index = 0; index < _self.historyData.length; index++) {
        //             const element = _self.historyData[index];
        //             console.log("id:"+element.AutoID);

        //             if (element.AutoID == id) {
        //                   _self.historyData.remove(element);
        //                  return;
        //             }

        //         }
        //     }

        // },
        //搜索事件
        search: function () {
            var _self = this;
            var searchVal = $.trim($('#searchAskInput').val() || "");
            if (tool.isNullOrEmptyObject(searchVal)) {
                 document.activeElement.blur();
                var tips = lanTool.lanContent('933_温馨提示');
                var sure = lanTool.lanContent("545_确定");
                var alertContent = lanTool.lanContent("1000254_搜索条件不能为空");
                $.alert(alertContent, tips, "", sure);
                return false;
            } else {
                //下拉刷新
                _self.queryList('',function(){
                    _self.isFocus = false;
                });
            }
        },
        //查询列表数据
        queryList: function (queryType, callback) {
            let _self = this;
            if (queryType == 'pushLoad') {
                //上拉请求
                _self.pageNum += 1;
            } else {
                //非上拉请求
                _self.pageNum = 1;
            }
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_PostQuery;
            //构造查询条件
            var queryCondictionDataArray = new Array();
            //构造排序
            var sortName = "DatePosted";
            var sortOrder = "desc";
            //构造查询类型
            var searchType = $(".dropDownList>a.selected").eq(0).attr("data-type") || "Other";
            searchType = $.trim(searchType);
            var autoValue = $("#searchAskInput").val()||"";

            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                SortName:sortName,
                SortOrder:sortOrder,
                QueryCondiction: JSON.stringify(queryCondictionDataArray),
                SearchType:searchType,
                AutoValue:autoValue
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
                        _self.noData = true;
                        return;
                    }
                    data = data._OnlyOneData.Rows || [];

                    //没有数据
                    if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                        _self.noData = true;
                        return ;
                    }

                    //把标签字段值转换为数组
                    $.each(data, function (i, ietem) {
                        var tagsArr =
                        tool.isNullOrEmptyObject(ietem.TagName)
                        ? []
                        : ietem.TagName.toString().split(',');
                        ietem.TagName = tagsArr;
                    });

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
            })
        },
        //上拉
        pullup: function () {
            let _self = this;
            _self.queryList('pushLoad', function (data, pageSize) {

                if (data.length < pageSize) {
                    _self.$refs.scroll.pullupEnd();
                }
            })
        },
        //点赞或者踩
        fabulousEvent: function (e) {
            var _self = this;
            var curObj = $(e.target);

            var statusId = curObj.attr('data-statusid') || '';
            //statusId:71 关闭 ；statusId:70 进行中 ,关闭状态的帖子不给点赞和踩
            if (statusId == '71' || statusId == '') {
                return false;
            }

            //帖子ID
            var autoID = curObj.attr("data-AutoID") || "";
            //用户名
            var userName = tool.UserName();
            //动作类型
            var actionType = ""; //(76=>Like;77=>Dislike)
            //是否添加
            var isAdd = ""; //(0=>取消添加;1=>添加)

            var dataEven = curObj.attr('data-even') || '';
            if (tool.isNullOrEmptyObject(dataEven)) {
                return false;
            }
            //赞图标类名：calc-zan,calc-zan1
            //踩图标类名：calc-caishixin- , calc-cai
            if (dataEven == 'fabulous') {
                actionType = "76";
                //赞
                if (curObj.hasClass('calc-zan')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            } else if (dataEven == 'unfabulous') {
                actionType = "77";
                //踩
                if (curObj.hasClass('calc-caishixin-')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            }

            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_PostAction;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: autoID,
                ActionType: actionType,
                IsAdd: isAdd
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
                    //console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        return;
                    }

                    //更新数量和状态
                    data = data._OnlyOneData;
                    if (tool.isNullOrEmptyObject(data)) {
                        return false;
                    }
                    if (tool.isNullOrEmptyObject(data)) {
                        return false;
                    }
                    var countTemp = data.Count.toString() || "0"; //点赞/踩数量
                    countTemp = Number(countTemp);
                    var isCurrentUserDoTemp = data.IsCurrentUserDo.toString() || "0"; //当前用户是否踩/点赞
                    isCurrentUserDoTemp = Number(isCurrentUserDoTemp);

                    //写入数量
                    var objDest = curObj.closest(".hand");
                    objDest.find(".ActionCount:first").text(countTemp);

                    //改变状态
                    if (dataEven == 'fabulous') {
                        //若当前是已点赞
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('calc-zan').removeClass('calc-zan1');
                        } else {
                            curObj.addClass('calc-zan1').removeClass('calc-zan');
                        }
                    } else if (dataEven == 'unfabulous') {
                        //踩
                        //若当前是已踩
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('calc-caishixin-').removeClass('calc-cai');
                        } else {
                            curObj.addClass('calc-cai').removeClass('calc-caishixin-');
                        }
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
        }
    }
}
</script>

<style scoped>
@import "../../assets/css/forum/ForumList.css";
@import "../../assets/css/forum/ForumSearch.css";
</style>
