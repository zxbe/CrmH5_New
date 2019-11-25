<template>
<div>

    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box">
            <div class="ContactList">

                <!-- <div class="ListCell visible">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-name"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="EnglishName" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="848_姓名"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-name ChangeIconColor"></span><span class="FileName lanText" data-lanid="848_姓名"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="EnglishName" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListSpecialCell visible" id="CompanyIDClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon">
                            <span class="calcfont calc-gongsixinxi"></span>
                        </div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="790_公司"></div>
                        <div class="ListSpecialCellRightIcon">
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="CompanyID" data-fieldcontroltype="selectList" data-lanid="790_公司" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInf" typevalue="" data-clickObj="CompanyIDClickObj" data-addUrl="/organizationsinfo"></div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-gongsixinxi ChangeIconColor"></span><span class="FileName lanText" data-lanid="790_公司"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap" id="CompanyIDClickObj">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="CompanyID" data-fieldcontroltype="selectList" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInf" typevalue="" data-clickObj="CompanyIDClickObj" data-addUrl="/organizationsinfo"></textarea>
                        </p>
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- <div class="ListCell visible">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-mailbox"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Email" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="697_邮箱"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-mailbox ChangeIconColor"></span><span class="FileName lanText" data-lanid="697_邮箱"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Email" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-zuzhibumen"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="DepartmentName" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="567_部门"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-zuzhibumen ChangeIconColor"></span><span class="FileName lanText" data-lanid="567_部门"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="DepartmentName" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-zhiwei"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Title" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="696_职位"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-zhiwei ChangeIconColor"></span><span class="FileName lanText" data-lanid="696_职位"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Title" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell" style="background:rgb(252,252,252)">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-nationaarea"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="CountryID" disabled="disabled" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="701_国家"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow" style="background:rgb(252,252,252)">
                    <div class="DetailRowOn"><span class="calcfont calc-nationaarea ChangeIconColor"></span><span class="FileName lanText" data-lanid="701_国家"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap">
                            <textarea data-field="CountryID" disabled="disabled" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid=""></textarea>
                        </p>
                        <!-- <div class="LeftIconBlock" ><span class="LeftIcon calcfont calc-you"></span></div> -->
                    </div>
                </div>
                <!-- <div class="ListCell" style="background:rgb(252,252,252)">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-diqiuquanqiu"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="CityID" disabled="disabled" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="702_城市"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow" style="background:rgb(252,252,252)">
                    <div class="DetailRowOn"><span class="calcfont calc-diqiuquanqiu ChangeIconColor"></span><span class="FileName lanText" data-lanid="702_城市"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap">
                            <textarea data-field="CityID" disabled="disabled" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid=""></textarea>
                        </p>
                        <!-- <div class="LeftIconBlock" ><span class="LeftIcon calcfont calc-you"></span></div> -->
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-phone"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="TelPhone" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="704_办公电话"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-phone ChangeIconColor"></span><span class="FileName lanText" data-lanid="704_办公电话"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="TelPhone" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-mobilephone"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Phone" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="705_移动电话"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-mobilephone ChangeIconColor"></span><span class="FileName lanText" data-lanid="705_移动电话"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Phone" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-chuanzhen"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Fax" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="703_传真"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-chuanzhen ChangeIconColor"></span><span class="FileName lanText" data-lanid="703_传真"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Fax" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon">
                        <span class="calcfont calc-beizhu"></span>
                    </div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="ContactRemark" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="699_备注"></textarea>
                        </p>
                    </div>
                </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-beizhu ChangeIconColor"></span><span class="FileName lanText" data-lanid="699_备注"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="ContactRemark" data-fieldcontroltype="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
            </div>
            <div class="accessList">
                <!-- <div class="ListCell visible">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-yidu"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="803_可访问"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input data-field="IsPublic" data-lanid="803_可访问" data-fieldcontroltype="picker" data-fieldVal code="DropDowList_DtbAllTypes" TypeValue="Accessabletype" class="ListCellContentRightText"></div>
                        <div class="ListCellRightIcon">
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-yidu ChangeIconColor"></span><span class="FileName lanText" data-lanid="803_可访问"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" data-field="IsPublic" data-lanid="1000526_选择" data-fieldcontroltype="picker" data-fieldVal code="DropDowList_DtbAllTypes" TypeValue="Accessabletype" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 负责人 -->
                <div class="initiatorObj">

                    <!-- <div class="ListCell visible">
                        <div class="ListCellLeftIcon">
                            <span class="calcfont calc-fuzerenicon"></span>
                        </div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="825_负责人"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <div class="ListCellContentRightText"
                                     data-field="Initiator"
                                     data-fieldcontroltype="groupSelectList"
                                     data-lanid="825_负责人"
                                     data-fieldval=""
                                     data-selecttype="checkbox"
                                     code="DropDowList_PopedomTeamVsUser"
                                     typevalue=""
                                     data-fromType="6"></div>
                            </div>
                            <div class="ListCellRightIcon">
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="ListSpecialCell visible initiatorObj" id="InitiatorClickObj">
                        <div class="ListSpecialCellField">
                            <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-fuzerenicon"></span></div>
                            <div class="ListSpecialCellFieldContent lanText" data-lanid="825_负责人"></div>
                            <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                        </div>
                        <div
                            class="ListSpecialCellContent"
                            data-field="Initiator"
                            data-fieldcontroltype="groupSelectList"
                            data-lanid="825_负责人"
                            data-fieldval=""
                            data-selecttype="checkbox"
                            code="DropDowList_PopedomTeamVsUser"
                            typevalue=""
                            data-fromType="6"
                            data-clickObj="InitiatorClickObj"
                          ></div>
                    </div> -->
                    <div class="DetailRow">
                        <div class="DetailRowOn"><span class="calcfont calc-fuzerenicon ChangeIconColor"></span><span class="FileName lanText" data-lanid="825_负责人"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <p class="textareaP wrap" id="InitiatorClickObj">
                                <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="Initiator" data-fieldcontroltype="groupSelectList" data-fieldval="" data-selecttype="checkbox" code="DropDowList_PopedomTeamVsUser" typevalue="" data-fromType="6" data-clickObj="InitiatorClickObj"></textarea>
                            </p>
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <div class="ListCell tip ">
                        <div class="tipBox">
                            <p class="f14">
                                <span>*</span>
                                <span class="lanText" data-lanid="850_请注意，当选择私有的时，只有负责人及其上司可以访问并分享。"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div v-show="!isAddNew" class="showMoreList">
                <div class="organizationMessage">
                    <div class="ListCell" @click="goToOrganizationsInfo">
                        <div class="ListCellLeftIcon">
                            <span class="calcfont calc-gongsixinxi"></span>
                        </div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="851_查看公司信息"></div>
                            </div>
                            <div class="ListCellRightIcon">
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <div class="accessView initiatorObj">
                <div class="ListCell" @click.stop="goToShareList">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-yidu"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="852_查看有权限访问的同事"></div>
                        </div>
                        <div class="ListCellRightIcon">
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div>
            </div> -->
            <Infofooter v-show="!isAddNew"></Infofooter>

        </div>
    </div>
    <InfoRightPanel ref="rightPanel" :isShowClose="isShowClose" :isShowSend="isShowSendBtn" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID"></InfoRightPanel>

