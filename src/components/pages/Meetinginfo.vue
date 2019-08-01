<template>
<div>
    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :title="ptitle"></Infoheader>

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
                            <input id="startdate" type="text" data-field="BeginTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText"/>
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
                            <input id="enddate" type="text" data-field="EndTime" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" class="ListCellContentRightText"/>
                        </div>
                            <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 会议类型 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shuxing"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="715_会议类型"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="MeetingType" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
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
                            <input type="text" data-field="MeetingNature" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
                        </div>
                            <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- CAAL -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shuxing"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000289_CAAL"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="CAAL" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
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
                    <div
                        class="ListSpecialCellContent"
                        data-field="CompanyID"
                        data-fieldcontroltype="selectList"
                        data-lanid="790_公司"
                        data-fieldval=""
                        data-selecttype="radio"
                        code="DropDowList_ViewBaseCompanyBaseInfHasContact"
                        typevalue=""
                        data-clickObj="CompanyIDClickObj"
                        data-addUrl="/organizationsinfo"></div>
                </div>

                <!-- 联系人 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-kehulianxiren"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="630_联系人"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <div
                                data-field="ContactsID"
                                data-fieldControlType="linkSelectList"
                                data-lanid="630_联系人"
                                data-fieldVal=""
                                Code="DropDowList_ViewBaseCompanyContactsByCompany"
                                Filter=""
                                data-selectType="radio"
                                class="ListCellContentRightText"
                                data-addUrl="/contactsinfo"
                                data-linkIDField=""
                                data-linkNameField=""
                                data-fromType="6"/>
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 是否首次会议 -->
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shuxing"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000290_是否首次会议？"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="IsFirstMeeting" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
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
                    <div class="ListSpecialCellContent"
                    data-field="OppIDTemp" data-fieldcontroltype="linkedPage"
                    data-lanid="832_关联于商业" data-fieldval=""
                    data-selecttype="radio" code="DropDowList_Opportunity"
                    typevalue="" data-clickObj="OppIDTempClickObj"
                    data-isShowAdd="true" data-fromType="9"></div>
                </div>

                <!-- 状态 -->
                <div class="ListCell">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-shuxing"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="728_状态"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="CurrentState" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="InternalExternaltype" class="ListCellContentRightText"/>
                        </div>
                            <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>

                <!-- 与会人员 -->
                <div class="ListSpecialCell" id="ParticipantsClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-gongsixinxi"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="1000288_与会人员"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div
                        class="ListSpecialCellContent"
                        data-field="Participants"
                        data-fieldcontroltype="selectList"
                        data-lanid="1000288_与会人员"
                        data-fieldval=""
                        data-selecttype="checkbox"
                        code="DropDowList_ViewBaseCompanyBaseInfHasContact"
                        typevalue=""
                        data-clickObj="ParticipantsClickObj"
                        data-addUrl="/organizationsinfo"></div>
                </div>

                <!-- 备忘 -->
                <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Remark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                        </p>
                    </div>
                </div>

                <!-- 会议总结 -->
                <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Summary" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="	1000291_会议总结"></textarea>
                        </p>
                    </div>
                </div>

            </div>

            <Infofooter class="HideWhenNew"> </Infofooter>

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
</div>
</template>

<script>
import Infoheader from '../common/Infoheader'
import Infofooter from '../common/infoFooter'

export default {
    name:'meetinginfo',
    components: {
        Infoheader,
        Infofooter,
    },
    data() {
        return {
            ptitle: 'Meeting detail',
            isShowMenuList: false,
            isAddNew: false, //是否添加新纪录
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示
            accessMeetingNote:false,//是否可以查看会议模块
            meetingNoticeID : "",//会议记录id
            oppID : "",//deal pipeline/opportunity ID
            defaultDateTime:"",//新建单据时候的初始时间
            id:''  //会议id
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
        _self.defaultDateTime = _self.$route.query.defaultDateTime||"";

    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);

        _self.id = _self.$route.params.id;
        var fromType = "Meetinginfo";
        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            $(".HideWhenNew").hide();
            _self.isAddNew = true;
            _self.operation = false;
            _self.accessMeetingNote = false;
        } else {
            $(".HideWhenNew").show();
            _self.isAddNew = false;
            _self.operation = false;
        }

        //则联动清空联系人
        $("[data-field='ContactsID']").text("").attr("data-fieldVal", "").off('click');
        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {
            _self.initDefaultDateTime();
            //渲染textarea
            $("textarea").each(function (index, cur) {
                $(cur).height('25');
                tool.autoTextarea(cur);
            });
            //渲染数据
            tool.IniInfoData(fromType, _self.id, function (data) {

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
                tool.UpdateFieldValueFromBack(eventBus, function(){
                    //清空全局变量
                    eventBus.selectListData = null;
                })
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
        tool.UpdateFieldValueFromBack(eventBus, function(){

            //渲染会议记录模块
            _self.initMeetingNote();

            //清空全局变量
            eventBus.selectListData = null;
        })
    },
    methods: {
        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Meetinginfo";
            tool.DeleteData(fromType, id, _self, function () {
                _self.$store.commit('REMOVE_ITEM', 'tripmeeting');
            });
        },

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
                    $.alert(dateEmptyAlert, tips,"", sure);
                    return;
                }
              else if ((!tool.isNullOrEmptyObject(startdate) && !tool.isNullOrEmptyObject(enddate)) && d1 >= d2) {
                    $.alert(compareAlert, tips,"", sure);
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

        //渲染查看会议记录模块
        initMeetingNote:function(){
            var _self = this;
            _self.oppID = $("[data-field='OppIDTemp']").attr('data-fieldval') || '';
            if(tool.isNullOrEmptyObject(_self.meetingNoticeID) || tool.isNullOrEmptyObject(_self.oppID) || Number(_self.id) <= 0){
                _self.accessMeetingNote = false;
            }else{
                _self.accessMeetingNote = true;
            }
        },

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
                OppID:_self.oppID
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
                    if(hasToSave == "true"){
                        //需要提示用户保存当前数据
                        tool.alert(lanTool.lanContent('1000164_请先保存当前会议！'));
                        return;
                    }


                    //请求成功后执行的操作
                    var target = $(e.target);
                    var url = "/MeetingNoteinfo/" + _self.meetingNoticeID;
                    var infoName = _self.$route.query.infoName ||"";

                    var parameter = {
                        OppID:_self.oppID,
                        ScheduleID:_self.id,
                        onlyView:true,
                        infoName:infoName,
                        onlyView:_self.onlyView
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
        initDefaultDateTime:function(){
            var _self = this;
            if(!tool.isNullOrEmptyObject(_self.defaultDateTime)){
                $("#startdate,#enddate").val(_self.defaultDateTime);
            }
        },


    },
    beforeRouteLeave:function(to, from, next){
        if(to.name == 'tripmeeting' || to.name == 'index'){
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
.ListCellContentRightText{
    text-align: right;
}
</style>
