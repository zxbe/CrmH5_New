<template>
<div>
    <!-- <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></!-->
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>

        <h1 class="mui-title f18">{{ptitle}}</h1>

        <a v-show="!isClose" @click="editClick" class="calcfont calc-fa-edit right" :data-AutoID="infoDataList.AutoID" id="edit"></a>
        <a v-show="!isClose" @click="closeClick" class="calcfont calc-jieshu right" :data-AutoID="infoDataList.AutoID" id="close"></a>
        <a v-show="!isClose" @click="delClick" class="calcfont calc-shanchu right" :data-AutoID="infoDataList.AutoID" id="delete"></a>
    </header>
    <div class="pageContent">
        <p class="forumTitle" :data-AutoID="infoDataList.AutoID" :data-TagID="infoDataList.TagID">{{infoDataList.Theme}}</p>
        <div class="forumContentDiv">
            <img class="userHeadImg" src="../../assets/images/forum/default_user_img.png" alt="">
            <span class="userName">{{infoDataList.UserName}}</span>
            <p class="content">{{infoDataList.Content}}</p>
            <div class="containTag">
                <span v-for="tagItem in infoDataList.TagNameList" :key="tagItem.AutoID">{{tagItem.TagName}}</span>
            </div>
            <div class="infoStatus">
                <span class="info-state" :class="{'result73':infoDataList.Result_ID == 73,'result74':infoDataList.Result_ID == 74}">{{infoDataList.Result}}</span>
                <span class="info-state" :class="{'status71':infoDataList.Status_ID == 71,'status70':infoDataList.Status_ID == 70}">{{infoDataList.Status}}</span>
            </div>
            <div class="feeditemfooter">
                <span class="time">{{infoDataList.PostTime}}</span>
                <span class="hand">
                    <span class="calcfont" :class="[parseInt(infoDataList.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="infoDataList.Status_ID" :data-autoid="infoDataList.AutoID" data-even="unfabulous" @click="fabulousEvent($event)"></span><span>{{infoDataList.DislikeCount}}</span>
                </span>
                <span class="hand">
                    <span class="calcfont" :class="[parseInt(infoDataList.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="infoDataList.Status_ID" :data-autoid="infoDataList.AutoID" data-even="fabulous" @click="fabulousEvent($event)"></span><span>{{infoDataList.LikeCount}}</span>
                </span>

                <span class="replies">
                    <span class="lanText" data-lanid="1000350_答复"></span><span>{{infoDataList.ReplyCount}}</span>
                </span>
            </div>
        </div>
        <div class="replyList">
            <div class="replyItem" v-for="replyItem in infoDataList.replyList" :key="replyItem.AutoID">
                <img class="replyUserImg" src="../../assets/images/forum/default_user_img.png" />
                <span class="replyUserName">{{replyItem.UserName}}</span>
                <p class="replyContent">{{replyItem.Content}}</p>
                <div class="feeditemfooter">
                    <span class="time">{{replyItem.PostTime}}</span>
                    <span class="hand">
                        <span class="calcfont" :class="[parseInt(replyItem.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="replyItem.Status_ID" :data-autoid="replyItem.AutoID" data-even="unfabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{replyItem.DislikeCount}}</span>
                    </span>
                    <span class="hand">
                        <span class="calcfont" :class="[parseInt(replyItem.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="replyItem.Status_ID" :data-autoid="replyItem.AutoID" data-even="fabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{replyItem.LikeCount}}</span>
                    </span>
                </div>
            </div>

        </div>

    </div>
    <div v-show="!isClose" class="replyBtnDiv">
        <input @click="replyAskClick" class="replyBtn" type="text" readonly="readonly" placeholder="想对Ta说点什么">
    </div>
    <div class="replyDiv">
        <textarea id="ask" class="reply" placeholder="想对Ta说点什么" rows="3"></textarea>
        <div @click="sendClick" id="sendBtn" class="send">发送</div>
    </div>
    <div id="closeThis" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1060_帖子结果"></div>

            <div class="elastic-layer-items">
                <div class="elastic-layer-item f14">
                    <span class="nessesary f18">*</span>
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="1060_帖子结果"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <input type="text" data-field="BusinessType" data-lanid="1060_帖子结果" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_ViewBaseAllTypes" TypeValue="Companybusinesstype" class="ListCellContentRightText" />
                    </div>
                    <!-- <div class="ListCellContentRight rightContent">
                        <input type="text"
                              data-field="Matter"
                              data-lanid="947_商业事项"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_DtbAllTypes"
                              TypeValue="Matter"
                              class="ListCellContentRightText"/>
                    </div> -->
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>
            </div>
            <div class="btn-div">
                <a href="javascript:;" class="mybtn btn-ok lanText" data-lanid="545_确定"></a>
                <a href="javascript:;" class="mybtn btn-cancel lanText" data-lanid="570_取消"></a>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