</div>
</template>

<script>
import Infoheader from "@/components/customPlugin/Infoheader";
import InfoRightPanel from "@/components/customPlugin/InfoRightPanel";
import Infofooter from "@/components/customPlugin/infoFooter";

export default {
    name: 'contactsinfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel
    },
    data() {
        return {
            ptitle: "contact detail",
            id: '',

            isAddNew: false, //是否添加新纪录
            operation: false, //控制详情页header按钮，ture:显示可操作，false:隐藏
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示

            companyID: "", //从Contactsof页面过来保存公司id
            companyName: '', //从Contactsof页面过来保存公司Name

            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            isShowSendBtn: true, //侧滑是否显示分享给同事选项
            isShowClose: false, //侧滑是否显示关闭这个商业机会选项

            source: '', //记录上一个页面是不是contactsof

        };
    },
    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'contactsinfo');

        //从列表获取详情名
        _self.ptitle = _self.$route.query.infoName || lanTool.lanContent("793_添加联系人");
        _self.companyID = _self.$route.query.companyID || '';
        _self.companyName = _self.$route.query.companyName || '';
        _self.source = _self.$route.query.source || '';
        _self.rightPanelFromType = "6";
        _self.rightPanelFromID = _self.$route.params.id || "";

        _self.onlyView = (_self.$route.query.onlyView == "true" || _self.$route.query.onlyView == true) ? true : false;

    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);
        $(".textareaP:not(.wrap) textarea").blur(function () {
            $(this).parents(".DetailRow").removeClass("DeepColor");
        });
        $(".textareaP:not(.wrap) textarea").focus(function () {
            $(this).parents(".DetailRow").addClass("DeepColor");
        });
        //如果是只查看，控制元素不可以更改
        _self.controlEdit();

        let fromType = "Contactsinfo";

        _self.id = _self.$route.params.id;
        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            _self.isAddNew = true;
            _self.operation = false;
        } else {
            _self.isAddNew = false;
            _self.operation = true;
        }

        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {
            //渲染textarea 从新增事件进到详情是不会进入渲染数据的方法，这里得多加个textarea高度自适应
            $("textarea").each(function (index, cur) {
                $(cur).addClass("DefaultHeight");
                tool.autoTextarea(cur);
            });

            //控制data-field="Initiator"显示和隐藏
            $("[data-field='IsPublic']").off('change').on('change', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }

                var fieldval = curObj.attr("data-fieldval"); //alert(fieldval);
                if (fieldval == "23") {
                    $(".initiatorObj").hide();
                } else {
                    $(".initiatorObj").show();
                }
            });

            // 如是新增状态 默认给data-field="Initiator"赋予23(公开)
            if (_self.isAddNew) {
                //modify by Dylan 20190905 修改成默认赋予24(私有),并且将当前用户作为负责人
                // var publicObj = tool.GetPublicObj();
                // if (!tool.isNullOrEmptyObject(publicObj)) {
                //     $("[data-field='IsPublic']")
                //         .val(publicObj.text || "")
                //         .attr("data-fieldVal", publicObj.id)
                //         .trigger("change");
                // }

                var privateObj = tool.GetPrivateObj();
                if (!tool.isNullOrEmptyObject(privateObj)) {
                    $("[data-field='Initiator']").attr("data-fieldval", tool.UserAutoID()).text(tool.Realname());
                    $("[data-field='IsPublic']")
                        .val(privateObj.text || "")
                        .attr("data-fieldVal", privateObj.id)
                        .trigger("change");

                }
            }

            //给公司字段赋初始值
            if (!tool.isNullOrEmptyObject(_self.companyID) && !tool.isNullOrEmptyObject(_self.companyName)) {
                var obj = $('[data-field="CompanyID"]');
                if (tool.isNullOrEmptyObject(obj)) {
                    return;
                }
                obj.attr('data-fieldval', _self.companyID);
                obj.text(_self.companyName);
            }

            //渲染数据
            tool.IniInfoData(fromType, _self.id, function () {

                //如果页面来源是contactsof不需要判断操作权限
                if (_self.source != 'contactsof') {
                    //判断当前用户是否可以操作当前单据
                    _self.initUserAccess();
                }

                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).addClass("DefaultHeight");
                    tool.autoTextarea(cur);
                });

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function (curObj) {

                    var dataField = curObj.attr("data-field") || "";
                    dataField = $.trim(dataField).toLowerCase();

                    if (dataField == "companyid") {
                        //请求地址
                        var urlTemp = tool.AjaxBaseUrl();
                        var controlName = tool.Api_OrganizationsHandle_QuerySingle;
                        //传入参数
                        var jsonDatasTemp = {
                            CurrentLanguageVersion: lanTool.currentLanguageVersion,
                            UserName: tool.UserName(),
                            _ControlName: controlName,
                            _RegisterCode: tool.RegisterCode(),
                            AutoID: curObj.attr("data-fieldval") || ""
                        };

                        $.ajax({
                            async: true,
                            type: "post",
                            url: urlTemp,
                            data: jsonDatasTemp,
                            success: function (data) {
                                data = tool.jObject(data);
                                if (data._ReturnStatus == false) {
                                    //tool.showText(tool.getMessage(data));
                                    console.log(tool.getMessage(data));
                                    return;
                                }
                                data = data._OnlyOneData || {};
                                $("[data-field='CountryID']").val(data["CountryID_Name"] || "");
                                $("[data-field='CityID']").val(data["CityID_Name"] || "");
                            },
                            error: function (jqXHR, type, error) {
                                console.log(error);
                                return;
                            },
                            complete: function () {
                                //隐藏虚拟键盘
                                document.activeElement.blur();
                            }
                        });
                    }
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

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function (curObj) {

            //选择公司后 国家和城市在这里跟着变动
            var dataField = curObj.attr("data-field") || "";
            dataField = $.trim(dataField).toLowerCase();

            if (dataField == "companyid") {
                //请求地址
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_OrganizationsHandle_QuerySingle;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode(),
                    AutoID: curObj.attr("data-fieldval") || ""
                };

                $.ajax({
                    async: true,
                    type: "post",
                    url: urlTemp,
                    data: jsonDatasTemp,
                    success: function (data) {
                        data = tool.jObject(data);
                        if (data._ReturnStatus == false) {
                            //tool.showText(tool.getMessage(data));
                            console.log(tool.getMessage(data));
                            return;
                        }
                        data = data._OnlyOneData || {};
                        $("[data-field='CountryID']").val(data["CountryID_Name"] || "");
                        $("[data-field='CityID']").val(data["CityID_Name"] || "");
                    },
                    error: function (jqXHR, type, error) {
                        console.log(error);
                        return;
                    },
                    complete: function () {
                        //隐藏虚拟键盘
                        document.activeElement.blur();
                    }
                });
            }
            //清空全局变量
            eventBus.selectListData = null;
        });
    },
    methods: {
        //查看有权限访问的同事跳转事件
        goToShareList: function () {
            var _self = this;
            var fromType = "6";
            var fromID = _self.$route.params.id || "";
            if (tool.isNullOrEmptyObject(fromID)) {
                return;
            }
            var parameter = {
                fromType: fromType,
                fromID: fromID
            };
            this.$router.push({
                path: "/poweruser",
                query: parameter
            });
        },

        //查看公司信息
        goToOrganizationsInfo: function () {
            var _self = this;
            var companyID = $("[data-field='CompanyID']:first").attr("data-fieldval") || "";
            if (tool.isNullOrEmptyObject(companyID)) {
                return;
            }

            //设置公司信息页面只读
            var urlTemp = "/organizationsinfo/" + companyID;

            //获取公司名字
            var obj = $('[data-field="CompanyID"]');
            if (tool.isNullOrEmptyObject(obj)) {
                return;
            }
            var infoName = obj.text() || "";
            var parameter = {
                onlyView: true,
                infoName: infoName
            };
            _self.$store.commit('REMOVE_ITEM', 'organizationsinfo');
            _self.$router.push({
                path: urlTemp,
                query: parameter
            });
        },

        savePageData: function (e) {

            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Contactsinfo";

            tool.SaveOrUpdateData(fromType, id, _self, function (data) {

                _self.$store.commit('REMOVE_ITEM', 'contacts');
                _self.$store.commit('REMOVE_ITEM', 'contactsinfo');
                _self.$router.back(-1);
            });

        },

        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Contactsinfo";
            tool.DeleteData(fromType, id, _self, function () {
                _self.$store.commit('REMOVE_ITEM', 'contacts');
            });
        },

        //只查看的情况 控制元素是否可修改
        controlEdit: function () {
            var _self = this;
            if (_self.onlyView) {
                $(".ContactList,.accessList").addClass('disable');
            } else {
                $('.ContactList,.accessList').removeClass('disable');
            }
        },

        //判断当前用户是否可以操作当前单据
        initUserAccess: function () {
            var _self = this;
            var fromType = "6";
            var fromID = _self.$route.params.id;
            //是否指定记录的负责人
            tool.IsHasInitiator(fromType, fromID, function (data) {
                _self.onlyView = !data;
                _self.controlEdit();
            });
        },

    },

    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'contacts' || to.name == 'contactsof') {
            this.$store.commit('REMOVE_ITEM', 'contactsinfo');
        }
        next();
    }

};
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";

