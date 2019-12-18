<template>
<div>
    <div id="mask" class="mask" @click="panelToggle" v-show="showPanel" @touchmove.stop.prevent></div>
    <div id="right-content" class="right-content" @touchmove.stop>
       <div class="screen-con">
          <div class="screen-con-box">
          <!-- <vue-scroll :showToTop="false" :options="{ pullup: false, pulldown: false }" :scrollbar="false" > -->
              <!-- ViewModel -->
              <div class="block-div viewMode" v-if="!ViewModelIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{ViewModel.text}}</div>
                      </div>
                      <div class="block-con" v-if="ViewModel.option.length > 0 ">
                            <div class="item-div fl"
                                v-for="(item,index) in ViewModel.option"
                                :key="index"
                                @click="choose($event,false)"
                                :class="{'active': ((item.isActive == null||item.isActive == undefined) ? false :item.isActive)}"
                                :data-id="item.id"
                                ><span>{{item.text}}</span>
                                <i class="calcfont calc-guanbi1 delect-icon"></i>
                                </div>
                      </div>
                  </div>
              </div>
              <!-- DataFilterModel -->
              <div class="block-div dataFilter" v-if="!DataFilterModelIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{DataFilterModel.text}}</div>
                      </div>
                      <div class="block-con" v-if="DataFilterModel.option.length > 0 ">
                            <div class="item-div fl"
                                v-for="(item,index) in DataFilterModel.option"
                                :key="index"
                                @click="choose($event,false)"
                                :class="{'active': ((item.isActive == null||item.isActive == undefined) ? false :item.isActive)}"
                                :data-id="item.id"
                                ><span>{{item.text}}</span>
                                <i class="calcfont calc-guanbi1 delect-icon"></i>
                                </div>
                      </div>
                  </div>
              </div>
              <!-- GroupByModel -->
              <div v-show="isShowGroupByModel" class="block-div groupByMode" v-if="!GroupByModelIsNull">
                  <div class="type-div">
                      <div class="block-tile f14">
                          <div class="title-text">{{GroupByModel.text}}</div>
                      </div>
                      <div class="block-con" v-if="GroupByModel.option.length > 0 ">
                            <div class="item-div fl"
                                v-for="(item,index) in GroupByModel.option"
                                :key="index"
                                @click="choose($event,false)"
                                :class="{'active': ((item.isActive == null||item.isActive == undefined) ? false :item.isActive)}"
                                :data-id="item.id"
                                ><span>{{item.text}}</span>
                                <i class="calcfont calc-guanbi1 delect-icon"></i></div>
                      </div>
                  </div>
              </div>

              <!-- FieldModel -->
              <div class="fieldModel" v-if="FieldModel.length > 0">
                  <div class="block-div" v-for="(item, index) in FieldModel" :key="index">

                      <!-- 类型为picketTile -->
                      <div class="type-div" v-if="item.fieldControlType == 'picketTile'"
                        :data-field="item.queryfield"
                        :data-fieldControlType=item.fieldControlType
                        :data-queryType="item.queryType"
                        :data-queryFormat="item.queryFormat"
                        :data-queryRelation="item.queryRelation"
                        :data-queryComparison="item.queryComparison"
                        data-fieldVal="">
                          <div class="block-tile f14">
                              <div class="title-text">{{item.text}}</div>
                          </div>
                          <div class="block-con" v-if="item.option.length > 0 && item.more" >
                              <div class="item-div fl"
                                  v-for="(o,i) in item.option"
                                  :key="i"
                                  :class="{'hidden': i > 6 ? true : false}"
                                  @click="choose($event)"
                                  :data-id="o.id"
                                  ><span>{{o.text}}</span><i class="calcfont calc-guanbi1 delect-icon"></i></div>
                              <div class="block-more f14"><i @click="showMore($event)" class="calcfont calc-shousuojiantou f16 more-icon"></i></div>
                          </div>
                          <div class="block-con" v-if="item.option.length > 0 && !item.more" >
                              <div class="item-div fl"
                                  v-for="(o,i) in item.option"
                                  :key="i"
                                  @click="choose($event)"
                                  :data-id="o.id"
                                  ><span>{{o.text}}</span><i class="calcfont calc-guanbi1 delect-icon"></i></div>
                          </div>
                      </div>

                      <!-- 类型为dateRange -->
                      <div class="type-div" v-if="item.fieldControlType == 'dateRange'"
                        :data-field="item.queryfield"
                        :data-fieldControlType=item.fieldControlType
                        :data-queryType="item.queryType"
                        :data-queryFormat="item.queryFormat"
                        :data-queryRelation="item.queryRelation"
                        :data-queryComparison="item.queryComparison"
                        data-fieldVal="">
                          <div class="block-tile f14">
                              <div class="title-text">{{item.text}}</div>
                          </div>
                          <div class="block-con" v-if="item.option != null && item.option != undefined && item.option.length > 0 ">
                              <div class="item-div fl"
                                  v-for="(i,index) in item.option"
                                  :key="index"
                                  @click="choose($event)"
                                  :class="{'active': ((i.isActive == null||i.isActive == undefined) ? false :i.isActive)}"
                                  :data-id="i.id"
                                  ><span>{{i.text}}</span>
                                  <i class="calcfont calc-guanbi1 delect-icon"></i></div>
                              <div class="time-range-customize-div">
                                  <div class="box">
                                    <div class="inputRow">
                                        <input class="startdate selectdate" type="text" readonly="readonly" :placeholder=lanStartdate data-field="BeginTime" data-fieldControlType="dateRange_subitem" data-TimeType="date" data-format="yyyy-MM-dd"/>
                                    </div>
                                    <div class="line"></div>
                                    <div  class="inputRow">
                                        <input class="enddate selectdate" type="text" readonly="readonly" :placeholder=lanEnddate data-field="EndTime" data-fieldControlType="dateRange_subitem" data-TimeType="date" data-format="yyyy-MM-dd">
                                    </div>
                                  </div>
                                  <div class="dateRangeConfirm" @click="dateRangeConfirmEvent($event)">{{lanDateRangeConfirm}}</div>
                              </div>
                        </div>
                      </div>


                      <!--类型为Input-->
                      <div class="type-div no-border" v-if="item.fieldControlType == 'textareaInput'">
                          <div class="DetailRow">
                              <div class="DetailRowOn">
                                  <span class="calcfont ChangeIconColor" :class="item.iconClass"></span>
                                  <span class="FileName">{{item.text}}</span>
                              </div>
                              <div class="DetailRowUp">
                                    <p class="textareaP wrap">
                                        <input
                                            class="lanInputPlaceHolder inputcontrol"
                                            data-lanid="1000525_请输入"
                                            :data-field="item.queryfield"
                                            :data-fieldControlType="item.fieldControlType"
                                            :data-queryType="item.queryType"
                                            :data-queryFormat="item.queryFormat"
                                            :data-queryRelation="item.queryRelation"
                                            :data-queryComparison="item.queryComparison"/>
                                    </p >
                              </div>
                          </div>
                      </div>

                      <!-- 类型为selectList || linkSelectList-->
                      <div class="type-div no-border" v-if="item.fieldControlType == 'selectList' || item.fieldControlType == 'linkSelectList' || item.fieldControlType == 'groupSelectList'">
                          <div class="DetailRow">
                              <div class="DetailRowOn">
                                  <span class="calcfont ChangeIconColor" :class="item.iconClass"></span>
                                  <span class="FileName">{{item.text}}</span>
                              </div>
                              <div class="DetailRowUp">
                                  <input class="content lanInputPlaceHolder ListCellContentRightText"
                                         readonly="readonly"
                                         type="text"
                                         :data-field="item.queryfield"
                                         :data-fieldControlType="item.fieldControlType"
                                         :data-lanid="item.datalanid"
                                         data-fieldVal=""
                                         :Code="item.Code"
                                         :data-selectType="item.selectType"
                                         :data-queryType="item.queryType"
                                         :data-queryFormat="item.queryFormat"
                                         :data-queryRelation="item.queryRelation"
                                         :data-queryComparison="item.queryComparison"/>
                                  <div class="LeftIconBlock"><span class="LeftIcon calcfont calc-you"></span></div>
                              </div>
                          </div>
                      </div>


                  </div>
              </div>
          <!-- </vue-scroll> -->
        </div>
       </div>

       <div class="btn-div f14">
            <div class="btn reset-btn" @click="resetEvent(false)">{{lanReset}}</div>
            <div class="btn ok-btn" @click="confirmEvent">{{lanConfirm}}</div>
       </div>
    </div>

