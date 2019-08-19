<template>
<div>
    <header class="header sticky">
        <a @click="backHandler" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title">{{title||''}}</h1>
    </header>
    <div id="page-content" class="page-content">
        <div class="add-btn-div">
            <div @click="addContacts" class="add-div" data-link="/contactsinfo/-1">
                <span class="calcfont calc-add"></span>
                <span class="add-text lanText" data-lanid="793_添加联系人"></span>
            </div>
        </div>
        <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
            <div v-show="!noData" id="contactsList" class="group-item-list contacts-list">

                <div v-for="item in listData" :key="item.AutoID"
                  :data-url="'/contactsinfo/' + item.AutoID"
                  class="group-item data-events-item f14"
                  @click="goInfoPage(item,$event)">
                      <div class="item-user-icon"><img src="../../assets/images/default_user_img.png" alt=""></div>
                      <div class="item-block contacts-item-block">
                              <div class="item-div item-first-div">{{item.EnglishName}}</div>
                              <div class="item-div" style="padding-top:5px;">
                                  <i :class="[(item.Title =='' || item.Title == null) ? '' : 'calc-zhiwei']" class="calcfont icon"></i><span>{{item.Title}}</span>
                              </div>
                              <div class="item-div">
                                  <div class="left-text max60" v-show="(item.CompanyID =='' || item.CompanyID == null) ? false : true">
                                      <i class="calcfont icon calc-gongsixinxi"></i><span >{{item.CompanyID}}</span>
                                  </div>
                                  <div class="right-text max35" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                                      <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                                  </div>
                              </div>
                              <div class="item-div">
                                  <div class="left-text max60" v-show="(item.Email =='' || item.Email == null) ? false : true">
                                    <i class="calcfont icon calc-mailbox"></i><span>{{item.Email}}</span>
                                  </div>
                                  <div class="right-text max35" v-show="(item.TelPhone =='' || item.TelPhone == null) ? false : true">
                                    <i class="calcfont icon calc-mobilephone"></i><span>{{item.TelPhone}}</span>
                                  </div>
                              </div>
                      </div>
                </div>

            </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>

    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";
export default {
    components: {
        'vue-scroll': Scroll,
        nothing: Nothing
    },
    data() {
        return {
            title: lanTool.lanContent("630_联系人"),
            companyID: "", //公司id
            companyName: '', //公司名字
            noData: false, //没数据
            listData: [],
            pageSize: 10, //一页显示多少记录
            pageNum: 1, //当前页码

            fromType:'',  //标志是用那个模块过来的；联系人:6;公司:7;会议:8;商机&交易:9;
            fromId:''  //dealPipelineID或者pitchesID,用于新增会议自动选择关联于商业字段
        }
    },
    created: function () {
        var _self = this;
        _self.companyID = _self.$route.query.fromId || "";
        _self.fromType = _self.$route.query.fromType || '';
        _self.fromId = _self.$route.query.fromId || '';
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'contacts') {
            this.$destroy();
        }
        next();
    },
    mounted: function () {
        var _self = this;
        lanTool.updateLanVersion();
        _self.queryList();
        document.activeElement.blur();
    },
    methods: {
        //新增联系人
        addContacts: function (e) {
            var _self = this;
            var target = $(e.target);
            if (!target.hasClass('add-div')) {
                target = target.parents("div.add-div:first");
                if (tool.isNullOrEmptyObject(target)) {
                    return;
                }
            }
            var urlTemp = target.attr('data-link') || '';
            var parameter = {
                onlyView: false,
                companyID: _self.companyID,
                companyName: _self.companyName,
            };
            _self.$router.push({
                path: urlTemp,
                query: parameter
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
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ContactsHandle_QueryRelatedContact;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize:_self.pageSize,
                PageNum:_self.pageNum,
                QueryCondiction: _self.queryCondictionData || [],
                FromType:_self.fromType,
                FromID:_self.fromId
            };

            //console.log(JSON.stringify(jsonDatasTemp));

            if(tool.isNullOrEmptyObject(queryType)){
                var loadingIndexClassName = tool.showLoading();
            }

            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    tool.hideLoading(loadingIndexClassName);
                    data = tool.jObject(data);
                    // console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        _self.noData = true;
                        return;
                    }
                    data = data._OnlyOneData.Rows || [];

                    //没有数据
                    if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                        _self.noData = true;
                        return ;
                    }

                    _self.noData = false;
                    if(queryType == 'pushLoad'){
                        _self.listData = _self.listData.concat(data);
                    }else{
                        _self.listData = data;
                    }

                    if(queryType == undefined || queryType == ''){
                        _self.$refs.scroll.isPullingDown = true;
                        _self.$refs.scroll.isPullingUpEnd = false;
                        _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                    }
                    _self.$refs.scroll.refresh();

                    if(!tool.isNullOrEmptyObject(callback)){
                      callback(data,_self.pageSize);
                    }
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
            })
        },
        //上拉
        pullup:function(){
            let _self = this;
             _self.queryList('pushLoad',function(data,pageSize){
               if(data.length < pageSize){
                  _self.$refs.scroll.pullupEnd();
               }
            })
        },
        //点击跳转到会议详情
        goInfoPage:function(item,e){
            var _self = this;
            if(tool.isNullOrEmptyObject(item.AutoID)){
                return;
            }
            var url = "/contactsinfo/" + item.AutoID
            var infoName = item.EnglishName || '';
            _self.$router.push({
                path: url,
                query:
                {
                    infoName: infoName,
                    onlyView: true,
                    source: 'contactsof'
                }
            });
        },
        backHandler: function () {
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
/*页面头部style*/
header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    line-height: 0.2rem;
    background: #f8f2dc;
}

.mui-title {
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 75%;
    font-size: 0.34rem;
    margin: 0 0 0 -10px;
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    line-height: 0.88rem;
}

.header .calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}

header .mui-title,
header a {
    color: #333;
    font-weight: 400;
}

.page-content {
    position: fixed;
    top: 0.88rem;
    bottom: 0px;
    left: 0;
    right: 0;
}

/*增加按钮*/
.add-btn-div {
    text-align: center;
}

.add-div {
    height: 38px;
    line-height: 38px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    padding: 0 15px;
}

.add-div .calcfont {
    color: #ff5a21;
}

.add-div .add-text {
    vertical-align: middle;
    color: #ff5a21;
}
</style>
