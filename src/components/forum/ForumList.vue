<template>
<div>
    <div class="header">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
        <div class="search">
            <i></i>
        </div>
    </div>

</div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created:function(){

  },
  methods:{
      //返回首页
      back:function(){
          this.$router.back(-1);
      }
  }


}
</script>
<style scoped>
@import "../../assets/css/forum/ForumList.css";
</style>
