<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{ptitle}}</h1>
        <!-- <a v-show="!isClose" @click="editClick" class="calcfont calc-fa-edit right" :data-AutoID="infoDataList.AutoID" id="edit"></a> -->
        <a v-show="!isClose" @click="closeClick" class="calcfont calc-jieshu right" :data-AutoID="infoDataList.AutoID" id="close"></a>
        <a v-show="!isClose" @click="delClick" class="calcfont calc-shanchu right" :data-AutoID="infoDataList.AutoID" id="delete"></a>
    </header>
    <div v-show="!noData" class="pageContent">
        <p class="forumTitle" :data-AutoID="infoDataList.AutoID" :data-TagID="infoDataList.TagID">{{infoDataList.Theme}}</p>
        <div class="forumContentDiv">
            <img class="userHeadImg" src="../../assets/images/forum/default_user_img.png" alt="">
            <span class="userName">{{infoDataList.UserName}}</span>
            <!-- <p class="content">{{infoDataList.Content}}</p> -->

            <div style="pointer-events: none;">
                <editor :content="infoDataList.HtmlContent" :auto-height="true" :show-module-name="false"></editor>
            </div>

            <div class="containTag">
                <span v-for="tagItem in infoDataList.TagNameList" :key="tagItem.AutoID">{{tagItem.TagName}}</span>
            </div>
            <div class="infoStatus">
                <span class="info-state" :class="{'result73':infoDataList.Result_ID == 73,'result74':infoDataList.Result_ID == 74}">{{infoDataList.Result}}</span>
                <span class="info-state" :class="{'status71':infoDataList.Status_ID == 71,'status70':infoDataList.Status_ID == 70}">{{infoDataList.Status}}</span>
            </div>
            <div class="feeditemfooter">
                <span class="time">{{infoDataList.PostTime|MeetingTimeFormat}}</span>
                <span class="hand">
                    <span class="calcfont" :class="[parseInt(infoDataList.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="infoDataList.Status_ID" :data-autoid="infoDataList.AutoID" data-even="unfabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{infoDataList.DislikeCount}}</span>
                </span>
                <span class="hand">
                    <span class="calcfont" :class="[parseInt(infoDataList.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="infoDataList.Status_ID" :data-autoid="infoDataList.AutoID" data-even="fabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{infoDataList.LikeCount}}</span>
                </span>

                <span class="replies">
                    <span class="lanText" data-lanid="1000350_答复"></span><span>{{infoDataList.ReplyCount}}</span>
                </span>
            </div>
        </div>
        <div class="replyList">
            <div class="replyItem" v-for="replyItem in infoDataList.ReplyPosts" :key="replyItem.AutoID">
                <img class="replyUserImg" src="../../assets/images/forum/default_user_img.png" />
                <span class="replyUserName">{{replyItem.UserName}}</span>
                <p class="replyContent">{{replyItem.Content}}</p>
                <div class="feeditemfooter">
                    <span class="time">{{replyItem.PostTime|MeetingTimeFormat}}</span>
                    <span class="hand">
                        <span class="calcfont" :class="[parseInt(replyItem.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="infoDataList.Status_ID" :data-autoid="replyItem.AutoID" data-even="unfabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{replyItem.DislikeCount}}</span>
                    </span>
                    <span class="hand">
                        <span class="calcfont" :class="[parseInt(replyItem.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="infoDataList.Status_ID" :data-autoid="replyItem.AutoID" data-even="fabulous" @click="fabulousEvent($event)"></span><span class="ActionCount">{{replyItem.LikeCount}}</span>
                    </span>
                </div>
            </div>

        </div>

    </div>
    <div v-show="isEdit" class="replyBtnDiv">
        <input @click="replyAskClick" class="replyBtn" type="text" readonly="readonly" :placeholder="placeholderText">
    </div>
    <div class="replyDiv">
        <textarea id="ask" class="reply replyContent" :placeholder="placeholderText" rows="3"></textarea>
        <div @click="sendClick" id="sendBtn" class="send lanText" data-lanid="1000375_发送"></div>
    </div>
    <!-- 关闭弹层 -->
    <div id="closeThis" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1060_帖子结果"></div>

            <div class="elastic-layer-items">
                <div class="elastic-layer-item f14">

                    <span class="calcfont calc-jieguo icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="1060_帖子结果"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text"
                                      data-field="Result"
                                      data-lanid="1060_帖子结果"
                                      data-fieldControlType="picker"
                                      data-fieldVal=""
                                      Code="DropDowList_DtbAllTypes"
                                      TypeValue="PostResult"
                                      class="ListCellContentRightText"/>
                            </div>
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>


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
import VueHtml5Editor from 'vue-html5-editor'
var editor = new VueHtml5Editor({
  showModuleName:false,
  visibleModules:[]
})
export default {
    components: {
        Infoheader,
        editor
    },
    data() {
        return {
            id: '',
            isAddNew: true,
            onlyView: true,
            operation: false,
            ptitle: lanTool.lanContent("1000369_论坛详情"),
            placeholderText:lanTool.lanContent("1000376_想说点什么..."),
            isClose: true, //当前帖子是否关闭
            isEdit:false,//当前帖子是否可编辑
            infoDataList: {},
            noData:true,
        }
    },
    created: function () {

    },
    mounted: function () {
        var _self = this;
        _self.id = _self.$route.params.id || '';
        lanTool.updateLanVersion();
        //弹框选中控件初始化
        tool.InitiateInfoPageControl(_self, _self.id, function () {
            _self.QueryPost();
        });
    },
    beforeRouteLeave: function (to, from, next) {
        //若从详情页回到论坛列表，则刷新论坛列表，
        //详情页可能操作了点赞，回帖，结帖，删帖等操作
        if (to.name == 'forumlist') {
            this.$store.commit('REMOVE_ITEM', 'forumlist');
        }
        next();
    },
    methods: {
        //查询帖子详情
        QueryPost: function () {
            let _self = this;
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_PostQuerySingle;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: _self.id
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
                    _self.noData = false;
                    data = data._OnlyOneData || {};
                    console.log(data);
                    // console.log("data>>>>" + JSON.stringify(data));

                    //处理帖子标签
                    var tarName = data.TagName || "";
                    var tarNameArray = new Array();
                    if (!tool.isNullOrEmptyObject(tarName)) {
                        var tarNameArrayTemp = tarName.split(",");
                        for (var i = 0; i < tarNameArrayTemp.length; i++) {
                            var obj = {
                                AutoID: tarNameArrayTemp[i],
                                TagName: tarNameArrayTemp[i],
                            };
                            tarNameArray.push(obj);
                        }
                    }
                    data.TagNameList = tarNameArray;
                    _self.infoDataList = data;
                    //控制编辑按钮逻辑
                    var isCanEdit = (data["IsCanEdit"] || "false").toString();
                    isCanEdit = $.trim(isCanEdit.toLowerCase());

                    // "已关闭", "Status_ID": 71,
                    //  "进行中", "Status_ID": 70,
                    if(data.Status_ID == "70" && isCanEdit == 'true'){
                        _self.isClose = false;
                    }else{
                        _self.isClose = true;
                    }
                    if(data.Status_ID == "71"){
                        _self.isEdit = false;
                    }else{
                        _self.isEdit = true;
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
        //发送事件
        sendClick: function () {
            let _self = this;
            var sendObj = $("#sendBtn");
            if (!sendObj.hasClass("active")) {
                return false;
            }

            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_ReplyPostSaveOrUpdate;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                ParentID: _self.id,
                HtmlContent: $("textarea.replyContent").val() || "",
                Content: $("textarea.replyContent").val() || "",
                AutoID: -1,
            };
            //console.log(jsonDatasTemp);
            var loadingIndexClassName = tool.showLoading();
            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    try {
                        tool.hideLoading(loadingIndexClassName);
                        data = tool.jObject(data);
                        if (data._ReturnStatus == false) {
                            tool.showText(tool.getMessage(data));
                            return true;
                        }

                        //重新查询当前记录
                        _self.QueryPost();
                    } catch (err) {
                        tool.hideLoading(loadingIndexClassName);
                        console.log(err);
                    } finally {

                    }
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //回复点击事件
        replyAskClick: function () {

            $(".replyDiv").show().find("textarea#ask").val("");
            $('textarea#ask').focus();
            $('textarea#ask').off('blur').on('blur', function () {
                setTimeout(() => {
                    // console.log('blur');
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
        //返回
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
                tagID: tagID,
                postID: postID,
                forumTitle: forumTitle,
                content: content,
            };
            this.$router.push({
                path: '/forumposting',
                query: parameter
            });
        },
        //关闭事件
        closeClick: function () {
            var _self = this;
            var id = _self.id;
            //清空数据
            $("[data-field='Result'").val("").attr("data-fieldVal", "").trigger('change');
            //显示弹框
            $('#closeThis').show();

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click', function () {
                $('#closeThis').hide();
            });

            //确定
            $('#closeThis').find('a.btn-ok').off('click').on('click', function () {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_ForumHandle_PostClose;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode()
                };
                jsonDatasTemp["Result"] = $("[data-field='Result'").attr("data-fieldVal") || "";
                jsonDatasTemp["AutoID"] = id;

                //console.log(jsonDatasTemp);
                var loadingIndexClassName = tool.showLoading();
                $.ajax({
                    async: true,
                    type: "post",
                    url: urlTemp,
                    data: jsonDatasTemp,
                    success: function (data) {
                        try {
                            tool.hideLoading(loadingIndexClassName);
                            data = tool.jObject(data);
                            if (data._ReturnStatus == false) {
                                tool.showText(tool.getMessage(data));
                                return true;
                            }

                            //隐藏弹窗
                            $('#closeThis').hide();

                            //重新查询当前记录
                            _self.QueryPost();
                        } catch (err) {
                            tool.hideLoading(loadingIndexClassName);
                            console.log(err);
                        } finally {

                        }
                    },
                    error: function (jqXHR, type, error) {
                        console.log(error);
                        tool.hideLoading(loadingIndexClassName);
                        return true;
                    },
                    complete: function () {
                        //隐藏虚拟键盘
                        document.activeElement.blur();
                    }
                });
            });
        },
        //删除帖子
        delClick: function () {
            let _self = this;
            tool.showConfirm(
                lanTool.lanContent("593_您确定要删除数据吗？"),
                function () {
                    var urlTemp = tool.AjaxBaseUrl();
                    var controlName = tool.Api_ForumHandle_PostDelete;
                    var autoIDArray = new Array();
                    autoIDArray.push(_self.id);
                    //传入参数
                    var jsonDatasTemp = {
                        CurrentLanguageVersion: lanTool.currentLanguageVersion,
                        UserName: tool.UserName(),
                        _ControlName: controlName,
                        _RegisterCode: tool.RegisterCode(),
                        AutoID: JSON.stringify(autoIDArray)
                    };
                    //console.log(jsonDatasTemp);
                    var loadingIndexClassName = tool.showLoading();
                    $.ajax({
                        async: true,
                        type: "post",
                        url: urlTemp,
                        data: jsonDatasTemp,
                        success: function (data) {
                            try {
                                tool.hideLoading(loadingIndexClassName);
                                data = tool.jObject(data);
                                if (data._ReturnStatus == false) {
                                    tool.showText(tool.getMessage(data));
                                    return true;
                                }

                                //返回列表页
                                _self.$router.back(-1);
                            } catch (err) {
                                tool.hideLoading(loadingIndexClassName);
                                console.log(err);
                            } finally {

                            }
                        },
                        error: function (jqXHR, type, error) {
                            console.log(error);
                            tool.hideLoading(loadingIndexClassName);
                            return true;
                        },
                        complete: function () {
                            //隐藏虚拟键盘
                            document.activeElement.blur();
                        }
                    });
                },
                function () {}
            );
        }
    }
}
</script>

<style>
body {
    margin: 0px !important;
}
.vue-html5-editor>.toolbar>ul{
  border-bottom: none!important;
}
.vue-html5-editor>.toolbar::before{
  height: 0;
}
.vue-html5-editor .content{
    min-height: 80px !important;
}
</style>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";
@import "../../assets/css/forum/ForumInfo.css";
.vue-html5-editor{
  border: none;
}
</style>
