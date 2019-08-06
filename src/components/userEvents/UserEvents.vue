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
                    queryfield: "UserName",
                    text: lanTool.lanContent("1000307_用户帐号"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "Realname",
                    text: lanTool.lanContent("848_姓名"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                              {
                    queryfield: "DepartmentID",
                    text: lanTool.lanContent("567_部门"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
               {
                    queryfield: "PositionID",
                    text: lanTool.lanContent("1000259_职务"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
               {
                    queryfield: "Phone",
                    text: lanTool.lanContent("698_电话"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
               {
                    queryfield: "Email",
                    text: lanTool.lanContent("697_邮箱"),
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },

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
    border-bottom: 1px solid beige;
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
