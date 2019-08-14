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
                <li><a @click="selectFiltertype($event)" data-fieldval="AllQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT selected"><i class="zen-visualization calcfont calc-gou" style="font-size:14px"></i><span class="lanText" data-lanid="1000213_所有问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="MineQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class ="lanText" data-lanid="1000214_我的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="UnansweredQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class ="lanText" data-lanid="1000215_未答复的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="UnsolvedQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000216_未解决的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="ResolvedQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000217_已解决的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="InProgressQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000218_正在处理的问题"></span></a></li>
                <li><a @click="selectFiltertype($event)" data-fieldval="ClosedQuestions" data-group="FileterGroup" href="" class="cxfeedtype cxRECENT"><i class="zen-visualization calcfont calc-gou"></i><span class="lanText" data-lanid="1000219_已关闭的问题"></span></a></li>
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

                //1. 根据id 请求数据
                _self.queryList('', function () {
                    //2.切换页面样式
                    target.addClass('active').siblings('li').removeClass('active');
                    _self.scrollX.scrollToElement(event.target, 300, true);
                });

                //2.切换页面样式
                // target.addClass('active').siblings('li').removeClass('active');
                // _self.scrollX.scrollToElement(event.target,300,true);
            })

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
                        _self.noData = true;
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
            var apiUrlTemp = '';
            var jsonDatas = {
                // CurrentLanguageVersion: lanTool.currentLanguageVersion,
                // UserName: tool.UserName(),
                // TabID: _self.tabID,
                // CompanyID: _self.companyID,
                // VersionID: _self.versionID,
                // IsUsePager: true,
                // PageSize:_self.pageSize,
                // PageNum:_self.pageNum,
                // QueryCondiction: _self.queryCondictionData || []
            };

            if (tool.isNullOrEmptyObject(queryType)) {
                var loadingIndexClassName = tool.showLoading();
            }
            /*
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
                            _self.listData = _self.listData.concat(responseData);
                      }else{
                          _self.listData = responseData || [];
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
            })
            */

            var responseData = [{
                "AutoID": 103,
                "TopicID": 4,
                "TopicName": "Boeing",
                "TagName": "Boeing",
                "UserName": "alancheng鄭兆麟",
                "PostTime": "2019-08-05T08:48:00",
                "Theme": "ceshi testfff",
                "Content": "content @aoniruan",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 1,
                "LikeCount": 1,
                "IsCurrentUserLike": "1",
                "DislikeCount": 1,
                "IsCurrentUserDislike": "1"
            }, {
                "AutoID": 102,
                "TopicID": 7,
                "TopicName": "Web",
                "TagName": "Web",
                "UserName": "aoniruan阮毅文",
                "PostTime": "2019-08-01T17:15:00",
                "Theme": "【Vue原理】Computed - 源码版",
                "Content": "如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 2,
                "LikeCount": 1,
                "IsCurrentUserLike": "1",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 101,
                "TopicID": 7,
                "TopicName": "Web",
                "TagName": "Web",
                "UserName": "aoniruan阮毅文",
                "PostTime": "2019-07-31T17:15:00",
                "Theme": "测试发帖",
                "Content": "顶顶顶@alancheng",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 87,
                "TopicID": 8,
                "TopicName": "JS",
                "TagName": "Web,JS",
                "UserName": "ceshi测试用",
                "PostTime": "2019-07-25T09:25:00",
                "Theme": "为什么 ContentEditable 很恐怖",
                "Content": "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n为什么 ContentEditable 这么恐怖: 一个数学上的佐证\r\n\r\nContentEditable 是一种在web浏览器上进行富文本编辑的本地原生组件. 它是那样让人…伤感.\r\n\r\n我会用一些顺手拈来的数学方法来想你证明，目前的ContentEditable的方法是不好的. 这并不是因为我觉得数学是解释这个论点的一个有说服力的方式。它实际上使得这个论点更加的异类话.\r\n\r\n但是我真的觉得文本编辑器导致了太多的模棱两可, 就像“所见即所得 (WYSIWYG) 是啥意思?”还有 “当你选择了这段文本并敲下了Enter会发生什么?”这样不明确的问题。公理化的数学是我所知道的能解决模棱两可的问题并对它们进行明确的最佳工具.\r\n\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\nLeoXu\r\n\r\n翻译于 2014/11/07 23:20\r\n\r\n 顶\r\n\r\n1\r\n\r\n \r\n\r\n那么所见即所得是什么意思呢？一个好的所见即所得编辑器应该满足下面3个定理：\r\n\r\n    1.DOM内容和可视化（Visible）内容能够很好地进行映射。\r\n    2.DOM选择和可视化（Visible）选择能够很好地进行映射。\r\n    3.所有的可视化编辑都能够映射到一个从代数上来说封闭的和完整的可视化内容集合上面。\r\n\r\n首先，我会解释这3个定理所表达的意思，并且一个好的编辑器为什么要遵守这些规则。但是我们首先要明白：他们是定理。他们最弱的部分是缺少证明。但是我们假设他们是没问题的除非我们能拿出明显的证据来。\r\n\r\n其次，我会证明ContentEditable不满足这3个定理。\r\n\r\n最后，我会讨论浏览器新的特性和库是怎样针对这些问题的，以及我们怎样在普通的编辑器中处理他们的。\r\n\r\nDOM空间是我们能在HTML中表述的所有网页页面的集合。所有页面都能够被表示成一个元素树，而这些树把文本节点作为叶子。\r\n\r\n可视化空间（“所见即所得”）是所有可视化页面的集合 — 也就是我们在屏幕上看到的浏览器渲染的一个页面。我们常常会把看起来一样的两个页面的可视化空间认为是一样的。 \r\n\r\n浏览器渲染引擎是一个把DOM空间映射到可视化空间的一个映射。“映射”是指对某个DOM树 x 进行 Render(x)操作产生所有的可视化页面。 \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\njunker\r\n\r\n翻译于 2014/11/07 16:15\r\n\r\n 顶\r\n\r\n1\r\n\r\n \r\n\r\n当我们说一个映射在编辑器中表现良好时，我们的意思是这个映射保留了所有的编辑操作（见注1）。更准确的说，如果渲染的定义是明确的话，那么\r\nfor all edit operations E, and DOM pages x and y\r\nRender(x) = Render(y) \r\nimplies Render(E(x)) = Render(E(y))\r\n\r\n\r\n \r\n\r\n这是一种在“你看到的是什么”之后确定“你得到了什么”的方式。如果两个部分看起来是一样的，而我们对它们进行了相同的编辑，那么两种结果应该看起来是一样的. (请再看看第 1 条)\r\n\r\n我已经很惊奇的看到网络上那么多的 “WYSIWYG” 编辑器都打破了这个规则. 这听起来应该是一个理所当然的规则。但是它会导致你陷入有关“相同”是什么意思这个有点怪异的问题，而对这个问题的问题的最好探讨就是示例了.\r\n\r\n@dylanxu@aoniruan\r\n\r\n\r\n\r\n \r\n\r\n \r\n\r\n \r\n\r\n \r\n\r\n ",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 71,
                "TopicID": 11,
                "TopicName": "python",
                "TagName": "NodeJS,python",
                "UserName": "ceshi测试用",
                "PostTime": "2019-07-24T10:49:00",
                "Theme": "人工智能与机器学习的区别",
                "Content": "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n@ceshi@aoniruan\r\n\r\n从广义上讲，人工智能涉及机器做一些只有人才能做到的事情。也就是说，计算机科学家不同意几年前的某些计算能力是否可以构成人工智能。如今，许多这些功能可能仅仅只被称为软件。\r\n\r\n人工智能的现代复兴是由一种非常特殊的计算方式的进步推动的：也就是机器学习。我们经常在Emerj上交替使用人工智能和机器学习，但许多计算机科学家喜欢将两者分开。关于人工智能的究竟是由什么构成的，在该领域存在（并且可能永远存在）辩论。一些计算机科学家不考虑人工智能的计算能力，除非它们涉及机器学习。\r\n\r\n这些科学家可能会继续改变他们的人工智能参数，直到实现人工一般智能（AGI）。AGI的发展（计算机执行人类所能执行的任何智力任务的能力）是许多计算机科学研究人员的目标，但实现它可能需要很多年，并且它值得在其他的时间用专门的一篇文章来形容。\r\n\r\n研究人员似乎同意的一点是机器学习在某种程度上属于人工智能的范畴，而人工智能本身属于计算机科学学科。深度学习是后续文章的主题，并且深度学习是机器学习的一个子集。这一概念由NVIDIA提出，解释如下：\r\n\r\n上面是NVIDA对人工智能，机器学习和深度学习的概念化\r\n\r\nYoshua Bengio，过去二十年来最杰出的深度学习研究者之一，为我们提供了他自己对机器学习的定义：\r\n\r\n机器学习研究是人工智能研究的一部分，旨在通过数据，观察和与世界的互动为计算机提供知识。获得的知识允许计算机正确地推广到新设置。\r\n\r\n尽管机器学习在今天的人工智能思想的主导地位，但人工智能曾经以一种截然不同的方式被研究。\r\n\r\n专家系统和人工智能的早期方法\r\n在21世纪末和2010年初的机器学习取得进步之前，人工智能的兴趣围绕着一个完全独立的计算能力。在60年代和70年代，专家系统主导了人工智能的开发。开发人员试图通过将其概念化为一系列if-then语句来模仿人类思想和决策。实质上，专家系统是一个由if-then场景构建的大型网络，通过该场景过滤查询以实现一些预编程的最终结果。专家系统背后的if-then语句被硬编码到软件中。因此，AI每次都会以相同的方式响应某些输入。\r\n\r\n如果所得到的软件在工业中具有任何实际用途，那么这些if-then场景需要适当地通知领域专家。例如，为了建立一个专家系统来了解当出现某种传染病时应该做些什么，开发人员需要以某种方式将软件的if-then场景建立在传染病专家在传染病时可能做的事情的基础上 。\r\n\r\n例如，开发人员可以采访40位不同的传染病医疗专家，并向他们询问有关症状和治疗的一系列问题，并将他们的反应硬编码到专家系统中。这需要软件开发人员进行大量的深谋远虑和规划。他们需要与领域专家合作，列出某人可能询问某个特定主题的所有可能问题，然后找出这些问题的所有可能的答案。如果他们没不能解释一个问题或答案，那么专家系统将无法提供用户问题的准确答案。\r\n\r\n另一个例子可能涉及客户支持票。专家系统可以建立在以下if-then场景上：“如果电子邮件的正文中包含”退款“字样，则将票证路由到退款票据桶。”这当然看起来是一个合理的规则，它确实可能会将大部分退款票据路由到相应的桶中。该规则不考虑客户谈论与退款相关的概念或使用退款相关短语而不使用“退款”一词的支持票。\r\n\r\n客户可能会说，“如果你不给我回电话，我就会打电话给我的银行。”一个有业务背景的人力支持代理可能知道这样的门票通常涉及到客户不知道他们账户的费用是他们注册的年度订阅服务。代理商可能也知道，在几乎所有情况下，客户都希望退还该费用。基于专家系统的软件永远无法将这些票据退还到退款桶中。\r\n\r\n专家系统的局限性\r\n从理论上讲，具有业务“客户支持票证背景”的人员可以在构建专家系统之前将有关此场景的信息传递给构建专家系统的开发人员。if-then规则可能类似于“如果电子邮件的正文包含’bank’一词，则将票证路由到退款票据桶。”\r\n\r\n但是，如果该企业最近才开始销售其订购服务，那么其基于专家系统的客户支持软件将无法适应进入系统的各种票证，并对其订阅服务进行模糊引用，例如上面的示例。在业务联系开发人员以使用另一个if-then规则更新软件之前，这些票证不会被路由到退款桶中。\r\n\r\n围绕这一限制进行工作明显是不切实际的，这也是专家系统（以及通常的人工智能）在一段被称为“人工智能寒冬”的时期内衰退的最大原因\r\n\r\n机器学习和神经网络\r\n随着互联网的出现，从在线购物到保险理赔的大量数据都变得数字化。数据现在已成为常态，即使是最小的公司也将数据存储在数字格式中。\r\n\r\n机器学习是一种让计算机以与专家系统完全不同的方式模仿人类思想和决策的方式。如果一个人有能力存储，访问和理解他们可以做出决策的大脑中的数十亿个数据点，他们可能会做出与我们现在做出决策的方式截然不同的决策; 在任何情况下，在绝大多数情况下，对更多信息和背景做出的决定优于在较少信息和较少背景下进行的决策。\r\n\r\n简而言之，机器学习模型可以对数十亿个数据点做出决策。它们理解这些数据，并将其转化为可能性，为它们的产出提供动力。这与专家系统非常不同，专家系统每个if-then规则只有一个输出，每个“if”只有一个“then”。更重要的是，机器学习模型是为了适应新的意外的输入而构建的。专家系统不知道如何处理不属于退款票规则的退票，但随着时间的推移，机器学习模型可以开始将“我正在给我的银行打电话”路由到退款桶中，作为回应人的反馈。",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 25,
                "TopicID": 7,
                "TopicName": "Web",
                "TagName": "Web",
                "UserName": "dylanxu許少峰",
                "PostTime": "2019-07-19T17:25:00",
                "Theme": "“只讲技术，拒绝空谈”的AI开发者大会再次来临！",
                "Content": "2018 年的AI开发者大会，作为年度人工智能领域面向专业开发者的一次高规格技术盛会，上千名开发者与上百名技术专家齐聚一堂，大会以“AI技术与应用”为核心，就人工智能的最新技术及深度实践，进行了全方位解读及论证，这对我国人工智能产业的发展和技术应用的深入落地有着极大推动作用。今年，在产业智能化的浪潮下，第二届 AI 开发者大会（AI ProCon 2019）将秉承“技术驱动产业智能化”的宗旨，真正关注技术实践，解决开发者的实际业务问题，推动产业升级。目前，最新的大会议程也已出炉。除了延续2018 AI开发者大会上备受大家关注的计算机视觉、自然语言处理、知识图谱、机器学习技术论坛，今年我们还将开启全新技术论坛：5G驱动AIoT、AI 开源、AI+DevOps、智能小程序、推荐系统（具体日程以现场为准）。BERT后时代，NLP技术发展走向何方？2018到2019年，从BERT到XLNet等重大突破，NLP领域进入火爆发展期，各项任务频频刷新纪录。而BERT的诞生又将为产业带来哪些创新？这些技术如何赋能于企业场景与应用？未来NLP还有望在哪些方面取得再进一步的突破？在机遇与挑战并存的时代下，作为NLP领域学习者与开发者，又将何去何从？锻造个人硬核技能？本次AI开发者大会NLP技术论坛将带领大家聚焦当下，着眼未来。如何构建完整的知识图谱生态？进入知识时代，知识图谱作为实现科学认知至关重要的技术，已经在各行各业发挥着不可替代的作用。但是，知识图谱技术的发展与应用仍面临着很多挑战，哪些技术方向有望取得突破？未来，如何降低技术门槛，构建越来越完整的知识图谱生态？5G+AIoT给互联网带来一场怎样的变革？5G时代下，AIoT将迎来爆发期，5G+AIoT是下一代的超级互联网。5G将会如何影响AIoT技术和落地进展？在当前条件和环境下，AIoT还面临着哪些发展的瓶颈？如何突破这些瓶颈，让AIoT产品真正走进寻常百姓家？“AI+小程序”将为小程序创业带来新机遇？微信小程序自2017年上线以来，如今已经成为互联网最火热的项目风口，阿里、百度等也纷纷看中小程序的发展前景，也随之纷纷加入战局。与APP相比，小程序开发成本低，拥有“即用即走”的特点。目前许多APP都已经添加了人工智能相关技术，提高用户体验，对于小程序开发者来说，如何在AI技术驱动下开拓出自己的天地？AI+DevOps，未来已来？随着数据链的完善，云设施的广泛部署，以及微服务带来的软件开发复杂度，软件工程管理的复杂度攀升，对智能化管理的需求越来越高，AI+DevOps在技术设施，商业需求上是否已经成熟？如何将人工智能运用到软件工程领域？在这个时代技术的潮流下，经典+全新论坛的打造将带领大家不仅跟上技术的脚步，还要做引领者。 只有在现场，亲身感受技术的碰撞与思想的交锋，才能从别人的实践中找到自己需要的答案。本次大会我们也将邀请来自行业一线的顶尖技术专家深度讲解各领域的技术实践。今年，我们拟邀的重磅嘉宾（具体出席嘉宾以现场为准）有：蒋涛，CSDN创始人&董事长、极客帮创投创始合伙人贾扬清，阿里巴巴技术副总裁洪小文，微软亚研院院长张宏江，源码资本投资合伙人汤晓鸥，商汤科技SenseTime创始人、香港中文大学教授印奇，旷视创始人兼CEO戴文渊，第四范式创始人余凯，地平线创始人杨震原，字节跳动副总裁周伯文，京东集团副总裁、京东人工智能事业部总裁李航，字节跳动科技有限公司人工智能实验室总监Judea Pearl，贝叶斯网络之父Gary Bradski，OpenCV作者世界因开发者而动！2019年，我们再度起航！回顾过去一年 AI开发者创造的新世界，今年，我们将一如既往地寻找新问题，探索用技术创新推动 AI 产业革命，真正解决开发者关心核心问题。",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 2,
                "TopicID": 9,
                "TopicName": "Proxy",
                "TagName": "Web,JS,Proxy",
                "UserName": "aoniruan阮毅文",
                "PostTime": "2019-07-19T09:49:00",
                "Theme": "Proxy 的巧用",
                "Content": "Proxy 介绍使用Proxy，你可以将一只猫伪装成一只老虎。下面大约有6个例子，我希望它们能让你相信，Proxy 提供了强大的 Javascript 元编程。尽管它不像其他ES6功能用的普遍，但Proxy有许多用途，包括运算符重载，对象模拟，简洁而灵活的API创建，对象变化事件，甚至Vue 3背后的内部响应系统提供动力。Proxy用于修改某些操作的默认行为，也可以理解为在目标对象之前架设一层拦截，外部所有的访问都必须先通过这层拦截，因此提供了一种机制，可以对外部的访问进行过滤和修改。这个词的原理为代理，在这里可以表示由它来“代理”某些操作，译为“代理器”。ES6原生提供了Proxy构造函数，用来生成Proxy实例。var proxy = new Proxy(target, handler);复制代码Proxy对象的所有用法，都是上面的这种形式。不同的只是handle参数的写法。其中new Proxy用来生成Proxy实例，target是表示所要拦截的对象，handle是用来定制拦截行为的对象。下面是 Proxy 最简单的例子是，这是一个有陷阱的代理，一个get陷阱，总是返回42。let target = {  x: 10,  y: 20}let hanler = {  get: (obj, prop) => 42}target = new Proxy(target, hanler)target.x //42target.y //42target.x // 42复制代码结果是一个对象将为任何属性访问操作都返回“42”。 这包括target.x，target['x']，Reflect.get(target, 'x')等。但是，Proxy 陷阱当然不限于属性的读取。 它只是十几个不同陷阱中的一个：",
                "Status": "已关闭",
                "Status_ID": 71,
                "Result": "已解决",
                "Result_ID": 73,
                "ReplyCount": 0,
                "LikeCount": 2,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 6,
                "TopicID": 12,
                "TopicName": "m787",
                "TagName": "MRO,m787",
                "UserName": "dylanxu許少峰",
                "PostTime": "2019-07-19T09:45:00",
                "Theme": "CESHI",
                "Content": "DDD@aoniruan",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 12,
                "TopicID": 7,
                "TopicName": "Web",
                "TagName": "MRO,Web",
                "UserName": "dylanxu許少峰",
                "PostTime": "2019-07-19T09:43:00",
                "Theme": "闲鱼无障碍是怎么在端侧实现的",
                "Content": "Hi，小伙伴们还记得之前刷屏的“闲鱼为1700万人，打造了一条盲道”的文章吗？在今年4月，闲鱼和深圳市信息无障碍研究会取得了联系。在沟通过程中，我们了解到在移动互联网时代，视障人士同样可以通过手机，享受到互联网带来的便利。闲鱼作为目前国内最大的闲置交易平台，为了更好地服务用户，在无障碍研究会的视障工程师团队的支持下，在现有基础上，先后进行了Android、iOS版本的无障碍支持。闲鱼在Flutter&Native混合工程下，如何进行的无障碍优化？在日常版本迭代频繁情况下，是怎么有效地保持稳定支持无障碍功能？本文为您一一揭秘。什么是无障碍？什么是无障碍？一个人残疾或者能力缺失，生活中有种种障碍，比如，残疾人不能上楼梯，视障人士不能玩手机。残障人士，同样享有人权，拥有独立生活的诉求。合理地使用工具减少障碍，比如为残疾人设置电梯，为视障人士提供语音功能，都是减少或消除障碍的手段，也就是我们今天所说的无障碍(Accessibility)。今天我们在处理端上的无障碍，一般是为视障群体服务。视障用户如何获取手机上的信息？不同手机系统提供了相应的读屏辅助软件，Android是Talkback，iOS称为VoiceOver(旁白)，视障用户通过简单的操作进行交互，触摸、点击、双击、左右滑动屏幕，系统就会通过旁白语音的形式，将界面信息反馈给视障用户。视障用户怎么使用无障碍功能呢？我们以Android手机为例，简单进行操作，通过“设置” > \"更多设置\" > “无障碍” > “Talkback”开启Talkback，iOS操作也十分相似，通过“设置” > “通用” > “辅助功能” > “旁白”开启旁白。无障碍常态化机制：很多开发可能会这么思考，我们是否需要针对视障群体，单独开发出一个符合这个群体使用习惯的App版本？但实际上，残障人士不是有意或无意地孤立的群体，不需要将将残障人士从大众中隔离，减少视障人士在端侧正常版本的使用障碍，让视障人士与普通人在相同环境下，能够平滑地沟通交流，他们同样有能力为社会创造价值。因此，客户端无障碍的优化，在普通版本上进行无障碍优化即可，原有的交互方式、信息内容不需要变动，尽量不要提供特殊版本。同时，端侧业务需求不断迭代，必须将无障碍优化纳入到正常的版本迭代流程中，建立无障碍优化的常态化机制，约定产品日常开发流程，才能持续保障主干链路的无障碍稳定支持。",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 0,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }, {
                "AutoID": 15,
                "TopicID": 13,
                "TopicName": "React",
                "TagName": "Web,React",
                "UserName": "dylanxu許少峰",
                "PostTime": "2019-07-19T09:42:00",
                "Theme": "React小技巧汇总",
                "Content": "一、工具篇1、显示 html@aoniruan 看看这个帖子<div dangerouslySetInnerHTML={{ __html: LANG.auth_register_tips1 }}/>复制代码2、常用组件axios(http请求模块，可用于前端任何场景，很强大)echarts-for-react(可视化图表，别人基于react对echarts的封装，足够用了)recharts(另一个基于react封装的图表)nprogress(顶部加载条，蛮好用)react-draft-wysiwyg(别人基于react的富文本封装，如果找到其他更好的可以替换)react-draggable(拖拽模块，找了个简单版的)screenfull(全屏插件)photoswipe(图片弹层查看插件，不依赖jQuery，还是蛮好用)animate.css(css动画库)redux Web 应用是一个状态机，视图与状态是一一对应的.所有的状态，保存在一个对象里面redux-logger 日志Reselect 记忆组件redux-thunk 为了解决异步action的问题redux-saga 为了解决异步action的问题react-router-redux 保持路由与应用状态(state)同步react-router-dom3、react-devtools 调试工具工具地址：github.com/facebook/re…全局安装：yarn global add react-devtools复制代配置：在package.json中配置上去：\"scripts\": { \"devtools\": \"react-devtools\" }复制代码然后就可以启动了：yarn run devtools二、组件通讯篇需要组件之进行通信的几种情况父组件向子组件通信子组件向父组件通信跨级组件通信没有嵌套关系组件之间的通信redux 架构父组件向子组件 —— props子组件向父组件 —— props.funciton 接收参数利用事件机制1. 父组件向子组件通信React数据流动是单向的,父组件向子组件通信也是最常见的;父组件通过props向子组件传递需要的信息",
                "Status": "进行中",
                "Status_ID": 70,
                "Result": "未解决",
                "Result_ID": 74,
                "ReplyCount": 0,
                "LikeCount": 1,
                "IsCurrentUserLike": "0",
                "DislikeCount": 0,
                "IsCurrentUserDislike": "0"
            }]

            //把标签字段值转换为数组
            $.each(responseData, function (i, ietem) {
                var tagsArr = [];
                tagsArr = ietem.TagName.toString().split(',');
                ietem.TagName = tagsArr;
            })

            if (queryType == 'pushLoad') {
                _self.listData = _self.listData.concat(responseData);
            } else {
                _self.listData = responseData || [];
            }

            setTimeout(() => {
                tool.hideLoading(loadingIndexClassName);
                _self.$refs.scroll.refresh();

                if (!tool.isNullOrEmptyObject(callback)) {
                    callback();
                }
            }, 500);
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
                return;
            }

            //帖子ID
            var autoID = curObj.attr("data-AutoID") || "";
            //用户名
            var userName = tool.getUserName();
            //动作类型
            var actionType = ""; //(76=>Like;77=>Dislike)
            //是否添加
            var isAdd = ""; //(0=>取消添加;1=>添加)

            var dataEven = curObj.attr('data-even') || '';
            if (tool.isNullOrEmptyObject(dataEven)) {
                return;
            }
            //赞图标类名：icon-zan,icon-zan1
            //踩图标类名：icon-caishixin- , icon-cai
            if (dataEven == 'fabulous') {
                actionType = "76";
                //赞
                if (curObj.hasClass('icon-zan')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            } else if (dataEven == 'unfabulous') {
                actionType = "77";
                //踩
                if (curObj.hasClass('icon-caishixin-')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            }

            var data = {
                "_ControlName": tool.ControlName_ForumHandle_PostAction,
                "AutoID": autoID,
                "ActionType": actionType,
                "IsAdd": isAdd,
                "UserName": userName
            };

            var loadingIndex = tool.showLoading();
            $.ajax({
                type: "post",
                cache: false,
                url: tool.AjaxBaseUrl,
                data: data,
                success: function (data) {
                    tool.hideLoading(loadingIndex);
                    data = tool.jObject(data);
                    if (data._ReturnStatus == false) {
                        tool.msg(tool.getMessage(data), function (index) {
                            tool.close(index);
                        }, {
                            time: 0,
                            icon: 2,
                            title: LanContent(586),
                            btn: [LanContent(569)]
                        });
                        return false;
                    }

                    //更新数量和状态
                    data = data._OnlyOneData;
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

                    //console.log(curObj);
                    //console.log(isCurrentUserDoTemp);
                    //改变状态
                    if (dataEven == 'fabulous') {
                        //若当前是已点赞
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('icon-zan').removeClass('icon-zan1');
                        } else {
                            curObj.addClass('icon-zan1').removeClass('icon-zan');
                        }
                    } else if (dataEven == 'unfabulous') {
                        //踩
                        //若当前是已踩
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('icon-caishixin-').removeClass('icon-cai');
                        } else {
                            curObj.addClass('icon-cai').removeClass('icon-caishixin-');
                        }
                    }
                },
                error: function (data) {
                    tool.hideLoading(loadingIndex);
                    console.log(data);
                },
                complete: function () {}
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
