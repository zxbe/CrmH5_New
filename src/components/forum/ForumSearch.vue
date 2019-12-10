<template>
<div>
    <header class="header sticky" id="searchHeader">
        <a v-show="showHistoricalSearchRecord" @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
        <i v-show="!showHistoricalSearchRecord" class="seize-a-seat"></i>
        <search-input class="search" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
        <i class="seize-a-seat"></i>
    </header>

    <!-- 显示搜索结果 -->
    <div v-show="showList">
    <!-- <div class="mainModule"> -->
        <div class="list">
            <vue-scroll v-show="!noData" :showToTop="true" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
                <div v-for="item in listData" @click="goToInfo(item.AutoID)" :key="item.AutoID" class="list-item">
                    <div class="title f16">{{item.Theme}}</div>
                    <div class="content f14">{{item.Content}}</div>
                    <div class="feeditemtag f12">
                        <span v-for="i in item.TagName" :key="i">{{i}}</span>
                    </div>
                    <div class="info f12">
                        <!-- "Status": "已关闭", "Status_ID": 71,
                            "Status": "进行中", "Status_ID": 70, -->
                        <span class="info-state" :class="{'result73':item.Result_ID == 73,'result74':item.Result_ID == 74}">{{item.Result}}</span>
                        <!-- "Result": "已解决", "Result_ID": 73,
                            "Result": "未解决","Result_ID": 74, -->
                        <span class="info-state" :class="{'status71':item.Status_ID == 71,'status70':item.Status_ID == 70}">{{item.Status}}</span>
                    </div>
                    <div class="info f12">
                        <div class="replies">
                            <span>{{repliesText}}</span>
                            <span>{{item.ReplyCount}}</span>
                        </div>
                        <div>
                            <i class="calcfont calc-ziyuan1"></i>
                            <span>{{item.AttachmentCount}}</span>
                        </div>
                        <div class="hand">
                            <!-- 没赞：calc-zan1  赞：calc-zan -->
                            <span class="calcfont" :class="[parseInt(item.IsCurrentUserLike)>=1 ? 'calc-zan' : 'calc-zan1']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="fabulous" @click.stop="fabulousEvent($event)"></span><span class="ActionCount">{{item.LikeCount}}</span>
                        </div>
                        <div class="hand">
                            <!-- 没踩：calc-cai  踩：calc-caishixin- -->
                            <span class="calcfont" :class="[parseInt(item.IsCurrentUserDislike)>=1 ? 'calc-caishixin-' : 'calc-cai']" :data-statusid="item.Status_ID" :data-autoid="item.AutoID" data-even="unfabulous" @click.stop="fabulousEvent($event)"></span><span class="ActionCount">{{item.DislikeCount}}</span>
                        </div>
                    </div>
                    <div class="info f12">
                        <img class="img" src="../../assets/images/forum/default_user_img.png" />
                        <span class="name">{{item.UserName}}</span>

                        <span class="time">{{item.PostTime|MeetingTimeFormat}}</span>
                    </div>

                </div>
            </vue-scroll>
            <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
        </div>
        <div class="buttom-div">
            <a @click="goToPosting" class="f18 calcfont calc-combinedshapecopy2"></a>
        </div>
    </div>

    <div v-show="!showList">
    <!-- <div class="otherModule"> -->
          <div class="search-module">
              <div class="module-item" >
                  <div class="module-item-text f14" data-type="title" @click="switchModule($event)">{{lanTitle}}</div>
              </div>
              <div class="module-item">
                  <div class="module-item-text f14" data-type="Content" @click="switchModule($event)">{{lanContent}}</div>
              </div>
              <div class="module-item">
                  <div class="module-item-text f14" data-type="Tag" @click="switchModule($event)">{{lanTag}}</div>
              </div>
          </div>
          <!-- 显示搜索历史记录 -->
          <div v-show="showHistoricalSearchRecord" class="history-div">
              <div class="history-title">
                  <div class="text f16">{{lanHistoricalSearch}}</div>
                  <div class="text-btn f14" @click="deleteAllHistoricalSearchRecord">{{lanClearAll}}</div>
              </div>
              <div class="history-content">
                  <div class="history-item" v-for="(item,index) in historyData" :key="index" @click="searchByHistotyItem(item)" >
                      <i class="calcfont calc-shijian l-icon f18"></i>
                      <div class="item-text f14">{{item}}</div>
                      <i class="calcfont calc-guanbi1 f18" @click.stop="deleteOneHistory(item)"></i>
                  </div>
              </div>
          </div>

          <!-- 根据输入模糊匹配 -->
          <div v-show="!showHistoricalSearchRecord" class="matching-panel">
              <div class="result-list" v-if="resultData != null && resultData != undefined && resultData.length > 0">
                    <div class="result-list-item" v-for="(item,index) in resultData" :key="index" :data-id="item.AutoID" @click="goToInfo(item.AutoID)">
                        <i class="calcfont calc-shijian l-icon f18"></i>
                        <div class="item-text f14">{{item.Name}}</div>
                    </div>
              </div>
          </div>
    </div>

