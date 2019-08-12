<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="setAllRead()" class="calcfont calc-yidu right"></a>
        <a @click="clearAll()" class="calcfont calc-qingkong right"></a>

        <a @click="back()" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
    </header>
    <div class="page-content">
     <ul v-show="!notData" v-for="item in listData" :key="item.AutoID" class="forumMessageList" :class="{'alreadyRead':item.IsOpen==true}">
            <li>
                <a class="forumMessage" :key="item.dataId" @click="goInfoPage(item)">
                    <div class="headImg"><img src="../../assets/images/default_user_img.png" alt=""></div>
                    <h4>
                        <div class="postingTitle">{{item.Theme}}</div>
                    </h4>
                    <div class="postingContent">{{item.Content}}</div>
                    <div>
                        <span class="userName pullLeft">{{item.UserName}}</span>
                        <span class="postingTime pullRight"><i class="calcfont calc-shijian"></i>{{item.PostTime|MeetingTimeFormat}}</span>
                    </div>
                </a>
            </li>
        </ul>
        <nothing v-show="notData" style="padding-top:0.8rem;"></nothing>
    </div>
</div>
</template>

<script>
import Nothing from "@/components/customPlugin/Nothing"
export default {
    components: {
        'nothing': Nothing
    },
    data() {
        return {
            title: lanTool.lanContent('1000283_论坛消息'),
            notData: false,
            listData: [
            //     {
            //     imgUrl: "",
            //     title: "python--爬虫--爬虫学习路线指南",
            //     content: "爬虫是入门Python最好的方式，没有之一。Python有很多应用的方向，比如后台开发、web开发、科学计算等等，但爬虫对于初学者而言更友好，原理简单，几行代码就能实现基本的爬虫，学习的过程更加平滑，你能体会更大的成就感。",
            //     userName: "aoniruan阮毅文",
            //     dateTime: "2019-07-31 18:20",
            //     dataId:"1"
            // }, {
            //     imgUrl: "",
            //     title: "python--爬虫--爬虫学习路线指南",
            //     content: "爬虫是入门Python最好的方式，没有之一。Python有很多应用的方向，比如后台开发、web开发、科学计算等等，但爬虫对于初学者而言更友好，原理简单，几行代码就能实现基本的爬虫，学习的过程更加平滑，你能体会更大的成就感。",
            //     userName: "aoniruan阮毅文",
            //     dateTime: "2019-07-31 19:30",
            //     dataId:"2"
            // }, {
            //     imgUrl: "",
            //     title: "python--爬虫--爬虫学习路线指南",
            //     content: "爬虫是入门Python最好的方式，没有之一。Python有很多应用的方向，比如后台开发、web开发、科学计算等等，但爬虫对于初学者而言更友好，原理简单，几行代码就能实现基本的爬虫，学习的过程更加平滑，你能体会更大的成就感。",
            //     userName: "aoniruan阮毅文",
            //     dateTime: "2019-07-31 20:20",
            //     dataId:"3"
            // }
            ],
        }
    },
    created: function () {

    },
    mounted: function () {
        lanTool.updateLanVersion();
        //查询消息列表
        this.getMessageList();
    },
    methods: {
        back: function () {
            this.$router.back(-1);
        },
        //查询消息列表
        getMessageList:function(){
            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_QueryPostMsgList;
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
                    // console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        _self.notData = true;
                        return;
                    }

                    _self.listData = data._OnlyOneData.Rows || [];
                    if(tool.isNullOrEmptyObject(_self.listData) || _self.listData.length<=0){
                        _self.notData = true;
                    }else{
                        _self.notData = false;
                    }

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
        //标志已读
        setAllRead: function () {
            var _self = this;
            var allDataArr = _self.listData||[];
            if(tool.isNullOrEmptyObject(allDataArr) || allDataArr.length<=0){
                return;
            }
            var autoIDArr = [];
            for(var i =0;i<allDataArr.length;i++){
                autoIDArr.push(allDataArr[i]["AutoID"] || "");
            }

            tool.showConfirm(
                lanTool.lanContent("997_您确定要将全部消息设置为已读吗？"),
                function() {
                    _self.setReadExe(autoIDArr,true);
                },
                function() {}
            );
        },
        //设置指定的记录为已读
        setCurRead:function(data){
            var _self = this;
            var autoIDArray = [];
            autoIDArray.push(data["AutoID"]||"");
            _self.setReadExe(autoIDArray,true);
        },
        //执行记录设置为已读
        setReadExe:function(autoIDArray,isRefresh){
            if(tool.isNullOrEmptyObject(autoIDArray)){
                return;
            }

            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_SetRead;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: JSON.stringify(autoIDArray)
            };

            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    data = tool.jObject(data);
                    // console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        //_self.notData = true;
                        //return;
                    }

                    //若需要刷新列表
                    if(isRefresh){
                        _self.getMessageList();
                    }
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
        clearAll: function () {
            var _self = this;
            var allDataArr = _self.listData||[];
            if(tool.isNullOrEmptyObject(allDataArr) || allDataArr.length<=0){
                return;
            }
            var autoIDArr = [];
            for(var i =0;i<allDataArr.length;i++){
                autoIDArr.push(allDataArr[i]["AutoID"]||"");
            }

            tool.showConfirm(
                lanTool.lanContent("998_您确定要清除全部消息吗？"),
                function() {
                    //请求地址
                    var urlTemp = tool.AjaxBaseUrl();
                    var controlName = tool.Api_MessagesToUserHandle_SetDisabled;
                    //传入参数
                    var jsonDatasTemp = {
                        CurrentLanguageVersion: lanTool.currentLanguageVersion,
                        UserName: tool.UserName(),
                        _ControlName: controlName,
                        _RegisterCode: tool.RegisterCode(),
                        AutoID: JSON.stringify(autoIDArr)
                    };

                    $.ajax({
                        async: true,
                        type: "post",
                        url: urlTemp,
                        data: jsonDatasTemp,
                        success: function (data) {
                            data = tool.jObject(data);
                            // console.log(data);
                            if (data._ReturnStatus == false) {
                                tool.showText(tool.getMessage(data));
                                console.log(tool.getMessage(data));
                                // _self.notData = true;
                                // return;
                            }

                            //刷新列表
                            _self.getMessageList();
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
                function() {}
            );
        },
        //跳转到详情 TODO逻辑待完善
        goInfoPage:function(data){
            var _self = this;
            var infoName = "";
            var url = "";
            var parameter = {
                "infoName":data["Theme"]||""
            };

            //url = "/contactsinfo/" + fromID;

            //设置记录为已读
            _self.setCurRead(data);
            //页面跳转
            // _self.$router.push({
            //     path: url,
            //     query: parameter
            // });
        }
    }
}
</script>

<style scoped>
/*头部*/
header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
}

header.mui-bar {
    background: #f8f2dc;
    overflow: hidden;
}

.mui-title {
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
    position: absolute;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    line-height: 0.88rem;
}

.calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}

.calc-qingkong {
    margin-right: -10px;
}

header .mui-title,
header a {
    color: #333;
}

.page-content {
    padding-top: 0.88rem;
}

.page-content .forumMessageList {
    position: relative;
    padding: 0;
    margin: 0;
    height: 100%;
}

.page-content .forumMessageList li {
    /* height: auto; */
    list-style-type: none;
}

.page-content .forumMessageList .forumMessage {
    position: relative;
    display: block;
    padding: 0.2rem;
    height: auto;
    border-bottom: 1px solid beige;
    height: 1.3rem;
    /* opacity: 0.7; */
}
.alreadyRead{
    opacity: 0.7;
}
.headImg {
    float: left;
    height: 0.8rem;
    width: 0.8rem;
}

.headImg img {
    width: 100%;
    height: 100%;
}

.postingTitle {
    font-size: 0.28rem;
    padding-left: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.postingContent {
    font-size: 0.24rem;
    padding-left: 10px;
    padding-top: 0.1rem;
    color: #888888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.pullLeft {
    clear: left;
    float: left;
}

.pullRight {
    float: right;
}

.userName,
.postingTime {
    font-size: 0.24rem;
    color: #888888;
    margin-top: 0.3rem;
}

.calc-shijian {
    padding: 0;
    font-size: 0.28rem;
}
.alreadyRead{
    opacity: 0.6;
}
</style>
