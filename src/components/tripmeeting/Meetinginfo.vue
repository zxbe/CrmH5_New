<template>
<div>
    <Infoheader
      class="sticky infoheader"
      :isAddNew="isAddNew"
      :onlyView="onlyView"
      :operation="operation"
      :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box">
            <div class="MeetingList">
                <!-- 会议标题 -->
                <!-- <div class="ListCell visible controlEdit">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-T"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="MeetingTitle" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="710_标题"></textarea>
                        </p>
                    </div>
                </div> -->
               <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-biaoti ChangeIconColor"></span><span class="FileName lanText" data-lanid="710_标题"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="MeetingTitle" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 开始时间 -->
                <!-- <div class="ListCell visible controlEdit">
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
                </div> -->
                 <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-shijian ChangeIconColor"></span><span class="FileName lanText" data-lanid="712_开始时间"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" id="startdate" type="text" data-field="BeginTime" data-lanid="1000526_选择" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 结束时间 -->
                <!-- <div class="ListCell visible controlEdit">
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
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-time ChangeIconColor"></span><span class="FileName lanText" data-lanid="713_结束时间"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" id="enddate" type="text" data-field="EndTime" data-lanid="1000526_选择" data-fieldControlType="dateTimePicker" data-TimeType="dateTime" data-format="dd/MM/yyyy HH:mm" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 会议类型 -->
                <!-- <div class="ListCell visible controlEdit">
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
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-17 ChangeIconColor"></span><span class="FileName lanText" data-lanid="715_会议类型间"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" type="text" data-field="MeetingType" data-lanid="1000526_选择" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="MeetingType" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 会议性质 -->
                <!-- <div class="ListCell visible">
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
                </div> -->



                <!-- 公司 -->
                <!-- <div class="ListSpecialCell visible controlEdit" id="CompanyIDClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-gongsixinxi"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="790_公司"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="CompanyID" data-fieldcontroltype="selectList" data-lanid="790_公司" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInfHasContact" typevalue="" data-clickObj="CompanyIDClickObj" data-addUrl="/organizationsinfo"></div>
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-gongsixinxi ChangeIconColor"></span><span class="FileName lanText" data-lanid="790_公司"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap" id="CompanyIDClickObj">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="CompanyID" data-fieldcontroltype="selectList" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInfHasContact" typevalue="" data-clickObj="CompanyIDClickObj" data-addUrl="/organizationsinfo"></textarea>
                        </p>
                        <div class="LeftIconBlock" ><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- BlackList -->
                <!-- <div class="ListCell visible controlEdit disable">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-woshimaijia2"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000388_Black List"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="BlackList" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_ViewBaseAllTypes" TypeValue="YesOrNo" class="ListCellContentRightText" />
                        </div> -->
                        <!-- <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div> -->
                    <!-- </div>
                </div> -->
                 <div class="DetailRow disable controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-woshimaijia2 ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000388_Black List"></span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" type="text" data-field="BlackList" data-lanid="" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_ViewBaseAllTypes" TypeValue="YesOrNo" />
                        <!-- <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div> -->
                    </div>
                </div>
                <!-- 联系人 -->
                <!-- <div class="ListCell visible controlEdit">
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
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-kehulianxiren ChangeIconColor"></span><span class="FileName lanText" data-lanid="630_联系人"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <!-- <input class="content lanInputPlaceHolder" readonly="readonly" data-field="ContactsID" data-fieldControlType="linkSelectList" data-lanid="1000526_选择" data-fieldVal="" Code="DropDowList_ViewBaseCompanyContactsByCompany" Filter="" data-selectType="radio"  data-addUrl="/contactsinfo" data-linkIDField="" data-linkNameField="" data-fromType="6" /> -->
                        <p class="textareaP wrap">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-field="ContactsID" data-fieldControlType="linkSelectList" data-lanid="1000526_选择" data-fieldVal="" Code="DropDowList_ViewBaseCompanyContactsByCompany" Filter="" data-selectType="radio"  data-addUrl="/contactsinfo" data-linkIDField="" data-linkNameField="" data-fromType="6"></textarea>
                        </p>
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 是否首次会议 -->
                <!-- <div class="ListCell visible">
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
                </div> -->

                <!-- 关联于商业 -->
                <!-- <div class="ListSpecialCell controlEdit" id="OppIDTempClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-yewujihui"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="832_关联于商业"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="OppIDTemp" data-fieldcontroltype="linkedPage" data-lanid="832_关联于商业" data-fieldval="" data-selecttype="radio" code="DropDowList_Opportunity" typevalue="" data-clickObj="OppIDTempClickObj" data-isShowAdd="true" data-fromType="9"></div>
                </div> -->
                 <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-yewujihui ChangeIconColor"></span><span class="FileName lanText" data-lanid="832_关联于商业"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap" id="OppIDTempClickObj">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="OppIDTemp" data-fieldcontroltype="linkedPage"  data-fieldval="" data-selecttype="radio" code="DropDowList_Opportunity" typevalue="" data-clickObj="OppIDTempClickObj" data-isShowAdd="true" data-fromType="9"></textarea>
                        </p>
                        <div class="LeftIconBlock" ><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 状态 -->
                <!-- <div class="ListCell visible controlEdit">
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
                </div> -->
                 <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-zhuangtai ChangeIconColor"></span><span class="FileName lanText" data-lanid="728_状态"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder"  type="text" data-field="CurrentState" data-fieldControlType="picker" data-lanid="1000526_选择" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="OAStatus" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 与会人员 -->
                <!-- <div class="ListSpecialCell controlEdit" id="ParticipantsClickObj">
                    <div class="ListSpecialCellField">
                        <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-huiyi"></span></div>
                        <div class="ListSpecialCellFieldContent lanText" data-lanid="1000288_与会人员"></div>
                        <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                    <div class="ListSpecialCellContent" data-field="Participants" data-fieldcontroltype="selectList" data-lanid="1000288_与会人员" data-fieldval="" data-selecttype="checkbox" code="DropDowList_AccountManager" typevalue="" data-clickObj="ParticipantsClickObj" data-addUrl=""></div>
                </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-huiyi ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000288_与会人员"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap" id="ParticipantsClickObj">
                            <textarea  readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="Participants" data-fieldcontroltype="selectList" data-fieldval="" data-selecttype="checkbox" code="DropDowList_AccountManager" typevalue="" data-clickObj="ParticipantsClickObj" data-addUrl=""></textarea>
                        </p>
                        <div class="LeftIconBlock" ><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 目标 -->
                <!-- <div class="ListCell visible controlEdit">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-mubiao"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Remark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000348_目标"></textarea>
                        </p>
                    </div>
                </div> -->
                  <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-mubiao ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000348_目标"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Remark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 会议总结 -->
                <!-- <div class="ListCell controlEdit">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="Summary" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000291_会议总结"></textarea>
                        </p>
                    </div>
                </div> -->
                  <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-beiwanglu ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000291_会议总结"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Summary" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 会议文档 -->
                <DocumentList v-show="!isAddNew" :document-data="documentData" addible="true" deletable="true" :source-id="id" :fromTypeID="8" :fromID="id"></DocumentList>

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

    <InfoRightPanel
      ref="rightPanel"
      :isShowSend = "isShowSend"
      :rightPanelFromType = "rightPanelFromType"
      :transformation = "transformation"
      :rightPanelFromID = "rightPanelFromID"></InfoRightPanel>

    <!-- 转换为商机弹框 -->
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
                <div class="elastic-layer-item f14">
                    <span class="calcfont calc-beiwanglu icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="719_备忘"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <textarea data-field="Memo" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                            </div>
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

     <!-- 转换为交易弹框 -->
    <div id="pipelinetransformTo" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1000430_转为交易"></div>

            <div class="elastic-layer-items">

                <div class="elastic-layer-item f14">
                    <span class="calcfont calc-feiji2 icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="956_MSN"></div>
                        </div>
                        <div class="item-row border-bottom not-required">
                            <div class="ListCellContentRight">
                                <textarea data-field="MSN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="956_MSN"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="SourceFrom-div" class="elastic-layer-item f14">
                    <span class="calcfont calc-shixiang icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="947_商业事项"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text" data-field="Matter" data-lanid="947_商业事项" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="Matter" class="ListCellContentRightText" />
                            </div>
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div>

                <div id="MatterOther-div">
                    <div class="elastic-layer-item f14">
                        <span class="calcfont calc-qita1 icon-left"></span>
                        <div class="item-right">
                            <div class="item-row border-bottom" style="margin-top:5px;">
                                <textarea data-field="MatterOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1155_其他"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="IsPublic-divT" class="elastic-layer-item f14">
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
                <div id="dealInitiatorClickObj" class="elastic-layer-item  f14" style="display:none">
                    <span class="calcfont calc-fuzerenicon icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="825_负责人"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <input type="text" data-field="dealInitiator" data-lanid="825_负责人" data-fieldControlType="groupSelectList" data-fieldVal="" data-selecttype="checkbox" Code="DropDowList_PopedomTeamVsUser" TypeValue="" data-fromType="8" data-clickObj="dealInitiatorClickObj" class="ListCellContentRightText" />
                            </div>
                            <span class="calcfont calc-you"></span>
                        </div>
                    </div>
                </div>
                <div class="elastic-layer-item f14">
                    <span class="calcfont calc-beiwanglu icon-left"></span>
                    <div class="item-right">
                        <div class="item-row">
                            <div class="lanText label-text" data-lanid="719_备忘"></div>
                        </div>
                        <div class="item-row border-bottom">
                            <div class="ListCellContentRight">
                                <textarea data-field="DealMemo" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                            </div>
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
            documentData: [],
            dealOppID: "",
            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            isShowSend:true,
            transformation:false, //控制会议是否可以转成机会或交易
            isInitiator:false,//是否当前记录的负责人（PS：只有负责人才可以操作单据）
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

        $(".textareaP:not(.wrap) textarea").blur(function(){
              $(this).parents(".DetailRow").removeClass("DeepColor");
         });
         $(".textareaP:not(.wrap) textarea").focus(function(){
              $(this).parents(".DetailRow").addClass("DeepColor").siblings().removeClass("DeepColor");
         });


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
                $(cur).height(tool.TextareaDefaultHeight);
                //  $(cur).addClass("DefaultHeight");
                tool.autoTextarea(cur);
            });
            //控制字段显示隐藏
            _self.controlFieldShowOrhide();
            //给状态一个默认值
            if (_self.isAddNew) {
                var caalTemp = lanTool.lanContent("799_否");
                var caalIdTemp = "21";
                var caalobj = {
                    id: caalIdTemp,
                    text: caalTemp
                };
                // $("[data-field='CAAL']")
                //     .val(caalobj.text || "")
                //     .attr("data-fieldVal", caalobj.id)
                //     .trigger("change");
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
                //查询判断当前用户是否有操作单据的权限
                _self.initUserAccess(data);

                var fieldval = $('[data-field="CurrentState"]').attr("data-fieldval");
                //状态为完成时，fieldval为116 才能转为商机
                if (fieldval == "116") {
                    var oppIDTemp = data["OppIDTemp"] || "";
                    if (tool.isNullOrEmptyObject(oppIDTemp)) {
                        _self.transformation = true;
                    } else {
                        _self.transformation = false;
                    }
                } else {
                    _self.transformation = false;
                }


                //渲染文档列表
                _self.InitDocList(_self.id, "8");

                _self.meetingNoticeID = data["MeetingNoticeID"];

                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height(tool.TextareaDefaultHeight);
                    // $(cur).addClass("DefaultHeight");
                    tool.autoTextarea(cur);
                });

                //处理联动字段
                tool.linkageField(_self, 'CompanyID', 'ContactsID');

                //渲染会议记录模块
                _self.initMeetingNote();

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function () {
                    var fieldTemp = eventBus.selectListData["field"] ||"";
                    if(tool.isNullOrEmptyObject(fieldTemp) && fieldTemp != "CompanyID"){
                        //清空全局变量
                        eventBus.selectListData = null;
                    }else{
                        //联动BlackList值
                        _self.linkBlackList(eventBus.selectListData["value"]["id"]||"",function(){
                            //清空全局变量
                            eventBus.selectListData = null;
                        });
                    }
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
             //选择回填后根据回填的内容自适应高度
            if (obj.is('textarea')) {
               obj.height(tool.TextareaDefaultHeight);
                tool.autoTextarea(obj[0]);
            }
            //渲染会议记录模块
            //_self.initMeetingNote();

            //清空全局变量
            //eventBus.selectListData = null;

            var fieldTemp = eventBus.selectListData["field"] ||"";
            if(tool.isNullOrEmptyObject(fieldTemp) && fieldTemp != "CompanyID"){
                //清空全局变量
                eventBus.selectListData = null;
            }else{
                //联动BlackList值
                _self.linkBlackList(eventBus.selectListData["value"]["id"]||"",function(){
                    //清空全局变量
                    eventBus.selectListData = null;
                });
            }
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
                    $("#dealInitiatorClickObj").hide();
                    $("#InitiatorClickObj").hide();
                } else {
                    $("#dealInitiatorClickObj").show();
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

             //控制data-field="MatterOther"显示和隐藏
            $("[data-field='Matter']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval == "36") {
                    $("#MatterOther-div").show();
                } else {
                    $("#MatterOther-div").hide();
                }
            });
        },
        //删除数据
        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Meetinginfo";
            tool.DeleteData(fromType, id, _self, function () {
                _self.$store.commit('REMOVE_ITEM', 'meeting');
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
                        _self.$store.commit('REMOVE_ITEM', 'meeting');
                        _self.$store.commit('REMOVE_ITEM', 'meetinginfo');
                        _self.$router.back(-1);
                    });
                }
            }
        },
        //生成交易
        rightPanelTransformTo:function(){
           //console.log("转化为交易");
            var _self = this;
            var id = _self.id;

            //清空控件数据
            $("[data-field='MSN']").val("");
            $("[data-field='Matter']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='MatterOther']").val("");
            $("[data-field='IsPublic']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='dealInitiator']").val("").attr("data-fieldVal", "");
            $("[data-field='DealMemo']").val("").attr("data-fieldVal", "");

            // 默认给data-field="Initiator"赋予23(公开)
            // var publicObj = tool.GetPublicObj();
            // if (!tool.isNullOrEmptyObject(publicObj)) {
            //     $("[data-field='IsPublic']")
            //         .val(publicObj.text || "")
            //         .attr("data-fieldVal", publicObj.id)
            //         .trigger("change");
            // }
            var privateObj = tool.GetPrivateObj();
            if (!tool.isNullOrEmptyObject(privateObj)) {
                $("[data-field='dealInitiator']").attr("data-fieldval", tool.UserAutoID()).val(tool.Realname());
                $("[data-field='IsPublic']")
                    .val(privateObj.text || "")
                    .attr("data-fieldVal", privateObj.id)
                    .trigger("change");

            }

            //显示弹框
            $('#pipelinetransformTo').show();
            $('#pipelinetransformTo').off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            })

            //取消
            $('#pipelinetransformTo').find('a.btn-cancel').off('click').on('click', function () {
                $('#pipelinetransformTo').hide();
                return;
            })
            //确定
            $('#pipelinetransformTo').find('a.btn-ok').off('click').on('click', function () {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_MeetingHandle_ChangeToDeal;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode()
                };
                jsonDatasTemp["MSN"] = $("[data-field='MSN']").val() || "";
                jsonDatasTemp["Matter"] = $("[data-field='Matter']").attr("data-fieldVal") || "";
                jsonDatasTemp["MatterOther"] = $("[data-field='MatterOther']").val() || "";
                jsonDatasTemp["IsPublic"] = $("[data-field='IsPublic']").attr("data-fieldVal") || "";
                jsonDatasTemp["Initiator"] = $("[data-field='dealInitiator']").attr("data-fieldVal") || "";
                jsonDatasTemp["CompanyID"] = $("[data-field='CompanyID']").attr("data-fieldVal") || "";
                jsonDatasTemp["FromScheduleID"] = id;
                jsonDatasTemp["Memo"] = $("[data-field='DealMemo']").val() || "";
                //console.log("jsonDatasTemp"+JSON.stringify(jsonDatasTemp));
                // return;

                var loadingIndexClassName = tool.showLoading();

                $.ajax({
                    async: true,
                    type: "post",
                    url: urlTemp,
                    data: jsonDatasTemp,
                    success: function (data) {
                        // console.log("data"+JSON.stringify(data));
                        try {
                            data = tool.jObject(data);
                            if (data._ReturnStatus == false) {
                                tool.hideLoading(loadingIndexClassName);
                                tool.showText(tool.getMessage(data));
                                return true;
                            }

                            data = data._OnlyOneData || {};
                            // console.log("data"+JSON.stringify(data));
                            var dealID = data["AutoID"] || "";
                            var theName = data["TheName"] || "";

                            //构造Pitch详情页的跳转地址
                            var path = "/opportunitiesinfo/" + dealID;
                            var queryParam = {
                                showPage: "0",
                                infoName: theName
                            };
                            //将当前详情页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
                            //将列表页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'pipelinelist');

                            //隐藏弹窗
                            $('#pipelinetransformTo').hide();
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
        //生成商机
        rightPanelPitchTransformTo: function () {
            // console.log("转化为商机");
            var _self = this;
            var id = _self.id;

            //清空控件数据
            $("[data-field='TheName']").val("");
            $("[data-field='SourceFrom']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='SourceFromOther']").val("");
            $("[data-field='IsPublic']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='Initiator']").val("").attr("data-fieldVal", "");
            $("[data-field='Memo']").val("").attr("data-fieldVal", "");

            // 默认给data-field="Initiator"赋予23(公开)
            // var publicObj = tool.GetPublicObj();
            // if (!tool.isNullOrEmptyObject(publicObj)) {
            //     $("[data-field='IsPublic']")
            //         .val(publicObj.text || "")
            //         .attr("data-fieldVal", publicObj.id)
            //         .trigger("change");
            // }
            var privateObj = tool.GetPrivateObj();
            if (!tool.isNullOrEmptyObject(privateObj)) {
                $("[data-field='Initiator']").attr("data-fieldval", tool.UserAutoID()).val(tool.Realname());
                $("[data-field='IsPublic']")
                    .val(privateObj.text || "")
                    .attr("data-fieldVal", privateObj.id)
                    .trigger("change");

            }

            //显示弹框
            $('#transformTo').show();
            $('#transformTo').off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            })

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
                jsonDatasTemp["Memo"] = $("[data-field='Memo']").val() || "";
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
                            _self.$store.commit('REMOVE_ITEM', 'pitcheslist');

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
        //判断当前用户是否可以操作当前单据
        initUserAccess:function(oldData,myCallBack){
            var _self = this;
            var fromType = "8";
            var fromID = _self.$route.params.id;
            var currentState = oldData["CurrentState"];
            //是否指定记录的负责人
            tool.IsHasInitiator(fromType,fromID,function(data){
                _self.isInitiator = data;
                //必须是当前单据的负责人才可以操作单据
                if(_self.isInitiator){
                    //头部按钮
                    _self.onlyView = false;
                    _self.controlEdit();
                }else{
                    //头部按钮
                    _self.onlyView = true;
                    _self.controlEdit();
                }

            });
        },
        //只查看的情况 控制元素是否可修改
        controlEdit:function(){
            var _self = this;
            if(_self.onlyView){
                _self.$nextTick(function(){
                    $('.controlEdit').addClass('disable');
                    //禁用BlackLIst
                    $("[data-field='BlackList']").closest(".controlEdit").addClass("disable");
                })
            }else{
                _self.$nextTick(function(){
                    $('.controlEdit').removeClass('disable');
                    //禁用BlackLIst
                    $("[data-field='BlackList']").closest(".controlEdit").addClass("disable");
                });
            }
        },
        /*
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
        */
        //新建时初始化时间
        initDefaultDateTime: function () {
            var _self = this;
            if (!tool.isNullOrEmptyObject(_self.defaultDateTime)) {
                $("#startdate,#enddate").val(_self.defaultDateTime);
            }
        },
        //渲染文档列表
        InitDocList: function (fromIDTemp, fromTypeIDTemp) {
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
                FromTypeID: fromTypeIDTemp,
                FromID: fromIDTemp
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
            // console.log(_self.dealOppID);
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
                    // //CAAL
                    // $("[data-field='CAAL']").val(lanTool.lanContent("798_是")).attr("data-fieldVal", "20").trigger('change');
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
        },
        //联动修改BlackList
        //companyID:公司ID
        linkBlackList:function(companyID,callback){
            let _self = this;
            if(tool.isNullOrEmptyObject(companyID)){
                return;
            }
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_OrganizationsHandle_QuerySingle;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID:companyID
            };
            // var loadingIndexClassName = tool.showLoading();
            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    // tool.hideLoading(loadingIndexClassName);
                    data = tool.jObject(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        return true;
                    }
                    data = data._OnlyOneData || {};
                    console.log(data);

                    //为BlackList赋值
                    $('[data-field="BlackList"]').attr("data-fieldval",(data["BlackList"]||"")).val((data["BlackList_Name"]||""));
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    // tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                    if (!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function") {
                        callback();
                    }
                }
            });
        },
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
@import "../../assets/css/pages/commonInfo.css";

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
/* .MeetingList{
    padding-bottom:0.4rem;
    background-color:#fff;
} */
/* .MeetingList .DetailRow {
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
