<template>
<div>
    <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle" :onlyMore="onlyMore"></Infoheader>
    <div class="pageContent">
        <div class="Container">
            <div class="divContent">
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-yonghu1 ChangeIconColor"></span><label class="lanText" data-lanid="1000307_用户帐号"></label></div>
                    <div class="content" data-bid="UserName">{{userDetailData.UserName}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-zuzhibumen ChangeIconColor"></span><label class="lanText" data-lanid="567_部门"></label></div>
                    <div class="content" data-bid="DepartmentID">{{userDetailData.DepartmentID}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-zhiwei ChangeIconColor"></span><label class="lanText" data-lanid="566_职位"></label></div>
                    <div class="content" data-bid="PositionID">{{userDetailData.PositionID}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-phone ChangeIconColor"></span><label class="lanText" data-lanid="705_移动电话"></label></div>
                    <div class="content" data-bid="Phone">{{userDetailData.Phone}}</div>
                </div>
                <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-mailbox ChangeIconColor"></span><label class="lanText" data-lanid="697_邮箱"></label></div>
                    <div class="content" data-bid="Email">{{userDetailData.Email}}</div>
                </div>
            </div>
            <div class="systemMessage">
               <div class="divContentBox">
                    <div class="field"><span class="calcfont calc-_chuangjianzhe ChangeIconColor"></span><label class="lanText" data-lanid="833_创建者"></label></div>
                    <div class="content"><span data-bid="AddUserName">{{userDetailData.AddUserName|formatUserName(userDetailData.AddTime)}}</span><span data-bid="AddTime">{{userDetailData.AddTime|MeetingTimeFormat}}</span></div>
                </div>
                <div class="divContentBox">
                    <div class="field">
                        <span class="calcfont calc-dq-user ChangeIconColor">
                            </span><label class="lanText" data-lanid="805_更新者"></label></div>
                    <div class="content" >
                        <span data-bid="LastUpdateUserName">{{userDetailData.LastUpdateUserName|formatUserName(userDetailData.LastUpdateTime)}}</span>
                        <span data-bid="LastUpdateTime">{{userDetailData.LastUpdateTime|MeetingTimeFormat}}</span></div>
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
    name: 'userEventsInfo',
    components: {
        Infoheader,
        Infofooter,
        InfoRightPanel
    },
    filters:{
        //格式化用户名
        formatUserName:function(val1,val2){
            if(tool.isNullOrEmptyObject(val1) || (tool.isNullOrEmptyObject(val1) && tool.isNullOrEmptyObject(val2))){
                return "";
            }
            else if(tool.isNullOrEmptyObject(val2)){
                return val1;
            }else{
                return val1 + ",";
            }
        }
    },
    data() {
        return {
            ptitle: "",
            id: '',
            isAddNew: false,
            onlyView: false,
            operation: true,
            onlyMore:true,
            isShowClose: false,
            isShowSendBtn: false,
            rightPanelFromType: "", //传给右侧菜单用的参数
            rightPanelFromID: "", //传给右侧菜单用的参数
            userDetailData:{
                // UserName:"abeyeung",
                // DepartmentID:"人力资源与管理",
                // PositionID:"前端工程师",
                // Phone:"852 6210 8352",
                // Email:"alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com alancheng@fpigp.com",
                // AddUserName:"aoniruan阮毅文",
                // AddTime:"2019/08/05 10:00",
                // LastUpdateUserName:"abeyeung2",
                // LastUpdateTime:"2019/08/20 13:30"
            }
        }
    },
    created: function () {
        var _self = this;
        _self.id = _self.$route.params.id || "";
        //从列表获取详情名
        _self.ptitle = _self.$route.query.infoName || lanTool.lanContent("1000205_用户详情");
        _self.rightPanelFromType = "11";
        _self.rightPanelFromID = _self.$route.params.id || "";
    },
    mounted: function () {
        let _self = this;
        lanTool.updateLanVersion();
        document.activeElement.blur();
        $(window).scrollTop(0);

        _self.queryUser();
    },
    methods: {
         //跳转到联系人界面事件
        goToContactsPage: function () {
            var _self = this;
            var companyName = $('[data-field="ShortNameEN"]').val() || '';
            var urlTemp = "/contactsof";
            // var infoName = lanTool.lanContent("791_联系人") || "";
            var parameter = {
                fromId: _self.id,
                fromType:_self.rightPanelFromType,
                companyName: companyName
            };
            // console.log("parameter:"+JSON.stringify(parameter));
            
            _self.$router.push({
                path: urlTemp,
                query: parameter
            });
        },
        //查询用户明细
        queryUser:function(){
            let _self = this;
            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_BaseUserBaseInfHandle_QuerySingle;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID:_self.id
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
                        return;
                    }
                    data = data._OnlyOneData || {};
                    _self.userDetailData = data;
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
        }
    }
}

</script>

<style scoped>
@import "../../assets/css/pages/commonInfo.css";

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
    padding: 9px 0.18rem;
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
   padding-left: 0.1rem;
   font-size: 0.22rem;
   color: #929292;
}
.divContentBox .content{
    width: 100%;
    padding-top: 5px;
    font-size: 0.28rem;
    padding-left: 0.44rem;
    min-height: 0.46rem;
    box-sizing: border-box;
}
.systemMessage{
   border-top: solid 20px rgb(242, 242, 242);
   position: relative;
}
.calcfont.ChangeIconColor {
    font-size: .32rem;
    color: #f90;
}
/* .systemMessage .divContentBox{
   
    height: 1rem;
    border-bottom: solid 1px beige;
    line-height: 0.62rem;
}
.systemMessage .divContentBox .field{
    width:calc(40% - 0.3rem);
   float: left;
    clear: left;
  
   
}
.systemMessage .divContentBox .Content{
    width:calc(60% - 0.3rem);
    float: right;
   clear: right; 
}  */
</style>
