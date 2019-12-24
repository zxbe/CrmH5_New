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
            <div class="row"><div class="field-value can-operation" @click="callPhone">{{popupData.Phone}}</div></div>
        </div>
        <div class="item-field" style="margin-bottom:20px;">
            <div class="row"><i class="calcfont calc-mailbox icon"></i> <span class="lanText field-key" data-lanid="697_邮箱"></span></div>
            <div class="row"><div class="field-value can-operation" @click="sendEmail">{{popupData.Email}}</div></div>
        </div>

        <div class="btn-div">
            <div class="btn-item lanText" @click="popupToggle" data-lanid="570_取消"></div>
            <div class="btn-item lanText send-btn" :class="[isHasSendMsg=='true' ? 'has-send' : '']" @click="sendMsg" data-lanid="1000559_发送消息"></div>
        </div>

    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
        showPopup:false,
        popupData:{}, //弹出层数据模型
        isHasSendMsg:"false" //是否已经发送过请求消息
    }
  },
  mounted(){
    let _self = this;
    lanTool.updateLanVersion();

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

        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_MessagesToUserHandle_SendDataAccessRequest;
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: _self.popupData.UserName ||"",
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            FromType: _self.popupData.FromType ||"",
            FromID: _self.popupData.FromID ||"",
            ToUserName: _self.popupData.ToUserName ||"",
        };
        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                // console.log(data);

                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    return;
                }
                //发送成功后，设置发送标志位为true
                _self.isHasSendMsg = "true";
                tool.showText(tool.getMessage(data));
            },
            error: function (jqXHR, type, error) {
                tool.hideLoading(loadingIndexClassName);
                console.log(error);
                return true;
            },
            complete: function () {
                //隐藏虚拟键盘
                document.activeElement.blur();
            }
        });
    },
    //底部弹出显示隐藏
    popupToggle:function(data, isClose){
        var _self = this;

        if(!tool.isNullOrEmptyObject(data)){
            _self.popupData = data;
            //console.log(_self.popupData);
        }

        if(isClose == false){
            _self.showPopup = isClose;
        }else{
            _self.showPopup = !_self.showPopup;
        }

        //若已经收起,则展开
        if(_self.showPopup){
            //判断消息是否已经发送过
            _self.getIsHasSendMsg();
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
    //判断当前消息是否已经发送过
    getIsHasSendMsg(){
        var _self = this;
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_MessagesToUserHandle_HasSendDataAccessRequest;
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: _self.popupData.UserName ||"",
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            FromType: _self.popupData.FromType ||"",
            FromID: _self.popupData.FromID ||"",
            ToUserName: _self.popupData.ToUserName ||"",
        };
        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                // console.log(data);

                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    _self.isHasSendMsg = "false";
                    return;
                }

                //tool.showText(tool.getMessage(data));
                _self.isHasSendMsg = (data._OnlyOneData.toString() || "false").toLowerCase();
                //自己不能给自己发消息
                if(_self.popupData.UserName == _self.popupData.ToUserName){
                    _self.isHasSendMsg = "true";
                }

                console.log(_self.isHasSendMsg);
            },
            error: function (jqXHR, type, error) {
                tool.hideLoading(loadingIndexClassName);
                console.log(error);
                return true;
            },
            complete: function () {
                //隐藏虚拟键盘
                document.activeElement.blur();
            }
        });
    }
  }


}
</script>

<style scoped>
.mask{position:fixed;top:0;left:0;bottom:0;right:0;background: rgba(0, 0, 0, 0.3);z-index:102;}
.popup-content{position:fixed;left: 0;right: 0;bottom:-100%;z-index: 103;background: #ffffff;padding:20px 10px 0 10px;}

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
.can-operation{color:#1775cc;}

.btn-div{position:relative; display: flex;align-items: center;justify-content: center;margin: 0 -10px;}
.btn-div:after {
    position: absolute;
    content: "";left:0rem;right: 0rem; top: 0; height: 1px;
    background-color: #E6E8EA;
}
.btn-item{padding:15px 0;flex: 1;display:flex;justify-content: center;align-items: center;}
.btn-item:active{background: #DDDDDD;}
.send-btn{color:#f90;position: relative;}
.send-btn:after {
    position: absolute;
    content: "";top:0rem;bottom: 0;left: 0; width: 1px;
    background-color: #E6E8EA;
}
.send-btn.has-send{
    color:#cccccc;
    pointer-events:none;
}
</style>
