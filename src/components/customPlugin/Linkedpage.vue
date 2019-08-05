<template>
  <div>
    <header class="header sticky">
      <a @click="backHandler" class="calcfont calc-fanhui left" id="back"></a>
      <h1 class="header-title f18">{{title||''}}</h1>
      <a @click="saveHandler" class="calcfont calc-gou right" id="save"></a>
      <a @click="clearHandler" class="calc-shanchu  calcfont right" id="clear"></a>
      <a v-show="isShowAdd=='true'" @click="addHandler" class="calc-jiahao  calcfont right" id="add"></a>
    </header>

    <div class="nav sticky">
      <div id="dealPipelineNav" @click="switchPage(0,$event)" class="f16 nav-item active-item lanText" data-lanid="820_交易"></div>
      <div id="opportunitiesNav" @click="switchPage(1,$event)" class="f16 nav-item lanText" data-lanid="649_商业机会"></div>
      <div class="nav-border"></div>
    </div>
    <div class="selectList-scroll">

      <div v-show="showPage==0" class="user-page">
        <div class="search">
          <div class="search-box">
            <span class="calcfont calc-sousuo input-search-icon"></span>
            <input
              type="search"
              id="dealInput"
              key="userInput"
              class="search-input lanInputPlaceHolder"
              data-lanid="780_搜索"
              placeholder=""
            >
          </div>
        </div>
        <!-- 列表 -->
        <div v-if="!noDealData" class="dataList" id="dealList">
            <div v-for="item in dealPipelineData" :key="item.id" class="item-div">
                <label class="radios-label">
                    <input type="radio" name="aa" :value="item.id" v-model="dealPipelineValue" /><i class="radios"></i><span class="f14">{{item.text}}</span>
                </label>
            </div>
        </div>
        <!-- 没数据 -->
        <nothing v-if="noDealData" style="padding-top:0.8rem;"></nothing>
      </div>

      <div v-show="showPage==1" class="group-page">
        <div class="search">
          <div class="search-box">
            <span class="calcfont calc-sousuo input-search-icon"></span>
            <input
              type="search"
              id="oppInput"
              key="groupInput"
              class="search-input lanInputPlaceHolder"
              data-lanid="780_搜索"
              placeholder="">
          </div>
        </div>
        <!-- 列表 -->
        <div v-if="!noOppData" class="dataList" id="oppList">
            <div v-for="item in opportunitiesData" :key="item.id" class="item-div">
                <label class="radios-label">
                    <input type="radio" name="bb" :value="item.id" v-model="opportunitiesValue"/><i class="radios"></i><span class="f14">{{item.text}}</span>
                </label>
            </div>
        </div>
        <!-- 没数据 -->
        <nothing v-if="noOppData" style="padding-top:0.8rem;"></nothing>
      </div>


    </div>
  </div>
</template>

