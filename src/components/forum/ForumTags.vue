<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
    </header>

    <div class="content">
        <div class="content-title">
          <i class="f18 calcfont calc-fenlei"></i>
          <span class="lanText f16" data-lanid="1000295_所有标签"></span>
        </div>

        <div class="tag-list f16">
            <!-- 字段IsFollow值为fa-star表示关注；fa-star-o表示未关注 -->
            <div
              v-for="item in listData"
              :key="item.AutoID"
              class="item left"
              :class="{'active': item.IsFollow == 'fa-star'}"
              @click="goToList(item.AutoID)"
              @touchstart="gotouchstart(item, $event)"
              @touchmove="gotouchmove(item, $event)"
              @touchend="gotouchend(item, $event)"
              >{{item.Name}}({{item.PostCount}})</div>
        </div>
    </div>



</div>
</template>

<script>
export default {
    data(){
      return{
        timeOutEvent:0, //定时器对象
        title:'All Tag',
        noData:false, //没数据
        listData:[
          {
            "AutoID": 7,
            "Name": "Web",
            "InternalSort": null,
            "PostCount": 18,
            "IsFollow": "fa-star"
          }, {
            "AutoID": 8,
            "Name": "JS",
            "InternalSort": null,
            "PostCount": 8,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 11,
            "Name": "python",
            "InternalSort": null,
            "PostCount": 4,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 14,
            "Name": "C#",
            "InternalSort": 100,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 13,
            "Name": "React",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 4,
            "Name": "Boeing",
            "InternalSort": null,
            "PostCount": 4,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 5,
            "Name": "CALC",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 10,
            "Name": "NodeJS",
            "InternalSort": null,
            "PostCount": 3,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 6,
            "Name": "M737Max",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 3,
            "Name": "AirBus",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 15,
            "Name": "前端",
            "InternalSort": null,
            "PostCount": 3,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 2,
            "Name": "MRO",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 12,
            "Name": "m787",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 9,
            "Name": "Proxy",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 16,
            "Name": "A320",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }
        ]
      }
    },
    created:function(){

    },
    mounted:function(){
      let _self = this;
      lanTool.updateLanVersion();
    },
    methods:{

        //手指开始按
        gotouchstart(obj,e){
          let _self = this;
          clearTimeout(_self.timeOutEvent);//清除定时器
          _self.timeOutEvent = 0;
          _self.timeOutEvent = setTimeout(function(){
                //执行长按要执行的内容，
                $.actions({
                  closeText:lanTool.lanContent("111_关闭"),
                  actions: [{
                    text: '<div>'+ lanTool.lanContent("786_关注") +'</div>',
                    onClick: function() {

                       var curObj = $(e.target);
                       //已关注的再点击关注无效果
                       if(curObj.hasClass('active')){
                          return;
                       }
                      //do something
                      //1.请求数据
                      //2.改变页面状态
                      curObj.addClass('active');

                    }
                  },{
                    text: '<div>'+ lanTool.lanContent("905_取消关注") +'</div>',
                    onClick: function() {

                      var curObj = $(e.target);
                      //未关注的再点击取消关注无效果
                      if(!curObj.hasClass('active')){
                          return;
                      }
                       //do something

                       curObj.removeClass('active');

                    }
                  }]
                });

          },600);//这里设置定时
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gotouchend(obj, e){
            let _self = this;
            clearTimeout(_self.timeOutEvent);
            if(_self.timeOutEvent!=0){
                //这里写要执行的内容（尤如onclick事件）
            }
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gotouchmove(obj, e){
            let _self = this;
            clearTimeout(_self.timeOutEvent);//清除定时器
            _self.timeOutEvent = 0;
        },


        //返回上一页
        back:function(){
            this.$router.back(-1);
        },

        //点击去列表页面
        goToList:function(id){
          var _self = this;
          if(tool.isNullOrEmptyObject(id)){
              return;
          }
          var url = '/forumlist';
          var parameter = {
                  id:id
              };
          _self.$router.push({
            path:url,
            query:parameter
          })
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

.content{
  padding:0.88rem 15px 15px;
}
.content-title{padding:10px 0;}
.content-title i{margin-right: 5px;color:#8b8d8c;}

.content .item{
  padding:8px 12px;
  border:1px solid #e3e3e3;
  margin: 5px 10px 5px 0;
  border-radius: 5px;
}
.content .item.active{
  color:rgb(255, 90, 33);
}

</style>