export default {
    components: {
        Infoheader,
    },
    data() {
        return {
            isAddNew: true,
            onlyView: true,
            operation: false,
            ptitle: lanTool.lanContent("1000369_论坛详情"),
            isClose:false,//当前帖子是否关闭
            infoDataList: {
                AutoID: "3",
                TagID: "1,2,3,4,5,6,7",
                Theme: "什么是stream定义流的英文stream，流（Stream）是一个抽象的数据接口",
                UserName: "aoniruan",
                Content: "如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现",
                Result: "Unresolved",
                Result_ID: 74,
                Status: "In Progress",
                Status_ID: 70,
                PostTime: "2019-08-08 13:03",
                IsCurrentUserLike: "0",
                LikeCount: "2",
                IsCurrentUserDislike: "1",
                DislikeCount: "3",
                ReplyCount: "2",
                TagNameList: [{
                        AutoID: 1,
                        TagName: "Web"
                    },
                    {
                        AutoID: 2,
                        TagName: "C#"
                    },
                    {
                        AutoID: 3,
                        TagName: "html"
                    },
                    {
                        AutoID: 4,
                        TagName: "Mvc"
                    },
                    {
                        AutoID: 5,
                        TagName: "A320"
                    },
                    {
                        AutoID: 6,
                        TagName: "Php"
                    },
                    {
                        AutoID: 7,
                        TagName: "JS"
                    },

                ],
                replyList: [{
                        AutoID: "11",
                        UserName: "alancheng1",
                        Content: "视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题",
                        PostTime: "2019-08-10 22:00",
                        IsCurrentUserLike: "1",
                        LikeCount: "2",
                        IsCurrentUserDislike: "1",
                        DislikeCount: "3",
                    }, {
                        AutoID: "12",
                        UserName: "alancheng2",
                        Content: "视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题",
                        PostTime: "2019-08-10 22:00",
                        IsCurrentUserLike: "1",
                        LikeCount: "2",
                        IsCurrentUserDislike: "0",
                        DislikeCount: "3",
                    },
                    {
                        AutoID: "13",
                        UserName: "alancheng3",
                        Content: "视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题",
                        PostTime: "2019-08-10 22:00",
                        IsCurrentUserLike: "0",
                        LikeCount: "2",
                        IsCurrentUserDislike: "1",
                        DislikeCount: "3",
                    }
                ]
            }
        }
    },
    created: function () {

    },
    mounted: function () {
        var _self = this;
        lanTool.updateLanVersion();
        //弹框选中控件初始化
        tool.InitiateInfoPageControl(_self, _self.id, function () {});

    },
    methods: {
        //点踩或者点赞
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
            var userName = tool.UserName();
            //动作类型
            var actionType = ""; //(76=>Like;77=>Dislike)
            //是否添加
            var isAdd = ""; //(0=>取消添加;1=>添加)

            var dataEven = curObj.attr('data-even') || '';
            if (tool.isNullOrEmptyObject(dataEven)) {
                return;
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

            var data = {
                // "_ControlName": tool.ControlName_ForumHandle_PostAction,
                // "AutoID": autoID,
                // "ActionType": actionType,
                // "IsAdd": isAdd,
                // "UserName": userName
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
                error: function (data) {
                    tool.hideLoading(loadingIndex);
                    console.log(data);
                },
                complete: function () {}
            });

        },
        //发送事件
        sendClick: function () {

            var sendObj = $("#sendBtn");
            if (sendObj.hasClass("active")) {
                console.log("send:" + $('textarea#ask').val());
            } else {
                console.log("no send......");
            }
        },
        //回复点击事件
        replyAskClick: function () {
            $(".replyDiv").show();
            $('textarea#ask').focus();
            $('textarea#ask').off('blur').on('blur', function () {
                setTimeout(() => {
                    console.log('blur');
                    $(".replyDiv").hide();
                }, 10);
            });
            $("textarea#ask").keyup(function () {
                var length = this.value.length;
                var sendObj = $("#sendBtn");
                //回帖的内容为空时，发送按钮置灰
                if (length > 0) {
                    if (!sendObj.hasClass("active")) {
                        sendObj.addClass("active");
                    }
                } else {
                    if (sendObj.hasClass("active")) {
                        sendObj.removeClass("active");
                    }

                }
            });

        },
        back: function () {
            this.$router.back(-1);
        },
        //编辑事件
        editClick: function () {
            var tagID = ($(".forumTitle").attr("data-TagID") || "");
            var postID = ($(".forumTitle").attr("data-AutoID") || "");            
            var forumTitle = $(".forumTitle").text() || "";
            var content = $(".forumContentDiv p.content").text() || "";
            var parameter = {
                tagID:tagID,
                postID:postID,
                forumTitle:forumTitle,
                content:content,
            };            
            this.$router.push({
                path:'/forumposting',
                query:parameter
            });
        },
        //关闭事件
        closeClick: function () {
            console.log("关闭");
            var _self = this;
            $('#closeThis').show();

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click', function () {
                $('#closeThis').hide();
            })

            //确定关闭帖子
            $('#closeThis').find('a.btn-ok').off('click').on('click', function () {
                console.log("确定");
                $('#closeThis').hide();
            })
        },
        //删除事件
        delClick: function () {
            tool.showConfirm(
                lanTool.lanContent("593_您确定要删除数据吗？"),
                function () {
                    //删除论坛详情的请求
                },
                function () {}
            );

        },
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";
@import "../../assets/css/forum/ForumInfo.css";
</style>
