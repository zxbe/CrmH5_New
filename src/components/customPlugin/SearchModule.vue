<template>

<!-- 模块中的搜索组件 -->
<div>
    <header class="header" id="searchHeader">
        <search-input ref="searchInput" class="search"  :isShowClearIcon="true" :placeholder=lanSearchModuleInputPlaceHolder></search-input>
        <!-- <input type="text" class="search-input2" style="width: 30px;"/> -->
        <span @click="cancelEvent" class="cancel-btn f14">{{lanCancel}}</span>
    </header>

    <!-- 显示历史搜索状态 -->
    <div v-show="showHistoricalSearchRecord" class="history-panel">
        <div class="panel-title">
            <div class="title-text f16">{{lanHistoricalSearch}}</div>
            <div class="text-btn lanText f14" data-lanid="1000535_清除" @click="deleteAllHistoricalSearchRecord"></div>
        </div>
        <div class="panel-con" v-if="historyData.length > 0">
               <div class="history-item" v-for="(item,index) in historyData" :key="index" @click="searchByHistotyItem(item)">
                    <i class="calcfont calc-shijian l-icon f18"></i>
                    <div class="item-text f14">{{item}}</div>
                    <i class="calcfont calc-guanbi1 delete-icon f18" @click.stop="deleteOneHistory(item)"></i>
                </div>
        </div>
    </div>

    <!-- 根据输入模糊匹配 -->
    <div v-show="!showHistoricalSearchRecord" class="matching-panel">
        <div class="result-list" v-if="resultData.length > 0">
              <div class="result-list-item" v-for="(item,index) in resultData" :key="index" :data-id="item.AutoID" @click="goInfoPage(item)">
                  <i class="calcfont calc-shijian l-icon f18"></i>
                  <div class="item-text f14">{{item.Name}}</div>
              </div>
        </div>
    </div>

