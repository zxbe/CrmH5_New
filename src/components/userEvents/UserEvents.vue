<template>
<div>
    <!-- <Header class="header sticky" :title="title"></Header> -->
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
        <a @click="search" class="calcfont calc-shaixuan2 right"></a>
    </header>
    <div class="pageContent">
        <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
            <ul class="dataList" v-for="item in userDataList">
                <li>
                    <a class="userMessage" :key="item.AutoID" @click="goUserInfoPage(item)">
                        <div class="headImg"><img src="../../assets/images/default_user_img.png" alt=""></div>
                        <h4>
                            <div class="userName">{{item.UserName}}</div>
                        </h4>
                        <div class="position">{{item.PositionID}}</div>
                        <div class="department">{{item.DepartmentID}}</div>
                        <div>
                            <span class="userEmail pullLeft calcfont calc-youxiang">{{item.Email}}</span>
                        </div>
                        <div>
                            <span class="userPhone pullRight calcfont calc-phone">{{item.Phone}}</span>
                        </div>
                    </a>
                </li>
            </ul>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>
    <!--  右侧侧滑 -->
    <list-right-panel ref="rightPanel" :searchData="searchData"></list-right-panel>
</div>
</template>

<script>
// import Header from "@/components/customPlugin/Listheader";
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Listrightpanel from "@/components/customPlugin/Listrightpanel";
import Nothing from "@/components/customPlugin/Nothing";
export default {
    name: 'userEvents',
    components: {
        // Header: Header,
        "list-right-panel": Listrightpanel,
        nothing: Nothing,
        'vue-scroll': Scroll,
    },
    data() {
        return {
            title: lanTool.lanContent("1000304_用户活动"),
            queryCondictionData: [], //综合查询条件
            noData: false, //没数据
            pageSize: 2, //一页显示多少记录
            pageNum: 1, //当前页码
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
        console.log("created...");
        var _self = this;
        //清空右侧筛选数据
        eventBus.queryCondictionData = null;
        _self.$store.commit('SET_ITEM', 'userEvents');
    },
    mounted: function () {
        this.queryList();
        this.getUserEventsList();
    },
    activated: function () {
        console.log("activated...");
        var _self = this;
        _self.queryCondictionData = eventBus.queryCondictionData;
        console.log("_self.queryCondictionData>>>>"+JSON.stringify(_self.queryCondictionData));
        //获取是否是从搜索页面点击确定按钮返回来的标志
        var fromSearchBtn = eventBus.fromSearchBtn || false;
        eventBus.fromSearchBtn = false;
        if (fromSearchBtn) {
            _self.getUserEventsList();
        }

    },
    methods: {
        //返回上一步
        back: function () {
            this.$router.back(-1);
        },
        //点击跳转到查询页面
        search: function () {

            var _self = this;
            // console.log("_self.queryCondictionData:" + _self.queryCondictionData);

            var parameter = {
                'dataModule': _self.searchData,
                'queryCondictionData': _self.queryCondictionData
            };

            _self.$nextTick(function () {
                _self.$router.push({
                    name: "searchmodule",
                    params: {
                        paramStr: JSON.stringify(parameter)
                    }
                });
            });
        },
        //获取用户列表
        getUserEventsList: function () {
            console.log("获取用户活动的数据");
            //请求接口数据
        },
        goUserInfoPage: function (data) {
            console.log("跳转到用户详情");
            var _self = this;
            _self.$router.push({
                path: "/userEventsInfo"
            });

        },
        queryList: function (queryType, callback) {
            let _self = this;
            if (queryType == 'pushLoad') {
                //上拉请求
                _self.pageNum += 1;
            } else {
                //非上拉请求
                _self.pageNum = 1;
            }

            setTimeout(() => {
                _self.$refs.scroll.refresh();
            }, 1000);
        },

        //下拉
        pulldown: function () {
            console.log("下拉");

            let _self = this;
            _self.queryList('pushRefresh', function () {
                // _self.$refs.scroll.refresh();
            })
        },

        //上拉
        pullup: function () {
            console.log("上拉");
            let _self = this;
            _self.queryList('pushLoad', function (data, pageSize) {

                if (data.length < pageSize) {
                    _self.$refs.scroll.pullupEnd();
                }

            })
        },

    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'userEvents');
        }
        next();
    }
}
</script>

<style scoped>
header {
    position: fixed;
    z-index: 99;
    width: 100%
}

header.mui-bar {
    background: #f8f2dc;
    overflow: hidden;
}

.mui-title {
    
    display: inline-block;
    overflow: hidden;
    width: calc(100% - 1.76rem);
    /* max-width: 50%; */
    font-size: .34rem;
    /* margin: 0 0 0 -10px; */
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    line-height: .88rem;
}

.calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 0.2rem;
    position: relative;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}

.calc-fanhui {
    margin-left: 0;
}
/* .calc-shaixuan2{
    width: 0.88rem;
    float:right;
} */
.pageContent {
    position: fixed;
    top: 0.88rem;
    bottom: 0px;
    left: 0;
    right: 0;
}

.pageContent .userMessage {
    position: relative;
    display: block;
    padding: 0.2rem;
    /* height: auto; */
    border-bottom: 1px solid beige;
    height: 1.5rem;
}
ul li{
  list-style-type: none;
}
.pageContent .userMessage .calcfont{
    padding: 0.3rem 0.1rem 0.1rem 0.1rem;
    font-size: 0.28rem;
    /* width: calc(50% - 0.4rem); */
    /* max-width: 50%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pageContent .userMessage .calcfont.calc-youxiang{
  max-width: calc(60% - 0.4rem);
}
.pageContent .userMessage .calcfont.calc-phone{
   max-width: calc(40% - 0.4rem);
}
.headImg {
    float: left;
    height: 1rem;
    width: 1rem;
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
    /* padding-top: 0.1rem; */
    color: #888888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.department{
    font-size: 0.24rem;
    padding-left: 10px;
    /* padding-top: 0.1rem; */
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

.userEmail,
.userPhone {
    padding-top: 0.3rem;
    font-size: 13px;
}
</style>
