<template>
  <div>
      <header class="header">
          <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
          <h1 class="title-text f18">{{title}}</h1>
      </header>

      <div class="content-div">
          <div class="row-div">
              <div class="item-div" data-url="https://www.planespotters.net/deliveries" @click="router($event)">
                  <i class="calcfont calc-lianjie"></i>
                  <p class="lanText f14" data-lanid="1000321_A/C Delivery Schedule"></p>
              </div>
              <div class="item-div" data-url="/bilist" data-type="outlook" @click="router($event)">
                  <i class="calcfont calc-lianjie"></i>
                  <p class="lanText f14" data-lanid="1000327_Market Outlook"></p>
              </div>

          </div>

          <div class="row-div">
              <div class="item-div" data-url="/bilist" data-type="materials" @click="router($event)">
                  <i class="calcfont calc-lianjie"></i>
                  <p class="lanText f14" data-lanid="1000351_Pitching Materials"></p>
              </div>
              <div class="item-div" data-url="/bilist" data-type="memberships" @click="router($event)">
                  <i class="calcfont calc-lianjie"></i>
                  <p class="lanText f14" data-lanid="1000352_News / Memberships"></p>
              </div>

          </div>

      </div>

  </div>
</template>
<script>
export default {
    data(){
      return{
          title:lanTool.lanContent("1080_共享文件"),
      }
    },
    mounted:function(){
        var _self = this;
        lanTool.updateLanVersion();
    },
    methods:{

        //返回上一页
        back:function(){
            var _self = this;
            // this.$router.back(-1);
            _self.$router.replace({
                path: '/'
            });
            //保证地址替换后再刷新
            setTimeout(function () {
                window.location.reload();
            }, 80);

        },
        //跳转
        router:function(event){
            var _self = this;
            var target = $(event.target);
            if (!target.hasClass('item-div')) {
                target = target.closest('div.item-div');
                if (target == undefined) {
                    return;
                }
            }
            var url = target.attr('data-url') || '';
            if(tool.isNullOrEmptyObject(url)){
              return;
            }else if(url == '/bilist'){
                  _self.$router.push({
                    path:url,
                    query:{
                       'type': target.attr('data-type') || '',
                       'title':target.find('.lanText').text() || ''
                    }
                  });
            }else{
                // window.open(url,"_blank");
                window.location.href = url;
            }

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
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background:#f8f2dc;
  z-index: 9;
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

.content-div{
  margin-top:0.88rem;
  position: relative;
}
.content-div::after{
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  background: #d9d9d9;
  height:1px;
}

.row-div{
    display: flex;
}
.item-div{
  flex: 1;
  text-align: center;
  padding:20px;
  position: relative;
}
.item-div::after{
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    bottom:0;
    background: #d9d9d9;
    width: 1px;
}
.item-div::before{
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom:0;
    background: #d9d9d9;
    height:1px;
}
.item-div i{
  font-size: .8rem;
}

/* @import "../../assets/css/bIShareMaterials/BIShareMaterials.css"; */
</style>
