<template>
<div>
    <div id="mask" class="mask" @click="popupToggle" v-show="showPopup" @touchmove.stop.prevent></div>
    <div id="popupContent" class="popup-content">
        <div class="item-field">
            <div class="row"><i class="calcfont calc-fuzerenicon icon"></i> <span class="lanText field-key" data-lanid="825_负责人"></span></div>
            <div class="row"><div class="field-value">{{popupData.Realname}}</div></div>
        </div>
        <div class="item-field">
            <div class="row"><i class="calcfont calc-phone icon"></i> <span class="lanText field-key" data-lanid="704_办公电话"></span></div>
            <div class="row"><div class="field-value">{{popupData.LocalPhone}}</div></div>
        </div>
        <div class="item-field">
            <div class="row"><i class="calcfont calc-mobilephone icon"></i> <span class="lanText field-key" data-lanid="705_移动电话"></span></div>
            <div class="row"><div class="field-value" @click="callPhone">{{popupData.Phone}}</div></div>
        </div>
        <div class="item-field">
            <div class="row"><i class="calcfont calc-mailbox icon"></i> <span class="lanText field-key" data-lanid="697_邮箱"></span></div>
            <div class="row"><div class="field-value" @click="sendEmail">{{popupData.Email}}</div></div>
        </div>

        <div class="btn-div">
            <div class="btn-item-div"><div class="btn-item" @click="popupToggle">取消</div></div>
            <div class="btn-item-div"><div class="btn-item send-btn" @click="sendMsg">发送消息</div></div>
        </div>

    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
        showPopup:false,
        popupData:{},
    }
  },
  mounted(){
    let _self = this;
    lanTool.updateLanVersion();

    // console.log(_self.popupData);
    //监听是否显示弹出层
    // eventBus.$on('showScreenEvent',_self.popupToggle);
  },
  methods:{
    //拨打电话
    callPhone(){
      let _self = this;
      if(tool.isNullOrEmptyObject(_self.popupData.Phone)){
          return;
      }
      window.location.href = 'tel:'+ _self.popupData.Phone;
    },
    //发送邮件
    sendEmail(){
      let _self = this;
      if(tool.isNullOrEmptyObject(_self.popupData.Email)){
          return;
      }
      window.location.href = 'mailto:'+ _self.popupData.Email;

    },
    //发送站内信
    sendMsg(){
      let _self = this;

    },
    //底部弹出显示隐藏
    popupToggle:function(data, isClose){
        var _self = this;

        if(!tool.isNullOrEmptyObject(data)){
            _self.popupData = data;
            console.log(_self.popupData);
        }
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
                    'bottom':'0rem',
                    'transition':'bottom 0.2s ease-out',
                    '-moz-transition': 'bottom 0.2s ease-out',
                    '-webkit-transition':'bottom 0.2s ease-out',
                    '-o-transition': 'bottom 0.2s ease-out'
                });
            });
        }else{
            //若已经展开，则收起
            //1>收起的同时，移除body的hideOverflow样式
            $("body").removeClass("hideOverflow");

            //2>收起
            _self.$nextTick(function(){
                $('#popupContent').css({
                    'bottom':'-100%',
                    'transition':'bottom 0.3s ease-out',
                    '-moz-transition': 'bottom 0.3s ease-out',
                    '-webkit-transition':'bottom 0.3s ease-out',
                    '-o-transition': 'bottom 0.3s ease-out'
                });

            })
        }
    },
  }


}
</script>

<style scoped>
.mask{position:fixed;top:0;left:0;bottom:0;right:0;background: rgba(0, 0, 0, 0.3);z-index:102;}
.popup-content{position:fixed;left: 0;right: 0;bottom:-100%;z-index: 103;background: #ffffff;padding:20px 10px;}

.item-field{margin-bottom: 10px;}
.item-field .row{display: flex;align-items: center;}
.item-field .icon{font-size: .32rem; color:#f90;width: .5rem;}
.item-field .field-key{color:#333333;}
.item-field .field-value{position: relative;flex: 1;padding: 5px 0 5px 0.5rem;}
.item-field .field-value:after {
    position: absolute;
    content: "";left: .5rem;right: 0rem; bottom: 0; height: 1px;
    background-color: beige;
}

.btn-div{display: flex;align-items: center;justify-content: center;padding: 20px 0;}
.btn-item-div{flex:1;display:flex;justify-content: center;align-items: center;}
.btn-item{padding:8px 20px;border:1px solid #cccccc;border-radius: 3px;}
.send-btn{background:#f90;border-color: #f90;color: #ffffff;}

</style>