</div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    name: 'forumsearch',
    components: {
        'vue-scroll': Scroll,
        'nothing': Nothing,
        SearchInput
    },
    data() {
        return {
            noData: false, //没数据
            pageSize: 10, //一页显示多少记录
            pageNum: 1, //当前页码
            repliesText: lanTool.lanContent("1000350_答复"), //在列表通过属性配置不显示
            listData: [],

            lanSearchModuleInputPlaceHolder:lanTool.lanContent("1000306_你想知道什么？"),
            lanHistoricalSearch:lanTool.lanContent("1000531_历史搜索"),
            lanClearAll:lanTool.lanContent("1000535_清除"),
            lanTitle:lanTool.lanContent("710_标题"),
            lanContent:lanTool.lanContent("1000546_内容"),
            lanTag:lanTool.lanContent("1000437_标签"),

            inputValue:'', //输入的值
            resultData:[], //查询结果
            localStorageKeyName:'HistorySearchRecords_forum',  //存储historyData的key值
            historyData:[],//历史查询记录
            maxHistoricalCount:10,//允许的最大的历史查询记录数
            isGetDropListByAutoValDone:true,//模糊查询下拉框值的动作是否执行完毕
            searchType:'',  //搜索类型
            searchModuleFromType:"96",
            showList:false,  //显示列表
        }
    },
    computed:{
        //是否显示历史查询记录
        showHistoricalSearchRecord(){
          let _self = this;
          return tool.isNullOrEmptyObject(_self.inputValue) ? true : false;
        }
    },
    beforeRouteEnter: function (to, from, next) {
        next();
    },
    created: function () {
        var _self = this;
        //设置为Keep-Alive页面
        _self.$store.commit('SET_ITEM', 'forumsearch');
        //获取搜索历史数据
        _self.getHistoricalSearchRecord();
    },
    mounted: function () {
        let _self = this;

        //初始化动作
        _self.initAction();

        //监听input是否获取到焦点
        $('#searchHeader input.search-input').on('focus',function(){
            _self.showList = false;
            // _self.ModuleDsiplayAction(false);
        });
    },
    activated(){
        let _self = this;

        //定位光标位置(这种方式对IOS无效，以后解决)
        // var $inputObj = $('#searchHeader').find('input.search-input');
        // tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length,function(){
        //     _self.$refs.searchInput.$refs.triggerBtn.click();
        // });
        //返回来如果是列表的就不变
        if(!tool.isNullOrEmptyObject(_self.listData)){
            return false;
        }else{
        //否则回到初始状态
            _self.clearSearchValue();
        }
    },
    methods: {
        //是否显示主模块
        // ModuleDsiplayAction:function(isShowMainModule){
        //     isShowMainModule = (isShowMainModule == null || isShowMainModule == undefined)?true:isShowMainModule;
        //     if(isShowMainModule){
        //         $(".mainModule").removeClass("hide").addClass("show");
        //         $(".otherModule").removeClass("show").addClass("hide");
        //     }else{
        //         $(".mainModule").removeClass("show").addClass("hide");
        //         $(".otherModule").removeClass("hide").addClass("show");
        //     }
        // },
        //切换搜索模块
        switchModule(e){
            let _self = this;
            let target = $(e.target);
            _self.searchType = target.attr('data-type') || '';
            if(tool.isNullOrEmptyObject(_self.searchType)){
                return ;
            }
            if(!target.hasClass('active')){
                target.addClass('active').closest('div.module-item').siblings('.module-item').find('.module-item-text').removeClass('active');
            }

            //调搜索方法
            _self.getDropListByAutoVal((_self.inputValue||""));
        },
        //初始化动作
        initAction:function(){
            let _self = this;
            //1>初始化查询类型
            var $defaultObj = $(".search-module .module-item .module-item-text[data-type]").eq(0);
            if(tool.isNullOrEmptyObject($defaultObj) || $defaultObj.length <=0){
                return false;
            }
            $defaultObj.trigger("click");

            //2>定位光标位置(这种方式对IOS无效，以后解决)
            // var $inputObj = $('#searchHeader').find('input.search-input');
            // tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length,function(){
            //     _self.$refs.searchInput.$refs.triggerBtn.click();
            // });
        },
        //搜索框内容改变事件,显示匹配模糊查询值的下拉数据结果(子组件调用)
        getDropListByAutoVal(autoValue,callback){
            let _self = this;
            autoValue = autoValue.trim();
            //1>记录当前输入值
            _self.inputValue = autoValue;

            //清空列表数据
            _self.listData = [];

            //若模糊查询值为空，则不执行查询动作
            if(tool.isNullOrEmptyObject(autoValue)){
                //若查询值为空，则清空查询结果
                _self.resultData = [];
                return;
            }

            //判断上一次查询是否执行完毕
            if(_self.isGetDropListByAutoValDone){
                _self.isGetDropListByAutoValDone = false;
            }else{
               return;
            }

            //3>执行查询动作
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_DataSearchHandle_AutoQuery;

            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                FromType:_self.searchModuleFromType ||"",
                AutoValue:autoValue,
                Top:10,//查询匹配的前N条记录
                SearchType:_self.searchType || ""
            };

            //var loadingIndexClassName = tool.showLoading();
            $.ajax({
                async: true,
                type: "post",
                url: urlTemp,
                data: jsonDatasTemp,
                success: function (data) {
                    //tool.hideLoading(loadingIndexClassName);
                    data = tool.jObject(data);
                    //console.log(data);

                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        _self.resultData = [];
                        return;
                    }
                    _self.resultData = data._OnlyOneData.Rows || [];

                    if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
                        callback(_self.resultData);
                    }
                },
                error: function (jqXHR, type, error) {
                    //tool.hideLoading(loadingIndexClassName);
                    console.log(error);
                    return true;
                },
                complete: function () {
                    //del by Dylan 20191203 因为移除了document.activeElement.blur()，所以不需要定位光标位置
                    // //设置光标位置
                    // var $inputObj = $('#searchHeader').find('input.search-input');
                    // if($inputObj.length>=1){
                    //     //获取焦点并设置光标位置
                    //     //console.log($inputObj[0].value.length);
                    //     tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length);
                    // }
                    //end del

                    //设置查询完成
                    _self.isGetDropListByAutoValDone = true;

                    //隐藏虚拟键盘
                    //document.activeElement.blur();
                }
            });
        },
        //搜索事件(在input组件点击键盘上的搜索/回车键)
        excuteSeach(autoValue){
            let _self = this;
            autoValue = (autoValue||"").trim();

            _self.search();

            if(!tool.isNullOrEmptyObject(autoValue)){
                _self.showList = true;
                // _self.ModuleDsiplayAction(true);

                //把值存到缓存
                var dataArr = tool.jObject((tool.getStorageItem(_self.localStorageKeyName) || "[]"));
                //若历史记录中已经存在查询值，则移除
                dataArr.remove(autoValue);
                //加入历史记录
                dataArr.unshift(autoValue);
                //若历史记录数超过最大允许数，移除超过的记录
                if(dataArr.length>_self.maxHistoricalCount){
                    dataArr.splice(_self.maxHistoricalCount-1,dataArr.length - _self.maxHistoricalCount);
                }

                //数据写入缓存
                tool.setStoragItem(_self.localStorageKeyName, JSON.stringify(dataArr));
            }
        },
        //获取搜索历史记录
        getHistoricalSearchRecord(){
            let _self = this;
            let dataString = tool.getStorageItem(_self.localStorageKeyName);
            if(tool.isNullOrEmptyObject(dataString)){
            _self.historyData = [];
            }else{
                _self.historyData = tool.jObject(dataString);
            }
        },
        //删除所有历史记录
        deleteAllHistoricalSearchRecord(){
            let _self = this;
            tool.showConfirm(
                lanTool.lanContent("1000532_您确定要删除整个历史搜索记录吗？"),
                function () {
                  //删除所有历史查询记录
                  _self.historyData = [];
                  tool.setStoragItem(_self.localStorageKeyName, JSON.stringify(_self.historyData));
                },
                function () {}
            );
        },
        //删除指定的历史记录
        deleteOneHistory(data){
            let _self = this;
            if(tool.isNullOrEmptyObject(data)){
                return false;
            }

            if(tool.isNullOrEmptyObject(_self.historyData)){
                _self.historyData = [];
            }else{
                _self.historyData.remove(data);
            }

            //设置缓存历史查询记录
            tool.setStoragItem(_self.localStorageKeyName,JSON.stringify(_self.historyData));
        },
        //清除搜索框的值
        clearSearchValue(){
            let _self = this;
            //1>清除input控件的值
            _self.$refs.searchInput.searchValue = "";
            //2>清除当前组件的inputValue值
            _self.inputValue = "";
            //3>清除模糊查询结果
            _self.resultData = [];
            //4>清空列表数据
            _self.listData = [];
            //隐藏列表
            _self.showList = false;
            //重新获取一次搜索历史数据
            _self.getHistoricalSearchRecord();

            // _self.ModuleDsiplayAction(false);
        },
        //点击历史查询记录，查询匹配数据
        searchByHistotyItem:function(data){
            let _self = this;

            if(tool.isNullOrEmptyObject(data)){
                return false;
            }
            //1>设置input组件的值
            _self.$refs.searchInput.searchValue = data;
            //2>执行模糊查询，查询匹配的前N条记录
            _self.$refs.searchInput.inputChange();
        },
        //搜索聚焦事件
        // searchFocus: function () {
        //     this.isFocus = true;
        // },
        //热门搜索按钮点击事件
        hotSearchClick: function (num, e) {
            var _self = this;
            var el = e.target;
            var obj = $(el);
            if (!tool.isNullOrEmptyObject(obj)) {
                var text = obj.text();
                $("input#searchAskInput").val(text);
                _self.search();
            }
        },
        goToPosting: function () {
            this.$router.push('/forumposting');
        },
        //点击回车触发搜索事件
        submit: function () {
            var _self = this;
            _self.search();
        },
        //点击去详情页面
        goToInfo: function (num) {
            var _self = this;
            if (tool.isNullOrEmptyObject(num)) {
                return;
            }
            var url = '/foruminfo/' + num;
            _self.$router.push({
                path: url
            });
        },
        //返回上一步
        back: function () {
            this.$router.back(-1);
        },
        //搜索事件
        search: function () {
            var _self = this;
            // var searchVal = $.trim($('#searchAskInput').val() || "");
            // if (tool.isNullOrEmptyObject(searchVal)) {
            //     document.activeElement.blur();
            //     var tips = lanTool.lanContent('933_温馨提示');
            //     var sure = lanTool.lanContent("545_确定");
            //     var alertContent = lanTool.lanContent("1000254_搜索条件不能为空");
            //     $.alert(alertContent, tips, "", sure);
            //     return false;
            // } else {
            //     //下拉刷新
            //     _self.queryList('', function () {
            //         // _self.isFocus = false;
            //     });
            // }
            _self.queryList('pushRefresh', function () {
                // _self.isFocus = false;
            });
        },
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
            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_PostQuery;
            //构造查询条件
            var queryCondictionDataArray = new Array();
            //构造排序
            var sortName = "DatePosted";
            var sortOrder = "desc";
            //构造查询类型
            // var searchType = $(".dropDownList>a.selected").eq(0).attr("data-type") || "Other";
            // searchType = $.trim(searchType);
            // var autoValue = $("#searchAskInput").val() || "";

            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                IsUsePager: true,
                PageSize: _self.pageSize,
                PageNum: _self.pageNum,
                SortName: sortName,
                SortOrder: sortOrder,
                QueryCondiction: JSON.stringify(queryCondictionDataArray),
                SearchType: _self.searchType||"",
                AutoValue: _self.inputValue||""
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

                    //没有数据
                    if ((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1) {
                        _self.listData= [];
                        _self.noData = true;
                        return;
                    }

                    //把标签字段值转换为数组
                    $.each(data, function (i, ietem) {
                        var tagsArr =
                            tool.isNullOrEmptyObject(ietem.TagName) ?
                            [] :
                            ietem.TagName.toString().split(',');
                        ietem.TagName = tagsArr;
                    });

                    _self.noData = false;
                    if (queryType == 'pushLoad') {
                        _self.listData = _self.listData.concat(data);
                    } else {
                        _self.listData = data;
                    }

                    if (queryType == undefined || queryType == '') {
                        _self.$refs.scroll.isPullingDown = true;
                        _self.$refs.scroll.isPullingUpEnd = false;
                        _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                    }
                    _self.$refs.scroll.refresh();

                    if (!tool.isNullOrEmptyObject(callback)) {
                        callback(data, _self.pageSize);
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
        pulldown: function () {
            let _self = this;
            _self.queryList('pushRefresh', function () {
                // _self.$refs.scroll.refresh();
            })
        },
        //上拉
        pullup: function () {
            let _self = this;
            _self.queryList('pushLoad', function (data, pageSize) {

                if (data.length < pageSize) {
                    _self.$refs.scroll.pullupEnd();
                }
            })
        },
        //点赞或者踩
        fabulousEvent: function (e) {
            var _self = this;
            var curObj = $(e.target);

            var statusId = curObj.attr('data-statusid') || '';
            //statusId:71 关闭 ；statusId:70 进行中 ,关闭状态的帖子不给点赞和踩
            if (statusId == '71' || statusId == '') {
                return false;
            }

            //帖子ID
            var autoID = curObj.attr("data-AutoID") || "";
            //用户名
            var userName = tool.UserName();
            //动作类型
            var actionType = ""; //(76=>Like;77=>Dislike)
            //是否添加
            var isAdd = ""; //(0=>取消添加;1=>添加)

            var dataEven = curObj.attr('data-even') || '';
            if (tool.isNullOrEmptyObject(dataEven)) {
                return false;
            }
            //赞图标类名：calc-zan,calc-zan1
            //踩图标类名：calc-caishixin- , calc-cai
            if (dataEven == 'fabulous') {
                actionType = "76";
                //赞
                if (curObj.hasClass('calc-zan')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            } else if (dataEven == 'unfabulous') {
                actionType = "77";
                //踩
                if (curObj.hasClass('calc-caishixin-')) {
                    isAdd = "0";
                } else {
                    isAdd = "1";
                }
            }

            //api接口地址
            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.Api_ForumHandle_PostAction;
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                AutoID: autoID,
                ActionType: actionType,
                IsAdd: isAdd
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
                    //console.log(data);
                    if (data._ReturnStatus == false) {
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        return;
                    }

                    //更新数量和状态
                    data = data._OnlyOneData;
                    if (tool.isNullOrEmptyObject(data)) {
                        return false;
                    }
                    if (tool.isNullOrEmptyObject(data)) {
                        return false;
                    }
                    var countTemp = data.Count.toString() || "0"; //点赞/踩数量
                    countTemp = Number(countTemp);
                    var isCurrentUserDoTemp = data.IsCurrentUserDo.toString() || "0"; //当前用户是否踩/点赞
                    isCurrentUserDoTemp = Number(isCurrentUserDoTemp);

                    //写入数量
                    var objDest = curObj.closest(".hand");
                    objDest.find(".ActionCount:first").text(countTemp);

                    //改变状态
                    if (dataEven == 'fabulous') {
                        //若当前是已点赞
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('calc-zan').removeClass('calc-zan1');
                        } else {
                            curObj.addClass('calc-zan1').removeClass('calc-zan');
                        }
                    } else if (dataEven == 'unfabulous') {
                        //踩
                        //若当前是已踩
                        if (isCurrentUserDoTemp >= 1) {
                            curObj.addClass('calc-caishixin-').removeClass('calc-cai');
                        } else {
                            curObj.addClass('calc-cai').removeClass('calc-caishixin-');
                        }
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
        }
    },
    beforeRouteLeave: function (to, from, next) {
        if (to.name == 'forumlist') {
            this.$store.commit('REMOVE_ITEM', 'forumsearch');
        }
        next();
    },
}
</script>

<style scoped>
@import "../../assets/css/forum/ForumList.css";
@import "../../assets/css/forum/ForumSearch.css";
</style>
