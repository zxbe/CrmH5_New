<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
        <a @click="search" class="calcfont calc-shaixuan2 right"></a>
    </header>
    <div class="pageContent">
        <div v-show="!noData" class="fleetDetailList" v-for="item in detailListData">
            <div class="fleetDetailListItem">
                <div class="flexBoxTwo">
                    <div class="LeftKey">MSN</div>
                    <div class="LeftValue">{{item["7555"]||""}}</div>
                    <div class="rightKey">Fleet Type</div>
                    <div class="LeftValue">{{item["7556"]||""}}</div>
                </div>
                <div class="flexBoxTwo">
                    <div class="LeftKey">Engine Type</div>
                    <div class="LeftValue">{{item["7557"]||""}}</div>
                    <div class="rightKey">Build Year</div>
                    <div class="LeftValue">{{item["7642"]||""}}</div>
                </div>
                <div class="flexBoxTwo">
                    <div class="LeftKey">Status</div>
                    <div class="LeftValue">{{item["7643"]||""}}</div>
                    <div class="rightKey">Lease/Own</div>
                    <div class="LeftValue">{{item["7560"]||""}}</div>
                </div>
                <div class="flexBoxTwo">
                    <div class="LeftKey">Lease Start</div>
                    <div class="LeftValue">{{(item["7645"]||"") | abdDateFormat("yyyy/MM/dd")}}</div>
                    <div class="rightKey">Lease End</div>
                    <div class="LeftValue">{{(item["7646"]||"") | abdDateFormat("yyyy/MM/dd")}}</div>
                </div>
                <div class="flexBox">
                    <div class="flexBoxKey">Manufacturer</div>
                    <div class="flexBoxValue">{{item["7641"]||""}}</div>
                </div>
                <div class="flexBox">
                    <div class="flexBoxKey">Manager</div>
                    <div class="flexBoxValue">{{item["7644"]||""}}</div>
                </div>
                 <div class="flexBox">
                    <div class="flexBoxKey">Remarks</div>
                    <div class="flexBoxValue">{{item["7561"]||""}}</div>
                </div>
            </div>
        </div>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>
</div>
</template>

<script>
import Header from '../common/Listheader'
import Nothing from "../common/Nothing"
import Mixins from '../../mixins/commonlist.js'
export default {
    mixins: [Mixins],
    components: {
        'Header': Header,
        'nothing': Nothing
    },
    data() {
        return {
            title: "Fleet Details",
            noData: false, //没数据
            detailListData: [
            // {
            //     MSN: '61370',
            //     fleetType: '737 Max8',
            //     engineType: 'LEAP 1B',
            //     buildYear:'2019',
            //     status:'On order',
            //     leaseOrOwn:'lease',
            //     leaseStart:'2018-10-27',
            //     leaseEnd:'2020-02-03',
            //     manufacturer:'Boeing',
            //     manager:'9Air'

            // },
            // {
            //     MSN: 'ZSPD-B73M-83094',
            //     fleetType: '737 Max8',
            //     engineType: 'LEAP 1B',
            //     buildYear:'2019',
            //     status:'On order',
            //     leaseOrOwn:'lease',
            //     leaseStart:'2018-10-27',
            //     leaseEnd:'2020-02-03',
            //     manufacturer:'Boeing',
            //     manager:'Africa Charter Airline'
            // }, 
            // {
            //     MSN: 'XXX1-B73M-105593',
            //     fleetType: '737 Max8',
            //     engineType: 'LEAP 1B',
            //     buildYear:'2019',
            //     status:'On order',
            //     leaseOrOwn:'lease',
            //     leaseStart:'2018-10-27',
            //     leaseEnd:'2020-02-03',
            //     manufacturer:'Boeing',
            //     manager:'9Air'
            // }
            ],
            //侧滑搜索页面数据模型
            searchData: [{
                    queryfield: "TheName",
                    text: "NSN",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "TheManufacturer",
                    text: "Manufacturer",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "TheFleetType",
                    text: "Fleet Type",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "TheEngineType",
                    text: "Engine Type",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "TheStatus",
                    text: "Status",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "TheManager",
                    text: "Manager",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "TheLeaseOrOwn",
                    text: "Lease/Own",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "TheBuildYear",
                    text: "Build Year",
                    fieldControlType: "dateTimePicker",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "TheLeaseStart",
                    nextqueryfield:"TheLeaseStartNext",
                    text: "Lease Start",
                    fieldControlType: "dateTimePicker",
                    queryType: "string",
                    selectType:"dateSelect",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "TheLeaseEnd",
                    nextqueryfield:"TheLeaseEndNext",
                    text: "Lease End",
                    fieldControlType: "dateTimePicker",
                    queryType: "string",
                    selectType:"dateSelect",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }
            ],
        }

    },
    created:function(){
        $(window).scrollTop(0);
    },
    mounted: function () {
        var _self = this;
        var fleetDatailsArrayStr = _self.$route.params.fleetDatailsArrayStr;
        if(tool.isNullOrEmptyObject(fleetDatailsArrayStr)){
            _self.detailListData = [];
        }else{
            _self.detailListData = tool.jObject(fleetDatailsArrayStr);
        }
        
        console.log(_self.detailListData);
    },
    methods: {
        back: function () {
            this.$router.back(-1);
        },
        search: function () {
            var _self = this;
            var parameter = {
                'dataModule': _self.searchData,
            };
            _self.$nextTick(function () {
                _self.$router.push({
                    name: "searchmodule",
                    params: {
                        paramStr: JSON.stringify(parameter)
                    }
                });
            });
        }
    },
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
    width: auto;
    max-width: 50%;
    font-size: .34rem;
    margin: 0 0 0 -10px;
    text-overflow: ellipsis;
    padding: 0;
    text-align: left;
    white-space: nowrap;
    line-height: .88rem;
}

.calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}

.calc-fanhui {
    margin-left: 0;
}

.calc-fanhui::before,
.calc-jiugongge::before {
    font-size: 0.48rem;
}

header .mui-title,
header a {
    color: #333;
}

.pageContent {
    padding-top: 0.88rem;
}

.fleetDetailListItem {
    padding: 0.2rem 0;
    border-bottom: solid 1px gainsboro;
}

.flexBox,
.flexBoxTwo {
    display: flex;
    min-height: 0.6rem;
    width: 100%;
}

.flexBox .flexBoxKey {
    display: inline-block;
    width: 30%;
    box-sizing: border-box;
    font-size: 0.28rem;
    line-height: 0.36rem;
    text-align: right;
    color: #929292;
    margin: auto 0;
    padding: 0 0.1rem;
    word-wrap: break-word;
}

.flexBox .flexBoxValue {
    display: inline-block;
    width: 70%;
    box-sizing: border-box;
    font-size: 0.28rem;
    line-height: 0.36rem;
    color: #000000;
    margin: auto 0;
    padding: 0 0.1rem;
    word-wrap: break-word;
}

.LeftKey,
.LeftValue,
.rightKey,
.rightValue {
    /* flex:1; */
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    font-size: 0.28rem;
    line-height: 0.36rem;
    text-align: center;
    margin: auto 0;
    padding: 0 0.1rem;
    word-wrap: break-word;
}
.LeftKey,
.rightKey {
    text-align: right;
    color: #929292;
}

.LeftValue,
.rightValue {
    text-align: left;
}
</style>