.accessView,
.organizationMessage {
    margin-top: 10px;
}

.accessView .ListCell:after,
.organizationMessage .ListCell:after {
    background-color: #fff;
}

.accessView .ListCellContentLeftText,
.organizationMessage .ListCellContentLeftText {
    font-weight: 700;
}

.accessView .leftContent,
.organizationMessage .leftContent {
    width: calc(100% - 0.32rem) !important;
}

.ListCell.tip {
    padding: 9px 0;
}

.ListCell.tip:after {
    background-color: #ffffff;
}

.tipBox {
    padding-left: 0.9rem;
    padding-right: 0.3rem;
    line-height: 0.34rem;
}

.tipBox p {
    margin: 0;
    padding: 0;
}

.tipBox p span {
    color: red;
}

.initiatorObj {
    display: none;
}

/* .ContactList,
.accessList { */
    /* padding-bottom:0.4rem; */
    /* background-color: #fff;
} */

/* .ContactList .DetailRow,
.accessList .DetailRow {
    position: relative;
    background-color: #ffffff;
    min-height: 1.34rem;
    padding-left: 0.16rem;
    padding-top: 0.2rem;
    padding-right: 0.18rem; */
    /* padding-bottom: 0.2rem; */
    /* box-sizing: border-box;
} */
</style>
