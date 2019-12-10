<template>
  <div class="page">
    <div v-show="pageState == 1">
    <!-- <div class="mainModule show"> -->
      <header class="header sticky">
        <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
        <div class="search" @click="showSearch">
          <search-input
            :enableInput="false"
            :isShowClearIcon="true"
            :placeholder="lanSearchModuleInputPlaceHolder"
            ref="searchInput"
          ></search-input>
        </div>
        <a class="add-icon"></a>
      </header>

      <sort :sortData="sortData" :sortObj="sortObj" ref="sort"></sort>

      <!-- 列表模式   -->
      <div class="pageContent">
        <vue-scroll
          v-show="!noData"
          :showToTop="false"
          :options="{ pullup: true, pulldown: true }"
          :scrollbar="false"
          ref="scroll"
          @pulldown="pulldown"
          @pullup="pullup"
        >
          <div class="list-div list-module-list">
            <ul class="dataList" :key="item.AutoID" v-for="item in listData">
              <li>
                <a class="userMessage" @click="goUserInfoPage(item)">
                  <div class="headImg">
                    <img src="../../assets/images/default_user_img.png" alt="" />
                  </div>
                  <h4>
                    <div class="userName">{{ item.Realname }}</div>
                  </h4>
                  <div class="position">
                    <span
                      class="positionIcon calcfont"
                      :class="[item.PositionID != '' ? 'calc-zhiwei' : '']"
                    ></span
                    >{{ item.PositionID }}
                  </div>
                  <div class="department">
                    <span
                      class="departmentIcon calcfont"
                      :class="[item.DepartmentID != '' ? 'calc-zuzhibumen' : '']"
                    ></span
                    >{{ item.DepartmentID }}
                  </div>
                  <div>
                    <span
                      :class="[item.Email != '' ? 'calc-youxiang' : '']"
                      class="userEmail pullLeft calcfont"
                      >{{ item.Email }}</span
                    >
                  </div>
                  <div>
                    <span
                      :class="[item.Phone != '' ? 'calc-phone' : '']"
                      class="userPhone pullRight calcfont"
                      >{{ item.Phone }}</span
                    >
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </vue-scroll>
        <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
      </div>

      <!-- 侧滑筛选 -->
      <screen
        :screenData="RightPanelModel"
        :queryObj="queryObj"
        ref="screen"
      ></screen>
    </div>

    <!-- 页面处于搜索状态 -->
    <div v-show="pageState == 2">
    <!-- <div class="otherModule hide"> -->
      <search-module
        :searchModuleFromType="searchModuleFromType"
        :lanSearchModuleInputPlaceHolder="lanSearchModuleInputPlaceHolder"
        :queryObj="queryObj"
        ref="searchModule"
      ></search-module>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
import Sort from "@/components/customPlugin/Sort"
import Screen from "@/components/customPlugin/Screen"
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";
import SearchModule from '@/components/customplugin/SearchModule'
import Mixins from '@/mixins/commonlist.js'

