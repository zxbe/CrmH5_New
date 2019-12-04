<template>
<div class="page">
  <header class="header sticky" id="searchHeader">
      <a v-show="showHistoricalSearchRecord" @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
      <i v-show="!showHistoricalSearchRecord" class="seize-a-seat"></i>
      <search-input class="search" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
      <i class="seize-a-seat"></i>
  </header>


  <div v-show="showHistoricalSearchRecord">
        <!-- 模块 -->
        <div class="module-div">
            <div class="row-div">
                <div class="column-div">
                    <div class="module-item" data-id="8" @click="switchModule($event)">
                        <i class="calcfont calc-huiyikaihuitaolun"></i>
                        <div class="f14 lanText" data-lanid="1149_我的会议"></div>
                    </div>
                </div>
                <div class="column-div">
                    <div class="module-item" data-id="7"  @click="switchModule($event)">
                        <i class="calcfont calc-zuzhi1" ></i>
                        <div class="f14 lanText" data-lanid="685_公司"></div>
                    </div>
                </div>
                <div class="column-div">
                    <div class="module-item item6" data-id="6"  @click="switchModule($event)">
                        <i class="calcfont calc-kehulianxiren"></i>
                        <div class="f14 lanText" data-lanid="630_联系人"></div>
                    </div>
                </div>
            </div>
            <div class="row-div">
                <div class="column-div">
                    <div class="module-item" data-id="9" businessType="30" @click="switchModule($event)">
                        <i class="calcfont calc-yewujihui" ></i>
                        <div class="f14 lanText" data-lanid="644_商业机会"></div>
                    </div>
                </div>
                <div class="column-div">
                    <div class="module-item" data-id="9" businessType="29" @click="switchModule($event)">
                        <i class="calcfont calc-jiaoyi-shijian"></i>
                        <div class="f14 lanText" data-lanid="817_交易"></div>
                    </div>
                </div>
                <div class="column-div">
                    <div class="module-item item6" data-id="11"  @click="switchModule($event)">
                        <i class="calcfont calc-yonghuqun"></i>
                        <div class="f14 lanText" data-lanid="1134_用户活动"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 历史记录 -->
        <div class="history-div">
            <div class="history-title">
                <div class="text lanText f16" data-lanid="1000531_历史搜索"></div>
                <div class="text-btn lanText f14" data-lanid="1000535_清除" @click="deleteAllHistoricalSearchRecord"></div>
            </div>
            <div class="history-content">
                <div class="history-item" v-for="(item,index) in historyData" :key="index" @click="searchByHistotyItem(item)" >
                    <i class="calcfont calc-shijian l-icon f18"></i>
                    <div class="item-text f14">{{item}}</div>
                    <i class="calcfont calc-guanbi1 f18" @click.stop="deleteOneHistory(item)"></i>
                </div>
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
  name:'homesearch',
  components: {
        SearchInput
  },
  data(){
    return{
        //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
        searchModuleFromType:'',
        businessType:'', //商机：30；交易：29，其他模块不用

        inputValue:'', //搜索框中的值
        lanSearchModuleInputPlaceHolder:"",
        //查询结果
        resultData:[
            //{AutoID:15, Name:'test'}
        ],

        localStorageKeyName:'',  //存储historyData的key值
        historyData:[],//历史查询记录
        maxHistoricalCount:10,//允许的最大的历史查询记录数
        isGetDropListByAutoValDone:false,//模糊查询下拉框值的动作是否执行完毕
    }
  },
  computed:{
      //是否显示历史查询记录
      showHistoricalSearchRecord(){
        let _self = this;
        return tool.isNullOrEmptyObject(_self.inputValue) ? true : false;
      }
  },
  created(){},
  mounted(){
    let _self = this;
    lanTool.updateLanVersion();

    //从store中取出 searchModuleFromType，businessType
    _self.searchModuleFromType = _self.$store.state.searchModuleFromType || '';
    _self.businessType = _self.$store.state.businessType || '';
    //模拟点击
    if( !tool.isNullOrEmptyObject(_self.businessType)){
        $('[businessType="'+ _self.businessType +'"]').eq(0).trigger("click");
    }else{
        $('[data-id="'+ _self.searchModuleFromType +'"]').eq(0).trigger("click");
    }

    //定位光标位置(这种方式对IOS无效，以后解决)
    // var $inputObj = $('#searchHeader').find('input.search-input');
    // tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length,function(){
    //     _self.$refs.searchInput.$refs.triggerBtn.click();
    // });
    //  _self.$nextTick(function(){
    //         _self.$refs.searchInput.$refs.curInput.click();
    // })

  },
  methods:{
    //返回上一页
    back(){
        var $this = this;
        $this.$router.back(-1);
    },
    //切换模块
    switchModule(e){
        let _self = this;
        let target = $(e.target);
        if (!target.hasClass('module-item')) {
            target = target.parents("div.module-item:first");
            if (tool.isNullOrEmptyObject(target)) {
                return;
            }
        }

        _self.searchModuleFromType = target.attr('data-id') || '';
        if(tool.isNullOrEmptyObject(_self.searchModuleFromType)){
            return false;
        }
        if(_self.searchModuleFromType == 9){
            _self.businessType = target.attr('businessType') || '';
            if(tool.isNullOrEmptyObject(_self.businessType)){
                return false;
            }
        }else{
            _self.businessType = "";
        }

        //记录searchModuleFromType，businessType
        let  st = {
          searchModuleFromType:_self.searchModuleFromType,
          businessType:_self.businessType
        }
        _self.$store.commit('setValueFromHomeSearch',st)

        //->1.组装存储historyData的key值
        _self.localStorageKeyName = "HistorySearchRecords_" + _self.searchModuleFromType + (tool.isNullOrEmptyObject(_self.businessType)? "" :"_" + _self.businessType);

        //->2.获取搜索历史记录
        _self.getHistoricalSearchRecord();

        //->3.切换页面高亮模块
        $('.module-item').removeClass('active');
        if(!target.hasClass('active')){
           target.addClass('active');
        }

        //4>更改input控件的placeholder
        _self.getSearchModulePlaceholder();
    },
    //更改input控件的placeholder
    getSearchModulePlaceholder:function(){
        let _self = this;
        //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
        switch(_self.searchModuleFromType){
            case "6":
                _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("630_联系人");
                break;
            case "7":
                _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("685_公司");
                break;
            case "8":
                _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("1149_我的会议");
                break;
            case "9":
                if(_self.businessType == "29"){
                    _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("817_交易");
                }else{
                    _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("644_商业机会");
                }
                break;
            case "11":
                _self.lanSearchModuleInputPlaceHolder = lanTool.lanContent("1000304_用户活动");
                break;
            default:
                _self.lanSearchModuleInputPlaceHolder = "";
                break;
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
    //搜索事件(在input组件点击键盘上的搜索/回车键)
    excuteSeach(autoValue){
        let _self = this;
        autoValue = (autoValue||"").trim();
        // 允许空值回车情况
        // if( tool.isNullOrEmptyObject(autoValue)){
        //     return false;
        // }
        if(!tool.isNullOrEmptyObject(autoValue)){
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

        var parameter = {
            autoValue:autoValue
        };//传入参数
        var infoUrl = "";//详情页地址
        //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11;
        //商机：30；交易：29，其他模块不用
        switch(_self.searchModuleFromType){
            case "6":
                infoUrl = "/contacts";
                break;

            case "7":
                infoUrl = "/organizations";
                break;

            case "8":
                infoUrl = "/meeting";
                break;

            case "9":
                if(_self.businessType == '29'){
                    infoUrl = "/pipeline";
                }else{
                    infoUrl = "/pitches";
                }
                break;
            case "11":
                infoUrl = "/userEvents";
                break;
            default:
                return false;
        }

        //根据不同模块，跳到具体的详情页
        _self.$router.push({
            path: infoUrl,
            query: parameter
        });
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
            Top:10//查询匹配的前N条记录
        };

        if( !tool.isNullOrEmptyObject(_self.businessType)){
            jsonDatasTemp['BusinessTypes'] = _self.businessType;
        }

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
                //设置光标位置
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
    //清除搜索框的值
    clearSearchValue(){
        let _self = this;
        //2>清除当前组件的inputValue值
        _self.inputValue = "";
        //3>清除模糊查询结果
        // _self.resultData = [];
    },

  },
  beforeDestroy(){
  },
  beforeRouteLeave: function (to, from, next) {
      if (to.name == 'index') {
          //设置searchModuleFromType，businessType为默认值
          let  st = {
            searchModuleFromType:'8',
            businessType:''
          }
          this.$store.commit('setValueFromHomeSearch',st)
      }
      next();
  }
}
</script>

<style scoped>
.page{}
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  position:fixed;z-index: 99;
  top:0;left:0;right:0;
}
.back-icon{font-size: 0.48rem;padding:0.1rem 10px;}
.search{flex:1;}
.seize-a-seat{width:15px;}

.module-div{padding:1rem 0 .5rem;}
.row-div{width:100%;overflow: hidden; display: flex;align-items: center;justify-content: center;margin-right:-1px;overflow: hidden; position: relative;background:#ffffff;}
.column-div{flex: 1;display: flex;align-items: center;justify-content: center;position: relative;}
.module-item{display: flex;align-items: center;justify-content: center;flex-direction: column; width: 100%;height: 100%;padding:0.2rem 0 0.3rem;box-sizing: border-box;color:#787878;}
.module-item.active{color:#FF9900;}
.module-item i.calcfont{font-size:0.8rem;}

.history-div{padding:0rem 15px;position: relative;}
.history-div::after{content:'';height: 1px;background: #f1f1f1;position: absolute;left:15px;right:15px;top:0;}
.history-title{display: flex;align-items: center;padding:0.3rem 0;}
.history-title .text{flex:1;}
.history-title .text-btn{color: #989898;}
.history-item{display: flex;align-items:center;border-bottom: 1px solid #f4f4f4;}
.history-item .l-icon{color: #cccccc;margin-right: 3px;}
.history-item .item-text{flex:1;padding:13px 0;max-width: 90%;overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;}


.matching-panel{background: #fff;position: fixed;top:0.88rem;left:0;right:0;bottom:0;padding:0 15px;}
.result-list-item{display: flex;align-items:center;border-bottom: 1px solid #f4f4f4;}
.result-list-item .l-icon{color: #cccccc;margin-right: 3px;}
.result-list-item .item-text{flex:1;padding:13px 0;max-width: 90%;overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;}




</style>
