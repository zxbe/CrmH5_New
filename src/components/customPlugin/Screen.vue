<template>
<div>
    <div id="mask" class="mask" @click="panelToggle" v-show="showPanel"></div>
    <div id="right-content" class="right-content">
       <div class="screen-con">
              <!-- DataFilterModel -->
              <div class="block-div" v-if="!DataFilterModelIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{DataFilterModel.text}}</div>
                      </div>
                      <div class="block-con" v-if="DataFilterModel.option.length > 0 ">
                            <div class="item-div fl"
                                v-for="(item,index) in DataFilterModel.option"
                                :key="index"
                                @click="choose($event)"
                                ><span>{{item.text}}</span><i class="calcfont calc-guanbi1 delect-icon"></i></div>
                      </div>
                  </div>
              </div>
              <!-- GroupByModel -->
              <div class="block-div" v-if="!GroupByModelIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{GroupByModel.text}}</div>
                      </div>
                      <div class="block-con" v-if="GroupByModel.option.length > 0 ">
                            <div class="item-div fl"
                                v-for="(item,index) in GroupByModel.option"
                                :key="index"
                                @click="choose($event)"
                                ><span>{{item.text}}</span><i class="calcfont calc-guanbi1 delect-icon"></i></div>
                      </div>
                  </div>
              </div>
              <!-- BusinessSector -->
              <div class="block-div" v-if="!BusinessSectorIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{BusinessSector.text}}</div>
                      </div>
                      <div class="block-con" v-if="BusinessSector.option.length > 0">
                          <div class="item-div fl"
                              v-for="(o,i) in BusinessSector.option"
                              :key="i"
                              :class="{'hidden': i >= 6 ? true : false}"
                              @click="choose($event)"
                              ><span>{{o.text}}</span><i class="calcfont calc-guanbi1 delect-icon"></i></div>
                          <div class="block-more f14"><i @click="showMore($event)" class="calcfont calc-shousuojiantou f16 more-icon"></i></div>
                    </div>
                  </div>
              </div>
              <!-- selectList -->
              <div class="block-div" v-if="!selectListIsNull">
                  <div class="type-div" v-for="(item, index) in selectList">
                      <div class="ListCellContent">
                          <div class="ListCellContentLeft leftContent">
                              <div class="ListCellContentLeftText">{{item.text}}</div>
                          </div>
                          <div class="ListCellContentRight rightContent">
                              <div :data-field="item.queryfield"
                                  data-fieldControlType="selectList"
                                  :data-lanid="item.datalanid"
                                  data-fieldVal=""
                                  :Code="item.Code"
                                  :data-selectType="item.selectType"
                                  class="ListCellContentRightText" ></div>
                          </div>
                          <div class="ListCellRightIcon"><span class="mui-icon calcfont calc-you"></span></div>
                      </div>
                  </div>
              </div>

              <div style="height:2rem;"></div>
       </div>

       <div class="btn-div f16">
            <div class="btn reset-btn" @click="reSet">重置</div>
            <div class="btn ok-btn" @click="submitEvent">确定</div>
       </div>
    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