export default {
  name: "userEvents",
  mixins:[Mixins],
  components: {
    SearchInput,
    Sort,
    Screen,
    SearchModule,
    "vue-scroll": Scroll,
    nothing: Nothing
  },
  data() {
    return {
      pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
      //排序模型
      sortData: [
        {
          sortName: "Realname",
          sortText: lanTool.lanContent("1000540_按用户名正序排序"),
          sortOrder: "",
          sort: 10,
          isActive: true
        },
        {
          sortName: "DepartmentID",
          sortText: lanTool.lanContent("1000542_按部门正序排序"),
          sortOrder: "",
          sort: 30
        },
        {
          sortName: "Email",
          sortText: lanTool.lanContent("1000544_按邮件正序排序"),
          sortOrder: "",
          sort: 50
        }
      ],
      //右侧侧滑数据模型
      RightPanelModel: {
        DataFilterModel: {
          text: lanTool.lanContent("794_数据筛选"),
          option: [
            {
              id: "allData",
              text: lanTool.lanContent("795_全部"),
              sort: 10,
              isActive: true
            }
          ]
        },
        GroupByModel: {
          text: lanTool.lanContent("1000004_分组模式"),
          option: [
            {
              id: "List",
              text: lanTool.lanContent("1000524_列表"),
              sort: 10,
              isActive: true
            }
          ]
        },
        FieldModel: [
            {
                queryfield: "DepartmentID",
                text: lanTool.lanContent("567_部门"),
                fieldControlType: "textareaInput",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "like",
                datalanid: "567_部门",
                iconClass:'calc-zuzhibumen'
            },{
                queryfield: "PositionID",
                text: lanTool.lanContent("1000259_职务"),
                fieldControlType: "textareaInput",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "like",
                datalanid: "1000259_职务",
                iconClass:'calc-zhiwei'
            },{
                queryfield: "Phone",
                text: lanTool.lanContent("698_电话"),
                fieldControlType: "textareaInput",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "like",
                datalanid: "698_电话",
                iconClass:'calc-phone'
            },{
                queryfield: "Email",
                text: lanTool.lanContent("697_邮箱"),
                fieldControlType: "textareaInput",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "like",
                datalanid: "697_邮箱",
                iconClass:'calc-youxiang'
            },
        ]
      },
      noData: false, //没数据
      pageSize: tool.PageSize, //一页显示多少记录
      pageNum: 1, //当前页码
      sortObj: {
        sortName: "", //排序名称
        sortOrder: "" //排序方向
      },
      //查询对象
      queryObj: {
        dataFilter: "", //数据筛选模式,
        groupByMode: "", //分组模式,
        viewMode: "", //视图模式
        queryCondictionArr: [], //自定义查询条件
        autoValue: "" //模糊查询值
      },
      pageType: 0, //0:userevent
      //列表数据(分组模式为List)
      listData: [],
      lanSearchModuleInputPlaceHolder: lanTool.lanContent("1000307_用户帐号"),

      searchModuleFromType: "11" //联系人:6;公司:7;会议:8;商机&交易:9; 用户管理：11；
    };
  },
  created: function() {
    var _self = this;
    _self.$store.commit("SET_ITEM", "userEvents");

    //接收从HomeSearch页面传过来的值
    //设置模糊查询的值
    var autoVal = _self.$route.query.autoValue || "";
    _self.$nextTick(function() {
      _self.queryObj.autoValue = autoVal;
      _self.$refs.searchInput.searchValue = autoVal;
    });
  },
  mounted: function() {
    this.queryList("", function() {});
  },
  mounted() {
    let _self = this;
    _self.watchScroll();
  },
  activated: function() {
    let _self = this;
    var isShowPanel =
    (_self.$refs.screen.showPanel == null || _self.$refs.screen.showPanel == undefined)
    ? false
    : _self.$refs.screen.showPanel;

    //若侧滑是展开的，则给body添加hideOverflow样式
    if(isShowPanel){
      $("body").addClass("hideOverflow");
    }else{
      //若侧滑是收起的，移除body的hideOverflow样式
      $("body").removeClass("hideOverflow");
    }
  },
  methods: {
    //返回上一页
    back() {
      var $this = this;
      $this.$router.back(-1);
    },
    //查询委托
    delegateQuery: function() {
      let _self = this;
      _self.$nextTick(function() {
        //执行查询
        if (tool.isNullOrEmptyObject(_self.queryObj.groupByMode)) {
          return;
        }
        if (_self.queryObj.groupByMode.toLowerCase() == "list") {
          //查询列表
          _self.queryList("pushRefresh", function() {
              //列表回到顶部
              _self.$refs.scroll.goTopping();
          });
        } else {
          //查询分组数据
          _self.queryGroup();
        }
      });
    },
    //合并查询条件
    constructQueryCondiction: function() {
      let _self = this;
      var queryCondictionAllArr = [];
      if (!tool.isNullOrEmptyObject(_self.queryObj.dataFilter)) {
        var dataFilterObj = {
          Field: _self.queryObj.dataFilter || "",
          Type: "string",
          Format: "",
          Relation: "and",
          Value: _self.queryObj.dataFilter,
          Comparison: "="
        };
        queryCondictionAllArr.push(dataFilterObj);
      }

      if (!tool.isNullOrEmptyObject(_self.queryObj.queryCondictionArr)) {
        queryCondictionAllArr = tool.combineArray(
          queryCondictionAllArr,
          _self.queryObj.queryCondictionArr
        );
      }

      return queryCondictionAllArr;
    },
    //列表查询
    queryList: function(queryType, callback) {
      let _self = this;
      if (queryType == "pushLoad") {
        //上拉请求
        _self.pageNum += 1;
      } else {
        //非上拉请求
        _self.pageNum = 1;
      }
      //api接口地址
      var urlTemp = tool.AjaxBaseUrl();
      var controlName = tool.Api_BaseUserBaseInfHandle_QueryNew;

      var jsonDatasTemp = {
        CurrentLanguageVersion: lanTool.currentLanguageVersion,
        UserName: tool.UserName(),
        _ControlName: controlName,
        _RegisterCode: tool.RegisterCode(),
        IsUsePager: true,
        PageSize: _self.pageSize,
        PageNum: _self.pageNum,
        SortName: _self.sortObj.sortName || "",
        SortOrder: _self.sortObj.sortOrder || "",
        QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
        GroupBy: _self.queryObj.groupByMode || "",
        PageType: _self.pageType,
        AutoValue: _self.queryObj.autoValue || "",
        BusinessTypes: _self.businessType || ""
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
            tool.showText(tool.getMessage(data));
            console.log(tool.getMessage(data));
            _self.listData = [];
            _self.noData = true;
            return;
          }
          data = data._OnlyOneData.Rows || [];

          //没有数据
          if (
            (tool.isNullOrEmptyObject(data) || data.length <= 0) &&
            _self.pageNum == 1
          ) {
            _self.listData = [];
            _self.noData = true;
            return;
          }

          _self.noData = false;
          if (queryType == "pushLoad") {
            _self.listData = _self.listData.concat(data);
          } else {
            _self.listData = data;
          }

          //重新计算 better-scroll,当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
          _self.$refs.scroll.refresh();

          if (
            !tool.isNullOrEmptyObject(callback) &&
            typeof callback == "function"
          ) {
            callback(data, _self.pageSize);
          }
        },
        error: function(jqXHR, type, error) {
          tool.hideLoading(loadingIndexClassName);
          console.log(error);
          return true;
        },
        complete: function() {
          //隐藏虚拟键盘
          document.activeElement.blur();
        }
      });
    },
    //下拉
    pulldown: function() {
      let _self = this;
      _self.queryList("pushRefresh", function() {
        // _self.$refs.scroll.refresh();
      });
    },
    //上拉
    pullup: function() {
      let _self = this;
      _self.queryList("pushLoad", function(data, pageSize) {
        if (data.length < pageSize) {
          _self.$refs.scroll.pullupEnd();
        }
      });
    },
    //跳转到用户详情
    goUserInfoPage: function(item) {
      var _self = this;
      if (tool.isNullOrEmptyObject(item.AutoID)) {
        return;
      }
      var url = "/userEventsInfo/" + item.AutoID;
      var infoName = item.Realname || "";
      _self.$router.push({
        path: url,
        query: {
          infoName: infoName
        }
      });
    },
    //监听滚动
    watchScroll: function() {
      var _self = this;
      var headerH = parseFloat($("header").innerHeight());
      var navH = parseFloat($(".sort").innerHeight());

      _self.watchScrollHandle(headerH + navH);
    },

    //点击头部搜索
    showSearch() {
      let _self = this;
      //1>隐藏排序的下拉
      _self.$refs.sort.closeDownToggle();
      //2>构造历史查询记录
      _self.$refs.searchModule.getHistoricalSearchRecord();
      //3>若当前组件的input组件有值，则将该值赋予SearchModule的input组件
      var curAutoVal = _self.$refs.searchInput.searchValue || "";
      _self.$refs.searchModule.$refs.searchInput.searchValue = curAutoVal;
      //4>执行模糊查询，查询匹配的前N条记录
      _self.$refs.searchModule.$refs.searchInput.inputChange();
      //5>切换到模糊查询页面
      _self.pageState = 2;
      //6>获取搜索框焦点
      _self.$nextTick(function(){
        _self.$refs.searchModule.$refs.searchInput.$refs.curInput.click();
      });
    },
    //是否显示主模块
    ModuleDsiplayAction:function(isShowMainModule){
      isShowMainModule = (isShowMainModule == null || isShowMainModule == undefined)?true:isShowMainModule;
      if(isShowMainModule){
        $(".mainModule").removeClass("hide").addClass("show");
        $(".otherModule").removeClass("show").addClass("hide");
      }else{
        $(".mainModule").removeClass("show").addClass("hide");
        $(".otherModule").removeClass("hide").addClass("show");
      }
    },
    //input查询框,点击搜索/回车键执行的查询
    //接收搜索的值并刷新列表
    //str有可能为空(专门处理搜索)
    refreshListBySearchValue(str, callBack) {
      let _self = this;
      str = (str || "").trim();
      _self.pageState = 1;
      // _self.ModuleDsiplayAction(true);
      //1>初始化排序
      _self.$refs.sort.initDefultSortItem(false);
      //2>初始化筛选条件
      _self.$refs.screen.resetEvent(true);
      //3>设置模糊查询的值
      _self.queryObj.autoValue = str;
      //4>执行查询
      _self.queryList("pushRefresh");
      //5>执行回调函数(这里不把callback放在queryList执行，是因为queryList里的callBack,只有执行查询成功，并且有数据的情况下，才会执行callBack)
      if (
        !tool.isNullOrEmptyObject(callBack) &&
        typeof callBack == "function"
      ) {
        callBack();
      }
    },
    //点击头部输入框中的X按钮
    clearSearchValue() {
      let _self = this;
      var autoVal = "";
      //1>清除input控件的值
      _self.$refs.searchInput.searchValue = autoVal;
      //2>清除searchModule的input组件的值
      _self.$refs.searchModule.$refs.searchInput.searchValue = autoVal;
      //3>清除searchModule的inputValue
      _self.$refs.searchModule.inputValue = autoVal;
      //4>清除searchModule的模糊查询结果
      _self.$refs.searchModule.resultData = [];
      //5>触发searchModule的查询动作
      _self.$nextTick(function() {
        _self.$refs.searchModule.excuteSeach(autoVal);
      });
    }
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.name == "index"  || to.name == 'homesearch') {
      this.$store.commit("REMOVE_ITEM", "userEvents");
    }

    //移除body的hideOverflow样式
    $("body").removeClass("hideOverflow");

    next();
  }
};
</script>

