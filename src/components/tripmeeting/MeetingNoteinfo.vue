<template>
<div>

    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :notDelete="notDelete" :operation="operation" :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box">
            <div class="meetingNoteList">

                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-huiyi"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="818_会议"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <div type="text" data-field="ScheduleID" data-fieldControlType="selectList" data-lanid="818_会议" data-fieldVal="" Code="DropDowList_Meeting" Filter="" data-selectType="radio" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <div class="ListCell">
                    <div class="ListCellLeftIcon"><span class="calcfont"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="712_开始时间"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input id="startdate" type="text" data-field="BeginTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText"/>
                        </div>
                            <div class="ListCellRightIcon"><span class="calcfont"></span></div>
                        </div>
                    </div>

                    <div class="ListCell">
                        <div class="ListCellLeftIcon"><span class="calcfont"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="713_结束时间"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <input id="enddate" type="text" data-field="EndTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText"/>
                        </div>
                                <div class="ListCellRightIcon"><span class="calcfont"></span></div>
                            </div>
                        </div>

                        <div class="ListCell">
                            <div class="ListCellLeftIcon"><span class="calcfont"></span></div>
                            <div class="ListCellContent">
                                <div class="ListCellContentLeft leftContent">
                                    <div class="ListCellContentLeftText lanText" data-lanid="814_对内/对外"></div>
                                </div>
                                <div class="ListCellContentRight rightContent">
                                    <input type="text" data-field="MeetingType" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
                        </div>
                                    <div class="ListCellRightIcon"><span class="calcfont"></span></div>
                                </div>
                            </div>

                            <div class="ListSpecialCell" id="CompanyIDClickObj">
                                <div class="ListSpecialCellField">
                                    <div class="ListSpecialCellLeftIcon"><span class="calcfont"></span></div>
                                    <div class="ListSpecialCellFieldContent lanText" data-lanid="790_公司"></div>
                                    <div class="ListSpecialCellRightIcon"><span class="calcfont"></span></div>
                                </div>
                                <div class="ListSpecialCellContent" data-field="CompanyID" data-fieldcontroltype="selectList" data-lanid="790_公司" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInfHasContact" typevalue="" data-clickObj="CompanyIDClickObj"></div>
                            </div>

                            <div class="ListCell">
                                <div class="ListCellLeftIcon"><span class="calcfont"></span></div>
                                <div class="ListCellContent">
                                    <div class="ListCellContentLeft leftContent">
                                        <div class="ListCellContentLeftText lanText" data-lanid="630_联系人"></div>
                                    </div>
                                    <div class="ListCellContentRight rightContent">
                                        <div type="text" data-field="ContactsID" data-fieldControlType="linkSelectList" data-lanid="630_联系人" data-fieldVal="" Code="DropDowList_ViewBaseCompanyContactsByCompany" Filter="" data-selectType="radio" class="ListCellContentRightText" />
                                    </div>
                                    <div class="ListCellRightIcon"><span class="calcfont"></span></div>
                                </div>
                            </div>

                            <div class="ListCell">
                                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                                <div class="ListCellLeftText">
                                    <p class="textareaP">
                                        <textarea data-field="Remark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                                    </p>
                                </div>
                            </div>

                            <div class="ListSpecialCell visible" id="OppIDClickObj">
                                <div class="ListSpecialCellField">
                                    <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-yewujihui"></span></div>
                                    <div class="ListSpecialCellFieldContent lanText" data-lanid="832_关联于商业"></div>
                                    <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                                </div>
                                <div class="ListSpecialCellContent" data-field="OppID" data-fieldcontroltype="linkedPage" data-lanid="832_关联于商业" data-fieldval="" data-selecttype="radio" code="DropDowList_Opportunity" typevalue="" data-clickObj="OppIDClickObj"></div>
                            </div>

                        </div>

                        <Uploadfile ref="uploadfile" v-show="!isAddNew" :fileListData="fileListData" :fromID="fromIDNew" :fromType="fromTypeNew" :scheduleID="scheduleIDNew"></Uploadfile>

                        <Infofooter v-show="!isAddNew"> </Infofooter>
                    </div>
                </div>
            </div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
import Infofooter from '@/components/customPlugin/infoFooter'
import Uploadfile from '@/components/documentModule/Uploadfile'