</div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
export default {
  components: {
        SearchInput
  },
  props:{
    lanSearchModuleInputPlaceHolder:{
        type: String,
        default:''
    },
    //查询对象
    queryObj:{
        type:Object,
        default:{}
    },
    //父组件的模块类型
    //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
    searchModuleFromType:{
        type: String,
        default:''
    },
    //商机：30；交易：29，其他模块不用传
    businessType:{
        type: String,
        default:''
    }
  },
  data(){
    return{
        lanHistoricalSearch:lanTool.lanContent("1000531_历史搜索"),
        lanCancel:lanTool.lanContent("570_取消"),

        localStorageKeyName: "HistorySearchRecords_" + this.searchModuleFromType + (tool.isNullOrEmptyObject(this.businessType)? "" :"_" +this.businessType), //存储historyData的key值
        historyData:[],//历史查询记录
        inputValue:'', //搜索框中的值
        maxHistoricalCount:10,//允许的最大的历史查询记录数

        isGetDropListByAutoValDone:true,//模糊查询下拉框值的动作是否执行完毕
        //查询结果
        resultData:[
            //{AutoID:15, Name:'test'}
        ],
        timeOutEvent:0, //定时器
    }
  },
  computed:{
      //是否显示历史查询记录
      showHistoricalSearchRecord(){
        let _self = this;
        return tool.isNullOrEmptyObject(_self.inputValue) ? true : false;
      }
  },
  created:function(){
  },
  mounted:function(){
      lanTool.updateLanVersion();
  },
  methods:{
    //取消搜索事件
    cancelEvent(){
        let _self = this;
        //将模糊查询的结果置空
        _self.resultData = [];
        //切换页面到父组件
        _self.$parent.pageState = 1;
        // _self.$parent.ModuleDsiplayAction(true);
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
    //搜索框内容改变事件,显示匹配模糊查询值的下拉数据结果(子组件调用)
    getDropListByAutoVal(autoValue,callback){
        let _self = this;
        autoValue = autoValue.trim();
        //1>记录当前输入值
        _self.inputValue = autoValue;
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
        var top = 10;
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            FromType:_self.searchModuleFromType ||"",
            AutoValue:autoValue,
            BusinessTypes:_self.businessType || "",
            Top:top//查询匹配的前N条记录
        };

        //var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                // console.log("ajax查询值:"+autoValue);
                // console.log("input的查询值:"+_self.$refs.searchInput.searchValue);

                //tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                //console.log(data);

                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    _self.resultData = [];
                    return;
                }

                //若查出Top记录数，则截取Top记录
                var dataArr = data._OnlyOneData.Rows || [];
                if(dataArr.length>top){
                    dataArr = dataArr.slice(0,top);
                }
                _self.resultData = dataArr;
                if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
                    callback(_self.resultData);
                }

                //设置查询完成
                _self.isGetDropListByAutoValDone = true;

                //若ajax查询的值和input的值不是同一个，则再执行一次查询
                if(autoValue != _self.$refs.searchInput.searchValue){
                    _self.getDropListByAutoVal(_self.$refs.searchInput.searchValue);
                }
            },
            error: function (jqXHR, type, error) {
                //tool.hideLoading(loadingIndexClassName);
                console.log(error);
                //设置查询完成
                _self.isGetDropListByAutoValDone = true;
                return true;
            },
            complete: function () {
                //del by Dylan 20191203 因为移除了document.activeElement.blur()，所以不需要定位光标位置
                //设置光标位置
                // var $inputObj = $('#searchHeader').find('input.search-input');
                // if($inputObj.length>=1){
                //     //获取焦点并设置光标位置
                //     console.log($inputObj[0].value.length);
                //     tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length);
                // }
                //end del

                //设置查询完成
                //_self.isGetDropListByAutoValDone = true;
            }
        });
    },
    //点击模糊查询结果,跳到详情页
    goInfoPage(data){
        let _self = this;
        if(tool.isNullOrEmptyObject(data)){
          return false;
        }
        var autoIDTemp = data.AutoID || "";
        if(tool.isNullOrEmptyObject(autoIDTemp)){
            return false;
        }
        
        var infoNameTemp = data.Name || "";
        var parameter = {
            infoName:infoNameTemp
        };//传入参数
        var infoUrl = "";//详情页地址
        //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11;
        switch(_self.searchModuleFromType){
            case "6":
                // console.log(data);
                // console.log(data.IsHasAccess);
                var isHasAccess = data.IsHasAccess || "true";
                //若没有权限,则直接返回，不允许跳转到详情页
                if(isHasAccess == "false"){
                    tool.showText(lanTool.lanContent("1000572_您无权限访问该记录，请向记录的负责人申请数据共享。"));
                    return false;
                }
                infoUrl = "/contactsinfo/";
                break;

            case "7":
                infoUrl = "/organizationsinfo/";
                break;

            case "8":
                infoUrl = "/meetinginfo/";
                break;

            case "9":
                //showPage:记录列表页是从哪个模块进来的 0：交易；1：商业机会
                if(_self.businessType == "29"){
                    parameter.showPage = 0;
                }else{
                    parameter.showPage = 1;
                }
                infoUrl = "/opportunitiesinfo/";
                break;

            case "11":
                infoUrl = "/userEventsInfo/";
                break;

            default:
                return false;
        }

        //根据不同模块，跳到具体的详情页
        _self.$router.push({
            path: infoUrl + data.AutoID,
            query: parameter
        });
    },
    //搜索事件(在input组件点击键盘上的搜索/回车键)
    excuteSeach(autoValue){
        let _self = this;
        autoValue = (autoValue||"").trim();
        //del by Dylan 20191127 允许空值回车情况
        // if( tool.isNullOrEmptyObject(autoValue)){
        //     return false;
        // }
        //end del

        //1>调用列表父组件方法搜索
        if(_self.$parent.refreshListBySearchValue != null && _self.$parent.refreshListBySearchValue != undefined){
            _self.$parent.refreshListBySearchValue(autoValue,function(){
                //2>查询成功后，把查询值存到缓存
                if(tool.isNullOrEmptyObject(autoValue)){
                    //3>把查询值，赋到父组件的input组件
                    _self.$parent.$refs.searchInput.searchValue = autoValue;
                }else{
                    var dataArr = tool.jObject((tool.getStorageItem(_self.localStorageKeyName) || "[]"));
                    //若历史记录中已经存在查询值，则移除
                    dataArr.remove(autoValue);
                    //加入历史记录
                    dataArr.unshift(autoValue);
                    //若历史记录数超过最大允许数，移除超过的记录
                    if(dataArr.length>_self.maxHistoricalCount){
                        dataArr.splice(_self.maxHistoricalCount-1,dataArr.length-_self.maxHistoricalCount);
                    }

                    //数据写入缓存
                    tool.setStoragItem(_self.localStorageKeyName, JSON.stringify(dataArr));
                    //3>把查询值，赋到父组件的input组件
                    _self.$parent.$refs.searchInput.searchValue = autoValue;
                }
            });
        }
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
    },
  }
}
</script>

<style scoped>
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  padding:0 5px 0 15px;
}
.search{flex:1;}
.cancel-btn{margin-left: 10px;padding:5px;}


/* 搜索历史面板 */
.history-panel{ min-height: calc(100vh - 0.88rem); padding:0 15px;}
.panel-title{display: flex;align-items: center;padding:0.3rem 0;}
.title-text{flex:1;}
.text-btn{color:#989898;}
.delete-icon{margin-left: 10px;}
.panel-con{}
.history-item{display: flex;align-items:center;border-bottom: 1px solid #f4f4f4;}
.history-item .l-icon{color: #cccccc;margin-right: 3px;}
.history-item .item-text{flex:1;padding:13px 0;max-width: 90%;overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;}


.matching-panel{min-height: calc(100vh - 0.88rem); padding:0 15px;}
.result-list{}
.result-list-item{display: flex;align-items:center;border-bottom: 1px solid #f4f4f4;}
.result-list-item .l-icon{color: #cccccc;margin-right: 3px;}
.result-list-item .item-text{flex:1;padding:13px 0;max-width: 90%;overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;}

</style>
