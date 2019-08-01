<template>
<div>

    <div id="mask" class="mask" @click="panelToggle" v-show="showPanel"></div>
    <div id="right-content" class="right-content">

        <div right-content-block id="generalBlock">
            <div class="right-content-header f16 lanText" data-lanid="943_操作"></div>
            <div class="right-content-list f14">
                <div id="rightPanelCloseThis" class="right-content-list-cell" v-show="isShowClose"><span class="mui-icon calcfont calc-jieshu">{{closeThisContent}}</span></div>
                <div class="right-content-list-cell" v-show="isShowSend" @click="showShareList"><span class="mui-icon calcfont calc-icon-share lanText" data-lanid="946_分享给同事"></span></div>
                <!-- <div id="rightPanelCloseThisOpp" class="right-content-list-cell" v-show="isShowCloseOpp"><span class="mui-icon calcfont calc-jieshu lanText" data-lanid="944_关闭这个商业机会"></span></div> -->
                <!-- <div id="rightPanelCloseThisDeal" class="right-content-list-cell" v-show="isShowCloseDeal"><span class="mui-icon calcfont calc-jiaoyi lanText" data-lanid="945_关闭这个交易"></span></div> -->
                <!-- <div class="right-content-list-cell"><span class="mui-icon calcfont calc-fenxiang1"></span>Send to Chat</div> -->
                <div class="right-content-list-cell" v-show="isShowSend" @click="goToMeetingList"><span class="mui-icon calcfont calc-huiyi lanText" data-lanid="619_会议"></span></div>
                <div class="right-content-list-cell" v-show="isShowSend" @click="goToShareList"><span class="mui-icon calcfont calc-yidu lanText" data-lanid="852_查看有权限访问的同事"></span></div>
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
        }
    },
    props: ['isShowSend', 'isShowClose','closeThisContent', 'rightPanelFromType', 'rightPanelFromID'],

    created: function () {

    },
    mounted: function () {
        lanTool.updateLanVersion();
        eventBus.$on('gengduoEvent', this.panelToggle);
        this.panelToggle(false);
    },
    activated: function () {
    },
    methods: {
        //侧滑
        //isClose值如果为false，表示刚进页面收起侧滑；
        //如果没传isClose值showPanel就取反，表示正常的展开收起
        panelToggle: function (isClose) {
            var _self = this;
            if(isClose == false){
                _self.showPanel = isClose;
            }else{
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
                rightPanelFromType: this.rightPanelFromType, //来源类型
                rightPanelFromID: this.rightPanelFromID //来源ID
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
        goToMeetingList:function(){
            var _self = this;
            _self.panelToggle();
            _self.$nextTick(function () {
                _self.$router.push({
                    path: "/meetinglist",
                    // query: parameter
                });
            })
        },
        //查看有权限访问的同事
        goToShareList: function() {
            var _self = this;
            var fromType = "9";
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
        }
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
