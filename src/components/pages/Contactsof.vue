<template>
<div>
    <header class="header sticky">
        <a @click="backHandler" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title">{{title||''}}</h1>
    </header>
    <div id="page-content" class="page-content">
        <!-- <div class="add-btn-div">
            <div @click="addContacts" class="add-div" data-link="/contactsinfo/-1">
                <span class="calcfont calc-add"></span>
                <span class="add-text lanText" data-lanid="793_添加联系人"></span>
            </div>
        </div> -->
        <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
            <div v-show="!noData" id="contactsList" class="group-item-list contacts-list">
                <div v-for="item in listData" class="group-item f14" :data-url="'/contactsinfo/'+ item.AutoID">
                    <div class="item-user-icon calcfont calc-fuzeren1" :data-autoid="item.AutoID"></div>
                    <div class="item-block contacts-item-block">
                        <div class="item-div item-first-div">{{item.EnglishName}}</div>
                        <div class="item-div">{{item.Title}}</div>
                        <div class="item-div">
                            <span class="left-text max60">{{item.CompanyID}}</span>
                            <span class="right-text max35">{{item.CountryName}}</span>
                        </div>
                        <div class="item-div">
                            <span class="left-text">{{item.Email}}</span><span class="right-text">{{item.TelPhone}}</span>
                        </div>
                        <div class="item-div">{{item.BusinessType}},{{item.DepartmentName}}</div>
                    </div>
                </div>
            </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>

    </div>

</div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';
import Nothing from "../common/Nothing";
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
            pageSize: 2, //一页显示多少记录
            pageNum: 1, //当前页码
        }
    },
    created: function () {
        this.companyID = this.$route.query.fromId || "";
        // this.companyName = this.$route.query.companyName || "";
        // this.title = this.$route.query.infoName || "";
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
        this.queryList();
        lanTool.updateLanVersion();
        document.activeElement.blur();

        var _self = this;

        _self.getListData();

    },
    methods: {
        //新增联系人
        // addContacts: function (e) {
        //     var _self = this;
        //     var target = $(e.target);
        //     if (!target.hasClass('add-div')) {
        //         target = target.parents("div.add-div:first");
        //         if (tool.isNullOrEmptyObject(target)) {
        //             return;
        //         }
        //     }
        //     var urlTemp = target.attr('data-link') || '';
        //     var parameter = {
        //         onlyView: false,
        //         companyID: _self.companyID,
        //         companyName: _self.companyName,
        //     };
        //     _self.$router.push({
        //         path: urlTemp,
        //         query: parameter
        //     });

        // },
        //查询列表数据
        queryList: function (queryType, callback) {
            let _self = this;
            if (queryType == 'pushLoad') {
                //上拉请求
                _self.pageNum += 1;
            } else {
                //非上拉请求
                _self.pageNum = 1;
            }
            var groupID = _self.companyID || "";
            if (tool.isNullOrEmptyObject(groupID)) {
                _self.noData = true;
                return;
            }

            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ContactsHandle_GroupInnerData;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                PageSize: _self.pageSize,
                PageNum: _self.pageNum,
                GroupID: groupID,
                _RegisterCode: tool.RegisterCode(),
                QueryCondiction: []
            };
            if (tool.isNullOrEmptyObject(queryType)) {
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
                    //无数据
                    if (data.length <= 0 && _self.pageNum == 1) {
                        _self.noData = true;
                        return;
                    }
                    _self.noData = false;

                    if (queryType == 'pushLoad') {
                        _self.listData = _self.listData.concat(data);
                    } else {
                        _self.listData = data || [];
                    }
                    _self.$refs.scroll.refresh();
                    //定义跳转事件
                    _self.$nextTick(function () {
                        $("[data-url]").off('click').on('click', function () {
                            var curObj = $(this);
                            if (tool.isNullOrEmptyObject(curObj)) {
                                return;
                            }
                            var urlTemp = curObj.attr("data-url") || "";
                            if (tool.isNullOrEmptyObject(urlTemp)) {
                                return;
                            }

                            var infoName = $(this).find(".item-first-div").text() || "";
                            var parameter = {
                                onlyView: true,
                                infoName: infoName,
                                source: 'contactsof'
                            };

                            _self.$store.commit('REMOVE_ITEM', 'contactsinfo');
                            _self.$router.push({
                                path: urlTemp,
                                query: parameter
                            });
                        });
                    })
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });

            // setTimeout(() => {
            //     tool.hideLoading(loadingIndexClassName);
            //     _self.$refs.scroll.refresh();
            // }, 2000);
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

        //获取列表数据
        getListData: function () {
            var _self = this;

            var groupID = _self.companyID || "";
            if (tool.isNullOrEmptyObject(groupID)) {
                _self.noData = true;
                return;
            }

            //请求地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ContactsHandle_GroupInnerData;
            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                PageSize: _self.pageSize,
                PageNum: _self.pageNum,
                GroupID: groupID,
                _RegisterCode: tool.RegisterCode(),
                QueryCondiction: []
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
                    // console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        _self.noData = true;
                        return;
                    }

                    data = data._OnlyOneData.Rows || [];
                    //无数据
                    if (data.length <= 0) {
                        _self.noData = true;
                        return;
                    }
                    _self.noData = false;
                    _self.listData = data;

                    //定义跳转事件
                    _self.$nextTick(function () {
                        $("[data-url]").off('click').on('click', function () {
                            var curObj = $(this);
                            if (tool.isNullOrEmptyObject(curObj)) {
                                return;
                            }
                            var urlTemp = curObj.attr("data-url") || "";
                            if (tool.isNullOrEmptyObject(urlTemp)) {
                                return;
                            }

                            var infoName = $(this).find(".item-first-div").text() || "";
                            var parameter = {
                                onlyView: true,
                                infoName: infoName,
                                source: 'contactsof'
                            };

                            _self.$store.commit('REMOVE_ITEM', 'contactsinfo');
                            _self.$router.push({
                                path: urlTemp,
                                query: parameter
                            });
                        });
                    })
                },
                error: function (jqXHR, type, error) {
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },

        backHandler: function () {
            this.$router.back(-1);
        },

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
