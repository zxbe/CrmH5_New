<template>
  <div>
      <div class="row-div">
          <div class="item-div" data-url="123" @click="router($event)">
              <i class="calcfont calc-gongsixinxi"></i>
              <p class="lanText f14" data-lanid="1000321_A/C Delivery Schedule"></p>
          </div>
          <div class="item-div" data-url="" @click="router($event)">
              <i class="calcfont calc-gongsixinxi"></i>
              <p class="lanText f14" data-lanid="1000327_Market Outlook"></p>
          </div>

      </div>

      <div class="row-div">
          <div class="item-div" data-url="" @click="router($event)">
              <i class="calcfont calc-gongsixinxi"></i>
              <p class="lanText f14" data-lanid="1000351_Pitching Materials"></p>
          </div>
          <div class="item-div" data-url="" @click="router($event)">
              <i class="calcfont calc-gongsixinxi"></i>
              <p class="lanText f14" data-lanid="1000352_News / Memberships"></p>
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
    mounted:function(){
        var _self = this;
        lanTool.updateLanVersion();
    },
    methods:{
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
            }

            _self.$router.push(url);
        }

    }
}
</script>
<style scoped>

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
