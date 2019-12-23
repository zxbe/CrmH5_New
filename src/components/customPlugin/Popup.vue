<template>
<div>
    <div id="mask" class="mask" @click="popupToggle" v-show="showPopup" @touchmove.stop.prevent></div>
    <div id="popupContent" class="popup-content">


    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
        showPopup:false,

    }
  },
  mounted(){
    let _self = this;

    //监听是否显示弹出层
    // eventBus.$on('showScreenEvent',_self.popupToggle);
  },
  methods:{

    //底部弹出显示隐藏
    popupToggle:function(isClose){
        var _self = this;
        if(isClose == false){
            _self.showPopup = isClose;
        }else{
            _self.showPopup = !_self.showPopup;
        }

        //若已经收起,则展开
        if(_self.showPopup){
            //1>展开的同时，给body添加hideOverflow样式
            $("body").addClass("hideOverflow");

            //2>展开
            _self.$nextTick(function(){
                $('#popupContent').css({
                    'top':'2rem',
                    'transition':'top 0.2s ease-out',
                    '-moz-transition': 'top 0.2s ease-out',
                    '-webkit-transition':'top 0.2s ease-out',
                    '-o-transition': 'top 0.2s ease-out'
                });
            });
        }else{
            //若已经展开，则收起
            //1>收起的同时，移除body的hideOverflow样式
            $("body").removeClass("hideOverflow");

            //2>收起
            _self.$nextTick(function(){
                $('#popupContent').css({
                    'top':'100%',
                    'transition':'top 0.3s ease-out',
                    '-moz-transition': 'top 0.3s ease-out',
                    '-webkit-transition':'top 0.3s ease-out',
                    '-o-transition': 'top 0.3s ease-out'
                });

            })
        }
    },
  }


}
</script>

<style scoped>
.mask{position:fixed;top:0;left:0;bottom:0;right:0;background: rgba(0, 0, 0, 0.3);z-index:102;}
.popup-content{position:fixed;left: 0;right: 0;top:100%;height:2rem;z-index: 103;background: #ffffff;}

</style>
