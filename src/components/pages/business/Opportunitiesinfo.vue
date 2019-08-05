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
            <!-- <div data-field="BusinessTypes" data-fieldControlType="hideDivText">{{showPage}}</div> -->

            <div v-show="showTips" class="tipBox">
                <div class="tipContent f12">
                    <span class="red">*</span>
                    <p class="zhuyi lanText" data-lanid="897_请注意，该记录已关闭，仅允许被查看。"></p>
                </div>
            </div>

            <!-- 名称 -->
            <div class="ListCell visible controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-yewujihui"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                          <textarea data-field="TheName" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="710_标题"></textarea>
                    </p>
                </div>
            </div>

            <!-- 交易模块才有的属性 -->
            <div v-show="showPage =='0'" class="OpportunitiesList controlEdit">
                    <!-- LOI单号 -->
                    <div class="ListSpecialCell" id="LOIIDClickObj">
                        <div class="ListSpecialCellField">
                            <div class="ListSpecialCellLeftIcon"><span class="calcfont calc-profile"></span></div>
                            <div class="ListSpecialCellFieldContent lanText" data-lanid="	1000227_LOI单号"></div>
                            <div class="ListSpecialCellRightIcon"><span class="calcfont calc-you"></span></div>
                        </div>
                        <div
                            class="ListSpecialCellContent"
                            data-field="LOIID"
                            data-fieldcontroltype="selectList"
                            data-lanid="1000227_LOI单号"
                            data-fieldval=""
                            data-selecttype="radio"
                            code="DropDowList_ViewBaseCompanyBaseInfHasContact"
                            typevalue=""
                            data-clickObj="LOIIDClickObj"
                            data-addUrl="/organizationsinfo"></div>
                    </div>

                    <!-- 商业事项 -->
                    <div class="ListCell visible" v-show="showPage=='0'">
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
                    </div>
                    <div class="ListCell visible MatterOtherObj" v-show="showPage=='0'">
                        <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont"></span></div>
                        <div class="ListCellLeftText">
                            <p class="textareaP">
                                <textarea data-field="MatterOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="952_其他"></textarea>
                            </p>
                        </div>
                    </div>

                    <!-- MSN -->
                    <div class="ListCell" v-show="showPage=='0'">
                        <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-feiji2"></span></div>
                        <div class="ListCellLeftText">
                            <p class="textareaP">
                                <textarea data-field="MSN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="956_MSN"></textarea>
                            </p>
                        </div>
                    </div>
            </div>

            <!-- 公司 -->
            <div class="ListSpecialCell visible" id="TargetCompanyIDClickObj">
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
            </div>

            <!-- 联系人 -->
            <div class="ListCell visible">
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
            </div>

            <!-- 机会来源   只有在商业机会可见-->
            <div v-show="showPage =='1'" class="shareBlock controlEdit">
                <div class="ListCell visible">
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
                                TypeValue="Accessabletype"
                                class="ListCellContentRightText"
                            ></div>
                            <div class="ListCellRightIcon">
                                <span class="calcfont calc-you"></span>
                            </div>
                        </div>
                </div>
                <div class="ListCell visible controlEdit initiatorObj">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-qita1"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                              <textarea data-field="SourceFromOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder"></textarea>
                        </p>
                    </div>
                </div>
            </div>

            <!-- 可访问 -->
            <div class="shareBlock controlEdit">
                <div class="ListCell visible">
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
                </div>

                <div class="ListCell visible initiatorObj">
                    <div class="ListCellLeftIcon"><span class="calcfont calc-fuzerenicon"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeft lanText" data-lanid="825_负责人"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <div
                              class="ListCellContentRightText"
                              data-field="Initiator"
                              data-fieldcontroltype="groupSelectList"
                              data-lanid="825_负责人"
                              data-fieldval=""
                              data-selecttype="checkbox"
                              code="DropDowList_PopedomTeamVsUser"
                              typevalue=""
                              data-fromType="6"
                            ></div>
                        </div>
                        <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                    </div>
                </div>
            </div>

            <!-- 风险提示 -->
            <div class="ListCell controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-fengxianyujing"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                        <textarea data-field="RiskTips" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="904_风险提示"></textarea>
                    </p>
                </div>
            </div>

            <!-- 备忘 -->
            <div class="ListCell controlEdit">
                <div class="ListCellLeftIcon textLeftIcon"><span class="calcfont calc-beiwanglu"></span></div>
                <div class="ListCellLeftText">
                    <p class="textareaP">
                        <textarea data-field="Memo" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="719_备忘"></textarea>
                    </p>
                </div>
            </div>

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
            <DocumentList
              v-show="!isAddNew"
              :document-data="documentData"
              addible="false"
              deletable="false"
            ></DocumentList>
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
    <InfoRightPanel
      ref="rightPanel"
      :isShowClose="isShowClose"
      :closeThisContent="closeThisContent"
      :isShowSend="isShowSendBtn"
      :rightPanelFromType="rightPanelFromType"
      :rightPanelFromID="rightPanelFromID"
      :businessType="businessType"></InfoRightPanel>


    <!-- 关闭交易/商业机会弹框 -->
    <div id="closeThis" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="845_关闭交易"></div>

            <div class="elastic-layer-items">
                <div class="elastic-layer-item f14">
                    <span class="nessesary f18">*</span>
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="728_状态"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                      <!-- data-field="CurrentStateNew" -->
                        <input type="text"
                              data-field="CurrentStateNew"
                              data-lanid="728_状态"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_DtbAllTypes"
                              TypeValue="CurrentStateNew"
                              class="ListCellContentRightText"/>
                    </div>
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>

                <div id="LoseReason-div" class="elastic-layer-item f14">
                    <span class="nessesary f18">*</span>
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="1152_输单原因"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <input type="text"
                              data-field="LoseReason"
                              data-lanid="1152_输单原因"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_DtbAllTypes"
                              TypeValue="LoseReason"
                              class="ListCellContentRightText"/>
                    </div>
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>

                <div id="LoseReasonOther-div">
                  <div class="elastic-layer-item f14">
                      <span class="nessesary f18">*</span>
                      <textarea data-field="LoseReasonOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                  </div>
                </div>

            </div>
            <div class="btn-div">
                <a href="javascript:;" class="mybtn btn-ok">确定</a>
                <a href="javascript:;" class="mybtn btn-cancel">取消</a>
            </div>

        </div>
    </div>


    <!-- 转换为交易弹框 -->
    <div id="transformTo" class="elastic-layer">
          <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1000239_转为交易"></div>

            <div class="elastic-layer-items">

                <div class="elastic-layer-item f14">
                    <span class="MSN_lable lanText" data-lanid="956_MSN"></span>
                    <textarea data-field="MSN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="956_MSN"></textarea>
                </div>

                <div id="Matter-div" class="elastic-layer-item f14">
                    <span class="nessesary f18">*</span>
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="947_商业事项"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <input type="text"
                              data-field="Matter"
                              data-lanid="947_商业事项"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_DtbAllTypes"
                              TypeValue="Matter"
                              class="ListCellContentRightText"/>
                    </div>
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>

                <div id="MatterOther-div">
                    <div class="elastic-layer-item f14">
                        <span class="nessesary f18">*</span>
                        <textarea data-field="MatterOther" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="1000312_其他原因"></textarea>
                    </div>
                </div>

            </div>
            <div class="btn-div">
                <a href="javascript:;" class="mybtn btn-ok">确定</a>
                <a href="javascript:;" class="mybtn btn-cancel">取消</a>
            </div>

        </div>
    </div>


