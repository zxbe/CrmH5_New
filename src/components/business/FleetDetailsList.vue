<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title f18">{{title}}</h1>
        <a @click="search" class="calcfont calc-shaixuan2 right"></a>
    </header>
    <div class="pageContent">

        <vue-scroll
          v-show="!noData"
          :showToTop="true"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="true" ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup">

              <div v-for="item in detailListData" :key="item.SubRowID" class="fleetDetailListItem">
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
                      <div class="LeftValue">{{(item["7645"]||"") | abdDateFormat("dd/MM/yyyy")}}</div>
                      <div class="rightKey">Lease End</div>
                      <div class="LeftValue">{{(item["7646"]||"") | abdDateFormat("dd/MM/yyyy")}}</div>
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
                      <div class="flexBoxValue">
                          <p class="textareaP">
                              <textarea readonly :value="(item['7561']||'')"></textarea>
                          </p>
                      </div>
                  </div>
              </div>
        </vue-scroll>

        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>

    </div>
</div>
</template>

<script>

import Mixins from '@/mixins/commonlist.js'
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";

export default {
    name: "fleetDetailsList",
    mixins: [Mixins],
    components: {
        'vue-scroll':Scroll,
        nothing: Nothing
    },
    data() {
        return {
            title: "Fleet Details",
            tabID: "", //模块ID
            companyID: "", //公司ID
            versionID: "", //当前年
            queryCondictionData: [], //过滤条件
            detailListData: [],//列表数据
            //侧滑搜索页面数据模型
            searchData: [{
                    queryfield: "7555",
                    text: "NSN",
                    isRange: false,
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                {
                    queryfield: "7641",
                    text: "Manufacturer",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "7556",
                    text: "Fleet Type",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "7557",
                    text: "Engine Type",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "7643",
                    text: "Status",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "7644",
                    text: "Manager",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                }, {
                    queryfield: "7560",
                    text: "Lease/Own",
                    fieldControlType: "textareaInput",
                    queryType: "string",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "like"
                },
                // {
                //     queryfield: "7642",
                //     text: "Build Year",
                //     fieldControlType: "dateTimePicker",
                //     queryType: "string",
                //     queryFormat: "",
                //     queryRelation: "and",
                //     queryValue: "",
                //     queryComparison: "like"
                // },
                {
                    queryfield: "7642",
                    isRange: true,
                    text: "Build Year",
                    fieldControlType: "dateTimePicker",
                    queryType: "date",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "between",
                    queryIsChangeBetween: true
                },
                {
                    queryfield: "7645",
                    isRange: true,
                    text: "Lease Start",
                    fieldControlType: "dateTimePicker",
                    queryType: "date",
                    // selectType:"dateSelect",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "between",
                    queryIsChangeBetween: true
                },
                {
                    queryfield: "7646",
                    isRange: true,
                    text: "Lease End",
                    fieldControlType: "dateTimePicker",
                    queryType: "date",
                    selectType: "dateSelect",
                    queryFormat: "",
                    queryRelation: "and",
                    queryValue: "",
                    queryComparison: "between",
                    queryIsChangeBetween: true
                }
            ],
            scrollConfig:{
                pushLoadEnable:true,
                pullRefreshEnable:true,
                showToTop:true
            },
            pageSize:10,//一页显示多少记录
            pageNum:1,//当前页码
            noData:false
        }

    },
    computed:{
        notData:function(){
            let _self = this;
            if(_self.detailListData.length <= 0){
                return true;
            }
            return false
        }
    },
    created: function () {

        $(window).scrollTop(0);
        //清空右侧筛选数据
        eventBus.queryCondictionData = null;
        var _self = this;
        _self.$store.commit('SET_ITEM', 'fleetDetailsList');
    },
    mounted: function () {
        var _self = this;

        _self.tabID = _self.$route.query.TabID || "";
        _self.companyID = _self.$route.query.CompanyID || "";
        _self.versionID = _self.$route.query.VersionID || "";

        _self.queryCondictionData = eventBus.queryCondictionData || [];
        // console.log(_self.queryCondictionData);

        //查询列表数据
        _self.queryList();
    },
    activated: function () {
        var _self = this;

        _self.tabID = _self.$route.query.TabID || "";
        _self.companyID = _self.$route.query.CompanyID || "";
        _self.versionID = _self.$route.query.VersionID || "";

        _self.queryCondictionData = eventBus.queryCondictionData || [];
        // console.log(_self.queryCondictionData);

        //获取是否是从搜索页面点击确定按钮返回来的标志
        var fromSearchBtn = eventBus.fromSearchBtn || false;
        eventBus.fromSearchBtn = false;
        if (fromSearchBtn) {
            //查询列表数据
            _self.queryList();
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
        //查询列表数据
        queryList: function (queryType, callback) {
            let _self = this;
            if(queryType == 'pushLoad'){
                //上拉请求
                _self.pageNum += 1;
            }else{
                //非上拉请求
                _self.pageNum = 1;
            }
            //api接口地址
            var apiUrlTemp = tool.combineRequestUrl(tool.ADBAjaxUrl(), tool.getConfigValue(tool.ADBApi_AirlineDatabase_Query_ListByTab));
            var jsonDatas = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                TabID: _self.tabID,
                CompanyID: _self.companyID,
                VersionID: _self.versionID,
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                QueryCondiction: _self.queryCondictionData || []
            };

            if(tool.isNullOrEmptyObject(queryType)){
                var loadingIndexClassName = tool.showLoading();
            }
            $.ajax({
                async: true,
                type: "post",
                url: apiUrlTemp,
                data: {
                    jsonDatas: JSON.stringify(jsonDatas)
                },
                success: function (data) {
                    tool.hideLoading(loadingIndexClassName);
                    data = tool.jObject(data);
                    if (data.Result != 1) {
                        tool.showText(data.Msg);
                        console.log(tool.getMessage(data.Msg));
                        return true;
                    }
                    data = data.Data || {};

                    //没有数据
                    if(tool.isNullOrEmptyObject(data["FleetDatailsArray"]) && _self.pageNum == 1){
                        _self.noData = true;
                        return ;
                    }
                    _self.noData = false;

                    if(queryType == 'pushLoad'){
                        _self.detailListData = _self.detailListData.concat(data["FleetDatailsArray"]);
                    }else{
                        _self.detailListData = data["FleetDatailsArray"] || [];
                    }

                    if(queryType == undefined || queryType == ''){
                        _self.$refs.scroll.isPullingDown = true;
                        _self.$refs.scroll.isPullingUpEnd = false;
                        _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                    }
                    _self.$refs.scroll.refresh();

                    if(!tool.isNullOrEmptyObject(callback)){
                      callback(data["FleetDatailsArray"],_self.pageSize);
                    }

                    //渲染textarea
                    _self.$nextTick(function () {
                        $(window).scrollTop(0);
                        $("textarea").each(function (index, cur) {
                            // $(cur).height('25');
                            tool.autoTextarea(cur);
                        });
                    });
                },
                error: function (jqXHR, type, error) {
                    tool.hideLoading(loadingIndexClassName);
                    console.log(error);
                    return true;
                },
                complete: function () {
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },

        //下拉
        pulldown:function(){
            let _self = this;
            _self.queryList('pushRefresh',function(){
                // _self.$refs.scroll.refresh();
            })
        },

        //上拉
        pullup:function(){
            let _self = this;
             _self.queryList('pushLoad',function(data,pageSize){

               if(data.length < pageSize){
                  _self.$refs.scroll.pullupEnd();
               }
              //  else{
              //     _self.$refs.scroll.refresh();
              //  }

            })
        }
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'airlineDatabase') {
            this.$store.commit('REMOVE_ITEM', 'fleetDetailsList');
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
  position: fixed;
  top:0.88rem;
  left: 0;
  right: 0;
  bottom:0;
}


.fleetDetailList{
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
    font-size: 0.24rem;
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

p.textareaP {
    width: 100%;
}

.flexBoxValue .textareaP textarea {
    width: 100%;
    outline: none;
    background-color: transparent;
    display: block;
    margin-left: 0;
    overflow: hidden;
    position: relative;
    border: none;
    font-size: 0.28rem;
    line-height: 0.34rem;
    display: block;
    height: 0.5rem;
    padding-top: 10px;
}

.LeftKey,
.LeftValue,
.rightKey,
.rightValue {
    /* flex:1; */
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    font-size: 0.24rem;
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
    font-size: 0.28rem;
}

</style>
