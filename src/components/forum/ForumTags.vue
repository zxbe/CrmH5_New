<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
    </header>

    <div class="tips">
      <span class="lanText f14" data-lanid="1000296_请选择下面的标签浏览相关问题"></span>
    </div>

    <div class="list-header f16">
        <div class="lanText w40" data-lanid="153_名称"></div>
        <div class="lanText w30" data-lanid="1000251_发帖数"></div>
        <div class="lanText w30" data-lanid="786_关注"></div>
    </div>
    <div class="list-div">
        <vue-scroll
        v-show="!noData"
        :showToTop="false"
        :options="{ pullup:false, pulldown: false }"
        :scrollbar="false" ref="scroll">

            <div v-for="item in listData" :key="item.AutoID" class="list-item">
                <div class="w40 f14"><a @click="goToList(item.AutoID)">{{item.Name}}</a></div>
                <div class="w30 f14">{{item.PostCount}}</div>
                <!-- 关注：calc-shoucang 不关注：calc-noshoucang -->
                <div class="w30"><i @click="followToggle(item.AutoID,$event)" class="f18 calcfont calc-noshoucang"></i></div>
            </div>

        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
    components:{
        'vue-scroll':Scroll,
        'nothing': Nothing
    },
    data(){
      return{
        title:'All Tag',
        noData:false, //没数据
        listData:[
          {
            "AutoID": 7,
            "Name": "Web",
            "InternalSort": null,
            "PostCount": 18,
            "IsFollow": "fa-star-o"
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
        //返回上一页
        back:function(){
            this.$router.back(-1);
        },
        //关注/取消关注
        followToggle:function(id ,e){
            var _self = this;
            var curObj = $(e.target) || '';

            if(tool.isNullOrEmptyObject(id) && curObj){
                return;
            }
            //关注：calc-shoucang 不关注：calc-noshoucang
            if(curObj.hasClass('calc-noshoucang')){
                curObj.removeClass('calc-noshoucang').addClass('calc-shoucang');
            }else{
                curObj.removeClass('calc-shoucang').addClass('calc-noshoucang');
            }
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

.tips{
  position: fixed;top:0.88rem;left:0;right:0;
  padding:0 15px;
  color:#555555;
  line-height: 0.5rem;
}

/*列表*/
.list-header{
  position:fixed;
  top:1.38rem;left:15px;right:15px;
  height: 0.8rem;
  display: flex;
  flex-direction:row;
  align-items:center;
}
.list-header div.w40,.list-item div.w40{width:40%;}
.list-header div.w30,.list-item div.w30{width:30%;text-align: center;}
.list-div{
  position:fixed;top:2.18rem;left:0;right:0;bottom:0;
}
.list-item{
  padding:0 15px;
  display: flex;
  flex-direction:row;
  align-items:center;
  height: 1rem;
}
/*不关注*/
.list-item .calc-noshoucang{
  color:#ccc;
}
/*关注*/
.list-item .calc-shoucang{
  color:#ff5a21;
}

</style>