</div>
</template>

<script>
// import Scroll from '@/components/customPlugin/scroll/Scroll';
export default {
  components: {
        // 'vue-scroll': Scroll,
  },
  data(){
    return{
        showPanel:false,
        ViewModel:{},
        DataFilterModel:{},
        GroupByModel:{},
        FieldModel:[],

        isShowGroupByModel:true,//是否显示分组模块

        lanReset: lanTool.lanContent("1000527_重置"),
        lanConfirm: lanTool.lanContent("545_确定"),
        lanStartdate:lanTool.lanContent("878_开始日期"),
        lanEnddate:lanTool.lanContent("879_结束日期"),
        lanDateRangeConfirm: lanTool.lanContent("545_确定"),
        //记录滚动条位置
        scrollBarPosition:'0'
    }
  },
  props:{
      screenData:{
          type: Object,
          default:function(){
            return {}
          }
      },
      queryObj:{
          type: Object,
        //   default:function(){
        //     return {};
        //   }
        default:() => ({})
      },
  },
  computed:{
      ViewModelIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.ViewModel) ? true : false;
      },
      DataFilterModelIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.DataFilterModel) ? true : false;
      },
      GroupByModelIsNull(){
          let _self = this;
          return  tool.isNullOrEmptyObject(_self.GroupByModel) ? true : false;
      }

  },
  created(){
    let _self = this;

    //1>处理数据排序
    if(!tool.isNullOrEmptyObject(_self.screenData["ViewModel"])){
        _self.ViewModel = _self.screenData["ViewModel"];
        let dataViewOption = _self.ViewModel.option;
        dataViewOption.sort(function(a,b){
            return a.sort - b.sort;
        })
        _self.$set(_self.ViewModel, 'option', dataViewOption);
    }
    if(!tool.isNullOrEmptyObject( _self.screenData["DataFilterModel"]) ){
        _self.DataFilterModel = _self.screenData["DataFilterModel"];
        let dataFilterOption = _self.DataFilterModel.option;
        dataFilterOption.sort(function(a,b){
            return a.sort - b.sort;
        })
        _self.$set(_self.DataFilterModel, 'option', dataFilterOption);
    }
    if(!tool.isNullOrEmptyObject( _self.screenData["GroupByModel"]) ){
        _self.GroupByModel = _self.screenData["GroupByModel"];
        let groupByOption = _self.GroupByModel.option;
        groupByOption.sort(function(a,b){
            return a.sort - b.sort;
        })
        _self.$set(_self.GroupByModel, 'option', groupByOption);
    }
    _self.FieldModel = _self.screenData["FieldModel"];

    //2>获取picker选项值
    _self.FieldModel.forEach(function(item, index){
        if(item.fieldControlType == "picketTile"){
            _self.getPickerOptions(item);
        }
    });

    //初始化父组件参数
    _self.initParentParam();
  },
  mounted(){
      let _self = this;
      document.activeElement.blur();

      //单独处理控件类型为textareaInput的控件获取焦点和失去焦点的样式
      // selectList，linkSelectList在common.js初始时处理
      $("[data-fieldControlType='textareaInput']").each(function(ele,index){
          $(this).blur(function(){
              $(this).parents(".DetailRow").removeClass("DeepColor");
          });
          $(this).focus(function(){
              $(this).parents(".DetailRow").addClass("DeepColor");
          });

      })

      //监听是否展开侧滑
      eventBus.$on('showScreenEvent',_self.panelToggle);

      //渲染控件
      _self.InitControl();

      //处理联动字段 调用父方法
      if( !tool.isNullOrEmptyObject(_self.$parent.rightPanelLinkageField)){
          _self.$parent.rightPanelLinkageField(_self)
      }

      //绑定控件字段的值改变事件
      _self.bindFieldChangeEvent();


       //记录滚动条位置
       $('.screen-con').unbind('scroll').bind('scroll',function(){
             var scrollTop = $(this).scrollTop() || 0;
             _self.scrollBarPosition = scrollTop;
       })
  },
  activated: function () {
        let _self = this;

        //处理联动字段 调用父方法
        if( !tool.isNullOrEmptyObject(_self.$parent.rightPanelLinkageField)){
            _self.$parent.rightPanelLinkageField(_self)
        }

        //返回时更新selectlist控件的结果
        tool.UpdateFieldValueFromBack(eventBus, function () {
            //清空全局变量
            eventBus.selectListData = null;
        });

        //设置滚动条位置
        $('.screen-con').scrollTop(_self.scrollBarPosition);
  },
  methods:{
    //渲染控件
    InitControl(myCallBack){
        let _self = this;

        //控件初始化
        tool.InitiateInfoPageControl(_self, "", function () { });

        //执行回调函数
        if (!tool.isNullOrEmptyObject(myCallBack) && typeof(myCallBack) == "function") {
            myCallBack();
        }
    },
    //绑定控件字段的值改变事件
    //isOnlyRemoveEvent:是否仅移除监听事件
    bindFieldChangeEvent:function(isOnlyRemoveEvent){
        isOnlyRemoveEvent = (isOnlyRemoveEvent == null || isOnlyRemoveEvent == undefined)?false:isOnlyRemoveEvent;

        let _self = this;

        $("[data-fieldcontroltype]").each(function (index, obj) {
            var _curObj = $(this);
            if(tool.isNullOrEmptyObject(_curObj)){
                return true;
            }

            if(isOnlyRemoveEvent){
                if(_curObj.is("div")){
                    _curObj.off("DOMNodeInserted DOMNodeRemoved");
                }else if(_curObj.attr("data-fieldcontroltype") == "selectList" || _curObj.attr("data-fieldcontroltype") == "linkSelectList" || _curObj.attr("data-fieldcontroltype") == "groupSelectList"){
                    if(_curObj[0].hasOwnProperty("_value")){
                        delete _curObj[0]._value;
                    }
                }else if(_curObj.attr("data-fieldcontroltype") == "textareaInput"){
                    _curObj.off("keyup");
                }else if(_curObj.attr("data-fieldcontroltype") == "dateRange_subitem"){
                    //不需要移除事件，这种控件不绑事件
                }else {
                    _curObj.off("change");
                }
            }else{
                if(_curObj.is("div")){
                    _curObj.off("DOMNodeInserted DOMNodeRemoved").on("DOMNodeInserted DOMNodeRemoved",function(){
                        _self.$nextTick(function(){
                            _self.setParentQueryObj();
                            //调用父组件的查询方法
                            _self.$parent.delegateQuery();
                        });
                    });
                }else if(_curObj.attr("data-fieldcontroltype") == "selectList" || _curObj.attr("data-fieldcontroltype") == "linkSelectList" || _curObj.attr("data-fieldcontroltype") == "groupSelectList"){
                    //为了解决用js赋input控件值，input控件不会触发change事件，因此添加了_value属性，然后通过属性的set来达到监听change的效果
                    Object.defineProperty(_curObj[0],"_value",{
                        configurable:true,
                        set:function(value){
                            this.value = value;
                            _self.$nextTick(function(){
                                _self.setParentQueryObj();
                                //调用父组件的查询方法
                                _self.$parent.delegateQuery();
                        });
                        },
                        get:function(){
                            return this.value;
                        }
                    });
                }else if(_curObj.attr("data-fieldcontroltype") == "textareaInput"){
                    _curObj.off("keyup").on("keyup",function(e){
                         var code = e.charCode || e.keyCode;
                         if(code == "13"){
                            _self.$nextTick(function(){
                                _self.setParentQueryObj();
                                //调用父组件的查询方法
                                _self.$parent.delegateQuery();
                            });
                         }
                    });
                }else if(_curObj.attr("data-fieldcontroltype") == "dateRange_subitem"){
                    //不需要添加事件，这种控件不绑事件
                }else{
                    _curObj.off("change").on("change",function(){
                        _self.$nextTick(function(){
                            _self.setParentQueryObj();
                            //调用父组件的查询方法
                            _self.$parent.delegateQuery();
                        });
                    });
                }
            }
		});
    },
    //构造所有字段的查询条件
    constructConditionField:function(){
        let _self = this;
        var queryCondictionArrTemp = tool.ConstructQueryCondiction(_self,function(queryCondiction){
        }) || [];
        // console.log(queryCondictionArrTemp);
        return queryCondictionArrTemp;
    },
    //设置父页面的查询对象
    setParentQueryObj:function(){
        let _self = this;

        //1>ViewMode
        var $viewMode = $(".viewMode .item-div.active").eq(0);
        if(!tool.isNullOrEmptyObject($viewMode) && $viewMode.length>=1){
            _self.$set(_self.queryObj,"viewMode", ($viewMode.attr("data-id")||""));
        }

        //2>dataFilter
        var $dataFilter = $(".dataFilter .item-div.active").eq(0);
        if(!tool.isNullOrEmptyObject($dataFilter) && $dataFilter.length>=1){
            _self.$set(_self.queryObj,"dataFilter", ($dataFilter.attr("data-id")||""));
            // console.log(($dataFilter.attr("data-id")||""));
        }

        //3>groupByMode
        var $groupByMode = $(".groupByMode .item-div.active").eq(0);
        if(!tool.isNullOrEmptyObject($groupByMode) && $groupByMode.length>=1){
            _self.$set(_self.queryObj,"groupByMode", ($groupByMode.attr("data-id")||""));
            // console.log(($groupByMode.attr("data-id")||""));
        }

        //4>queryCondictionArr
        var queryCondictionArrTemp = _self.constructConditionField() || [];
        _self.$set(_self.queryObj,"queryCondictionArr",queryCondictionArrTemp);
    },
    //初始化父页面参数
    initParentParam:function(){
        let _self = this;
        _self.$nextTick(function(){
            _self.setParentQueryObj();
        });
    },
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
        
        //若已经收起,则展开
        if(_self.showPanel){
            //1>展开的同时，给body添加hideOverflow样式
            $("body").addClass("hideOverflow");

            //2>展开
            _self.$nextTick(function(){
                $('#right-content').css({
                    'left':'1.5rem',
                    'transition':'left 0.2s ease-out',
                    '-moz-transition': 'left 0.2s ease-out',
                    '-webkit-transition':'left 0.2s ease-out',
                    '-o-transition': 'left 0.2s ease-out'
                });
            });
        }else{
            //若已经展开，则收起
            //1>收起的同时，移除body的hideOverflow样式
            $("body").removeClass("hideOverflow");

            //2>收起
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
    //请求BusinessSectorOptions
    getPickerOptions(item){
        let _self = this;

        var urlTemp = tool.AjaxBaseUrl();
        //传入参数
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: tool.CommonDataServiceHandle_Query,
            _RegisterCode: tool.RegisterCode(),
            Code: item.Code || '',
            TypeValue: item.TypeValue || '',
            Filter:item.Filter || ''
        };
        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            //async: true,
            async: false,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data)._OnlyOneData;
                _self.$set(item, 'option', data);
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

    //选择
    //是否可以关闭当前的选中状态
    choose(e,canCloseCurrent){
        canCloseCurrent = (canCloseCurrent == null || canCloseCurrent == undefined) ?  true : canCloseCurrent;
        let _self = this;
        //去除selectList，linkSelectList控件下边高亮线
        $("[data-fieldControlType='selectList'],[data-fieldControlType='linkSelectList']").each(function(ele,index){
            $(this).parents(".DetailRow").removeClass("DeepColor");
        })

        let target = $(e.target);
        if (!target.hasClass('item-div')) {
            target = target.parents("div.item-div:first");
            if (tool.isNullOrEmptyObject(target)) {
                return;
            }
        }

        //若能移除自己的状态
        if(canCloseCurrent){
            if(!target.hasClass('active')){
                //选择
                target.addClass('active').siblings('.item-div').removeClass('active');

                var curId = target.attr("data-id")||"";
                if( curId == 'customize' ){
                    target.siblings('.time-range-customize-div').slideDown(400);
                    return;
                }else{
                    target.siblings('.time-range-customize-div').slideUp(400);
                    //收起自定义查询时间后，清除开始日期和结束日期的值
                    target.siblings('.time-range-customize-div').find(".startdate,.enddate").val("");
                }
            }else{
                //取消选择
                target.removeClass('active');

                var curId = target.attr("data-id")||"";
                //自定义事件筛选
                if( curId == 'customize' ){
                    target.siblings('.time-range-customize-div').slideUp(400);
                    //收起自定义查询时间后，清除开始日期和结束日期的值
                    target.siblings('.time-range-customize-div').find(".startdate,.enddate").val("");
                    _self.$nextTick(function(){
                        //设置父组件查询参数
                        _self.setParentQueryObj();
                        //调用父组件的查询方法
                        _self.$parent.delegateQuery();
                        return;
                    });
                }
            }
        }else{
            //若不能移除自己的状态
            //Data Filter,Group Mode和View Mode是不能关闭自己的,必须选择一项
            var $blockDiv = target.closest(".block-div");
            // console.log($blockDiv);
            if(tool.isNullOrEmptyObject($blockDiv) || $blockDiv.length<=0){
                return;
            }

            var curId = target.attr("data-id")||"";
            var oldId = "";
            if($blockDiv.hasClass("dataFilter")){
                oldId = _self.queryObj.dataFilter||"";
            }else if($blockDiv.hasClass("groupByMode")){
                oldId = _self.queryObj.groupByMode||"";
            }else if($blockDiv.hasClass("viewMode")){
                oldId = _self.queryObj.viewMode||"";
            }else{
                return;
            }

            //若选中的项目不是前一个选中的项目
            if(curId != oldId){
                if(!target.hasClass('active')){
                    //选择
                    target.addClass('active').siblings('.item-div').removeClass('active');
                }else{
                    //取消选择
                    target.removeClass('active');
                }
            }

            //若切换为日历模式，隐藏分组模块（meeting模块中）
            if( curId == 'calendarView' ){
                _self.isShowGroupByModel = false;
            }else{
                _self.isShowGroupByModel = true;
            }
        }

        _self.$nextTick(function(){
            //设置父组件查询参数
            _self.setParentQueryObj();
            //调用父组件的查询方法
            _self.$parent.delegateQuery();
      });
    },

    //设置默认的Filter或groupByMode
    setDeaultItemActive:function(className){
        if(tool.isNullOrEmptyObject(className)){
            return false;
        }

        $(className).find("item-div:first").addClass("active");
    },
    //重置筛选条件
    //isOnlyClearValue:是否只清空控件值,默认false
    resetEvent(isOnlyClearValue){
        isOnlyClearValue = (isOnlyClearValue == null || isOnlyClearValue == undefined) ? false : isOnlyClearValue;
        let _self = this;

        //1>重置dataFilter
        //清空已选项
        $(".dataFilter .item-div").removeClass("active");
        _self.$set(_self.queryObj,"dataFilter","");
        //若有配置默认选择项
        if(!tool.isNullOrEmptyObject(_self.screenData.DataFilterModel) &&
            !tool.isNullOrEmptyObject(_self.screenData.DataFilterModel.option) &&
            _self.screenData.DataFilterModel.option.length>=1){
                //获取默认激活项
                var defaultItemArr =
                _self.screenData.DataFilterModel.option.find(function(obj){
                    if(!obj.hasOwnProperty("isActive")){
                        return false;
                    }

                    return obj.isActive == true;
                });

                // console.log(defaultItemArr);

                if(!tool.isNullOrEmptyObject(defaultItemArr)){
                    var defaultId = defaultItemArr.id;
                    if(!tool.isNullOrEmptyObject(defaultId)){
                        var $destItem = $(".dataFilter .item-div[data-id='"+ defaultId +"']:first");
                        if(!tool.isNullOrEmptyObject($destItem) && $destItem.length>=1){
                            $destItem.addClass("active");
                        }else{
                            _self.setDeaultItemActive(".dataFilter");
                        }
                    }else{
                        _self.setDeaultItemActive(".dataFilter");
                    }

                }else{
                    _self.setDeaultItemActive(".dataFilter");
                }
            }else{
                _self.setDeaultItemActive(".dataFilter");
            }


        //2>重置groupByMode
        $(".groupByMode .item-div").removeClass("active");
        _self.$set(_self.queryObj,"groupByMode","");
        //若有配置默认选择项
        if(!tool.isNullOrEmptyObject(_self.screenData.GroupByModel) &&
            !tool.isNullOrEmptyObject(_self.screenData.GroupByModel.option) &&
            _self.screenData.GroupByModel.option.length>=1){
            //获取默认激活项
            var defaultItemArr =
            _self.screenData.GroupByModel.option.find(function(obj){
                if(!obj.hasOwnProperty("isActive")){
                    return false;
                }

                return obj.isActive == true;
            });

            if(!tool.isNullOrEmptyObject(defaultItemArr)){
                var defaultId = defaultItemArr.id;
                if(!tool.isNullOrEmptyObject(defaultId)){
                    var $destItem = $(".groupByMode .item-div[data-id='"+ defaultId +"']:first");
                    if(!tool.isNullOrEmptyObject($destItem) && $destItem.length>=1){
                        $destItem.addClass("active");
                    }else{
                        _self.setDeaultItemActive(".groupByMode");
                    }
                }else{
                    _self.setDeaultItemActive(".groupByMode");
                }

            }else{
                _self.setDeaultItemActive(".groupByMode");
            }
        }else{
            _self.setDeaultItemActive(".groupByMode");
        }

        //3>重置ViewMode
        $(".viewMode .item-div").removeClass("active");
        _self.$set(_self.queryObj,"viewMode","");
        //若有配置默认选择项
        if(!tool.isNullOrEmptyObject(_self.screenData.ViewModel) &&
            !tool.isNullOrEmptyObject(_self.screenData.ViewModel.option) &&
            _self.screenData.ViewModel.option.length>=1){
            //获取默认激活项
            var defaultItemArr =
            _self.screenData.ViewModel.option.find(function(obj){
                if(!obj.hasOwnProperty("isActive")){
                    return false;
                }

                return obj.isActive == true;
            });

            if(!tool.isNullOrEmptyObject(defaultItemArr)){
                var defaultId = defaultItemArr.id;
                if(!tool.isNullOrEmptyObject(defaultId)){
                    var $destItem = $(".viewMode .item-div[data-id='"+ defaultId +"']:first");
                    if(!tool.isNullOrEmptyObject($destItem) && $destItem.length>=1){
                        $destItem.addClass("active");
                    }else{
                        _self.setDeaultItemActive(".viewMode");
                    }
                }else{
                    _self.setDeaultItemActive(".viewMode");
                }

            }else{
                _self.setDeaultItemActive(".viewMode");
            }
        }else{
            _self.setDeaultItemActive(".viewMode");
        }
       
        //4>重置queryCondictionArr(清空控件值)
        //4-1>移除selectlist等控件的监听事件(避免重置字段值，重复触发查询动作)
        _self.bindFieldChangeEvent(true);
        //移除selectlist等控件的分割线的显色显示
        $(".DetailRow").removeClass("DeepColor");
        //4-2>清空查询对象
        _self.$set(_self.queryObj,"queryCondictionArr",[]);
        //4-3>清空字段控件值
        tool.ClearControlData();

        if(isOnlyClearValue){
            //设置查询对象
            _self.setParentQueryObj();
            //绑定控件字段的值改变事件
            _self.bindFieldChangeEvent();
        }else{
            //4>重新执行查询
            _self.$nextTick(function(){
                //设置查询对象
                _self.setParentQueryObj();
                //调用父组件的查询方法
                _self.$parent.delegateQuery();
                //关闭侧滑
                _self.panelToggle();
                //绑定控件字段的值改变事件
                _self.bindFieldChangeEvent();
            });
        }
    },
    //确定筛选条件
    confirmEvent(){
        let _self = this;

        _self.$nextTick(function(){
            _self.setParentQueryObj();
            //调用父组件的查询方法
            _self.$parent.delegateQuery();
            //关闭侧滑
            _self.panelToggle();
        });
    },
    //日期范围控件的自定义时间查询事件
    dateRangeConfirmEvent:function(e){
        let _self = this;
        var $confirmObj = $(e.target);
        if(tool.isNullOrEmptyObject($confirmObj)){
            return false;
        }

        //1>设置父组件的查询对象
        _self.setParentQueryObj();

        //2查找构造查询参数用的父节点
        var $parentFieldObj = $confirmObj.closest("[data-fieldcontroltype='dateRange']");
        if(tool.isNullOrEmptyObject($parentFieldObj) || $parentFieldObj.length<=0){
            return false;
        }

        //3>查询开始日期和结束日期
        var $startDateObj = $confirmObj.siblings(".box").find(".inputRow .startdate").eq(0);
        var $endDateObj = $confirmObj.siblings(".box").find(".inputRow .enddate").eq(0);
        if(
            tool.isNullOrEmptyObject($startDateObj) || $startDateObj.length<=0 ||
            tool.isNullOrEmptyObject($endDateObj) || $endDateObj.length<=0
        ){
            return false;
        }
        var startdate = $startDateObj.val();
        var enddate = $endDateObj.val();

        //4>将时间格式转成通用格式
        var oldFormat = "dd/MM/yyyy";
        var newFormat = "yyyy/MM/dd";
        startdate = tool.ChangeTimeFormat(startdate,newFormat,oldFormat);
        enddate = tool.ChangeTimeFormat(enddate,newFormat,oldFormat);

        var d1 = new Date(startdate);
        var d2 = new Date(enddate);

        //开始日期或者结束日期其中一个为空，一个不为空
        var errorMsg = "";
        if (tool.isNullOrEmptyObject(startdate) || tool.isNullOrEmptyObject(enddate)) {
            errorMsg = lanTool.lanContent("935_开始日期或者结束日期不能为空") || "";
        } else if (d1 > d2) {
            errorMsg = lanTool.lanContent("934_开始日期不能大于或等于结束日期") || "";
        }
        if(!tool.isNullOrEmptyObject(errorMsg)){
            tool.alert(errorMsg);
            return false;
        }

        //5>转成字段需要的时间格式
        var fieldFormat = $parentFieldObj.attr("data-queryformat") || oldFormat;
        fieldFormat = fieldFormat.split(" ")[0]||"dd/MM/yyyy";
        startdate = tool.ChangeTimeFormat(startdate,fieldFormat,newFormat);
        enddate = tool.ChangeTimeFormat(enddate,fieldFormat,newFormat);

        startdate = startdate + " 00:00:00";
        enddate = enddate + " 23:59:59";
        var value = startdate + "," + enddate;

        var queryCondictionObj = {
            Field: $parentFieldObj.attr("data-field") || "",
            Type: $parentFieldObj.attr("data-querytype") || "",
            Format: $parentFieldObj.attr("data-queryformat") || "",
            Relation: $parentFieldObj.attr("data-queryrelation") || "",
            Value: value,
            Comparison: $parentFieldObj.attr("data-querycomparison") || ""
        };

        //6>获取父组件的字段查询条件
        var queryCondictionArrTemp = _self.queryObj.queryCondictionArr || "";
        queryCondictionArrTemp.push(queryCondictionObj);
        //写入查询条件
        _self.$set(_self.queryObj,"queryCondictionArr",queryCondictionArrTemp);

        //7>调用父组件的查询方法
        _self.$parent.delegateQuery();
    },
  },
  beforeDestroy:function(){
      eventBus.$off('showScreenEvent');
  }
}
</script>

