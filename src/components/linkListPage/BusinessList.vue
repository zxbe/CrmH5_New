<template>
<!-- BusinessList:从详情页面进入的交易列表，商业机会列表   -->

<div>
    <header class="mui-bar mui-bar-nav">
          <!-- <a v-if="isMain" @click="showRightPanel" class="calcfont calc-yonghu1 right"></a>
          <a v-if="isMain" @click="goNotification" class="calcfont calc-mailbox right">
              <span v-show="Number(messageCount)>=1" class="count">{{messageCount}}</span>
          </a> -->
          <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
          <h1 class="mui-title f18">{{title}}</h1>
    </header>

    <div class="page-content">
        <vue-scroll
          v-show="!noData"
          :showToTop="false"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="false" ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup">

            <!-- <div
            v-for="item in listData"
            :key="item.AutoID"
            class="group-item f14">
                    <div class="item-block" @click="goToInfo(item,$event)" :data-id="item.AutoID">
                        <div class="item-div item-first-div blue-color">{{item.TheName}}</div>
                        <div class="item-div line-clamp2">{{item.Memo}}</div>
                        <div class="item-div f12 green-color">
                          <span :class="item.className">{{item.CurrentState}}</span>
                          <span class="right updateTime">{{item.Initiator}}</span>
                        </div>
                        <div v-if="item.IsMeetingExist.toLowerCase()!='false'" class="item-div-box">
                            <div class="item-new-text">{{item.meetingSysmbol}}</div>
                            <div class="new-right">
                              <div class="item-div">
                                <span class="itme-div-span">{{item.MeetingTitle}}</span>
                              </div>
                              <div class="item-div dete-div f12">
                                <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                              </div>
                            </div>
                        </div>
                    </div>
            </div> -->

            <div v-for="item in listData"
                :key="item.AutoID"
                class=" group-item f14">
                      <!-- <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div> -->
                      <div class="item-block" @click="goToInfo(item,$event)" :data-id="item.AutoID">
                          <div class="item-div item-first-div blue-color">
                            {{item.TheName}}
                          </div>
                          <div class="item-div f12">
                            <i class="calcfont calc-zhuangtai icon"></i>
                            <span class="green-color" :class="item.className">{{item.CurrentState}}</span>
                          </div>
                          <div class="item-div" v-show="(item.Memo =='' || item.Memo == null) ? false : true">
                            <i class="calcfont calc-beiwanglu icon"></i>
                            <div class="line-clamp2">{{item.Memo}}</div>
                          </div>
                          <div v-if="item.IsMeetingExist.toLowerCase()!='false'" class="item-div-box">
                                <div class="item-new-text">{{item.meetingSysmbol}}</div>
                                <div class="new-right">
                                    <div class="item-div">
                                      <i class="calcfont calc-huiyi  icon"></i><span class="itme-div-span">{{item.MeetingTitle}}</span>
                                    </div>
                                    <div class="item-div dete-div f12">
                                      <i class="calcfont calc-gengxinshijian  icon"></i>
                                      <span>{{item.BeginTime|abdDateFormat('dd/MM/yyyy HH:mm')}}</span>
                                    </div>
                                </div>
                          </div>
                      </div>
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
      title:'交易',
      listData:[],
      noData: false, //没数据
      pageSize:10,//一页显示多少记录
      pageNum:1,//当前页码

      fromType:'',  //标志是用那个模块过来的；联系人:6;公司:7;会议:8;商机&交易:9;
      fromId:'',
      businessType:""
    }
  },
  created:function(){
    var _self = this;
    _self.fromType = _self.$route.query.fromType || '';
    _self.fromId = _self.$route.query.fromId || '';
    _self.businessType = _self.$route.query.businessType || '';

    console.log('fromType:'+ _self.fromType);
    console.log('fromId:'+ _self.fromId);
    console.log('businessType:'+ _self.businessType);
  },
  mounted:function(){
      lanTool.updateLanVersion();
      this.queryList();
  },
  methods:{
      back:function(){
          this.$router.back(-1);
      },
      //点击跳到详情页面
      goToInfo:function(item,e){
        var _self = this;
        if(tool.isNullOrEmptyObject(item.AutoID)){
            return;
        }
        var url = "/opportunitiesinfo/" + item.AutoID;
        var infoName = item.TheName || '';
        var showPage = (item.BusinessTypes == undefined || item.BusinessTypes.toString() == "29") ? "0":"1";
        _self.$router.push({
          path: url,
          query: {
                  infoName: infoName,
                  showPage: showPage
              }
        });
      },
      //查询列表数据
      queryList: function (queryType, callback) {
          let _self = this;
          if(queryType == 'pushLoad'){
              //上拉请求
              _self.pageNum += 1;
          }else{
              //非上拉请求
              _self.pageNum = 1;
          }
          //api接口地址
          var urlTemp = tool.AjaxBaseUrl();
          var controlName = tool.Api_OpportunityHandle_QueryRelatedDealAndPitch;
          var jsonDatasTemp = {
              CurrentLanguageVersion: lanTool.currentLanguageVersion,
              UserName: tool.UserName(),
              _ControlName: controlName,
              _RegisterCode: tool.RegisterCode(),
              IsUsePager: true,
              PageSize:_self.pageSize,
              PageNum:_self.pageNum,
              QueryCondiction: _self.queryCondictionData || [],
              FromType:_self.fromType,
              FromID:_self.fromId,
              BusinessType:_self.businessType
          };

          //console.log(JSON.stringify(jsonDatasTemp));

          if(tool.isNullOrEmptyObject(queryType)){
              var loadingIndexClassName = tool.showLoading();
          }

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
                      _self.noData = true;
                      return;
                  }
                  data = data._OnlyOneData.Rows || [];

                  //没有数据
                  if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                      _self.noData = true;
                      return ;
                  }

                  //增加meetingSysmbol字段
                  $.each(data, function (index, item) {
                      var meetingSysmbol = lanTool.lanContent("1000001_最新的会议") || "new";
                      _self.$set(item, 'meetingSysmbol', meetingSysmbol);
                  })

                  _self.noData = false;
                  if(queryType == 'pushLoad'){
                      _self.listData = _self.listData.concat(data);
                  }else{
                      _self.listData = data;
                  }

                  if(queryType == undefined || queryType == ''){
                      _self.$refs.scroll.isPullingDown = true;
                      _self.$refs.scroll.isPullingUpEnd = false;
                      _self.$refs.scroll.scrollTo(0, 0, 200, 'easing');
                  }
                  _self.$refs.scroll.refresh();

                  if(!tool.isNullOrEmptyObject(callback)){
                    callback(data,_self.pageSize);
                  }
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

      //下拉
      pulldown:function(){
          let _self = this;
          _self.queryList('pushRefresh',function(){
              // _self.$refs.scroll.refresh();
          });
      },
      //上拉
      pullup:function(){
          let _self = this;
            _self.queryList('pushLoad',function(data,pageSize){

              if(data.length < pageSize){
                _self.$refs.scroll.pullupEnd();
              }
          });
      }
  }

}
</script>


