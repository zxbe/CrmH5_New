<template>
<div class="selectList">
    <header class="header sticky">
        <a @click="backHandler" class="calcfont calc-fanhui left" id="back"></a>
        <h1 class="mui-title">{{title||''}}</h1>
        <a @click="saveHandler" class="calc-gou  calcfont right" id="save"></a>
        <a @click="clearHandler" class="calc-shanchu  calcfont right" id="clear"></a>
        <a v-show="isAdd" @click="addHandler" class="calc-jiahao  calcfont right" id="add"></a>
    </header>

    <div class="selectList-scroll">
        <!-- search-active -->
        <div class="search ">
            <div class="search-box">
                <span class="calcfont calc-sousuo input-search-icon"></span>
                <input
                  type="text"
                  id="searchInput"
                  class="search-input lanInputPlaceHolder" data-lanid="780_搜索" placeholder=""/>
          </div>
            </div>
            <!-- 列表 -->
            <div v-if="!notData && selectType=='checkbox'" class="dataList checkboxList">
                <div v-for="item in dataArray" :key="item.id" class="item-div">
                    <label class="checkbox-label">
                        <input type="checkbox" :disabled="(item.IsHasAccess=='true'||(item.IsHasAccess||'')=='') ? false : true" :name="field" :value="item.id" v-model="checkboxValue"/>
                        <i class="checkbox"></i><span class="radios f14">{{item.text}}</span>
                    </label>
                    <div v-if="item.IsHasAccess=='false' && item.InitiatorArr.length > 0 ">
                        <div class="responsible-by" :key=index v-for="(i,index) in item.InitiatorArr">
                            <i class="calcfont calc-fuzerenicon icon"></i>
                            <div @click.stop="showPopup(i,item.id)" class="responsible-by-text">{{i.Realname}}</div>
                            <i  @click.stop="showPopup(i,item.id)" class="calcfont calc-tongzhi info-icon"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else-if="!notData && selectType=='radio'" class="dataList">
                <div v-for="item in dataArray" :key="item.id" class="item-div">
                    <label class="radios-label">
                      <input type="radio" :disabled="(item.IsHasAccess=='true' ||(item.IsHasAccess||'')=='') ? false : true" :name="field" :value="item.id" v-model="radioValue"/>
                      <i class="radios"></i><span class="f14">{{item.text}}</span>
                    </label>
                    <div v-if="item.IsHasAccess=='false' && item.InitiatorArr.length > 0 ">
                        <div class="responsible-by" :key=index v-for="(i,index) in item.InitiatorArr">
                            <i class="calcfont calc-fuzerenicon icon"></i>
                            <div @click.stop="showPopup(i,item.id)" class="responsible-by-text">{{i.Realname}}</div>
                            <i  @click.stop="showPopup(i,item.id)" class="calcfont calc-tongzhi info-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 没数据 -->
            <nothing v-else style="padding-top:0.8rem;"></nothing>
        </div>
        <div v-if="selectType=='checkbox'" class="selectAll">
            <div class="item-div">
                <label class="checkbox-label">
                          <input @click="selectAll" type="checkbox" name="sex"/><i class="checkbox checkAll"></i>
                          <span>all</span>
            </label>
            </div>
        </div>

      <!-- 底部弹出层   -->
    <popup ref="popup"></popup>
</div>


</template>

