<template>
<div>
    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box">
            <div class="MeetingList">
                <!-- 会议标题 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-T"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="MeetingTitle" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="710_标题"></textarea>
                        </p>
                    </div>
                </div>

                <!-- 开始时间 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shijian"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="712_开始时间"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input id="startdate" type="text" data-field="BeginTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 结束时间 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-time"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="713_结束时间"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input id="enddate" type="text" data-field="EndTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 会议类型 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-17"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="715_会议类型"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="MeetingType" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="MeetingType" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 会议性质 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shuxing"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="714_会议性质"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="MeetingNature" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="MeetingNature" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- CAAL -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-woshimaijia2"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000289_CAAL"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="CAAL" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="YesOrNo" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 公司 -->
                <div class="ListSpecialCell visible" id="CompanyIDClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-gongsixinxi"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="790_公司"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="CompanyID" data-fieldcontroltype="selectList" data-lanid="790_公司" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInfHasContact" typevalue="" data-clickObj="CompanyIDClickObj" data-addUrl="/organizationsinfo"></div>
                </div>

                <!-- 联系人 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-kehulianxiren"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="630_联系人"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <div data-field="ContactsID" data-fieldControlType="linkSelectList" data-lanid="630_联系人" data-fieldVal="" Code="DropDowList_ViewBaseCompanyContactsByCompany" Filter="" data-selectType="radio" class="ListCellContentRightText" data-addUrl="/contactsinfo" data-linkIDField="" data-linkNameField="" data-fromType="6" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 是否首次会议 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-zhuanjifenshoucishezhinicheng"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000290_是否首次会议？"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="IsFirstMeeting" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="YesOrNo" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 关联于商业 -->
                <div class="ListSpecialCell" id="OppIDTempClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-yewujihui"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="832_关联于商业"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="OppIDTemp" data-fieldcontroltype="linkedPage" data-lanid="832_关联于商业" data-fieldval="" data-selecttype="radio" code="DropDowList_Opportunity" typevalue="" data-clickObj="OppIDTempClickObj" data-isShowAdd="true" data-fromType="9"></div>
                </div>

                <!-- 状态 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-zhuangtai"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="728_状态"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="CurrentState" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="OAStatus" class="ListCellContentRightText" />
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 与会人员 -->
                <div class="ListSpecialCell" id="ParticipantsClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-huiyi"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="1000288_与会人员"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="Participants" data-fieldcontroltype="selectList" data-lanid="1000288_与会人员" data-fieldval="" data-selecttype="checkbox" code="DropDowList_AccountManager" typevalue="" data-clickObj="ParticipantsClickObj" data-addUrl=""></div>
                </div>

                <!-- 目标 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-mubiao"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Remark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000348_目标"></textarea>
                        </p>
                    </div>
                </div>

                <!-- 会议总结 -->
                <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Summary" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000291_会议总结"></textarea>
                        </p>
                    </div>
                </div>

                <!-- 会议文档 -->
                <DocumentList v-show="!isAddNew" :document-data="documentData" addible="true" deletable="true" :meeting-id="id"></DocumentList>

            </div>

            <Infofooter v-show="!isAddNew"> </Infofooter>

            <!-- <div v-show="accessMeetingNote" class="meetingRecord">
                <div class="ListCell" @click.stop="viewMeetingNote($event)">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-yidu"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="849_查看会议记录"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <div class="ListCellContentRightText"></div>
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
    <InfoRightPanel ref="rightPanel" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID"></InfoRightPanel>
    <!-- 转换为交易弹框 -->
    <div id="transformTo" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1000367_转为商机"></div>

            <div class="elastic-layer-items">

                <div class="elastic-layer-item f14">
                    <span class="calcfont calc-zhuangtai icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="1000353_商机名称"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <textarea data-field="TheName" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000353_商机名称"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="SourceFrom-div" class="elastic-layer-item f14">
                    <span class="calcfont calc-laiyuanqingkuang icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="1000230_机会来源"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text" data-field="SourceFrom" data-lanid="1000230_机会来源" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="SourceFrom" class="ListCellContentRightText" />
                            </div>
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div>

                <div id="SourceFromOther-div">
                    <div class="elastic-layer-item f14">
                        <span class="calcfont calc-qita1 icon-left"></span>
                        <div class="item-right">
                            <div class="item-row border-bottom" style="margin-top:5px;">
                                <textarea data-field="SourceFromOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="IsPublic-div" class="elastic-layer-item f14">
                    <span class="calcfont calc-yidu icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="803_可访问"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text" data-field="IsPublic" data-lanid="803_可访问" data-fieldControlType="picker" data-fieldVal="23" Code="DropDowList_DtbAllTypes" TypeValue="Accessabletype" class="ListCellContentRightText" />
                            </div>
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div>
                <div id="InitiatorClickObj" class="elastic-layer-item  f14" style="display:none">
                    <span class="calcfont calc-fuzerenicon icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="825_负责人"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text" data-field="Initiator" data-lanid="825_负责人" data-fieldControlType="groupSelectList" data-fieldVal="" data-selecttype="checkbox" Code="DropDowList_PopedomTeamVsUser" TypeValue="" data-fromType="8" data-clickObj="InitiatorClickObj" class="ListCellContentRightText" />
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
import Infofooter from '@/components/customPlugin/infoFooter'
import DocumentList from '@/components/documentModule/DocumentList'
import InfoRightPanel from "@/components/customPlugin/InfoRightPanel";