<style scoped>
/*头部style --start--*/
header.mui-bar {
  position: relative;
  background: #f8f2dc;
  overflow: hidden;
}
.mui-bar .calcfont{
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}
.mui-bar .mui-title {
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
/*头部style --end--*/

.page-content{
  position: fixed;
  top:0.88rem;
  bottom:0;
  left:0;right:0;
}

/*列表style ---start--*/
.group-item{
  background: #fff;
  position: relative;
}
.group-item::after{content:'';display:block;height: 1px;background:beige;width:100%;left:0;top:0px;position:absolute;}
.group-item .item-block {
    padding: 5px 10px;
}
/* .group-item .item-first-div {
    font-weight: 700;
    padding: 5px 0 0px;
    color: #3cadf9;
} */

.group-item:first-child::after{background:#ffffff;}
.group-item .item-div{
  line-height:0.4rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-top: 5px;
}
.group-item .line-clamp2{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap:break-word;
}
.group-item .item-div .closed{color:#ff5a21;}
.group-item .item-div .updateTime{color:#666;}
.group-item .item-div-box{position: relative;}
.group-item .item-new-text{
    /* position: absolute;
    left: 0;
    top: 2px;
    color: #ff5a21;
    border: 1px solid #ff5a21;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 54px;
    font-size: 10px!important;
    vertical-align: middle;
    text-align: center;
    padding: 2px; */

    color: #ff5a21;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    padding-top: 5px;
}
.group-item .new-right{min-height:0.8rem;}
.group-item .itme-div-span{display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;}
.group-item .item-first-div{
  font-weight:bold;width: 100%;
  padding:5px 0 0px;display:block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.group-item .dete-div{color:#666666;}
.group-item .blue-color{color:#3cadf9;}
.group-item .green-color{color:#009979;}
.group-item .padding-bottom-3{padding-bottom: 3px;}
.group-item .padding-top-3{padding-top: 3px;}

.group-item .icon{margin-right: 3px;}

/*列表style ---end--*/

</style>




