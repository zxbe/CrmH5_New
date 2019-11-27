<template>
<div class="page">
  <header class="header sticky">
      <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
      <!-- <div class="search" @click="showSearch"> -->
          <search-input class="search" :placeholder=lanSearchModuleInputPlaceHolder ref="searchInput"></search-input>
      <!-- </div> -->
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
                    <div class="module-item" data-id="6"  @click="switchModule($event)">
                        <i class="calcfont calc-kehulianxiren"></i>
                        <div class="f14 lanText" data-lanid="630_联系人"></div>
                    </div>
                </div>
            </div>
            <div class="row-div">
                <div class="column-div">
                    <div class="module-item" data-id="9"  @click="switchModule($event)">
                        <i class="calcfont calc-yewujihui" ></i>
                        <div class="f14 lanText" data-lanid="644_商业机会"></div>
                    </div>
                </div>
                <div class="column-div">
                    <div class="module-item" data-id="9"  @click="switchModule($event)">
                        <i class="calcfont calc-jiaoyi-shijian"></i>
                        <div class="f14 lanText" data-lanid="817_交易"></div>
                    </div>
                </div>
                <div class="column-div"></div>
            </div>
        </div>

        <!-- 历史记录 -->
        <div class="history-div">
            <div class="history-title">
                <div class="text lanText f16" data-lanid="1000531_历史搜索"></div>
                <div class="text-btn lanText f14" data-lanid="1000535_清除"></div>
            </div>
            <div class="history-content">
                <div class="history-item" v-for="(item,index) in historyData" :key="index" :data-id="item.AutoID" >
                    <i class="calcfont calc-shijian l-icon f18"></i>
                    <div class="item-text f14">{{item}}</div>
                    <i class="calcfont calc-guanbi1 delete-icon f18"></i>
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
        historyData:['AlanAlanAlanAla','kity'],
        inputValue:'', //搜索框中的值
        lanSearchModuleInputPlaceHolder:lanTool.lanContent("1000202_会议名称"),
        //查询结果
        resultData:[
            {AutoID:15, Name:'test'}
        ],
    }
  },
  computed:{
      //是否显示历史查询记录
      showHistoricalSearchRecord(){
        let _self = this;
        return tool.isNullOrEmptyObject(_self.inputValue) ? true : false;
      }
  },
  mounted(){
      lanTool.updateLanVersion();
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

        $('.module-item').removeClass('active');
        if(!target.hasClass('active')){
           target.addClass('active');
        }


    },

    //搜索框内容改变事件,显示匹配模糊查询值的下拉数据结果(子组件调用)
    getDropListByAutoVal(autoValue,callback){
        let _self = this;
        autoValue = autoValue.trim();
        //1>记录当前输入值
        _self.inputValue = autoValue;
        /*
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
                //设置光标位置
                var $inputObj = $('#searchHeader').find('input.search-input');
                if($inputObj.length>=1){
                    //获取焦点并设置光标位置
                    //console.log($inputObj[0].value.length);
                    tool.setCursorPosition($inputObj[0],($inputObj[0].value||"").length);
                }

                //设置查询完成
                _self.isGetDropListByAutoValDone = true;
                //隐藏虚拟键盘
                document.activeElement.blur();
            }
        });
        */
    },
    //清除搜索框的值
    clearSearchValue(){
        let _self = this;
        //2>清除当前组件的inputValue值
        _self.inputValue = "";
        //3>清除模糊查询结果
        // _self.resultData = [];
    },

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
.row-div{display: flex;align-items: center;justify-content: center;margin-right:-1px;overflow: hidden; position: relative;background:#ffffff;}
.column-div{flex: 1;display: flex;align-items: center;justify-content: center;position: relative;}
.module-item{display: flex;align-items: center;justify-content: center;flex-direction: column; width: 100%;height: 100%;padding:0.2rem 0 0.3rem;box-sizing: border-box;color:#787878;}
.module-item.active{color:#FF9900;}
.module-item i.calcfont{font-size:0.8rem;}

.history-div{padding:0rem 15px;position: relative;}
.history-div::after{content:'';height: 1px;background: #f1f1f1;position: absolute;left:15px;right:15px;top:0;}
.history-title{display: flex;align-items: center;padding:0.3rem 0;}
.history-title .text{flex:1;}
.history-title .text-btn{color: #989898;}

/* .history-item{display: flex;align-items: center;} */
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
