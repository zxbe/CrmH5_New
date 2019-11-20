<template>
<div class="sort">
    <div class="sort-left">
        <div clsss="sort-t" @click="dropDownToggle">
          <span class="sort-text">按公司名正序排序</span>
          <i class="calcfont calc-sanjiaoxing sort-sjx f12"
             :class="sortSjxClass"
          ></i>
        </div>
    </div>
    <div @click="showRightPanel"><span>筛选</span><i class="calcfont calc-shaixuan3"></i></div>

    <div class="drop-down" v-show="showDropDown">
          <div v-for="(item,index) in sortData" :key="index" class="drop-down-item" @click="tapItem(item,index)">
              <div class="item-text" :class="{'active':highlight == index ? true : false}">{{item.sortText}}</div>
              <i v-if="highlight == index" class="calcfont calc-chenggong gou-icon f14"></i>
          </div>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
        showDropDown:false,
        sortSjxClass:'calc-sanjiaoxing',  //三角形类名：calc-sanjiaoxing：向下；calc-sanjiaoxingshang：向上
        highlight:0, //排序高亮的序号
    }
  },
  props:{
      sortData:{
          type: Array,
          default:function(){
            return []
          }
      }
  },
  methods:{

    //下拉显示隐藏
    dropDownToggle:function(){
        let _self = this;
        _self.showDropDown = !_self.showDropDown;
        if(_self.showDropDown){
          _self.sortSjxClass = "calc-sanjiaoxingshang"
        }else{
          _self.sortSjxClass = "calc-sanjiaoxing"
        }
    },
    //点击排序
    tapItem:function(data,index){
        let _self = this;
        if(tool.isNullOrEmptyObject(data) || tool.isNullOrEmptyObject(index)){
          return;
        }
        _self.highlight = index;
        _self.dropDownToggle();

        //组装排序条件

    },
    //显示筛选
    showRightPanel:function(){
        let _self = this;
        if(_self.showDropDown){
            _self.dropDownToggle();
        }
        eventBus.$emit('showScreenEvent');
    }

  }

}
</script>

<style scoped>
.sort{position: relative;z-index: 9;height: 0.7rem;
display: flex;align-items: center;padding:0 10px 0 15px;}
.sort-left{flex:1;display: flex;}
.sort-t{display: flex;align-items: center; }
.sort-text,.sort-sjx,.gou-icon{color:#FF9900;}

.drop-down{background: #ffffff;position: absolute;left:0;right:0;top:0.7rem;}
.drop-down-item{display: flex;line-height: 0.7rem;border-bottom:1px solid #e6e8ea;padding:0 10px 0 15px;}
.item-text{flex:1;}
.item-text.active{color:#FF9900;}
</style>