export default {
    name: 'meetinginfo',
    components: {
        Infoheader,
        Infofooter,
        DocumentList,
        InfoRightPanel
    },
    data() {
        return {
            ptitle: 'Meeting detail',
            isShowMenuList: false,
            isAddNew: false, //是否添加新纪录
            operation: false,
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示
            accessMeetingNote: false, //是否可以查看会议模块
            meetingNoticeID: "", //会议记录id
            oppID: "", //deal pipeline/opportunity ID
            defaultDateTime: "", //新建单据时候的初始时间
            id: '', //会议id
            //文档数据
            documentData: [
                //   {
                //     AddTime: "2019-07-31 18:31:00",
                //     AddUserName: "dylanxu",
                //     AutoID: "765411",
                //     FileLength: "54768",
                //     ObjectName: "Project Management - CRM_PC(20190625)_V6_19073118305794.xlsx",
                //     ObjectRemark: "test",
                //   }
            ],
            dealOppID: "",
            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'meetinginfo');
        //从列表获取详情名
        _self.ptitle = _self.$route.query.infoName || lanTool.lanContent("914_添加会议");
        _self.defaultDateTime = _self.$route.query.defaultDateTime || "";
        _self.id = _self.$route.params.id;
        _self.dealOppID = _self.$route.query.dealOppID || "";
        _self.rightPanelFromType = "8";
        _self.rightPanelFromID = _self.$route.params.id || "";

    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);

        var fromType = "Meetinginfo";
        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            _self.isAddNew = true;
            _self.operation = false;
            _self.accessMeetingNote = false;
        } else {
            _self.isAddNew = false;
            _self.operation = true;
        }

        //清空联系人
        $("[data-field='ContactsID']").text("").attr("data-fieldVal", "").off('click');
        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {
            //初始化时间
            _self.initDefaultDateTime();
            //通过DealOppID初始化字段值
            _self.initDefaultFieldValByDealOppOD();

            //渲染textarea
            $("textarea").each(function (index, cur) {
                $(cur).height('25');
                tool.autoTextarea(cur);
            });
            //控制字段显示隐藏
            _self.controlFieldShowOrhide();
            //给状态一个默认值
            if (_self.isAddNew) {
                var textTemp = lanTool.lanContent("1172_准备与会");
                var idTemp = "115";
                var obj = {
                    id: idTemp,
                    text: textTemp
                };
                $("[data-field='CurrentState']")
                    .val(obj.text || "")
                    .attr("data-fieldVal", obj.id)
                    .trigger("change");
            }

            //渲染数据
            tool.IniInfoData(fromType, _self.id, function (data) {
                var fieldval = $('[data-field="CurrentState"]').attr("data-fieldval");
                //状态为完成时，fieldval为116 才能转为商机
                if (fieldval == "116") {
                    var oppIDTemp = data["OppIDTemp"]||"";
                    if(tool.isNullOrEmptyObject(oppIDTemp)){
                        _self.operation = true;
                    }else{
                        _self.operation = false;
                    }
                } else {
                    _self.operation = false;
                }
                //渲染文档列表
                _self.InitDocList(_self.id);

                _self.meetingNoticeID = data["MeetingNoticeID"];

                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height('25');
                    tool.autoTextarea(cur);
                });

                //处理联动字段
                tool.linkageField(_self, 'CompanyID', 'ContactsID');

                //渲染会议记录模块
                _self.initMeetingNote();

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function () {
                    //清空全局变量
                    eventBus.selectListData = null;
                });
            });
        });
    },
    activated: function () {

        //每次进入详情滚动条滚动到顶部
        // $(window).scrollTop(0);
        var _self = this;

        //处理联动字段
        tool.linkageField(_self, 'CompanyID', 'ContactsID');

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function (obj) {
            //    $("[data-field='Initiator'").val("hello world");
            //渲染会议记录模块
            _self.initMeetingNote();

            //清空全局变量
            eventBus.selectListData = null;
        })
    },
    methods: {
        //控制字段显示隐藏
        controlFieldShowOrhide: function () {
            var _self = this;
            //控制data-field="Initiator"显示和隐藏
            $("[data-field='IsPublic']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval == "23") {
                    $("#InitiatorClickObj").hide();
                } else {
                    $("#InitiatorClickObj").show();
                }
            });

            //控制data-field="MatterOther"显示和隐藏
            $("[data-field='SourceFrom']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval == "109") {
                    $("#SourceFromOther-div").show();
                } else {
                    $("#SourceFromOther-div").hide();
                }
            });
        },
        //删除数据
        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Meetinginfo";
            tool.DeleteData(fromType, id, _self, function () {
                _self.$store.commit('REMOVE_ITEM', 'tripmeeting');
            });
        },
        //保存数据
        savePageData: function (e) {
            var _self = this;
            if ($("#startdate").length > 0) {
                //开始日期和结束日期进行对比
                var startdate = $("#startdate").val();
                var enddate = $("#enddate").val();

                var compareAlert = lanTool.lanContent("934_开始日期不能大于或等于结束日期") || "";
                var dateEmptyAlert = lanTool.lanContent("935_开始日期或者结束日期不能为空") || "";

                var tips = lanTool.lanContent('933_温馨提示');
                var sure = lanTool.lanContent("545_确定");

                var d1 = new Date(startdate.replace(/\-/g, "\/"));
                var d2 = new Date(enddate.replace(/\-/g, "\/"));

                //开始日期或者结束日期其中一个为空，一个不为空
                if (tool.isNullOrEmptyObject(startdate) || tool.isNullOrEmptyObject(enddate)) {
                    $.alert(dateEmptyAlert, tips, "", sure);
                    return;
                } else if ((!tool.isNullOrEmptyObject(startdate) && !tool.isNullOrEmptyObject(enddate)) && d1 >= d2) {
                    $.alert(compareAlert, tips, "", sure);
                    return;
                } else {
                    var id = _self.$route.params.id;
                    var fromType = "Meetinginfo";
                    tool.SaveOrUpdateData(fromType, id, _self, function () {
                        _self.$store.commit('REMOVE_ITEM', 'tripmeeting');
                        _self.$store.commit('REMOVE_ITEM', 'meetinginfo');
                        _self.$router.back(-1);
                    });
                }
            }
        },
        //生成
        rightPanelTransformTo: function () {
            console.log("转化为商机");
            var _self = this;
            var id = _self.id;

            //清空控件数据
            $("[data-field='SourceFrom']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='SourceFromOther']").val("");
            $("[data-field='IsPublic']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='Initiator']").val("").attr("data-fieldVal", "").trigger('change');

            // 默认给data-field="Initiator"赋予23(公开)
            var publicObj = tool.GetPublicObj();
            if (!tool.isNullOrEmptyObject(publicObj)) {
                $("[data-field='IsPublic']")
                    .val(publicObj.text || "")
                    .attr("data-fieldVal", publicObj.id)
                    .trigger("change");
            }
            //显示弹框
            $('#transformTo').show();

            //取消
            $('#transformTo').find('a.btn-cancel').off('click').on('click', function () {
                $('#transformTo').hide();
                return;
            })
            //确定
            $('#transformTo').find('a.btn-ok').off('click').on('click', function () {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_MeetingHandle_ChangeToPitch;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode()
                };
                jsonDatasTemp["TheName"] = $("[data-field='TheName']").val() || "";
                jsonDatasTemp["SourceFrom"] = $("[data-field='SourceFrom']").attr("data-fieldVal") || "";
                jsonDatasTemp["SourceFromOther"] = $("[data-field='SourceFromOther']").val() || "";
                jsonDatasTemp["IsPublic"] = $("[data-field='IsPublic']").attr("data-fieldVal") || "";
                jsonDatasTemp["Initiator"] = $("[data-field='Initiator']").attr("data-fieldVal") || "";
                jsonDatasTemp["FromScheduleID"] = id;
                // console.log(jsonDatasTemp);
                // return;

                var loadingIndexClassName = tool.showLoading();

                $.ajax({
                    async: true,
                    type: "post",
                    url: urlTemp,
                    data: jsonDatasTemp,
                    success: function (data) {
                        try {
                            data = tool.jObject(data);
                            if (data._ReturnStatus == false) {
                                tool.hideLoading(loadingIndexClassName);
                                tool.showText(tool.getMessage(data));
                                return true;
                            }
                            data = data._OnlyOneData || {};
                            console.log(data);
                            var dealID = data["AutoID"] || "";
                            var theName = data["TheName"] || "";

                            //构造Pitch详情页的跳转地址
                            var path = "/opportunitiesinfo/" + dealID;
                            var queryParam = {
                                showPage: "1",
                                infoName: theName
                            };
                            //将当前详情页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
                            //将列表页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'businessCategories');

                            //隐藏弹窗
                            $('#transformTo').hide();
                            //调用子组件收起侧滑方法
                            _self.$refs.rightPanel.panelToggle();

                            _self.$router.replace({
                                path: path,
                                query: queryParam
                            });

                            //保证地址替换后再刷新
                            setTimeout(function () {
                                tool.hideLoading(loadingIndexClassName);
                                window.location.reload();
                            }, 80);
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
        //渲染查看会议记录模块
        initMeetingNote: function () {
            var _self = this;
            _self.oppID = $("[data-field='OppIDTemp']").attr('data-fieldval') || '';
            if (tool.isNullOrEmptyObject(_self.meetingNoticeID) || tool.isNullOrEmptyObject(_self.oppID) || Number(_self.id) <= 0) {
                _self.accessMeetingNote = false;
            } else {
                _self.accessMeetingNote = true;
            }
        },
        //跳转到会议记录页面
        viewMeetingNote: function (e) {
            var _self = this;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MeetingHandle_HasToSave;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: _self.id,
                OppID: _self.oppID
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
                    var hasToSave = (data._OnlyOneData.toString().toLowerCase()) || "true";
                    if (hasToSave == "true") {
                        //需要提示用户保存当前数据
                        tool.alert(lanTool.lanContent('1000164_请先保存当前会议！'));
                        return;
                    }

                    //请求成功后执行的操作
                    var target = $(e.target);
                    var url = "/MeetingNoteinfo/" + _self.meetingNoticeID;
                    var infoName = _self.$route.query.infoName || "";

                    var parameter = {
                        OppID: _self.oppID,
                        ScheduleID: _self.id,
                        onlyView: true,
                        infoName: infoName,
                        onlyView: _self.onlyView
                    };
                    _self.$router.push({
                        path: url,
                        query: parameter
                    });

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
            })
        },
        //新建时初始化时间
        initDefaultDateTime: function () {
            var _self = this;
            if (!tool.isNullOrEmptyObject(_self.defaultDateTime)) {
                $("#startdate,#enddate").val(_self.defaultDateTime);
            }
        },
        //渲染文档列表
        InitDocList: function (meetingID) {
            var _self = this;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_DocumentsHandle_Query;

            //清空文档数据
            _self.documentData = [];

            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                FromTypeID: "8",
                FromID: meetingID
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
                        console.log(tool.getMessage(data));
                        return true;
                    }
                    data = data._OnlyOneData || {};
                    _self.documentData = data.Rows || [];
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    return true;
                },
                complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //通过DealOppID初始化字段值
        initDefaultFieldValByDealOppOD: function () {
            let _self = this;
            if (tool.isNullOrEmptyObject(_self.dealOppID)) {
                return false;
            }
console.log(_self.dealOppID);
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_OpportunityHandle_QuerySingle;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: _self.dealOppID
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
                        _self.noData = true;
                        return;
                    }
                    data = data._OnlyOneData || {};
                    console.log(data);

                    //标题
                    $("[data-field='MeetingTitle']").val(data["TheName"] || "");
                    //MeetingType
                    $("[data-field='MeetingType']").val(lanTool.lanContent("1078_机会")).attr("data-fieldVal", "90").trigger('change');
                    //MeetingType
                    $("[data-field='CAAL']").val(lanTool.lanContent("798_是")).attr("data-fieldVal", "20").trigger('change');
                    //CompanyID
                    $("[data-field='CompanyID']").text(data["TargetCompanyID_Name"] || "").attr("data-fieldVal", data["TargetCompanyID"] || "").trigger('change');
                    //ContactsID
                    $("[data-field='ContactsID']").text(data["ContactID_Name"] || "").attr("data-fieldVal", data["ContactID"] || "").trigger('change');
                    //IsFirstMeeting
                    $("[data-field='IsFirstMeeting']").val(lanTool.lanContent("798_是")).attr("data-fieldVal", "20").trigger('change');
                    //CurrentState
                    $("[data-field='CurrentState']").val(lanTool.lanContent("1172_准备与会")).attr("data-fieldVal", "115").trigger('change');
                    //Participants
                    $("[data-field='Participants']").text(data["Initiator_Name"] || "").attr("data-fieldVal", data["Initiator"] || "").trigger('change');
                    //OppIDTemp
                    $("[data-field='OppIDTemp']").text(data["TheName"] || "").attr("data-fieldVal", data["AutoID"] || "").trigger('change');

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
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'tripmeeting' || to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'meetinginfo');
        }
        next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";

.meetingRecord {
    margin: 10px 0;
}

.meetingRecord .ListCellContentLeftText {
    font-weight: 700;

}

.ListCellContentRightText {
    text-align: right;
}

/*关闭交易/商业机会， 转换为交易  弹层*/
.elastic-layer {
    position: fixed;
    z-index: 110;
    display: none;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.elastic-layer-content {
    width: 80%;
    max-width: 300px;
    min-height: 100px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.elastic-layer-title {
    padding: 20px 15px 10px 15px;
    position: relative;
}

.elastic-layer-title::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d5d5d6;
    color: #d5d5d6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}

.elastic-layer-items {
    padding: 9px .3rem 20px;
}

.elastic-layer-item {
    display: flex;
    padding: 9px 0;
    position: relative;
}

.elastic-layer-item .icon-left {
    font-size: .44rem !important;
    margin-right: 5px;
}

.elastic-layer-item .item-right {
    flex: 1;
}

.elastic-layer-item .item-row {
    display: flex;
    align-items: center;
    position: relative;
}

.border-bottom::after {
    position: absolute;
    content: "";
    left: 0rem;
    right: 0rem;
    bottom: 0;
    height: 1px;
    background-color: #f6e78b;
}

.border-bottom.not-required::after {
    background-color: #ddddde;
}

.elastic-layer-item .item-row .label-text {
    flex: 1;
    padding-top: 5px;
}

.elastic-layer-item .item-row .ListCellContentRight {
    width: 100%;
    padding: 5px 0;
}

.elastic-layer-item .item-row input {
    text-align: left;
    outline: none;
    text-align: left;
    border: none;
    font-size: .28rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
}

.elastic-layer-item .item-row .rightContent {
    width: 100% !important;
}

.elastic-layer-item .item-row .calcfont {
    color: #cdcdcd;
    font-size: .32rem;
}

/* .nessesary {
  color: red;
  padding-right: 5px;
} */

#LoseReason-div,
#LoseReasonOther-div,
#SourceFromOther-div {
    display: none;
}

.ListCellRightIcon .calcfont {
    color: #cdcdcd;
}

/* .MSN_lable::after{
  content: ":";
  padding:0 5px;
} */

/*按钮*/
.btn-div {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
}

.btn-div::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d5d5d6;
    color: #d5d5d6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}

.btn-div .mybtn {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #3cc51f;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
}

.btn-div .mybtn.btn-cancel {
    color: #5f646e;
}

.btn-div .mybtn.btn-cancel::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid #d5d5d6;
    color: #d5d5d6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
}
</style>
