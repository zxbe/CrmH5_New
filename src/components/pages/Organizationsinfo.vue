<template>
<div>

    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>

    <div class="scroll-div">
        <div class="box">
            <div class="OrganizationsList">
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-en"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="ShortNameEN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="733_英文名称"></textarea>
                        </p>
                    </div>
                </div>
                <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-CH"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="ShortNameCN" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="32_中文名称"></textarea>
                        </p>
                    </div>
                </div>
                <div class="ListCell">
                    <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-icaocode"></span></div>
                    <div class="ListCellLeftText">
                        <p class="textareaP">
                            <textarea data-field="ICAOCode" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="800_ICAO编码"></textarea>
                        </p>
                    </div>
                </div>
                <div class="ListCell visible">
                    <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-yewu"></span></div>
                    <div class="ListCellContent">
                        <div class="ListCellContentLeft leftContent">
                            <div class="ListCellContentLeftText lanText" data-lanid="1007_业务分类"></div>
                        </div>
                        <div class="ListCellContentRight rightContent">
                            <input type="text" data-field="BusinessType" data-lanid="1007_业务分类" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_ViewBaseAllTypes" TypeValue="Companybusinesstype" class="ListCellContentRightText"/>
                        </div>
                            <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <div class="ListCell">
                        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-nationaarea"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="701_国家"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <div
                                  data-field="CountryID"
                                  data-fieldControlType="selectList"
                                  data-lanid="701_国家"
                                  data-fieldVal=""
                                  Code="DropDowList_ViewBaseCountryInf"
                                  data-selectType="radio"
                                  class="ListCellContentRightText" />
                            </div>
                            <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <div class="ListCell">
                        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-diqiuquanqiu"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="702_城市"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <div
                                  data-field="CityID"
                                  data-fieldControlType="linkSelectList"
                                  data-lanid="702_城市"
                                  data-fieldVal=""
                                  Code="DropDowList_ViewBaseCountryCity"
                                  data-selectType="radio"
                                  class="ListCellContentRightText" />
                            </div>
                            <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <div class="ListCell">
                        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-chengshijingli"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="785_客户经理"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <div data-field="AccountManager" data-fieldControlType="selectList" data-lanid="785_客户经理" data-fieldVal="" Code="DropDowList_AccountManager" data-selectType="radio" class="ListCellContentRightText" />
                            </div>
                            <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                        </div>
                    </div>
                    <div class="ListCell">
                        <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-kehuguanli"></span></div>
                        <div class="ListCellContent">
                            <div class="ListCellContentLeft leftContent">
                                <div class="ListCellContentLeftText lanText" data-lanid="787_是否为现有客户"></div>
                            </div>
                            <div class="ListCellContentRight rightContent">
                                <input type="text" data-field="ExistingCustomer" data-fieldControlType="picker" data-fieldVal="" Code="DropDowList_DtbAllTypes" TypeValue="YesOrNo" class="ListCellContentRightText"/>
                        </div>
                                <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                            </div>
                        </div>
                        <div class="ListCell HideWhenNew">
                            <div class="ListCellLeftIcon textLeftIcon" @click="followToggle"><span data-field="IsFollow" data-fieldControlType="icon" data-fieldVal="{'true':'calc-shoucang','false':'calc-noshoucang'}" data-defaultVal="false" class="mui-icon calcfont guanZhu"></span></div>
                            <div class="ListCellLeftText">
                                <p class="textareaP lanText" data-lanid="786_关注"></p>
                            </div>
                        </div>
                    </div>
                    <div class="showMoreList" style="display:block">
                        <div class="MoreList">
                            <div class="ListCell">
                                <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-shenqingpingji"></span></div>
                                <div class="ListCellLeftText">
                                    <p class="textareaP">
                                        <textarea data-field="Rating" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="788_评级"></textarea>
                                    </p>
                                </div>
                            </div>
                            <div class="ListCell">
                                <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-location"></span></div>
                                <div class="ListCellLeftText">
                                    <p class="textareaP">
                                        <textarea data-field="RegistrationAddress" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="251_地址"></textarea>
                                    </p>
                                </div>
                            </div>
                            <div class="ListCell">
                                <div class="ListCellLeftIcon textLeftIcon"><span class="mui-icon calcfont calc-beizhu"></span></div>
                                <div class="ListCellLeftText">
                                    <p class="textareaP">
                                        <textarea data-field="OtherRemark" data-fieldControlType="textareaInput" class="lanInputPlaceHolder" data-lanid="580_备注"></textarea>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <!-- HideWhenNew -->
                        <div v-show="!isAddNew" class="contactList">
                            <div class="ListCell" @click="goToContactsPage">
                                <div class="ListCellLeftIcon"><span class="mui-icon calcfont calc-lianxiren2"></span></div>
                                <div class="ListCellContent">
                                    <div class="ListCellContentLeft leftContent">
                                        <div class="ListCellContentLeftText lanText" data-lanid="791_联系人"></div>
                                    </div>
                                    <div class="ListCellContentRight rightContent">
                                        <div class="ListCellContentRightText"></div>
                                    </div>
                                    <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                                </div>
                            </div>
                        </div>
                        <!-- <Uploadfile></Uploadfile> -->

                        <!-- <Infofooter :modifiedtime="modifiedtime" :modifiedby="modifiedby"> </Infofooter> -->
                        <Infofooter v-show="!isAddNew"></Infofooter>

                    </div>
                </div>
            </div>
            <InfoRightPanel :isShowClose="isShowClose" :isShowSend="isShowSendBtn" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID"></InfoRightPanel>

        </div>
</template>

