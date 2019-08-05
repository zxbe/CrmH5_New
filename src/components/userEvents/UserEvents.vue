<template>
<div>
    <Header class="header sticky" :title="title"></Header>
    <div class="pageContent">
        <ul class="dataList" v-for="item in userDataList">
            <li>
                <a class="userMessage" :key="item.AutoID" @click="goUserInfoPage(item)">
                    <div class="headImg"><img src="../../assets/images/default_user_img.png" alt=""></div>
                    <h4>
                        <div class="userName">{{item.UserName}}</div>
                    </h4>
                    <div class="position">{{item.PositionID}}</div>
                    <div>
                        <span class="userEmail pullLeft calcfont calc-youxiang">{{item.Email}}</span>
                    </div>
                    <div>
                        <span class="userPhone pullRight calcfont calc-phone">{{item.Phone}}</span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <!--  右侧侧滑 -->
    <list-right-panel ref="rightPanel" :searchData="searchData"></list-right-panel>
</div>
</template>

<script>
import Header from "@/components/customPlugin/Listheader";
import Listrightpanel from "@/components/customPlugin/Listrightpanel";
import Nothing from "@/components/customPlugin/Nothing";
export default {
    name: 'userEvents',
    components: {
        Header: Header,
        "list-right-panel": Listrightpanel,
        nothing: Nothing
    },
    data() {
        return {
            title: lanTool.lanContent("1000304_用户活动"),
            userDataList: [{
                AutoID: 52,
                UserName: "abeyeung",
                Realname: "abeyeung楊舒雅",
                DepartmentID: "人力资源与管理",
                PositionID: "Human Resources and Administration Manager",
                Phone: "852 6210 8352",
                Email: "abeyeung@calc.com.hk"
            }, {
			"AutoID": 11,
			"UserName": "alancheng",
			"Realname": "alancheng鄭兆麟",
			"DepartmentID": "秘书团队",
			"PositionID": "Driver",
			"Phone": "852 9198 6115",
			"Email": "alancheng@fpigp.com"
		}, ],
            searchData: [{
                    queryfield: "ShortNameEN",
                    text: lanTool.lanContent("733_英文名称"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "ShortNameCN",
                    text: lanTool.lanContent("32_中文名称"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "BusinessType",
                    text: lanTool.lanContent("1007_业务分类"),
                    fieldControlType: "picker",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_ViewBaseAllTypes",
                    TypeValue: "Companybusinesstype",
                    datalanid: "1007_业务分类"
                },
                {
                    queryfield: "CountryID",
                    text: lanTool.lanContent("701_国家"),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_ViewBaseCountryInf",
                    TypeValue: "",
                    selectType: "radio",
                    resulteRow: true,
                    clickObj: "CountryIDClickObj",
                    datalanid: "701_国家"
                },
                {
                    queryfield: "CityID",
                    text: lanTool.lanContent("702_城市"),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_ViewBaseCountryCity",
                    TypeValue: "",
                    selectType: "radio",
                    datalanid: "702_城市"
                },
                {
                    queryfield: "AccountManager",
                    text: lanTool.lanContent("785_客户经理"),
                    fieldControlType: "selectList",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "=",
                    Code: "DropDowList_AccountManager",
                    TypeValue: "",
                    selectType: "radio",
                    datalanid: "785_客户经理"
                }
            ],
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {

    },
    mouted: function () {

    },
    methods: {
       goUserInfoPage:function (data) {
           console.log("跳转到用户详情");
            var _self = this;
            _self.$router.push({
                path: "/userEventsInfo"
            });

       }
    },
}
</script>

<style scoped>
/* .pageContent{
    padding-top: 0.88rem;
} */
.pageContent .userMessage {
    position: relative;
    display: block;
    padding: 0.2rem;
    height: auto;
    border-bottom: 1px solid #f4f4f4;
    height: 1.3rem;
}
.headImg {
    float: left;
    height: 0.8rem;
    width: 0.8rem;
}

.headImg img {
    width: 100%;
    height: 100%;
}

.userMessage .userName {
    font-size: 0.28rem;
    padding-left: 0.2rem;
    padding-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.position {
    font-size: 0.24rem;
    padding-left: 10px;
    padding-top: 0.1rem;
    color: #888888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.pullLeft {
    clear: left;
    float: left;
}

.pullRight {
    float: right;
}
.userEmail,.userPhone{
    padding-top: 0.3rem;
    font-size: 13px;
}

</style>
