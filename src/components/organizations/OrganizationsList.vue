<template>
<div class="page">

  <header class="header">
      <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
      <search-input class="search" placeholder="搜索公司"></search-input>
      <a class="calcfont calc-tianjia add-icon" @click="addOrganization" ></a>
  </header>

  <sort :sortData="sortData" :sortObj="sortObj"></sort>

  <!-- 列表模式   -->
  <div class="list-div">
    <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
        <div v-if="listData.length > 0" class=" organizations-list">
          <div v-for="item in listData" :key="item.AutoID"
          class="group-item data-events-item"
          :data-url="'/organizationsinfo/' + item.AutoID">
                <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
                <div class="item-block f14">
                    <div class="item-div item-first-div">
                      <span class="short-name">{{item.ShortName}}</span>
                      <span class="icao-code f12">{{item.ICAOCode}}</span>
                    </div>
                    <div class="item-div">
                      <div class="left-text" v-show="(item.BusinessType =='' || item.BusinessType == null) ? false : true">
                        <i class="calcfont icon calc-yewu"></i><span >{{item.BusinessType}}</span>
                      </div>
                      <div class="right-text" v-show="(item.AccountManager =='' || item.AccountManager == null) ? false : true">
                        <i class="calcfont icon calc-chengshijingli"></i><span>{{item.AccountManager}}</span>
                      </div>
                    </div>
                    <div class="item-div">
                      <div class="left-text" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                        <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                      </div>
                      <div class="right-text" v-show="(item.CityName =='' || item.CityName == null) ? false : true">
                        <i class="calcfont icon calc-diqiuquanqiu"></i><span>{{item.CityName}}</span>
                      </div>
                    </div>
                </div>
          </div>
    </div>
    </vue-scroll>
    <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
  </div>

  <!-- 分组模式   -->
  <div class="list-div">

  </div>


  <!-- 侧滑筛选 -->
  <screen :screenData="RightPanelModel" :queryObj="queryObj"></screen>

</div>
</template>

