<template>

<!-- 模块中的搜索组件 -->
<div>
    <header class="header" id="searchHeader">
        <search-input ref="searchInput" class="search" placeholder="搜索联系人"></search-input>
        <span @click="cancelEvent" class="cancel-btn f14">取消</span>
    </header>

    <!-- 显示历史搜索状态 -->
    <div v-show="showHistory" class="history-panel">
        <div class="panel-title">
            <div class="title-text f16">历史搜索</div>
            <i class="calcfont calc-shanchu delete-icon f18" @click="deleteAllHistory"></i>
        </div>
        <div class="panel-con" v-if="historyData.length > 0">
               <div v-for="(item,index) in historyData" class="history-item left">
                  <span>{{item}}</span>
                  <i class="calcfont calc-guanbi1 item-delete-icon" @click="deleteOneHistory(item)"></i>
               </div>
        </div>
    </div>

    <!-- 根据输入模糊匹配 -->
    <div v-show="!showHistory" class="matching-panel">
        <div class="result-list" v-if="resultData.length > 0">
              <div class="result-list-item" v-for="(item,index) in resultData" :key="index" :data-id="item.id" @click="tapResultItem(item)">
                  <i class="calcfont calc-shijian l-icon f18"></i>
                  <div class="item-text f14">{{item.text}}</div>
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
  data(){
    return{

        historyData:['text', 'Alan', '今天天气', 'meeting', 'back on', '今天是个好日子', '今天会议'],
        inputValue:'', //搜索框中的值

        resultData:[
            {id:15, text:'test'},
            {id:16, text:'test16'},
            {id:17, text:'test17'},
            {id:18, text:'test18test18test18test18test18test18test18test18test18test18test18test18test18test18test18'},
        ]
    }
  },
  props:{
      module:{
          type: String,
          default:''
      }
  },
  computed:{
      showHistory(){
        let _self = this;
        return tool.isNullOrEmptyObject(_self.inputValue) ? true : false;
      }
  },
  methods:{
    //取消搜索事件
    cancelEvent(){
        let _self = this;
        _self.$parent.pageState = 1;

        //清除子组件值
        _self.$refs.searchInput.searchValue = '';
        _self.inputValue = '';
    },

    //获取搜索历史记录
    getHistory(){

    },

    //删除所有历史记录
    deleteAllHistory(){
        tool.showConfirm(
            // lanTool.lanContent("778_是否确认清除缓存？"),
            '删除所有历史记录？',
            function () {
               //删除
            },
            function () {}
        );
    },
    //删除单个历史记录
    deleteOneHistory(data){

    },

    //提供给子组件调用,搜索框内容改变时触发
    searchFromChildre(str){
        let _self = this;
        _self.inputValue = str;
        console.log(str);
    },

    //提供给子组件调用,功能为 把列表页面状态改为1 并且 刷新列表页面数据（子组件点击X）
    refreshList(){
        let _self = this;
        _self.$parent.pageState = 1;
        _self.inputValue = '';
        // --》 调列表页面方法去刷新列表数据

    },

    //点击模糊匹配中的结果
    tapResultItem(item){
        let _self = this;
        //1.调列表父组件方法去搜索，把item值带过去

        //2.切换列表父组件状态
        _self.$parent.pageState = 1;
    }

  }

}
</script>

<style scoped>
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  padding:0 15px;
}
.search{flex:1;}
.cancel-btn{margin-left: 10px;padding:5px;}


/* 搜索历史面板 */
.history-panel{ min-height: calc(100vh - 0.88rem); padding:0 15px;}
.panel-title{display: flex;align-items: center;margin-top: 10px;}
.title-text{flex:1;}
.delete-icon{color:#353535;padding:5px;}
.panel-con{}
.history-item{ position: relative;padding:6px 10px;background: #f4f4f4;margin: 12px 12px 0 0;border-radius: 5px;}
.item-delete-icon{
  display: flex;align-items: center;justify-content: center;border-radius: 50%;
  position: absolute;top:-10px;right:-10px;background: #ccc;color:#ffffff;
  width:15px;height: 15px;text-align: center;
  font-size: 12px;display: none;
}

.matching-panel{min-height: calc(100vh - 0.88rem); padding:0 15px;}
.result-list{}
.result-list-item{display: flex;align-items:center;border-bottom: 1px solid #f4f4f4;}
.result-list-item .l-icon{color: #cccccc;margin-right: 3px;}
.result-list-item .item-text{flex:1;padding:13px 0;max-width: 90%;overflow: hidden;text-overflow:ellipsis;
white-space: nowrap;}

</style>
