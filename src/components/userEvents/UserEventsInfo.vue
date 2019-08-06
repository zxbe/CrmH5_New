<template>
<div>
    <div class="pageContent">
        <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></Infoheader>
        <div class="Container">
            <div class="divContent">
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-yonghu1"></span><label class="lanText" data-lanid="1000307_用户帐号"></label></div>
                    <div class="content" data-bid="UserName">{{userDetailData.UserName}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-zuzhibumen"></span><label class="lanText" data-lanid="567_部门"></label></div>
                    <div class="content" data-bid="DepartmentID">{{userDetailData.DepartmentID}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-zhiwei"></span><label class="lanText" data-lanid="566_职位"></label></div>
                    <div class="content" data-bid="PositionID">{{userDetailData.PositionID}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-phone"></span><label class="lanText" data-lanid="705_移动电话"></label></div>
                    <div class="content" data-bid="Phone">{{userDetailData.Phone}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-youxiang"></span><label class="lanText" data-lanid="697_邮箱"></label></div>
                    <div class="content" data-bid="Email">{{userDetailData.Email}}</div>
                </div>
            </div>
            <div class="systemMessage">
               <div class="divContentBox">
                    <span class="field"><span class="calcfont calc-yonghu"></span><label class="lanText" data-lanid="833_创建者"></label></span>
                    <span class="content"><span data-bid="AddUserName">{{userDetailData.AddUserName}}</span>,<span data-bid="AddTime">{{userDetailData.AddTime}}</span></span>
                </div>
                <div class="divContentBox">
                    <span class="field">
                        <span class="calcfont calc-yonghu1">
                            </span><label class="lanText" data-lanid="805_更新者"></label></span>
                    <span class="content" >
                        <span data-bid="LastUpdateUserName">{{userDetailData.LastUpdateUserName}}</span>
                        ,<span data-bid="LastUpdateTime">{{userDetailData.LastUpdateTime}}</span></span>
                </div>
            </div>
        </div>
    </div>
    <InfoRightPanel ref="rightPanel" :isShowClose="isShowClose" :isShowSend="isShowSendBtn" :rightPanelFromType="rightPanelFromType" :rightPanelFromID="rightPanelFromID"></InfoRightPanel>
</div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
import InfoRightPanel from '@/components/customPlugin/InfoRightPanel'
import Infofooter from '@/components/customPlugin/infoFooter'
export default {
    name: 'UserEventsInfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel
    },
    data() {
        return {
            ptitle: lanTool.lanContent("1000205_用户详情"),
            isAddNew: true,
            onlyView: true,
            operation: true,
            isShowClose: false,
            isShowSendBtn: false,
            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            userDetailData:{
                UserName:"abeyeung",
                DepartmentID:"人力资源与管理",
                PositionID:"前端工程师",
                Phone:"852 6210 8352",
                Email:"alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com",
                AddUserName:"abeyeung1",
                AddTime:"2019/08/05 10:00",
                LastUpdateUserName:"abeyeung2",
                LastUpdateTime:"2019/08/20 13:30"
            }
        }
    },
    created: function () {
        var _self = this;
        _self.rightPanelFromType = "11";
    },
    mounted: function () {

    },
    methods: {

    }
}
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";

.pageContent {
    padding-top: 0.88rem;
    width: 100%;
}
.Container{
    /* background-color: #ffffff; */
}
.divContent {
    width: 100%;
}

.divContentBox {
    width: 100%;
    padding: 9px 0.3rem;
    padding-bottom: 5px;
    border-bottom: solid 1px beige;
    box-sizing: border-box;
}
.divContentBox .calcfont
{
    font-size: 0.36rem;
    color: rgb(138, 138, 138);
}
.divContentBox .field label{
   padding-left: 5px;
   font-size: 0.28rem;
}
.divContentBox .content{
    width: 100%;
    padding-top: 5px;
    font-size: 0.28rem;
}
.systemMessage{
   border-top: solid 20px rgb(242, 242, 242);
   position: relative;
}
.systemMessage .divContentBox{
    /* display: flex; */
    height: 1rem;
    border-bottom: solid 1px beige;
    line-height: 0.62rem;
}
.systemMessage .divContentBox .field{
    width:calc(40% - 0.3rem);
   float: left;
    clear: left;
   /* text-align: left; */
   
}
.systemMessage .divContentBox .Content{
    width:calc(60% - 0.3rem);
    float: right;
   clear: right; 
}
</style>
