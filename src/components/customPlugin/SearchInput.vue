<template>

<div class="search-box">
  <i class="calcfont calc-shaixuan2 search-icon"></i>
  <input v-if="enableInput" v-model="searchValue" class="search-input" :placeholder="placeholder" type="text" @input="inputChange" @keyup="onkeyUp($event)" />
  <input v-else v-model="searchValue" class="search-input disable" :placeholder="placeholder" type="text" />
  <i v-if="enableInput" v-show="showClean" class="calcfont calc-guanbi1 delete-icon f14" @click="cleanEvent"></i>
</div>

</template>

<script>
export default {
    data(){
      return{
          searchValue:'',
      }
    },
    computed:{
      showClean(){
        return this.searchValue == '' ? false : true;
      }
    },
    props:{
        placeholder: {
          type: String,
          default: ''
        },
        defaultValue:{
          type: String,
          default: ''
        },
        enableInput:{
          type:Boolean,
          default:true
        }
    },
    created(){
        let _self = this;
        _self.searchValue = _self.defaultValue;
    },
    methods:{
        //输入内容改变
        inputChange(){
          let _self = this;

          if(!tool.isNullOrEmptyObject(_self.$parent.searchFromChildre)){
              _self.$parent.searchFromChildre(_self.searchValue);
          }
        },
        //清空输入内容
        cleanEvent(){
            let _self = this;
            _self.searchValue = '';

            if(!tool.isNullOrEmptyObject(_self.$parent.refreshList)){
                _self.$parent.refreshList();
            }
        },
        //点击键盘搜索按钮
        onkeyUp(e){
          let _self = this;
          if(e.keyCode == 13){
              if(tool.isNullOrEmptyObject(_self.searchValue)){
                  return;
              }
              let item = {
                  id:-1,
                  text: tool.trimStr(_self.searchValue)
              }
              if( !tool.isNullOrEmptyObject(_self.$parent.tapResultItem)){
                  _self.$parent.tapResultItem(item);
              }
          }
        }

    }

}
</script>


<style scoped>
.search-box{display: flex;align-items: center;
  background: #ffffff;
  padding:0 10px;
  border-radius:0.5rem;
  position: relative;
}
.search-icon{font-size: 0.36rem;color:#ccc;}
.search-input{
    flex: 1;
    outline: 0 none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    position: relative;
    line-height: 20px;
    border: 0;
    padding: 5px;
    box-sizing: border-box;
}
.delete-icon{
  display: flex;align-items: center;justify-content: center;border-radius: 50%;
  position: absolute;top:5px;right:10px;background: #ccc;color:#ffffff;
  width:20px;height: 20px;text-align: center;
}
</style>