<script>
import SearchInput from "@/components/customPlugin/SearchInput";
import Sort from "@/components/customPlugin/Sort"
import Screen from "@/components/customPlugin/Screen"
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing";
export default {
  name:'organizationslist',
  components: {
        SearchInput,Sort,Screen,
        'vue-scroll': Scroll,
        nothing: Nothing
  },
  data(){
    return{
        //排序模型
        sortData:[{
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
            sortOrder:'desc'
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
            sortOrder:'desc'
          },
          {
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000522_按国家正序排序"),
            sortOrder:'asc'
          },
          {
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000523_按国家倒序排序"),
            sortOrder:'desc'
          }],
        //右侧侧滑数据模型
        RightPanelModel:{
            "DataFilterModel":{
                text:lanTool.lanContent("794_数据筛选"),
                option:[
                    {
                      id:"allData",
                      text:lanTool.lanContent("795_全部"),
                      sort:10,
                      isActive:true
                    },{
                      id:"MyFollowData",
                      text:lanTool.lanContent("796_关注的公司"),
                      sort:20,
                      //isActive:true
                    }
                ]
            },
            "GroupByModel":{
                text:lanTool.lanContent("1000004_分组模式"),
                option:[
                    {
                      id:"List",
                      text:lanTool.lanContent("1000524_列表"),
                      sort:10,
                      isActive:true
                    },{
                      id:"BusinessType",
                      text:lanTool.lanContent("1007_业务分类"),
                      sort:20
                    }
                ]
            },
            "FieldModel":[{
                queryfield: "BusinessType",
                text: lanTool.lanContent("1007_业务分类"),
                fieldControlType: "picketTile",//下拉选项以磁贴的方式展示的控件
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseAllTypes",
                TypeValue: "Companybusinesstype",
                datalanid: "1007_业务分类",
                option:[],
                more:true  //picker中是否提供显示更多功能
            },{
                queryfield: "CountryID",
                text: lanTool.lanContent("701_国家"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCountryInf",
                TypeValue: "",
                selectType: "radio",
                // clickObj: "CountryIDClickObj",
                datalanid: "701_国家",
                resulteRow: true,
              },
              {
                queryfield: "CityID",
                text: lanTool.lanContent("702_城市"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCountryCity",
                TypeValue: "",
                selectType: "radio",
                datalanid: "702_城市"
              }]
        },
        noData: false, //没数据
        pageSize: tool.PageSize, //一页显示多少记录
        pageNum: 1, //当前页码
        sortObj:{
          sortName:"",//排序名称
          sortOrder:""//排序方向
        },
        //查询对象
        queryObj:{
          dataFilter:"",//数据筛选模式,
          groupByMode:"",//分组模式,
          viewMode:"",//视图模式
          queryCondictionArr:[],//自定义查询条件
        },
        pageType:0,//0:Organizations;1:Contacts
        //列表数据(分组模式为List)
        listData:[
          // {
          //   "AutoID": 487,
          //   "ShortName": "OEINC",
          //   "ICAOCode": "",
          //   "BusinessType": "OEM_Aircraft",
          //   "AccountManager": "",
          //   "CountryName": "China",
          //   "CityName": "ShangHai",
          //   "GroupID": 173,
          //   "IsFollow": "calc-noshoucang",
          //   "GroupRowCount": 1
          // }
          ],
        //分组数据(分组模式为非List)
        groupData:[]
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'organizationslist');
  },
  mounted(){

  },
  activated(){

  },
  methods:{
    //返回上一页
    back(){
        var $this = this;
        $this.$router.back(-1);
    },
    //添加公司
    addOrganization(){
        let _self = this;
        _self.$router.push({
            path: '/organizationsinfo/-1'
        });
    },
    //查询委托
    delegateQuery:function(){
      let _self = this;
      
      _self.$nextTick(function(){

        //执行查询
        if(tool.isNullOrEmptyObject(_self.queryObj.groupByMode)){
          return;
        }

        if(_self.queryObj.groupByMode.toLowerCase() == "list"){
          //查询列表
          _self.queryList('pushRefresh', function () {
          });
        }else{
          //查询分组数据
          _self.queryGroup();
        }
      });

    },
    //合并综合查询条件
    constructQueryCondiction:function(){
      let _self = this;
      var queryCondictionAllArr = [];
      if(!tool.isNullOrEmptyObject(_self.queryObj.dataFilter)){
        var dataFilterObj = {
          Field:_self.queryObj.dataFilter||"",
          Type:"string",
          Format:"",
          Relation:"and",
          Value:_self.queryObj.dataFilter,
          Comparison:"="
        };
        queryCondictionAllArr.push(dataFilterObj);
      }

      if(!tool.isNullOrEmptyObject(_self.queryObj.queryCondictionArr)){
        queryCondictionAllArr = tool.combineArray(queryCondictionAllArr,_self.queryObj.queryCondictionArr);
      }

      return queryCondictionAllArr;
    },
    //列表查询
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
        var controlName = tool.Api_OrganizationsHandle_GroupInnerData;
        
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            IsUsePager: true,
            PageSize:_self.pageSize,
            PageNum:_self.pageNum,
            SortName:_self.sortObj.sortName||"",
            SortOrder:_self.sortObj.sortOrder||"",
            QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
            GroupBy:_self.queryObj.groupByMode||"",
            PageType:_self.pageType
        };
        //console.log(jsonDatasTemp);

        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                console.log(data);
                
                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    _self.listData = [];
                    _self.noData = true;
                    return;
                }
                data = data._OnlyOneData.Rows || [];

                //没有数据
                if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                    _self.noData = true;
                    return ;
                }

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
    pulldown: function () {
        let _self = this;
        _self.queryList('pushRefresh', function () {
            // _self.$refs.scroll.refresh();
        });
    },
    //上拉
    pullup: function () {
        let _self = this;
        _self.queryList('pushLoad', function (data, pageSize) {
            if (data.length < pageSize) {
                _self.$refs.scroll.pullupEnd();
            }
        });
    },
    //分组数据查询
    queryGroup:function(){
      return;
      let _self = this;
        //api接口地址
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_OrganizationsHandle_Group;
        
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            IsUsePager: true,
            PageSize:_self.pageSize,
            PageNum:_self.pageNum,
            SortName:_self.sortObj.sortName||"",
            SortOrder:_self.sortObj.sortOrder||"",
            QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
            GroupBy:_self.queryObj.groupByMode||"",
            PageType:_self.pageType
        };
        //console.log(jsonDatasTemp);

        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                console.log(data);
                
                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    _self.listData = [];
                    _self.noData = true;
                    return;
                }
                data = data._OnlyOneData.Rows || [];

                //没有数据
                if((tool.isNullOrEmptyObject(data) || data.length <= 0) && _self.pageNum == 1){
                    _self.noData = true;
                    return ;
                }

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
    //头部搜索，提供给SearchInput子组件调用的
    search(str){
        console.log(str);
    }
  },
  beforeRouteLeave: function (to, from, next) {
        if (to.name == 'index') {
            this.$store.commit('REMOVE_ITEM', 'organizationslist');
        }
        next();
    }
}
</script>

<style scoped>
.page{
    /*display: flex;flex-direction: column;justify-content: center;height: 100vh;*/
  }
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
}
.back-icon{font-size: 0.48rem;padding:0.1rem 10px;}
.search{flex:1;}
.add-icon{font-size: 0.4rem;padding:0.1rem 10px;}


/*列表*/
.list-div{
  position: fixed;
  left:0;right:0;bottom:0;
  top:calc(0.88rem + 0.7rem);
}


</style>