<style scoped>
.mask{position:fixed;top:0;left:0;bottom:0;right:0;background: rgba(0, 0, 0, 0.3);z-index:102;}
.right-content{position:fixed;left:100%; width:6rem;background: #FFFFFF;top: 0;bottom: 0; z-index: 103; padding-top:0px;}

.screen-con{height: calc(100% - 1.3rem);overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            -webkit-overflow-scrolling: auto;
            }
/* .screen-con-box{min-height: calc(100%);} */
.block-div{}
.type-div{border-bottom: 1px solid #e6e8ea;}
.no-border{border-bottom:none;}
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
.btn-div .btn{flex:1;text-align: center;margin:0 15px;padding:6px 0;color:#ffffff;
border-radius: 20px; }
.reset-btn{background: #ffcc00;}
.ok-btn{background: #ff9900;}


/*select控件样式*/
.DetailRow {
    position: relative;
    background-color: #ffffff;
    padding:10px 10px 0px 15px;
    box-sizing: border-box;
}
.DetailRow:after {
    position: absolute;
    content: "";
    left: 35px;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: beige;
}
.DeepColor:after{background-color:#ffc125;}
.DetailRowUp {
    position: relative;
    padding: 0.1rem 0 0.1rem 20px;
    display: flex;
    align-items: center;
}

.DetailRowUp input {
    flex: 1;
    font-size: 0.28rem;
    border: none;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.DetailRowUp .LeftIconBlock {
    font-size: .32rem;
    color: #cdcdcd;
}
p.textareaP.wrap{
    flex: 1;
    margin: 0;
    font-size: .28rem;
}
.inputcontrol{
    width: 100%;
    outline: none;
    background-color: transparent;
    position: relative;
    border: none;
    line-height: 0.5rem;
    display: block;
    height: .5rem;
}

/*时间范围自定义*/
.time-range-customize-div{padding-right:15px;padding-bottom:0.25rem;display:none;}
.time-range-customize-div .box{display:flex;align-items: center;}
.inputRow{display:flex;align-items: center;
    width:2.3rem;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 3px;}
.inputRow input{flex:1;width:100%;padding:0.1rem 0;text-align:center;
    outline: 0 none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    position: relative;
    border:none;
    line-height: 20px;}
.line{flex:1; height:1px;background:#ccc;margin:0 10px;}
.dateRangeConfirm{
    height: .6rem;
    line-height: .6rem;
    width: 2rem;
    background-color: #f90;
    text-align: center;
    color: #fff;
    margin: auto;
    margin-top: .2rem;
    margin-bottom: .2rem;
    border-radius: 4px;
}
.calcfont.ChangeIconColor{
    font-size: .32rem;
    color: #f90;
}
</style>