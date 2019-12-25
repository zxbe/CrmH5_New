<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="setAllRead()" class="calcfont calc-Share right"></a>
        <a @click="clearAll()" class="calcfont calc-qingkong right"></a>

        <a @click="back()" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
    </header>

    <div class="page-content">

        <div v-show="!notData" id="list" class="notification-list">

            <div v-for="item in listData" :key="item.AutoID" class="item f14">
                    <!-- 申请联系人访问权限 -->
                    <div :class="{'alreadyRead':item.IsOpen==true}">
                        <div class="item-title">{{item.Theme}}</div>
                        <div v-if="item.FromType!='6'" class="item-div">
                            <span>{{titleLV}}</span>
                            <div class="item-div-text">{{item.Title}}</div>
                        </div>
                        <div v-else-if="item.FromType=='6'" class="item-div">
                            <span>{{companyLV}}</span>
                            <div class="item-div-text">{{item.Title}}</div>
                        </div>
                        <div v-if="item.FromType=='8'" class="item-div">
                            <span>{{timeLV}}</span>
                            <div class="item-div-text">{{item.AddTime |abdDateFormat('dd/MM/yyyy HH:mm')}}</div>
                        </div>
                        <div v-if="item.FromType=='9'" class="item-div">
                            <span>{{remarkLV}}</span><span>{{item.Remark}}</span>
                        </div>
                        <div v-if="item.FromType=='6'" class="item-div">
                            <span>{{contactLV}}</span><span>{{item.Remark}}</span>
                        </div>
                        <div v-if="item.FromType=='8'" class="item-div">
                            <span>{{meetingLV}}</span><span>{{item.Remark}}</span>
                        </div>
                        <div class="btn-div-box">
                            <div v-if="item.IsOpen==true" class="btn-div has-shear">{{alreadySharedLV}}</div>
                            <div v-else  @click="shareData(item)" class="btn-div">{{agreeLV}}</div>

                        </div>
                    </div>

            </div>
        </div>
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
            title: lanTool.lanContent('1000558_数据访问请求'),
            listData: [],
            notData: true, //没数据
            titleLV: lanTool.lanContent("862_标题"),
            companyLV: lanTool.lanContent("995_公司"),
            timeLV: lanTool.lanContent("863_时间"),
            remarkLV: lanTool.lanContent("864_备忘"),
            contactLV: lanTool.lanContent("996_联系人"),
            meetingLV:lanTool.lanContent("1000441_目标"),
            viewLV: lanTool.lanContent("865_查看"),
            agreeLV:lanTool.lanContent("1000492_分享数据"),
            alreadySharedLV:lanTool.lanContent("1000569_已分享"),


        }
    },
    created: function () {},
    mounted: function () {
        // lanTool.updateLanVersion();
        //查询消息列表
        this.getMessageList();
    },
    methods: {
        back: function () {
            this.$router.back(-1);
        },
        //查询消息列表
        getMessageList: function () {
            var _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_QueryDataAccessRequest;
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

                    if (tool.isNullOrEmptyObject(_self.listData) || _self.listData.length <= 0) {
                        _self.notData = true;
                    } else {
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
        //清空所有
        clearAll: function () {
            var _self = this;
            var allDataArr = _self.listData || [];
            if (tool.isNullOrEmptyObject(allDataArr) || allDataArr.length <= 0) {
                return;
            }
            var autoIDArr = [];
            for (var i = 0; i < allDataArr.length; i++) {
                autoIDArr.push(allDataArr[i]["AutoID"] || "");
            }

            tool.showConfirm(
                lanTool.lanContent("998_您确定要清除全部消息吗？"),
                function () {
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
                function () {}
            );
        },
        //跳转到详情
        goInfoPage: function (data) {
            var _self = this;
            var fromID = data["FromID"] || "";
            if (tool.isNullOrEmptyObject(fromID)) {
                return;
            }
            var infoName = "";
            var url = "";
            var fromType = data["FromType"] || "";
            if (tool.isNullOrEmptyObject(fromID)) {
                return;
            }
            var parameter = {};
            //FromType_ViewBaseCompanyContacts=>6
            //FromType_ViewBaseCompanyBaseInf=>7
            //FromType_DtbBusinessSchedule=>8
            //FromType_DtbBusinessOpportunityInf=>9
            //FromType_Document=>18
            //FromType_MeetingNote=>40
            if (fromType == "6") {
                infoName = data["Remark"] || "";
                url = "/contactsinfo/" + fromID;
            } else if (fromType == "7") {

            } else if (fromType == "8") {
                infoName = data["Title"] || "";
                url = "/meetinginfo/" + fromID;
            } else if (fromType == "9") {
                infoName = data["Title"] || "";
                url = "/opportunitiesinfo/" + fromID;
                var businessTypes = data["BusinessTypes"] || "";
                var showPage = 0;
                //OpportunityBusinessTypes_Deal=>29
                //OpportunityBusinessTypes_Opportunity=>30
                if (businessTypes == 29) {
                    showPage = 0;
                } else {
                    showPage = 1;
                }
                parameter["showPage"] = showPage;
            }

            //设置记录为已读
            _self.setCurRead(data);

            parameter["infoName"] = infoName;
            //页面跳转
            _self.$router.push({
                path: url,
                query: parameter
            });
        },
        //标志已读
        setAllRead: function () {
            var _self = this;
            var allDataArr = _self.listData || [];
            if (tool.isNullOrEmptyObject(allDataArr) || allDataArr.length <= 0) {
                return;
            }
            var autoIDArr = [];
            for (var i = 0; i < allDataArr.length; i++) {
                autoIDArr.push(allDataArr[i]["AutoID"] || "");
            }

            tool.showConfirm(
                lanTool.lanContent("1000070_是否确定执行批量共享？"),
                function () {
                    _self.dataAccessRequestBatchShareAndSetRead(autoIDArr, true);
                },
                function () {

                }
            );
        },
        //批量分享数据并设置消息状态
        //isRefresh:是否刷新列表
        dataAccessRequestBatchShareAndSetRead:function(autoIDArray,isRefresh){
            isRefresh = (isRefresh == null || isRefresh == undefined) ? true : isRefresh;
            if (tool.isNullOrEmptyObject(autoIDArray) || autoIDArray.length<=0) {
                return;
            }

            var _self = this;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MessagesToUserHandle_DataAccessRequestBatchShareAndSetRead;
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
                    if (isRefresh) {
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
        //设置指定的记录为已读
        setCurRead: function (data) {
            var _self = this;
            var autoIDArray = [];
            autoIDArray.push(data["AutoID"] || "");
            _self.setReadExe(autoIDArray, true);
        },
        //执行记录设置为已读
        //isRefresh:是否刷新列表
        setReadExe: function (autoIDArray, isRefresh) {
            if (tool.isNullOrEmptyObject(autoIDArray)) {
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
                    if (isRefresh) {
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
        //同意分享数据
        shareData(data){
          let _self = this;
          //console.log(data);
          if(tool.isNullOrEmptyObject(data)){
              return;
          }

          //备份原对象
          var dataPre = tool.DeepClone(data);

          var urlTemp = tool.AjaxBaseUrl();
          var controlName = tool.Api_DataShareInfHandle_SaveOrUpdate;
          //传入参数
          var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            FromType: data.FromType||"",
            FromID: data.FromID||"",
            ToTargetID : data.ToTargetID || "",
            IsGroup : false
          };

        //   console.log(jsonDatasTemp);
        //   return;

          var loadingIndexClassName = tool.showLoading();
          $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function(data) {
              tool.hideLoading(loadingIndexClassName);
              data = tool.jObject(data);
              // console.log(data);
              if (data._ReturnStatus == false) {
                tool.showText(tool.getMessage(data));
                console.log(tool.getMessage(data));
                return true;
              }

              tool.showText(lanTool.lanContent("1000563_分享成功"));

              //设置记录为已读
              _self.setCurRead(dataPre);
            },
            error: function(jqXHR, type, error) {
              if (curPageNum == 0) {
                _self.noUserData = true;
              } else {
                _self.noGroupData = true;
              }
              console.log(error);
              tool.hideLoading(loadingIndexClassName);
              return true;
            },
            complete: function() {
              //tool.hideLoading();
              //隐藏虚拟键盘
              document.activeElement.blur();
            }
          });

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

/*列表*/
.notification-list {}

.notification-list .item {
    border-bottom: 1px solid beige;
    padding: 5px 10px;
    line-height: 1.3;
}

.notification-list .alreadyRead {
    opacity: 0.7;
}
.btn-div-box{padding:0.1rem 0;}
.btn-div{display: inline-block;padding:0.1rem 0.2rem;background: #1775cc;color:#FFFFFF;border-radius: 0.05rem;}
.has-shear{background: #cccccc;}

/*已读*/
.notification-list .item-title {
    font-weight: 600;
    padding-bottom: 5px;
}

.notification-list .item-div {
    padding: 2px 0;
}

.notification-list .item-div-text {
    display: inline-block;
}
</style>
