<template>
<div class="page">

  <header class="header">
      <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
      <search-input class="search" placeholder="搜索联系人"></search-input>
      <a class="calcfont calc-tianjia add-icon" @click="addContacts" ></a>
  </header>

  <sort :sortData="sortData"></sort>

  <div class="list-div">
    <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">

          <div v-if="listData.length > 0" class="contacts-list data-list">
                <div v-for="(item, index) in listData" :key="item.AutoID"
                  :data-url="'/contactsinfo/' + item.AutoID"
                  class="group-item data-events-item f14">
                      <div class="item-user-icon"><img src="../../assets/images/default_user_img.png" alt=""></div>
                      <div class="item-block contacts-item-block">
                              <div class="item-div item-first-div"><span>{{item.EnglishName}}</span></div>
                              <div class="item-div" style="padding-top:5px;">
                                  <i :class="[(item.Title =='' || item.Title == null) ? '' : 'calc-zhiwei']" class="calcfont icon"></i><span>{{item.Title}}</span>
                              </div>
                              <div class="item-div">
                                  <div class="left-text max60" v-show="(item.CompanyID =='' || item.CompanyID == null) ? false : true">
                                      <i class="calcfont icon calc-gongsixinxi"></i><span >{{item.CompanyID}}</span>
                                  </div>
                                  <div class="right-text max35" v-show="(item.CountryName =='' || item.CountryName == null) ? false : true">
                                      <i class="calcfont icon calc-nationaarea"></i><span>{{item.CountryName}}</span>
                                  </div>
                              </div>
                              <div class="item-div">
                                  <div class="left-text max60" v-show="(item.Email =='' || item.Email == null) ? false : true">
                                    <i class="calcfont icon calc-mailbox"></i><span>{{item.Email}}</span>
                                  </div>
                                  <div class="right-text max35" v-show="(item.TelPhone =='' || item.TelPhone == null) ? false : true">
                                    <i class="calcfont icon calc-mobilephone"></i><span>{{item.TelPhone}}</span>
                                  </div>
                              </div>

                      </div>
                </div>
          </div>
    </vue-scroll>
    <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
  </div>


  <!-- 侧滑筛选 -->
  <screen :screenData="RightPanelModel"></screen>

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
        sortData:[
          {
            sortId:1,
            sortName:'company',
            sortText:'按公司名称正序排序',
            sortType:'asc'
          },
          {
            sortId:2,
            sortName:'company',
            sortText:'按公司名称倒序排序',
            sortType:'desc'
          },
          {
            sortId:3,
            sortName:'contacts',
            sortText:'按联系人名称正序排序',
            sortType:'asc'
          },
          {
            sortId:4,
            sortName:'contacts',
            sortText:'按联系人名称倒序排序',
            sortType:'desc'
          }
        ],
        noData: false, //没数据
        pageSize: 10, //一页显示多少记录
        pageNum: 1, //当前页码
        //列表数据
        listData:[{
            "AutoID": 1178,
            "EnglishName": "Alex Pang",
            "Title": "Cisco Gold Certified Partner",
            "Email": "alex_pang@macroview.com",
            "TelPhone": "+852 3529 5587",
            "DepartmentName": "Cisco Master Collaboration Specialization",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1343,
            "EnglishName": "Alvin Chun",
            "Title": "",
            "Email": "alvin_chun@macroview.com",
            "TelPhone": "35295459",
            "DepartmentName": "Solution and Service Architect",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1176,
            "EnglishName": "Michael Yan",
            "Title": "甄文達",
            "Email": "michael_yan@macroview.com",
            "TelPhone": "+852 3529 7471",
            "DepartmentName": "Cisco Master Collaboration Specialization",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1177,
            "EnglishName": "Samson choi",
            "Title": "Cisco Gold Certified Parmer",
            "Email": "samson_choi@macroview.com",
            "TelPhone": "+852 3529 3804",
            "DepartmentName": "CISA,CISSP",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1342,
            "EnglishName": "Selina Wong",
            "Title": "associate Service Architect",
            "Email": "selina_wong@macroview.com",
            "TelPhone": "35295337",
            "DepartmentName": "",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1173,
            "EnglishName": "黃俊華",
            "Title": "Senior Manager",
            "Email": "dennis_wong@macroview.com",
            "TelPhone": "+852 2903 7329",
            "DepartmentName": "",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1174,
            "EnglishName": "余亮生",
            "Title": "account manager",
            "Email": "nelson_yu@macroview.com",
            "TelPhone": "+852 3529 5585",
            "DepartmentName": "sales",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }, {
            "AutoID": 1175,
            "EnglishName": "周健友",
            "Title": "Technical Manager",
            "Email": "philip_chow@macroview.com",
            "TelPhone": "+852 2903 7350",
            "DepartmentName": "TS-Network Infrastructure Solutions",
            "CompanyID": "MACROVIEW TELECOM",
            "CountryName": null,
            "BusinessType": "Other"
          }],

        RightPanelModel:{
            "DataFilterModel":{
                text:lanTool.lanContent("794_数据筛选"),
                option:[
                    {
                      sort:10,
                      id:"All",
                      text:"All"
                    },{
                      sort:20,
                      id:"MyFollowed",
                      text:"My Followed"
                    }
                ]
            },
            "GroupByModel":{
                text:lanTool.lanContent("1000004_分组模式"),
                option:[
                    {
                      sort:10,
                      id:"List",
                      text:"List",
                    },{
                      sort:20,
                      id:"BusinessType",
                      text:"Business Sector",
                    }
                ]
            },
            "BusinessSector":{
                queryfield: "BusinessType",
                text: lanTool.lanContent("1007_业务分类"),
                fieldControlType: "picker",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseAllTypes",
                TypeValue: "Companybusinesstype",
                datalanid: "1007_业务分类",
                option:[],
                more:true  //picker中是否提供显示更多功能
            },
            "selectList":[
                {
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
                    resulteRow: true,
                    clickObj: "CountryIDClickObj",
                    datalanid: "701_国家"
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
                }
            ]
        },
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
    //添加联系人
    addContacts(){
        let _self = this;
        _self.$router.push({
            path: '/contactsinfo/-1'
        });
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
        var controlName = tool.Api_BaseUserBaseInfHandle_QueryNew;
        /*
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            IsUsePager: true,
            PageSize:_self.pageSize,
            PageNum:_self.pageNum,
            SortName:"",
            SortOrder:"",
            QueryCondiction: JSON.stringify(_self.queryCondictionData || [])
        };
        console.log(jsonDatasTemp);
        */
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
                /*
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

                _self.noData = false;
                if(queryType == 'pushLoad'){
                    _self.userDataList = _self.userDataList.concat(data);
                }else{
                    _self.userDataList = data;
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
                */
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
    //头部搜索，提供给SearchInput子组件调用的
    search(str){
        console.log(str);
    }

  }


}
</script>

<style scoped>
.page{/*display: flex;flex-direction: column;justify-content: center;height: 100vh;*/}
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