<style scoped>
.page {
}
.header {
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
}
.back-icon {
  font-size: 0.48rem;
  padding: 0.1rem 10px;
}
.search {
  flex: 1;
}
.add-icon {
  font-size: 0.4rem;
  padding: 0.1rem 10px;
}

.pageContent {
  position: fixed;
  top: calc(0.88rem + 0.88rem);
  bottom: 0px;
  left: 0;
  right: 0;
}
.list-div{}
.pageContent .userMessage {
  position: relative;
  display: block;
  padding: 0.2rem;
  /* height: auto; */
  border-bottom: 1px solid beige;
  height: 1.56rem;
}
ul li {
  list-style-type: none;
}
.pageContent .userMessage .calcfont.calc-youxiang,
.pageContent .userMessage .calcfont.calc-phone {
  padding: 0.3rem 0.1rem 0.1rem 0.1rem;
  font-size: 0.28rem;
  /* width: calc(50% - 0.4rem); */
  /* max-width: 50%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pageContent .userMessage .calcfont.calc-youxiang {
  max-width: calc(60% - 0.4rem);
}
.pageContent .userMessage .calcfont.calc-phone {
  max-width: calc(40% - 0.4rem);
}
.headImg {
  float: left;
  height: 1rem;
  width: 1rem;
}

.headImg img {
  width: 100%;
  height: 100%;
}

.userMessage .userName {
  font-size: 0.28rem;
  padding-left: 0.2rem;
  padding-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position {
  font-size: 0.24rem;
  padding-left: 10px;
  /* padding-top: 0.1rem; */
  color: #888888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.departmentIcon,
.positionIcon {
  font-size: 0.25rem;
  padding-right: 2px;
}
.department {
  font-size: 0.24rem;
  padding-left: 10px;
  /* padding-top: 0.1rem; */
  color: #888888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.department::after {
}
.pullLeft {
  clear: left;
  float: left;
}

.pullRight {
  float: right;
}

.userEmail,
.userPhone {
  padding-top: 0.3rem;
  font-size: 13px;
}
</style>
