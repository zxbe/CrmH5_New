<template>
<div>
    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box detailBox">
            <div class="OppList">
                <div data-field="BusinessTypes" data-fieldControlType="hideDivText">{{businessType}}</div>

                <!-- <div v-show="showTips" class="tipBox">
                <div class="tipContent f12">
                    <span class="red">*</span>
                    <p class="zhuyi lanText" data-lanid="897_请注意，该记录已关闭，仅允许被查看。"></p>
                </div>
            </div> -->

                <!-- 名称 -->
                <!-- <div class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-yewujihui"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                          <textarea data-field="TheName" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="710_标题"></textarea>
                    </p>
                </div>
            </div> -->
                <div v-show="showPage == 0" class="DetailRow controlEdit" style="background: rgb(252, 252, 252);">
                    <div class="DetailRowOn"><span class="calcfont calc-yewujihui ChangeIconColor"></span><span class="FileName lanText" data-lanid="710_标题"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="TheName" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid=""></textarea>
                        </p>
                    </div>
                </div>
                <div v-show="showPage == 1" class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-yewujihui ChangeIconColor"></span><span class="FileName lanText" data-lanid="710_标题"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="TheName" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 交易模块才有的属性 -->
                <div v-show="showPage =='0'" class="OpportunitiesList controlEdit">
                    <!-- LOI单号 -->
                    <!-- <div class="ListSpecialCell" id="LOIIDClickObj">
                        <div class="ListSpecialCellField">
                            <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-profile"></span></div>
                            <div class="ListSpecialCellFieldContent lanText" data-lanid="1000227_LOI单号"></div>
                            <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                        </div>
                        <div
                            class="ListSpecialCellContent"
                            data-field="LOIID"
                            data-fieldcontroltype="selectList"
                            data-lanid="1000227_LOI单号"
                            data-fieldval=""
                            data-selecttype="radio"
                            code="DropDowList_LOI"
                            typevalue=""
                            data-clickObj="LOIIDClickObj"
                            data-addUrl=""></div>
                    </div> -->
                    <div class="DetailRow">
                        <div class="DetailRowOn"><span class="calcfont calc-profile ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000227_LOI单号"></span></div>
                        <div class="DetailRowUp">
                            <p class="textareaP wrap" id="LOIIDClickObj">
                                <textarea readonly="readonly" class="lanInputPlaceHolder" data-field="LOIID" data-fieldControlType="selectList" data-lanid="1000526_请选择" data-fieldVal="" Code="DropDowList_LOI" data-selectType="radio" data-clickObj="LOIIDClickObj"></textarea>
                            </p>
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <!-- 商业事项 -->
                    <!-- <div class="ListCell visible" v-show="showPage=='0'">
                        <div class="ListCellLeftIcon"><span class="calcfont calc-shixiang"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="947_商业事项"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <input type="text" data-field="Matter" data-lanid="947_商业事项" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="Matter" class="ListCellContentRightText"/>
                            </div>
                            <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                        </div>
                    </div> -->
                    <div class="DetailRow" v-show="showPage=='0'">
                        <div class="DetailRowOn"><span class="calcfont calc-shixiang ChangeIconColor"></span><span class="FileName lanText" data-lanid="947_商业事项"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <input class="content lanInputPlaceHolder" type="text" data-field="Matter" data-lanid="1000526_请选择" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="Matter" />
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <!-- <div class="ListCell visible MatterOtherObj" v-show="showPage=='0'">
                        <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont"></span></div>
                        <div class="ListCellLeftText">
                            <p class="textareaP">
                                <textarea data-field="MatterOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="952_其他"></textarea>
                            </p>
                        </div>
                    </div> -->
                    <div class="DetailRow MatterOtherObj" v-show="showPage=='0'">
                        <div class="DetailRowOn"><span class="calcfont calc-other ChangeIconColor"></span><span class="FileName lanText" data-lanid="952_其他"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <p class="textareaP">
                                <textarea data-field="MatterOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                            </p>
                        </div>
                    </div>
                    <!-- MSN -->
                    <!-- <div class="ListCell" v-show="showPage=='0'">
                        <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-feiji2"></span></div>
                        <div class="ListCellLeftText">
                            <p class="textareaP">
                                <textarea data-field="MSN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="956_MSN"></textarea>
                            </p>
                        </div>
                    </div> -->
                    <div class="DetailRow" v-show="showPage=='0'">
                        <div class="DetailRowOn"><span class="calcfont calc-feiji2 ChangeIconColor"></span><span class="FileName lanText" data-lanid="956_MSN"></span></div>
                        <div class="DetailRowUp">
                            <p class="textareaP">
                                <textarea data-field="MSN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 公司 -->
                <!-- <div class="ListSpecialCell visible controlEdit" id="TargetCompanyIDClickObj">
                <div class="ListSpecialCellField">
                    <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-gongsixinxi"></span></div>
                    <div class="ListSpecialCellFieldContent lanText" data-lanid="790_公司"></div>
                    <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>
                <div
                    class="ListSpecialCellContent"
                    data-field="TargetCompanyID"
                    data-fieldcontroltype="selectList"
                    data-lanid="790_公司"
                    data-fieldval=""
                    data-selecttype="radio"
                    code="DropDowList_ViewBaseCompanyBaseInfHasContact"
                    typevalue=""
                    data-clickObj="TargetCompanyIDClickObj"
                    data-addUrl="/organizationsinfo"></div>
            </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-gongsixinxi ChangeIconColor"></span><span class="FileName lanText" data-lanid="790_公司"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap" id="TargetCompanyIDClickObj">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="TargetCompanyID" data-fieldcontroltype="selectList" data-fieldval="" data-selecttype="radio" code="DropDowList_ViewBaseCompanyBaseInfHasContact" typevalue="" data-clickObj="TargetCompanyIDClickObj" data-addUrl="/organizationsinfo"></textarea>
                        </p>
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 联系人 -->
                <!-- <div class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon"><span class="calcfont calc-fuzerenicon"></span></div>
                <div class="ListCellContent">
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="791_联系人"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <div
                          data-field="ContactID"
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
                          data-fromType="6"></div>

                    </div>
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>
            </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-kehulianxiren ChangeIconColor"></span><span class="FileName lanText" data-lanid="630_联系人"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP wrap">
                            <textarea readonly="readonly" class="lanInputPlaceHolder" data-field="ContactID" data-fieldControlType="linkSelectList" data-lanid="1000526_选择" data-fieldVal="" Code="DropDowList_ViewBaseCompanyContactsByCompany" Filter="" data-selectType="radio" data-addUrl="/contactsinfo" data-linkIDField="" data-linkNameField="" data-fromType="6"></textarea>
                        </p>
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 机会来源   只有在商业机会可见-->
                <div v-show="showPage =='1'" class="shareBlock controlEdit">
                    <!-- <div class="ListCell visible">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-laiyuanqingkuang"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1000230_机会来源"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input
                                data-field="SourceFrom"
                                data-lanid="1000230_机会来源"
                                data-fieldcontroltype="picker"
                                data-fieldVal
                                code="DropDowList_DtbAllTypes"
                                TypeValue="SourceFrom"
                                class="ListCellContentRightText"
                            ></div>
                            <div class="ListCellRightIcon">
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div> -->

                    <div class="DetailRow">
                        <div class="DetailRowOn"><span class="calcfont calc-laiyuanqingkuang ChangeIconColor"></span><span class="FileName lanText" data-lanid="1000230_机会来源"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <input class="content lanInputPlaceHolder" type="text" data-field="SourceFrom" data-lanid="1000526_请选择" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="SourceFrom" />
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>

                    <!-- <div class="ListCell visible controlEdit SourceFromObj">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-qita1"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                              <textarea data-field="SourceFromOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder"></textarea>
                        </p>
                    </div>
                </div> -->
                    <div class="DetailRow controlEdit SourceFromObj">
                        <div class="DetailRowOn"><span class="calcfont calc-qita1 ChangeIconColor"></span><span class="FileName lanText" data-lanid="1151_其它"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <p class="textareaP">
                                <textarea data-field="SourceFromOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 可访问 -->
                <div class="shareBlock controlEdit">
                    <!-- <div class="ListCell visible">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-yidu"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="803_可访问"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input
                                data-field="IsPublic"
                                data-lanid="803_可访问"
                                data-fieldcontroltype="picker"
                                data-fieldVal
                                code="DropDowList_DtbAllTypes"
                                TypeValue="Accessabletype"
                                class="ListCellContentRightText"
                            ></div>
                            <div class="ListCellRightIcon">
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                </div> -->
                    <div class="DetailRow">
                        <div class="DetailRowOn"><span class="calcfont calc-yidu ChangeIconColor"></span><span class="FileName lanText" data-lanid="803_可访问"></span><span class="XingHao">*</span></div>
                        <div class="DetailRowUp">
                            <input class="content lanInputPlaceHolder" type="text" data-field="IsPublic" data-lanid="1000526_请选择" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="Accessabletype" />
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <!-- 负责人 -->
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
                            <p class="textareaP wrap initiatorObj" id="InitiatorClickObj">
                                <textarea readonly="readonly" class="lanInputPlaceHolder" data-lanid="1000526_请选择" data-field="Initiator" data-fieldcontroltype="groupSelectList" data-fieldval="" data-selecttype="checkbox" code="DropDowList_PopedomTeamVsUser" typevalue="" data-fromType="6" data-clickObj="InitiatorClickObj"></textarea>
                            </p>
                            <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                        </div>
                    </div>
                </div>

                <!-- <div class="ListCell visible">
                <div class="ListCellLeftIcon"><span class="calcfont calc-shixiang"></span></div>
                <div class="ListCellContent">
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="953_状态"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <input type="text" data-field="CurrentState" data-lanid="953_状态" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="CurrentState" class="ListCellContentRightText"/>
                    </div>
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>
            </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-shixiang ChangeIconColor"></span><span class="FileName lanText" data-lanid="953_状态"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <input class="content lanInputPlaceHolder" type="text" data-field="CurrentState" data-lanid="1000526_请选择" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="CurrentState" />
                        <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                    </div>
                </div>
                <!-- 风险提示 -->
                <!-- <div class="ListCell controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-fengxianyujing"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                        <textarea data-field="RiskTips" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="904_风险提示"></textarea>
                    </p>
                </div>
            </div> -->
                <div class="DetailRow controlEdit">
                    <div class="DetailRowOn"><span class="calcfont calc-fengxianyujing ChangeIconColor"></span><span class="FileName lanText" data-lanid="904_风险提示"></span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="RiskTips" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 备忘 -->
                <!-- <div class="ListCell controlEdit visible">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                        <textarea data-field="Memo" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                    </p>
                </div>
            </div> -->
                <div class="DetailRow">
                    <div class="DetailRowOn"><span class="calcfont calc-beiwanglu ChangeIconColor"></span><span class="FileName lanText" data-lanid="719_备忘"></span><span class="XingHao">*</span></div>
                    <div class="DetailRowUp">
                        <p class="textareaP">
                            <textarea data-field="Memo" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000525_请输入"></textarea>
                        </p>
                    </div>
                </div>
                <!-- 状态 -->
                <!-- <div v-show="showTips" class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-zhuangtai"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                          <textarea data-field="CurrentState_Name" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="728_状态"></textarea>
                    </p>
                </div>
            </div> -->

                <!-- 输单原因 -->
                <!-- <div v-show="showTips && !isWinClose" class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-yuanyin"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                          <textarea data-field="LoseReason_Name" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000311_输单原因"></textarea>
                    </p>
                </div>
            </div> -->

                <!-- 输单原因其他 -->
                <!-- <div v-show="showTips && !isWinClose && hasOtherReason" class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-yuanyin"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                          <textarea data-field="LoseReasonOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                    </p>
                </div>
            </div> -->

                <!-- 关注 -->
                <!-- <div v-show="!isAddNew" class="ListCell controlEdit">
                <div class="ListCellLeftIcon textLeftIcon" @click="followToggle">
                  <span data-field="IsFollow" data-fieldControlType="icon" data-fieldVal="{'true':'calc-shoucang','false':'calc-noshoucang'}" data-defaultVal="false" class="mui-icon calcfont guanZhu"></span>
                </div>
                <div class="ListCellLeftText">
                    <p class="textareaP lanText" data-lanid="786_关注"></p>
                </div>
            </div> -->

                <!-- 会议 -->
                <!-- <div class="accessBlock" v-show="!isAddNew">
                <div class="ListCell" @click="goToMeetingList">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-huiyi"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="619_会议"></div>
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>
            </div> -->

                <!-- 查看有权限访问的同事 -->
                <!-- <div class="accessBlock" v-show="!isAddNew">
                <div class="ListCell" @click="goToShareList">
                    <div class="ListCellLeftIcon">
                        <span class="calcfont calc-yidu"></span>
                    </div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="852_查看有权限访问的同事"></div>
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>
            </div> -->

                <!-- 会议文档 -->
                <DocumentList v-show="!isAddNew" :document-data="documentData" addible="true" deletable="true" :source-id="id" :fromTypeID="9" :fromID="id"></DocumentList>
                <!-- <div v-show="!isAddNew">

                <div class="meetingRecord">
                    <div class="headerBlock">
                        <div class="headerBlockLeftIcon"><span class="calcfont calc-wendang2"></span></div>
                        <div class="headerBlockContent f16 lanText" data-lanid="750_文档"></div>
                        <div class="headerBlockRightIcon controlEdit">
                          <span class="calcfont calc-jia" @click="goRecord($event)" data-url="/MeetingNoteinfo/-1"></span>
                        </div>
                    </div>
                </div> -->
                <!-- 会议记录列表 -->
                <!-- <div class="meetingRecordList">
                    <div v-for="item in MeetingNotice" :key="item.AutoID" class="meetingRecordListCell">
                        <div class="headerDiv">
                            <div class="headerDivLeftIcon"><span class="calcfont calc-xinxi1"></span></div>
                            <div class="headerDivContent">
                                <div class="content">{{item.MeetingTitle}}</div>
                            </div>
                            <div class="headerDivRightBtn" >
                                <div class="rightBtn" data-lanid="" @click="goRecord($event, item.AutoID)" :data-url="'/MeetingNoteinfo/' + item.AutoID">
                                {{seeMore}}
                                </div>
                            </div>
                            <div class="headerDivRightDelete controlEdit"  @click="deleteMeetingNote(item.AutoID,$event)" >
                                <span class="calcfont calc-delete"></span>
                            </div>
                        </div>
                        <div v-show="item.CompanyID_Name" class="airlinesName">
                            <div class="airlinesNameContent f12">{{item.CompanyID_Name}}</div>
                        </div>
                        <div v-show="item.Remark" class="meetingRemark">
                            <p class="f14">{{item.Remark}}</p>
                        </div>  -->
                <!-- 会议记录文档列表  -->
                <!-- <div class="meetingDocList">
                            <div v-for="fileItem in item.DocList" :key="fileItem.ObjectName" class="docListCell">
                                <div class="docListCellLeft" @click="goFileInfo(fileItem)">
                                    <div class="docListCellLeftContent f12"><span class="calcfont calc-fujian"></span>{{fileItem.ObjectName}}</div>
                                </div>
                                <div class="docListCellRight">
                                    <div class="docListCellRightContent">{{fileItem.AddTime|MeetingTimeFormat}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div> -->

                <Infofooter v-show="!isAddNew"> </Infofooter>

            </div>
        </div>

        <InfoRightPanel ref="rightPanel" :isShowClose="isShowClose" :closeThisContent="closeThisContent" :isShowSend="isShowSendBtn" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID" :loi="loi" :businessType="businessType"></InfoRightPanel>

        <!-- 关闭交易/商业机会弹框 -->
        <div id="closeThis" class="elastic-layer">
            <div class="elastic-layer-content">
                <div class="elastic-layer-title f18">{{closeTitle}}</div>

                <div class="elastic-layer-items">

                    <div class="elastic-layer-item f14">
                        <span class="calcfont calc-zhuangtai icon-left"></span>
                        <div class="item-right">
                            <div class="item-row">
                                <div class="lanText label-text" data-lanid="728_状态"></div>
                            </div>
                            <div class="item-row border-bottom">
                                <div class="ListCellContentRight">
                                    <input type="text" data-field="CurrentStateNew" data-lanid="728_状态" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="CurrentState" Filter="38" class="ListCellContentRightText" />
                                </div>
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                    </div>

                    <div id="LoseReason-div">
                        <div class="elastic-layer-item f14">
                            <span class="calcfont calc-yuanyin icon-left"></span>
                            <div class="item-right">
                                <div class="item-row">
                                    <div class="lanText label-text" data-lanid="1152_输单原因"></div>
                                </div>
                                <div class="item-row border-bottom">
                                    <div class="ListCellContentRight">
                                        <input type="text" data-field="LoseReasonNew" data-lanid="1152_输单原因" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="LoseReason" class="ListCellContentRightText" />
                                    </div>
                                    <span class="calcfont calc-you"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="LoseReasonOther-div">
                        <div class="elastic-layer-item f14">
                            <span class="calcfont calc-yuanyin icon-left"></span>
                            <div class="item-right">
                                <div class="item-row border-bottom" style="margin-top:5px;">
                                    <textarea data-field="LoseReasonOtherNew" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
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
        <div id="transformTo" class="elastic-layer">
            <div class="elastic-layer-content">
                <div class="elastic-layer-title lanText f18" data-lanid="1000239_转为交易"></div>

                <div class="elastic-layer-items">

                    <div class="elastic-layer-item f14">
                        <span class="calcfont calc-zhuangtai icon-left ChangeIconColor"></span>
                        <div class="item-right">
                            <div class="item-row">
                                <!-- <div class="lanText label-text" data-lanid="956_MSN"></div> -->
                                <div class="item-row-field"><span class="lanText label-text" data-lanid="956_MSN"></span></div>
                            </div>
                            <div class="item-row border-bottom not-required">
                                <div class="ListCellContentRight">
                                    <textarea data-field="MSNNew" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="956_MSN"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Matter-div" class="elastic-layer-item f14">
                        <span class="calcfont calc-shixiang icon-left ChangeIconColor"></span>
                        <div class="item-right">
                            <div class="item-row">
                                <!-- <div class="lanText label-text" data-lanid="947_商业事项"></div> -->
                                <div class="item-row-field"><span class="lanText label-text" data-lanid="947_商业事项"></span><span class="xinghao">*</span></div>
                            </div>
                            <div class="item-row border-bottom">
                                <div class="ListCellContentRight">
                                    <input type="text" data-field="MatterNew" data-lanid="947_商业事项" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="Matter" class="ListCellContentRightText" />
                                </div>
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                    </div>

                    <div id="MatterOther-div">
                        <div class="elastic-layer-item f14">
                            <span class="calcfont calc-qita1 icon-left ChangeIconColor"></span>
                            <div class="item-right">
                                <div class="item-row">
                                    <div class="item-row-field"><span class="lanText label-text" data-lanid="1000312_其他原因"></span></div>
                                </div>
                                <div class="item-row border-bottom not-required">
                                    <div class="ListCellContentRight">
                                        <textarea data-field="MatterOtherNew" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="elastic-layer-item f14">
                            <span class="calcfont calc-qita1 icon-left ChangeIconColor"></span>
                            <div class="item-right">
                                <div class="item-row border-bottom" style="margin-top:5px;">
                                    <textarea data-field="MatterOtherNew" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                                </div>
                            </div>
                        </div> -->
                    </div>

                    <div class="elastic-layer-item f14">
                        <span class="calcfont calc-beiwanglu icon-left ChangeIconColor"></span>
                        <div class="item-right">
                            <div class="item-row">
                                <div class="item-row-field"><span class="lanText label-text" data-lanid="719_备忘"></span><span class="xinghao">*</span></div>
                            </div>
                            <div class="item-row border-bottom not-required">
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

</div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
import InfoRightPanel from '@/components/customPlugin/InfoRightPanel'
import Infofooter from '@/components/customPlugin/infoFooter'
import DocumentList from '@/components/documentModule/DocumentList'

export default {
    name: 'opportunitiesinfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel,
        DocumentList
    },
    data() {
        return {
            ptitle: 'Opportunities detail',

            showPage: '1', //记录列表页是从哪个模块进来的 0：交易；1：商业机会
            isAddNew: true, //是否添加新纪录
            operation: true, //控制详情页header按钮，ture:显示可操作，false:隐藏
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示

            rightPanelFromType: "9", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            isShowSendBtn: true, //侧滑是否显示分享给同事选项
            //isShowClose:true, //侧滑是否显示关闭这个商业机会选项
            isShowClose: false, //侧滑是否显示关闭这个商业机会选项
            businessType: '', //侧滑 交易:29;商机:30
            closeThisContent: "",

            id: '', //dealPipeline id
            loi: '', //LOI单号
            showTips: false,
            isWinClose: true, //是否赢单关闭
            hasOtherReason: false, //是否有其他原因
            closeTitle: '',
            //会议记录数据
            MeetingNotice: [],
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
            seeMore: "",
            isInitiator: false, //是否当前记录的负责人（PS：只有负责人才可以操作单据）
            enableGoRecord: false //控制会议记录是否可点击
        }
    },

    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'opportunitiesinfo');

        _self.id = _self.$route.params.id || '';
        _self.rightPanelFromID = _self.id;
        _self.showPage = _self.$route.query.showPage.toString() || '';
        if (_self.showPage == '1') {
            _self.closeThisContent = lanTool.lanContent('944_关闭这个商业机会');
            _self.ptitle = this.$route.query.infoName || lanTool.lanContent('885_增加机会');
            _self.businessType = '30';
            _self.closeTitle = lanTool.lanContent('828_关闭商业机会');
        } else {
            _self.closeThisContent = lanTool.lanContent('945_关闭这个交易');
            _self.ptitle = this.$route.query.infoName || lanTool.lanContent('884_增加交易');
            _self.businessType = '29';
            _self.closeTitle = lanTool.lanContent('845_关闭交易');
        }

    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);
        //失去焦点，移除分割线颜色加深
        $(".textareaP:not(.wrap) textarea").blur(function () {
            $(this).parents(".DetailRow").removeClass("DeepColor");
        });
        //聚焦，添加分割线颜色加深
        $(".textareaP:not(.wrap) textarea").focus(function () {

            $(".OppList").find(".DetailRow").removeClass("DeepColor");
            $(this).parents(".DetailRow").addClass("DeepColor");
        });
        _self.seeMore = lanTool.lanContent("900_查看详细");
        var fromType = "Opportunitiesinfo";

        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            _self.isAddNew = true;
            _self.showTips = false; //隐藏提示
            _self.onlyView = false; //保存按钮展示
            $('.scroll-div').removeClass('disable');
            $('.controlEdit').removeClass('disable');
        } else {
            _self.isAddNew = false;
        }

        //隐藏order字段
        $(".MatterOtherObj").hide();

        //则联动清空联系人
        $("[data-field='ContactID']").text("").attr("data-fieldVal", "").off('click');
        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {

            //渲染textarea 从新增事件进到详情是不会进入渲染数据的方法，这里得多加个textarea高度自适应
            $("textarea").each(function (index, cur) {
                $(cur).height(tool.TextareaDefaultHeight);
                //  $(cur).addClass("DefaultHeight");
                tool.autoTextarea(cur);
            });

            //控制字段显示隐藏
            _self.controlFieldShowOrhide();

            //默认给data-field="Initiator"赋予23(公开) todo 这里要想个方法来赋值
            // 如是新增状态 默认给data-field="Initiator"赋予23(公开)
            if (_self.isAddNew) {
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

                //新建单据的状态为进行中
                var inProgressObj = tool.GetInProgressObj();
                if (!tool.isNullOrEmptyObject(inProgressObj)) {
                    $("[data-field='CurrentState']")
                        .val(inProgressObj.text || "")
                        .attr("data-fieldVal", inProgressObj.id)
                        .trigger("change");
                }

                $("[data-field='SourceFrom']").trigger("change");
            }

            //控制BusinessTypes字段不可修改
            _self.controlBusinessTypes();
            //控制TheName字段 在 Deal Pipeline下不可修改
            if (_self.showPage == '0') {
                $("[data-field='TheName']").addClass('disable color6').closest('.ListCell').removeClass('visible');
            } else {
                $("[data-field='TheName']").removeClass('disable color6').closest('.ListCell').addClass('visible');
            }

            //渲染数据
            tool.IniInfoData(fromType, _self.id, function (data) {
                // console.log(data);
                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height(tool.TextareaDefaultHeight);
                    // $(cur).addClass("DefaultHeight");
                    tool.autoTextarea(cur);
                });
                //查询判断当前用户是否有操作单据的权限
                _self.initUserAccess(data);

                //渲染会议记录列表
                // _self.iniMeetingNoteList();

                //渲染文档列表
                _self.InitDocList(_self.id, "9");

                //处理联动字段
                tool.linkageField(_self, 'TargetCompanyID', 'ContactID');

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function () {
                    //清空全局变量
                    eventBus.selectListData = null;
                });

                //LOI
                if (_self.showPage == 0) {
                    _self.loi = data.LOIID || '';
                }

                //关闭原因字段处理  100：赢单关闭；101：输单关闭
                if (data.CurrentState == 100) {
                    _self.isWinClose = true;
                } else {
                    _self.isWinClose = false;
                    // 111:竞争对手;112:"报价过高";113:其他
                    if (data.LoseReason == 113) {
                        _self.hasOtherReason = true;
                    } else {
                        _self.hasOtherReason = false;
                    }
                }

            });
        })

    },
    activated: function () {
        var _self = this;

        //处理联动字段
        tool.linkageField(_self, 'TargetCompanyID', 'ContactID');

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function (curObj) {

            //选择回填后根据回填的内容自适应高度
            if (curObj.is("textarea")) {
                curObj.height(tool.TextareaDefaultHeight);
                tool.autoTextarea(curObj[0]);
            }
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
                    curObj.closest('.shareBlock').find(".initiatorObj").hide();
                } else {
                    curObj.closest('.shareBlock').find(".initiatorObj").show();
                }
            });
            //控制data-field="SourceFrom"显示和隐藏
            $("[data-field='SourceFrom']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval != "109") {
                    curObj.closest('.shareBlock').find(".SourceFromObj").hide();
                } else {
                    curObj.closest('.shareBlock').find(".SourceFromObj").show();
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
                    $(".MatterOtherObj").show();
                } else {
                    $(".MatterOtherObj").hide();
                    //$(".MatterOtherObj textarea").val("");//清空文本数据=>不清空
                }
            });
            //控制data-field="LoseReason"显示和隐藏
            $("[data-field='CurrentStateNew']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval == "101") {
                    $("#LoseReason-div").show();
                } else {
                    $("#LoseReason-div,#LoseReasonOther-div").hide();
                }
            });
            //控制data-field="LoseReasonOther"显示和隐藏
            $("[data-field='LoseReasonNew']").off('change input').on('change input', function () {
                var curObj = $(this);
                if (tool.isNullOrEmptyObject(curObj)) {
                    return;
                }
                var fieldval = curObj.attr("data-fieldval");
                if (fieldval == "113") {
                    $("#LoseReasonOther-div").show();
                } else {
                    $("#LoseReasonOther-div").hide();
                }
            });
            //控制data-field="MatterOther"显示和隐藏
            $("[data-field='MatterNew']").off('change input').on('change input', function () {
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

        //查看/添加会议记录
        /*
        goRecord: function (e,AutoID) {
            var _self = this;
            if(_self.enableGoRecord == false){
                return ;
            }
            var target = $(e.target);
            var url = target.attr("data-url");
            var oppID = _self.$route.params.id;
            if(tool.isNullOrEmptyObject(oppID)){
                return;
            }
            oppID = Number(oppID)<=0?"":oppID;
            var scheduleID = "";

            var onlyView = false;
            //点击查看全部，把onlyView设置为true
            if(!tool.isNullOrEmptyObject(AutoID)){
                onlyView = _self.onlyView;
            }
            var parameter = {
                OppID:oppID,
                ScheduleID:scheduleID,
                onlyView:onlyView
            };

            _self.$router.push({
                path: url,
                query: parameter
            });
        },
        */

        //保存
        savePageData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Opportunitiesinfo";
            tool.SaveOrUpdateData(fromType, id, _self, function () {
                if (_self.showPage == '1') {
                    _self.$store.commit('REMOVE_ITEM', 'pitcheslist');
                } else {
                    _self.$store.commit('REMOVE_ITEM', 'pipelinelist');
                }
                _self.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
                _self.$router.back(-1);
            });

        },

        //删除
        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Opportunitiesinfo";
            tool.DeleteData(fromType, id, _self, function () {
                if (_self.showPage == '1') {
                    _self.$store.commit('REMOVE_ITEM', 'pitcheslist');
                } else {
                    _self.$store.commit('REMOVE_ITEM', 'pipelinelist');
                }
            });
        },

        //关注
        /*
        followToggle: function (e) {
            var _self = this;
            var autoID = _self.$route.params.id;
            var fromType = "dealPipeline";//或者opportunities都可以，同一张表
            var actionType;
            if ($(".guanZhu").hasClass("calc-shoucang")) {
               //取消关注
                actionType = 0;
            } else {
                //添加关注
                actionType = 1;
            }
            tool.UserFollow(fromType,autoID,actionType,function(){
              if ($(".guanZhu").hasClass("calc-shoucang")) {
                    //取消关注
                    $(".guanZhu").removeClass("calc-shoucang").addClass("calc-noshoucang");
                } else {
                    //添加关注
                    $(".guanZhu").removeClass("calc-noshoucang").addClass("calc-shoucang");
                }
          });
        },
        */

        //右侧点击关闭这个 //侧滑组件调用此方法
        rightPanelCloseThis: function () {
            var _self = this;
            var id = _self.id;

            //清空控件数据
            $("input[data-field='CurrentStateNew']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='LoseReasonNew']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='LoseReasonOtherNew']").val("");

            //显示弹框
            $('#closeThis').show();
            $('#closeThis').off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            })

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click', function () {
                $('#closeThis').hide();
            })

            //确定
            $('#closeThis').find('a.btn-ok').off('click').on('click', function () {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_OpportunityHandle_Close;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode()
                };
                jsonDatasTemp["CurrentState"] = $("[data-field='CurrentStateNew']").attr("data-fieldVal") || "";
                jsonDatasTemp["LoseReason"] = $("[data-field='LoseReasonNew']").attr("data-fieldVal") || "";
                jsonDatasTemp["LoseReasonOther"] = $("[data-field='LoseReasonOtherNew']").val() || "";
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

                            //将当前详情页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
                            //将列表页设置为非keep-alive
                            if (_self.showPage == '1') {
                                _self.$store.commit('REMOVE_ITEM', 'pitcheslist');
                            } else {
                                _self.$store.commit('REMOVE_ITEM', 'pipelinelist');
                            }
                            //返回到上一页
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
            });
        },

        //右侧点击转化为交易
        rightPanelTransformTo: function () {
            var _self = this;
            var id = _self.id;

            //清空控件数据
            $("[data-field='MSNNew']").val("");
            $("[data-field='MatterNew']").val("").attr("data-fieldVal", "").trigger('change');
            $("[data-field='MatterOtherNew']").val("");
            $("[data-field='DealMemo']").val(($("[data-field='Memo']").val() || ""));

            //显示弹框
            $('#transformTo').show();
            $('#transformTo').off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            })

            //取消
            $('#transformTo').find('a.btn-cancel').off('click').on('click', function () {
                $('#transformTo').hide();
            })

            //确定
            $('#transformTo').find('a.btn-ok').off('click').on('click', function () {
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_OpportunityHandle_ChangeToDeal;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode()
                };
                jsonDatasTemp["MSN"] = $("[data-field='MSNNew']").val() || "";
                jsonDatasTemp["Matter"] = $("[data-field='MatterNew']").attr("data-fieldVal") || "";
                jsonDatasTemp["MatterOther"] = $("[data-field='MatterOtherNew']").val() || "";
                jsonDatasTemp["TargetCompanyID"] = $("[data-field='TargetCompanyID']").attr("data-fieldVal") || "";
                jsonDatasTemp["FromOppID"] = id;
                jsonDatasTemp["Memo"] = $("[data-field='DealMemo']").val() || "";

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

                            //构造Deal详情页的跳转地址
                            var path = "/opportunitiesinfo/" + dealID;
                            var queryParam = {
                                showPage: "0",
                                infoName: theName
                            };
                            //将当前详情页设置为非keep-alive
                            _self.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
                            //将列表页设置为非keep-alive
                            if (_self.showPage == '1') {
                                _self.$store.commit('REMOVE_ITEM', 'pitcheslist');
                            } else {
                                _self.$store.commit('REMOVE_ITEM', 'pipelinelist');
                            }

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

        //右侧点击跳转到LOI详情
        rightPanelToLoi: function () {
            var _self = this;
            if (tool.isNullOrEmptyObject(_self.loi)) {
                return;
            }
            _self.$router.push('/loiinfo/' + _self.loi);
        },

        //获取成交对象
        getDealObj: function () {
            var textTemp = lanTool.lanContent("939_交易");
            var idTemp = 29;
            var obj = {
                id: idTemp,
                text: textTemp
            };

            return obj;
        },

        //获取销售机会对象
        getOpportunityObj: function () {
            var textTemp = lanTool.lanContent("940_机会");
            var idTemp = 30;
            var obj = {
                id: idTemp,
                text: textTemp
            };
            return obj;
        },

        //control BusinessTypes field
        controlBusinessTypes: function () {
            var _self = this;
            if (_self.isAddNew) {
                var businessSectorObj = {};
                if (_self.showPage == '0') {
                    businessSectorObj = _self.getDealObj();
                } else {
                    businessSectorObj = _self.getOpportunityObj();
                }
                if (!tool.isNullOrEmptyObject(businessSectorObj)) {
                    $("[data-field='BusinessTypes']")
                        .val(businessSectorObj.text || "")
                        .attr("data-fieldVal", businessSectorObj.id)
                        .addClass('disable')
                        .closest('.ListCellContent')
                        .addClass('color6');
                }
            } else {
                $("[data-field='BusinessTypes']")
                    .addClass('disable')
                    .closest('.ListCellContent')
                    .addClass('color6');
            }
        },

        //渲染会议记录列表
        /*
        iniMeetingNoteList:function(){
            var _self = this;

            var autoID = _self.id;
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_OpportunityHandle_QueryMeetingNoteListByOppID;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: autoID
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
                        return true;
                    }
                    //写入会议记录
                    //_self.MeetingNotice = data["MeetingNotice"]||[];
                    _self.MeetingNotice = data._OnlyOneData || [];
                    _self.enableGoRecord = true;
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    return true;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        */

        //删除会议记录
        /*
        deleteMeetingNote:function(autoID,e){
            var _self = this;
            if(tool.isNullOrEmptyObject(autoID)){
                return;
            }

            var idArr = [];
            idArr.push(autoID);
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_MeetingNoticeHandle_Delete;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: JSON.stringify(idArr)
            };

            tool.showConfirm(
                lanTool.lanContent("593_您确定要删除数据吗？"),
                function() {
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
                                return true;
                            }

                            //刷新会议列表
                            var fromType = "Opportunitiesinfo";
                            // tool.IniInfoData(fromType, _self.id, function(data){
                                //渲染会议记录列表
                                //_self.iniMeetingNoteList(data);
                            // });
                            //渲染会议记录列表
                            // _self.iniMeetingNoteList();
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
                function() {}
            );
        },
        */

        //点击去文件详情页
        /*
        goFileInfo:function(data){
            if(tool.isNullOrEmptyObject(data)){
                return ;
            }
            this.$router.push({path:'/previewfile', query: data});
        },
        */

        //只查看的情况 控制元素是否可修改
        controlEdit: function () {
            var _self = this;
            if (_self.onlyView) {
                _self.$nextTick(function () {
                    $('.controlEdit').addClass('disable');
                })
            } else {
                _self.$nextTick(function () {
                    $('.controlEdit').removeClass('disable');
                })
            }
        },
        //判断当前用户是否可以操作当前单据
        initUserAccess: function (oldData, myCallBack) {
            var _self = this;
            var fromType = "9";
            var fromID = _self.$route.params.id;
            var currentState = oldData["CurrentState"];

            //是否指定记录的负责人
            tool.IsHasInitiator(fromType, fromID, function (data) {
                _self.isInitiator = data;
                //若当前记录的状态为关闭
                if (currentState == "39" || currentState == "100" || currentState == "101") {
                    //显示提示
                    _self.showTips = true;
                    //头部按钮
                    //_self.onlyView = true;
                    _self.controlEdit();
                } else {
                    //必须是当前单据的负责人才可以操作单据
                    if (_self.isInitiator) {
                        //显示提示
                        _self.showTips = false;
                        //头部按钮
                        _self.onlyView = false;
                        _self.controlEdit();
                    } else {
                        //显示提示
                        _self.showTips = false;
                        //头部按钮
                        _self.onlyView = true;
                        _self.controlEdit();
                    }
                }
            });
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
        }
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'pitches' || to.name == 'pipeline') {
            this.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
        }
        next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/commonInfo.css";
@import "../../assets/css/pages/Opportunitiesinfo.css";

.OppList {
    /* padding-bottom: 0.4rem; */
    background-color: rgb(242, 242, 242);
}

.border-bottom.DeepColor::after {
    background-color: #ffc125;
}
</style>