export default {
  components: {
        'vue-scroll': Scroll,
  },
  data(){
    return{
        showPanel:false,
        DataFilterModel:{},
        GroupByModel:{},
        BusinessSector:{},
        selectList:[]
    }
  },
  props:{
      screenData:{
          type: Object,
          default:function(){
            return {

            }
          }
      }
  },
  computed:{
      DataFilterModelIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.DataFilterModel) ? true : false;
      },
      GroupByModelIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.GroupByModel) ? true : false;
      },
      BusinessSectorIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.BusinessSector) ? true : false;
      },
      selectListIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.selectList) ? true : false;
      }
  },
  created(){
    let _self = this;
    //处理数据排序
    if(!tool.isNullOrEmptyObject( _self.screenData["DataFilterModel"]) ){
        let dataFilterOption = _self.screenData.DataFilterModel.option;
        dataFilterOption.sort(function(a,b){
            return a.sort - b.sort;
        })
        _self.$set(_self.screenData.DataFilterModel, 'option', dataFilterOption);
        _self.DataFilterModel = _self.screenData["DataFilterModel"];
    }
    if(!tool.isNullOrEmptyObject( _self.screenData["GroupByModel"]) ){
        let groupByOption = _self.screenData.GroupByModel.option;
        groupByOption.sort(function(a,b){
            return a.sort - b.sort;
        })
        _self.$set(_self.screenData.GroupByModel, 'option', groupByOption);
        _self.GroupByModel = _self.screenData["GroupByModel"];
    }

    if(!tool.isNullOrEmptyObject( _self.screenData["BusinessSector"])){
        _self.BusinessSector = _self.screenData["BusinessSector"];
        _self.getBusinessSectorOptions();
    }

    if(!tool.isNullOrEmptyObject( _self.screenData["selectList"])){
        _self.selectList = _self.screenData["selectList"];
    }
  },
  mounted(){
      let _self = this;
      lanTool.updateLanVersion();
      document.activeElement.blur();
      //监听是否展开侧滑
      eventBus.$on('showScreenEvent',_self.panelToggle);


      //渲染控件
      _self.InitSelectListControl();

      // console.log(_self.screenData);
      //处理联动字段
      tool.linkageField(_self, 'CountryID', 'CityID');
  },
  activated: function () {

        var _self = this;
        //处理联动字段
        tool.linkageField(_self, 'CountryID', 'CityID');

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function () {
            //清空全局变量
            eventBus.selectListData = null;
        })

  },
  methods:{
      //侧滑
      //isClose值如果为false，表示刚进页面收起侧滑；
      //如果没传isClose值showPanel就取反，表示正常的展开收起
      panelToggle:function(isClose){

        var _self = this;
          if(isClose == false){
              _self.showPanel = isClose;
          }else{
              _self.showPanel = !_self.showPanel;
          }
          if(_self.showPanel){
              _self.$nextTick(function(){
                  $('#right-content').css({
                      'left':'1.5rem',
                      'transition':'left 0.2s ease-out',
                      '-moz-transition': 'left 0.2s ease-out',
                      '-webkit-transition':'left 0.2s ease-out',
                      '-o-transition': 'left 0.2s ease-out'
                  })
                  $('#mask,#right-content').off('touchmove').on("touchmove", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                  });
              })

          }else{
              _self.$nextTick(function(){
                  $('#right-content').css({
                      'left':'100%',
                      'transition':'left 0.3s ease-out',
                      '-moz-transition': 'left 0.3s ease-out',
                      '-webkit-transition':'left 0.3s ease-out',
                      '-o-transition': 'left 0.3s ease-out'
                  });
              })
          }

      },

      //渲染控件
      InitSelectListControl(myCallBack){
          let _self = this;

          //2>渲染selectList
          //2-1>同一行的selectList
          $("[data-fieldControlType='selectList']").attr("readonly","readonly").off('click').on('click',function(){
            var _curObj = $(this);
            if(typeof(_curObj.attr("data-clickObj")) != "undefined"){
              return;
            }
            // console.log(_curObj);
            var dataField = _curObj.attr("data-field") ||"";
            var code = _curObj.attr("Code") ||"";
            var filter = _curObj.attr("Filter") ||"";
            var typeValue = _curObj.attr("TypeValue") ||"";
            var value = _curObj.attr("data-fieldVal") ||"";
            var selectType = _curObj.attr("data-selectType") ||"";
            var title = lanTool.lanContent(_curObj.attr("data-lanid") ||"");
            var addUrl = _curObj.attr("data-addUrl") ||"";
            var linkIDField = _curObj.attr("data-linkIDField") ||"";//为了在弹出页面的新增上，带出id和name，如新增联系人，需要带上当前公司信息
            var linkNameField = _curObj.attr("data-linkNameField") ||"";
            var fromType = _curObj.attr("data-fromType") ||"";

            var parameter = {
              'field':dataField,
              'code':code,
              "typeValue":typeValue,
              'title':title,
              'value':value,//已经选择的值
              'selectType':selectType,
              "filter":filter,
              "addUrl":addUrl,
              "linkIDField":linkIDField,
              "linkNameField":linkNameField,
              "fromType":fromType
            };
            _self.$router.push({
              path: '/selectlist',
              query: parameter
            });
          });

          //2-2>不同一行的selectList
          // $("[data-fieldControlType='selectList'][data-clickObj]").each(function(index, obj){

          //     $("#"+$(obj).attr("data-clickObj")).off('click').on('click',function(){

          //         //查找子类
          //         var _curObjTextdataFieldName = ($(this).attr('id') || "").ReplaceAll("ClickObj","");
          //         var _curObj = $("[data-field='"+ _curObjTextdataFieldName +"']:first");
          //         if(tool.isNullOrEmptyObject(_curObj)){
          //           return;
          //         }
          //         // console.log(_curObj);
          //         var dataField = _curObj.attr("data-field") ||"";
          //         var code = _curObj.attr("Code") ||"";
          //         var filter = _curObj.attr("Filter") ||"";
          //         var typeValue = _curObj.attr("TypeValue") ||"";
          //         var value = _curObj.attr("data-fieldVal") ||"";
          //         var selectType = _curObj.attr("data-selectType") ||"";
          //         var title = lanTool.lanContent(_curObj.attr("data-lanid") ||"");
          //         var addUrl = _curObj.attr("data-addUrl") ||"";
          //         var linkIDField = _curObj.attr("data-linkIDField") ||"";//为了在弹出页面的新增上，带出id和name，如新增联系人，需要带上当前公司信息
          //         var linkNameField = _curObj.attr("data-linkNameField") ||"";
          //         var fromType = _curObj.attr("data-fromType") ||"";

          //         var parameter = {
          //           'field':dataField,
          //           'code':code,
          //           "typeValue":typeValue,
          //           'title':title,
          //           'value':value,//已经选择的值
          //           'selectType':selectType,
          //           "filter":filter,
          //           "addUrl":addUrl,
          //           "linkIDField":linkIDField,
          //           "linkNameField":linkNameField,
          //           "fromType":fromType
          //         };
          //         self.$router.push({
          //           path: '/selectlist',
          //           query: parameter
          //         });
          //   })
          // })

          //执行回调函数
          if (!tool.isNullOrEmptyObject(myCallBack)) {
            myCallBack();
          }
      },

      //请求BusinessSectorOptions
      getBusinessSectorOptions(){
          let _self = this;

          var urlTemp = tool.AjaxBaseUrl();
          //传入参数
          var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: tool.CommonDataServiceHandle_Query,
            _RegisterCode: tool.RegisterCode(),
            Code: _self.BusinessSector.Code || '',
            TypeValue: _self.BusinessSector.TypeValue || '',
            Filter:_self.BusinessSector.Filter || ''
          };
          var loadingIndexClassName = tool.showLoading();
          $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
              tool.hideLoading(loadingIndexClassName);
              data = tool.jObject(data)._OnlyOneData;
              // console.log(data);
              _self.$set(_self.BusinessSector, 'option', data);
              // console.log(_self.BusinessSector);
            },
            error: function (jqXHR, type, error) {
              console.log(error);
              tool.hideLoading(loadingIndexClassName);
              return true;
            },
            complete: function () {
              //tool.hideLoading();
              //隐藏虚拟键盘
              document.activeElement.blur();
            }
          });


      },
      //点击显示更多选项
      showMore(e){
          // console.log(e);
          let _self = this;
          let currElent = $(e.target);
          let currElentP = $(e.target).closest('.block-more');
          if(currElent.hasClass('calc-shousuojiantou')){
              currElentP.siblings('.hidden').css({'display':'inline-block'});
              currElent.removeClass('calc-shousuojiantou').addClass('calc-shousuoshangjiantou');
          }else{
              currElentP.siblings('.hidden').css({'display':'none'});
              currElent.removeClass('calc-shousuoshangjiantou').addClass('calc-shousuojiantou');
          }
      },
      //选择添加
      choose(e){
          let _self = this;
          let target = $(e.target);
          if (!target.hasClass('item-div')) {
              target = target.parents("div.item-div:first");
              if (tool.isNullOrEmptyObject(target)) {
                  return;
              }
          }

          if(!target.hasClass('active')){
              // 选择
              target.addClass('active').siblings('.item-div').removeClass('active');

          }else{
              //取消选择
              target.removeClass('active');

          }
      },
      //重置筛选条件
      reSet(){
          let _self = this;
          $('.type-div .item-div').removeClass('active');
      },
      //确定筛选条件
      submitEvent(){
          let _self = this;
          _self.panelToggle();
      }

  },
  beforeDestroy:function(){
      eventBus.$off('showScreenEvent');
  }
}
</script>

