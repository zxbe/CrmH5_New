<template>

<div>
    <div v-show="!notData" class="my-scroller">
        <vue-scroll
          ref="vs"
          :ops="ops"
          @refresh-start="refreshStart"
          @refresh-before-deactivate="refreshBeforeDeactive"

          @load-before-deactivate="loadBeforeDeactive"
          @load-start="loadStart"
        >
            <slot></slot>
            <div v-if="notMoreData" class="not-more-data">{{noMoreData}}</div>
        </vue-scroll>

        <div v-if="showToTop" class="topping">
            <span class="calcfont calc-icon_zhiding" @click="goTopping"></span>
        </div>

    </div>
    <nothing v-show="notData" style="padding-top:0.8rem;"></nothing>
</div>

</template>

<script>
import vuescroll from 'vuescroll/dist/vuescroll-slide';
import 'vuescroll/dist/vuescroll.css';
import Nothing from "../common/Nothing";

export default {
  components: {
      'nothing': Nothing,
      'vue-scroll':vuescroll
  },
  props:['config','notData'],
  data() {
        const ops = {
          vuescroll: {
            mode: 'slide',
            pullRefresh: {
              enable:true,
              tips:{
                deactive: lanTool.lanContent('1000167_下拉刷新'),
                active: lanTool.lanContent('1000169_释放刷新'),
                start: lanTool.lanContent('	1000170_正在刷新......'),
                beforeDeactive: lanTool.lanContent('1000171_刷新成功')
              }
            },
            pushLoad: {
              enable: true,
              auto: false,
              tips:{
                deactive: lanTool.lanContent('1000168_上拉加载'),
                active: lanTool.lanContent('1000172_释放加载'),
                start: lanTool.lanContent('1000173_正在加载......'),
                beforeDeactive: lanTool.lanContent('1000174_加载成功')
              }
            }
          },
          bar: {
              opacity:0
          }
        };
        return {
            ops,
            notMoreData:false,
            showToTop:false,  //是否显示回到顶部,默认不显示
            noMoreData:lanTool.lanContent('1000175_没有更多数据了！')
        }
  },
  created:function(){

      let _self = this,
          pullRefreshEnable = false,
          pushLoadEnable = false;

      if(tool.isNullOrEmptyObject(_self.config)){
          return true;
      }

      if(_self.config.pullRefreshEnable || _self.config.pullRefreshEnable == undefined){
          pullRefreshEnable = true;
      }
      if(_self.config.pushLoadEnable || _self.config.pushLoadEnable == undefined){
          pushLoadEnable = true;
      }

      _self.ops.vuescroll.pullRefresh.enable = pullRefreshEnable;
      _self.ops.vuescroll.pushLoad.enable = pushLoadEnable;

      if(_self.config.showToTop){
          _self.showToTop = true;
      }

  },
  mounted:function(){
  },
  methods:{
      refreshStart:function(vsInstance, refreshDom, done){
          let _self = this;
          //调用父组件方法请求数据
          if(tool.isNullOrEmptyObject(_self.$parent.queryList)){
              return;
          }
          _self.$parent.queryList('pullRefresh',function(data){

              _self.notMoreData = false;
              if(_self.config.pushLoadEnable || _self.config.pushLoadEnable == undefined){
                  _self.ops.vuescroll.pushLoad.enable = true;
              }
              done();
          })
      },
      refreshBeforeDeactive:function(vsInstance, refreshDom, done){
        // console.log('refreshBeforeDeactive');
          let _self = this;
          setTimeout(() => {
            done();
            _self.goTopping();
          }, 200);
      },
      loadStart:function(vsInstance, refreshDom, done){
          let _self = this;
          //调用父组件方法请求数据
          if(tool.isNullOrEmptyObject(_self.$parent.queryList)){
              return;
          }
          _self.$parent.queryList('pushLoad',function(data, pageSize){

              //最后一页
              // console.log(data);
              if(data.length < pageSize){
                  _self.notMoreData = true;
                  _self.ops.vuescroll.pushLoad.enable = false;
              }
              done();
              
          })
      },
      loadBeforeDeactive:function(vsInstance, refreshDom, done){
          let _self = this;
          setTimeout(() => {
            done();
          }, 200);
      },

      goTopping:function(){
          let _self = this;
          _self.$refs['vs'].scrollTo(
            {
              y:'0%'
            },
            500,
            'easeInQuad'
          );
      }
  }


}
</script>

<style scoped>
.my-scroller{
  position: absolute;
  top:0;left:0;right: 0;bottom: 0;
}
.not-more-data{
  text-align: center;line-height: .9rem;
}

/* 置顶 */
.topping{
    position: fixed;
    bottom: 1rem;
    right: 0.6rem;
    width: 0.88rem;
    height: 0.88rem;
    z-index: 20;
    border-radius: 0.16rem;
}
.topping span{
    padding: 0.04rem;
    margin: 0;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.3);
}
</style>
<style>
.__vuescroll .__refresh svg.start .active-path, .__vuescroll .__load svg.start .active-path{
stroke: rgb(235, 143, 32);;
}
.__vuescroll .__refresh svg path, .__vuescroll .__refresh svg rect, .__vuescroll .__load svg path, .__vuescroll .__load svg rect{
fill: rgb(235, 143, 32);;
}
</style>