export default {
    name:'meetingNoteinfo',
    components: {
        Infoheader,
        Infofooter,
        Uploadfile,
    },
    data() {
        return {
            ptitle: lanTool.lanContent("1001_会议记录详情"),
            isAddNew: false, //是否添加新纪录
            operation: false, //控制详情页header按钮，ture:显示可操作，false:隐藏
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示
            notDelete:true, //控制头部删除按钮 true:不显示

            oppID: "", //销售机会ID
            scheduleID: "", //会议ID
            fileListData: [], //文件列表
            fromIDNew: "", //当前记录ID
            fromTypeNew: "", //来源类型
            scheduleIDNew:"",//会议ID
            id:''
        }
    },

    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'meetingNoteinfo');
        _self.ptitle = this.$route.query.infoName || lanTool.lanContent('1001_会议记录详情');
        _self.id = _self.$route.params.id;
        _self.oppID = _self.$route.query.OppID;
        _self.fromIDNew = _self.$route.query.OppID;
        _self.scheduleID = _self.$route.query.ScheduleID;
        _self.scheduleIDNew = _self.$route.query.ScheduleID;

        _self.onlyView = (_self.$route.query.onlyView == "true" || _self.$route.query.onlyView == true) ? true : false;
    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        let fromType = "MeetingNoteinfo";

        //渲染textarea
        $("textarea").each(function (index, cur) {
            $(cur).height('25');
            tool.autoTextarea(cur);
        });

        _self.controlEdit();
        _self.fromTypeNew = "9";
        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            _self.isAddNew = true;
        } else {
            _self.isAddNew = false;
        }

        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {

            //控制控件逻辑
            _self.controlBusinessTypes();

            //处理OppID
            _self.handleOppID(_self.oppID, true,false);
            //处理ScheduleID
            _self.handleScheduleID(_self.scheduleID, true);

            //渲染数据
            tool.IniInfoData(fromType, _self.id, function (data) {

                _self.scheduleIDNew = data["ScheduleID"]||"";

                //渲染文件列表
                _self.iniDocList(data);

                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height('25');
                    tool.autoTextarea(cur);
                });

                //场景：当在selectList页面按刷新按钮再回到详情页
                _self.updateSelectlist();

            });
        })

    },
    activated: function () {
        let _self = this;
        _self.updateSelectlist();
        //返回时更新selectlist控件的结果
        // tool.UpdateFieldValueFromBack(eventBus, function(){
        //     //清空全局变量
        //     eventBus.selectListData = null;
        // })

    },
    methods: {
        //更新selectlist控件
        updateSelectlist:function(callback){
            let _self = this;
            if (tool.isNullOrEmptyObject(eventBus.selectListData)) {
                return;
            }
            //更新selectlist控件的结果
            var filedName = eventBus.selectListData.field;
            var idTemp = eventBus.selectListData.value.id || "";
            if (filedName == "ScheduleID") {
                _self.handleScheduleID(idTemp, false);
            } else {
                _self.handleOppID(idTemp, false,true);
            }
            //清空全局变量
            eventBus.selectListData = null;

            if (!tool.isNullOrEmptyObject(callback)) {
                callback();
            }
        },

        //控制控件逻辑
        controlBusinessTypes: function () {
            var _self = this;
            $("[data-field='BeginTime'],[data-field='EndTime'],[data-field='MeetingType'],[data-field='CompanyID'],[data-field='ContactsID'],#CompanyIDClickObj")
                .addClass('disable');
        },
        //处理OppID存在的逻辑
        handleOppID: function (oppID, isLock,fromSelectList) {
            isLock = (isLock == undefined || isLock == null) ? false : isLock;
            var _self = this;
            //清空选项
            if (tool.isNullOrEmptyObject(oppID) && fromSelectList != undefined && fromSelectList != null && fromSelectList == true) {

                if (isLock) {
                    $("#OppIDClickObj,[data-field='OppID']").removeClass('disable color6').addClass('disable color6');
                } else {
                    $("#OppIDClickObj,[data-field='OppID']").removeClass('disable color6');
                }

                //2>清空销售机会
                $("[data-field='OppID']").text("").attr("data-fieldval", "");
                return;
            }else{
                if(tool.isNullOrEmptyObject(oppID)){
                    return;
                }
            }
            var autoID = oppID;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_OpportunityHandle_QuerySingle;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: autoID
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
                        return true;
                    }
                    data = data._OnlyOneData || [];
                    // console.log(data);

                    //1>锁定销售机会设置为不可操作
                    if (isLock) {
                        $("#OppIDClickObj,[data-field='OppID']").removeClass('disable color6').addClass('disable color6');
                    } else {
                        $("#OppIDClickObj,[data-field='OppID']").removeClass('disable color6');
                    }

                    //2>销售机会赋值
                    $("[data-field='OppID']").text(data["TheName"] || "").attr("data-fieldval", data["AutoID"] || "");
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //处理handleScheduleID存在的逻辑
        handleScheduleID: function (scheduleID, isLock) {
            isLock = (isLock == undefined || isLock == null) ? false : isLock;
            var _self = this;
            if (tool.isNullOrEmptyObject(scheduleID)) {
                return;
            }
            var autoID = scheduleID;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MeetingHandle_QuerySingle;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: autoID
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
                        return true;
                    }

                    data = data._OnlyOneData || [];

                    //1>会议记录字段赋值
                    //1-1>ScheduleID
                    var _curObj = $("[data-field='ScheduleID']");
                    if (isLock) {
                        _curObj.removeClass('disable').addClass('disable').closest('.ListCellContent').addClass('color6');
                    } else {
                        _curObj.removeClass('disable').closest('.ListCellContent').removeClass('color6');
                    }

                    _curObj.text(data["MeetingTitle"] || "").attr("data-fieldval", data["AutoID"] || "");

                    _self.scheduleIDNew = data["AutoID"]||"";

                    //1-2>MeetingTitle
                    _curObj = $("[data-field='MeetingTitle']");
                    _curObj.val(data["MeetingTitle"] || "");
                    //1-3>BeginTime
                    _curObj = $("[data-field='BeginTime']");
                    var fieldVal = data["BeginTime"] || "";
                    var format = _curObj.attr("data-format") || "";
                    if (!tool.isNullOrEmptyObject(format) && !tool.isNullOrEmptyObject(fieldVal)) {
                        fieldVal = fieldVal.ReplaceAll("T", " ");
                        fieldVal = tool.ChangeTimeFormat(fieldVal, format);
                    }
                    _curObj.val(fieldVal);
                    //1-4>EndTime
                    _curObj = $("[data-field='EndTime']");
                    fieldVal = data["EndTime"] || "";
                    format = _curObj.attr("data-format") || "";
                    if (!tool.isNullOrEmptyObject(format) && !tool.isNullOrEmptyObject(fieldVal)) {
                        fieldVal = fieldVal.ReplaceAll("T", " ");
                        fieldVal = tool.ChangeTimeFormat(fieldVal, format);
                    }
                    _curObj.val(fieldVal);
                    //1-5>EndTime
                    _curObj = $("[data-field='EndTime']");
                    fieldVal = data["EndTime"] || "";
                    format = _curObj.attr("data-format") || "";
                    if (!tool.isNullOrEmptyObject(format) && !tool.isNullOrEmptyObject(fieldVal)) {
                        fieldVal = fieldVal.ReplaceAll("T", " ");
                        fieldVal = tool.ChangeTimeFormat(fieldVal, format);
                    }
                    _curObj.val(fieldVal);
                    //1-6>MeetingType
                    _curObj = $("[data-field='MeetingType']");
                    _curObj.val(data["MeetingType_Name"] || "").attr("data-fieldval", data["MeetingType"] || "");
                    //1-7>CompanyID
                    _curObj = $("[data-field='CompanyID']");
                    _curObj.text(data["CompanyID_Name"] || "").attr("data-fieldval", data["CompanyID"] || "");
                    //1-8>ContactsID_Name
                    _curObj = $("[data-field='ContactsID']");
                    _curObj.text(data["ContactsID_Name"] || "").attr("data-fieldval", data["ContactsID"] || "");

                    //调用子组件的方法重新渲染文档列表
                    _self.$refs.uploadfile.initDocList();
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //渲染文件列表
        iniDocList: function (data) {
            var _self = this;
            if (tool.isNullOrEmptyObject(data)) {
                return;
            }

            _self.fileListData = data["DocList"] || [];
            _self.controlEdit();
        },
        //只查看的情况 控制元素是否可修改
        controlEdit: function () {
            var _self = this;
            if (_self.onlyView) {
                  $('.meetingNoteList').addClass('disable');
                  _self.$refs.uploadfile.controlDelete(_self.onlyView);
              } else {
                  $('.meetingNoteList').removeClass('disable');
                  _self.$refs.uploadfile.controlDelete(_self.onlyView);
              }
        },
        //保存
        savePageData: function (e) {

            var _self = this;
            let newOppID = $('[data-field="OppID"]').attr('data-fieldval') || '';
            if(tool.isNullOrEmptyObject(newOppID)){
                return;
            }

            var fromType = "MeetingNoteinfo";
            tool.SaveOrUpdateData(fromType, _self.id, _self, function (dataTemp) {

                tool.topTipSuccess(tool.getMessage(dataTemp),function(){
                    var autoIDTemp = dataTemp._OnlyOneData || "";
                    //如果不是新增保存后返回上一页，新增保存就在当前页刷新
                    if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) > 0) {
                        _self.$store.commit('REMOVE_ITEM', 'meetingNoteinfo');
                        _self.$router.back(-1);
                        return;
                    }
                    var path = "/MeetingNoteinfo/" + autoIDTemp;
                    var query = _self.$route.query;
                        query.OppID = newOppID;
                    _self.$store.commit('REMOVE_ITEM', 'meetingNoteinfo');

                    _self.$router.replace({
                        path: path,
                        query: query
                    });
                    //保证地址替换后再刷新
                    setTimeout(function(){
                        window.location.reload();
                    },80);
                });

            },false);

        },

    },
    beforeRouteLeave:function(to, from, next){
        if(to.name == 'meetinginfo' ){
            this.$store.commit('REMOVE_ITEM', 'meetingNoteinfo');
        }
        next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/commonInfo.css";

.busOpportunities {
    margin: 10px 0;
}

.busOpportunities .ListCellContentLeftText {
    font-weight: 700;
}

.busOpportunities .leftContent {
    width: calc(80% - 0.32rem) !important;
}

.busOpportunities .rightContent {
    width: 20% !important;
}

.ListCellContentRight.rightContent {
    text-align: right;
}
</style>