</div>
</template>

<script>
import Infoheader from '@/components/common/Infoheader'
import InfoRightPanel from '@/components/common/InfoRightPanel'
import Infofooter from '@/components/common/infoFooter'
import DocumentList from '@/components/common/DocumentList'

export default {
    name:'opportunitiesinfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel,
        DocumentList
    },
    data() {
        return {
            ptitle: 'Opportunities detail',

            showPage:'',//记录列表页是从哪个模块进来的 0：交易；1：商业机会
            isAddNew: false, //是否添加新纪录
            operation:true,//控制详情页header按钮，ture:显示可操作，false:隐藏
            onlyView:false,//控制页面头部icon,true:不显示头部icon,false:显示

            rightPanelFromType:"9",//传给右侧菜单用的参数
            rightPanelFromID:"",//传给右侧菜单用的参数
            isShowSendBtn: true,  //侧滑是否显示分享给同事选项
            isShowClose:true, //侧滑是否显示关闭这个商业机会选项
            businessType:'',  //侧滑 交易:29;商机:30
            closeThisContent:"",

            id:'', //dealPipeline id
            showTips:false,
            //会议记录数据
            MeetingNotice:[],
            //文档数据
            documentData:[
              {
                AddTime: "2019-07-31 18:31:00",
                AddUserName: "dylanxu",
                AutoID: "765411",
                FileLength: "54768",
                ObjectName: "Project Management - CRM_PC(20190625)_V6_19073118305794.xlsx",
                ObjectRemark: "test",
              },
              {
                AddTime: "2019-07-26 14:09:00",
                AddUserName: "ceshi",
                AutoID: "765386",
                FileLength: "240704",
                ObjectName: "t01ecab926fd33d8055_19072614092088.jpg",
                ObjectRemark: ""
              },
              {
                AddTime: "2019-07-26 13:57:00",
                AddUserName: "alancheng",
                AutoID: "765385",
                FileLength: "1022368",
                ObjectName: "MYXJ_20150716224149_save_19072613564350.png",
                ObjectRemark: ""
              }
            ],
            seeMore:"",
            isInitiator:false,//是否当前记录的负责人（PS：只有负责人才可以操作单据）

            enableGoRecord:false  //控制会议记录是否可点击

        }
    },

    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'opportunitiesinfo');

        _self.id = _self.$route.params.id || '';
        _self.rightPanelFromID = _self.id;
        _self.showPage = _self.$route.query.showPage.toString() || '';
        if (_self.showPage == '1')
        {
            _self.closeThisContent = lanTool.lanContent('944_关闭这个商业机会');
            _self.ptitle = this.$route.query.infoName || lanTool.lanContent('885_增加机会');
            _self.businessType = '30';
        } else {
            _self.closeThisContent = lanTool.lanContent('945_关闭这个交易');
            _self.ptitle =this.$route.query.infoName || lanTool.lanContent('884_增加交易');
            _self.businessType = '29';
        }

    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);
        _self.seeMore =lanTool.lanContent("900_查看详细");
        var fromType = "Opportunitiesinfo";

        //若是新增，则隐藏新增不需要显示的模块
        if(tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0){
            _self.isAddNew = true;
            _self.showTips = false; //隐藏提示
             _self.onlyView = false;//保存按钮展示
            $('.scroll-div').removeClass('disable');
            $('.controlEdit').removeClass('disable');
        }else{
            _self.isAddNew = false;
        }

        //隐藏order字段
        $(".MatterOtherObj").hide();

        //则联动清空联系人
        $("[data-field='ContactID']").text("").attr("data-fieldVal", "").off('click');
        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function(){

            //渲染textarea 从新增事件进到详情是不会进入渲染数据的方法，这里得多加个textarea高度自适应
            $("textarea").each(function (index, cur) {
                $(cur).height('25');
                tool.autoTextarea(cur);
            });

            //控制字段显示隐藏
            _self.controlFieldShowOrhide();

            //默认给data-field="Initiator"赋予23(公开) todo 这里要想个方法来赋值
            // 如是新增状态 默认给data-field="Initiator"赋予23(公开)
            if (_self.isAddNew) {
                var publicObj = tool.GetPublicObj();
                if (!tool.isNullOrEmptyObject(publicObj)) {
                    $("[data-field='IsPublic']")
                        .val(publicObj.text || "")
                        .attr("data-fieldVal", publicObj.id)
                        .trigger("change");
                }

                $("[data-field='SourceFrom']").trigger("change");
            }

            //控制BusinessTypes字段不可修改
            _self.controlBusinessTypes();
            //控制TheName字段 在 Deal Pipeline 下不可修改
            if(_self.showPage == '0'){
                $("[data-field='TheName']").addClass('disable color6').closest('.ListCell').removeClass('visible');
            }else{
                $("[data-field='TheName']").removeClass('disable color6').closest('.ListCell').addClass('visible');
            }

            //渲染数据
            tool.IniInfoData(fromType, _self.id, function(data){
                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height('25');
                    tool.autoTextarea(cur);
                });
                //查询判断当前用户是否有操作单据的权限
                _self.initUserAccess(data);

                //渲染会议记录列表
                // _self.iniMeetingNoteList();

                //处理联动字段
                tool.linkageField(_self, 'TargetCompanyID', 'ContactID');

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function(){
                    //清空全局变量
                    eventBus.selectListData = null;
                })

            });
        })

    },
    activated:function(){
        var _self = this;

        //处理联动字段
        tool.linkageField(_self, 'TargetCompanyID', 'ContactID');

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function(){
            //清空全局变量
            eventBus.selectListData = null;
        })

    },
    methods: {
        //控制字段显示隐藏
        controlFieldShowOrhide:function(){
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
              if (fieldval == "23") {
                  curObj.closest('.shareBlock').find(".initiatorObj").hide();
              } else {
                  curObj.closest('.shareBlock').find(".initiatorObj").show();
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
              if (fieldval == "113") {
                  $("#LoseReason-div").show();
              } else {
                  $("#LoseReason-div").hide();
              }
          });
          //控制data-field="LoseReasonOther"显示和隐藏
          $("[data-field='LoseReason']").off('change input').on('change input', function () {
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
        savePageData:function(e){
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Opportunitiesinfo";
            tool.SaveOrUpdateData(fromType, id, _self, function () {
                  _self.$store.commit('REMOVE_ITEM', 'businessCategories');
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
                _self.$store.commit('REMOVE_ITEM', 'businessCategories');
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
        rightPanelCloseThis:function(){
            var _self = this;
            var id = _self.id;
            $('#closeThis').show();

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click',function(){
                $('#closeThis').hide();
            })

            //确定
            $('#closeThis').find('a.btn-ok').off('click').on('click',function(){
                  // var fromType = "Opportunitiesinfo";
                  var urlTemp = tool.AjaxBaseUrl();
                  var controlName = tool.Api_OpportunityHandle_Close;
                  //传入参数
                  var jsonDatasTemp = {
                      CurrentLanguageVersion: lanTool.currentLanguageVersion,
                      UserName: tool.UserName(),
                      _ControlName: controlName,
                      _RegisterCode: tool.RegisterCode(),
                      AutoID: id
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
                            return true;
                        }
                        _self.$store.commit('REMOVE_ITEM', 'businessCategories');
                        //返回到上一页
                        _self.$router.back(-1);
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

                  //调子组件 收起侧滑方法
                  _self.$refs.rightPanel.panelToggle();

            })
        },

        //右侧点击转化为交易
        rightPanelTransformTo:function(){
            var _self = this;
            var id = _self.id;
            $('#transformTo').show();

            //取消
            $('#transformTo').find('a.btn-cancel').off('click').on('click',function(){
                $('#transformTo').hide();
            })

            //确定
            $('#transformTo').find('a.btn-ok').off('click').on('click',function(){
                  // var fromType = "Opportunitiesinfo";
                  /*
                  var urlTemp = tool.AjaxBaseUrl();
                  var controlName = tool.Api_OpportunityHandle_Close;
                  //传入参数
                  var jsonDatasTemp = {
                      CurrentLanguageVersion: lanTool.currentLanguageVersion,
                      UserName: tool.UserName(),
                      _ControlName: controlName,
                      _RegisterCode: tool.RegisterCode(),
                      AutoID: id
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
                            return true;
                        }
                        _self.$store.commit('REMOVE_ITEM', 'businessCategories');
                        //返回到上一页
                        _self.$router.back(-1);
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
                  */

                  $('#transformTo').hide();
                  //调子组件 收起侧滑方法
                  _self.$refs.rightPanel.panelToggle();

            })
        },

        //获取成交对象
        getDealObj : function(){
          var textTemp =  lanTool.lanContent("939_交易");
          var idTemp = 29;
          var obj = {
            id : idTemp,
            text : textTemp
          };

          return obj;
        },

        //获取销售机会对象
        getOpportunityObj : function(){
          var textTemp =  lanTool.lanContent("940_机会");
          var idTemp = 30;
          var obj = {
            id : idTemp,
            text : textTemp
          };
          return obj;
        },

        //control BusinessTypes field
        controlBusinessTypes:function(){
            var _self = this;
            if (_self.isAddNew) {
                var businessSectorObj = {};
                if(_self.showPage == '0'){
                    businessSectorObj = _self.getDealObj();
                }else{
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
            }else{
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
        controlEdit:function(){
            var _self = this;
            if(_self.onlyView){
                _self.$nextTick(function(){
                    $('.controlEdit').addClass('disable');
                })
            }else{
                _self.$nextTick(function(){
                    $('.controlEdit').removeClass('disable');
                })
            }
        },
        //判断当前用户是否可以操作当前单据
        initUserAccess:function(oldData,myCallBack){
            var _self = this;
            var fromType = "9";
            var fromID = _self.$route.params.id;
            var currentState = oldData["CurrentState"];

            //是否指定记录的负责人
            tool.IsHasInitiator(fromType,fromID,function(data){
                _self.isInitiator = data;

                if(currentState == "39"){
                    //显示提示
                    _self.showTips = true;
                    //头部按钮
                    _self.onlyView = true;
                    _self.controlEdit();
                }else{
                    //必须是当前单据的负责人才可以操作单据
                    if(_self.isInitiator){
                        //显示提示
                        _self.showTips = false;
                        //头部按钮
                        _self.onlyView = false;
                        _self.controlEdit();
                    }else{
                        //显示提示
                        _self.showTips = false;
                        //头部按钮
                        _self.onlyView = true;
                        _self.controlEdit();
                    }
                }
            });
        },

    },
    beforeRouteLeave:function(to, from, next){
        if(to.name == 'businessCategories'){
            this.$store.commit('REMOVE_ITEM', 'opportunitiesinfo');
        }
        next();
    }
}
</script>

<style scoped>
@import "../../../assets/css/pages/calendarinfo.css";
@import "../../../assets/css/pages/Opportunitiesinfo.css";
</style>