<style scoped>
.mask{position:fixed;top:0;left:0;bottom:0;right:0;background: rgba(0, 0, 0, 0.1);z-index:102;}
.right-content{
    position:fixed;left:100%; width:6rem;
    top: 0;bottom: 0; z-index: 103;padding-top:0px;
    background-color: #FFFFFF;
}

.screen-con{height: calc(100vh - 1.3rem);overflow-y: scroll;}
.block-div{}
.type-div{border-bottom: 1px solid #e6e8ea;}
.block-tile{padding:10px 15px;display: flex;align-items: center;}
.title-text{white-space:nowrap;margin-right:10px;}

.block-con{padding-left:15px;}
.item-div{
  padding:10px 5px;background: #f6f6f6;border-radius: 5px;
  margin:0 5% 0.25rem 0;width:45%;box-sizing: border-box;
  display: inline-block;
  word-wrap: break-word;
  word-break: normal;position: relative;
  text-align: center;}
.item-div.hidden{display: none;}
.item-div.active{background:#f8f2dc;color:#FF9900;}
.delect-icon{position: absolute;bottom:0px;right:1px;display: none;}
.item-div.active .delect-icon{display: inline-block;}

/*显示更多style*/
.block-more{display: flex;align-items: center;justify-content: center;padding-right: 15px;}
.more-icon{color:#ccc;padding:5px;}


.ListCellContent{
  display: flex;
  font-size: .28rem;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  padding:10px;
}
.ListCellContentLeft{
  line-height: .4rem;
  margin-right: 10px;
}
.ListCellContentRight{
  flex:1;
  text-align: right;
}
.ListCellContentRightText{
  min-height: .4rem;line-height: .4rem;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;
}
.ListCellRightIcon .calcfont{color: #cdcdcd;font-size: .32rem;}


.btn-div{display:flex;align-items:center;height:1.3rem;position:absolute;left:0;right:0;bottom:0;background: #ffffff;}
.btn-div .btn{flex:1;text-align: center;margin:0 15px;padding:8px 0;color:#ffffff;
border-radius: 20px; }
.reset-btn{background: #ffcc00;}
.ok-btn{background: #ff9900;}
</style>
