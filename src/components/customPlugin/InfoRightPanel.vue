<template>
<div>

    <div id="mask" class="mask" @click="panelToggle" v-show="showPanel"></div>
    <div id="right-content" class="right-content">

        <div right-content-block id="generalBlock">
            <div class="right-content-header f16 lanText" data-lanid="943_操作"></div>
            <div class="right-content-list f14">
                <div class="right-content-list-cell" v-show="isShowClose" @click="closeThis"><span class="mui-icon calcfont calc-jieshu">{{closeThisContent}}</span></div>
                <div class="right-content-list-cell" v-show="isShowSend" @click="showShareList"><span class="mui-icon calcfont calc-Share lanText" data-lanid="946_分享给同事"></span></div>
                <!-- <div id="rightPanelCloseThisOpp" class="right-content-list-cell" v-show="isShowCloseOpp"><span class="mui-icon calcfont calc-jieshu lanText" data-lanid="944_关闭这个商业机会"></span></div> -->
                <!-- <div id="rightPanelCloseThisDeal" class="right-content-list-cell" v-show="isShowCloseDeal"><span class="mui-icon calcfont calc-jiaoyi lanText" data-lanid="945_关闭这个交易"></span></div> -->
                <!-- <div class="right-content-list-cell"><span class="mui-icon calcfont calc-fenxiang1"></span>Send to Chat</div> -->
                <div class="right-content-list-cell" v-show="isShowMeetingLink" @click="goToMeetingList"><span class="mui-icon calcfont calc-huiyi lanText" data-lanid="619_会议"></span></div>
                <div class="right-content-list-cell" v-show="isShowContactsLink" @click="goToContactsList"><span class="mui-icon calcfont calc-kehulianxiren lanText" data-lanid="630_联系人"></span></div>
                <div class="right-content-list-cell" v-show="isShowOrganizationsInfoLink" @click="goToOrganizationsInfo"><span class="mui-icon calcfont calc-gongsixinxi lanText" data-lanid="851_查看公司信息"></span></div>
                <div class="right-content-list-cell" v-show="isShowPowerUserLink" @click="goToPowerUserPage"><span class="mui-icon calcfont calc-yidu lanText" data-lanid="852_查看有权限访问的同事"></span></div>
                <div class="right-content-list-cell" v-show="isShowDealLink" @click="goToDealListPage"><span class="mui-icon calcfont calc-handshake-o lanText" data-lanid="817_交易"></span></div>
                <div class="right-content-list-cell" v-show="isShowDealLink" @click="goToOpportunityListPage"><span class="mui-icon calcfont calc-jiezhishijianicon lanText" data-lanid="649_商业机会"></span></div>
                <div class="right-content-list-cell" v-show="isShowSynchronizeLink" @click="SynchronousCamCardData"><span class="mui-icon calcfont calc-exchange lanText" data-lanid="1000193_同步CamCard数据"></span></div>

                <div v-if="rightPanelFromType != '8'">
                  <div class="right-content-list-cell" v-show="isShowTransformLink" @click="transformTo"><span class="mui-icon calcfont calc-exchange lanText" data-lanid="1000239_转为交易"></span></div>
                  <div class="right-content-list-cell" v-show="isShowPitchTransformLink" @click="pitchTrantransformTo"><span class="mui-icon calcfont calc-exchange lanText" data-lanid="1000366_转为商机"></span></div>
                </div>
                <div v-else>
                  <div class="right-content-list-cell" v-show="transformation" @click="transformTo"><span class="mui-icon calcfont calc-exchange lanText" data-lanid="1000239_转为交易"></span></div>
                  <div class="right-content-list-cell" v-show="transformation" @click="pitchTrantransformTo"><span class="mui-icon calcfont calc-exchange lanText" data-lanid="1000366_转为商机"></span></div>
                </div>

                <div class="right-content-list-cell" v-show="loi !='' && loi !=undefined && loi !=null" @click="goToLoiinfo"><span class="mui-icon calcfont calc-profile lanText" data-lanid="1000227_LOI单号"></span></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            showPanel: false,
            classificationValue: '', //右侧分类
            dataFilter: [],
            // isShowClose:false,
            isShowMeetingLink: false,
            isShowContactsLink: false,
            isShowOrganizationsInfoLink: false,
            isShowPowerUserLink: false,
            isShowDealLink: false,
            isShowSynchronizeLink: false,
            isShowTransformLink: false,
            isShowPitchTransformLink:false,
        }
    },
    props: ['isShowSend', 'isShowClose', 'closeThisContent', 'rightPanelFromType', 'rightPanelFromID', 'businessType', 'loi',
          'transformation' //只有meeting模块用到，控制是否可转换为机会或交易
    ],

    created: function () {
        var _self = this;
        //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
        switch (_self.rightPanelFromType) {
            case "6":
                _self.isShowMeetingLink = true;
                _self.isShowPowerUserLink = true;
                _self.isShowDealLink = true;
                _self.isShowSynchronizeLink = true;
                _self.isShowOrganizationsInfoLink = true;
                break;
            case "7":
                _self.isShowMeetingLink = true;
                _self.isShowDealLink = true;
                _self.isShowSynchronizeLink = true;
                _self.isShowContactsLink = true;
                break;
            case "8":
                _self.isShowPowerUserLink = true;
                // _self.isShowPitchTransformLink = false;
                // _self.isShowTransformLink = false;
                break;
            case "9":
                _self.isShowMeetingLink = true;
                _self.isShowPowerUserLink = true;
                _self.isShowDealLink = false;
                _self.isShowSynchronizeLink = false;
                if (_self.businessType == '30') {
                    _self.isShowTransformLink = true;
                }
                break;
            case "11":
                _self.isShowMeetingLink = true;
                _self.isShowContactsLink = true;
                _self.isShowDealLink = true;
                break;
            default:
                break;
        }
    },
    mounted: function () {
        lanTool.updateLanVersion();
        eventBus.$on('gengduoEvent', this.panelToggle);
        this.panelToggle(false);
    },
    activated: function () {},

    methods: {
        //点击关闭
        closeThis: function () {
            this.$parent.rightPanelCloseThis();
        },
        //点击转换为交易
        transformTo: function () {
            this.$parent.rightPanelTransformTo();
        },
        //点击转为商机
        pitchTrantransformTo:function(){
           this.$parent.rightPanelPitchTransformTo();
        },
        //点击跳转到loi单号详情
        goToLoiinfo: function () {
            var _self = this;
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$parent.rightPanelToLoi();
            })
        },

        //侧滑
        //isClose值如果为false，表示刚进页面收起侧滑；
        //如果没传isClose值showPanel就取反，表示正常的展开收起
        panelToggle: function (isClose) {
            var _self = this;
            if (isClose == false) {
                _self.showPanel = isClose;
            } else {
                _self.showPanel = !_self.showPanel;
            }
            if (_self.showPanel) {

                _self.$nextTick(function () {
                    $('#right-content').css({
                        'left': '30%',
                        'transition': 'left 0.2s ease-out',
                        '-moz-transition': 'left 0.2s ease-out',
                        '-webkit-transition': 'left 0.2s ease-out',
                        '-o-transition': 'left 0.2s ease-out'
                    })
                    $('#mask,#right-content').off('touchmove').on("touchmove", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                })

            } else {
                _self.$nextTick(function () {
                    $('#right-content').css({
                        'left': '100%',
                        'transition': 'left 0.3s ease-out',
                        '-moz-transition': 'left 0.3s ease-out',
                        '-webkit-transition': 'left 0.3s ease-out',
                        '-o-transition': 'left 0.3s ease-out'
                    });
                })
            }
        },
        //跳转到分享列表
        showShareList: function () {
            var _self = this;
            var parameter = {
                rightPanelFromType: _self.rightPanelFromType, //来源类型
                rightPanelFromID: _self.rightPanelFromID //来源ID
            };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: '/sharelist',
                    query: parameter
                });
            })
        },
        //跳转会议列表
        goToMeetingList: function () {
            var _self = this;
            var parameter = {
                fromType: _self.rightPanelFromType,
                fromId: _self.rightPanelFromID
            };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: "/meetingof",
                    query: parameter
                });
            })
        },
        //跳转到联系人列表
        goToContactsList: function () {
            var _self = this;
            // var parameter = {
            //     fromType: _self.rightPanelFromType,
            //     fromId: _self.rightPanelFromID
            // };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$parent.goToContactsPage();
                // _self.$router.push({
                //     path: "/contactsof",
                //     query: parameter
                // });
            })
        },
        //跳转到公司详情
        goToOrganizationsInfo: function () {
            var _self = this;
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$parent.goToOrganizationsInfo();
            })
        },
        //查看有权限访问的同事
        goToPowerUserPage: function () {
            var _self = this;
            var fromType = _self.rightPanelFromType;
            var fromID = _self.$route.params.id || "";
            if (tool.isNullOrEmptyObject(fromID)) {
                return;
            }
            var parameter = {
                fromType: fromType,
                fromID: fromID
            };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: "/poweruser",
                    query: parameter
                });
            })
        },
        //查看关联的交易列表
        goToDealListPage: function () {
            // console.log("查看关联的交易列表");
            var _self = this;
            var parameter = {
                fromType: _self.rightPanelFromType,
                fromId: _self.rightPanelFromID,
                businessType: "29"
            };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: "/businesslist",
                    query: parameter
                });
            })
        },
        //查看关联的商业机会列表
        goToOpportunityListPage: function () {
            var _self = this;
            var parameter = {
                fromType: _self.rightPanelFromType,
                fromId: _self.rightPanelFromID,
                businessType: "30"
            };
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: "/businesslist",
                    query: parameter
                });
            })
        },
        //同步Camcard数据
        SynchronousCamCardData: function () {
            var _self = this;
            tool.showConfirm(
                lanTool.lanContent("1000212_同步Camcard数据将会覆盖本地数据，是否确定同步？"),
                function () {
                    //请求地址
                    var urlTemp = tool.AjaxBaseUrl();
                    var controlName = "";
                    if (_self.rightPanelFromType == "6") {
                        //联系人
                        controlName = tool.Api_CamcardDataHandle_SyncContactData;
                    } else if (_self.rightPanelFromType == "7") {
                        //公司
                        controlName = tool.Api_CamcardDataHandle_SyncCompanyData;
                    } else {
                        //其他
                        return false;
                    }

                    //传入参数
                    var jsonDatasTemp = {
                        CurrentLanguageVersion: lanTool.currentLanguageVersion,
                        UserName: tool.UserName(),
                        _ControlName: controlName,
                        _RegisterCode: tool.RegisterCode(),
                        AutoID: _self.rightPanelFromID
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
                            tool.showText(tool.getMessage(data));
                            window.location.reload();
                        },
                        error: function (jqXHR, type, error) {
                            tool.hideLoading(loadingIndexClassName);
                            console.log(error);
                            return;
                        },
                        complete: function () {
                            //隐藏虚拟键盘
                            document.activeElement.blur();
                        }
                    });
                },
                function () {}
            );
        },
    },

    beforeDestroy: function () {
        eventBus.$off('gengduoEvent');
    }
}
</script>

<style scoped>
@import "../../assets/css/common/list-right-style.css";

.right-content-header {
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    background-color: #F8F2DC;
    padding-left: 0.2rem;

}

.right-content-list .calcfont {
    font-size: 0.28rem;
    color: #000000;
    padding-right: 0.1rem;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

}

.right-content-list .calcfont::before {
    font-size: 0.36rem;
    margin-right: 5px;
    color:#f90;
}

.right-content-list-cell {
    position: relative;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.2rem;
}

.right-content-list-cell:after {
    position: absolute;
    content: '';
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0;
    height: 1px;
    background-color: #F5F5DC;
}
</style>
