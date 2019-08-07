<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-guanbi1 f16 left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
        <a @click="posting" class="posting-btn right f16 lanText" data-lanid="1000244_发帖"></a>
    </header>

    <div class="content">
        <div class="post-title-div">
            <input class="lanInputPlaceHolder post-title f16" data-lanid="1000298_请输入标题" type="text" maxlength="100"/>
            <div class="word-number f12"><span>100/100</span></div>
        </div>
        <div class="post-content-div">
            <textarea class="lanInputPlaceHolder post-content f14" data-lanid="1000368_请输入内容"></textarea>
        </div>
        <div class="post-tag f14">
            <span>标签:</span>
            <input id="tags" type="text" />
        </div>
    </div>

</div>
</template>

<script>
export default {
  data(){
    return{
        title:'发帖'
    }
  },
  mounted:function(){
    lanTool.updateLanVersion();
    this.initSelect();
  },
  methods:{
      //返回上一页
      back:function(){
          this.$router.back(-1);
      },
      //发帖
      posting:function(){

      },
      //初始化选择标签控件
      initSelect:function(){
          $("#tags").select({
            title: "您的爱好",
            multi: true,
            items: [
              {
                title: "画画",
                value: 1
              },
              {
                title: "打球",
                value: 2
              },
              {
                title: "唱歌",
                value: 3
              },
              {
                title: "游泳",
                value: 4
              },
              {
                title: "画画",
                value: 5
              },
              {
                title: "打球",
                value: 6
              },
              {
                title: "唱歌",
                value: 7
              },
              {
                title: "游泳",
                value: 8
              },
            ]
          });
      }
  }
}
</script>

<style scoped>
.mycalcfont {
  font-size: 0.48rem;
  text-align: center;
  padding: 0.2rem 10px;
  position: relative;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  line-height: 1;
  margin: 4px 0 0 4px;
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background: #fff;
}
.header .title-text{
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
    position: absolute;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    line-height: 0.88rem;
}
.header .posting-btn{
  line-height:0.88rem;
  padding:0 10px;
  color:#7ebbff;
}

.content{
  padding:0.88rem 15px 0 15px;
}
.post-title-div{position: relative;}
.content .post-title{
  border:none;
  outline: none;
  line-height: 16px;
  padding:10px 50px 10px 0;
  width: 100%;
  box-sizing: border-box;
}
.content .word-number{
  display: inline-block;
  position: absolute;
  right:0;
  bottom:10px;
  color:#ccc;
  line-height: 14px;
  height: 14px;
  overflow: hidden;
}
.post-content-div{
  padding-top:5px;
}
.post-content{
  border:none;
  outline: none;
  line-height:1.4;
  width: 100%;
  height:4rem;
  box-sizing: border-box;
}
.post-tag{
  padding:20px 0 10px;
  display: flex;
}
</style>
