<template>
<div class="page">
    <div v-show="pageState == 1">
          <header class="header sticky">
              <a @click="back" class="calcfont calc-fanhui back-icon" id="back"></a>
              <div class="search" @click="showSearch">
                  <search-input :enableInput="false" placeholder="搜索公司" :searchValue="searchValue"></search-input>
              </div>
              <a class="calcfont calc-tianjia add-icon" @click="addPitches" ></a>
          </header>

          <sort :sortData="sortData" :sortObj="sortObj"></sort>

          <!-- 列表模式   -->
          <div class="list-mode-div" v-show="queryObj.groupByMode == 'List'">
              <vue-scroll v-show="!noData" :showToTop="false" :options="{ pullup: true, pulldown: true }" :scrollbar="false" ref="scroll" @pulldown="pulldown" @pullup="pullup">
                  <div v-if="listData !=null && listData != undefined && listData.length > 0" class="group-item-list opportunities-list">
                      <div v-for="item in listData" :key="item.AutoID" class=" group-item f14" @click="goInfo(item)">
                            <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID" @click.stop="followToggle($event)"></div>
                            <div class="item-block">
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

                  </div>
              </vue-scroll>
          </div>

          <!-- 分组模式   -->
          <div class="group-mode-div" v-show="queryObj.groupByMode != 'List'">
              <div v-if="groupData !=null && groupData != undefined && groupData.length > 0" id="opportunitiesList" data-fromtype="opportunities">
                <div v-for="group in groupData" :key="group.GroupID" class="list-group-div group-div">
                        <div class="date-div " >
                            <span class="calcfont calc-lianxiren1"></span>
                            <span class="group-name" :data-groupid="group.GroupID">{{group.GroupName}}</span>
                            <span class="right">（{{group.GroupRowCount}}）</span>
                        </div>
                        <div class="occupy-div"></div>

                        <div v-if="group.items != null && group.items != undefined && group.items.length > 0" class="group-item-list opportunities-list">
                            <div v-for="item in group.items" :key="item.AutoID" class=" group-item f14" @click="goInfo(item)">
                                      <div class="item-stars-icon calcfont" :class="item.IsFollow" :data-autoid="item.AutoID"></div>
                                      <div class="item-block">
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
                        </div>
                </div>
              </div>
          </div>


          <!-- 侧滑筛选 -->
          <screen :screenData="RightPanelModel" :queryObj="queryObj"></screen>


    </div>

    <!-- 页面处于搜索状态 -->
    <div v-show="pageState == 2">
        <search-module module="contacts" ref="searchModule"></search-module>
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
    name:'pitcheslist',
    mixins:[Mixins],
    components: {
          SearchInput,Sort,Screen,SearchModule,
          'vue-scroll': Scroll,
          nothing: Nothing
    },
    data(){
    return{
        pageState: 1, //页面显示状态：1为显示列表；2为显示搜索
        searchValue:'', //搜索框的值
        //排序模型
        sortData:[{
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000518_按公司名称按正序排序"),
            sortOrder:'asc',
            sort:10,
            isActive:true
          },{
            sortName:"ShortName",
            sortText:lanTool.lanContent("1000519_按公司名称倒序排序"),
            sortOrder:'desc',
            sort:20
          },
          {
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000520_按业务分类正序排序"),
            sortOrder:'asc',
            sort:30
          },{
            sortName:"BusinessType",
            sortText:lanTool.lanContent("1000521_按业务分类倒序排序"),
            sortOrder:'desc',
            sort:40
          },{
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000522_按国家正序排序"),
            sortOrder:'asc',
            sort:50
          },{
            sortName:"CountryName",
            sortText:lanTool.lanContent("1000523_按国家倒序排序"),
            sortOrder:'desc',
            sort:60
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
                      text:lanTool.lanContent("981_我关注的数据"),
                      sort:20,
                      isActive:false
                    },{
                      id:"InProcess",
                      text:lanTool.lanContent("954_进行中"),
                      sort:30,
                      isActive:false
                    },{
                      id:"Won",
                      text:lanTool.lanContent("1142_赢单"),
                      sort:40,
                      isActive:false
                    },{
                      id:"Lost",
                      text:lanTool.lanContent("1143_输单"),
                      sort:50,
                      isActive:false
                    },{
                      id:"Withdrew",
                      text:lanTool.lanContent("1000409_取回"),
                      sort:60,
                      isActive:false
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
                      id:"PopedomTeamInf",
                      text:lanTool.lanContent("769_业务组"),
                      sort:20,
                      isActive:false
                    },{
                      id: "BusinessType",
                      text: lanTool.lanContent("695_业务"),
                      sort:30,
                      isActive:false
                    },{
                      id: "CountryName",
                      text: lanTool.lanContent("701_国家"),
                      sort:40,
                      isActive:false
                    },{
                      id: "ShortName",
                      text: lanTool.lanContent("685_公司"),
                      sort:50,
                      isActive:false
                    },{
                      id: "Initiator",
                      text: lanTool.lanContent("711_发起人"),
                      sort:60,
                      isActive:false
                    }]
            },
            "FieldModel":[{
                  queryfield: "timeField",
                  text: lanTool.lanContent("1000024_时间范围"),
                  fieldControlType: "timeRang",
                  queryType: "string",
                  queryFormat: "",
                  queryRelation: "and",
                  queryValue: "",
                  queryComparison: "=",
                  option:[
                      {
                        id:"all",
                        text:lanTool.lanContent("795_全部"),
                      },{
                        id:"week",
                        text:lanTool.lanContent("1000005_最近7天"),
                      },{
                        id:"month",
                        text:lanTool.lanContent("1000006_最近30天"),
                      },{
                        id:"halfyear",
                        text:lanTool.lanContent("1000007_最近半年"),
                      },{
                        id:"customize",
                        text:lanTool.lanContent("1000008_自定义"),
                      }
                  ]

                  // Code: "DropDowList_ViewBaseCompanyBaseInfHasContact",
                  // TypeValue: "",
                  // selectType: "radio",
                  // datalanid: "1000526_请选择",
                  // resulteRow: true,
                  // iconClass:'calc-gongsixinxi'
                },{
                queryfield: "CompanyID",
                text: lanTool.lanContent("790_公司"),
                fieldControlType: "selectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCompanyBaseInfHasContact",
                TypeValue: "",
                selectType: "radio",
                // clickObj: "CountryIDClickObj",
                datalanid: "1000526_请选择",
                resulteRow: true,
                iconClass:'calc-gongsixinxi'
              },
              {
                queryfield: "ContactsID",
                text: lanTool.lanContent("630_联系人"),
                fieldControlType: "linkSelectList",
                queryType: "string",
                queryFormat: "",
                queryRelation: "and",
                queryValue: "",
                queryComparison: "=",
                Code: "DropDowList_ViewBaseCompanyContactsByCompany",
                TypeValue: "",
                selectType: "radio",
                datalanid: "1000526_请选择",
                iconClass:'calc-kehulianxiren'
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
        listData:[{
              "AutoID": 443,
              "TheName": "ISTAT Latin America",
              "Memo": "Meetings at the ISTAT Latin America Forum",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "true",
              "MeetingTitle": "ISTAT Latin America ",
              "BeginTime": "2019-11-11T08:00:00"
            }, {
              "AutoID": 442,
              "TheName": "AE Hong Kong Conference",
              "Memo": "Meetings in Hong Kong at the AE Conference",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "true",
              "MeetingTitle": "Hong Kong AE Conference",
              "BeginTime": "2019-11-03T18:00:00"
            }, {
              "AutoID": 403,
              "TheName": "AE Conference NYC 2019",
              "Memo": "Notes from contacts at conference",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "true",
              "MeetingTitle": "AE Conference - New York",
              "BeginTime": "2019-10-15T16:00:00"
            }, {
              "AutoID": 234,
              "TheName": "ISTAT Meeting - March 2019",
              "Memo": "Attended the annual Spring ISTAT meeting in Orlando. Met with various lessors such as Castlelake, Aircastle, AerCap, SMBC, Boeing Captial, Airbus Asset Management, Orix, and MCAP in order to develop a pipeline of aircraft for portfolio acquisition with the intention of feeding the ARG fund. All have aircraft to offer and follow-up have begun with each. Also met with financiers such as DVB, PK, Nord LB, Blackrock and Wells Fargo in order to continue to keep the CALC/ARI name in the forefront as we are looking for possible back leverage for any deals which do not fit the ARG. Again follow-up has begun with these institutions as well.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 213,
              "TheName": "Hong Kong Visit - Feb 19 to March 1",
              "Memo": "Follow-up Xipei to obtain feedback on the portfolio which they had show us at the Dublin Airfinance Conference. A large number of bidders with as most of the assets where newer than what would be needed for the ARG fund. Will keep us posted as we work on a few aircraft on lease in China to CSA.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 212,
              "TheName": "Hong Kong Visit - Feb 19 to March 1",
              "Memo": "Discussed with Shane the last proposal we submitted into Avolon on the partout assets to get a feel of where we were in terms of pricing. We were well off in on the overall bid but competitive on some. He will continue to keep us posted on any opportunities which they will bring to market over the coming weeks.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 211,
              "TheName": "Hong Kong Visit - Feb 19 to March 1",
              "Memo": "Met with Brian McArdle to discuss potential opportunities which may exist within the SMBC portfolio for acquisition by ARI for the ARG fund. Will be following up with Brian and Craig Kilmurray in the Dublin office the week of March 4th.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 210,
              "TheName": "Hong Kong Visit - Feb 19 to March 1",
              "Memo": "Met with Mike Huang from GECAS to discuss the possibility of working together to identify a possible portfolio of aircraft which GECAS would be willing to sell to ARI for the ARG fund. Will follow-up with a call the week of March 4th to see if anything further can be done.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 207,
              "TheName": "UAM - United Meeting",
              "Memo": "Went with Jeff Sabo to visit United Airlines which is UAM's largest customer and has just recently offered a consignment of rotables inventory to UAM. Also had to explain the whole CALC involvement in UAM since the departure of senior management had United concerned. Jeff Sabo is to follow-up on the rotables consignment contract along with the potential consignment of two aircraft (757 and A320) for disassembly.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 206,
              "TheName": "Dublin Airfinance Conferences - 2019",
              "Memo": "Attended the Airline Economics and Airfinance Journal conferences in Dublin from 20-01-2019 to 24-01-2019 to meet airlines, lending institutions and lessors to discuss portfolio acquisition opportunities. Meet with financial institutions such as DVB, PK Airfinance, Nord LB, Volofin, Erste and Standard Charter. Additionally met with lessor such as AerCap, Standard Charter, CDB, SMBC, WNG, GATelesis, CFM Materials, Capital Source Bank, DVB, JetBlue Airlines, Sky Airlines Chile, AirCastle, Magnatar, Macquarie, FPG Amentum, Apollo. All of these meetings were intended to look for acquisition opportunities along with developing a relationship with the banking institutions. Follow with each will continue.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }, {
              "AutoID": 185,
              "TheName": "ISTAT Meeting - 12/2018",
              "Memo": "Attended ISTAT meeting in NewYork on the 5th of December to have the opportunity to visit face to face with airlines, lessors and financial institutions who were in attendance. Visited and had dinner with PK Airfinance to discuss the JetSmart engine financing. Also met with Nord LB to discuss financing opportunities. Talked with the likes of Aircastle, Aero Capital Solutions, Cross Ocean Partners and Castlelake about acquisition opportunities.",
              "CurrentState": "In Progress",
              "CurrentStateNew": 38,
              "IsFollow": "calc-noshoucang",
              "IsMeetingExist": "false",
              "MeetingTitle": null,
              "BeginTime": null
            }],
        //分组数据(分组模式为非List)
        groupData:[{
            "GroupID": 6,
            "GroupName": "Component Sales - Airframe & Component Solution",
            "GroupRowCount": 51
          }, {
            "GroupID": 8,
            "GroupName": "Corporate Financing & Global Banking",
            "GroupRowCount": 1
          }, {
            "GroupID": 24,
            "GroupName": "Executive Management",
            "GroupRowCount": 3
          }, {
            "GroupID": 13,
            "GroupName": "IT",
            "GroupRowCount": 20
          }, {
            "GroupID": 12,
            "GroupName": "OEM Procurement",
            "GroupRowCount": 14
          }, {
            "GroupID": 4,
            "GroupName": "Portfolio Acquisition",
            "GroupRowCount": 11
          }, {
            "GroupID": 3,
            "GroupName": "Portfolio Sales",
            "GroupRowCount": 7
          }, {
            "GroupID": 9,
            "GroupName": "PRC Aviation financing",
            "GroupRowCount": 6
          }, {
            "GroupID": 10,
            "GroupName": "PRC Structure finance",
            "GroupRowCount": 10
          }, {
            "GroupID": 14,
            "GroupName": "Risk Management n Corporate Compliance",
            "GroupRowCount": 3
          }, {
            "GroupID": 2,
            "GroupName": "SalesMarketing (New aircraft)",
            "GroupRowCount": 65
          }, {
            "GroupID": 1,
            "GroupName": "SalesMarketing (Used aircraft)",
            "GroupRowCount": 40
          }, {
            "GroupID": 18,
            "GroupName": "SalesMarketing(Americas)",
            "GroupRowCount": 23
          }, {
            "GroupID": 19,
            "GroupName": "SalesMarketing(EMEA)",
            "GroupRowCount": 4
          }, {
            "GroupID": 21,
            "GroupName": "SalesMarketing(PRC)",
            "GroupRowCount": 38
          }, {
            "GroupID": 23,
            "GroupName": "Technical",
            "GroupRowCount": 1
          }]
    }
  },
  created: function () {
      let _self = this;
      _self.$store.commit('SET_ITEM', 'pitcheslist');
  },
  mounted(){
      let _self = this;
      _self.watchScroll();
      //分组模式事件绑定
      // _self.groupToggleHandle('organizationsList');
  },
  methods:{
      //返回上一页
      back(){
          var $this = this;
          $this.$router.back(-1);
      },
      //添加Pitches
      addPitches(){
          let _self = this;
          _self.$router.push({
              path: '/opportunitiesinfo/-1'
          });
      },
      //查询委托
      delegateQuery:function(){
        // let _self = this;

        // _self.$nextTick(function(){

        //   //执行查询
        //   if(tool.isNullOrEmptyObject(_self.queryObj.groupByMode)){
        //     return;
        //   }

        //   if(_self.queryObj.groupByMode.toLowerCase() == "list"){
        //     //查询列表
        //     _self.queryList('pushRefresh', function () {
        //     });
        //   }else{
        //     //查询分组数据
        //     _self.queryGroup();
        //   }
        // });

      },
      //合并查询条件
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

                  if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
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
      //查询分组数据
      queryGroup:function(callback){
        let _self = this;
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_OrganizationsHandle_Group;

        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            QueryCondiction: JSON.stringify(_self.constructQueryCondiction() || []),
            GroupBy:_self.queryObj.groupByMode||"",
            PageType:_self.pageType
        };
        var loadingIndexClassName = tool.showLoading();
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
                _self.groupData = data;

                if(!tool.isNullOrEmptyObject(callback) && typeof(callback) == "function"){
                  callback(data);
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

      //点击头部搜索
      showSearch(){
          let _self = this;
          _self.pageState = 2;
          //给搜索框获取焦点
          $('#searchHeader').find('input.search-input').focus();
          // console.log($('#searchHeader').find('input.search-input'));


          //设置搜索输入框值
          // _self.$set(_self.$refs.searchModule, 'inputValue', _self.searchValue);

          //获取搜索历史数据
          _self.$refs.searchModule.getHistory();
      },

      //添加/取消关注
      followToggle: function (e) {
          var _curObj = $(e.target);
          var fromType = "opportunities";
          var autoID = _curObj.attr("data-autoid") || "";

          var actionType;
          if (_curObj.hasClass("calc-shoucang")) {
              //取消关注
              actionType = 0;
          } else {
              //添加关注
              actionType = 1;
          }

          tool.UserFollow(fromType, autoID, actionType, function () {
              if (_curObj.hasClass("calc-shoucang")) {
                  //取消关注
                  _curObj.removeClass("calc-shoucang").addClass("calc-noshoucang");
              } else {
                  //添加关注
                  _curObj.removeClass("calc-noshoucang").addClass("calc-shoucang");
              }
          });
      },

      //点击跳转到详情页
      goInfo(data){
        let _self = this;
        if(tool.isNullOrEmptyObject(data) || tool.isNullOrEmptyObject(data.AutoID)){
            return;
        }
        var parameter = {
            // showPage: _self.showPage,
            infoName:data.TheName
        };
        _self.$router.push({
            path: '/organizationsinfo/' + data.AutoID,
            query: parameter
        });
      },

      //监听滚动
      watchScroll:function(){
          var _self = this;
          var headerH = parseFloat($("header").innerHeight());
          var navH = parseFloat($(".sort").innerHeight());

          _self.watchScrollHandle( headerH + navH );
      },

      //分组模式下展开收起
      groupToggleHandle:function(idName){
          var _self = this;
          $("#"+ idName ).off("click", "div.date-div").on(
              "click",
              "div.date-div",
              function (event) {
                  event.preventDefault();
                  var target = $(event.target);
                  if (!target.hasClass('date-div')) {
                      target = target.parents("div.date-div:first");
                      if (tool.isNullOrEmptyObject(target)) {
                          return;
                      }
                  }
                  var fromType = target.parents("div[data-fromtype]").attr("data-fromtype") || "";
                  var groupID = target.find("span[data-groupid]:first").attr("data-groupid") || "";

                  if (tool.isNullOrEmptyObject(groupID)) {
                      return;
                  }

                  //若是展开
                  if (target.hasClass("open")) {
                      target
                          .removeClass("open")
                          .siblings(".group-item-list")
                          .slideUp(500, function () {
                              //清空items数据
                              $.each(_self.groupData, function (index, item) {
                                  if (item.GroupID == groupID) {
                                      item.items = [];
                                      return;
                                  }
                              })
                          });
                  } else {
                      //若是收起
                      let groupBy = _self.queryObj.groupByMode ||"";
                      let queryCondictionArr = _self.constructQueryCondiction() || [];
                      tool.InitInnerDataList(_self, fromType, groupID, queryCondictionArr, function(){
                          _self.$nextTick(function () {
                            //  console.log(_self.groupData);
                              target.addClass("open")
                                  .siblings(".group-item-list")
                                  .slideDown(500);
                          });
                      }, '', groupBy, _self.pageType);
                  }
              }
          );

      },

      //接收搜索的值并刷新列表,str有可能为空  (专门处理搜索)
      refreshListBySearchValue(str){
          let _self = this;
          _self.pageState = 1;
          if( !tool.isNullOrEmptyObject(str)){
              _self.searchValue = str;
          }
          console.log(_self.searchValue);
      },

      //处理右侧字段联动
      rightPanelLinkageField(vueObj){
          tool.linkageField(vueObj, 'CompanyID', 'ContactsID');
      }
  },
  beforeRouteLeave: function (to, from, next) {
      if (to.name == 'index') {
          this.$store.commit('REMOVE_ITEM', 'pitcheslist');
      }
      next();
  }

}
</script>

<style scoped>
.page{}
.header{
  overflow: hidden;
  background: #f8f2dc;
  height: 0.88rem;
  display: flex;align-items: center;
  position:fixed;z-index: 99;
  top:0;left:0;right:0;
}
.back-icon{font-size: 0.48rem;padding:0.1rem 10px;}
.search{flex:1;}
.add-icon{font-size: 0.4rem;padding:0.1rem 10px;}


/*列表*/
.list-mode-div{
  position: fixed;
  left:0;right:0;bottom:0;
  top:calc(0.88rem + 0.7rem);
}


/*分组模式*/
.group-mode-div{
  padding-top:calc(0.88rem + 0.7rem);
}
</style>