<script>
import Infoheader from '../common/Infoheader'
import InfoRightPanel from '../common/InfoRightPanel'
import Infofooter from '../common/infoFooter'
import Uploadfile from './Uploadfile'

export default {
    name:'organizationsinfo',
    components: {
        Infoheader,
        Infofooter,
        Uploadfile,
        InfoRightPanel
    },
    data() {
        return {

            ptitle: 'Organizationsinfo detail',
            id:'',

            isAddNew: false, //是否添加新纪录
            operation: false, //控制详情页header按钮，ture:显示可操作，false:隐藏
            onlyView: false, //控制页面头部icon,true:不显示头部icon,false:显示
            onlyMore: false,

            isFirstEnter: false, //是否首次进入

            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            isShowSendBtn: false, //侧滑是否显示分享给同事选项
            isShowClose: false, //侧滑是否显示关闭这个商业机会选项
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {
        let _self = this;
        _self.$store.commit('SET_ITEM', 'organizationsinfo');
        _self.ptitle = this.$route.query.infoName || lanTool.lanContent("792_添加公司");

        _self.onlyView = (_self.$route.query.onlyView == "true" || _self.$route.query.onlyView == true) ? true : false;
    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();

        let fromType = "Organizationsinfo";

        _self.id = _self.$route.params.id;
        //若是新增，则隐藏新增不需要显示的模块
        if (tool.isNullOrEmptyObject(_self.id) || Number(_self.id) <= 0) {
            $(".HideWhenNew").hide();
            _self.isAddNew = true;
        } else {
            $(".HideWhenNew").show();
            _self.isAddNew = false;
        }

        //如果是只查看，控制元素不可以更改
        _self.controlEdit();

        //则联动清空城市
        $("[data-field='CityID']").text("").attr("data-fieldVal", "").off('click');
        //渲染控件
        tool.InitiateInfoPageControl(_self, _self.id, function () {
            //渲染textarea 从新增事件进到详情是不会进入渲染数据的方法，这里得多加个textarea高度自适应
            $("textarea").each(function (index, cur) {
                $(cur).height('25');
                tool.autoTextarea(cur);
            });
            //渲染数据
            tool.IniInfoData(fromType, _self.id, function () {

                //渲染textarea
                $("textarea").each(function (index, cur) {
                    $(cur).height('25');
                    tool.autoTextarea(cur);
                });

                //处理联动字段
                tool.linkageField(_self, 'CountryID', 'CityID');

                //返回时更新selectlist控件的结果
                tool.UpdateFieldValueFromBack(eventBus, function(){
                    //清空全局变量
                    eventBus.selectListData = null;
                })
            });
        });
    },
    activated: function () {
        var _self = this;
        //处理联动字段
        tool.linkageField(_self, 'CountryID', 'CityID');

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function(){
            //清空全局变量
            eventBus.selectListData = null;
        })

    },
    methods: {
        //跳转到联系人界面事件
        goToContactsPage: function () {
            var _self = this;
            var companyID = _self.$route.params.id || "";
            var companyName = $('[data-field="ShortNameEN"]').val() || '';

            if (tool.isNullOrEmptyObject(companyID) || tool.isNullOrEmptyObject(companyName)) {
                return;
            }
            var urlTemp = "/contactsof";
           var infoName =lanTool.lanContent("791_联系人") ||"";
            var parameter = {
                companyID: companyID,
                companyName: companyName,
                infoName:infoName
            };
            _self.$router.push({
                path: urlTemp,
                query: parameter
            });
        },

        followToggle: function (e) {
            var _self = this;
            var autoID = _self.$route.params.id;
            var fromType = "Organizationsinfo";
            var actionType;
            if ($(".guanZhu").hasClass("calc-shoucang")) {
                //取消关注
                actionType = 0;
            } else {
                //添加关注
                actionType = 1;
            }

            tool.UserFollow(fromType, autoID, actionType, function () {
                if ($(".guanZhu").hasClass("calc-shoucang")) {
                    //取消关注
                    $(".guanZhu").removeClass("calc-shoucang").addClass("calc-noshoucang");
                } else {
                    //添加关注
                    $(".guanZhu").removeClass("calc-noshoucang").addClass("calc-shoucang");
                }
            });
        },

        savePageData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Organizationsinfo";
            tool.SaveOrUpdateData(fromType, id, _self, function () {
                _self.$store.commit('REMOVE_ITEM', 'contacts');
                _self.$store.commit('REMOVE_ITEM', 'organizationsinfo');
                 _self.$router.back(-1);
            });
        },

        deleteData: function (e) {
            var _self = this;
            var id = _self.$route.params.id;
            var fromType = "Organizationsinfo";
            tool.DeleteData(fromType, id, _self, function () {});
        },

        //只查看的情况 控制元素是否可修改
        controlEdit:function(){
            var _self = this;
            if(_self.onlyView){
                _self.$nextTick(function(){
                    $('.OrganizationsList,.MoreList').addClass('disable');
                })
            }else{
                _self.$nextTick(function(){
                    $('.OrganizationsList,.MoreList').removeClass('disable');
                })
            }
        }
    },

    beforeRouteLeave:function(to, from, next){
        if(to.name == 'contacts' || to.name == 'contactsinfo'){
            this.$store.commit('REMOVE_ITEM', 'organizationsinfo');
        }
        next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";

.ListCell .mui-icon.calcfont.calc-shoucang {
    color: #FF5A21 !important;
}

.contactList {
    margin-top: 10px;
}

.contactList .ListCell:after {
    background-color: #fff;
}

.contactList .ListCellContentLeftText {
    font-weight: 700;
}
</style>
