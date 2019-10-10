export default{
    data(){
        return{
            showPage: 0,
            noData: true, //没数据
            groupData:[],
            queryCondiction: [], //右侧checkbox条件
            queryCondictionData: [], //综合查询条件
        }
    },

    methods: {

        setQuerycondition: function (data) {
            var _self = this;
            _self.queryCondiction = data;
            //执行监听的这个动作
            _self.RefreshCurPageGroupData();
        },

        /*
         * 监听滚动固定
         * height : 固定元素距离页面顶部的距离
         */
        watchScrollHandle: function (height) {

            var _self = this;
            setTimeout(function () {

                $(window).unbind('scroll').bind('scroll',function(){

                    var scrollTop = $(document).scrollTop() || $(window).scrollTop();
                    if ($(".group-div").length <= 0) return;
                    $(".group-div").each(function (index, el) {

                        if($(el).find('.group-item-list').length <= 0){
                          return true;
                        }
                        let groupDivHeight = $(el).innerHeight();

                        if ((($(el).offset().top - scrollTop) <= height) &&
                            (($(el).offset().top + groupDivHeight - scrollTop) > height)
                        ){
                            if (tool.getSystem() === "ios") {
                                $(el).find(".date-div")
                                     .addClass("sticky")
                                     .css({top: height + "px"});
                                return true;
                            } else {
                                $(el).find(".date-div")
                                    .css({
                                        position: "fixed",
                                        top: height + "px"
                                    });
                                $(el).children(".occupy-div").show();
                                return true;
                            }
                        } else {
                            if (tool.getSystem() === "ios") {
                                $(el).find(".date-div")
                                    .removeClass("sticky")
                                    .css({top: "0px"});
                                return true;
                            } else {
                                $(el).find(".date-div")
                                    .css({
                                        position: "static"
                                    });
                                $(el).children(".occupy-div").hide();
                                return true;
                            }
                        }
                    });

                    //列表二级滚动固定
                    if ($(".company_item").length <= 0) return;
                    // let dateDivHeight = $('.date-div').innerHeight()+1;
                    let dateDivHeight = $('.date-div').height();
                    // let companyItemTitHeight = $('.company_item_tit').innerHeight()+1;
                    let companyItemTitHeight = $('.company_item_tit').height();

                    $(".company_item").each(function (index, el) {

                        if($(el).find('.data-list').length <= 0){
                          return true;
                        }

                        let companyItemHeight = $(el).innerHeight();

                        if ((($(el).offset().top - scrollTop) <= (height + dateDivHeight)) &&
                            (($(el).offset().top + companyItemHeight - scrollTop) > (height + dateDivHeight + companyItemTitHeight))
                        ){
                            if (tool.getSystem() === "ios") {
                                $(el).find(".company_item_tit").addClass("sticky")
                                        .css({
                                            top: (height + dateDivHeight) + "px"
                                        });
                                return true;
                            } else {
                                $(el).find(".company_item_tit")
                                    .css({
                                        position: "fixed",
                                        top: (height + dateDivHeight) + "px"
                                    });
                                $(el).children(".occupy-div").show();
                                return;
                            }
                        } else {
                            if (tool.getSystem() === "ios") {
                                $(el).find(".company_item_tit").removeClass("sticky")
                                    .css({
                                        top: "0px"
                                    });
                                return true;
                            } else {
                                $(el).find(".company_item_tit")
                                    .css({
                                        position: "static"
                                    });
                                $(el).children(".occupy-div").hide();
                                return true;
                            }
                        }
                    });

                });
            }, 0);
        },

        //切换页面
        switchPageHandle: function (num, e, mutationsName) {
            var _self = this;
            var el = e.target;
            if (num === undefined) return;
            //清空右侧筛选数据
            eventBus.queryCondictionData = null;

            $(el)
                .addClass("active-item")
                .siblings()
                .removeClass("active-item");
            //会议列表没有切换 所以不用调用这个方法
            if(!tool.isNullOrEmptyObject(el)){
                _self.changePos();
            }

            //获取来源页
            var fromPage = tool.getSessionStorageItem("fromPage") || "";
            //移除来源页
            tool.removeSessionStoragItem("fromPage");

            var isResetRightPanel = _self.showPage != num  || (!tool.isNullOrEmptyObject(fromPage) &&  fromPage.toLowerCase() == "index");

            _self.showPage = num;
            _self.$store.commit(mutationsName, num);
            $(window).scrollTop(0);

            if(isResetRightPanel){

                //综合查询条件置空
                _self.queryCondictionData = [];
                _self.queryCondiction = [];

                //右侧radio重置为默认值
                var returnObj = _self.$refs.rightPanel.reductionDataFilter(isResetRightPanel);
                if (tool.isNullOrEmptyObject(returnObj)) {
                    return ;
                }

                _self.queryCondiction.push(returnObj.defaultQueryCondition);

                //如果是 businessCategories 模块
                if(_self.$route.name && _self.$route.name == 'businessCategories'){

                    _self.groupBy = returnObj.defaultGroupBy||"";
                    //移除mui-active,清空数据
                    $("#startdate,#enddate").val("");
                    $(".timeview").removeClass("mui-active");
                    $(".timeview[data-datetype='all']").addClass("mui-active");
                    _self.slideUpWithContent();
                    //默认构造all条件
                    _self.timeSlot = 'all';
                    var isExeAjax = false;
                    _self.prePareQueryData(isExeAjax);
                }

                _self.RefreshCurPageGroupData();
            }else{
                _self.RefreshCurPageGroupData();
            }
        },

        //table底部横条过渡效果
        changePos: function () {
            this.$nextTick(function () {
                var activePos = $(".nav .active-item").position();
                $(".nav-border")
                    .stop()
                    .css({
                        left: activePos.left,
                        width: $(".nav .active-item").width()
                    });
            });
        },

        /*
         * 列表展开收起
         *  id1 , id2 :只模块id
         */
        groupToggleHandle:function(id1, id2){
            var _self = this;
            $("#"+ id1 +",#"+id2).off("click", "div.date-div").on(
                "click",
                "div.date-div",
                function (event) {
                    event.preventDefault();
                    var target = $(event.target);
                    if (!target.hasClass('date-div')) {
                        target = target.parents("div.date-div:first");
                        if (tool.isNullOrEmptyObject(target)) {
                            return;
                        }
                    }
                    var fromType = target.parents("div[data-fromtype]").attr("data-fromtype") || "";
                    var groupID = target.find("span[data-groupid]:first").attr("data-groupid") || "";

                    if (tool.isNullOrEmptyObject(groupID)) {
                        return;
                    }

                    //若是展开
                    if (target.hasClass("open")) {
                        target
                            .removeClass("open")
                            .siblings(".group-item-list")
                            .slideUp(500, function () {
                                //清空items数据
                                $.each(_self.groupData, function (index, item) {
                                    if (item.GroupID == groupID) {
                                        item.items = [];
                                        return;
                                    }
                                })
                            });
                    } else {
                        //若是收起
                        var allQueryData = tool.combineArray(_self.queryCondictionData, _self.queryCondiction, "Field");

                        //BusinessCategories模块需要用到
                        if(allQueryData && !tool.isNullOrEmptyObject(_self.dateRangeJObject)){
                            allQueryData.push(_self.dateRangeJObject);
                        }

                        let groupBy = _self.groupBy == undefined ? '' : _self.groupBy;

                        tool.InitInnerDataList(_self, fromType, groupID, allQueryData, function(){
                            _self.$nextTick(function () {
                                target.addClass("open")
                                    .siblings(".group-item-list")
                                    .slideDown(500);
                                //联系人二级展开收起
                                if(!tool.isNullOrEmptyObject(_self.contactsToggle)){
                                  _self.contactsToggle();
                                }
                                //分组模式会议 二级展开收起
                                if(!tool.isNullOrEmptyObject(_self.meetingToggle)){
                                  _self.meetingToggle();
                                }
                            })
                        }, '', groupBy, _self.showPage);
                    }
                }
            );

        },

        /*
         * 刷新分组数据操作
         */
        RefreshCurPageGroupDataHandle:function(data){
            var _self = this;

            if(tool.isNullOrEmptyObject(data)){
              return;
            }
            var num = _self.showPage;
            var fromType = "";

            $.each(data, function(index, item){
                if(num == item.moduleId){
                  _self.searchData = item.searchData;
                  fromType = item.fromType;
                  // container = item.container;
                }
            })
            //渲染数据
            var allQueryData = tool.combineArray(_self.queryCondictionData, _self.queryCondiction, "Field");
            if(allQueryData && !tool.isNullOrEmptyObject(_self.dateRangeJObject)){
                allQueryData.push(_self.dateRangeJObject);
            }

            let groupBy = _self.groupBy == undefined ? '' : _self.groupBy;

            tool.InitGrouplist(_self, fromType, allQueryData, function(){

                //BusinessCategories模块
                if(_self.$route.name && _self.$route.name == 'businessCategories'){
                    _self.search();
                    _self.ClearSearchText();
                }

                //把列表中的open类清楚
                $('.open').removeClass('open');

            }, '', groupBy, _self.showPage);

        }

    }

  };