<script>
import Nothing from "./Nothing"
import Popup from "@/components/customPlugin/Popup"
export default {
    components: {
        Popup,'nothing': Nothing
    },
    data() {
        return {
            notData: false, //没数据
            dataArray: [], //存放全部数据
            field: "", //来源字段名
            code: "", //执行动作名
            typeValue: "", //具体动作
            title: "", //标题
            value: "", //已选数据
            selectType: "", //判断是否多选
            radioValue: "",
            filter: "", //过滤条件
            addUrl: "", //新增跳转的地址
            checkboxValue: [],
            isAdd: false,
            linkIDField:"",
            linkNameField:"",
            fromType:"",
            addID:'',//新增记录后返回来的id
        }
    },
    created: function () {
        let _self = this;
        _self.field = _self.$route.query.field;
        _self.code = _self.$route.query.code;
        _self.typeValue = _self.$route.query.typeValue;
        _self.title = _self.$route.query.title;
        _self.value = _self.$route.query.value;
        _self.selectType = _self.$route.query.selectType;
        _self.filter = _self.$route.query.filter;
        _self.addUrl = _self.$route.query.addUrl;
        _self.linkIDField = _self.$route.query.linkIDField;
        _self.linkNameField = _self.$route.query.linkNameField;
        _self.fromType = _self.$route.query.fromType;

        //获取新增记录返回来的id
        _self.addID = _self.$store.state.addID || '';
        if(!tool.isNullOrEmptyObject(_self.addID)){
            _self.value = _self.addID.toString();
        }

        if (!tool.isNullOrEmptyObject(_self.addUrl)) {
            _self.isAdd = true;
        }

    },
    mounted: function () {
        lanTool.updateLanVersion();
        //清空输入框
        $("#searchInput").val("").trigger("change");
        //根据是否多选来设置列表滚动的区域高度
        if (this.selectType == 'checkbox') {
            $(".selectList-scroll").css("padding-bottom", "50px");
        }

        //加载数据
        var _self = this;
        _self.getData(function () {
            _self.iniVal();
        });
        //监听搜索
        _self.search();
    },
    methods: {
        //选择全部
        selectAll: function (e) {
            var self = this;
            var el = e.target,
                t = $(e.target).is(":checked");
            if (t) {
                $.each(self.dataArray, function (index, item) {
                    self.checkboxValue.push(item.id);
                })
            } else {
                self.checkboxValue = [];
            }
        },
        //返回
        backHandler: function () {
            this.$router.back(-1);
        },
        //渲染已经选择的的数据
        iniVal: function () {
            var self = this;
            if (tool.isNullOrEmptyObject(self.value)) {
                return;
            }

            var valArrTemp = self.value.split(",");
            self.$nextTick(function () {
                var toTopH = [];
                for (var i = 0; i < valArrTemp.length; i++) {
                    if (self.selectType == 'radio') {
                        //radio
                        self.radioValue = valArrTemp[i];

                        //radio 滚动条定位
                        var curObj = $("input[value='" + valArrTemp[i] + "']").closest('.item-div');
                        if (tool.isNullOrEmptyObject(curObj) || curObj.length <= 0) {
                            return;
                        }
                        var scrollTo = curObj.offset().top;
                        toTopH.push(scrollTo);
                    } else {
                        //checkbox
                        self.checkboxValue.push(valArrTemp[i]);

                        var curObj = $("input[value='" + valArrTemp[i] + "']").closest('.item-div');
                        if (tool.isNullOrEmptyObject(curObj) || curObj.length <= 0) {
                            return;
                        }
                        var scrollTo = curObj.offset().top;
                        toTopH.push(scrollTo);
                    }
                }
                self.scrollTo(toTopH);

                //触发确认操作
                if(!tool.isNullOrEmptyObject(self.addID)){
                    self.saveHandler();
                }

            })
        },
        //滚动条定位到已选中的记录
        scrollTo: function (arr) {
            var _self = this;
            if (tool.isNullOrEmptyObject(arr)) {
                return;
            }
            // console.log(arr);
            _self.$nextTick(function () {
                var headerH = $('header').height();
                var scrollToH = 0;
                if (_self.selectType == 'radio') {
                    scrollToH = arr[0];
                } else {
                    //获取最小值
                    scrollToH = Math.min.apply(Math, arr);
                }
                $(window).scrollTop(scrollToH - headerH);
            })
        },
        //新增
        addHandler: function () {
            var _self = this;
            if(tool.isNullOrEmptyObject(_self.addUrl)){
                return;
            }
            var addUrlTemp = _self.addUrl + '/-1';
            var paramTemp = {};
            if(!tool.isNullOrEmptyObject(_self.fromType)){
                //联系人
                if(_self.fromType == "6" && !tool.isNullOrEmptyObject(_self.linkIDField)){
                    paramTemp["companyID"] = _self.linkIDField;
                    paramTemp["companyName"] = _self.linkNameField;
                }
            }
            paramTemp['source'] = 'selectlist';

            //跳转到新增页面
            _self.$router.push({
                path:this.addUrl + '/-1',
                query: paramTemp
            });
        },
        //保存
        saveHandler: function () {
            var $this = this;
            var returnObj = {
                field: $this.field,
                value: {}
            };

            //radio
            if ($this.selectType == 'radio') {
                // if(tool.isNullOrEmptyObject($this.radioValue)){
                //     tool.showText(lanTool.lanContent('592_请选择数据！'));
                //     return;
                // }

                var id = $this.radioValue;
                var text = $.trim($("input[value='" + id + "']:first").siblings("span:first").text()) || "";
                returnObj["value"] = {
                    id: id,
                    text: text
                };
            } else {
                //checkbox
                var valArr = $this.checkboxValue || [];
                var id = [];
                var text = [];
                for (var i = 0; i < valArr.length; i++) {
                    var idTemp = valArr[i];
                    var textTemp = $.trim($("input[value='" + idTemp + "']:first").siblings("span:first").text()) || "";

                    id.push(idTemp);
                    text.push(textTemp);
                }
                returnObj["value"] = {
                    id: id.join(","),
                    text: text.join(",")
                };
            }
            // console.log(returnObj);
            eventBus.$emit('updataSelectList', returnObj);
            $this.$router.back(-1);
        },
        //清除
        clearHandler: function () {
            var _self = this;
            if (_self.selectType == 'radio') {
                _self.radioValue = '';
            } else {
                _self.checkboxValue = [];
            }
        },
        //获取数据
        getData: function (mycallback) {
            var $this = this;
            if (tool.isNullOrEmptyObject($this.code)) {
                return;
            }

            var urlTemp = tool.AjaxBaseUrl();
            var controlName = tool.CommonDataServiceHandle_Query;

            //传入参数
            var jsonDatasTemp = {
                CurrentLanguageVersion: lanTool.currentLanguageVersion,
                UserName: tool.UserName(),
                _ControlName: controlName,
                _RegisterCode: tool.RegisterCode(),
                Code: $this.code,
                TypeValue: $this.typeValue,
                Filter: $this.filter
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
                        $this.notData = true;
                        tool.showText(tool.getMessage(data));
                        console.log(tool.getMessage(data));
                        return true;
                    }

                    data = data._OnlyOneData || [];

                    //分割负责人信息
                    $.each(data, function(i,dataObj){
                        var initiatorArr = [];
                        var initiator = dataObj.Initiator||"";
                        if(!tool.isNullOrEmptyObject(initiator)){
                            //139||@||aoniruan阮毅文||@||test3@safll.cn||@||86 150 1842 7794||@||755 - 2592 9899 8509
                            var initiatorArrTemp = initiator.split(",");
                            if(!tool.isNullOrEmptyObject(initiatorArrTemp) && initiatorArrTemp.length > 0){
                                $.each(initiatorArrTemp,function(j,initiatorTemp){
                                    var fieldArr = initiatorTemp.split("||@||");
                                    if(fieldArr.length != 8){
                                        return true;
                                    }

                                    var objTemp = {
                                        AutoID : fieldArr[0],
                                        Realname : fieldArr[1],
                                        Email : fieldArr[2],
                                        Phone : fieldArr[3],
                                        LocalPhone : fieldArr[4],
                                        ToUserName : fieldArr[5],
                                        DepartmentID:fieldArr[6],
                                        PositionID:fieldArr[7]
                                    };
                                    initiatorArr.push(objTemp);
                                });
                            }

                            dataObj.InitiatorArr = initiatorArr;
                        }else{
                            dataObj.InitiatorArr = initiatorArr;
                            return true;
                        }
                    });

                    $this.dataArray = data;
                    // console.log($this.dataArray);
                    if (data.length <= 0) {
                        $this.notData = true;
                    } else {
                        $this.notData = false;
                    }

                    if (!tool.isNullOrEmptyObject(mycallback)) {
                        mycallback();
                    }
                },
                error: function (jqXHR, type, error) {
                    $this.notData = true;
                    console.log(error);
                    tool.hideLoading(loadingIndexClassName);
                    return true;
                },
                complete: function () {
                    //tool.hideLoading();
                    //隐藏虚拟键盘
                    document.activeElement.blur();
                }
            });
        },
        //没有权限时，点击负责人弹出层
        //autoID: 记录ID
        showPopup(data,autoID){
            // console.log(data);
            // console.log(autoID);
            if(tool.isNullOrEmptyObject(data) || tool.isNullOrEmptyObject(autoID)){
                return false;
            }
            let _self = this;

            data.FromType = _self.fromType;
            data.FromID = autoID;
            data.UserName = tool.UserName()||"";
            // console.log(data);
            _self.$refs['popup'].popupToggle(data);
        },
        //筛选
        search: function () {
            this.$nextTick(function () {
                var listDom = $('.dataList');
                $('#searchInput').unbind().bind('input', function () {
                    var queryStr = $.trim($(this).val());
                    if (queryStr === '') {
                        listDom.find('div.item-div').show();
                    } else {
                        listDom.find('div.item-div').hide().filter(":lowerCaseContains('" + queryStr + "')").show();
                    }
                })
            });
        }
    },
    beforeRouteLeave:function(to, from, next){
        let _self = this;
        _self.$store.commit('SET_ADD_ID', '');
        next();
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/Selectlist.css";
.dataList .item-div{display: flex;flex-direction: column;}
.dataList .item-div .info-icon{font-size: 0.32rem;padding:0.1rem;color: #1775cc;}
.dataList .item-div .responsible-by{display: flex;align-items: center;padding: 5px 0 0px 26px;}
.dataList .item-div .responsible-by-text{padding:0 3px;}
.dataList .item-div .calcfont{font-size: 16px;padding: 0;}
</style>
