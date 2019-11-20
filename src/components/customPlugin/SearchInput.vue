<template>

<div class="search-box">
  <i class="calcfont calc-shaixuan2 search-icon"></i>
  <input v-model="searchValue" class="search-input" :placeholder="placeholder" type="text" @input="inputChange" />
</div>

</template>

<script>
export default {
    data(){
      return{
          searchValue:''
      }
    },
    props:{
        placeholder: {
          type: String,
          default: '请输入'
        },
    },
    methods:{

        inputChange(){
          let _self = this;
          _self.$parent.search(_self.searchValue);
        }

    }

}
</script>


<style scoped>
.search-box{display: flex;align-items: center;
  background: #ffffff;
  padding:0 10px;
  border-radius:0.5rem;
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
</style>
