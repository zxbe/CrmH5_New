<template>
<div>
    <!-- <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></!-->
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>

        <h1 class="mui-title f18">{{ptitle}}</h1>

        <a @click="editClick" class="calcfont calc-fa-edit right" id="gengduo"></a>
        <a @click="saveClick" class="calcfont calc-jieshu right" id="save"></a>
        <a @click="delClick" class="calcfont calc-shanchu right" id="delete"></a>
    </header>
    <div class="pageContent">
        <p class="forumTitle">{{infoDataList.Theme}}</p>
        <div class="forumContentDiv">
            <img class="userHeadImg" src="../../assets/images/forum/default_user_img.png" alt="">
            <span class="userName">{{infoDataList.UserName}}</span>
            <p class="content">{{infoDataList.Content}}</p>
            <div class="containTag">
                <span v-for="tagItem in infoDataList.TagNameList" :key="tagItem.AutoID">{{tagItem.TagName}}</span>
            </div>
            <div class="infoStatus">
                <span class="info-state">{{infoDataList.Result}}</span>
                <span class="info-state">{{infoDataList.Status}}</span>
            </div>
            <div class="feeditemfooter">
                <span class="time">{{infoDataList.PostTime}}</span>
                <span class="hand">
                    <span class="calcfont calc-zan1"></span><span>{{infoDataList.LikeCount}}</span>
                </span>
                <span class="hand">
                    <span class="calcfont calc-cai"></span><span>{{infoDataList.DislikeCount}}</span>
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
                        <span class="calcfont calc-zan1" data-autoid="1"></span><span class="ActionCount">{{replyItem.LikeCount}}</span>
                    </span>
                    <span class="hand">
                        <span class="calcfont calc-cai" data-autoid="1"></span><span class="ActionCount">{{replyItem.DislikeCount}}</span>
                    </span>

                </div>
            </div>

        </div>

    </div>
    <div class="replyBtnDiv">
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
            infoDataList: {
                Theme: "什么是stream定义流的英文stream，流（Stream）是一个抽象的数据接口",
                UserName: "aoniruan",
                Content: "如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现",
                Result: "Unresolved",
                Status: "In Progress",
                PostTime: "2019-08-08 13:03",
                LikeCount: "2",
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
                        LikeCount: "2",
                        DislikeCount: "3",
                    }, {
                        AutoID: "12",
                        UserName: "alancheng2",
                        Content: "视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题",
                        PostTime: "2019-08-10 22:00",
                        LikeCount: "2",
                        DislikeCount: "3",
                    },
                    {
                        AutoID: "13",
                        UserName: "alancheng3",
                        Content: "视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题",
                        PostTime: "2019-08-10 22:00",
                        LikeCount: "2",
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
        sendClick: function () {
            
            var sendObj = $("#sendBtn");
            if (sendObj.hasClass("active")) {
                console.log("send:"+ $('textarea#ask').val());
            }
            else{
               console.log("no send......");
            }
        },
        //回复点击事件
        replyAskClick: function () {
            console.log("huifu");
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
                console.log("长度：" + length);
                var sendObj = $("#sendBtn");
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
            console.log("编辑");
            this.$router.push('/forumposting');
        },
        //保存事件
        saveClick: function () {
            console.log("保存");
            var _self = this;
            $('#closeThis').show();

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click', function () {
                $('#closeThis').hide();
            })

            //确定
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
