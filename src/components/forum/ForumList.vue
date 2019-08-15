<template>
<div>
    <div class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <div class="search">
            <div class="search-div f14" @click="goToSearch">
                <i class="calcfont calc-sousuo search-icon"></i>
                <span class="lanText" data-lanid="1000306_你想知道什么？"></span>
            </div>
        </div>
    </div>

    <div class="tag">
        <!-- <div class="tag-scroll-box"> -->
        <div class="tag-items" ref="personWrap">
            <ul class="">
                <li v-for="item in tagData" :key="item.AutoID" :data-id="item.AutoID">{{item.Name}}</li>
                <!-- @click="switchTag(item.AutoID, $event)" -->
            </ul>
        </div>
        <!-- </div> -->
        <a @click="goToTags" class="mycalcfont calcfont calc-fenlei left"></a>
    </div>
   <div class="searchSelectDiv">

        <div class="selectFilter">
            <a @click="filterDropDown($event)" class="filterBlock">
                <span class="filterText lanText" data-lanid="1000213_所有问题">All Questions</span>
                <span class="zen-selectArrow"></span>
            </a>
            <ul v-show="isShowFilter" class="feedFilterby">
                <li><a @click="selectFiltertype($event)" data-fieldval="AllQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT selected"><i class="zen-visualization calcfont calc-gou" style="font-size:14px"></i><span class="lanText" data-lanid="1000213_所有问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="MineQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class ="lanText" data-lanid="1000214_我的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="UnansweredQuestions" data-group="FileterGroup" href="###" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class ="lanText" data-lanid="1000215_未答复的问题"></span></a></li>
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
    </div>
    <div class="list">

        <vue-scroll v-show="!noData" :showToTop="true" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

            <div v-for="item in listData" :key="item.AutoID" class="list-item">
                <div @click="goToInfo(item.AutoID)" class="title f16">{{item.Theme}}</div>
                <div @click="goToInfo(item.AutoID)" class="content f14">{{item.Content}}</div>
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
                        <!-- 没赞：calc-zan1  赞：calc-zan -->
                        <span class="calcfont" :class="[parseInt(item.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="fabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{item.LikeCount}}</span>
                    </div>
                    <div class="hand">
                        <!-- 没踩：calc-cai  踩：calc-caishixin- -->
                        <span class="calcfont" :class="[parseInt(item.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="unfabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{item.DislikeCount}}</span>
                    </div>
                    <div class="replies">
                        <span>{{repliesText}}</span>
                        <span>{{item.ReplyCount}}</span>
                    </div>
                    <span class="time">{{item.PostTime|MeetingTimeFormat}}</span>
                </div>

            </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>

    <!-- 发帖按钮 -->
    <div class="buttom-div">
        <a @click="goToPosting" class="f18 calcfont calc-combinedshapecopy2"></a>
    </div>

</div>
</template>