<script>
import Nothing from "@/components/customPlugin/Nothing";
export default {
  components: {
    nothing: Nothing
  },
  data() {
    return {
      noDealData: false, //没数据
      noOppData: false, //没数据
      //dealPipeline数据
      dealPipelineData: [
      ],
      //Opportunities数据
      opportunitiesData: [
      ],
      dealPipelineValue: '',
      opportunitiesValue: '',
      showPage: 0,
      field:"",
      code:"",
      typeValue:"",
      title: "",
      value:"",
      selectType:"",
      filter:"",
      isShowAdd:"",
      fromType:"",
      addID:'',//新增记录后返回来的id
    };
  },
  created: function() {
      let _self = this;
      _self.field = _self.$route.query.field;
      _self.code = _self.$route.query.code;
      _self.typeValue = _self.$route.query.typeValue;
      _self.title = _self.$route.query.title;
      _self.value = _self.$route.query.value;
      _self.selectType = _self.$route.query.selectType;
      _self.filter = _self.$route.query.filter;
      _self.isShowAdd = _self.$route.query.isShowAdd;
      _self.fromType = tool.isNullOrEmptyObject(_self.$route.query.fromType)?"false":_self.$route.query.fromType;

      _self.showPage = _self.$store.state.linkePageShow;
      //获取新增记录返回来的id
      _self.addID = _self.$store.state.addID || '';
      if(!tool.isNullOrEmptyObject(_self.addID)){
          _self.value = _self.addID.toString();
      }
  },
  mounted: function() {
    let _self = this;
    lanTool.updateLanVersion();
    //清空输入框
    $("#dealInput,#oppInput").val("").trigger("change");
    //根据是否多选来设置列表滚动的区域高度
    if (this.selectType === 'checkbox') {
        $(".selectList-scroll").css("padding-bottom", "50px");
    }
    //监听搜索
    this.search();
    this.changePos();

    //默认触发第一个选项卡
    if(_self.showPage == 0){
        $("#dealPipelineNav").trigger("click");
    }else{
        $("#opportunitiesNav").trigger("click");
    }

  },
  methods: {
    //切换页面
    switchPage: function(num, e) {
      document.activeElement.blur();
      var _self = this;
      var el = e.target;
      if (num === undefined) return;
      $(el)
        .addClass("active-item")
        .siblings()
        .removeClass("active-item");
      _self.changePos();
      _self.showPage = num;
      _self.$store.commit('SET_LINKE_PAGE_SHOW', num);

      this.getData(_self.showPage);
    },
    //table底部横条过渡效果
    changePos: function() {
      this.$nextTick(function() {
        var activePos = $(".nav .active-item").position();
        $(".nav-border")
          .stop()
          .css({
            left: activePos.left,
            width: $(".nav .active-item").width()
          });
      });
    },
    //返回上一页
    backHandler: function() {
      let _self = this;
      _self.$store.commit('SET_LINKE_PAGE_SHOW', 0);
      _self.$router.back(-1);
    },
    //新增
    addHandler: function () {
        var _self = this;
        if(tool.isNullOrEmptyObject(_self.fromType)){
            return;
        }
        var curPageNum = _self.showPage;
        if(tool.isNullOrEmptyObject(curPageNum)){
            return;
        }
        //跳转到新增页面的url地址
        var addUrlTemp = "";
        //参数对象
        var paramTemp = {
          "showPage":curPageNum,
          'source':'linkedpage'
        };
        if(_self.fromType == "9"){
          addUrlTemp = "/opportunitiesinfo/-1";
        }

        if(tool.isNullOrEmptyObject(addUrlTemp)){
            return;
        }

        //跳转到新增页面
        _self.$router.push({
            path:addUrlTemp,
            query: paramTemp
        });
    },
    //保存
    saveHandler: function(mycallback) {
      var _self = this;
      var curPageNum = _self.showPage;
      var returnObj = {
          field: _self.field,
          value: {}
      };
      //radio
      if(_self.selectType === 'radio'){
          var selectedVal = "";
          //dealPipeline
          if(curPageNum == 0){
            selectedVal = _self.dealPipelineValue;
          }else{
            selectedVal = _self.opportunitiesValue;
          }

          // if(tool.isNullOrEmptyObject(selectedVal)){
          //     tool.showText(lanTool.lanContent('592_请选择数据！'));
          //     return;
          // }

          var id = selectedVal;
          var text = $.trim($("input[value='"+ id +"']:first").siblings("span:first").text()) || "";
          returnObj["value"] = {
              id : id,
              text : text
          };

      }else{
          // //checkbox
          // var valArr = _self.checkboxValue || [];
          // var id = [];
          // var text = [];
          // for(var i = 0; i < valArr.length;i++){
          //     var idTemp = valArr[i];
          //     var textTemp = $.trim($("input[value='"+ idTemp +"']:first").siblings("span:first").text()) || "";

          //     id.push(idTemp);
          //     text.push(textTemp);
          // }
          // returnObj["value"] = {
          //     id : id.join(","),
          //     text : text.join(",")
          // };
      }

      // console.log(returnObj);
      eventBus.$emit('updataSelectList', returnObj);
      _self.$router.back(-1);
    },
    //清除
    clearHandler:function(){
        var _self = this;
        if(_self.showPage == 0){
            _self.dealPipelineValue = '';
        }else{
            _self.opportunitiesValue = '';
        }

    },
    //初始化数据
    getData: function(curPageNum, mycallback) {
      var _self = this;
      var businessTypes = "";
      //清空另一组数据
      //dealPipeline
      if (curPageNum == 0) {
        _self.opportunitiesData = [];
        _self.opportunitiesValue = '';
        _self.noOppData = true;

        businessTypes = "29";
      } else {
        //opportunities
        _self.dealPipelineData = []
        _self.dealPipelineValue = '';
        _self.noDealData = true;

        businessTypes = "30";
      }

      var urlTemp = tool.AjaxBaseUrl();
      var controlName = tool.CommonDataServiceHandle_Query;
      //传入参数
      var jsonDatasTemp = {
        CurrentLanguageVersion: lanTool.currentLanguageVersion,
        UserName: tool.UserName(),
        _ControlName: controlName,
        _RegisterCode: tool.RegisterCode(),
        Code: _self.code,
        BusinessTypes:businessTypes
      };
      var loadingIndexClassName = tool.showLoading();
      $.ajax({
        async: true,
        type: "post",
        url: urlTemp,
        data: jsonDatasTemp,
        success: function(data) {
          tool.hideLoading(loadingIndexClassName);
          data = tool.jObject(data);
          // console.log(data);
          if (data._ReturnStatus == false) {
            if (curPageNum == 0) {
              _self.dealPipelineData = [];
              _self.noDealData = true;
            } else {
              _self.noOppData = true;
              _self.opportunitiesData = [];
            }
            tool.showText(tool.getMessage(data));
            console.log(tool.getMessage(data));
            return true;
          }

          data = data._OnlyOneData || [];

          if (data.length <= 0) {
            if (curPageNum == 0) {
              _self.dealPipelineData = [];
              _self.noDealData = true;
            } else {
              _self.noOppData = true;
              _self.opportunitiesData = [];
            }
          } else {
            if (curPageNum == 0) {
              _self.dealPipelineData = data;
              _self.noDealData = false;

            } else {
              _self.opportunitiesData = data;
              _self.noOppData = false;
            }
          }

          //渲染已经选择的数据
          _self.iniVal(curPageNum);
        },
        error: function(jqXHR, type, error) {
          if (curPageNum == 0) {
            _self.dealPipelineData = [];
            _self.noDealData = true;
          } else {
            _self.noOppData = true;
            _self.opportunitiesData = [];
          }
          console.log(error);
          tool.hideLoading(loadingIndexClassName);
          return true;
        },
        complete: function() {
          //tool.hideLoading();
          //隐藏虚拟键盘
          document.activeElement.blur();
        }
      });
    },
    //渲染已经选择的的数据
    iniVal:function(curPageNum){
        var _self = this;
        if(tool.isNullOrEmptyObject(_self.value)){
            return;
        }
        var valArrTemp = _self.value.split(",");
        _self.$nextTick(function(){
            var toTopH = [];
            for(var i=0;i<valArrTemp.length;i++){
                if(_self.selectType === 'radio'){
                    //dealPipeline
                    if(curPageNum == 0){
                      _self.dealPipelineValue = valArrTemp[i];
                    }else{
                      _self.opportunitiesValue = valArrTemp[i];
                    }

                    //radio 滚动条定位
                    var curObj = $("input[value='"+ valArrTemp[i] +"']").closest('.item-div');
                    if(tool.isNullOrEmptyObject(curObj) || curObj.length <= 0){
                          return;
                    }
                    var scrollTo = curObj.offset().top - $('.nav').innerHeight();
                    toTopH.push(scrollTo);
                }else{
                    // //checkbox
                    // _self.checkboxValue.push(valArrTemp[i]);

                    // var curObj = $("input[value='"+ valArrTemp[i] +"']").closest('.item-div');
                    // if(tool.isNullOrEmptyObject(curObj) || curObj.length <= 0){
                    //       return;
                    // }
                    // var scrollTo = curObj.offset().top;
                    // toTopH.push(scrollTo);
                }
            }
            _self.scrollTo(toTopH);

            //触发确认操作
            if(!tool.isNullOrEmptyObject(_self.addID)){
                // _self.$store.commit('SET_LINKE_PAGE_SHOW', 0);
                _self.saveHandler();
            }
        })
    },
    //筛选
    search: function() {
      this.$nextTick(function() {
        $("#dealInput")
          .unbind("input")
          .bind("input", function() {
            var queryStr = $.trim($(this).val());
            if (queryStr === "") {
                $('#dealList').find('div.item-div').show();
            } else {
                $('#dealList').find('div.item-div').hide().filter(":lowerCaseContains('" + queryStr + "')").show();
            }
          });

        $("#oppInput")
          .unbind("input")
          .bind("input", function() {
            var queryStr = $.trim($(this).val());
            if (queryStr === "") {
                $('#oppList').find('div.item-div').show();
            } else {
                $('#oppList').find('div.item-div').hide().filter(":lowerCaseContains('" + queryStr + "')").show();
            }
          });
      });
    },
    //滚动条定位到已选中的记录
    scrollTo:function(arr){
        var _self = this;
        if(tool.isNullOrEmptyObject(arr)){
                return;
        }
        // console.log(arr);
        _self.$nextTick(function(){
            var headerH = $('header').height();
            var scrollToH = 0;
            if(_self.selectType === 'radio'){
                scrollToH = arr[0];
            }else{
                //获取最小值
                scrollToH = Math.min.apply(Math, arr);
            }
            $(window).scrollTop(scrollToH - headerH);
        })
    }
  },
  beforeRouteLeave:function(to, from, next){
      let _self = this;
      _self.$store.commit('SET_ADD_ID', '');
      next();
  }


};
</script>

<style scoped>
@import "../../assets/css/pages/linkedPage.css";
</style>