<script>
import BScroll from "better-scroll";
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    name: 'forumlist',
    components: {
        'vue-scroll': Scroll,
        'nothing': Nothing
    },
    data() {
        return {
            noData: false, //没数据
            pageSize: 10, //一页显示多少记录
            pageNum: 1, //当前页码
            listData: [],
            tagData: [],
            scrollX: {}, //tag中的scoll对象
            repliesText: lanTool.lanContent("1000350_答复"), //在列表通过属性配置不显示
            isShowFilter: false, //隐藏筛选的下拉列表
            isShowSort: false, //隐藏排序的下拉列表
        }
    },
    created: function () {
        var _self = this;
        _self.$store.commit('SET_ITEM', 'forumlist');
        //请求标签数据
        _self.getTagsData();
    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
    },
    activated: function () {
        var _self = this;
        //处理从标签页面点击某个标签返回列表页
        var tagId = _self.$route.params.id || '';
        var tagEle = $('.tag-items li[data-id="' + tagId + '"]') || '';
        if (tagEle.length >= 1) {
            tagEle.trigger('click');
        } else {
            //点击的标签不在首页
            if (!tool.isNullOrEmptyObject(tagId)) {
                $('.tag-items li').removeClass('active');
                //根据id去刷列表页
            }
        }
    },
    methods: {
        //排序下拉列表展示和隐藏
        sortDropDown: function () {
            var _self = this;
            _self.isShowFilter = false;
            _self.isShowSort = !_self.isShowSort;
        },
        //筛选下拉展示隐藏
        filterDropDown: function (e) {
            var _self = this;
            _self.isShowSort = false;
            _self.isShowFilter = !_self.isShowFilter;
        },
        //筛选选择
        selectFiltertype: function (e) {
            var _self = this;
            var el = e.target;
            // console.log(e.target);
            // console.log(e.currentTarget);
            var obj;
            if (e.target === e.currentTarget) {
               obj = $(el);
            }else{
               obj = $(el).parent("a");
            }    
            obj.addClass("selected");
            var parent = obj.parent("li");
            parent.siblings().find("a").removeClass("selected");
            var val = obj.find("span").text();
            $(".filterText").eq(0).text(val);
            _self.isShowFilter = false;

            //刷新列表数据
            _self.queryList('', function () {
            });
        },
        //排序选择
        selectSorttype: function (e) {
            var _self = this;
            var el = e.target;
            var obj;
            if (e.target === e.currentTarget) {
               obj = $(el);
            }else{
               obj = $(el).parent("a");
            }    
            obj.addClass("selected");
            var parent = obj.parent("li");
            parent.siblings().find("a").removeClass("selected");
            var val = obj.find("span").text();
            $(".sortText").eq(0).text(val);
            _self.isShowSort = false;

            //刷新列表数据
            _self.queryList('', function () {
            });
        },
        //返回首页
        back: function () {
            this.$router.push('/');
        },
        //跳转标签页
        goToTags: function () {
            var _self = this;
            _self.$router.push('/forumtags');
        },
        //跳转发帖页面
        goToPosting: function () {
            this.$router.push('/forumposting');
        },
        //跳转搜索页面
        goToSearch: function () {
            this.$router.push('/forumsearch');
        },
        //跳转详情页
        goToInfo: function (id) {
            var _self = this;
            if (tool.isNullOrEmptyObject(id)) {
                return;
            }
            var url = '/foruminfo/' + id;
            _self.$router.push({
                path: url
            })
        },
        //标签切换
        switchTag: function () {
            var _self = this;
            $(".tag-items").on("click", "li", function (event) {
                var target = $(event.target);
                var id = target.attr('data-id') || '';
                if (tool.isNullOrEmptyObject(id)) {
                    return;
                }

                //1.切换页面样式
                target.addClass('active').siblings('li').removeClass('active');
                _self.scrollX.scrollToElement(event.target, 300, true);

                //2.根据id请求数据
                _self.queryList('', function () {
                });
            });
        },
        //请求标签数据
        getTagsData: function () {
            var _self = this;
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_TagQuery;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: false,
                PageSize: 1,
                PageNum: 10,
                QueryCondiction: [],
                IsContainAll: true
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
                        return;
                    }
                    data = data._OnlyOneData.Rows || [];
                    _self.tagData = data;
                    //初始化tag
                    _self.$nextTick(function () {
                        _self.initTags(function () {
                            //注册事件
                            _self.switchTag();
                            //模拟点击第一个主题
                            $('.tag-items li:first').trigger('click');
                        });
                    })
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
        //初始化tags
        initTags: function (callback) {
            var _self = this;
            //计算ul宽度
            var width = 0;
            $('.tag-items li').each(function (index, el) {
                width += $(el).outerWidth();
            })
            $('.tag-items ul').width(width);

            _self.$nextTick(() => {
                if (tool.isNullOrEmptyObject(_self.scrollX)) {
                    _self.scrollX = new BScroll(this.$refs.personWrap, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        //忽略竖直方向的滚动
                        scrollY: false,
                        eventPassthrough: "vertical"
                    });
                } else {
                    _self.scrollX.refresh();
                }

                if (!tool.isNullOrEmptyObject(callback)) {
                    callback();
                }
            });
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
            var queryObj = $("ul.feedFilterby>li>a.selected").eq(0);
            var queryCondictionDataArray = new Array();
            if(queryObj != null && queryObj.length>=1){
              var dataFieldval = queryObj.attr("data-fieldval")||"";
              dataFieldval = $.trim(dataFieldval);
              if(!tool.isNullOrEmptyObject(dataFieldval)){
                var queryCondictionDataObj = {
                  "Field":dataFieldval,
                  "Type":"string",
                  "Format":"",
                  "Relation":"and",
                  "Value":dataFieldval,
                  "Comparison":"="
                };
                queryCondictionDataArray.push(queryCondictionDataObj);
              }
            }
            var tagObj = $(".tag-items li[data-id].active").eq(0);
            if(tagObj != null && tagObj.length>=1){
              var tagID = tagObj.attr("data-id") ||"";
              tagID = $.trim(tagID);
              if(!tool.isNullOrEmptyObject(tagID) && tagID != "1"){
                var queryCondictionDataObj = {
                  "Field":"TagID",
                  "Type":"string",
                  "Format":"",
                  "Relation":"and",
                  "Value":tagID,
                  "Comparison":"="
                };
                queryCondictionDataArray.push(queryCondictionDataObj);
              }
            }
            //构造排序
            var orderObj = $("ul.feedsortby>li>a.selected").eq(0);
            var sortName = "";
            if(queryObj != null && queryObj.length>=1){
              sortName = orderObj.attr("data-fieldval") || "";
            }

            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                SortName:sortName,
                SortOrder:"desc",
                QueryCondiction: JSON.stringify(queryCondictionDataArray)
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
                //  else{
                //     _self.$refs.scroll.refresh();
                //  }

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
        },
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'forumlist');
        }
        next();
    }

}
</script>

<style scoped>
@import "../../assets/css/forum/ForumList.css";
</style>
